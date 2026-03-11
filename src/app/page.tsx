import type { Metadata } from 'next';
import Hero from '@/components/hero';
import ToolsGrid from '@/components/tools-grid';
import BriefingsPreview from '@/components/briefings-preview';
import BuildLog from '@/components/build-log';
import EmailSignup from '@/components/email-signup';

export const metadata: Metadata = {
  title: 'Modryn Studio — No Bloat, No Nonsense, Tools That Ship',
  description:
    "Fast, focused tools for people who don't have time for bad software. No bloat, no nonsense — just tools that actually work. One builder. One product at a time.",
  openGraph: {
    title: 'Modryn Studio — No Bloat, No Nonsense, Tools That Ship',
    description:
      "Fast, focused tools for people who don't have time for bad software. No bloat, no nonsense — just tools that actually work. One builder. One product at a time.",
    url: 'https://modrynstudio.com',
    siteName: 'Modryn Studio',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Modryn Studio' }],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <EmailSignup />
      <ToolsGrid />
      <BriefingsPreview />
      <BuildLog />
    </>
  );
}
