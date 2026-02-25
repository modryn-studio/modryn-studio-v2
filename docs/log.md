# How to Post a Build Log Entry

## 1. Create the file

Add a new `.mdx` file to `src/content/log/`:

```
src/content/log/YYYY-MM-DD-short-title.mdx
```

Example: `src/content/log/2026-02-25-shipped-the-site.mdx`

## 2. Add frontmatter + content

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

## 3. Publish

```bash
git add .
git commit -m "log: shipped the site"
git push
```

Vercel auto-deploys. Post is live at `modrynstudio.com/log/shipped-the-site` in ~30 seconds.

---

That's it.
