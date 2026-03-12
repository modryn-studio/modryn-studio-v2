'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  newToolsCount?: number;
  newPostsCount?: number;
}

export default function Navbar({ newToolsCount = 0, newPostsCount = 0 }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const resolvedTheme =
    theme === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Tools', href: '/tools', badge: newToolsCount },
    { label: 'Log', href: '/log', badge: newPostsCount },
    { label: 'About', href: '/about', badge: 0 },
  ];

  return (
    <nav className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Modryn Studio home">
          <Image
            src="/brand/logomark.png"
            alt="Modryn Studio"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span className="font-heading text-foreground hidden text-lg font-semibold tracking-tight md:block">
            Modryn Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground relative px-3 py-2 text-sm transition-colors"
            >
              {link.label}
              {link.badge > 0 && (
                <span className="bg-amber ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-none px-1 font-mono text-[10px] text-white">
                  {link.badge > 9 ? '9+' : link.badge}
                </span>
              )}
            </Link>
          ))}
          {/* custom shape — intentionally raw <button> */}
          <button
            onClick={toggleTheme}
            aria-label={
              mounted
                ? resolvedTheme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
                : 'Toggle theme'
            }
            className="text-muted-foreground hover:text-foreground ml-2 flex h-9 w-9 items-center justify-center transition-colors focus-visible:outline-none"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>
          <Link href="/#signup">
            <Button className="bg-amber hover:bg-amber/90 ml-2 rounded-none font-mono text-sm text-white">
              Get Updates
            </Button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* custom shape — intentionally raw <button> */}
          <button
            onClick={toggleTheme}
            aria-label={
              mounted
                ? resolvedTheme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
                : 'Toggle theme'
            }
            className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center transition-colors focus-visible:outline-none"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>
          {/* custom shape — intentionally raw <button> */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center transition-colors focus-visible:outline-none"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-border bg-background border-t px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground hover:text-foreground block py-2 text-sm transition-colors"
            >
              {link.label}
              {link.badge > 0 && (
                <span className="bg-amber ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-none px-1 font-mono text-[10px] text-white">
                  {link.badge > 9 ? '9+' : link.badge}
                </span>
              )}
            </Link>
          ))}
          <Link href="/#signup" onClick={() => setMobileOpen(false)}>
            <Button className="bg-amber hover:bg-amber/90 mt-3 w-full rounded-none font-mono text-sm text-white">
              Get Updates
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
