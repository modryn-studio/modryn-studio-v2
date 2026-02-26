---
name: add-tool
description: "Add a new tool entry to content/tools/. Creates the JSON file and confirms the slug."
agent: agent
---

Add a new tool to this project. Ask me for the following if not already provided:

1. **Name** — the display name (e.g. "Trend Detector")
2. **Description** — one sentence, plain language, no jargon. What it does and who it's for.
3. **Status** — one of: `live`, `beta`, `building`, `coming-soon`
4. **URL** — (optional) external URL if the tool lives at a separate domain
5. **Icon** — (optional) icon name or path

Then:
- Derive the slug from the name: lowercase, spaces → hyphens, remove special characters (e.g. "Trend Detector" → `trend-detector`)
- Create `content/tools/<slug>.json` with this shape:
  ```json
  {
    "name": "...",
    "description": "...",
    "status": "..."
  }
  ```
  Only include `url` and `icon` if provided.
- Confirm the file was created and show the final JSON.
- Remind me: if status is `live`, the tool page at `/tools/<slug>` is now public and will appear in the sitemap on next build.
