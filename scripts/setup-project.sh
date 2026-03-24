#!/bin/bash

set -e

REPO_NAME=$(basename "$(pwd)")
GITHUB_USERNAME=""

echo "🚀 Vercel Auto-Deploy Setup: $REPO_NAME"

# Check deps
command -v git >/dev/null 2>&1 || {
  echo "❌ git required"
  exit 1
}
command -v gh >/dev/null 2>&1 || {
  echo "❌ gh required: https://cli.github.com"
  exit 1
}
command -v vercel >/dev/null 2>&1 || {
  echo "❌ vercel required: npm i -g vercel"
  exit 1
}

# Git init
if [ ! -d ".git" ]; then
  git init
  echo "✅ Git initialized"
fi

# GitHub auth
gh auth status >/dev/null 2>&1 || gh auth login

# CREATE COMMIT FIRST (required for --push)
if [ -z "$(git log --oneline -1 2>/dev/null)" ]; then
  echo "Creating initial commit..."
  git add .
  git commit -m "Initial commit" || echo "Nothing to commit"
fi

# Create GitHub repo (only if no remote)
if ! git remote get-url origin >/dev/null 2>&1; then
  read -p "GitHub username: " GITHUB_USERNAME

  echo "Creating GitHub repo..."
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

  echo "✅ Repo created: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
else
  echo "✅ Remote exists"
  git push -u origin main 2>/dev/null || git push -u origin master
fi

# Vercel login
vercel whoami >/dev/null 2>&1 || vercel login

# Link project
if [ ! -f ".vercel/project.json" ]; then
  echo "Linking Vercel project..."
  vercel link --yes
fi

# Git integration for auto-deploy
REPO_FULL_NAME=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "$GITHUB_USERNAME/$REPO_NAME")
vercel git connect "$REPO_FULL_NAME" 2>/dev/null || echo "⚠️  Connect manually at https://vercel.com/dashboard"

# Deploy
echo "Deploying..."
vercel --prod

echo ""
echo "✅ DONE! Push to main to auto-deploy:"
echo "   git push origin main"
