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
    // Only add rewrites for tools that are live or beta — coming-soon tools have no deployed
    // Vercel app yet, so a rewrite would break their landing pages.
    // Run /deploy in this repo after deploying a tool to Vercel — it adds the entry automatically.
    return [];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
