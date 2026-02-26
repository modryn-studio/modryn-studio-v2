# How to Add Content

## Adding a log post

Type `/log` in Copilot chat (Agent mode). It reads recent commits, asks for context, and either drafts the MDX locally (if you're in this repo) or opens a PR on modryn-studio-v2 (if you're in a different project repo).

You don't need to touch files manually.

**Tags:** `modryn-studio` | `meta` | `[project-slug]`

---

## Adding a tool

Type `/tool` in Copilot chat (Agent mode). It asks for name, description, status, and optional fields, then creates `content/tools/<slug>.json` for you.

If you want to add it manually instead:

**1. Create the file**

```
content/tools/your-tool-slug.json
```

**2. Fill in the fields**

```json
{
  "name": "Tool Name",
  "description": "One sentence. What it does, who it's for.",
  "status": "building",
  "url": "https://example.com",
  "screenshotUrl": "/screenshots/tool-name.png",
  "launchedAt": "2026-03-01",
  "logSlug": "2026-03-01-tool-name"
}
```

**Required:** `name`, `description`, `status`

**Status values:**
- `live` — fully shipped, include `url`
- `beta` — works but rough, `url` optional
- `building` — in progress, no URL needed
- `coming-soon` — placeholder, shows intent

**Optional fields:**
- `url` — external URL if the tool lives at a separate domain
- `screenshotUrl` — path or URL to a preview image; shown on the card and tool page
- `launchedAt` — ISO date (`YYYY-MM-DD`); shows "Shipped [date]" on the card
- `logSlug` — slug of the `/log` post that documented the build; adds "Read the build →" link

**3. Publish**

```bash
git add . && git commit -m "tool: add tool-name" && git push
```

Vercel auto-deploys. Tool appears in the homepage grid and `/tools` automatically.

---

That's it.
