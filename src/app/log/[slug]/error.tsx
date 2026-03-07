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
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Build Log</p>
      <h1 className="text-2xl font-bold text-text">Couldn&apos;t load this post.</h1>
      <p className="max-w-md text-sm text-muted">
        Something went wrong loading this log entry.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
        >
          Try again
        </button>
        <Link
          href="/log"
          className="rounded bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          All posts
        </Link>
      </div>
    </div>
  );
}
