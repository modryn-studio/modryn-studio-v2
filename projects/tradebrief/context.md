# Project Context

## Product

TradeBrief — pre-market brief generator for NQ/ES futures traders. Screenshot your chart, get a structured brief: your levels in context, economic events for the session, and the one scenario that invalidates your thesis.

## Target User

A NQ or ES day trader who already has a plan and drawn levels before the open — but spends 30–45 minutes every morning pulling it all together manually. They know what they think. They just haven't written it down in a way that holds up when the market opens.

## Deployment

mode: modryn-app
url: https://modrynstudio.com/tools/tradebrief
basePath: /tools/tradebrief

## Minimum Money Loop

Landing page → screenshot upload → GPT-4o Vision brief generated (1 free/day) → PayGate ($9/5 credits) → Stripe Payment Link → localStorage receipt → brief unlocked

## Stack Additions

- OpenAI GPT-4.1 Vision API — **must use `gpt-4.1`** (current generation as of March 2026; `gpt-4o` is previous gen, `gpt-4.1-mini` cannot reliably read price levels and drawn lines from chart screenshots). Use structured JSON output to enforce brief format — GPT-4.1 supports `response_format: { type: 'json_schema', json_schema: { ... } }`. (env var: `OPENAI_API_KEY`)
- Financial Modeling Prep API (economic calendar — free tier, **250 calls/day**, env var: `FMP_API_KEY`) — cache the calendar response server-side for the full day (key: `fmp_calendar_YYYY-MM-DD`). Same data for all users. Without caching, even light traffic blows the free limit.
- Stripe Payment Link (no server code — URL passed to PayGate component, env var: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`)
- `tvdatafeedclient-js` npm package (V2 — unofficial TradingView WebSocket, `npm install tvdatafeedclient-js`, **version 3.0.2, last updated Dec 2025**) — built primarily for crypto exchanges; CME futures (NQ1!, ES1!) are not officially supported but the WebSocket protocol can be reverse-engineered to work. V2 is a **time investment**, not a hard blocker. Ship V1 first.

## Project Structure Additions

- `/content/pine/` — Pine Script template files for the TradingView webhook path

## Route Map

- `/tools/tradebrief` → Landing + chart upload form + brief output + PayGate
- `/api/generate-brief` → POST: receives chart image (base64) + metadata, fetches FMP calendar, calls GPT-4o Vision, returns brief markdown
- `/api/webhook/tv` → POST: receives Pine Script alert JSON (`{ symbol, bias, levels: { s1, s2, r1, r2 }, ohlc, overnight_range }`), runs same brief pipeline, stores result keyed by session token
- `/api/brief/[token]` → GET: polling endpoint — browser polls this after Pine Script alert fires, returns brief when ready

## API Route Convention

Every route in `/app/api/` MUST use `createRouteLogger` from `@/lib/route-logger`. No raw `console.log` in routes.

```ts
import { createRouteLogger } from '@/lib/route-logger';
const log = createRouteLogger('generate-brief');

export async function POST(req: Request): Promise<Response> {
  const ctx = log.begin();
  try {
    // handler body
    return log.end(ctx, Response.json(result));
  } catch (error) {
    log.err(ctx, error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

## Monetization

one-time-payment

- $9 / 5 credits via Stripe Payment Link (no server code)
- 1 free brief per day, IP rate-limited
- Credits stored in localStorage

## Architecture Constraints

- **Local-first:** No user accounts, no persistent server-side data storage. Credits and brief history live in localStorage only.
- **No brief logging:** Do not log or store chart images or generated briefs persistently. Users are sharing their trading setup — treat it as private.
- **Temporary webhook buffer (exception):** The Pine Script webhook path (V1.5) requires holding the generated brief in short-lived server memory (TTL: 5 minutes, keyed by session token) so the browser polling endpoint can retrieve it. This is not persistent storage — it's a transient handoff buffer. Use an in-memory store (e.g. a `Map` in the route module) or Vercel KV if scale demands it. Do not write to a database.
- **FMP calendar cache:** Cache the economic calendar API response for the full calendar day. Same data for all users. Key: `fmp_calendar_YYYY-MM-DD`. Invalidate at midnight. Prevents hitting the 500 call/day free tier limit.
- **Disclaimer required:** "Not financial advice. This brief organizes your own analysis." must appear below the upload form AND in the brief output footer.

## Market Validation

Researched March 2026. Demand confirmed before building.

- **r/Daytrading (481K members):** "AI now saves me 2 hours every morning (trading)" — 527 upvotes, 154 comments. OP manually copies pre-market data into ChatGPT. No packaged tool. Comments show DIY Python scripts, custom GPT projects, BigQuery pipelines. All fragile, all manual.
- **r/FuturesTrading (46K members):** Traders paying Mancini ($99+/mo), TradeBrigade, ShadowTrader for generic daily ES/NQ levels. One-size-fits-all analyst output — not personalized to the user's drawn levels or session type. Active thread: "Best analysts who post pre-market analysis for ES/NQ daily?" (29 comments).
- **Gap confirmed:** No tool exists that takes a trader's own chart and returns a structured brief. People are either paying analysts for generic analysis or hacking together ChatGPT workflows. r/FuturesTrading comment: _"just load up a screenshot of a 1 hour chart and ask GPT for a bullish and bearish plan. I've done this prior to the 0930 open"_ — manual, nobody has packaged it.
- **Skeptics exist:** "AI doesn't replace analysis" — use this as positioning, not a threat. Brief explicitly organizes user's own analysis. Lean into it.

## Competitive Landscape

- **Mancini (ES Focus):** $99+/mo newsletter. Static levels posted daily. Generic — not your levels, not your session type. No invalidation logic.
- **TradeBrigade:** YouTube + paid community. Pre-market video analysis. High-effort to consume, not interactive.
- **ShadowTrader (Peter's Premarket Perspective):** $50+/mo. Text-based market prep. Same problem — one perspective for all subscribers.
- **DIY ChatGPT:** Free but manual. Users copy-paste data every morning. No economic calendar integration. No structured output format.
- **TradeBrief's wedge:** Personalized to your chart, your levels, your session. The analyst knows ES — TradeBrief knows YOUR ES. 60 seconds vs. 45 minutes.

## Brief Output Structure

Every brief has these five sections — maintain this format in all GPT-4o prompts:

1. **Your Bias** — one line restating the trader's directional read
2. **Economic Events Today** — pulled from FMP calendar, filtered to high/medium impact, context on how each event interacts with the bias
3. **Your Levels in Context** — each level (S1/S2/R1/R2) with a sentence on what the market doing at that level means for the thesis
4. **Thesis Invalidation** — one specific price action scenario that means the bias is wrong and the trader should sit out
5. **Session Notes** — timing guidance for the session type (scalp window, avoid-FOMC note, etc.)

Footer on every brief: _"Not financial advice. This brief organizes your own analysis — it generates nothing you didn't already know."_

## Target Subreddits

- r/Daytrading (481K members — primary launch channel, 10x larger, AI-friendly audience)
- r/FuturesTrading (46K members — secondary, more targeted NQ/ES audience)
- NOTE: r/emini is NOT the futures subreddit — it's about the Remini photo app. Restricted, 1 visitor/week. Do not post there.

## Input Paths (three, same pipeline out)

**V1 — Screenshot (ship first):** User drags/drops a TradingView chart screenshot. GPT-4o Vision reads drawn levels, trend context, visible indicators. Zero setup required.

V1 form fields (all required except Notes):

- **Instrument** — select: NQ / ES / MNQ / MES
- **Session type** — select: Scalp / Intraday / Swing
- **Chart screenshot** — drag-and-drop or click-to-upload. Accept: PNG, JPG, WEBP. Max 10MB. Converted to base64 before sending.
- **Notes** — optional free text. Use for anything not visible on the chart: "NVDA down 2% pre-market", "avoiding FOMC at 2pm", "only trading first 45 min".

Bias and key levels are NOT form inputs in V1 — GPT-4o Vision reads them directly off the chart screenshot. Do not add manual level fields; that defeats the screenshot-first UX.

**V1.5 — Pine Script Webhook:** User installs a provided Pine Script on their TradingView chart. Script packages drawn S/R lines + OHLC + overnight range as JSON and fires to `/api/webhook/tv` on alert trigger. Brief generated automatically. Requires TradingView Pro ($15/mo — standard for serious NQ/ES traders). Setup instructions + copy-paste Pine Script provided on the tool page.

**V2 — Auto (post-validation):** Server pulls NQ/ES OHLC directly via tvdatafeedclient-js WebSocket. User picks instrument only. CME futures support requires reverse-engineering the WebSocket protocol — doable, but it's a time investment. Build after V1 validates the brief format and there's paying user demand for zero-setup input.

## Launch Strategy

**Luke is user zero.** He trades NQ/ES personally. This is the authentic hook — the Reddit post is not a product announcement, it's a "I trade this and built the tool I wanted" story. That framing is what gets upvotes in r/Daytrading vs. getting removed as spam.

**Reddit post angle (r/Daytrading — primary):**

- Lead with the problem: 45-minute morning prep that falls apart at 9:30
- Name the product and link to the tool page (not the log post — learned from songfor.me launch)
- Mention the screenshot input — it's the hook that makes it feel different from another form
- No AI hype in the post. Lead with outcomes.

**Log post hook:** "I trade NQ. I built the prep tool I wanted."

## Example Brief

Use this as the few-shot example in the GPT-4o system prompt AND as the demo on the landing page. Format must match exactly — section headers, bold labels, footer line unchanged.

---

**TradeBrief — NQ · Intraday · March 18, 2026**

**1. Your Bias**
Bearish below 19,750. You're looking for a continuation lower after Friday's rejection at the 20-day EMA. No long setups until price reclaims and holds above that level.

**2. Economic Events Today**

- **8:30 AM ET — NY Fed Manufacturing (medium):** Weak readings add to the bearish narrative. A beat could produce a short squeeze into the 9:30 open — watch for a wick up to 19,750 that fades, not a break above.
- **10:00 AM ET — JOLTS Job Openings (medium):** Surprise strength would pressure the short thesis. If number comes in hot, consider sitting flat until the market digests it (10:00–10:30 AM window).
- No high-impact FOMC or CPI events today. Clean tape for your thesis to play out.

**3. Your Levels in Context**

- **R2 — 19,820:** Friday's rejection point. Price reclaiming this level on volume is the only reason to abandon the short bias. This is your line in the sand.
- **R1 — 19,750:** Immediate resistance. If NQ opens below here and can't reclaim within the first 15 minutes, bias stays short.
- **S1 — 19,580:** First target. Previous structure low from March 5. Expect a bounce or consolidation here before continuation.
- **S2 — 19,420:** Extended target. Only valid if S1 breaks cleanly and holds below on a retest. Don't chase — wait for the second touch.

**4. Thesis Invalidation**
If NQ opens and drives straight through 19,750 on elevated volume in the first 5 minutes, the short thesis is off. That's institutional buying, not a fade. Close any bias, go flat, and reassess after the first 30 minutes. Do not fade a strong open break above R1.

**5. Session Notes**
Intraday window: 9:30 AM — 11:30 AM ET (prime volatility, cleanest order flow). Second window 2:00 PM — 3:00 PM if morning didn't set up. Avoid 11:30 AM — 1:30 PM (lunch chop). With JOLTS at 10:00 AM, consider reducing size or sitting flat from 9:50–10:15 — news spikes in NQ can be 50+ points in seconds.

---

_Not financial advice. This brief organizes your own analysis — it generates nothing you didn't already know._

---

## GPT-4.1 Vision Cost

~$0.005–0.01 per brief (GPT-4.1: $2.00/1M input tokens, $8.00/1M output tokens; chart screenshot ≈ 765 tokens at high detail). Use `gpt-4.1` — full stop. Quality over cost. Monitor via OpenAI usage dashboard.

## Social Profiles

- X/Twitter: https://x.com/lukehanner
- GitHub: https://github.com/TODO
- Dev.to: https://dev.to/lukehanner
- Ship or Die: https://shipordie.club/lukehanner
