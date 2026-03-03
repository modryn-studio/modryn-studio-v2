---
name: deploy
description: Wires a new tool into modryn-studio-v2 — adds the rewrite entry to next.config.ts and verifies the landing page JSON exists.
agent: agent
---

This prompt runs from **modryn-studio-v2** after the tool repo has been deployed to Vercel.

You need two pieces of information. Ask Luke if not provided:
- **Tool slug** — e.g. `hiking-finder`
- **Vercel URL** — e.g. `https://hiking-finder.vercel.app`

## Step 1: Add rewrite entry to next.config.ts

Read `next.config.ts`. Find the `rewrites()` function and its return array.

Add this entry (replace slug and Vercel URL with the actual values):

```ts
{
  source: '/tools/[slug]/:path*',
  destination: 'https://[vercel-url]/tools/[slug]/:path*',
},
```

Important: the `destination` includes the full `/tools/[slug]` prefix — this must match the `basePath` set in the tool repo's `next.config.ts`.

## Step 2: Verify landing page JSON

Check that `content/tools/[slug].json` exists.

If it does NOT exist:
> Stop. Run `/tool` first to create the landing page JSON, then run `/deploy` again.

If it DOES exist, check these fields and update if needed:
- `status` → set to `"live"`
- `url` → set to `"https://modrynstudio.com/tools/[slug]"`

## Step 3: Commit and push

```
git add next.config.ts content/tools/[slug].json
git commit -m "deploy: wire [slug] → modrynstudio.com/tools/[slug]"
git push
```

## Step 4: Confirm

Tell Luke:
> ✅ `modrynstudio.com/tools/[slug]` is now live.
> Landing page: `modrynstudio.com/tools/[slug]` (served from this repo)
> Tool UI: `modrynstudio.com/tools/[slug]/` (proxied from Vercel)
>
> Submit to Google Search Console if not already done:
> Search Console → URL Inspection → paste `https://modrynstudio.com/tools/[slug]` → Request Indexing
