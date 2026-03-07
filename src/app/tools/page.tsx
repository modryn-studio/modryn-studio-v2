import type { Metadata } from 'next';
import { getAllTools } from '@/lib/tools';
import { ToolCard } from '@/components/tool-card';

export const metadata: Metadata = {
  title: 'All Tools — Modryn Studio | Live, Beta & In Progress',
  description:
    "Browse all tools from Modryn Studio — live, in beta, and coming soon. Fast, focused software for people who don't waste time on bad tools.",
  openGraph: {
    title: 'All Tools — Modryn Studio | Live, Beta & In Progress',
    description:
      "Browse all tools from Modryn Studio — live, in beta, and coming soon. Fast, focused software for people who don't waste time on bad tools.",
    url: 'https://modrynstudio.com/tools',
    siteName: 'Modryn Studio',
    type: 'website',
  },
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">The Tools</h1>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
        Everything I&apos;m building — live, beta, and in progress.
      </p>

      {tools.length > 0 ? (
        <div className="border-border mt-12 grid grid-cols-1 gap-0 border-t border-l md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} showDetails />
          ))}
        </div>
      ) : (
        <div className="border-border bg-card text-muted-foreground mt-12 border p-8 font-mono text-sm">
          First tool dropping soon — follow the build.
        </div>
      )}
    </div>
  );
}
