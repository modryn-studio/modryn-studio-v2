# Economic Calendar + Release Scoring API

## The Idea

Pre-scored economic event calendar as a stable JSON API. Not just "here are the events" (that already exists) — but "here's what this event means for market conditions, and here's the historical surprise rate."

## The Gap

Financial Modeling Prep (FMP), Tradier, and Alpha Vantage all expose economic calendars. The data is available. What's missing is the **judgment layer**: which events actually move markets, what's the expected vs. actual surprise history, and what's the current implied volatility context for that release. Every agent that processes macro data is doing this reasoning in a prompt — fragile, inconsistent, not reproducible.

## What the Pipeline Does

1. **Collect** — FMP economic calendar API (250 calls/day free tier), Fed release schedule, CME Fed Watch, earnings calendars
2. **Normalize** — one schema: `{ event_id, name, timestamp_utc, currency, importance, forecast, previous, actual, surprise_pct, historical_surprise_rate, market_impact_score }`
3. **Score** — historical surprise rate (how often does this beat/miss?), implied vol before/after (VIX, VVIX), market impact by asset class (equities, bonds, FX, futures)
4. **Output** — daily cached JSON, forward-looking 7 days + backward-looking 30 days for context

## Why Incumbents Don't Solve It

- FMP / Alpha Vantage — raw data, no scoring
- Briefing.com — narrative format, not an API
- ForexFactory — UI only, widely scraped, violates ToS
- Econoday — institutional pricing ($$$), no developer API tier

## Note: Relation to TradeBrief

TradeBrief already uses FMP for the calendar. This is the standalone, scored, agent-native version of that same data layer — but available as an independent API product that any financial agent can consume.

## Confirmed Pain Signals

- TradeBrief's own market research: r/Daytrading thread — "AI saves me 2 hours every morning" — OP manually pulls economic calendar every morning into ChatGPT
- Every macro-driven agent needs to answer "should I avoid this session because of a high-impact event?" — none have clean data to do it

## Customer

Developer building a macro-aware trading agent, a news agent that needs to flag event risk, or an ES/NQ analysis pipeline. Also: any agent that needs to de-risk its actions around large event windows.

## Pricing Anchor

$29–$49/mo — lower tier because raw calendar data is semi-available elsewhere. The scoring layer and stable schema are the product.

## Next Step to Validate

Check r/algotrading for "economic calendar API" discussions. Look for developers who've automated ForexFactory scraping — they exist, they're hacking around the gap, and they'd pay $29/mo to not maintain that scraper.
