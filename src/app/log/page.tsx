import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/log';

export const metadata: Metadata = {
  title: 'Build Log — Modryn Studio',
  description: 'Every build, kill, and lesson — posted as it happens.',
  openGraph: {
    title: 'Build Log — Modryn Studio',
    description: 'Every build, kill, and lesson — posted as it happens.',
    url: 'https://modrynstudio.com/log',
    siteName: 'Modryn Studio',
    type: 'website',
  },
};

export default function LogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">Build Log</h1>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
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
          First entry dropping soon.
        </div>
      )}
    </div>
  );
}
