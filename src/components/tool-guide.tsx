'use client';

import ReactMarkdown from 'react-markdown';

export function ToolGuide({ content }: { content: string }) {
  return (
    <div className="mt-10">
      <p className="text-muted-foreground mb-6 font-mono text-xs tracking-widest uppercase">
        Guide
      </p>
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-8 mb-3 font-mono text-sm font-semibold tracking-wide text-foreground uppercase">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-2 font-mono text-xs font-semibold tracking-wide text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 space-y-1 list-decimal pl-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed">
              <span className="text-amber mt-0.5 shrink-0">—</span>
              <span>{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-muted-foreground italic">{children}</em>
          ),
          hr: () => <hr className="border-border my-6" />,
          code: ({ children }) => (
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">{children}</code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
