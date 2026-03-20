# Financial News Dedup & Sentiment API

## The Idea

Pre-computed, normalized, deduplicated financial news + sentiment as a stable JSON endpoint. Agents call it, get clean signal, skip the stitching.

## The Gap

Every developer building a financial agent right now is manually pulling from Nitter, GNews RSS, DuckDuckGo, Benzinga, and deduplicating by hand in a prompt. The failure mode is explicit: "sometimes the LLM treats a re-posted old news as a new event" — found verbatim on HN from a developer building exactly this. No product solves this at the API level.

## What the Pipeline Does

1. **Collect** — pull from multiple sources (Reuters wire, Benzinga, Seeking Alpha, Twitter/Nitter, GNews RSS, financial subreddits)
2. **Deduplicate** — canonical event matching (not prompt-based) — same story from 5 outlets = 1 record
3. **Normalize** — one schema: `{ event_id, headline, timestamp_utc, source, tickers, sentiment_score, confidence, is_duplicate_of }`
4. **Score** — velocity (how fast is this spreading?), source weight (Reuters > random blog), sentiment polarity (-1 to +1), freshness decay
5. **Output** — cached JSON served at stable endpoint, refreshed on a defined cadence (e.g. every 15 min)

## Why Incumbents Don't Solve It

- Benzinga Pro ($79–$199/mo) — raw news feed, UI product, no API schema, no dedup
- Polygon.io — has a news endpoint but raw, no scoring, no dedup
- Unusual Whales — UI, not developer-facing
- Bloomberg — $24k/yr, institutional only. No agent-native schema.

## Confirmed Pain Signals

- HN: college student building multi-agent financial terminal, explicitly asking "how do you architect verification layers for news agents?" → that IS the product
- PRISM-INSIGHT (GitHub): 13-agent Korean stock analyzer, $200/mo API costs, manually stitching news agent + sentiment agent as separate pipeline steps

## Customer

Developer building a financial agent that needs news as a structured input — not a chatbot response, a JSON record with stable fields. Pays monthly subscription. Doesn't want to run the collection + dedup pipeline themselves.

## Pricing Anchor

$49–$99/mo for API access. Tier by call volume or refresh cadence.

## Next Step to Validate

Search r/algotrading and r/LocalLLaMA for "financial news agent" threads. Find someone who built this manually and shipped it — look at their source list, their schema, their prompt. That IS the reverse-engineered schema.
