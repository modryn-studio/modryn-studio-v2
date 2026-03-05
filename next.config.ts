import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async rewrites() {
    // Each entry proxies a tool repo (deployed on Vercel) to modrynstudio.com/tools/[slug].
    // Run /deploy in this repo after deploying a tool to Vercel — it adds the entry automatically.
    // See GitHub issue #15 for setup details.
    return [
      {
        source: '/tools/goanyway/:path*',
        destination: 'https://goanyway.vercel.app/tools/goanyway/:path*',
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
