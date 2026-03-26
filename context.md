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

My discovery loop: Surface a signal (Input) → form an observation
about what it means → articulate a contrarian thesis → validate
or invalidate → build the thing. The trend detector (trendspy +
Google Trends RSS + Gmail newsletter ingest) is one input to that
loop, not the driver of it.

I run a private trend detection pipeline (trendspy + Google Trends
RSS + Gmail newsletter ingest) that scores and clusters trends daily
and generates BUILD/WATCH/SKIP decisions every morning.

THE VISION:
Build modrynstudio.com as a product studio launchpad — a site
that works FOR me on every tool I ship. Not a brochure. Not an
agency site. A living site that grows with every product launch.

THE SITE STRUCTURE:
/ → Hero + tools grid + build log preview + email signup
/tools → All tools in a list layout (name, tagline, description, top bullets, Open/Details CTA)
/tools/[slug] → Individual tool page (SEO magnet + launch page)
/log → Build in public feed (MDX files, filterable by topic tag)
/log/[slug] → Individual log post
/about → Who I am, how I work, my stack
/playbook → Workflow + how I build (path-finder tool lives here)
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

- Build proposal/approval UX, not form/response UX — the AI proposes, the human reviews. Design toward the end state now.
- Every page earns its place — no pages for businesses I'm not running
- Ship fast, stay honest — empty is better than fake
- The site is a launchpad, not a portfolio
- Build in public — every launch, kill, and milestone gets a log post
- Log posts use topic-based tags (tool slug or topic name: specifythat, trend-detector, songfor-me, warranted, strategy, workflow, studio) — not outcome tags (build/launch/milestone)
- Email list bridges users from one tool to the next

---

## Homepage Sections (In Order)

```
1. NAV
   Logo | Tools | Log | About | [Get Updates] button

2. HERO
   Building-now pill: "● Building now: [tool name]" (dynamic, only when a tool has status: building)
   Headline:    "Fast, focused tools for people who hate bad software."
   Subheadline: "I'm Luke. One builder. One pipeline at a time. I pick the best
                 opportunity, build the thing that hands back a finished result,
                 and ship it. More about how I work →"
   CTA:         [Follow the builds] [Browse the tools]

3. TOOLS GRID
   Cards: screenshot (if available), logo, name, description, status badge
   Coming-soon cards: inline "Notify me when live" email capture instead of a link

4. BUILD LOG PREVIEW
   Last 3 log entries (date + title + tag + reading time)
   [See all updates →]

5. EMAIL SIGNUP
   Headline: "Follow the builds."
   Sub-copy: "I ship something new every few weeks. Get notified when the next
              one drops — no newsletters, no noise. Just launches.
              Who's building this? →"
   [email input] [Notify me]
   After submit: "You're on the list. Next launch, your inbox." + "Read the build log →"

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
tag: studio
shareText: Optional custom X share text (defaults to title if absent)
---
```

Tags are topic-based — use the tool slug or a topic name:
`studio` `strategy` `workflow` `specifythat` `trend-detector` `songfor-me` `warranted` `idea-engine` `goanyway` `path-finder`

Do NOT use outcome tags: ~~`milestone`~~ ~~`launch`~~ ~~`build`~~

---

## Data Files (No Database Yet)

Tools and log entries are just JSON/MDX files in the repo:

```
/content
  ├── /tools
  │     ├── specifythat.json
  │     ├── trend-detector.json
  │     ├── goanyway.json
  │     ├── warranted.json
  │     ├── idea-engine.json
  │     └── songfor-me.json
  └── /log
        └── *.mdx posts
```

Adding a new tool = add a JSON file. That's it.

---

## One Rule For This Site

**Never add a page that serves a business you're not running yet.**

No pricing. No services. No "hire me" until you actually want clients. Every page
earns its place by serving your actual users — the people who use your tools.
