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
      { protocol: 'https', hostname: 'specifythat.com' },
    ],
  },
  async rewrites() {
    // Each entry proxies a tool repo (deployed on Vercel) to modrynstudio.com/tools/[slug].
    // Run /deploy in this repo after deploying a tool to Vercel — it adds the entry automatically.
    return [
      {
        source: '/tools/goanyway/:path*',
        destination: 'https://goanyway.vercel.app/tools/goanyway/:path*',
      },
      {
        source: '/tools/warranted/:path*',
        destination: 'https://warranted.vercel.app/tools/warranted/:path*',
      },
      {
        source: '/tools/idea-engine/:path*',
        destination: 'https://idea-engine-rho.vercel.app/tools/idea-engine/:path*',
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
