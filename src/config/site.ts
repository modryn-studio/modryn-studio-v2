// Single source of truth for all site-wide metadata.
// Every file that needs the site name, URL, description, or brand colors imports from here.
// Change a value once — layout, manifest, sitemap, JSON-LD, and OG all update on next build.
export const site = {
  name: 'Modryn Studio',
  shortName: 'Modryn',
  url: 'https://modrynstudio.com',
  // Base description — used in <meta description>, manifest, JSON-LD
  description:
    'Describe the problem. Get back the answer. One-person studio building pipelines that deliver finished results — shipped in public, one at a time.',
  // Longer form for social cards (OG / Twitter)
  ogTitle: 'Modryn Studio | Describe the Problem. Get the Answer.',
  ogDescription:
    'One person. Wisconsin. Building the pipelines that hand you a finished result — not another tool to figure out. No fluff. No friction.',

  cta: 'Explore the tools →',
  founder: 'Luke Hanner',
  email: 'hello@modrynstudio.com',
  // Brand colors — used in manifest theme_color / background_color
  accent: '#F97415',
  bg: '#050505',
  // Social profiles — used in footer links and Twitter card metadata
  social: {
    twitter: 'https://x.com/lukehanner',
    twitterHandle: '@lukehanner',
    github: 'https://github.com/modryn-studio',
    devto: 'https://dev.to/lukehanner',
    shipordie: 'https://shipordie.club/lukehanner',
  },
} as const;
