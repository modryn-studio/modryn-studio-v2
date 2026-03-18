CONTEXT: Modryn Studio

WHO I AM:
I'm Luke, a one-person studio owner building agent pipelines that
deliver finished results under Modryn Studio (modrynstudio.com).
I identify what result someone will pay for, build the pipeline
that delivers it, and own the system. The user describes the
problem; the tool hands back the answer.

WHAT I'M ACTUALLY DOING:
I build agent pipelines that deliver finished results. I identify
what result someone will pay for, build the pipeline that delivers it,
and own the system. The user describes the problem; the tool hands
back the answer.

My pipeline: detect trends → identify the result someone needs →
build the pipeline that delivers it → distribute early → monetize
with one-time payments or email capture.

I run a private trend detection pipeline (trendspy + Google Trends
RSS + Gmail newsletter ingest) that scores and clusters trends daily
and generates BUILD/WATCH/SKIP decisions every morning.

THE VISION:
Build modrynstudio.com as a product studio launchpad — a site
that works FOR me on every tool I ship. Not a brochure. Not an
agency site. A living site that grows with every product launch.

THE SITE STRUCTURE:
/ → Hero + tools grid + build log preview + email signup
/tools → All tools (live, beta, coming soon)
/tools/[slug] → Individual tool page (SEO magnet + launch page)
/log → Build in public feed (MDX files)
/log/[slug] → Individual log post
/about → Who I am, how I work, my stack
/privacy + /terms → Standard legal pages

THE STACK:
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
Radix UI + class-variance-authority + lucide-react (shadcn/ui pattern),
Vercel deployment, Vercel Analytics,
@next/mdx + gray-matter for build log MDX content,
nodemailer + Gmail SMTP for email notifications,
resend for transactional email.

TOOLS/CONTENT:
Stored as JSON/MDX files in /content — no database yet.
Adding a new tool = add a JSON file.
Adding a log post = add an MDX file.

CORE PRINCIPLES:

- Every page earns its place — no pages for businesses I'm not running
- Ship fast, stay honest — empty is better than fake
- The site is a launchpad, not a portfolio
- Build in public — every launch, kill, and milestone gets a log post
- Email list bridges users from one tool to the next

---

## Homepage Sections (In Order)

```
1. NAV
   Logo | Tools | Log | About | [Get Updates] button

2. HERO
   Headline:    "Describe the problem. Get back the answer."
   Subheadline: "I build pipelines that hand you a finished result — not another tool to figure out."
   CTA:         [Don't miss the next drop] [Browse the tools]

3. TOOLS GRID
   Cards: name, one-line description, status badge (Live/Beta/Building)
   Empty state: "First tool dropping soon — follow the build"

4. BUILD LOG PREVIEW
   Last 3 log entries (date + title)
   [See all updates →]

5. EMAIL SIGNUP
   "Follow the journey — get notified when new tools drop."
   [email input] [Notify me]

6. FOOTER
   Logo | Links | "Built by Luke @ Modryn Studio"
```

---

## Tool Page Template `/tools/[slug]`

This is important — each tool page is an **SEO magnet AND a launch page**:

```
1. Tool name + one-line description
2. Status badge (Live / Beta / Coming Soon)
3. What it does (2-3 sentences, plain language)
4. Screenshot or GIF
5. [Try it →] button (links to the tool) — live and beta only
6. Email capture if not live yet ("Notify me when this launches")
7. Related tools
```

---

## Build Log `/log`

MDX files. No CMS, no database. Just:

```
/log
  └── /posts
        ├── 2026-02-25-the-site-is-live.mdx
        ├── 2026-02-26-specifythat.mdx
        └── 2026-03-06-warranted.mdx
```

Each post has frontmatter:

```
---
title: The site is live
date: 2026-02-25
description: 150-160 char meta description (required)
tag: milestone
---
```

Tags: `milestone` `launch` `killed` `learning` `build`

---

## Data Files (No Database Yet)

Tools and log entries are just JSON/MDX files in the repo:

```
/content
  ├── /tools
  │     ├── specifythat.json
  │     ├── trend-detector.json
  │     ├── goanyway.json
  │     └── warranted.json
  └── /log
        └── *.mdx posts
```

Adding a new tool = add a JSON file. That's it.

---

## One Rule For This Site

**Never add a page that serves a business you're not running yet.**

No pricing. No services. No "hire me" until you actually want clients. Every page
earns its place by serving your actual users — the people who use your tools.
