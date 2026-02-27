# Modryn Studio — Copilot Context

## Who I Am
I'm Luke, a one-person studio owner building micro-SaaS products under Modryn Studio (modrynstudio.com). I build fast using AI-assisted development — detecting rising trends, scoring them, and shipping a targeted tool in 48 hours to capture organic search traffic early. The site is a product studio launchpad that grows with every tool I ship, not a portfolio or agency brochure. Target users are impatient people who hate bad software and don't want to do the research — they want it handed to them, fast.

## Stack
- Next.js 16 (App Router) with TypeScript
- React 19
- Tailwind CSS v4 for styling
- Radix UI primitives (`@radix-ui/react-separator`, `@radix-ui/react-slot`)
- `class-variance-authority`, `clsx`, `tailwind-merge` for component variants and class merging
- `lucide-react` for icons
- Vercel for deployment
- GA4 for custom event tracking (via `@/lib/analytics.ts` — never call `gtag()` directly)
- Vercel Analytics `<Analytics />` component in `layout.tsx` for pageviews only — do not use their `track()` API

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
- **Local-first by default** — no accounts, no data stored server-side, pay only when you use it. This is a brand-level commitment across every product, not a feature toggle.

## Positioning Decision: AI
Do NOT lead with "AI" in copy or headlines. The backlash is real and targets AI hype, not useful tools. Lead with outcomes and the user's problem. AI is an implementation detail, not a selling point.
- ✅ "Tools for people who don't have time for bad software"
- ✅ "I did the research so you don't have to"
- ❌ "AI-powered", "AI-first", "built with AI"
Products use AI internally. The marketing never needs to say so.

## Distribution Infrastructure
- `/feed.xml` — RSS feed of all log posts, auto-polled by dev.to (posts land as drafts, publish manually)
- `/social` prompt — generates X, Reddit, and shipordie.club copy from any log post or tool JSON. Run it here after merging a PR from another repo.
- Share buttons on every log post (X, Reddit, HN, copy link)

## Active Products

**SpecifyThat** (`modryn-studio/specifythat`)
- Spec generator — 13 questions, build-ready spec in under 60 seconds
- v1 live; v2 rebuild in progress (7 GitHub issues, sequential)
- v2 decisions: OpenAI proxy pattern (never log prompts), localStorage persistence (VersionedStorage), IP rate limiting (free trial), Stripe deferred until >20% users hit limits
- Site entry: `content/tools/specifythat.json`, status: `"building"`

**Trend Detector** (`modryn-studio/trend-detector`)
- Private Python pipeline — runs locally, not yet public
- Phase 1: daily cron → pytrends-modern → scored JSON in `data/trends_YYYY-MM-DD.json`
- Phase 2: public web tool (blocked on reliable Google Trends API access)
- Site entry: `content/tools/trend-detector.json`, status: `"building"`
- Key files: `fetcher.py`, `scorer.py`, `pipeline.py`
- Run manually: `python pipeline.py --all` (covers all 6 categories)
- Brand noise filter in `scorer.py` blocks known product names (claude, chatgpt, etc.)
- Decision signal: search demand from pipeline + Reddit/HN complaint = build it
