# Copilot Setup — How To Use

## Modes (built into VS Code)

| Mode | When to use | How |
|------|-------------|-----|
| **Ask** | Quick questions about your codebase | Chat → select "Ask" |
| **Plan** | Blueprint a feature before building | Chat → select "Plan" |
| **Agent** | Build, edit files, run commands | Chat → select "Agent" |

Open chat: `Ctrl+Alt+I`

## Custom Agent

**`@check`** — Pre-ship quality gate. Checks for bugs → scans → fixes → lints → builds → commits. Never pushes.

Usage: switch to Agent mode, then type:
```
@check
```

## Slash Commands

**`/init`** — New project setup. Reads `context.md` + `brand.md` + `development-principles.md` and fills in the TODO sections of `copilot-instructions.md` and `src/config/site.ts`. Run this once at the start of every new project.

**`/tool`** — Register or update a tool on the site. Creates or updates `content/tools/<slug>.json`. Run it from this repo to write the file directly. Run it from any other project repo to open a PR here instead — useful when shipping a tool that lives in its own repo (flip status to `live`, add URL, screenshot, launch date).

**`/log`** — Draft a build log post. Works in two modes: if you're in this repo, it reads the last 20 commits and drafts locally (you edit, then push). If you're in a different project repo, it reads that repo's commits, drafts the post, and opens a PR against modryn-studio-v2 via GitHub MCP — merge when you're ready to publish.

**`/deps`** — Check all dependencies for newer versions. Shows outdated packages, asks before updating.

**`/seo`** — Pre-launch SEO checklist. Auto-generates missing SEO files, then walks you through Google Search Console, Bing, and OG validation.

**`/social`** — Write ready-to-paste social copy for a log post or tool launch. Attach the MDX or tool JSON file, then run `/social`. Outputs X, Reddit (with flair selection + reason), shipordie.club (tool launches only), and a dev.to reminder. Uses your voice rules and brand guidelines automatically.

Usage: type any slash command in chat.

## Hooks (auto-runs after edits)

**Format on Save** — Files are automatically formatted with Prettier whenever you save.

Configured via `editor.formatOnSave: true` in `.vscode/settings.json`. Requires the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (VS Code will prompt you to install it — it's listed in `.vscode/extensions.json`). Formatting rules live in `.prettierrc`.

## MCP Servers

- **GitHub** — create issues, PRs, manage repos from chat

## File Map

```
.github/
├── copilot-instructions.md        ← Always-on context (edit per project)
├── instructions/
│   ├── nextjs.instructions.md     ← Auto-applied to .ts/.tsx files
│   └── seo.instructions.md        ← Auto-applied to .ts/.tsx files
├── agents/
│   └── check.agent.md             ← @check agent (pre-ship quality gate)
├── prompts/
│   ├── init.prompt.md             ← /init command (fills copilot-instructions + site.ts from context.md + brand.md)
│   ├── tool.prompt.md             ← /tool command (creates or updates content/tools/<slug>.json; cross-repo PR if outside modryn-studio-v2)
│   ├── log.prompt.md              ← /log command (drafts a build log post from git history)
│   ├── deps.prompt.md             ← /deps command (update checker)
│   ├── seo.prompt.md              ← /seo command (SEO audit + registration)
│   └── social.prompt.md           ← /social command (write X, Reddit, shipordie.club copy for a post or tool launch)
├── hooks/
│   └── post-edit-format.json      ← Legacy hook file (Claude Code format — not used by VS Code)
.vscode/
├── settings.json                  ← Agent mode enabled, formatOnSave, Prettier as default formatter
├── extensions.json                ← Recommends Prettier extension on first open
└── mcp.json                       ← MCP server config (http + stdio)
src/config/
└── site.ts                        ← Single source of truth: site name, URL, description, brand colors
src/lib/
├── cn.ts                          ← Tailwind class merge utility (clsx + tailwind-merge)
├── route-logger.ts                ← API route logging utility (createRouteLogger)
└── analytics.ts                   ← GA4 event tracking abstraction (analytics.track)
context.md                         ← Fill this in per project (product facts + routes)
brand.md                           ← Fill this in per project (voice, visuals, copy examples)
development-principles.md          ← Permanent product philosophy — do not edit per project
```

## New Project Setup

1. Copy `.github/`, `.vscode/`, `src/lib/`, and `src/config/` into the new project
2. Run `npm install` — this installs Prettier automatically (it's in `devDependencies`)
3. Fill in `context.md` — product idea, target user, stack additions, and routes
4. Fill in `brand.md` — voice, visual rules, emotional arc, and copy examples
5. Type `/init` — Copilot reads all three files and fills in `.github/copilot-instructions.md` + `src/config/site.ts`
6. Done — everything else applies automatically

## Live Log Monitoring

`Ctrl+Shift+B` starts the dev server and pipes all output to `dev.log`.
Once it's running, tell Copilot **"check logs"** at any point — it reads `dev.log` and flags errors, slow API requests, or unexpected responses without you having to paste anything.

Prerequisite: the server must be running and `dev.log` must be capturing output before Copilot can read it. If you haven't started the server yet, do that first.

## Launch Sequence

Run these in order when shipping a product:

1. `@check` — quality gate (fix anything it flags before continuing)
2. `/seo` — technical SEO audit and fixes (run from the product repo)
3. `/launch` — distribution checklist: sharing hooks, OG, social, screenshots (run from the product repo)
4. Merge the `/log` and `/tool` PRs on modryn-studio-v2
5. `/social` — write and post copy (run from **this repo**, after PRs are merged)

## Day-to-Day Workflow

1. **Plan** → use Plan mode to scope the feature
2. **Build** → switch to Agent mode and execute
3. **Ship** → type `@check`
4. **Push** → review the commit diff, then `git push` yourself

> Tip: `Configure Chat (gear icon) > Diagnostics` shows all loaded configs and errors.
