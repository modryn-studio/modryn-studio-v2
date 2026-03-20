# Mode 2 — Vertical Landscape

## What Mode 2 Is

REST JSON API as the product. Pre-computed pipeline: raw data collection → normalization → scoring → stable output. Developer pays monthly subscription. Agent calls the endpoint, gets structured intelligence, skips the stitching.

The model works because developers building agents in any domain are manually reinventing normalization + deduplication + scoring every time. The API does it once, sells it to everyone.

## Framework Applied to Mode 2

1. **Find a market** = pick an industry domain (not the developer audience — they're the customer, not the market)
2. **Find what they pay for** = what do developers building in that domain manually stitch together, or what do incumbents sell as expensive UI products?
3. **Add your signature** = pre-scored, normalized, stable schema. You ran the pipeline; they didn't have to.

---

## Verticals

### Financial / Trading

**Status:** Active — 4 sub-vertical candidates identified (see `/projects/financial-*`)

**Why:** Biggest confirmed gap. Developers ARE building financial agents (PRISM-INSIGHT: 13 agents, manually stitching, $200/mo API costs; multiple HN threads). Incumbents (Bloomberg, Polygon, Unusual Whales) are either raw data or UI products — none are agent-native. No judgment layer exists at the API level because of regulatory liability (raw data = not investment advice), proprietary IP concerns, and the agent-native use case being brand new.

**Sub-verticals identified:**

- News dedup + sentiment scoring → `/projects/financial-news-dedup/`
- Options flow normalization → `/projects/financial-options-flow/`
- Economic calendar + release scoring → `/projects/financial-econ-calendar/`
- Prop firm rules normalization → `/projects/financial-prop-firm-rules/`

**Luke's domain experience:** Stocks, futures, prop firm vertical. Enough to design the judgment layer without 5 conversations first.

**Pricing range confirmed:** $29–$149/mo depending on sub-vertical. Incumbents: Bloomberg ($24k/yr), Polygon ($29–$199/mo), Unusual Whales ($50–$150/mo), Benzinga Pro ($79–$199/mo).

---

### Legal

**Status:** Not researched — opportunity noted, not validated

**Why it's interesting:** Legal data is notoriously hard to parse. Court records, case filings, statute databases, regulatory actions are spread across PACER, state court systems, EDGAR (SEC), and hundreds of agency websites. Each has its own format. None of them expose clean APIs. A developer building a contract analysis agent, a compliance agent, or a litigation research agent is manually pulling from all of these.

**Likely gap:** No normalized schema for: case status across jurisdictions, regulatory action history by company, statute cross-reference across states.

**Who pays:** Law firms (but slow / procurement heavy), legal tech startups (better customer), compliance teams at fintech/healthcare companies (best — already using APIs, budget exists).

**Competitive note:** Westlaw and LexisNexis own the institutional market at $500+/mo. No one owns the developer API tier.

**Next step:** Search for "legal research API" on HN, ProductHunt, and r/LegalTech. Find developers building legal agents on GitHub.

---

### Real Estate

**Status:** Not researched — opportunity noted, not validated

**Why it's interesting:** Real estate data is fragmented across MLS systems (many local, require licensing), Zillow/Redfin (scraped, ToS issues), county assessor records (public but inconsistent), permit databases, HOA records. Developers building real estate agents (property analysis, investment scoring, flip evaluation) are manually pulling all of this.

**Likely gap:** No normalized schema for: comparable sales + permit history + tax record + listing status in one call. The data exists — it's just in 5 different places with 5 different formats.

**Who pays:** Real estate investor agents, property management platforms, mortgage underwriting tools, iBuyer-adjacent startups.

**Pricing anchor:** Zillow API (discontinued their public program), ATTOM Data ($99–$299/mo), CoreLogic (institutional). Developer tier gap confirmed.

**Next step:** Search r/RealEstateInvesting and r/realestateinvesting for "API" or "data" threads. Find GitHub repos of people scraping Zillow + county records — read their normalization code.

---

### Hiring Signals

**Status:** Not researched — opportunity noted, not validated

**Why it's interesting:** Job postings are public data. But the signal in job postings — what a company is actually building, where they're growing, what they're cutting — requires normalization, deduplication, and interpretation across sources (LinkedIn, Indeed, Greenhouse, Lever, company career pages). Developers building competitive intelligence agents, investor research agents, and sales prospecting agents are doing this manually.

**Likely gap:** No normalized schema for: job posting velocity by company + role + level + location, normalized to one record per unique opening (the same job posts on 5 boards), scored for growth signal (hiring vs. contracting, new function vs. backfill, senior vs. junior skew).

**Who pays:** B2B sales teams (intent signal — companies hiring for X = buying tools for X), investors (headcount as leading indicator), competitive intelligence teams, talent market analysts.

**Competitive note:** Burning Glass / Lightcast (institutional, $10k+/yr), Revelio Labs (series B, enterprise), LinkedIn Economic Graph (not an API). Developer tier: nothing real exists.

**Pricing anchor:** $99–$299/mo easily. The buyer is B2B commercial — they have budget and the signal is directly tied to revenue outcomes.

**Next step:** Search HN for "job posting API signal" or "hiring data API." Find Y Combinator companies in this space — understand what they're NOT serving (small teams, agents, dev use cases).

---

## Decision Framework

When picking which vertical + sub-vertical to build first:

1. **Strongest confirmed pain first.** Which one has the most evidence of developers manually doing the work you'd automate? (news dedup has the most explicit confirmation today)
2. **Regulatory risk.** Financial data near "investment advice" requires care with disclaimer language. Legal data can expose you to unauthorized practice of law if positioned wrong. Hiring data has GDPR/CCPA surface area. Real estate has MLS licensing walls. All solvable — just know the risk profile.
3. **Pipeline complexity vs. time to first endpoint.** Prop firm rules = lowest complexity (structured scrape of known pages). News dedup = higher complexity (multi-source, real-time, dedup at scale). Pick the one where you can ship a working v1 endpoint fastest and validate that developers will call it.
4. **Luke's existing context.** The closer the domain to what Luke already knows, the faster the judgment layer gets designed.
