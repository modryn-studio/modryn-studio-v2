# How to Add Content

## Adding a log post

**1. Create the file**

Drop a new `.mdx` file in `content/log/`:

```
content/log/YYYY-MM-DD-short-title.mdx
```

Example: `content/log/2026-02-25-shipped-the-site.mdx`

**2. Add frontmatter + body**

```mdx
---
title: Shipped the site
date: 2026-02-25
tag: launch
---

Write whatever you want here. Plain markdown.

**Bold**, _italic_, `code`, lists, links — all work.
```

**Tags:** `launch` `build` `killed` `milestone` `learning`

**3. Publish**

```bash
git add .
git commit -m "log: shipped the site"
git push
```

Vercel auto-deploys. Post is live at `modrynstudio.com/log/shipped-the-site` in ~30 seconds.

---

## Adding a tool

**1. Create the file**

Drop a new `.json` file in `content/tools/`:

```
content/tools/your-tool-slug.json
```

**2. Fill in the fields**

```json
{
  "name": "Tool Name",
  "slug": "tool-name",
  "description": "One sentence. What it does, who it's for.",
  "status": "building",
  "url": "https://modrynstudio.com/tools/tool-name"
}
```

**Status values:**
- `live` — fully shipped, link to the real URL
- `beta` — works but rough, link optional
- `building` — in progress, no URL needed
- `coming-soon` — placeholder, shows intent

**3. Publish**

Same as above — `git add . && git commit && git push`. Tool appears in the homepage grid and `/tools` automatically.

---

That's it.
