# Modryn Studio - PRD

## Original Problem Statement
Build a landing page for Modryn Studio — a one-person AI tool studio run by Luke. Dark mode base with light/dark toggle, amber/burnt orange accent, Space Grotesk + Space Mono fonts. Sections: Nav, Hero, Tools Grid, Build Log, Email Signup, Footer.

## User Personas
- Indie hackers and solo builders
- Impatient people who hate bad software
- People with a finely tuned BS detector

## Core Requirements
- Dark mode default with system toggle
- Amber/Burnt Orange accent color
- Space Grotesk (headings) + Space Mono (body)
- No gradients, no stock photos, no corporate language
- Mobile first, fully responsive

## What's Been Implemented (Dec 2025)
- Sticky navbar with logo, nav links, theme toggle, Get Updates CTA
- Hero section with headline, subheadline, two CTAs
- Tools Grid with "Building" badge empty state card
- Build Log Preview with 3 hardcoded terminal-style entries
- Email Signup with static form + success state
- Footer with logo, links, tagline
- Dark/Light mode toggle with localStorage persistence
- All data-testid attributes for testing
- Custom scrollbar, selection color, smooth scroll

## Architecture
- Frontend: React + Tailwind CSS + Shadcn UI components
- Theme: Custom ThemeProvider using React Context + localStorage
- No backend API calls (static landing page)

## Prioritized Backlog
### P0 - Done
- [x] All 6 sections implemented
- [x] Dark/Light mode toggle
- [x] Mobile responsive with hamburger menu

### P1 - Next
- [ ] Connect email signup to backend (MongoDB storage)
- [ ] Add scroll-triggered fade-in animations
- [ ] SEO meta tags and Open Graph

### P2 - Future
- [ ] Build log CMS/admin for adding entries
- [ ] Tool cards with real tool data
- [ ] RSS feed for build log
