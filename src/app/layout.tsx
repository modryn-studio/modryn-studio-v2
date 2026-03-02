import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import FeedbackWidget from '@/components/feedback-widget';
import Script from 'next/script';
import { site } from '@/config/site';
import { SiteSchema } from '@/components/site-schema';
import { getAllPosts } from '@/lib/log';
import { getAllTools } from '@/lib/tools';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  // manifest.ts in app/ is auto-detected — no need to declare it here
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    url: site.url,
    siteName: site.name,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: site.social.twitterHandle,
    creator: site.social.twitterHandle,
    title: site.ogTitle,
    description: site.ogDescription,
    images: ['/og-image.png'],
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: `${site.name} — Build Log` }],
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const newPostsCount = getAllPosts().filter((p) => p.date >= cutoffStr).length;
  const newToolsCount = getAllTools().filter(
    (t) => t.launchedAt && t.launchedAt >= cutoffStr
  ).length;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="modryn-theme">
          <div className="noise-overlay bg-background text-foreground flex min-h-screen flex-col">
            <Navbar newPostsCount={newPostsCount} newToolsCount={newToolsCount} />
            <main className="flex-1">{children}</main>
            <Footer />
            <FeedbackWidget />
          </div>
          <Analytics />
        </ThemeProvider>
        <SiteSchema />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
