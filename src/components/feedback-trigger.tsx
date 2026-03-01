'use client';

// Mobile-only: dispatches the open-feedback event that feedback-widget.tsx listens for.
// Rendered inside the footer, hidden on md+ where the side tab takes over.
export function FeedbackTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-feedback'))}
      className="text-amber hover:text-amber/80 cursor-pointer font-mono text-xs transition-colors md:hidden"
    >
      Feedback
    </button>
  );
}
