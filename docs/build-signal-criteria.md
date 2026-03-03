# Build Signal Criteria

How trend-detector evaluates a signal and how to interpret the output during discovery planning.

---

## The Decision Output

Every scored keyword gets one of three tags:

| Decision         | Meaning                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **BUILD GREEN**  | Early stage, low competition, confirmed pain. Worth 48 hours.                                                                        |
| **BUILD YELLOW** | Promising but one flag (competition rising, lifecycle peaking, weak pain signal). Build only if the product angle is differentiated. |
| **WATCH**        | Trending but not actionable yet — competition too high, lifecycle unclear, or no Reddit pain found. Revisit in 1–2 weeks.            |
| **SKIP**         | Saturated, fading, or no real pain signal. Ignore.                                                                                   |

Decisions are anchored purely to signal quality — demand strength × pain signal × competition gap. Build capacity and scope are not factors in the pipeline's evaluation. That's the discovery phase's job.

**Two deterministic gates fire in code before the LLM is called:**
- **RED gate** — Pass 1 competition is RED and pain signal is unreliable → auto-SKIP, no LLM call
- **Score gate** — cluster score <50 and no confirmed pain → auto-SKIP, no LLM call

If a cluster clears both gates, the LLM evaluates it. If the LLM returns SKIP, the briefing shows reasoning only — no `build_idea`, no routes. The pipeline already decided; discovery doesn't need to argue past it.

---

## The Four Scoring Axes

**1. Growth velocity**
How fast is search volume rising over the last 7–14 days? A keyword growing 3x in two weeks at low absolute volume is more interesting than a high-volume keyword growing 10% year-over-year.

**2. Lifecycle stage**
Derived from 30-day time series data. Three tags:

- `EARLY` — rising but not yet at peak. The ideal window.
- `PEAKING` — at or near maximum velocity. Still buildable but the window is closing.
- `FADING` — past peak. Competitor tools now exist. Skip unless you have a clear angle.

**3. Competitor density (two-pass)**
Checked twice — not once.

- Pass 1: raw keyword. "third places" → how many tools exist for "third places"?
- Pass 2: specific product idea the LLM proposes. "Third-place finder for introverts" → how many tools exist for _that_?

Both numbers matter. A keyword with zero competition but an obvious product idea with fourteen existing tools is not a BUILD GREEN — it's a trap.

**4. Reddit pain signal**
The filter that kills the most false positives. A keyword trending on Google but with no complaint threads on Reddit is usually a media cycle (a news story, a viral tweet) not a real problem. Real problems have Reddit threads that look like:

- "Why is it so hard to find X?"
- "Does anyone else struggle with Y?"
- "I've tried everything for Z, nothing works"

No Reddit pain = WATCH at best, regardless of trend score.

**Reliability matters.** The pipeline distinguishes reliable pain (on-topic subreddit, explicit frustration) from unreliable pain (off-topic subreddit hit that happened to include a pain word). Only reliable pain counts for gate decisions. If the briefing shows a pain signal but the subreddit context looks tangential, treat it as weak and apply the same skepticism you'd apply to no signal.

---

## The Emotional Barrier Test

Before committing, ask: what's the feeling that stops someone from doing the thing this keyword is about — not the information gap?

**Wrong framing:** "People don't know where hiking clubs are in their city." → Build a directory.

**Right framing:** "People are afraid to walk into a room full of strangers alone." → Build a first-timer cheat sheet that removes that fear.

The same keyword, two completely different products. The second one solves a real blocker. The first one is another link aggregator.

A BUILD GREEN signal is only worth 48 hours if you can answer the emotional barrier question with something that isn't "I'll just show them the information they're missing."

---

## context_seed — Pipeline-to-Boilerplate Bridge

Every BUILD decision in the signals JSON now includes a `context_seed` object:

```json
{
  "product_description": "First-timer cheat sheet for hiking club meetups",
  "target_user": "People who want to join a hiking club but are afraid to show up alone",
  "emotional_barrier": "Fear of walking into a group of strangers without knowing the norms",
  "routes": ["/", "/quiz", "/results"]
}
```

These four fields map directly to the boilerplate's `context.md` template. When you pick a BUILD decision to act on:

1. Open the day's `data/signals_YYYY-MM-DD.json`
2. Find the cluster's `decisions` entry
3. Copy the `context_seed` values into the new tool's `context.md`
4. Run `/init` — the boilerplate fills in stack, domain path, and basePath automatically

This eliminates the "stare at a blank context.md" problem. The pipeline already did the emotional barrier analysis — don't redo it.

**When to override context_seed:** If your discovery session (ProjectLoom or manual) surfaces a better angle than what the pipeline proposed, override it. The seed is a starting point, not a constraint. The pipeline sees trends and Reddit pain; you see the full competitive landscape and your own capacity.

---

## What Makes a Signal Worth 48 Hours

All five of these should be true for BUILD GREEN:

1. Lifecycle is `EARLY` or `PEAKING` (not `FADING`)
2. Competitor count on the specific product idea is low (< 3 direct competitors)
3. Reddit pain signal confirmed — at least 2–3 complaint threads in the last 6 months
4. The emotional barrier is identifiable and solvable in a single tool
5. The tool can save someone 30+ minutes OR eliminate a frustration they hit repeatedly

If only 3–4 are true, it's BUILD YELLOW — worth exploring in discovery, not worth committing to without a differentiated angle.

---

## Naming a Tool

Tools ship under `modrynstudio.com/tools/[slug]` — no domain purchase, no social handle reservation required. The name is just the `<h1>` and the tool JSON entry.

**What the name should do:**

- Capture the moment of action, not the category
- Be short enough to work as a slug without hyphens where possible
- Feel like something a person would say, not a SaaS product

**What to check before committing:**

1. USPTO TESS (tess.uspto.gov) — 2-minute search for registered trademarks. If a hit comes back for something that would care, pick a different name. No legal exposure at this stage.
2. Nothing else — not domain availability, not social handles, not Product Hunt namespace. None of that applies until the tool earns a standalone presence.

**Do not:**

- Name the tool after the category keyword (that's SEO bait, not a product name)
- Lead with "AI" in the name or tagline — it's an implementation detail, not a selling point
- Over-engineer the name during the 48-hour build — pick something that works, ship it, rename later if needed
