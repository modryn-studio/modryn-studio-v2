import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Script from 'next/script';
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
  metadataBase: new URL('https://modrynstudio.com'),
  title: 'Modryn Studio',
  description:
    "Tools for people who don't have time for bad software. Fast, focused AI tools — built one at a time.",
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Modryn Studio | Fast, Focused AI Tools for Builders',
    description:
      "Fast, focused AI tools built one at a time. No bloat, no nonsense. Built for people who don't have time for bad software.",
    url: 'https://modrynstudio.com',
    siteName: 'Modryn Studio',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modryn Studio | Fast, Focused AI Tools for Builders',
    description:
      "Fast, focused AI tools built one at a time. No bloat, no nonsense. Built for people who don't have time for bad software.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="modryn-theme">
          <div className="noise-overlay bg-background text-foreground flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Modryn Studio',
                url: 'https://modrynstudio.com',
                description: 'Fast, focused AI tools built one at a time.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Modryn Studio',
                url: 'https://modrynstudio.com',
                logo: 'https://modrynstudio.com/icon.png',
                description: 'Fast, focused AI tools built one at a time.',
                founder: {
                  '@type': 'Person',
                  name: 'Luke Hanner',
                },
              },
            ]),
          }}
        />
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
