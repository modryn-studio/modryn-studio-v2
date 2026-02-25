import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Modryn Studio`,
    description: `Details for ${slug}.`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        {slug}
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Tool page coming soon.
      </p>
    </div>
  );
}
