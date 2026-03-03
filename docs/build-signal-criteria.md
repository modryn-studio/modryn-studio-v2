# Build Signal Criteria

How trend-detector evaluates a signal and how to interpret the output during discovery planning.

---

## The Decision Output

Every scored keyword gets one of three tags:

| Decision | Meaning |
|---|---|
| **BUILD GREEN** | Early stage, low competition, confirmed pain. Worth 48 hours. |
| **BUILD YELLOW** | Promising but one flag (competition rising, lifecycle peaking, weak pain signal). Build only if the product angle is differentiated. |
| **WATCH** | Trending but not actionable yet — competition too high, lifecycle unclear, or no Reddit pain found. Revisit in 1–2 weeks. |
| **SKIP** | Saturated, fading, or no real pain signal. Ignore. |

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
- Pass 2: specific product idea the LLM proposes. "Third-place finder for introverts" → how many tools exist for *that*?

Both numbers matter. A keyword with zero competition but an obvious product idea with fourteen existing tools is not a BUILD GREEN — it's a trap.

**4. Reddit pain signal**
The filter that kills the most false positives. A keyword trending on Google but with no complaint threads on Reddit is usually a media cycle (a news story, a viral tweet) not a real problem. Real problems have Reddit threads that look like:

- "Why is it so hard to find X?"
- "Does anyone else struggle with Y?"
- "I've tried everything for Z, nothing works"

No Reddit pain = WATCH at best, regardless of trend score.

---

## The Emotional Barrier Test

Before committing, ask: what's the feeling that stops someone from doing the thing this keyword is about — not the information gap?

**Wrong framing:** "People don't know where hiking clubs are in their city." → Build a directory.

**Right framing:** "People are afraid to walk into a room full of strangers alone." → Build a first-timer cheat sheet that removes that fear.

The same keyword, two completely different products. The second one solves a real blocker. The first one is another link aggregator.

A BUILD GREEN signal is only worth 48 hours if you can answer the emotional barrier question with something that isn't "I'll just show them the information they're missing."

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

## How to Use This in Discovery

1. Attach the morning briefing to the ProjectLoom chat
2. For each BUILD GREEN signal, work through the five criteria above
3. Use branching to explore different product angles for the same signal side by side
4. Commit to one angle only when the emotional barrier is clear and the competitor gap is real
5. Output: a filled `context.md` with Product, Target User, Route Map, and Monetization decided

The discovery session should end with a specific product decision — not "I'm going to build something for people who want to meet new people" but "I'm building a first-meeting conversation card generator for people starting hiking clubs, $9 one-time."
