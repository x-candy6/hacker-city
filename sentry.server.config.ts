import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d5b36f159314117687f2e89253d92242@o4508162669346816.ingest.us.sentry.io/4511101057236992",
  tracesSampleRate: 1.0,
  debug: false,
});
