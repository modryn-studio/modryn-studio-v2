import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { FeedbackTrigger } from '@/components/feedback-trigger';
import { site } from '@/config/site';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export default function Footer() {
  const navLinks = [
    { label: 'Tools', href: '/tools' },
    { label: 'Log', href: '/log' },
    { label: 'About', href: '/about' },
  ];

  const legalLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        {/* Main row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left: Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" aria-label="Modryn Studio home" className="flex items-center gap-2.5">
              <Image
                src="/brand/logomark.png"
                alt="Modryn Studio"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span className="font-heading text-foreground text-sm font-semibold tracking-tight">
                Modryn Studio
              </span>
            </Link>
            <p className="text-muted-foreground max-w-55 font-mono text-xs leading-relaxed">
              Built by Luke. Paid for by a day job. Shipping anyway.
            </p>
          </div>

          {/* Right: Nav + Social */}
          <div className="flex flex-col gap-5">
            {/* Nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <FeedbackTrigger />
            </nav>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-10 border-t pt-6">
          <p className="text-muted-foreground font-mono text-xs">
            &copy; {new Date().getFullYear()} Modryn Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
