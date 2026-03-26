import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToolBySlug, getAllTools, type ToolStatus } from '@/lib/tools';
import { getAllBriefings } from '@/lib/briefings';
import { ToolScreenshot } from '@/components/tool-screenshot';
import { ScreenshotLightbox } from '@/components/screenshot-lightbox';
import { ToolGuide } from '@/components/tool-guide';
import EmailSignupInline from '@/components/email-signup-inline';
import { ToolCtaButton } from '@/components/tool-cta-button';
import { ShareButtons } from '@/components/share-buttons';
import { SongCard } from '@/components/song-card';
import { GeminiComparison } from '@/components/gemini-comparison';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { ToolPageTracker } from '@/components/tool-page-tracker';

function formatLaunchDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ status?: string }>;
};

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool not found — Modryn Studio' };

  const seoTitle =
    tool.seoTitle ??
    (tool.tagline
      ? `${tool.name}: ${tool.tagline} — Modryn Studio`
      : `${tool.name} — Modryn Studio Tool`);

  return {
    title: seoTitle,
    description: tool.description,
    alternates: {
      canonical: `https://modrynstudio.com/tools/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: tool.description,
      url: `https://modrynstudio.com/tools/${slug}`,
      siteName: 'Modryn Studio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

const STATUS_LABEL: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: 'Live',
    className: 'border-green-600/20 bg-green-500/10 text-green-600 dark:text-green-400',
  },
  beta: {
    label: 'Beta',
    className: 'border-blue-600/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  building: {
    label: 'Building',
    className: 'border-orange-600/20 bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'border-muted-foreground/20 bg-muted text-muted-foreground',
  },
};

export default async function ToolPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const validStatuses = ['live', 'beta', 'building', 'coming-soon'] as const;
  const rawStatus = resolvedSearchParams?.status;
  const backStatus = validStatuses.includes(rawStatus as (typeof validStatuses)[number])
    ? rawStatus
    : undefined;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const latestBriefing = tool.briefingsPath ? (getAllBriefings()[0] ?? null) : null;
  const relatedTools = getAllTools()
    .filter((candidate) => candidate.slug !== tool.slug)
    .sort((a, b) => {
      const rank = { live: 0, beta: 1, building: 2, 'coming-soon': 3 } as const;
      return rank[a.status] - rank[b.status];
    })
    .slice(0, 3);

  const status = STATUS_LABEL[tool.status];

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <ToolPageTracker name={tool.name} slug={tool.slug} status={tool.status} />
      <Link
        href={backStatus ? `/tools?status=${backStatus}` : '/tools'}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-sm transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        All tools
      </Link>

      <div className="mt-8">
        {tool.logoUrl && (
          <Image
            src={tool.logoUrl}
            alt={`${tool.name} logo`}
            width={40}
            height={40}
            className="mb-3 object-contain"
          />
        )}
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">
            {tool.name}
          </h1>
          <Badge className={`${status.className} font-mono text-xs`}>{status.label}</Badge>
        </div>
        {tool.tagline && <p className="text-amber mt-2 font-mono text-sm">{tool.tagline}</p>}
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
          {tool.description}
        </p>

        {tool.launchedAt && (
          <p className="text-muted-foreground mt-2 font-mono text-xs">
            Shipped {formatLaunchDate(tool.launchedAt)}
          </p>
        )}

        {(tool.screenshotUrl || tool.screenshotUrlDark) && (
          <div className="border-border mt-8 overflow-hidden border">
            {tool.screenshotLightbox ? (
              <ScreenshotLightbox
                lightUrl={tool.screenshotUrl}
                darkUrl={tool.screenshotUrlDark}
                alt={`${tool.name} screenshot`}
                className="w-full object-cover"
                width={900}
                height={506}
              />
            ) : tool.url ? (
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
                <ToolScreenshot
                  lightUrl={tool.screenshotUrl}
                  darkUrl={tool.screenshotUrlDark}
                  alt={`${tool.name} screenshot`}
                  className="w-full object-cover transition-opacity hover:opacity-90"
                  width={900}
                  height={506}
                />
              </a>
            ) : (
              <ToolScreenshot
                lightUrl={tool.screenshotUrl}
                darkUrl={tool.screenshotUrlDark}
                alt={`${tool.name} screenshot`}
                className="w-full object-cover"
                width={900}
                height={506}
              />
            )}
          </div>
        )}

        {(tool.status === 'live' || tool.status === 'beta') && tool.url && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ToolCtaButton
              href={tool.url}
              label={tool.status === 'live' ? 'Try it' : 'Try the beta'}
              toolName={tool.name}
              toolSlug={tool.slug}
              toolStatus={tool.status}
            />
            {tool.logSlug && (
              <Link href={`/log/${tool.logSlug}`}>
                <Button
                  variant="secondary"
                  className="border-border rounded-none px-6 font-mono text-sm"
                >
                  Build log
                </Button>
              </Link>
            )}
          </div>
        )}

        {tool.status === 'building' && tool.logSlug && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#notify">
              <Button className="bg-amber hover:bg-amber/90 rounded-none px-6 font-mono text-sm text-white">
                Notify me when it launches
              </Button>
            </a>
            <Link href={`/log/${tool.logSlug}`}>
              <Button
                variant="secondary"
                className="border-border rounded-none px-6 font-mono text-sm"
              >
                Build log
              </Button>
            </Link>
          </div>
        )}

        {tool.briefingsPath && (
          <div className="border-border mt-8 border p-5">
            <p className="text-amber font-mono text-xs tracking-widest uppercase">
              Daily Briefings
            </p>
            <p className="text-muted-foreground mt-1 font-mono text-sm">
              BUILD / WATCH / SKIP decisions on rising trends, every morning.
            </p>
            {latestBriefing && (
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                Latest: {latestBriefing.date}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {latestBriefing ? (
                <Link href={`${tool.briefingsPath}/${latestBriefing.slug}`}>
                  <Button className="bg-amber hover:bg-amber/90 rounded-none px-6 font-mono text-sm text-white">
                    Read today&apos;s briefing
                  </Button>
                </Link>
              ) : null}
              <Link
                href={tool.briefingsPath}
                className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
              >
                All briefings &rarr;
              </Link>
            </div>
          </div>
        )}

        {tool.aiComparison && (
          <GeminiComparison
            genericai={tool.aiComparison.genericai}
            songforme={tool.aiComparison.songforme}
          />
        )}

        {tool.bullets && tool.bullets.length > 0 && (
          <ul className="mt-6 space-y-2">
            {tool.bullets.map((bullet, i) => (
              <li key={i} className="text-muted-foreground flex items-start gap-2">
                <span className="text-amber mt-0.5 shrink-0">—</span>
                <span className="text-sm leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {tool.guide && <ToolGuide content={tool.guide} />}

        {tool.examples && tool.examples.length > 0 && (
          <div className="mt-10">
            <p className="text-muted-foreground mb-1 font-mono text-xs tracking-widest uppercase">
              Real examples
            </p>
            <p className="text-muted-foreground mb-4 font-mono text-xs">
              Songs I made for real people. Press play.
            </p>
            <div className="space-y-2">
              {tool.examples.map((ex, i) => (
                <SongCard
                  key={i}
                  example={ex}
                  toolSlug={tool.slug}
                  autoPlayNextInList={tool.slug === 'songfor-me'}
                />
              ))}
            </div>
          </div>
        )}

        {relatedTools.length > 0 && (
          <section className="border-border mt-12 border-t pt-8">
            <h2 className="font-heading text-xl font-semibold tracking-tight">Try next</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedTools.map((candidate) => (
                <Link
                  key={candidate.slug}
                  href={
                    backStatus
                      ? `/tools/${candidate.slug}?status=${backStatus}`
                      : `/tools/${candidate.slug}`
                  }
                  className="border-border hover:bg-muted border p-4 transition-colors"
                >
                  <p className="font-heading text-sm font-semibold">{candidate.name}</p>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {candidate.tagline ?? candidate.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ShareButtons
          title={tool.tagline ?? tool.name}
          slug={tool.slug}
          urlOverride={`https://modrynstudio.com/tools/${tool.slug}`}
          showHN={false}
        />

        {tool.status !== 'live' && (
          <div id="notify">
            <EmailSignupInline
              toolName={tool.name}
              source={tool.slug}
              wipUrl={tool.status === 'building' && tool.url ? tool.url : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}
