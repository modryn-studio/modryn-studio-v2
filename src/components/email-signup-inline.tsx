'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { analytics } from '@/lib/analytics';
import { site } from '@/config/site';

const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent('Just signed up to follow the build at Modryn Studio. Fast, focused tools, built in public — one at a time. Worth watching.')}&url=${encodeURIComponent(site.url)}`;

export default function EmailSignupInline({
  source = 'tool',
  toolName,
  wipUrl,
}: {
  source?: string;
  toolName?: string;
  /** If set, shows a 'peek at work in progress' link — used for building-status tools */
  wipUrl?: string;
}) {
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
        body: JSON.stringify({ type: 'newsletter', email, page: source }),
      });

      if (!res.ok) {
        setError('Something went wrong. Try again.');
        return;
      }

      setDone(true);
      analytics.newsletterSignup({ source });
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
          <p className="font-heading text-foreground text-base font-semibold">
            {toolName ? 'Be first when the intake opens.' : 'Follow the build.'}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {toolName
              ? `Drop your email. We'll tell you the moment it's ready.`
              : 'Get notified when the next tool drops. No newsletters. Just launches.'}
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
              className="border-foreground/20 placeholder:text-muted-foreground focus-visible:ring-amber h-11 flex-1 rounded-none border-2 bg-transparent px-4 text-sm focus-visible:ring-1"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-amber hover:bg-amber/90 h-11 rounded-none px-6 font-mono text-sm font-bold text-white disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Notify me'}
            </Button>
          </form>
          {error && <p className="text-destructive mt-3 font-mono text-sm">{error}</p>}
          {wipUrl && (
            <p className="text-muted-foreground mt-3 font-mono text-xs">
              Curious now?{' '}
              <a
                href={wipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Peek at the work in progress &rarr;
              </a>
            </p>
          )}
        </>
      ) : (
        <div className="border-amber/30 bg-amber/5 text-amber border p-4 font-mono text-sm">
          <p>
            {toolName
              ? `You're on the list. We'll email you when ${toolName} launches.`
              : "You're on the list. Next launch, your inbox."}
          </p>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block underline underline-offset-4 opacity-75 transition-opacity hover:opacity-100"
          >
            Share on X &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
