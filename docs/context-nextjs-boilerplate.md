# Context: modryn-studio/nextjs_boilerplate

> Repo: https://github.com/modryn-studio/nextjs_boilerplate
> Status: **Older alias** of the canonical boilerplate.
> Canonical repo: `modryn-studio/boilerplate` — see `context-boilerplate.md`.

---

## Relationship to `boilerplate`

`nextjs_boilerplate` and `boilerplate` are the same system. Nearly all files are byte-for-byte identical. The differences are minor:

| What                   | `boilerplate` (canonical)                                                          | `nextjs_boilerplate`                  |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| `.github/HOW-TO.md`    | Has **Option A** (clone from scratch) + **Option B** (layer onto existing project) | Single path only (clone from scratch) |
| `feedback-trigger.tsx` | Slightly newer version                                                             | Slightly older version                |
| `feedback-widget.tsx`  | Slightly newer version                                                             | Slightly older version                |
| `cn.ts`                | Minor update                                                                       | Previous version                      |
| Everything else        | Identical                                                                          | Identical                             |

**When to use `nextjs_boilerplate`:** If a product was already started from this repo, keep working in it — there is no need to migrate. The workflow, commands, and components all behave the same.

**When starting new:** Use `boilerplate`.

---

## What This Is

A ready-to-deploy Next.js app template for Modryn Studio micro-SaaS tools. The goal is to go from "new idea" to "live on Vercel" in under 48 hours. Ships with:

- A working app with privacy/terms pages
- GA4 analytics wired up and abstracted
- Email capture (Resend) and feedback (Gmail SMTP) out of the box
- A local-first Stripe pay gate with no server code required
- JSON-LD schema, robots.txt, sitemap, and web manifest
- A full Copilot agent workflow: slash commands, a quality gate agent, auto-formatting, and log monitoring
- A brand asset generator (favicons, OG image, README banner) from a single logomark

---

## Stack

```
Next.js 16 (App Router) + TypeScript
React 19
Tailwind CSS v4
Vercel (deployment)
GA4 (analytics via @/lib/analytics.ts)
Resend (email list capture — optional)
nodemailer (feedback emails via Gmail SMTP)
Stripe (one-time payments — optional)
```

**No:** Prisma, Supabase, auth libraries, ORMs, or any database. Local-first by default.

---

## Project Structure

```
.github/
├── copilot-instructions.md        ← Always-on Copilot context (filled by /init)
├── HOW-TO.md                      ← How to use this system (clone-from-scratch path only)
├── agents/
│   └── check.agent.md             ← @check quality gate agent definition
├── prompts/
│   ├── init.prompt.md             ← /init command
│   ├── update.prompt.md           ← /update command
│   ├── assets.prompt.md           ← /assets command
│   ├── deps.prompt.md             ← /deps command
│   ├── deploy.prompt.md           ← /deploy command
│   ├── tool.prompt.md             ← /tool command
│   ├── log.prompt.md              ← /log command
│   ├── seo.prompt.md              ← /seo command
│   └── launch.prompt.md           ← /launch command
├── instructions/
│   ├── nextjs.instructions.md     ← Auto-applied to .ts/.tsx (App Router patterns)
│   └── seo.instructions.md        ← Auto-applied to .ts/.tsx (metadata, OG, a11y)
└── hooks/

.vscode/
├── settings.json                  ← Agent mode on, formatOnSave, Prettier default
├── extensions.json                ← Recommends Prettier on first open
└── mcp.json                       ← GitHub MCP server config

scripts/
└── generate-assets.ps1            ← Generates all favicons, OG image, banner from logomark

src/
├── app/
│   ├── layout.tsx                 ← Root layout: GA4 script, <Analytics />, theme
│   ├── page.tsx                   ← Home page
│   ├── manifest.ts                ← Web app manifest (reads from site.ts)
│   ├── robots.ts                  ← robots.txt (reads from site.ts)
│   └── api/
│       ├── feedback/route.ts      ← POST: sends feedback email via nodemailer/Gmail
│       └── checkout/route.ts      ← POST: creates Stripe Checkout Session (upgrade path)
├── components/
│   ├── email-signup.tsx           ← Email capture form → POST /api/email → Resend
│   ├── feedback-trigger.tsx       ← Floating "?" button that opens the feedback widget
│   ├── feedback-widget.tsx        ← Full feedback form (slides in from side)
│   ├── pay-gate.tsx               ← Local-first Stripe pay gate (localStorage receipt)
│   └── site-schema.tsx            ← JSON-LD WebSite + WebApplication schema
├── config/
│   └── site.ts                    ← SINGLE SOURCE OF TRUTH: name, URL, description, colors, social links
└── lib/
    ├── analytics.ts               ← GA4 abstraction — never call gtag() directly
    ├── cn.ts                      ← Tailwind class merge (clsx + tailwind-merge)
    └── route-logger.ts            ← API route logger (createRouteLogger)

context.md                         ← SOURCE OF TRUTH: product, user, deployment, routes, monetization
brand.md                           ← SOURCE OF TRUTH: voice, visuals, copy examples
development-principles.md          ← SOURCE OF TRUTH: permanent product philosophy
next.config.ts                     ← basePath set here for modryn-app mode; absent for standalone
```

---

## Setup (this repo — clone from scratch)

1. Clone the repo
2. Rename the project in GitHub
3. Open in VS Code
4. Run `/init` in Copilot Chat
5. Deploy to Vercel

---

## Deployment Modes

Set in `context.md`, propagated to `next.config.ts` and `src/lib/base-path.ts` by `/init`.

| Mode                   | Description                                                                 | basePath in next.config.ts |
| ---------------------- | --------------------------------------------------------------------------- | -------------------------- |
| `modryn-app`           | Served at modrynstudio.com/tools/[slug] via rewrites from modryn-studio-v2. | `/tools/your-slug`         |
| `standalone-subdomain` | Own Vercel deployment at subdomain.domain.com.                              | _(absent)_                 |
| `standalone-domain`    | Own Vercel deployment at root domain (e.g. specifythat.com).                | _(absent)_                 |

---

## Source-of-Truth Hierarchy

Three files are never auto-edited — authoritative inputs:

```
context.md               → product facts, stack, routes, monetization, social profiles
brand.md                 → voice, visual rules, emotional arc, copy examples
development-principles.md → permanent philosophy (do not edit per project)
```

Two files are derived — do not edit directly after `/init` runs:

```
.github/copilot-instructions.md   ← filled by /init, updated by /update
src/config/site.ts                 ← filled by /init, updated by /update
next.config.ts                     ← basePath set by /init
```

**Cascade rule:** edit a source doc → run `/update` immediately.

---

## Copilot Workflow

### `@check` Agent

Pre-ship quality gate. Run in Agent mode.

```
@check
```

Sequence: bug scan → security scan → code fixes → lint → build → commit.
**Never pushes.** Review the commit before pushing.

### Slash Commands

| Command   | When                                   | What it does                                                                                                     |
| --------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `/init`   | Once, at project start                 | Reads source docs, fills `copilot-instructions.md` and `site.ts`, wires monetization components, sets `basePath` |
| `/update` | Any time source docs change after init | Cascades changes to derived files only. Does NOT re-run wiring steps.                                            |
| `/deps`   | When questioning package staleness     | Web-searches changelogs for every key dep; returns version status table + breaking API changes                   |
| `/assets` | Once, when logomark is ready           | Checks prerequisites, runs `generate-assets.ps1`, commits output                                                 |
| `/deploy` | Pre-deploy                             | Vercel deployment checklist                                                                                      |
| `/tool`   | Twice: project start + launch          | Opens PR on modryn-studio-v2 with tool JSON. First: registers. Second: flips to `live`.                          |
| `/log`    | Any time you want a build post         | Reads recent commits, drafts MDX post, opens PR on modryn-studio-v2                                              |
| `/seo`    | Pre-launch, once                       | Audit + fix: robots, sitemap, manifest, OG, schema, GSC/Bing registration                                        |
| `/launch` | Pre-launch, after `/seo`               | Distribution checklist: sharing hooks, OG validation, social + FAQPage schema, posting sequence                  |

**Launch order:** `@check` → `/seo` → `/launch` → merge `/log` and `/tool` PRs → switch to modryn-studio-v2 and run `/social`

---

## Key Components

### `<PayGate>` — Local-First Stripe Pay Gate

`src/components/pay-gate.tsx`

Wraps content behind a one-time payment. Uses `localStorage` for the receipt — no accounts, no database.

**Two modes:**

1. **Payment Links (default):** Pass `checkoutUrl` pointing to a Stripe Payment Link. No env vars needed.
2. **Checkout Sessions (upgrade path):** Omit `checkoutUrl`. Requires `STRIPE_SECRET_KEY` + `STRIPE_PRICE_ID`.

```tsx
<PayGate
  valueProposition="What the user gets"
  price="$9"
  checkoutUrl="https://buy.stripe.com/your-link"
>
  {/* unlocked content */}
</PayGate>
```

### `<EmailSignup>` — Resend Email Capture

`src/components/email-signup.tsx`

POSTs to `/api/email`. Adds subscriber to a Resend Segment. Requires `RESEND_API_KEY` + `RESEND_SEGMENT_ID`.

### Feedback System

`src/components/feedback-trigger.tsx` + `src/components/feedback-widget.tsx`

Floating trigger opens a slide-in panel. POSTs to `/api/feedback`, sends email via nodemailer + Gmail SMTP. Requires `GMAIL_USER` + `GMAIL_APP_PASSWORD`.

### `<SiteSchema>` — JSON-LD

`src/components/site-schema.tsx`

Renders `WebSite` + `WebApplication` structured data. Reads from `site.ts`. Drop in `layout.tsx` and forget it.

---

## Libraries

### `analytics.ts` — GA4 Abstraction

```typescript
import { analytics } from '@/lib/analytics';
analytics.track('event_name', { prop: value });
```

Add named methods for each distinct user action. Never call `gtag()` directly.

### `route-logger.ts` — API Route Logging

Every `app/api/**/route.ts` MUST use `createRouteLogger`.

```typescript
import { createRouteLogger } from '@/lib/route-logger';
const log = createRouteLogger('my-route');

export async function POST(req: Request): Promise<Response> {
  const ctx = log.begin();
  try {
    log.info(ctx.reqId, 'Request received', {
      /* data */
    });
    return log.end(ctx, Response.json(result), {
      /* summary */
    });
  } catch (error) {
    log.err(ctx, error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### `cn.ts` — Class Merge

```typescript
import { cn } from '@/lib/cn';
cn('base-class', condition && 'conditional-class', props.className);
```

---

## Environment Variables

See `.env.local.example` for the full reference with comments.

| Variable                        | Required               | Purpose                     |
| ------------------------------- | ---------------------- | --------------------------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes                    | GA4 measurement ID          |
| `GMAIL_USER`                    | For feedback           | nodemailer sender address   |
| `GMAIL_APP_PASSWORD`            | For feedback           | Gmail App Password          |
| `FEEDBACK_TO`                   | Optional               | Override feedback recipient |
| `RESEND_API_KEY`                | For email list         | Resend API key              |
| `RESEND_SEGMENT_ID`             | For email list         | Resend Segment ID           |
| `STRIPE_SECRET_KEY`             | Checkout Sessions only | Stripe secret key           |
| `STRIPE_PUBLISHABLE_KEY`        | Checkout Sessions only | Stripe publishable key      |
| `STRIPE_PRICE_ID`               | Checkout Sessions only | Stripe Price ID             |

---

## Brand Asset Generation

Requires [ImageMagick](https://imagemagick.org) installed.

**Input:** `public/brand/logomark.png` — 1024×1024, transparent background.

```powershell
.\scripts\generate-assets.ps1
```

**Output:** favicons (light/dark), `favicon.ico`, apple-icon, 1200×630 OG image, 1280×320 README banner.

---

## Dev Server

`Ctrl+Shift+B` starts the dev server and pipes output to `dev.log`:

```powershell
npm run dev -- --port 3000 2>&1 | Tee-Object -FilePath dev.log
```

Tell Copilot **"check logs"** to surface errors from `dev.log`.

---

## Code Rules

- Never call `gtag()` directly — always `analytics.ts`
- Never use raw `console.log` in API routes — always `createRouteLogger`
- Never hardcode site metadata — always import from `site.ts`
- `copilot-instructions.md`, `site.ts`, and `next.config.ts` are derived — do not edit directly after `/init`
- Prefer early returns for error handling
- One file = one responsibility

---

## Integration with modryn-studio-v2

Products in `modryn-app` mode are proxied by [modryn-studio/modryn-studio-v2](https://github.com/modryn-studio/modryn-studio-v2) at modrynstudio.com.

- `/tool` → PR on modryn-studio-v2 → `content/tools/[slug].json`
- `/log` → PR on modryn-studio-v2 → `content/log/[slug].mdx`
- modryn-studio-v2 rewrites `modrynstudio.com/tools/[slug]/*` to each tool's Vercel deployment
