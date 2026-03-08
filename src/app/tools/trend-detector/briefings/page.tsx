import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllBriefings } from '@/lib/briefings';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Daily Trend Briefings — Modryn Studio',
  description:
    'Every morning Trend Detector scores 400+ rising search trends and outputs BUILD/WATCH/SKIP decisions. Read the daily briefings.',
  alternates: {
    canonical: `${site.url}/tools/trend-detector/briefings`,
  },
  openGraph: {
    title: 'Daily Trend Briefings — Modryn Studio',
    description:
      'Every morning Trend Detector scores 400+ rising search trends and outputs BUILD/WATCH/SKIP decisions. Read the daily briefings.',
    url: `${site.url}/tools/trend-detector/briefings`,
    siteName: site.name,
    type: 'website',
  },
};

export default function BriefingsIndexPage() {
  const briefings = getAllBriefings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/tools/trend-detector"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-sm transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Trend Detector
      </Link>

      <h1 className="font-heading mt-8 text-3xl font-bold tracking-tighter md:text-4xl">
        Daily Briefings
      </h1>
      <p className="text-muted-foreground mt-3 font-mono text-sm">
        What&apos;s rising, what&apos;s buildable, what to skip — every morning.
      </p>

      {briefings.length > 0 ? (
        <ul className="mt-10 space-y-3">
          {briefings.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/tools/trend-detector/briefings/${b.slug}`}
                className="group flex items-baseline gap-4"
              >
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  {b.date}
                </span>
                <span className="font-mono text-sm underline-offset-4 group-hover:underline">
                  {b.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground mt-10 font-mono text-sm">No briefings yet.</p>
      )}
    </div>
  );
}
