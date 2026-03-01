'use client';

import Link from 'next/link';
import { Wrench, Rocket, FlaskConical, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type Tool, type ToolStatus } from '@/lib/tools';
import { analytics } from '@/lib/analytics';

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

export function ToolCard({ tool }: { tool: Tool }) {
  const status = STATUS_CONFIG[tool.status];
  const icon = STATUS_ICON[tool.status];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      onClick={() => analytics.toolClick({ name: tool.name, slug: tool.slug })}
    >
      <div className="group border-border hover:bg-muted/50 relative border-r border-b p-8 transition-colors">
        <div className="flex items-start justify-between">
          <div className="border-border flex h-10 w-10 items-center justify-center border">
            {icon}
          </div>
          <Badge className={`${status.className} font-mono text-xs`}>{status.label}</Badge>
        </div>
        <h3 className="font-heading mt-4 text-lg font-semibold">{tool.name}</h3>
        <p className="text-muted-foreground mt-2 font-mono text-sm leading-relaxed">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
