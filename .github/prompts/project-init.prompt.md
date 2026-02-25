---
name: project-init
description: Reads context.md, development-principles.md, and brand.md, then fills in copilot-instructions.md for a new project
agent: agent
---

Read the following files from the workspace root:
1. `context.md` — project-specific facts: product name, what it does, who it's for, stack additions, and routes
2. `development-principles.md` — product philosophy to inform tone
3. `brand.md` — voice, visual rules, target user, emotional arc, and copy examples

Then edit `.github/copilot-instructions.md` and replace every `<!-- TODO -->` section with real content:

- **[Project Name]** — the product name from context.md
- **Who I Am** — 2–4 sentences: who Luke is, what the product does, who it's for. Use development-principles.md for tone (fast shipper, AI-assisted builder, micro-niche focus).
- **Stack** — keep all boilerplate entries (Next.js, Tailwind, Vercel, GA4, Vercel Analytics). Add any project-specific services from context.md (e.g. Resend, Stripe, Prisma). Remove the `<!-- TODO -->` comment.
- **Project Structure** — keep `/app`, `/components`, `/lib`. Add any project-specific directories from context.md. Remove the `<!-- TODO -->` comment.
- **Route Map** — list every route from context.md with a one-line description. Always include `/privacy` and `/terms`.
- **Brand & Voice** — populate from brand.md: voice rules, visual rules (colors, fonts, motion), target user description, emotional arc, and copy examples to use as reference.

Do not modify any section without a `<!-- TODO -->` marker.
Do not add new sections.
Do not touch API Route Logging, Analytics, Dev Server, Code Style, or Core Rules.

After editing, confirm what was filled in and flag anything that was missing from context.md or brand.md that Luke should provide.
