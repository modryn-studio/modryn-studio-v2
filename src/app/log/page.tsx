import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/log";

export const metadata: Metadata = {
  title: "Build Log — Modryn Studio",
  description:
    "Every build, kill, and lesson — posted as it happens.",
};

export default function LogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        Build Log
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Every build, kill, and lesson — posted as it happens.
      </p>

      {posts.length > 0 ? (
        <div className="mt-10 border border-border bg-card font-mono text-sm">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/log/${post.slug}`}
              className={`flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                i < posts.length - 1 ? "border-b border-border" : ""
              } transition-colors hover:bg-muted/50`}
            >
              <span className="shrink-0 text-muted-foreground/60 tabular-nums">
                {post.date}
              </span>
              <span className="inline-block w-fit text-xs uppercase tracking-wider text-amber">
                [{post.tag}]
              </span>
              <span className="text-foreground">{post.title}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-border bg-card p-6 font-mono text-sm text-muted-foreground">
          First entry dropping soon.
        </div>
      )}
    </div>
  );
}
