import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllBriefings } from '@/lib/briefings';

export default function BriefingsPreview() {
  const briefings = getAllBriefings().slice(0, 3);

  if (briefings.length === 0) return null;

  return (
    <section id="briefings" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Daily Briefings
        </h2>
        <p className="text-muted-foreground mt-4 text-sm md:text-base">
          400+ rising trends scored every morning. BUILD / WATCH / SKIP. Unfiltered output.
        </p>

        <div className="border-border bg-card mt-10 border font-mono text-sm">
          {briefings.map((b, i) => (
            <Link
              key={b.slug}
              href={`/tools/trend-detector/briefings/${b.slug}`}
              className={`flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                i < briefings.length - 1 ? 'border-border border-b' : ''
              } hover:bg-muted/50 transition-colors`}
            >
              <span className="text-muted-foreground/60 shrink-0 tabular-nums">{b.date}</span>
              <span className="text-foreground">{b.title}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/tools/trend-detector/briefings"
          className="border-border hover:bg-muted mt-6 inline-flex items-center gap-2 border px-4 py-2 font-mono text-sm transition-colors"
        >
          All briefings
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
