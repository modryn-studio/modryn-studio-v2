import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToolBySlug, getAllTools, type ToolStatus } from '@/lib/tools';
import { getAllBriefings } from '@/lib/briefings';
import { ToolScreenshot } from '@/components/tool-screenshot';
import EmailSignupInline from '@/components/email-signup-inline';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';

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
};

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool not found — Modryn Studio' };

  const seoTitle = tool.tagline
    ? `${tool.name}: ${tool.tagline} — Modryn Studio`
    : `${tool.name} — Modryn Studio Tool`;

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
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: tool.name }],
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

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const latestBriefing = tool.briefingsPath ? (getAllBriefings()[0] ?? null) : null;

  const status = STATUS_LABEL[tool.status];

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/tools"
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
        <p className="text-muted-foreground mt-4 font-mono text-sm leading-relaxed md:text-base">
          {tool.description}
        </p>

        {tool.launchedAt && (
          <p className="text-muted-foreground mt-2 font-mono text-xs">
            Shipped {formatLaunchDate(tool.launchedAt)}
          </p>
        )}

        {(tool.screenshotUrl || tool.screenshotUrlDark) && (
          <div className="border-border mt-8 overflow-hidden border">
            <ToolScreenshot
              lightUrl={tool.screenshotUrl}
              darkUrl={tool.screenshotUrlDark}
              alt={`${tool.name} screenshot`}
              className="w-full object-cover"
              width={900}
              height={506}
            />
          </div>
        )}

        {(tool.status === 'live' || tool.status === 'beta' || tool.status === 'building') &&
          tool.url && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-amber hover:bg-amber/90 rounded-none px-6 font-mono text-sm text-white">
                  {tool.status === 'live'
                    ? 'Try it'
                    : tool.status === 'beta'
                      ? 'Try the beta'
                      : 'Preview it'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              {tool.logSlug && (
                <Link href={`/log/${tool.logSlug}`}>
                  <Button
                    variant="outline"
                    className="border-border rounded-none px-6 font-mono text-sm"
                  >
                    Build log
                  </Button>
                </Link>
              )}
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

        {tool.bullets && tool.bullets.length > 0 && (
          <ul className="mt-6 space-y-2">
            {tool.bullets.map((bullet, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2 font-mono text-sm"
              >
                <span className="text-amber mt-0.5 shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {tool.examples && tool.examples.length > 0 && (
          <div className="mt-10">
            <p className="text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase">
              Real examples
            </p>
            <div className="space-y-4">
              {tool.examples.map((ex, i) => (
                <div key={i} className="border-border border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm font-semibold">{ex.name}</p>
                      <p className="text-muted-foreground font-mono text-xs">{ex.occasion}</p>
                    </div>
                    <span className="border-border text-muted-foreground border px-2 py-0.5 font-mono text-xs">
                      {ex.genre}
                    </span>
                  </div>
                  <audio controls src={ex.audioUrl} className="w-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.status !== 'live' && <EmailSignupInline toolName={tool.name} source={tool.slug} />}
      </div>
    </div>
  );
}
