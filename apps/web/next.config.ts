import type { NextConfig } from 'next';

/**
 * Next.js 15 configuration
 * - Turbopack for faster dev builds
 * - Strict mode enabled
 * - Transpile workspace packages
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@pricewatch/ui',
    '@pricewatch/utils',
    '@pricewatch/types',
    '@pricewatch/db',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.clerk.com' },
      { protocol: 'https', hostname: '*.myshopify.com' },
    ],
  },
  experimental: {
    // Enable Server Actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
