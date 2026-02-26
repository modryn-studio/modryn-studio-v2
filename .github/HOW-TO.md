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

**`/project-init`** — New project setup. Reads `context.md` + `brand.md` + `development-principles.md` and fills in the TODO sections of `copilot-instructions.md`. Run this once at the start of every new project.

**`/add-tool`** — Register a new tool on the site. Each tool (live, beta, or coming soon) lives as a JSON file in `content/tools/`. This command asks you 5 questions and creates that file. Without it, the tool won't appear on the site.

**`/check-deps`** — Check all dependencies for newer versions. Shows outdated packages, asks before updating.

**`/seo-launch`** — Pre-launch SEO checklist. Audits the codebase for missing SEO files, then walks you through Google Search Console, Bing, and OG validation.

Usage: type any slash command in chat.

## Hooks (auto-runs after edits)

**PostToolUse** — Auto-formats files with Prettier after the agent edits them.

> ⚠️ Currently configured but not active. The hook file exists at `.github/hooks/post-edit-format.json` but VS Code requires it to be referenced in `.vscode/settings.json` via `github.copilot.chat.agent.hooks` to take effect. To enable: add that key pointing to the file, and make sure Prettier is installed (`npm i -D prettier`).

## MCP Servers

- **GitHub** — create issues, PRs, manage repos from chat (type `http`)
- **Fetch** — pull live web pages into context (requires `uvx` / `uv` installed)

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
│   ├── project-init.prompt.md     ← /project-init command (fills copilot-instructions from context.md + brand.md)
│   ├── add-tool.prompt.md         ← /add-tool command (creates content/tools/<slug>.json)
│   ├── check-deps.prompt.md       ← /check-deps command (update checker)
│   └── seo-launch.prompt.md       ← /seo-launch command (SEO audit + registration)
├── hooks/
│   └── post-edit-format.json      ← Auto-format after agent edits (not yet active — see Hooks above)
.vscode/
├── settings.json                  ← Agent mode enabled
└── mcp.json                       ← MCP server config (http + stdio)
src/lib/
├── cn.ts                          ← Tailwind class merge utility (clsx + tailwind-merge)
├── route-logger.ts                ← API route logging utility (createRouteLogger)
└── analytics.ts                   ← GA4 event tracking abstraction (analytics.track)
context.md                         ← Fill this in per project (product facts + routes)
brand.md                           ← Fill this in per project (voice, visuals, copy examples)
development-principles.md          ← Permanent product philosophy — do not edit per project
```

## New Project Setup

1. Copy `.github/`, `.vscode/`, and `src/lib/` into the new project
2. Run `npm i -D prettier` (for the post-edit hook)
3. Fill in `context.md` — product idea, target user, stack additions, and routes
4. Fill in `brand.md` — voice, visual rules, emotional arc, and copy examples
5. Type `/project-init` — Copilot reads all three files and fills in `.github/copilot-instructions.md`
6. Done — everything else applies automatically

## Live Log Monitoring

`Ctrl+Shift+B` starts the dev server and pipes all output to `dev.log`.
Once it's running, tell Copilot **"check logs"** at any point — it reads `dev.log` and flags errors, slow API requests, or unexpected responses without you having to paste anything.

Prerequisite: the server must be running and `dev.log` must be capturing output before Copilot can read it. If you haven't started the server yet, do that first.

## Day-to-Day Workflow

1. **Plan** → use Plan mode to scope the feature
2. **Build** → switch to Agent mode and execute
3. **Ship** → type `@check`
4. **Push** → review the commit diff, then `git push` yourself

> Tip: `Configure Chat (gear icon) > Diagnostics` shows all loaded configs and errors.
