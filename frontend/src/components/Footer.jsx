import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const links = [
    { label: "Tools", href: "#tools" },
    { label: "Log", href: "#log" },
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  return (
    <footer
      id="about"
      data-testid="footer"
      className="border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <span
            data-testid="footer-logo"
            className="font-heading text-base font-semibold tracking-tight text-foreground"
          >
            Modryn Studio
          </span>

          {/* Links */}
          <nav
            data-testid="footer-nav"
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`footer-link-${link.label.toLowerCase()}`}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Tagline */}
          <p
            data-testid="footer-tagline"
            className="font-mono text-xs text-muted-foreground text-center md:text-right"
          >
            Built by Luke. Paid for by a day job. Shipping anyway.
          </p>
        </div>
      </div>
    </footer>
  );
}
