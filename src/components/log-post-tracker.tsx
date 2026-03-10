'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface Props {
  slug: string;
  title: string;
}

// Fires log_post_viewed on mount and log_post_read_complete when the user
// scrolls to the bottom of the post (same pattern as BriefingTracker).
export function LogPostTracker({ slug, title }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    analytics.logPostViewed({ slug, title });
  }, [slug, title]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          analytics.logPostReadComplete({ slug, title });
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slug, title]);

  return <div ref={sentinelRef} aria-hidden="true" />;
}
