import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllTools } from '@/lib/tools';

export default function Hero() {
  const buildingTool = getAllTools().find((t) => t.status === 'building');

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-36">
      {buildingTool && (
        <div className="mb-8 flex items-center gap-2 font-mono text-xs">
          <span className="bg-amber inline-block h-2 w-2 animate-pulse rounded-full" />
          <span className="text-muted-foreground">Building now:</span>
          <Link
            href={`/tools/${buildingTool.slug}`}
            className="text-amber underline-offset-4 hover:underline"
          >
            {buildingTool.name}
          </Link>
        </div>
      )}
      <h1 className="font-heading text-4xl leading-tight font-bold tracking-tighter sm:text-5xl lg:text-6xl">
        I don&apos;t build tools.
        <br className="hidden sm:block" />
        I build pipelines that hand
        <br className="hidden sm:block" />
        you the answer.
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed md:text-lg">
        I&apos;m Luke. One builder. One pipeline at a time. I pick the best opportunity, build the
        thing that hands back a finished result, and ship it.{' '}
        <Link
          href="/about"
          className="text-foreground underline underline-offset-4 transition-colors hover:text-amber"
        >
          More about how I work &rarr;
        </Link>
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#signup">
          <Button className="bg-amber hover:bg-amber/90 h-11 rounded-none px-6 font-mono text-sm text-white">
            Follow the builds
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        <a href="#tools">
          <Button
            variant="secondary"
            className="border-border hover:bg-muted h-11 rounded-none px-6 font-mono text-sm"
          >
            Browse the tools
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  );
}
