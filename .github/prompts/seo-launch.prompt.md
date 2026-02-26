---
name: seo-launch
description: "Pre-launch SEO checklist: validate OG tags, register with search engines, submit sitemap."
agent: ask
---
# SEO Launch Checklist

Walk me through the SEO launch steps for this project. First auto-generate any missing required files, then audit the full codebase, then guide me through the external steps I need to do manually.

## Step 0: Auto-Generate Missing Files
Before auditing, check for and CREATE the following files if they are absent:

**`src/app/sitemap.ts`** — if missing, create it with this pattern:
```ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/log";
import { getAllTools } from "@/lib/tools";

const BASE_URL = "https://DOMAIN.com"; // replace with actual domain from layout.tsx

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tools = getAllTools();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    // add remaining static routes from app/ directory
  ];
  const logRoutes = posts.map((post) => ({
    url: `${BASE_URL}/log/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const toolRoutes = tools
    .filter((t) => t.status === "live")
    .map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  return [...staticRoutes, ...logRoutes, ...toolRoutes];
}
```

**`public/robots.txt`** — if missing, create it:
```
User-agent: *
Allow: /

Sitemap: https://DOMAIN.com/sitemap.xml
```

Report which files were created vs already existed.

## Step 1: Code Audit
Check the codebase for:
- [ ] `layout.tsx` has `metadataBase`, `title`, `description`, `openGraph`, `twitter`, `manifest`
- [ ] OG title is 50–60 chars, description is 110–160 chars
- [ ] `public/og-image.png` exists (1200×630px)
- [ ] `public/robots.txt` exists and references the sitemap URL
- [ ] `src/app/sitemap.ts` exists and lists all public routes
- [ ] `public/manifest.json` exists
- [ ] JSON-LD `SoftwareApplication` script in `layout.tsx`
- [ ] `package.json` has a `description` field

Report PASS / MISSING for each item with file paths for anything missing.

## Step 2: Manual Launch Steps (guide me through these)

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → Domain → enter your domain
3. Verify via DNS TXT record:
   - Vercel dashboard → click your **team name** (not a project) → left nav: **Domains**
   - Click the domain → **Advanced Settings** → **Add Record**
   - Type: TXT | Name: @ | Value: `google-site-verification=...` | TTL: 60
   - Wait 5–30 min, then click Verify in Search Console
4. After verification → Sitemaps → submit `https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Select **Import from Google Search Console** — pulls your site and sitemap automatically
4. Done (also covers Yahoo and DuckDuckGo which use Bing's index)

## Step 3: Validation
Tell me to check these once the site is deployed:
- **OG preview:** https://opengraph.xyz — paste the live URL, verify title 50–60 chars, description 110–160 chars, image 1200×630
- **JSON-LD:** https://search.google.com/test/rich-results — should show "1 valid item detected"
- **DNS propagation:** https://www.whatsmydns.net — check TXT record has propagated
