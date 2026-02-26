import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/log";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found — Modryn Studio" };

  return {
    title: `${post.title} — Modryn Studio`,
    description: `Build log: ${post.title}`,
  };
}

export default async function LogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/log"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to log
      </Link>

      <article className="mt-8">
        <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
          <time>{post.date}</time>
          <span className="text-xs uppercase tracking-wider text-amber">
            [{post.tag}]
          </span>
        </div>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tighter md:text-4xl">
          {post.title}
        </h1>
        <div className="prose-modryn mt-8 font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}
