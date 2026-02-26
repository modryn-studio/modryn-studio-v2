import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getRecentPosts } from '@/lib/log';

export default function BuildLog() {
  const posts = getRecentPosts(3);

  return (
    <section id="log" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
          What I&apos;m actually doing
        </h2>
        <p className="text-muted-foreground mt-4 font-mono text-sm md:text-base">
          Every build, kill, and lesson — posted as it happens.
        </p>

        {posts.length > 0 ? (
          <div className="border-border bg-card mt-10 border font-mono text-sm">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/log/${post.slug}`}
                className={`flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                  i < posts.length - 1 ? 'border-border border-b' : ''
                } hover:bg-muted/50 transition-colors`}
              >
                <span className="text-muted-foreground/60 shrink-0 tabular-nums">{post.date}</span>
                <span className="text-amber inline-block w-fit text-xs tracking-wider uppercase">
                  [{post.tag}]
                </span>
                <span className="text-foreground">{post.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-border bg-card text-muted-foreground mt-10 border p-6 font-mono text-sm">
            First entry dropping soon — follow the build.
          </div>
        )}

        <Link
          href="/log"
          className="text-amber hover:text-amber/80 mt-6 inline-flex items-center gap-2 font-mono text-sm transition-colors"
        >
          See all updates
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}
