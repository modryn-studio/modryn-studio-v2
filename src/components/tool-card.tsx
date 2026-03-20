'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { Wrench, Rocket, FlaskConical, Clock, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type Tool, type ToolStatus } from '@/lib/tools';
import { analytics } from '@/lib/analytics';
import { ToolScreenshot } from '@/components/tool-screenshot';

function formatLaunchDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

const STATUS_CONFIG: Record<ToolStatus, { label: string; className: string }> = {
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

const STATUS_ICON: Record<ToolStatus, React.ReactNode> = {
  live: <Rocket className="text-amber h-5 w-5" />,
  beta: <FlaskConical className="text-amber h-5 w-5" />,
  building: <Wrench className="text-amber h-5 w-5" />,
  'coming-soon': <Clock className="text-amber h-5 w-5" />,
};

export function ToolCard({ tool, href }: { tool: Tool; href?: string }) {
  const targetHref = href ?? `/tools/${tool.slug}`;

  if (tool.status === 'coming-soon') {
    return (
      <div className="group border-border hover:bg-muted/50 relative border-r border-b transition-colors">
        <CardContent tool={tool} />
        <MiniEmailCapture slug={tool.slug} />
      </div>
    );
  }

  return (
    <Link
      href={targetHref}
      onClick={() => analytics.toolClick({ name: tool.name, slug: tool.slug })}
    >
      <div className="group border-border hover:bg-muted/50 relative border-r border-b transition-colors">
        <CardContent tool={tool} />
      </div>
    </Link>
  );
}

function MiniEmailCapture({ slug }: { slug: string }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, page: `tool-card-${slug}` }),
      });
      setDone(true);
      analytics.newsletterSignup({ source: `tool-card-${slug}` });
    } catch {
      // silent fail — confirmation fires on retry
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="border-border flex items-center gap-2 border-t px-8 py-4 font-mono text-xs text-amber">
        <Check className="h-3 w-3" />
        You&apos;re on the list.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-border flex border-t">
      <input
        type="email"
        placeholder="Notify me when live"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={submitting}
        className="h-10 flex-1 bg-transparent px-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={submitting}
        className="text-muted-foreground hover:text-amber border-border shrink-0 border-l px-4 font-mono text-xs transition-colors disabled:opacity-50"
      >
        {submitting ? '...' : 'Notify me'}
      </button>
    </form>
  );
}

function CardContent({ tool }: { tool: Tool }) {
  const status = STATUS_CONFIG[tool.status];
  const icon = STATUS_ICON[tool.status];

  return (
    <>
      {(tool.screenshotUrl || tool.screenshotUrlDark) && (
        <div className="border-border relative w-full overflow-hidden border-b">
          <ToolScreenshot
            lightUrl={tool.screenshotUrl}
            darkUrl={tool.screenshotUrlDark}
            alt={`${tool.name} preview`}
            className="w-full object-cover object-top"
            width={640}
            height={360}
          />
        </div>
      )}
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={tool.name}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              icon
            )}
          </div>
          <Badge className={`${status.className} font-mono text-xs`}>{status.label}</Badge>
        </div>
        <h3 className="font-heading mt-4 text-lg font-semibold">{tool.name}</h3>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{tool.description}</p>
        {tool.launchedAt && (
          <p className="text-muted-foreground mt-3 font-mono text-xs">
            Shipped {formatLaunchDate(tool.launchedAt)}
          </p>
        )}
      </div>
    </>
  );
}
