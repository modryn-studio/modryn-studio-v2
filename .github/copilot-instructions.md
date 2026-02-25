# Modryn Studio — Copilot Context

## Who I Am
I'm Luke, a one-person studio owner building AI-first tools and micro-SaaS products under Modryn Studio (modrynstudio.com). I build fast using AI-assisted development — detecting rising trends, scoring them, and shipping a targeted tool in 48 hours to capture organic search traffic early. The site is a product studio launchpad that grows with every tool I ship, not a portfolio or agency brochure. Target users are impatient people who hate bad software and don't want to do the research — they want it handed to them, fast.

## Stack
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS for styling
- Vercel for deployment
- GA4 for custom event tracking (via `@/lib/analytics.ts` — never call `gtag()` directly)
- Vercel Analytics `<Analytics />` component in `layout.tsx` for pageviews only — do not use their `track()` API
- Resend for email capture (follow-the-build signup)
- MDX for build log content (no CMS, no database)

## Project Structure
```
/app                    → Next.js App Router pages
/components             → Reusable UI components
/lib                    → Utilities, helpers, data fetching
/content/tools          → Tool data as JSON files (adding a tool = add a JSON file)
/content/log            → Build log posts as MDX files
```

## Route Map
- `/`                  → Hero + tools grid + build log preview + email signup
- `/tools`             → All tools (live, beta, coming soon)
- `/tools/[slug]`      → Individual tool page — SEO magnet + launch page with status badge, description, screenshot, and email capture if not live
- `/log`               → Build in public feed (MDX files)
- `/log/[slug]`        → Individual log post
- `/about`             → Who Luke is, how he works, his stack
- `/privacy`           → Privacy policy
- `/terms`             → Terms of service

## API Route Logging

Every new API route (`app/api/**/route.ts`) MUST use `createRouteLogger` from `@/lib/route-logger`.

```typescript
import { createRouteLogger } from '@/lib/route-logger';
const log = createRouteLogger('my-route');

export async function POST(req: Request): Promise<Response> {
  const ctx = log.begin();
  try {
    log.info(ctx.reqId, 'Request received', { /* key fields */ });
    // ... handler body ...
    return log.end(ctx, Response.json(result), { /* key result fields */ });
  } catch (error) {
    log.err(ctx, error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

- `begin()` prints the `─` separator + START line with a 5-char `reqId`
- `info()` / `warn()` log mid-request milestones
- `end()` logs ✅ with elapsed ms and returns the response
- `err()` logs ❌ with elapsed ms
- Never use raw `console.log` in routes — always go through the logger

## Analytics

All custom events MUST go through `analytics` from `@/lib/analytics.ts` — never call `gtag()` directly.

```typescript
import { analytics } from '@/lib/analytics';
analytics.track('event_name', { prop: value });
```

Add a named method to `analytics.ts` for each distinct user action. Named methods are typed and
discoverable — no magic strings scattered across 10 files.

GA4 measurement ID is loaded via `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `layout.tsx`.

## Dev Server

Start with `Ctrl+Shift+B` (default build task). This runs:
```
npm run dev -- --port 3000 2>&1 | Tee-Object -FilePath dev.log
```
Tell Copilot **"check logs"** at any point — it reads `dev.log` and flags errors or slow requests.

## Code Style
- Write as a senior engineer: minimal surface area, obvious naming, no abstractions before they're needed
- Comments explain WHY, not what
- One file = one responsibility
- Prefer early returns for error handling
- Never break existing functionality when adding new features
- Leave TODO comments for post-launch polish items

## Brand & Voice

**Voice**
- Short sentences. Direct. No jargon.
- Honest about what doesn't exist yet
- Confident without being arrogant
- Never use: "powerful", "seamless", "revolutionary", "unlock"

**The User**
Impatient people who hate bad software and don't want to do the research. They want it handed to them. Fast.

**Visual Rules**
- Dark mode base, system toggle
- Accent: Amber / Burnt Orange
- Fonts: Space Grotesk (headlines) + Space Mono (badges/log/code)
- Minimal motion. One scroll fade max.
- No fake testimonials, no stock photos, no popups

**Emotional Arc**
Land → "Wait, this is different"
Read → "This person actually builds real things"
Scroll → "I want to follow this journey"
Convert → "I don't want to miss the next one"

**Copy Examples (use as reference)**
- Hero: "Tools for people who don't have time for bad software."
- CTA: "Don't miss the drop."
- Footer: "Built by Luke. Paid for by a day job. Shipping anyway."

## Core Rules
- Every page earns its place — no pages for businesses not yet running
- Ship fast, stay honest — empty is better than fake
- Ugly is acceptable, broken is not — polish the core action ruthlessly
- Ship one killer feature, not ten mediocre ones
- Instrument analytics before features — data from day one
- Onboard users to value in under 2 minutes
