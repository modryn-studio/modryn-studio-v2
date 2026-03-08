'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

// Fires briefing_viewed on mount and briefing_read_complete when the sentinel
// div scrolls into view (i.e. the user reached the bottom of the briefing).
export default function BriefingTracker({ date }: { date: string }) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    analytics.briefingViewed({ date });
  }, [date]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          analytics.briefingReadComplete({ date });
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [date]);

  return <div ref={sentinelRef} aria-hidden="true" />;
}
