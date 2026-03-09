import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/log';
import { getAllTools } from '@/lib/tools';
import { ShareButtons } from '@/components/share-buttons';
import EmailSignupInline from '@/components/email-signup-inline';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    authors: [{ name: 'Luke Hanner', url: 'https://modrynstudio.com/about' }],
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Find the tool this log post belongs to (if any)
  const relatedTool = getAllTools().find((t) => t.logSlug === slug) ?? null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex items-center justify-between">
        <Link
          href="/log"
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

      <article className="mt-8">
        <div className="text-muted-foreground flex items-center gap-3 font-mono text-sm">
          <time>{post.date}</time>
          <span className="text-amber text-xs tracking-wider uppercase">[{post.tag}]</span>
        </div>
        <h1 className="font-heading mt-4 text-3xl font-bold tracking-tighter md:text-4xl">
          {post.title}
        </h1>
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
                <p className="text-foreground/80 mb-4 font-mono text-sm leading-relaxed">
                  {children}
                </p>
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
                <ul className="text-foreground/80 mb-4 ml-4 list-disc font-mono text-sm leading-relaxed">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-foreground/80 mb-4 ml-4 list-decimal font-mono text-sm leading-relaxed">
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

        <ShareButtons title={post.title} slug={post.slug} />
        {relatedTool && (
          <div className="mt-8">
            <Link
              href={`/tools/${relatedTool.slug}`}
              className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
            >
              {relatedTool.name} &rarr;
            </Link>
          </div>
        )}
        <EmailSignupInline />
      </article>
    </div>
  );
}
