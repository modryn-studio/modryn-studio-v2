# Building Modes

Two ways to build in the agentic AI / Web 4.0 era. Not mutually exclusive — run both in parallel.

---

## Mode 1: Agent as Delivery Mechanism

**The pattern:** You build a pipeline → it runs → humans get a finished result. The agent is invisible. The output is the product.

This is what you already do. Trend Detector is Mode 1. SpecifyThat is Mode 1. The user never interacts with the AI — they interact with the result the AI produced.

**Why it works:**

- Demand is immediate and tangible — people want the finished thing
- Distribution is conventional (Product Hunt, Reddit, X, SEO) — no behavior change required
- You can charge for the output even if the underlying tech is commoditized
- Your moat is the pipeline design + judgment layer, not the model

**What to build:**
Any domain where you can define "the finished result" and most people can't or won't build the pipeline themselves. The research, the synthesis, the judgment — all invisible. The output is what they pay for.

**Example applications from this session:**

- Document decoder — upload a lease, get Standard / Watch / Red Flag analysis + negotiation scripts. The user gets a report; the LLM reading the document is an implementation detail.
- Any vertical where there's a research intensive step most people skip because it's too hard, not because they don't care about the outcome.

**The test:** Can you describe the output as a finished thing someone would pay for, without mentioning AI? If yes, this is Mode 1 territory.

---

## Mode 2: Agent-Native Product

**The pattern:** Not a UI for humans — a service that other agents call. An API, a structured feed, a data source agents trust. The customer is a developer's agent workflow, not an end user clicking a button.

**Why this is the future:**
The unit of software is shifting. In the agentic era, agents are the users. They call services, read structured outputs, take action. Humans review results, not interfaces. The UI becomes optional. Discovery happens through agent stacks, not search rankings.

The defensible thing is no longer the interface — it's the data, judgment, or vertical expertise the agent can't replicate from its own training data.

SEO → AEO (agent engine optimization). Whoever gets embedded in agent workflows early wins on distribution.

**The infrastructure layer (know this before building):**

- **Clean REST API first** — agents call HTTP endpoints, not protocols. A well-documented JSON API is the primary surface. Everything else is an adapter on top.
- **MCP as optional transport** — MCP (Anthropic's Model Context Protocol, now Linux Foundation) is one way builders wire your service into Claude Desktop or agent stacks. It's useful for distribution, not the product. Pieter Levels called MCP "dead" and "a dumb abstraction" in March 2026, during real developer debates about CLI tools outperforming MCP for most agent workflows. He's partially right: MCP as THE architecture bet is fragile. But the data source underneath MCP is what agents actually need — the transport is a distribution question, not a product question. Offer MCP as an adapter, not a foundation.
- **llms.txt** — discoverability layer. How developers and agents learn your service exists. Submit to directory.llmstxt.cloud early.
- **Stable versioned schema** — agents break silently when schemas change. Version it, document it, never change it without a migration path. This is the only non-negotiable.

**What this requires:**

1. **Real-time signal** — current data from sources not in training data
2. **Verified domain judgment** — "is this normal or red flag" baked into the pipeline, not prompt-engineered at call time
3. **Stable schema** — agents need to trust the output structure doesn't change silently
4. **Developer trust** — builders route to sources they've vetted; discovery is community-driven, not algorithmic

**The moat model (validated):**
Stripe, Twilio, and Plaid prove the playbook. They won not because their software was irreplaceable — it was replicable. They won because of: (1) **switching costs** (once embedded, ripping out requires deprioritizing your roadmap), (2) **data network effects** (more usage → better outputs → harder to match), and (3) **the schlep underneath the API** (regulatory relationships, carrier deals, bank partnerships — the non-code work competitors don't want to do). Source: Packy McCormick, "APIs All the Way Down" (2020), still the best framework for this.

The analog for a vertical intelligence API: the schlep is the judgment layer — knowing what's signal vs. noise in a specific domain, baked in over time. That's the moat. Not the API plumbing.

**The Trend Detector insight:**
Trend Detector is already a Mode 2 product wearing a Mode 1 coat. The pipeline — 3-layer data aggregation, cross-reference scoring, deterministic pre-LLM gates, cluster analysis, BUILD/WATCH/SKIP decisions with `context_seed` output — is exactly what an agent workflow would call. Right now it pipes to a Markdown briefing. The pipeline itself is the asset. Serving it as a structured JSON endpoint is the product. **Trend Detector is the v1, not just proof of concept.** Market/trend signals is the entry vertical — it's the one where the judgment layer is already built and the supply gap is confirmed.

**The market:**

- Solo builders stitching together CrewAI + Tavily + raw APIs and doing judgment in prompts — reinventing the same pipe every single time. That's the customer.
- 43% of AI leaders cite data quality and readiness as their top obstacle. At the indie level there's no enterprise solution — the market is completely unserved.
- Enterprise is solving the underlying problem with acquisitions (Salesforce/Informatica, IBM/StreamSets). These moves confirm the pain is real and the market is large. They also confirm no one is solving it at indie-accessible price points — that's the gap.
- Reference price points for the target customer: Perplexity API, Brave Search, Exa, vertical data subscriptions — $20–500/mo
- The core principle, confirmed: "garbage in, garbage out" is a feature of AI as much as any other digital solution. Pre-filtered, pre-scored = context precision. That's what this product sells.

**Vertical selection criteria:**

Three filters for picking the entry vertical:

1. **Active agent development happening now** — developers are already building in this space
2. **Data exists but is unstructured or retrofitted** — raw ingredients are there, judgment layer is missing
3. **"Normal vs. red flag" logic is learnable** — domain judgment can be baked in without being a 20-year industry veteran

**Entry vertical: market/trend signals.** Validated by supply-side research (March 2026):

- glama.ai lists 19,675 MCP servers. Legal, hiring/talent, real estate, and market signals are **not even categories**. Finance has 1,020 servers — all thin API wrappers (Polygon, Token Metrics), none with a judgment layer.
- smithery.ai: LinkedIn MCP (the main hiring data source) has **97 installs**. Instagram has 258,000. The gap isn't demand — it's that nobody has built the judgment layer on top.
- HN practitioners confirm the gap: "most MCP Server developers simply use MCP as a thin translation layer over existing APIs. The biggest value is when an MCP Server is a curated experience designed for the LLM, not a raw data dump." (lsaferite, HN)
- Market/trend signals score best on all three filters AND the judgment layer already exists in the Trend Detector pipeline. It's the only vertical where v1 is a wrapping job, not a build-from-scratch.

Future verticals in order of opportunity (demand-side validation added March 2026):

1. **Legal/contract signal** — enterprise AI agent market in legal growing at 45.82% CAGR through 2034. Contract review alone sees 80% time reduction on first-pass analysis. All current solutions are enterprise-only. CourtListener, SEC EDGAR, state courts exist as raw data; judgment layer missing.
2. **Real estate** — borrower financials, appraisals, title reports, legal docs move through every transaction. All of it is retrofitted data. None pre-scored for agent consumption. Active agent development in real estate credit and lending teams confirmed.
3. **Hiring/talent signals** — LinkedIn MCP near-abandoned (97 installs). BLS data unprocessed. Demand clearly there, supply gap confirmed.

Same pipeline architecture applies to all. One thing web search can’t validate: whether the specific judgment layer (the BUILD/WATCH/SKIP logic) translates cleanly to a vertical you haven’t built for yet. That still needs 5 conversations with builders in that domain before touching code.

**The actual first move:**
Expose the Trend Detector pipeline as a versioned JSON API. The data pipeline, scoring layer, and judgment output already exist. This is not a pivot — it's adding a new output channel alongside the existing Markdown briefing. MCP adapter comes later if there's demand for it in Claude Desktop workflows.

**What makes it defensible:**
Not the API itself — any LLM can do research. The moat is becoming the authoritative signal source for a specific vertical. Agents route to sources they're pointed at. Once embedded in enough stacks, switching cost creates distribution lock-in regardless of whether the underlying approach can be replicated. This is the Stripe/Twilio pattern applied to vertical intelligence.

**Open questions (resolve before building):**

1. ~~Entry vertical~~ — ✅ **Resolved.** Market/trend signals. Expose Trend Detector pipeline as a versioned JSON API. MCP adapter optional, not foundational.
2. Output schema spec — Trend Detector's `signals_YYYY-MM-DD.json` is the starting reference; stabilize and version it before publishing
3. Discovery strategy — llms.txt, structured API docs, which two developer communities to seed first (r/LocalLLaMA + Latent Space Discord as starting points)
4. Free tier design — what's the hook that gets builders to integrate before paying (first call free? 7-day trial? daily signal sample endpoint?)
