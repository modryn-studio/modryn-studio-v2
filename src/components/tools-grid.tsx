import { getAllTools } from '@/lib/tools';
import { ToolCard } from '@/components/tool-card';

export default function ToolsGrid() {
  const tools = getAllTools();
  const liveCount = tools.filter((t) => t.status === 'live').length;
  const betaCount = tools.filter((t) => t.status === 'beta').length;
  const buildingCount = tools.filter((t) => t.status === 'building').length;

  return (
    <section id="tools" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.8rem]">
          The Tools
        </h2>
        <p className="text-muted-foreground mt-3 font-mono text-xs tracking-wide uppercase">
          {liveCount} live · {betaCount} beta · {buildingCount} building
        </p>

        <div className="border-border mt-12 grid grid-cols-1 border-t border-l md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
