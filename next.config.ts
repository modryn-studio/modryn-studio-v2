import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'modrynstudio.com' },
      { protocol: 'https', hostname: '*.vercel.app' },
      { protocol: 'https', hostname: 'songfor.gift' },
    ],
  },
  async rewrites() {
    return {
      // PostHog reverse proxy — avoids ad-blocker interference
      beforeFiles: [
        {
          source: '/ingest/static/:path*',
          destination: 'https://us-assets.i.posthog.com/static/:path*',
        },
        {
          source: '/ingest/:path*',
          destination: 'https://us.i.posthog.com/:path*',
        },
      ],
      // Each entry proxies a tool repo (deployed on Vercel) to modrynstudio.com/tools/[slug].
      // Run /deploy in this repo after deploying a tool to Vercel — it adds the entry automatically.
      // See GitHub issue #15 for setup details.
      afterFiles: [
        {
          source: '/tools/goanyway/:path*',
          destination: 'https://goanyway.vercel.app/tools/goanyway/:path*',
        },
        {
          source: '/tools/warranted/:path*',
          destination: 'https://warranted.vercel.app/tools/warranted/:path*',
        },
      ],
      fallback: [],
    };
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
