import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40"
    >
      <h1
        data-testid="hero-headline"
        className="font-heading text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl"
      >
        Tools for people who don't
        <br className="hidden sm:block" />
        have time for bad software.
      </h1>
      <p
        data-testid="hero-subheadline"
        className="mt-6 max-w-xl font-mono text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        I'm Luke. I build fast, focused AI tools — one at a time.
        No fluff. No traps. Just things that work.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#tools">
          <Button
            data-testid="hero-cta-tools"
            className="rounded-none bg-amber text-white font-mono text-sm hover:bg-amber/90 h-11 px-6"
          >
            See what's building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <a href="#log">
          <Button
            data-testid="hero-cta-log"
            variant="outline"
            className="rounded-none font-mono text-sm h-11 px-6 border-border hover:bg-muted"
          >
            Follow the build
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  );
}
