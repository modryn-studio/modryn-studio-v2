---
name: log
description: Drafts a build log post for modrynstudio.com. Run after shipping something notable — in this repo or any other.
agent: agent
---

First, ask Luke one question:

> "What are you logging? This repo (modryn-studio-v2) or a different project?"

---

## Case A — This repo (modryn-studio-v2)

Run `git log --oneline -20` in the terminal to get the last 20 commits.

Read one existing file from `content/log/` to understand the MDX frontmatter format and writing style.

Draft a new MDX file in `content/log/`:

- Filename: `YYYY-MM-DD-[slug].mdx` — use today's date, slug derived from the topic
- Frontmatter:
  ```
  ---
  title: ""
  date: "YYYY-MM-DD"
  tag: ""
  description: ""
  ---
  ```

  - `tag` — the project slug, used for filtering on /log and in OG image cards. Use one of:
    - `modryn-studio` — posts about modrynstudio.com itself
    - `meta` — process, workflow, how-I-work posts (not project-specific)
    - the tool or project slug (e.g. `specifythat`, `trend-detector`) — for anything else
      Ask Luke which tag to use if it isn't obvious from context.
  - `description` — one sentence (under 160 chars). Used in `<meta description>` and social card preview text. Write it as a plain-English summary of what this post covers, not a headline.
- Post body:

  **What shipped** — bullet list of the 3–5 most significant things, written as human outcomes. Not "feat: add X" but "X is now live".

  **Why** — 1–2 sentences on the decision or problem it solves. Luke's voice: short, direct, honest.

  **What's next** — 1 sentence. One thing. Not a roadmap.

  Leave a `<!-- TODO: fill in narrative -->` comment after each section.

- Length: 150–300 words. Luke will expand.
- Tone: building in public, honest, never hype.

Write the file locally. **Do not commit. Do not push.** Luke edits first, then pushes manually.

After writing, print the relative path so Luke can open it immediately.

---

## Case B — A different project repo

Run `git log --oneline -20` in the terminal to get the last 20 commits from the current repo.

Ask Luke: "Anything in that list I should skip, or any context I should know before drafting?"

Then draft the MDX post using the same structure as Case A — but **do not write it locally**. This workspace is not modryn-studio-v2.

Instead:

1. Use the GitHub MCP to fetch one existing file from `modryn-studio/modryn-studio-v2` at `content/log/` to confirm the frontmatter format.
2. Create a new branch in `modryn-studio/modryn-studio-v2` named `log/YYYY-MM-DD-[slug]`.
3. Push the draft MDX file to that branch at `content/log/YYYY-MM-DD-[slug].mdx`.
4. Open a pull request from that branch to `main` with:
   - Title: the post title
   - Body: "Draft log post — fill in narrative before merging."

The PR is the gate. Luke fills in the `<!-- TODO -->` sections in GitHub or by pulling modryn-studio-v2 locally, then merges when ready. Merging = publishing.
