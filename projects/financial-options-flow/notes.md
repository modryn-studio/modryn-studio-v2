# Options Flow Normalization API

## The Idea

Pre-normalized options flow data (unusual activity, dark pool prints, sweep activity) served as a stable JSON API for agent consumption. Not a UI product. Not a dashboard. A structured endpoint.

## The Gap

Unusual Whales ($50–$150/mo) and FlowAlgo ($50–$149/mo) exist as **UI subscriptions** for retail traders. Neither exposes a clean developer API with a stable schema. Developers who want to feed options flow into an agent are either scraping these products (against ToS) or manually pulling from CBOE + OPRA + Quiver Quant and normalizing it themselves.

## What the Pipeline Does

1. **Collect** — CBOE options data, OPRA prints, dark pool reports (Quiver Quant, Barchart unusual options, public feeds)
2. **Normalize** — one schema: `{ print_id, ticker, expiry, strike, type, size, premium, vs_oi_ratio, sweep_flag, dark_pool_flag, timestamp_utc, score }`
3. **Score** — size vs. open interest, premium size relative to typical, sweep vs. limit, proximity to expiry, directional bias signal
4. **Output** — cached JSON, updated on defined cadence (intraday or EOD depending on tier)

## Why Incumbents Don't Solve It

- Unusual Whales — UI only, no API
- FlowAlgo — UI only, no API
- Market Chameleon — data but no normalization or scoring
- Quiver Quant — raw congressional/institutional data, not options flow specifically
- Polygon — has options chain data but raw, no flow scoring

## Confirmed Pain Signals

- PRISM-INSIGHT: has a dedicated "trading flows agent" as one of 13 agents, manually pulling options data as a separate pipeline step
- r/algotrading threads: recurring question of "where do I get clean options flow data" — no consensus answer exists

## Customer

Algo trader or developer building an agent that uses unusual options activity as a signal input. Needs it as clean JSON, not a screen to watch. Pays monthly.

## Pricing Anchor

$79–$149/mo — matches the UI products, justified by being dev-native (no scraping, stable schema, API key access).

## Next Step to Validate

Find GitHub repos where someone is pulling CBOE/Quiver data and processing options flow manually. Read their normalization code. That's the schema we should serve pre-built.
