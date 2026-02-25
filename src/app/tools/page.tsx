import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools — Modryn Studio",
  description:
    "All tools from Modryn Studio — live, beta, and coming soon.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        The Tools
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Coming soon.
      </p>
    </div>
  );
}
