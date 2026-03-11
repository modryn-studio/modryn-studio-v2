import type { Metadata } from 'next';
import Link from 'next/link';
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Modryn Studio Tools' }],
  },
};

const STATUS_LABELS = {
  live: 'Live',
  beta: 'Beta',
  building: 'Building',
  'coming-soon': 'Coming soon',
} as const;

type ToolsPageProps = {
  searchParams?: Promise<{ status?: string }>;
};

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const tools = getAllTools();
  const statusFilter = resolvedSearchParams?.status;
  const validStatuses = Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>;
  const activeStatus = validStatuses.includes(statusFilter as keyof typeof STATUS_LABELS)
    ? (statusFilter as keyof typeof STATUS_LABELS)
    : null;
  const visibleTools = activeStatus ? tools.filter((tool) => tool.status === activeStatus) : tools;

  const liveCount = tools.filter((t) => t.status === 'live').length;
  const betaCount = tools.filter((t) => t.status === 'beta').length;
  const buildingCount = tools.filter((t) => t.status === 'building').length;
  const comingSoonCount = tools.filter((t) => t.status === 'coming-soon').length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">The Tools</h1>
      <p className="text-muted-foreground mt-4 text-sm md:text-base">
        Everything I&apos;m building — live, beta, and in progress.
      </p>
      <p className="text-muted-foreground mt-3 font-mono text-xs tracking-wide uppercase">
        {liveCount} live · {betaCount} beta · {buildingCount} building · {comingSoonCount} coming
        soon
      </p>

      {activeStatus && (
        <div className="mt-4 flex items-center gap-3">
          <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
            Showing {STATUS_LABELS[activeStatus]} ({visibleTools.length})
          </p>
          <Link
            href="/tools"
            className="text-amber font-mono text-xs tracking-wide uppercase underline underline-offset-2"
          >
            Clear filter
          </Link>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/tools"
          className={`border-border px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
            activeStatus === null ? 'bg-amber text-white' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          All ({tools.length})
        </Link>
        {validStatuses.map((status) => {
          const count = tools.filter((tool) => tool.status === status).length;
          return (
            <Link
              key={status}
              href={`/tools?status=${status}`}
              className={`border-border px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                activeStatus === status
                  ? 'bg-amber text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {STATUS_LABELS[status]} ({count})
            </Link>
          );
        })}
      </div>

      {visibleTools.length > 0 ? (
        <div className="border-border mt-12 grid grid-cols-1 gap-0 border-t border-l md:grid-cols-2 lg:grid-cols-3">
          {visibleTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              showDetails
              href={activeStatus ? `/tools/${tool.slug}?status=${activeStatus}` : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="border-border bg-card text-muted-foreground mt-12 border p-8 font-mono text-sm">
          No tools match this filter yet.
          {activeStatus && (
            <>
              {' '}
              <Link href="/tools" className="text-amber underline underline-offset-2">
                Clear filter
              </Link>
              .
            </>
          )}
        </div>
      )}
    </div>
  );
}
