import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Log — Modryn Studio",
  description:
    "Every build, kill, and lesson — posted as it happens.",
};

export default function LogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        Build Log
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Coming soon.
      </p>
    </div>
  );
}
