import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTools } from '@/lib/tools';

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
        <div className="border-border mt-12 border-t">
          {visibleTools.map((tool) => {
            const isComingSoon = tool.status === 'coming-soon';
            const rowContent = (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
                  {tool.logoUrl ? (
                    <Image
                      src={tool.logoUrl}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <div className="bg-muted h-10 w-10" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-base font-semibold">{tool.name}</span>
                    <span
                      className={`font-mono text-xs ${
                        tool.status === 'live'
                          ? 'text-green-500'
                          : tool.status === 'beta'
                            ? 'text-blue-400'
                            : tool.status === 'building'
                              ? 'text-orange-400'
                              : 'text-muted-foreground'
                      }`}
                    >
                      [{STATUS_LABELS[tool.status]}]
                    </span>
                  </div>
                  {tool.tagline && (
                    <p className="text-amber mt-0.5 font-mono text-sm">{tool.tagline}</p>
                  )}
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  {tool.bullets && tool.bullets.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                      {tool.bullets.slice(0, 2).map((b) => (
                        <li key={b} className="text-muted-foreground font-mono text-xs">
                          · {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="shrink-0 self-center pl-4">
                  <span className="text-muted-foreground group-hover:text-foreground font-mono text-xs transition-colors">
                    {tool.status === 'live' || tool.status === 'beta'
                      ? 'Open →'
                      : isComingSoon
                        ? ''
                        : 'Details →'}
                  </span>
                </div>
              </>
            );

            return isComingSoon ? (
              <div
                key={tool.slug}
                className="border-border flex cursor-default items-start gap-5 border-b py-6 opacity-60"
              >
                {rowContent}
              </div>
            ) : (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group border-border hover:bg-muted/30 flex items-start gap-5 border-b py-6 transition-colors"
              >
                {rowContent}
              </Link>
            );
          })}
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
