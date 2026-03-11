import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/log';

export const metadata: Metadata = {
  title: 'Build Log — Modryn Studio | Real Builds, Shipped in Public',
  description:
    'Every build, kill, and lesson from Modryn Studio — posted in real time. No retrospectives, just the raw feed of what shipped, what failed, and why.',
  openGraph: {
    title: 'Build Log — Modryn Studio | Real Builds, Shipped in Public',
    description:
      'Every build, kill, and lesson from Modryn Studio — posted in real time. No retrospectives, just the raw feed of what shipped, what failed, and why.',
    url: 'https://modrynstudio.com/log',
    siteName: 'Modryn Studio',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Modryn Studio Build Log' }],
  },
};

type LogPageProps = {
  searchParams?: Promise<{ tag?: string }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.map((post) => post.tag))).sort((a, b) =>
    a.localeCompare(b)
  );
  const tagFilter = resolvedSearchParams?.tag?.trim();
  const activeTag = tagFilter && tags.includes(tagFilter) ? tagFilter : null;
  const visiblePosts = activeTag ? posts.filter((post) => post.tag === activeTag) : posts;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">Build Log</h1>
      <p className="text-muted-foreground mt-4 text-sm md:text-base">
        Every build, kill, and lesson — posted as it happens.
      </p>

      {activeTag && (
        <div className="mt-4 flex items-center gap-3">
          <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
            Showing {activeTag} ({visiblePosts.length})
          </p>
          <Link
            href="/log"
            className="text-amber font-mono text-xs tracking-wide uppercase underline underline-offset-2"
          >
            Clear filter
          </Link>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/log"
          className={`border-border px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
            activeTag === null ? 'bg-amber text-white' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          All ({posts.length})
        </Link>
        {tags.map((tag) => {
          const count = posts.filter((post) => post.tag === tag).length;
          return (
            <Link
              key={tag}
              href={`/log?tag=${encodeURIComponent(tag)}`}
              className={`border-border px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                activeTag === tag ? 'bg-amber text-white' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {tag} ({count})
            </Link>
          );
        })}
      </div>

      {visiblePosts.length > 0 ? (
        <div className="border-border bg-card mt-10 border font-mono text-sm">
          {visiblePosts.map((post, i) => (
            <Link
              key={post.slug}
              href={
                activeTag
                  ? `/log/${post.slug}?tag=${encodeURIComponent(activeTag)}`
                  : `/log/${post.slug}`
              }
              className={`hover:bg-muted/50 flex flex-col gap-1 px-4 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4 ${
                i < visiblePosts.length - 1 ? 'border-border border-b' : ''
              }`}
            >
              <span className="text-muted-foreground/60 shrink-0 tabular-nums">{post.date}</span>
              <span className="text-amber inline-block w-fit text-xs tracking-wider uppercase">
                [{post.tag}]
              </span>
              <span className="font-heading text-foreground text-base">{post.title}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border-border bg-card text-muted-foreground mt-10 border p-6 font-mono text-sm">
          No posts match this filter yet.
          {activeTag && (
            <>
              {' '}
              <Link href="/log" className="text-amber underline underline-offset-2">
                Clear filter
              </Link>
              .
            </>
          )}
        </div>
      )}
    </div>
  );
}
