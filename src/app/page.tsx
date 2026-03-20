import type { Metadata } from 'next';
import Hero from '@/components/hero';
import ToolsGrid from '@/components/tools-grid';
import BuildLog from '@/components/build-log';
import EmailSignup from '@/components/email-signup';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: site.ogTitle,
  description: site.description,
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    url: site.url,
    siteName: site.name,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.name }],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ToolsGrid />
      <BuildLog />
      <EmailSignup />
    </>
  );
}
