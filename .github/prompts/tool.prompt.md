---
name: tool
description: "Register a tool on modrynstudio.com. Works from any repo."
agent: agent
---

First, check whether the current workspace is the `modryn-studio/modryn-studio-v2` repository.

---

## Case A — You are inside modryn-studio-v2

Ask for the following if not already provided:

1. **Name** — the display name (e.g. "Trend Detector")
2. **Description** — one sentence, plain language, no jargon. What it does and who it's for.
3. **Status** — one of: `live`, `beta`, `building`, `coming-soon`
4. **URL** — (optional) external URL if the tool lives at a separate domain
5. **Screenshot URL** — (optional) path or public URL to a preview image (e.g. `/screenshots/trend-detector.png`)
6. **Launched date** — (optional, only if status is `live` or `beta`) ISO date the tool shipped, e.g. `2026-03-01`
7. **Log slug** — (optional) slug of the `/log` post that documented this build (e.g. `2026-03-01-trend-detector`)

Then:
- Derive the slug from the name: lowercase, spaces → hyphens, remove special characters (e.g. "Trend Detector" → `trend-detector`)
- Create `content/tools/<slug>.json`:
  ```json
  {
    "name": "...",
    "description": "...",
    "status": "..."
  }
  ```
  Only include optional fields (`url`, `screenshotUrl`, `launchedAt`, `logSlug`) if provided.
- Confirm the file was created and show the final JSON.
- Remind me: if status is `live`, the tool page at `/tools/<slug>` is now public and will appear in the sitemap on next build.

---

## Case B — You are in a different project repo

Ask for:

1. **Name** — display name of the tool
2. **Description** — one sentence. What it does, who it's for.
3. **Status** — one of: `live`, `beta`, `building`, `coming-soon`
4. **URL** — (optional) external URL if live at a separate domain
5. **Screenshot URL** — (optional) path or public URL to a preview image
6. **Launched date** — (optional, only if status is `live` or `beta`) ISO date, e.g. `2026-03-01`
7. **Log slug** — (optional) slug of the `/log` post documenting this build

Then:
- Derive the slug from the name (lowercase, spaces → hyphens, strip special chars)
- Check if `content/tools/<slug>.json` already exists on `modryn-studio/modryn-studio-v2` main branch using the GitHub MCP
- If it exists: update the file with the new values
- If it does not exist: create it
- Either way, use a branch named `tool/<slug>` and open a PR against `main` on `modryn-studio/modryn-studio-v2` with:
  - Title: `tool: add/update <tool name>`
  - Body: the JSON that was written, plus a one-line summary of what changed
- Do NOT commit anything to the current repo — this change belongs in modryn-studio-v2 only
- Confirm the PR URL when done
