'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface Props {
  name: string;
  slug: string;
  status: string;
}

export function ToolPageTracker({ name, slug, status }: Props) {
  useEffect(() => {
    analytics.toolPageViewed({ name, slug, status });
  }, [name, slug, status]);

  return null;
}
