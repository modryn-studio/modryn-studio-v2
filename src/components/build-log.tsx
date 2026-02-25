import { ArrowRight } from "lucide-react";

const LOG_ENTRIES = [
  {
    date: "2025-12-18",
    tag: "build",
    title:
      "Scaffolded the first tool. Core logic works. UI is ugly. Shipping anyway.",
  },
  {
    date: "2025-12-15",
    tag: "decision",
    title:
      "Killed the dashboard idea. Too bloated. Going minimal CLI-first.",
  },
  {
    date: "2025-12-12",
    tag: "note",
    title:
      "Started Modryn Studio. One rule: build things people actually use.",
  },
];

export default function BuildLog() {
  return (
    <section id="log" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
          What I&apos;m actually doing
        </h2>
        <p className="mt-4 font-mono text-sm text-muted-foreground md:text-base">
          Every build, kill, and lesson — posted as it happens.
        </p>

        <div className="mt-10 border border-border bg-card font-mono text-sm">
          {LOG_ENTRIES.map((entry, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                i < LOG_ENTRIES.length - 1 ? "border-b border-border" : ""
              } transition-colors hover:bg-muted/50`}
            >
              <span className="shrink-0 text-muted-foreground/60 tabular-nums">
                {entry.date}
              </span>
              <span className="inline-block w-fit text-xs uppercase tracking-wider text-amber">
                [{entry.tag}]
              </span>
              <span className="text-foreground">{entry.title}</span>
            </div>
          ))}
        </div>

        <a
          href="#log"
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-amber transition-colors hover:text-amber/80"
        >
          See all updates
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}
