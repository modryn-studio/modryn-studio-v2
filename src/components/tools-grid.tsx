import { getAllTools } from '@/lib/tools';
import { ToolCard } from '@/components/tool-card';

export default function ToolsGrid() {
  const tools = getAllTools();

  return (
    <section id="tools" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          The Tools
        </h2>

        <div className="border-border mt-12 grid grid-cols-1 border-t border-l md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
