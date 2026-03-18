'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GenCoverButton({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const router = useRouter();

  async function handleClick() {
    setState('loading');
    try {
      const res = await fetch('/api/gen-cover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        const { error } = (await res.json()) as { error: string };
        console.error('gen-cover error:', error);
        setState('error');
        return;
      }
      setState('done');
      // Refresh server components so the cover image appears
      router.refresh();
    } catch (err) {
      console.error(err);
      setState('error');
    }
  }

  const label = {
    idle: 'Generate cover',
    loading: 'Generating…',
    done: 'Done — refresh to see',
    error: 'Error — check console',
  }[state];

  return (
    <button
      onClick={handleClick}
      disabled={state === 'loading' || state === 'done'}
      className="cursor-pointer rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-500 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
