# Prop Firm Rules API

## The Idea

Normalized, structured, machine-readable prop firm challenge rules served as a stable JSON API. One call returns: daily loss limit, max drawdown, profit target, permitted instruments, news trading rules, lot size restrictions, and challenge phase structure — for any firm.

## The Gap

There are 50+ prop firms (FTMO, MyFundedFX, TopstepTrader, The5ers, Apex Trader Funding, Funded Engineer, True Forex Funds, etc.). Their rules:

- Live on individual landing pages and PDFs, not in structured format
- Change frequently, without notice
- Differ meaningfully between firms and between challenge tiers
- Are widely misread, causing account violations and payouts denied

Right now: traders cross-reference scattered blog posts, community wikis (often outdated), and Reddit threads. There is no API. There is barely a good website.

## What the Pipeline Does

1. **Collect** — scrape/parse firm pages (rules pages, FAQ, PDFs), community-sourced updates flagged by users
2. **Normalize** — one schema per firm per tier: `{ firm_id, tier, daily_loss_limit_pct, max_drawdown_pct, profit_target_pct, news_trading_allowed, permitted_instruments, lot_size_rules, scaling_plan, phase_count, phase_rules[] }`
3. **Enrich** — flag rules that have changed in the last 30 days, flag firms with community-reported payout disputes
4. **Output** — stable JSON endpoint, weekly refresh (rules don't change daily), versioned schema

## Why Incumbents Don't Solve It

- PropFirmMatch.com — comparison site, no API
- TheTopFirms / FundedTraderReport — review aggregators, no structured data
- Individual firm websites — no normalization
- No one has built this as a developer API

## Confirmed Pain Signals

- Reddit r/PropFirmTraders: regular threads about "what are the exact rules for X firm" — answers are manual, often wrong
- Community-maintained Google Sheets of firm rules exist (proof of demand, proof no product has eaten the job)
- Traders have lost funded accounts citing rules they misread from outdated blog posts

## Customer

1. **Developer building a prop firm evaluation agent** — agent that helps a trader pick the right firm/tier for their strategy
2. **Developer building a risk management overlay** — agent that flags when a trade would put the account near the daily loss limit
3. **Traders themselves** — potential direct consumer path, but developer API is the primary entry

## Pricing Anchor

$19–$39/mo. Lower price justified by narrower customer base (prop firm traders specifically) but high intent customer — these people pay for challenges ($100–$500 per attempt).

## Next Step to Validate

Search r/PropFirmTraders for "comparison" and "rules" threads. Count how many people are manually answering "what's the max drawdown on FTMO vs Apex?" — that IS the demand signal. If it's happening weekly, the data exists in spreadsheets — the API doesn't.
