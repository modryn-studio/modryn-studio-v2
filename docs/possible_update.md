# Path 1: Complete the Modryn Studio Boilerplate

## The Goal

Take your boilerplate from "good internal starter" to **"zero-to-production in hours, not days."** After this, every future Modryn Studio product starts with auth, database, AI, analytics, and UI — already wired.

---

## Current State vs Target State

| Layer         | Current                         | Target                                     |
| ------------- | ------------------------------- | ------------------------------------------ |
| Framework     | ✅ Next.js 16 / React 19 / TS 5 | —                                          |
| Styling       | ✅ Tailwind v4 + merge + clsx   | —                                          |
| Icons         | ✅ Lucide React                 | —                                          |
| Payments      | ✅ Stripe                       | —                                          |
| Email         | ✅ Resend + Nodemailer          | —                                          |
| Linting       | ✅ ESLint + Prettier            | —                                          |
| Deploy        | ✅ Vercel                       | —                                          |
| Auth          | ❌ None                         | 🎯 Auth.js (NextAuth v5)                   |
| Database      | ❌ None                         | 🎯 Drizzle ORM + Neon Postgres             |
| AI            | ❌ None                         | 🎯 Vercel AI SDK + Anthropic               |
| Analytics     | ❌ None                         | 🎯 PostHog                                 |
| UI System     | ❌ None                         | 🎯 shadcn/ui + Radix                       |
| SEO           | ❌ None                         | 🎯 Next.js Metadata API + sitemap + robots |
| Rate Limiting | ❌ None                         | 🎯 Upstash Ratelimit                       |
| Scaffold CLI  | ❌ None                         | 🎯 One-command project init                |

---

## The Build Plan

Let me check current best practices for the specific integrations to make sure I'm giving you the right versions and approaches.Now I have everything I need. Here's the complete, researched plan:

---

# 🔨 Path 1: Complete the Modryn Studio Boilerplate

## Full Build Plan — 6 Phases, ~4-6 Hours

---

## Phase 1: Database Layer (45 min)

**Drizzle ORM + Neon Postgres**

### Why This Stack

Drizzle ORM is a TypeScript-first ORM with a great developer experience. Neon Database is a serverless Postgres database — free tier is generous, and it pairs perfectly with Vercel's edge functions.

### Steps

**1. Install packages:**

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit dotenv
```

**2. Create Neon account & database:**

- Sign up at neon.tech
- Your Neon projects come with a ready-to-use Postgres database named neondb.
- Navigate to the Connection Details section in the project console to find your database connection string. Add the DATABASE_URL environment variable to your .env or .env.local file.

**3. Create `src/db/index.ts`:**

```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
```

**4. Create `src/db/schema.ts`** with base user schema:

```typescript
import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  stripeCustomerId: text('stripe_customer_id'),
  subscriptionStatus: text('subscription_status'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: timestamp('expires_at'),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  sessionToken: text('session_token').notNull().unique(),
  expires: timestamp('expires').notNull(),
});
```

**5. Create `drizzle.config.ts`:**

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**6. Add migration scripts to `package.json`:**

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

**7. Run initial migration:**

```bash
npm run db:push
```

### Deliverables

- `src/db/index.ts` — DB client singleton
- `src/db/schema.ts` — Base schema (users, accounts, sessions)
- `drizzle.config.ts` — Drizzle Kit config
- Migration scripts in `package.json`

---

## Phase 2: Authentication (60 min)

**Auth.js v5 (NextAuth)**

### Why Auth.js v5

For maximum control and cost-effectiveness, NextAuth.js v5 provides complete flexibility with zero vendor lock-in. The additional development time investment pays dividends for applications requiring custom authentication flows or operating under strict budget constraints.

Key architecture note: As of Next.js 16, middleware.ts has been renamed to proxy.ts.

### Steps

**1. Install:**

```bash
npm install next-auth@beta @auth/drizzle-adapter
```

**2. Generate auth secret:**

```bash
npx auth secret
```

**3. Create `src/auth.config.ts`:**

```typescript
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [GitHub, Google],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
} satisfies NextAuthConfig;
```

**4. Create `src/auth.ts`:**

```typescript
import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
```

**5. Create API route `src/app/api/auth/[...nextauth]/route.ts`:**

```typescript
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

**6. Create `proxy.ts`** (root — this is the Next.js 16 replacement for middleware.ts):

```typescript
import NextAuth from 'next-auth';
import authConfig from './src/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
```

**7. Create auth helper components:**

- `src/components/auth/sign-in-button.tsx`
- `src/components/auth/sign-out-button.tsx`
- `src/components/auth/user-avatar.tsx`
- `src/app/auth/signin/page.tsx`

**8. Update `.env.local.example`:**

```env
# Auth
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Database
DATABASE_URL=
```

All environment variables should be prefixed with AUTH\_, and AUTH_GITHUB_ID and AUTH_GITHUB_SECRET will be used as the clientId and clientSecret options for the GitHub provider — auto-detected, no manual wiring needed.

### Deliverables

- `src/auth.ts` + `src/auth.config.ts`
- `proxy.ts` with route protection
- Auth API route
- Sign-in / sign-out UI components
- Sign-in page

---

## Phase 3: UI System (30 min)

**shadcn/ui + Radix Primitives**

### Why shadcn/ui

Shadcn UI copies component source code directly into your project, giving you complete ownership and customization control. Each component is updated to work with Tailwind CSS v4 and React 19.

### Steps

**1. Initialize shadcn/ui:**

```bash
npx shadcn@latest init
```

Select: Neutral base color, New York style, Lucide icons (already installed).

**2. Install core components you'll need in every project:**

```bash
npx shadcn@latest add button card dialog dropdown-menu input label \
  form toast tabs avatar badge separator sheet skeleton sonner
```

**3. Install `next-themes` for dark mode:**

```bash
npm install next-themes
```

**4. Create `src/components/theme-provider.tsx`:**

```typescript
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**5. Create `src/components/theme-toggle.tsx`** — dark/light mode switch

**6. Wire ThemeProvider into root layout**

### Deliverables

- `components.json` — shadcn config
- `src/components/ui/` — all base components
- Theme provider + toggle
- Dark mode support out of the box

---

## Phase 4: AI Integration (30 min)

**Vercel AI SDK + Anthropic**

### Why Vercel AI SDK

With over 20 million monthly downloads and adoption by teams ranging from startups to Fortune 500 companies, the AI SDK is the leading TypeScript toolkit for building AI applications. It provides a unified API, allowing you to integrate with any AI provider.

The key advantage: The AI SDK provides a unified API to interact with model providers like OpenAI, Anthropic, Google, and more. By default, the AI SDK uses the Vercel AI Gateway to give you access to all major providers out of the box.

### Steps

**1. Install packages:**

```bash
npm install ai @ai-sdk/anthropic @ai-sdk/openai
```

**2. Create `src/lib/ai.ts`** — AI provider config:

```typescript
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';

// Default model — swap with one line
export const defaultModel = anthropic('claude-sonnet-4-20250514');

// Alternate models for different use cases
export const fastModel = anthropic('claude-haiku-4-20250414');
export const reasoningModel = anthropic('claude-opus-4-20250514');
```

**3. Create `src/app/api/chat/route.ts`** — streaming chat endpoint:

```typescript
import { streamText } from 'ai';
import { defaultModel } from '@/lib/ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: defaultModel,
    messages,
    maxTokens: 2048,
  });

  return result.toDataStreamResponse();
}
```

**4. Create `src/hooks/use-chat-stream.ts`** — reusable chat hook wrapper

**5. Create `src/components/ai/chat.tsx`** — minimal chat UI component

**6. Update `.env.local.example`:**

```env
# AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=  # optional fallback
```

### Deliverables

- `src/lib/ai.ts` — model configuration
- `/api/chat` route — streaming endpoint
- Chat component — drop-in AI chat
- Provider-agnostic: swap models with one line change

---

## Phase 5: Analytics (20 min)

**PostHog**

### Why PostHog

PostHog provides product analytics, web analytics, session replay, error tracking, feature flags, experiments, surveys, LLM analytics, data warehouse, CDP, and an AI product assistant — all free up to 1M events/month.

### Steps

**1. Install:**

```bash
npm install posthog-js posthog-node
```

**2. Create `instrumentation-client.ts`** in project root:

Next.js 15.3 added support for instrumentation-client.js|ts which we can use to initialize PostHog.

```typescript
import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: '/ingest',
  ui_host: 'https://us.posthog.com',
  person_profiles: 'always',
  capture_pageview: true,
  capture_pageleave: true,
});
```

**3. Create `src/lib/posthog-server.ts`** — server-side client:

```typescript
import { PostHog } from 'posthog-node';

export function getPostHogServer() {
  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}
```

Because server-side functions in Next.js can be short-lived, we set flushAt to 1 and flushInterval to 0. flushAt sets how many capture calls we should flush the queue. Setting them to the lowest number ensures events are sent immediately and not batched.

**4. Add reverse proxy in `next.config.ts`:**

```typescript
async rewrites() {
  return [
    {
      source: '/ingest/:path*',
      destination: 'https://us.i.posthog.com/:path*',
    },
  ];
}
```

**5. Create `src/lib/analytics.ts`** — event helper functions:

```typescript
import posthog from 'posthog-js';

export const track = {
  signUp: () => posthog.capture('user_signed_up'),
  subscribe: (plan: string) => posthog.capture('user_subscribed', { plan }),
  featureUsed: (feature: string) => posthog.capture('feature_used', { feature }),
  aiQuery: (model: string, tokens: number) => posthog.capture('ai_query', { model, tokens }),
};
```

**6. Update `.env.local.example`:**

```env
# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Deliverables

- Client-side auto-capture via `instrumentation-client.ts`
- Server-side PostHog client
- Reverse proxy (bypasses ad blockers)
- `track` helper with pre-defined events
- Session replay enabled by default

---

## Phase 6: SEO + Rate Limiting + Scaffold Script (30 min)

### 6a. SEO Defaults

**Create `src/app/layout.tsx` metadata:**

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://modrynstudio.com'),
  title: {
    default: 'App Name',
    template: '%s | App Name',
  },
  description: 'Your app description',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'App Name',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@modrynstudio',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

**Create `src/app/sitemap.ts`** — dynamic sitemap generator

**Create `src/app/robots.ts`** — robots.txt generator

### 6b. Rate Limiting

```bash
npm install @upstash/ratelimit @upstash/redis
```

**Create `src/lib/rate-limit.ts`:**

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
});
```

### 6c. Scaffold Script

**Create `scripts/create-project.sh`:**

```bash
#!/bin/bash
# Usage: ./scripts/create-project.sh my-new-project

PROJECT_NAME=$1
git clone https://github.com/modryn-studio/boilerplate.git "$PROJECT_NAME"
cd "$PROJECT_NAME"
rm -rf .git
git init
cp .env.local.example .env.local
npm install
echo "✅ $PROJECT_NAME ready. Edit .env.local and run: npm run dev"
```

---

## Final `.env.local.example`

```env
# ============================================
# Modryn Studio Boilerplate — Environment Variables
# ============================================

# Database (Neon)
DATABASE_URL=

# Auth (Auth.js v5)
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Payments (Stripe) — already wired
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email (Resend) — already wired
RESEND_API_KEY=

# AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## Final File Structure

```
📦 modryn-studio-boilerplate
├── 📂 migrations/              ← Drizzle migrations
├── 📂 public/
├── 📂 scripts/
│   └── create-project.sh       ← NEW: scaffold script
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/
│   │   │   ├── 📂 auth/[...nextauth]/route.ts   ← NEW
│   │   │   └── 📂 chat/route.ts                  ← NEW
│   │   ├── 📂 auth/
│   │   │   ├── 📂 signin/page.tsx                ← NEW
│   │   │   └── 📂 error/page.tsx                 ← NEW
│   │   ├── layout.tsx           ← UPDATED (providers, metadata)
│   │   ├── sitemap.ts           ← NEW
│   │   └── robots.ts            ← NEW
│   ├── 📂 components/
│   │   ├── 📂 ui/               ← NEW: shadcn components
│   │   ├── 📂 auth/             ← NEW: auth components
│   │   ├── 📂 ai/               ← NEW: chat component
│   │   ├── theme-provider.tsx    ← NEW
│   │   └── theme-toggle.tsx      ← NEW
│   ├── 📂 db/
│   │   ├── index.ts             ← NEW: Drizzle client
│   │   └── schema.ts            ← NEW: DB schema
│   ├── 📂 hooks/
│   │   └── use-chat-stream.ts   ← NEW
│   ├── 📂 lib/
│   │   ├── ai.ts                ← NEW: AI model config
│   │   ├── analytics.ts         ← NEW: event helpers
│   │   ├── posthog-server.ts    ← NEW: server analytics
│   │   ├── rate-limit.ts        ← NEW
│   │   └── utils.ts             ← UPDATED by shadcn
│   ├── auth.ts                  ← NEW: Auth.js config
│   └── auth.config.ts           ← NEW: Auth.js edge config
├── proxy.ts                     ← NEW: Next.js 16 auth proxy
├── instrumentation-client.ts    ← NEW: PostHog init
├── drizzle.config.ts            ← NEW
├── components.json              ← NEW: shadcn config
├── brand.md
├── context.md
├── development-principles.md
└── .env.local.example           ← UPDATED with all vars
```
