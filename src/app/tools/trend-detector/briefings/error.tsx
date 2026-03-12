'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">Briefings</p>
      <h1 className="text-foreground text-2xl font-bold">Couldn&apos;t load briefings.</h1>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="border-border text-foreground hover:border-accent hover:text-accent rounded border px-4 py-2 text-sm transition-colors"
        >
          Try again
        </button>
        <Link
          href="/tools/trend-detector"
          className="bg-accent rounded px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to Trend Detector
        </Link>
      </div>
    </div>
  );
}
