# Copilot Commands

Open chat with `Ctrl+Alt+I`. Use **Agent mode** for all commands below.

| Command | When | What it does |
|---|---|---|
| `@check` | Before every push | Scans for bugs, fixes what it can, runs lint + build, commits. You push. |
| `/project-init` | New project, once | Reads `context.md`, `brand.md`, `development-principles.md` → fills in `copilot-instructions.md`. |
| `/add-tool` | Each new tool | Asks 5 questions, creates `content/tools/<slug>.json`. |
| `/seo-launch` | At launch, once | Generates sitemap, robots, favicons. Walks through GSC + Bing registration. |
| `/check-deps` | Occasionally | Lists outdated packages. Asks before updating anything. |

## Workflow

1. Fill in `context.md` + `brand.md` → run `/project-init`
2. Build the thing
3. Add tools with `/add-tool`
4. Run `@check` before every push
5. Run `/seo-launch` when going live
