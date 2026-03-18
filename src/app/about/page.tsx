import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import EmailSignupInline from '@/components/email-signup-inline';

export const metadata: Metadata = {
  title: 'About Luke — Modryn Studio',
  description:
    "I'm Luke — one-person studio out of Wisconsin. I find problems worth solving and build the pipeline that delivers the answer. No team. No investors. Just shipping.",
  openGraph: {
    title: 'About Luke — Modryn Studio',
    description:
      "I'm Luke — one-person studio out of Wisconsin. I find problems worth solving and build the pipeline that delivers the answer. No team. No investors. Just shipping.",
    url: 'https://modrynstudio.com/about',
    siteName: 'Modryn Studio',
    type: 'profile',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Modryn Studio' }],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who built Modryn Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Luke — a one-person studio out of Wisconsin. He finds problems worth solving and builds the pipeline that delivers the answer. No team, no investors, no nonsense.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Modryn Studio handle user data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Tools run on your device, don't require an account, don't store your data on servers, and charge you only for what you actually use. No subscriptions, no lock-in, no dark patterns. Your input stays on your machine.",
      },
    },
    {
      '@type': 'Question',
      name: "What is Modryn Studio's business model?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pay for what you use — like electricity. No monthly subscription, no cancel-anytime fine print. Top up when you want, stop when you want. Tools cost what they cost to run, plus a margin.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are Modryn Studio tools built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trends are identified early, and specific results people will pay for are isolated. Then a pipeline that delivers that result is built and shipped. No team, no investors, no long roadmaps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Modryn Studio headed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The goal is a portfolio of pipelines — each one delivering a specific result to a specific kind of person — that compounds over time into a real business. One result at a time.',
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Header */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
        <Image
          src="/luke.png"
          alt="Luke"
          width={96}
          height={96}
          className="border-border h-24 w-24 shrink-0 rounded-none border-2 object-cover grayscale"
          priority
        />
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">
            I don&apos;t build tools. I build pipelines that hand you the answer.
          </h1>
          <p className="text-muted-foreground mt-4 font-mono text-sm">
            One person. Wisconsin. Shipping anyway.
          </p>
        </div>
      </div>

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
            <p>
              Software isn&apos;t a tool you pick up anymore. It&apos;s an agent that acts for you.
            </p>
            <p>
              That changes what people will pay for. Nobody wants another interface to learn,
              another dashboard to configure, another tool that makes them do the work. They want
              the finished thing. The answer. The result.
            </p>
            <p>
              The builders who figure out how to deliver that — without friction, without an
              account, without a subscription trap — are going to win the next five years.
            </p>
            <p>That&apos;s the bet I&apos;m making.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">The Model</h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>
              I run a trend detection pipeline every morning. It scores what&apos;s rising, clusters
              related signals, and surfaces the results people are actively searching for.
            </p>
            <p>
              Then I ask one question:{' '}
              <em>
                is there a result here someone will pay for — that I can deliver almost entirely
                through an agent pipeline, owning the system?
              </em>
            </p>
            <p>If yes, I build it. If the answer&apos;s fuzzy, I skip it.</p>
            <p>
              Everyone can build fast now. That&apos;s not the edge anymore. The edge is
              distribution — being known, findable, and trusted before you launch. I use the time AI
              saves me to get in front of the right people, not to add more features.
            </p>
            <p>
              The business model is simple: pay for what you use, like electricity. No monthly
              subscription. No &quot;cancel anytime&quot; fine print. My tools cost what they cost
              to run, plus a margin. That&apos;s it.
            </p>
          </div>
        </section>

        {/* Section — How I Think About Your Data */}
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            How I Think About Your Data
          </h2>
          <div className="mt-4 space-y-4 font-mono">
            <p>
              Most tools want your email before you can try them. Then a password. Then a plan. Then
              a credit card. Now you&apos;re locked in, getting promo emails, paying whether you use
              it or not.
            </p>
            <p>I think that&apos;s lazy product design dressed up as a business model.</p>
            <p>
              I&apos;m building the opposite: tools that run on your device, don&apos;t require an
              account, don&apos;t store your data on my servers, and charge you only for what you
              actually use. No subscriptions. No lock-in. No dark patterns.
            </p>
            <p>
              When you use one of my tools, your input stays on your machine. I handle billing.
              That&apos;s it. I don&apos;t want your prompts. I don&apos;t want your data. I want to
              build something good enough that you come back because you want to.
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
              Distribution. The social media grind — comments, threads, the &quot;engage with your
              audience&quot; machine. I&apos;m working on it.
            </p>
            <p>
              I know it&apos;s the actual job now. Building is the easy part. Getting in front of
              the right person, at the right moment, with the right message — that&apos;s what
              separates a useful pipeline from one nobody ever finds.
            </p>
            <p>
              No shortcuts. No spam. Just building things worth sharing and getting better at
              sharing them.
            </p>
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
            <p>No alarm. No commute. Just the next pipeline.</p>
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
        </div>
        <EmailSignupInline />
      </div>
    </div>
  );
}
