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
      <p className="text-muted font-mono text-xs tracking-widest uppercase">About</p>
      <h1 className="text-text text-2xl font-bold">Something went wrong.</h1>
      <p className="text-muted max-w-md text-sm">An unexpected error occurred.</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="border-border text-text hover:border-accent hover:text-accent rounded border px-4 py-2 text-sm transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-accent rounded px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
