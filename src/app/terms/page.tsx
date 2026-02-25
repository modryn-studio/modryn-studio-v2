import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Modryn Studio",
  description: "Terms of service for Modryn Studio.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        Terms of Service
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Coming soon.
      </p>
    </div>
  );
}
