import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Playbook — Modryn Studio',
  description:
    'The frameworks and tools I run before and during every build. Not advice — the actual plays.',
  openGraph: {
    title: 'Playbook — Modryn Studio',
    description:
      'The frameworks and tools I run before and during every build. Not advice — the actual plays.',
    url: 'https://modrynstudio.com/playbook',
    siteName: 'Modryn Studio',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Modryn Studio' }],
  },
};

const workflows = [
  {
    slug: 'path-finder',
    label: 'Pick a Path Before You Build',
    description:
      "Before writing a line of code, I run through this tool to get honest about what I'm actually optimizing for. Five possible goals, four ways to find yours.",
    tag: 'Pre-build',
  },
];

export default function PlaybookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">Playbook</h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed md:text-base">
        The frameworks and tools I actually run — before, during, and after every build. Not advice.
        The actual plays.
      </p>

      <div className="mt-16 flex flex-col">
        {workflows.map((w, i) => (
          <Link
            key={w.slug}
            href={`/playbook/${w.slug}`}
            className={`group hover:bg-secondary -mx-4 flex items-start justify-between gap-6 px-4 py-6 transition-colors ${
              i === 0 ? 'border-border border-t' : ''
            } border-border border-b`}
          >
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground border-border border px-1.5 py-0.5 font-mono text-[10px] tracking-widest uppercase">
                  {w.tag}
                </span>
              </div>
              <p className="font-heading text-foreground text-lg leading-snug font-semibold">
                {w.label}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">{w.description}</p>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-foreground mt-1 h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
