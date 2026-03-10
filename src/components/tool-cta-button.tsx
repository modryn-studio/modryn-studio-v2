'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

interface Props {
  href: string;
  label: string;
  toolName: string;
  toolSlug: string;
  toolStatus: string;
}

export function ToolCtaButton({ href, label, toolName, toolSlug, toolStatus }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.toolCta({ name: toolName, slug: toolSlug, status: toolStatus })}
    >
      <Button className="bg-amber hover:bg-amber/90 rounded-none px-6 font-mono text-sm text-white">
        {label}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </a>
  );
}
