import Link from 'next/link';

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

          {/* Tagline */}
          <p className="text-muted-foreground text-center font-mono text-xs md:text-right">
            Built by Luke. Paid for by a day job. Shipping anyway.
          </p>
        </div>
      </div>
    </footer>
  );
}
