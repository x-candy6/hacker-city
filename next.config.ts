import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@stackmatix/cms-core'],
  },
};

export default withSentryConfig(nextConfig, {
  org: 'stackmatix',
  project: 'hacker-city',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
