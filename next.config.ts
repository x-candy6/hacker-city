import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@stackmatix/cms-core'],
  },
};

export default nextConfig;
