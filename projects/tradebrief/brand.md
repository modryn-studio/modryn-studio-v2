# Brand

Fill this in before running `/init`. It populates the Brand & Voice section of `copilot-instructions.md`.

---

## Voice

- Short sentences. Traders don't read. Get to the point.
- Talk to someone who's been burned by signals gurus and "alpha" sellers.
- You're not smarter than the market. You're just more prepared than yesterday.
- Never use: "signals", "alpha", "edge", "AI-powered", "powerful", "seamless", "unlock"

---

## The User

A futures trader who knows their levels and has a directional bias before the open — but shows up to the chart without a written plan and makes dumb trades in the first 15 minutes. They don't want signals. They want their own thinking organized.

**Core positioning:** This tool does not replace the trader's analysis. It organizes and pressure-tests it. Every word of copy should reinforce: "you already have the plan — this makes you write it down before the open." The brief generates nothing the trader didn't already know. It just structures it so they actually read it.

---

## Visual Rules

- Color mode: Dark only — matches a trading terminal, not a SaaS dashboard
- Fonts: Space Grotesk (headings) + Space Mono (levels, brief output, price data)
- Motion: None. Traders find animation distracting. Static, immediate, dense.
- Avoid: No green/red gradient buttons, no stock photos, no charts as decoration

---

## Color System

Five named slots — fill all before running `/init`. These become the `@theme` tokens in `globals.css`.

| Name       | Hex     | Role                                                |
| ---------- | ------- | --------------------------------------------------- |
| Accent     | #00C853 | Chart green — CTAs, confirmation states, go signals |
| Secondary  | #FF3D00 | Chart red — warnings, invalidation scenarios only   |
| Background | #080808 | Terminal black — the chart behind the brief         |
| Text       | #E8E8E8 | Off-white — warm, readable on dark                  |
| Muted      | #3A3A3A | Borders, placeholders, secondary labels             |

Color rules:

- TradeStation, NinjaTrader, TradingView all own blue. Avoid blue entirely.
- The accent is chart green — it reads as "profit" to anyone who trades. Don't fight it.
- Secondary red is reserved for invalidation and warnings only — never use as a CTA.

---

## Logomark

**Direction:** Single letterform — "TB" monogram or stylized "T" in Space Mono

**Primary color:** Accent #00C853

**Background:** Transparent — no container

**Future-proofing:** No instrument-specific imagery. Mark must work if product expands beyond NQ/ES to any futures or forex instrument.

**Competitor exclusions:** TradingView owns the candlestick chart icon. Tastytrade owns abstract curves. Avoid: candlestick shapes, waveforms, generic chart icons.

**Anti-patterns:** No bulls, no bears, no rocket ships, no lightning bolts — the whole trading influencer visual vocabulary is off-limits.

---

## Emotional Arc

What a visitor feels at each stage — land, read, scroll, convert.

- Land: "Finally — someone who isn't selling me signals"
- Read: "This is just me, organized"
- Scroll: "I want to see what the actual brief looks like"
- Convert: "That output would have kept me out of a bad trade last week"

---

## Copy Examples

Real copy to use as reference when writing UI text.

- Hero: "Drop your chart. Get your brief."
- Sub: "You already know your levels. This turns them into a plan you actually read before the open."
- CTA: "Generate Brief"
- Empty state: "Upload a screenshot of your chart to start."
- PayGate: "You've used your free brief for today. $9 gets you 5 more."
- Disclaimer: "Not financial advice. This brief organizes your own analysis — it generates nothing you didn't already know."
- Footer: "Built by a NQ trader who got tired of opening the chart with no plan."
- Against analysts: "Mancini knows ES. This knows yours."
- Against DIY ChatGPT: "You're already doing this manually. Stop."

## Launch Voice (Reddit)

The Reddit post is not marketing. It's a trader talking to other traders. Tone rules:

- First person, past tense problem statement. "I was spending 45 minutes every morning..."
- Name the product early. Link to the tool page, not the log post.
- No AI hype. "It reads your chart and writes up your plan" — not "AI-powered pre-market analysis."
- Mention one concrete detail that makes it feel real. The screenshot input is it — drag your chart, done.
- The product doesn't give you an edge. It makes you write your plan down. Say that plainly.
