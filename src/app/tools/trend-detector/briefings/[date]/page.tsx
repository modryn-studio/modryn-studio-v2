import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft } from 'lucide-react';
import { getBriefingByDate, getAllBriefings } from '@/lib/briefings';
import { site } from '@/config/site';

type Props = { params: Promise<{ date: string }> };

export async function generateStaticParams() {
  return getAllBriefings().map((b) => ({ date: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const briefing = getBriefingByDate(date);
  if (!briefing) return { title: 'Briefing not found — Modryn Studio' };

  return {
    title: `${briefing.title} | Modryn Studio`,
    description: briefing.description,
    alternates: {
      canonical: `${site.url}/tools/trend-detector/briefings/${date}`,
    },
    openGraph: {
      title: `${briefing.title} | Modryn Studio`,
      description: briefing.description,
      url: `${site.url}/tools/trend-detector/briefings/${date}`,
      siteName: site.name,
      type: 'article',
    },
  };
}

export default async function BriefingPage({ params }: Props) {
  const { date } = await params;
  const briefing = getBriefingByDate(date);
  if (!briefing) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/tools/trend-detector/briefings"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-sm transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        All briefings
      </Link>

      <article className="mt-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-heading mt-12 text-xl font-semibold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-heading mt-8 text-base font-semibold">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-muted-foreground mt-4 font-mono text-sm leading-relaxed">
                {children}
              </p>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            strong: ({ children }) => (
              <strong className="text-foreground font-semibold">{children}</strong>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                rel="nofollow noreferrer"
                target="_blank"
                className="text-amber underline underline-offset-4 hover:opacity-80"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="mt-3 space-y-1 pl-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mt-3 list-decimal space-y-1 pl-4">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-muted-foreground font-mono text-sm">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-amber/40 mt-4 border-l-2 pl-4">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes('language-');
              return isBlock ? (
                <pre className="border-border bg-muted mt-4 overflow-x-auto border p-4">
                  <code className="font-mono text-xs">{children}</code>
                </pre>
              ) : (
                <code className="bg-muted rounded px-1 font-mono text-xs">{children}</code>
              );
            },
            hr: () => <hr className="border-border my-8" />,
            table: ({ children }) => (
              <div className="mt-4 overflow-x-auto">
                <table className="border-border w-full border-collapse font-mono text-xs">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => <thead className="border-border border-b">{children}</thead>,
            th: ({ children }) => (
              <th className="text-muted-foreground px-3 py-2 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-border border-b px-3 py-2">{children}</td>
            ),
            details: ({ children, ...props }) => (
              <details
                className="border-border mt-4 border p-4"
                {...(props as React.DetailsHTMLAttributes<HTMLDetailsElement>)}
              >
                {children}
              </details>
            ),
            summary: ({ children }) => (
              <summary className="cursor-pointer font-mono text-sm font-semibold">
                {children}
              </summary>
            ),
          }}
        >
          {briefing.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
