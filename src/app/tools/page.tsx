import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllTools, type ToolStatus } from "@/lib/tools";
import { Wrench, Rocket, FlaskConical, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Tools — Modryn Studio",
  description:
    "All tools from Modryn Studio — live, beta, and coming soon.",
  openGraph: {
    title: "Tools — Modryn Studio",
    description: "All tools from Modryn Studio — live, beta, and coming soon.",
    url: "https://modrynstudio.com/tools",
    siteName: "Modryn Studio",
    type: "website",
  },
};

const STATUS_CONFIG: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "border-green-600/20 bg-green-500/10 text-green-600 dark:text-green-400",
  },
  beta: {
    label: "Beta",
    className: "border-blue-600/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  building: {
    label: "Building",
    className: "border-orange-600/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "border-muted-foreground/20 bg-muted text-muted-foreground",
  },
};

const STATUS_ICON: Record<ToolStatus, React.ReactNode> = {
  live: <Rocket className="h-5 w-5 text-amber" />,
  beta: <FlaskConical className="h-5 w-5 text-amber" />,
  building: <Wrench className="h-5 w-5 text-amber" />,
  "coming-soon": <Clock className="h-5 w-5 text-amber" />,
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        The Tools
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Everything I&apos;m building — live, beta, and in progress.
      </p>

      {tools.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
          {tools.map((tool) => {
            const status = STATUS_CONFIG[tool.status];
            const icon = STATUS_ICON[tool.status];

            return (
              <Link
                key={tool.slug}
                href={tool.status === "live" && tool.url ? tool.url : `/tools/${tool.slug}`}
                className="group border-b border-r border-border p-8 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border border-border">
                    {icon}
                  </div>
                  <Badge className={`${status.className} font-mono text-xs`}>
                    {status.label}
                  </Badge>
                </div>
                <h2 className="mt-4 font-heading text-lg font-semibold">{tool.name}</h2>
                <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 border border-border bg-card p-8 font-mono text-sm text-muted-foreground">
          First tool dropping soon — follow the build.
        </div>
      )}
    </div>
  );
}
