import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
      <h1 className="font-heading text-4xl leading-tight font-bold tracking-tighter sm:text-5xl lg:text-6xl">
        Tools for people who don&apos;t
        <br className="hidden sm:block" />
        have time for bad software.
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl font-mono text-base leading-relaxed md:text-lg">
        I&apos;m Luke. I build fast, focused AI tools — one at a time. No fluff. No traps. Just
        things that work.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#log">
          <Button className="bg-amber hover:bg-amber/90 h-11 rounded-none px-6 font-mono text-sm text-white">
            Follow the build
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        <a href="#tools">
          <Button
            variant="outline"
            className="border-border hover:bg-muted h-11 rounded-none px-6 font-mono text-sm"
          >
            See what&apos;s in the works
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  );
}
