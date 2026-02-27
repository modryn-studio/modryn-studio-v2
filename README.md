<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/banner-darkv2.png">
  <source media="(prefers-color-scheme: light)" srcset="public/banner-lightv2.png">
  <img alt="Modryn Studio" src="public/banner-lightv2.png">
</picture>

# Modryn Studio

The studio site. Tools for people who don't have time for bad software — built one at a time, shipped fast, no fluff.

→ [modrynstudio.com](https://modrynstudio.com)

---

Next.js 16 · TypeScript · Tailwind CSS v4 · Vercel · GA4 · Resend

---

## Routes

| Route           | Description                                            |
| --------------- | ------------------------------------------------------ |
| `/`             | Hero, tools grid, build log preview, email signup      |
| `/tools`        | All tools — live, beta, building                       |
| `/tools/[slug]` | Individual tool page — SEO + email capture if not live |
| `/log`          | Build in public feed                                   |
| `/log/[slug]`   | Individual log post                                    |
| `/about`        | Who Luke is, how he works                              |
| `/privacy`      | Privacy policy                                         |
| `/terms`        | Terms of service                                       |
| `/feed.xml`     | RSS feed — auto-polled by dev.to                       |
| `/sitemap.xml`  | Auto-generated sitemap                                 |

## Content

Tools and log posts are file-based — no CMS, no database.

- **Add a tool** → `content/tools/[slug].json`
- **Add a log post** → `content/log/YYYY-MM-DD-[slug].mdx`

## Running Locally

```bash
npm install
cp .env.local.example .env.local
# fill in .env.local
npm run dev -- --port 3000
```

Or use `Ctrl+Shift+B` in VS Code (runs dev + pipes output to `dev.log`).

## Environment Variables

See `.env.local.example` for all vars with inline docs. Required to send feedback/signup emails:

| Variable                        | Required | Description                                   |
| ------------------------------- | -------- | --------------------------------------------- |
| `GMAIL_USER`                    | Yes      | Gmail address for outbound notifications      |
| `GMAIL_APP_PASSWORD`            | Yes      | Google app password (not your login password) |
| `FEEDBACK_TO`                   | No       | Delivery address — defaults to `GMAIL_USER`   |
| `RESEND_API_KEY`                | No       | Stores newsletter signups as Resend Contacts  |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No       | GA4 measurement ID (`G-XXXXXXXXXX`)           |
