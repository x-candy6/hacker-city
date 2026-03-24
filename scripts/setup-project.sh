#!/bin/bash

set -e

REPO_NAME=$(basename "$(pwd)")
GITHUB_USERNAME=""
GCP_PROJECT="${GCS_PROJECT_ID:-stackmatix-app}"
GCS_BUCKET="${GCS_CONTENT_BUCKET:-stackmatix-cdn}"
SITE_SLUG="$REPO_NAME"

echo "=== Content Pipeline Site Setup: $REPO_NAME ==="
echo ""

# ─────────────────────────────────────────────────────
# 1. Check dependencies
# ─────────────────────────────────────────────────────
echo "[1/8] Checking dependencies..."
for cmd in git gh vercel pnpm gcloud gsutil npm; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "  ERROR: $cmd is required but not found."
    exit 1
  }
done
echo "  All dependencies found."

# ─────────────────────────────────────────────────────
# 2. Git + GitHub setup
# ─────────────────────────────────────────────────────
echo ""
echo "[2/8] Git + GitHub setup..."

if [ ! -d ".git" ]; then
  git init
  echo "  Git initialized."
fi

gh auth status >/dev/null 2>&1 || gh auth login

if [ -z "$(git log --oneline -1 2>/dev/null)" ]; then
  git add .
  git commit --no-verify -m "Initial commit" || echo "  Nothing to commit."
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  read -p "  GitHub username: " GITHUB_USERNAME
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  echo "  Repo created: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
else
  echo "  Remote exists."
  git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || true
fi

# ─────────────────────────────────────────────────────
# 3. npm auth (.npmrc)
# ─────────────────────────────────────────────────────
echo ""
echo "[3/8] npm registry setup..."

NPM_AUTH_TOKEN=$(grep '_authToken' ~/.npmrc 2>/dev/null | sed 's/.*_authToken=//' | head -1)

if [ -z "$NPM_AUTH_TOKEN" ]; then
  echo "  ERROR: No npm auth token found in ~/.npmrc"
  echo "  Run: npm login --registry=https://registry.npmjs.org"
  exit 1
fi

if [ ! -f ".npmrc" ]; then
  cat > .npmrc <<NPMRC
@stackmatix:registry=https://registry.npmjs.org
//registry.npmjs.org/:_authToken=\${NPM_TOKEN}
NPMRC
  echo "  Created .npmrc"
else
  echo "  .npmrc exists."
fi

# ─────────────────────────────────────────────────────
# 4. Vercel project setup
# ─────────────────────────────────────────────────────
echo ""
echo "[4/8] Vercel project setup..."

vercel whoami >/dev/null 2>&1 || vercel login

if [ ! -f ".vercel/project.json" ]; then
  vercel link --yes
fi

REPO_FULL_NAME=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "$GITHUB_USERNAME/$REPO_NAME")
vercel git connect "$REPO_FULL_NAME" 2>/dev/null || echo "  Connect manually at https://vercel.com/dashboard"

# ─────────────────────────────────────────────────────
# 5. Vercel environment variables
# ─────────────────────────────────────────────────────
echo ""
echo "[5/8] Setting Vercel environment variables..."

set_vercel_env() {
  local name="$1"
  local value="$2"
  # Check if already set
  if npx vercel env ls 2>&1 | grep -q "$name"; then
    echo "  $name already set, skipping."
  else
    printf '%s' "$value" | npx vercel env add "$name" production 2>&1 | grep -E "Added|Error" || true
    echo "  $name set."
  fi
}

# NPM token for private @stackmatix packages
set_vercel_env "NPM_TOKEN" "$NPM_AUTH_TOKEN"

# Site config
SITE_NAME="${NEXT_PUBLIC_SITE_NAME:-$REPO_NAME}"
set_vercel_env "GCS_CONTENT_BUCKET" "$GCS_BUCKET"
set_vercel_env "GCS_CONTENT_PREFIX" "ln/subscribers/$SITE_SLUG"
set_vercel_env "GCS_PROJECT_ID" "$GCP_PROJECT"
set_vercel_env "NEXT_PUBLIC_SITE_NAME" "$SITE_NAME"

# Webhook token
WEBHOOK_TOKEN="${CONTENT_WEBHOOK_TOKEN:-$(uuidgen | tr '[:upper:]' '[:lower:]')}"
set_vercel_env "CONTENT_WEBHOOK_TOKEN" "$WEBHOOK_TOKEN"

# ─────────────────────────────────────────────────────
# 6. GCS service account credentials
# ─────────────────────────────────────────────────────
echo ""
echo "[6/8] GCS credentials setup..."

SA_EMAIL="content-reader@${GCP_PROJECT}.iam.gserviceaccount.com"

# Check if service account exists, create if not
if ! gcloud iam service-accounts describe "$SA_EMAIL" --project="$GCP_PROJECT" >/dev/null 2>&1; then
  echo "  Creating service account..."
  gcloud iam service-accounts create content-reader \
    --project="$GCP_PROJECT" \
    --display-name="Content Pipeline Reader" \
    --description="Read-only GCS access for brand sites"
  gsutil iam ch "serviceAccount:${SA_EMAIL}:objectViewer" "gs://${GCS_BUCKET}"
  echo "  Service account created and granted bucket read access."
else
  echo "  Service account exists."
fi

# Generate key and add to Vercel
if ! npx vercel env ls 2>&1 | grep -q "GOOGLE_CREDENTIALS"; then
  TMPKEY=$(mktemp)
  gcloud iam service-accounts keys create "$TMPKEY" \
    --iam-account="$SA_EMAIL" \
    --project="$GCP_PROJECT" 2>&1 | grep -v "^$"
  cat "$TMPKEY" | tr -d '\n' | npx vercel env add GOOGLE_CREDENTIALS production 2>&1 | grep -E "Added|Error" || true
  rm -f "$TMPKEY"
  echo "  GOOGLE_CREDENTIALS set."
else
  echo "  GOOGLE_CREDENTIALS already set."
fi

# ─────────────────────────────────────────────────────
# 7. Sentry error tracking
# ─────────────────────────────────────────────────────
echo ""
echo "[7/9] Sentry setup..."

if command -v sentry-cli >/dev/null 2>&1; then
  SENTRY_ORG="stackmatix"
  SENTRY_TOKEN=$(cat ~/.sentryclirc 2>/dev/null | grep 'token=' | sed 's/token=//' | tr -d ' ')

  if [ -n "$SENTRY_TOKEN" ]; then
    # Create project if it doesn't exist
    PROJECT_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" \
      "https://sentry.io/api/0/projects/${SENTRY_ORG}/${SITE_SLUG}/" \
      -H "Authorization: Bearer $SENTRY_TOKEN")

    if [ "$PROJECT_EXISTS" != "200" ]; then
      echo "  Creating Sentry project..."
      curl -s -X POST "https://sentry.io/api/0/teams/${SENTRY_ORG}/${SENTRY_ORG}/projects/" \
        -H "Authorization: Bearer $SENTRY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"${SITE_SLUG}\", \"slug\": \"${SITE_SLUG}\", \"platform\": \"javascript-nextjs\"}" > /dev/null
      echo "  Project created."
    else
      echo "  Sentry project exists."
    fi

    # Get DSN
    SENTRY_DSN=$(curl -s "https://sentry.io/api/0/projects/${SENTRY_ORG}/${SITE_SLUG}/keys/" \
      -H "Authorization: Bearer $SENTRY_TOKEN" | \
      python3 -c "import sys,json; print(json.load(sys.stdin)[0]['dsn']['public'])" 2>/dev/null)

    if [ -n "$SENTRY_DSN" ]; then
      echo "  DSN: $SENTRY_DSN"
      # Replace DSN placeholders in sentry config files
      for f in sentry.client.config.ts sentry.server.config.ts sentry.edge.config.ts; do
        if [ -f "$f" ]; then
          sed -i '' "s|{{SENTRY_DSN}}|${SENTRY_DSN}|g" "$f" 2>/dev/null || true
        fi
      done
      # Replace project name in next.config.ts
      if [ -f "next.config.ts" ]; then
        sed -i '' "s|project: '{{PROJECT_NAME}}'|project: '${SITE_SLUG}'|g" next.config.ts 2>/dev/null || true
      fi
      echo "  Sentry configs updated with DSN."

      # Add SENTRY_AUTH_TOKEN to Vercel for source map uploads
      set_vercel_env "SENTRY_AUTH_TOKEN" "$SENTRY_TOKEN"
    else
      echo "  WARNING: Could not retrieve DSN. Update sentry configs manually."
    fi
  else
    echo "  No sentry-cli auth token found. Run: sentry-cli login"
  fi
else
  echo "  sentry-cli not installed. Skipping. Install with: brew install getsentry/tools/sentry-cli"
fi

# ─────────────────────────────────────────────────────
# 8. Register as subscriber + copy fixtures
# ─────────────────────────────────────────────────────
echo ""
echo "[8/9] Registering subscriber and copying content..."

# Check if subscriber path exists
if gsutil ls "gs://${GCS_BUCKET}/ln/subscribers/${SITE_SLUG}/" >/dev/null 2>&1; then
  echo "  Subscriber path exists, skipping fixture copy."
else
  echo "  Copying fixture articles from hub..."
  gsutil -m cp -r "gs://${GCS_BUCKET}/ln/hub/*" "gs://${GCS_BUCKET}/ln/subscribers/${SITE_SLUG}/" 2>&1 | tail -3
  echo "  Fixtures copied."
fi

echo "  NOTE: Register this site in gs://${GCS_BUCKET}/ln/config/subscribers.json"
echo "  Or use: cd ../multibrand-cms && pnpm create-brand"

# ─────────────────────────────────────────────────────
# 9. Deploy
# ─────────────────────────────────────────────────────
echo ""
echo "[9/9] Deploying to Vercel..."

# Commit any changes from setup
if [ -n "$(git status --porcelain)" ]; then
  git add .
  git commit --no-verify -m "chore: configure deployment (npmrc, env setup)" || true
  git push origin main 2>/dev/null || true
fi

vercel --prod

echo ""
echo "=== Setup Complete ==="
echo ""
echo "  Site:       https://${REPO_NAME}.vercel.app"
echo "  Webhook:    https://${REPO_NAME}.vercel.app/api/webhooks/content"
echo "  GCS prefix: gs://${GCS_BUCKET}/ln/subscribers/${SITE_SLUG}/"
echo "  Token:      ${WEBHOOK_TOKEN}"
echo ""
echo "  Push to main to auto-deploy: git push origin main"
