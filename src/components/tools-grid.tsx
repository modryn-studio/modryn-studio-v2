import { Badge } from '@/components/ui/badge';
import { Wrench, Rocket, FlaskConical, Clock } from 'lucide-react';
import Link from 'next/link';
import { getAllTools, type Tool, type ToolStatus } from '@/lib/tools';

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

function ToolCard({ tool }: { tool: Tool }) {
  const status = STATUS_CONFIG[tool.status];
  const icon = STATUS_ICON[tool.status];

  const content = (
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
  );

  if (tool.status === 'live' && tool.url) {
    return <Link href={tool.url}>{content}</Link>;
  }

  return <Link href={`/tools/${tool.slug}`}>{content}</Link>;
}

function EmptySlot() {
  return (
    <div className="border-border hidden border-r border-b p-8 md:block">
      <div className="flex h-full items-center justify-center">
        <span className="text-muted-foreground/40 font-mono text-xs tracking-widest uppercase">
          Slot open
        </span>
      </div>
    </div>
  );
}

export default function ToolsGrid() {
  const tools = getAllTools();

  // Fill empty slots to complete the grid row
  const emptyCount = Math.max(0, 3 - tools.length);

  return (
    <section id="tools" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
          The Tools
        </h2>

        <div className="border-border mt-12 grid grid-cols-1 border-t border-l md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
          {Array.from({ length: emptyCount }).map((_, i) => (
            <EmptySlot key={`empty-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
