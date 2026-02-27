'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { analytics } from '@/lib/analytics';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      });

      if (!res.ok) {
        setError('Something went wrong. Try again.');
        return;
      }

      setDone(true);
      analytics.newsletterSignup();
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="signup" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Don&apos;t miss the drop.
          </h2>
          <p className="text-muted-foreground mt-4 font-mono text-sm md:text-base">
            I build tools fast. Get notified when the next one goes live. No newsletters. Just
            launches.
          </p>

          {!done ? (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
                className="border-foreground/20 placeholder:text-muted-foreground focus-visible:ring-amber h-12 flex-1 rounded-none border-2 bg-transparent px-4 font-mono text-sm focus-visible:ring-1"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="bg-amber hover:bg-amber/90 h-12 rounded-none px-8 font-mono text-sm font-bold text-white disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Notify me'}
              </Button>
            </form>
          ) : (
            <div className="border-amber/30 bg-amber/5 text-amber mt-8 border p-4 font-mono text-sm">
              You&apos;re on the list. Next launch, your inbox.
            </div>
          )}

          {error && <p className="text-destructive mt-4 font-mono text-sm">{error}</p>}
        </div>
      </div>
    </section>
  );
}
