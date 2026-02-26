---
name: log
description: Drafts a build log post from recent git activity. Run after shipping something notable.
agent: agent
---

Run `git log --oneline -20` in the terminal to see the last 20 commits.

Read one existing file from `content/log/` to understand the MDX frontmatter format and writing style.

Then create a new MDX file in `content/log/` with:
- Filename: `YYYY-MM-DD-[slug].mdx` — use today's date, slug derived from the topic
- Frontmatter:
  ```
  ---
  title: ""
  date: "YYYY-MM-DD"
  summary: ""
  ---
  ```
- Post body structured as:

  **What shipped** — bullet list of the 3–5 most significant commits, written as human outcomes not git messages. Not "feat: add X" but "X is now live".

  **Why** — 1–2 sentences on the decision or problem it solves. Use Luke's voice: short, direct, honest.

  **What's next** — 1 sentence. One thing. Not a roadmap.

  Leave a `<!-- TODO: fill in narrative -->` comment after each section so Luke knows what to expand.

- Length target: 150–300 words in the draft. Luke will expand.
- Tone: building in public, honest about what doesn't exist yet, confident about what does. Never hype.

After creating the file, print the relative path so Luke can open it immediately.

Do not commit. Do not push. Luke writes first.
