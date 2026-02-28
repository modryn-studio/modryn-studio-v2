import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToolBySlug, getAllTools, type ToolStatus } from '@/lib/tools';
import { ToolScreenshot } from '@/components/tool-screenshot';
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

  return {
    title: `${tool.name} — Modryn Studio`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — Modryn Studio`,
      description: tool.description,
      url: `https://modrynstudio.com/tools/${slug}`,
      siteName: 'Modryn Studio',
      type: 'website',
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

        {tool.screenshotUrl && (
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

        {tool.status === 'live' && tool.url && (
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <Button className="bg-amber hover:bg-amber/90 mt-8 rounded-none px-6 font-mono text-sm text-white">
              Try it
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        )}

        {tool.status !== 'live' && (
          <div className="border-border bg-card mt-8 border p-6">
            <p className="text-muted-foreground font-mono text-sm">
              This tool is in progress. Sign up on the{' '}
              <Link href="/#signup" className="text-amber hover:text-amber/80">
                homepage
              </Link>{' '}
              to get notified when it launches.
            </p>
          </div>
        )}

        {tool.logSlug && (
          <div className="mt-8">
            <Link
              href={`/log/${tool.logSlug}`}
              className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
            >
              Read the build &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
