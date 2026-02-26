import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getRecentPosts } from "@/lib/log";

export default function BuildLog() {
  const posts = getRecentPosts(3);

  return (
    <section id="log" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
          What I&apos;m actually doing
        </h2>
        <p className="mt-4 font-mono text-sm text-muted-foreground md:text-base">
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
            First entry dropping soon — follow the build.
          </div>
        )}

        <Link
          href="/log"
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-amber transition-colors hover:text-amber/80"
        >
          See all updates
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}
