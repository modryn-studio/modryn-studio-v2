import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Modryn Studio',
  description: 'Privacy policy for Modryn Studio.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tighter">Privacy Policy</h1>
      <p className="text-muted-foreground mt-2 font-mono text-xs">
        Last updated: February 26, 2026
      </p>

      <div className="text-foreground/80 mt-8 space-y-6 font-mono text-sm leading-relaxed">
        <section>
          <h2 className="font-heading text-foreground text-lg font-semibold">What we collect</h2>
          <p className="mt-2">
            If you sign up for email notifications, we collect your email address. If you submit
            feedback via the feedback widget, we collect your message and, optionally, your email
            address if you choose to include it. No names, no phone numbers, no payment info.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-lg font-semibold">How we use it</h2>
          <p className="mt-2">
            Your email is used to notify you when new tools launch. We don&apos;t sell it, share it,
            or use it for anything else.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-lg font-semibold">Analytics</h2>
          <p className="mt-2">
            We use Google Analytics 4 and Vercel Analytics to understand how people use the site —
            page views, device types, general location. No personally identifiable information is
            collected through analytics.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-lg font-semibold">Cookies</h2>
          <p className="mt-2">
            Google Analytics sets cookies to distinguish users and sessions. We store a theme
            preference in localStorage (not a cookie). No advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-lg font-semibold">Third parties</h2>
          <p className="mt-2">
            Email notifications are sent via Gmail SMTP. Newsletter signups are stored in Resend,
            which we use to send broadcast emails. Analytics data is processed by Google and Vercel.
            No other third-party services have access to your data.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-lg font-semibold">Contact</h2>
          <p className="mt-2">Questions? Email luke@modrynstudio.com.</p>
        </section>
      </div>
    </div>
  );
}
