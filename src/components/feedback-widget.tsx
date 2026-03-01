'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { analytics } from '@/lib/analytics';

type WidgetState = 'idle' | 'open' | 'submitting' | 'done';

export default function FeedbackWidget() {
  const [state, setState] = useState<WidgetState>('idle');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (state === 'open') textareaRef.current?.focus();
  }, [state]);

  // Open via custom event — used by the mobile footer trigger
  useEffect(() => {
    const handler = () => setState('open');
    window.addEventListener('open-feedback', handler);
    return () => window.removeEventListener('open-feedback', handler);
  }, []);

  // Auto-collapse 3s after success
  useEffect(() => {
    if (state === 'done') {
      collapseTimer.current = setTimeout(() => {
        setState('idle');
        setMessage('');
        setEmail('');
      }, 3000);
    }
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, [state]);

  const close = () => setState('idle');

  const handleSubmit = async () => {
    if (!message.trim() || state === 'submitting') return;
    setState('submitting');
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'feedback',
          message: message.trim(),
          email: email.trim() || undefined,
          page: window.location.pathname,
        }),
      });

      if (!res.ok) throw new Error('Server error');
      setState('done');
      analytics.feedbackSubmit();
    } catch {
      setError('Something went wrong. Try again.');
      setState('open');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
    if (e.key === 'Escape') close();
  };

  const isOpen = state === 'open' || state === 'submitting' || state === 'done';

  // Shared form body used in both mobile and desktop panels
  const formBody = (
    <div className="p-4">
      {state === 'done' ? (
        <p className="font-mono text-sm">Thanks. Noted. 👊</p>
      ) : (
        <>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's broken? What's missing? What do you need?"
            disabled={state === 'submitting'}
            rows={4}
            className="border-border placeholder:text-muted-foreground focus:border-amber w-full resize-none border bg-transparent p-3 font-mono text-sm transition-colors outline-none disabled:opacity-50"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Email (optional — for a reply)"
            disabled={state === 'submitting'}
            className="border-border placeholder:text-muted-foreground focus:border-amber mt-2 w-full border bg-transparent p-3 font-mono text-xs transition-colors outline-none disabled:opacity-50"
          />
          {error && <p className="text-destructive mt-2 font-mono text-xs">{error}</p>}
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || state === 'submitting'}
              className="bg-amber hover:bg-amber/90 disabled:bg-muted flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold text-white transition-colors disabled:cursor-not-allowed disabled:text-white/50"
            >
              <Send size={12} />
              {state === 'submitting' ? 'Sending...' : 'Send'}
            </button>
          </div>
        </>
      )}
    </div>
  );

  const panelHeader = (
    <div className="border-border flex items-center justify-between border-b px-4 py-3">
      <span className="font-mono text-xs font-bold tracking-widest uppercase">Feedback</span>
      <button
        onClick={close}
        className="text-muted-foreground hover:text-foreground -mr-1 p-1 transition-colors"
        aria-label="Close"
      >
        <X size={14} />
      </button>
    </div>
  );

  return (
    <>
      {/* ── Mobile: slide-up sheet from bottom ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Tap-outside backdrop */}
        {isOpen && <div className="fixed inset-0 -z-10 bg-black/20" onClick={close} />}
        <div className="border-border bg-background border-t-2 shadow-2xl">
          {panelHeader}
          {formBody}
        </div>
      </div>

      {/* ── Desktop: filing-cabinet drawer ── */}
      {/* Whole assembly translates together. Closed = shifted right by panel width (w-72 = 288px),
          leaving only the tab visible at the viewport edge. Open = translate-x-0. */}
      <div
        className={`fixed top-1/2 right-0 z-50 hidden -translate-y-1/2 items-start transition-transform duration-300 ease-out md:flex ${
          isOpen ? 'translate-x-0' : 'translate-x-72'
        }`}
      >
        {/* Tab — leftmost, always the visible "handle" */}
        <button
          onClick={() => setState(isOpen ? 'idle' : 'open')}
          className="border-border bg-background hover:bg-muted text-amber flex shrink-0 items-center border-y-2 border-l-2 px-1.5 py-3 font-mono text-[0.6rem] font-bold tracking-widest uppercase shadow-md transition-colors"
          aria-label={isOpen ? 'Close feedback' : 'Open feedback'}
        >
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Feedback</span>
        </button>
        {/* Panel — slides in with the tab */}
        <div className="border-border bg-background w-72 border-2 shadow-xl">
          {panelHeader}
          {formBody}
        </div>
      </div>
    </>
  );
}
