// Single source of truth for all site-wide metadata.
// Every file that needs the site name, URL, description, or brand colors imports from here.
// Change a value once — layout, manifest, sitemap, JSON-LD, and OG all update on next build.
export const site = {
  name: 'Modryn Studio',
  shortName: 'Modryn',
  url: 'https://modrynstudio.com',
  // Base description — used in <meta description>, manifest, JSON-LD
  description:
    "Tools for people who don't have time for bad software. Fast, focused AI tools — built one at a time.",
  // Longer form for social cards (OG / Twitter)
  ogTitle: 'Modryn Studio | Fast, Focused AI Tools for Builders',
  ogDescription:
    "Fast, focused AI tools built one at a time. No bloat, no nonsense. Built for people who don't have time for bad software.",
  founder: 'Luke Hanner',
  // Brand colors — used in manifest theme_color / background_color
  accent: '#F97415',
  bg: '#050505',
} as const;
