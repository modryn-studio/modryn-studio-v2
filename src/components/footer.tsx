import Link from 'next/link';
import { Github } from 'lucide-react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export default function Footer() {
  const links = [
    { label: 'Tools', href: '/tools' },
    { label: 'Log', href: '/log' },
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  return (
    <footer id="about" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <span className="font-heading text-foreground text-base font-semibold tracking-tight">
            Modryn Studio
          </span>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + Tagline */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/modryn-studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/lukehanner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon />
              </a>
            </div>
            <p className="text-muted-foreground text-center font-mono text-xs md:text-right">
              Built by Luke. Paid for by a day job. Shipping anyway.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
