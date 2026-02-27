'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { site } from '@/config/site';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = `${site.url}/log/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      label: 'X / Twitter',
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'Reddit',
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      label: 'HN',
      href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`,
    },
  ];

  return (
    <div className="border-border mt-12 flex flex-wrap items-center gap-3 border-t pt-8">
      <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        Share
      </span>

      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border hover:border-foreground/50 rounded border px-3 py-1.5 font-mono text-xs transition-colors"
        >
          {label}
        </a>
      ))}

      <button
        onClick={handleCopy}
        className={cn(
          'border-border hover:border-foreground/50 inline-flex items-center gap-1.5 rounded border px-3 py-1.5 font-mono text-xs transition-colors',
          copied && 'border-green-500/50 text-green-400',
        )}
      >
        {copied ? <Check className="h-3 w-3" /> : <Link2 className="h-3 w-3" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
}
