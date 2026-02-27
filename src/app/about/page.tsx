import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Modryn Studio',
  description:
    "I'm Luke. I build tools for people who don't have time for bad software. One person. Wisconsin. Shipping anyway.",
  openGraph: {
    title: 'About — Modryn Studio',
    description:
      "I'm Luke. I build tools for people who don't have time for bad software. One person. Wisconsin. Shipping anyway.",
    url: 'https://modrynstudio.com/about',
    siteName: 'Modryn Studio',
    type: 'profile',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      {/* Header */}
      <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">
        I&apos;m Luke. I build tools for people who don&apos;t have time for bad software.
      </h1>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
        One person. Wisconsin. Shipping anyway.
      </p>

      <div className="text-foreground/80 mt-16 space-y-16 text-sm leading-relaxed">
        {/* Section 1 */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">How This Started</h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>
              Six months ago I was trying to build a custom GPT. That rabbit hole led me to JSON,
              schemas, APIs. Something clicked.
            </p>
            <p>
              I built my first real project from scratch: a prop firm comparison site for futures
              traders. It wasn&apos;t pretty. But it worked. And I was hooked.
            </p>
            <p>
              Since then I&apos;ve built probably 30 repos. Half of them are half-finished. Ten of
              them are websites I tried to sell. Until I found out I hate cold calling even more
              than I hate bad software.
            </p>
            <p>
              I learned to code by asking ChatGPT and Claude dumb questions. I still do. I
              don&apos;t think that&apos;s cheating. I think that&apos;s the future.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">The Way I See It</h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>Software shouldn&apos;t require a computer science degree to build or to use.</p>
            <p>
              I believe we&apos;re heading toward a world where anyone with an idea can just... make
              the thing. A business owner who needs a custom tool builds it in an afternoon. Someone
              who wants a task tracker that works exactly the way their brain works just makes it.
            </p>
            <p>That future is closer than most people think. I&apos;m building toward it.</p>
            <p>
              In the meantime, I build focused tools for impatient people. The ones who don&apos;t
              want to read a manual, don&apos;t want to pay for ten features they&apos;ll never use,
              and don&apos;t want to be tricked into a subscription they can&apos;t cancel.
            </p>
            <p>I&apos;m one of those people. That&apos;s why I build for them.</p>
          </div>
        </section>

        {/* Section — How I Think About Your Data */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            How I Think About Your Data
          </h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>
              Most tools want your email before you can try them. Then a password. Then a plan.
              Then a credit card. Now you&apos;re locked in, getting promo emails, paying
              whether you use it or not.
            </p>
            <p>I think that&apos;s lazy product design dressed up as a business model.</p>
            <p>
              I&apos;m building the opposite: tools that run on your device, don&apos;t require
              an account, don&apos;t store your data on my servers, and charge you only for what
              you actually use. No subscriptions. No lock-in. No dark patterns.
            </p>
            <p>
              When you use one of my tools, your input stays on your machine. I handle billing.
              That&apos;s it. I don&apos;t want your prompts. I don&apos;t want your data.
              I want to build something good enough that you come back because you want to.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">The Model</h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>I find trends early. I pick one problem. I build one tool. I ship it in 48 hours.</p>
            <p>No team. No investors. No roadmap with 47 items on it.</p>
            <p>
              AI-assisted development means I can move at a speed that wasn&apos;t possible two
              years ago. I use that speed advantage to take more bets, learn faster, and get more
              shots at building something people actually care about.
            </p>
            <p>
              The business model is simple: pay for what you use, like electricity. No monthly
              subscription. No &quot;cancel anytime&quot; fine print. Top up when you want, stop
              when you want. My tools cost what they cost to run, plus a margin. That&apos;s it.
            </p>
            <p>
              It&apos;s a numbers game. I know most ideas won&apos;t land. The ones that do will
              make the ones that didn&apos;t worth it.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            What I&apos;m Bad At
          </h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>
              Marketing. Specifically the social media part: the comments, the threads, the
              &quot;engage with your audience&quot; grind. I&apos;m working on it.
            </p>
            <p>
              I&apos;m better at building than selling. Most builders are. The plan is to let the
              tools speak, let search do the work, and build an audience the slow honest way.
            </p>
            <p>No shortcuts. No spam. Just shipping things worth sharing.</p>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">Where This Goes</h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>
              There&apos;s a version of Tuesday I&apos;m working toward where I wake up, make
              coffee, and just build the next thing.
            </p>
            <p>No alarm. No commute. Just the next project.</p>
            <p>Modryn Studio is the bet I&apos;m making to get there.</p>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="border-border mt-20 border-t pt-10">
        <p className="font-heading text-foreground text-lg font-semibold">
          Want to follow the build?
        </p>
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-sm">
          <Link
            href="/tools"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            See the tools →
          </Link>
          <Link
            href="/log"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Read the log →
          </Link>
          <Link
            href="/#signup"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Get notified →
          </Link>
        </div>
      </div>
    </div>
  );
}
