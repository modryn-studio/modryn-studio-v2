import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react";

export default function ToolsGrid() {
  return (
    <section
      id="tools"
      data-testid="tools-section"
      className="border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2
          data-testid="tools-heading"
          className="font-heading text-3xl font-semibold tracking-tight md:text-5xl"
        >
          The Tools
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Empty state card — first tool building */}
          <div
            data-testid="tool-card-building"
            className="group relative border border-border p-8 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center border border-border">
                <Wrench className="h-5 w-5 text-amber" />
              </div>
              <Badge
                data-testid="tool-badge-building"
                className="rounded-none border-orange-600/20 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-xs"
              >
                Building
              </Badge>
            </div>
            <p
              data-testid="tool-card-message"
              className="mt-6 font-mono text-sm leading-relaxed text-muted-foreground"
            >
              First tool is in the build. Follow along — you'll want to be here when it drops.
            </p>
          </div>

          {/* Placeholder empty slots */}
          <div className="hidden border border-border p-8 md:block">
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase">
                Slot open
              </span>
            </div>
          </div>
          <div className="hidden border border-border p-8 lg:block">
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase">
                Slot open
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
