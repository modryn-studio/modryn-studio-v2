import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="signup"
      data-testid="signup-section"
      className="border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-lg text-center">
          <h2
            data-testid="signup-heading"
            className="font-heading text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Don't miss the drop.
          </h2>
          <p
            data-testid="signup-subtext"
            className="mt-4 font-mono text-sm text-muted-foreground md:text-base"
          >
            I build tools fast. Get notified when the next one goes live.
            No newsletters. Just launches.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              data-testid="signup-form"
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="signup-email-input"
                className="h-12 flex-1 rounded-none border-2 border-foreground/20 bg-transparent px-4 font-mono text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-amber"
              />
              <Button
                type="submit"
                data-testid="signup-submit-btn"
                className="h-12 rounded-none bg-amber px-8 font-mono text-sm font-bold text-white hover:bg-amber/90"
              >
                Notify me
              </Button>
            </form>
          ) : (
            <div
              data-testid="signup-success"
              className="mt-8 border border-amber/30 bg-amber/5 p-4 font-mono text-sm text-amber"
            >
              You're on the list. Next launch, your inbox.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
