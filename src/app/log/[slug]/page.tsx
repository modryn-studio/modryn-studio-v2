import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/log';
import { getAllTools, type ToolStatus } from '@/lib/tools';
import { Badge } from '@/components/ui/badge';
import { ShareButtons } from '@/components/share-buttons';
import EmailSignupInline from '@/components/email-signup-inline';
import { LogPostTracker } from '@/components/log-post-tracker';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STATUS_CONFIG: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: 'Live',
    className: 'border-green-600/20 bg-green-500/10 text-green-600 dark:text-green-400',
  },
  beta: {
    label: 'Beta',
    className: 'border-blue-600/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  building: {
    label: 'Building',
    className: 'border-orange-600/20 bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'border-muted-foreground/20 bg-muted text-muted-foreground',
  },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ tag?: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found — Modryn Studio' };

  return {
    title: post.seoTitle ?? `${post.title} | Modryn Studio Build Log`,
    description: post.description,
    openGraph: {
      title: post.seoTitle ?? `${post.title} | Modryn Studio Build Log`,
      description: post.description,
      url: `https://modrynstudio.com/log/${slug}`,
      siteName: 'Modryn Studio',
      type: 'article',
    },
    authors: [{ name: 'Luke Hanner', url: 'https://modrynstudio.com/about' }],
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Find the tool this log post belongs to (if any)
  const relatedTool = getAllTools().find((t) => t.logSlug === slug) ?? null;
  const allPosts = getAllPosts();
  const rawTag = resolvedSearchParams?.tag?.trim();
  const validTags = new Set(allPosts.map((item) => item.tag));
  const backTag = rawTag && validTags.has(rawTag) ? rawTag : null;
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const newerPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const olderPost =
    postIndex >= 0 && postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex items-center justify-between">
        <Link
          href={backTag ? `/log?tag=${encodeURIComponent(backTag)}` : '/log'}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-sm transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to log
        </Link>
        {relatedTool && (
          <Link
            href={`/tools/${relatedTool.slug}`}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-sm transition-colors"
          >
            {relatedTool.name}
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      <LogPostTracker slug={post.slug} title={post.title} />
      <article className="mt-8">
        <div className="text-muted-foreground flex items-center gap-3 font-mono text-sm">
          <time>{post.date}</time>
          <span className="text-amber text-xs tracking-wider uppercase">[{post.tag}]</span>
        </div>
        <h1 className="font-heading mt-4 text-3xl font-bold tracking-tighter md:text-4xl">
          {post.title}
        </h1>

        {relatedTool && (
          <div className="border-border mt-8 border p-6">
            <p className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
              The tool
            </p>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-heading text-base font-semibold">{relatedTool.name}</p>
                {relatedTool.tagline && (
                  <p className="text-amber mt-0.5 font-mono text-sm">{relatedTool.tagline}</p>
                )}
              </div>
              <Badge
                className={`${STATUS_CONFIG[relatedTool.status].className} shrink-0 font-mono text-xs`}
              >
                {STATUS_CONFIG[relatedTool.status].label}
              </Badge>
            </div>
            <Link
              href={`/tools/${relatedTool.slug}`}
              className="text-muted-foreground hover:text-foreground mt-4 inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
            >
              See the tool <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        <div className="mt-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ children }) => (
                <h2 className="font-heading mt-10 mb-3 text-xl font-bold tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-heading mt-8 mb-2 text-lg font-semibold">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-foreground/85 mb-4 text-base leading-relaxed">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-amber underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="text-foreground/85 mb-4 ml-4 list-disc text-base leading-relaxed">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-foreground/85 mb-4 ml-4 list-decimal text-base leading-relaxed">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-amber my-4 border-l-2 pl-4 italic opacity-70">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">{children}</code>
              ),
              hr: () => <hr className="border-border my-8" />,
              figure: ({ children }) => <figure className="my-6">{children}</figure>,
              figcaption: ({ children }) => (
                <figcaption className="text-muted-foreground mt-2 font-mono text-xs">
                  {children}
                </figcaption>
              ),
              audio: ({ src, controls }) => (
                <audio controls={controls} src={src as string} className="w-full" />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {(newerPost || olderPost) && (
          <div className="border-border mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2">
            {newerPost ? (
              <Link
                href={
                  backTag
                    ? `/log/${newerPost.slug}?tag=${encodeURIComponent(backTag)}`
                    : `/log/${newerPost.slug}`
                }
                className="border-border hover:bg-muted border p-4 transition-colors"
              >
                <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                  Newer post
                </p>
                <p className="font-heading mt-1 text-base font-semibold">{newerPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {olderPost ? (
              <Link
                href={
                  backTag
                    ? `/log/${olderPost.slug}?tag=${encodeURIComponent(backTag)}`
                    : `/log/${olderPost.slug}`
                }
                className="border-border hover:bg-muted border p-4 transition-colors"
              >
                <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                  Older post
                </p>
                <p className="font-heading mt-1 text-base font-semibold">{olderPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        <EmailSignupInline
          source={relatedTool?.slug ?? 'log'}
          toolName={relatedTool?.name}
          wipUrl={
            relatedTool?.status === 'building' && relatedTool.url ? relatedTool.url : undefined
          }
        />

        <ShareButtons title={post.title} slug={post.slug} />
      </article>
    </div>
  );
}
