export default function Footer() {
  const links = [
    { label: "Tools", href: "#tools" },
    { label: "Log", href: "#log" },
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  return (
    <footer id="about" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <span className="font-heading text-base font-semibold tracking-tight text-foreground">
            Modryn Studio
          </span>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Tagline */}
          <p className="font-mono text-xs text-muted-foreground text-center md:text-right">
            Built by Luke. Paid for by a day job. Shipping anyway.
          </p>
        </div>
      </div>
    </footer>
  );
}
