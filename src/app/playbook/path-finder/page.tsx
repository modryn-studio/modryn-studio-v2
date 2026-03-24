import type { Metadata } from 'next';
import { PathFinder } from '@/components/path-finder/path-finder';

export const metadata: Metadata = {
  title: 'Pick a Path Before You Build — Modryn Studio',
  description:
    "Five goals. Four ways to find yours. Run this before starting any project to get honest about what you're actually optimizing for.",
  openGraph: {
    title: 'Pick a Path Before You Build — Modryn Studio',
    description:
      "Five goals. Four ways to find yours. Run this before starting any project to get honest about what you're actually optimizing for.",
    url: 'https://modrynstudio.com/playbook/path-finder',
    siteName: 'Modryn Studio',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Modryn Studio' }],
  },
};

export default function PathFinderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24">
      {/* Context header */}
      <div className="mb-16 max-w-xl">
        <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
          Playbook / Pre-build
        </p>
        <h1 className="font-heading mt-3 text-3xl font-bold tracking-tighter sm:text-4xl">
          Pick a Path Before You Build
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          I built this tool to force an honest answer out of myself before starting anything. The
          mistake I kept making: building <em>something cool</em> when what I actually needed was{' '}
          <em>something that pays</em>, or vice versa. Pick the wrong goal and no amount of
          execution fixes it.
        </p>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Five possible goals. Four ways to find yours. Start with the list and pick the one
          that&apos;s loudest — or use a mode if you need help getting honest.
        </p>
      </div>

      {/* The tool */}
      <PathFinder />
    </div>
  );
}
