'use client';

import { useState, type FormEvent } from 'react';
import { analytics } from '@/lib/analytics';

type Step = 'reaction' | 'email' | 'done';

export default function BriefingFeedback({ date }: { date: string }) {
  const [step, setStep] = useState<Step>('reaction');
  const [useful, setUseful] = useState<boolean | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleReaction = (val: boolean) => {
    setUseful(val);
    analytics.briefingReaction({ date, useful: val });
    // Fire-and-forget — captures signal even if they skip the email step
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'feedback',
        message: `Briefing reaction: ${val ? 'YES' : 'NO'}`,
        page: `briefing/${date}`,
      }),
    }).catch(() => {});
    setStep('email');
  };

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, page: 'briefing' }),
      });
      if (!res.ok) {
        setError('Something went wrong. Try again.');
        return;
      }
      analytics.newsletterSignup({ source: 'briefing' });
      setSubmittedEmail(true);
      setStep('done');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const doneMessage = submittedEmail
    ? "You're on the list. Tomorrow's briefing hits your inbox in the morning."
    : useful === false
      ? "Thanks. I'll keep improving it."
      : 'Thanks for the feedback.';

  return (
    <div className="border-border mt-16 border-t pt-10">
      {step === 'reaction' && (
        <>
          <p className="font-heading text-foreground text-base font-semibold">
            Was this briefing useful?
          </p>
          <p className="text-muted-foreground mt-1 font-mono text-sm">
            One click. Helps me know if the format is working.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleReaction(true)}
              className="border-border hover:border-amber hover:text-amber text-foreground cursor-pointer border px-6 py-2 font-mono text-sm transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => handleReaction(false)}
              className="border-border hover:border-border/60 text-foreground cursor-pointer border px-6 py-2 font-mono text-sm transition-colors"
            >
              No
            </button>
          </div>
        </>
      )}

      {step === 'email' && (
        <form onSubmit={handleEmail}>
          <p className="font-heading text-foreground text-base font-semibold">
            {useful ? 'Get it in your inbox every morning.' : "I'm improving it — stay in the loop."}
          </p>
          <p className="text-muted-foreground mt-1 font-mono text-sm">
            No spam. Just the daily briefing when it drops.
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-amber h-10 flex-1 border px-3 font-mono text-sm outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-amber hover:bg-amber/90 h-10 cursor-pointer px-5 font-mono text-sm text-white transition-colors disabled:opacity-50"
            >
              {submitting ? '…' : 'Subscribe'}
            </button>
          </div>
          {error && <p className="mt-2 font-mono text-xs text-red-500">{error}</p>}
          <button
            type="button"
            onClick={() => setStep('done')}
            className="text-muted-foreground hover:text-foreground mt-3 font-mono text-xs transition-colors"
          >
            I&apos;ll skip →
          </button>
        </form>
      )}

      {step === 'done' && (
        <p className="text-muted-foreground font-mono text-sm">{doneMessage}</p>
      )}
    </div>
  );
}
