import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/log';
import { getAllTools, getToolBySlug, type ToolStatus } from '@/lib/tools';
import { Badge } from '@/components/ui/badge';
import { ShareButtons } from '@/components/share-buttons';
import EmailSignupInline from '@/components/email-signup-inline';
import { LogPostTracker } from '@/components/log-post-tracker';
import { MermaidChart } from '@/components/ui/mermaid-chart';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GenCoverButton } from '@/components/gen-cover-button';
import { PostLikeButton } from '@/components/post-like-button';

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
      ...(post.cover && {
        images: [{ url: `https://modrynstudio.com${post.cover}`, width: 1376, height: 768 }],
      }),
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

  const allPosts = getAllPosts();
  const explicitTool = post.tool ? getToolBySlug(post.tool) : null;
  // Keep the old logSlug lookup as a fallback while older posts migrate.
  const inferredTool = explicitTool
    ? null
    : (getAllTools().find((t) => t.logSlug === slug) ?? null);
  const relatedTool = explicitTool ?? inferredTool;

  const relatedPosts = (post.related ?? [])
    .map((relatedSlug) => allPosts.find((candidate) => candidate.slug === relatedSlug) ?? null)
    .filter((candidate, index, items): candidate is NonNullable<typeof candidate> => {
      if (!candidate || candidate.slug === post.slug) return false;
      return items.findIndex((item) => item?.slug === candidate.slug) === index;
    });
  const previousPost = relatedPosts[0] ?? null;
  const additionalRelatedPosts = previousPost ? relatedPosts.slice(1) : relatedPosts;

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
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="font-heading mt-4 text-3xl font-bold tracking-tighter md:text-4xl">
          {post.title}
        </h1>
        {!post.cover && process.env.NODE_ENV !== 'production' && (
          <div className="mt-3">
            <GenCoverButton slug={post.slug} />
          </div>
        )}
        {post.cover && (
          <div className="border-border mt-8 mb-8 overflow-hidden border">
            <Image
              src={post.cover}
              alt={post.title}
              width={1376}
              height={768}
              className="w-full object-cover"
              priority
              unoptimized={process.env.NODE_ENV !== 'production'}
            />
          </div>
        )}

        {previousPost && (
          <div className="border-border mt-6 border p-4">
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Previously
            </p>
            <Link
              href={`/log/${previousPost.slug}`}
              className="text-foreground hover:text-amber font-heading mt-1 inline-flex items-center gap-1.5 text-base font-semibold transition-colors"
            >
              {previousPost.title}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

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
              code: ({ className, children }) => {
                if (className?.includes('language-mermaid')) {
                  return <MermaidChart chart={String(children)} />;
                }
                return (
                  <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">{children}</code>
                );
              },
              // Prevent <pre> from wrapping mermaid diagrams rendered by the code override above
              pre: ({ children }) => {
                // If the child code block was already swapped for <MermaidChart>, skip the <pre>
                const child = Array.isArray(children) ? children[0] : children;
                const childClass =
                  child && typeof child === 'object' && 'props' in child
                    ? ((child as { props?: { className?: string } }).props?.className ?? '')
                    : '';
                if (childClass.includes('language-mermaid')) {
                  return <>{children}</>;
                }
                return (
                  <pre className="bg-muted border-border my-4 overflow-x-auto border p-4 font-mono text-xs">
                    {children}
                  </pre>
                );
              },
              hr: () => <hr className="border-border my-8" />,
              // Raw HTML <div class="callout"> blocks → amber callout box
              div: ({ className, children, ...props }) =>
                className === 'callout' ? (
                  <div className="border-l-amber bg-muted my-6 border-l-4 py-3 pr-4 pl-4">
                    <p className="text-foreground/90 font-mono text-sm leading-relaxed">
                      {children}
                    </p>
                  </div>
                ) : (
                  <div className={className} {...props}>
                    {children}
                  </div>
                ),
              figure: ({ children }) => <figure className="my-6">{children}</figure>,
              figcaption: ({ children }) => (
                <figcaption className="text-muted-foreground mt-2 font-mono text-xs">
                  {children}
                </figcaption>
              ),
              audio: ({ src, controls }) => (
                <div className="log-audio-wrap my-3">
                  <audio controls={controls} src={src as string} className="log-audio w-full" />
                </div>
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

        {additionalRelatedPosts.length > 0 && (
          <section className="border-border mt-8 border-t pt-8">
            <h2 className="font-heading text-xl font-semibold tracking-tight">Related posts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {additionalRelatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/log/${relatedPost.slug}`}
                  className="border-border hover:bg-muted border p-4 transition-colors"
                >
                  <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                    {relatedPost.date}
                  </p>
                  <p className="font-heading mt-1 text-base font-semibold">{relatedPost.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <EmailSignupInline
          source={relatedTool?.slug ?? 'log'}
          toolName={relatedTool?.name}
          wipUrl={
            relatedTool?.status === 'building' && relatedTool.url ? relatedTool.url : undefined
          }
        />

        <div className="mt-8">
          <PostLikeButton slug={post.slug} title={post.title} />
        </div>
        <ShareButtons title={post.title} slug={post.slug} shareText={post.shareText} />
      </article>
    </div>
  );
}
