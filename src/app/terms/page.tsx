import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Modryn Studio",
  description: "Terms of service for Modryn Studio.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">
        Terms of Service
      </h1>
      <p className="mt-2 font-mono text-xs text-muted-foreground">
        Last updated: February 25, 2026
      </p>

      <div className="mt-8 space-y-6 font-mono text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            What this site is
          </h2>
          <p className="mt-2">
            Modryn Studio (modrynstudio.com) is a product studio that builds
            and ships software tools. Some tools are free, some may be paid in
            the future. The site itself is a launchpad — it lists tools, their
            status, and lets you sign up for launch notifications.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Use at your own risk
          </h2>
          <p className="mt-2">
            Tools marked &quot;beta&quot; or &quot;building&quot; are works in
            progress. They may break, change, or disappear. We do our best to
            ship quality software, but nothing here comes with a warranty.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Your email
          </h2>
          <p className="mt-2">
            When you sign up, you give us permission to send you emails about
            new tool launches. You can ask to be removed at any time by
            emailing luke@modrynstudio.com.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Intellectual property
          </h2>
          <p className="mt-2">
            All content, code, and design on this site belongs to Modryn
            Studio unless otherwise stated. Don&apos;t copy it wholesale. If
            you want to reference or share something, just link to it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Changes
          </h2>
          <p className="mt-2">
            These terms may change as the site grows. We&apos;ll update the
            date at the top when they do. Continued use of the site means you
            accept the current terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            Questions? Email luke@modrynstudio.com.
          </p>
        </section>
      </div>
    </div>
  );
}
