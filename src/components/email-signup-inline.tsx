'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { analytics } from '@/lib/analytics';

export default function EmailSignupInline() {
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
    <div className="border-border mt-16 border-t pt-10">
      {!done ? (
        <>
          <p className="font-heading text-foreground text-base font-semibold">Follow the build.</p>
          <p className="text-muted-foreground mt-1 font-mono text-sm">
            Get notified when the next tool drops. No newsletters. Just launches.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="inline-signup-email" className="sr-only">
              Email address
            </label>
            <Input
              id="inline-signup-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
              className="border-foreground/20 placeholder:text-muted-foreground focus-visible:ring-amber h-10 flex-1 rounded-none border-2 bg-transparent px-4 font-mono text-sm focus-visible:ring-1"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-amber hover:bg-amber/90 h-10 rounded-none px-6 font-mono text-sm font-bold text-white disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Notify me'}
            </Button>
          </form>
          {error && <p className="text-destructive mt-3 font-mono text-sm">{error}</p>}
        </>
      ) : (
        <div className="border-amber/30 bg-amber/5 text-amber border p-4 font-mono text-sm">
          You&apos;re on the list. Next launch, your inbox.
        </div>
      )}
    </div>
  );
}
