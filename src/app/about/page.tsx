import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Modryn Studio",
  description:
    "Who Luke is, how he works, and the stack behind Modryn Studio.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        About
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Coming soon.
      </p>
    </div>
  );
}
