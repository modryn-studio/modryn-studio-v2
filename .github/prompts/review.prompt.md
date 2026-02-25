---
name: review
description: "Quick read-only scan of the codebase. Reports issues without making any changes."
agent: ask
---
# Quick Review

Do a fast read-only scan of this project. Do NOT make any changes — report only.

Check for:
1. **Security** — hardcoded secrets, missing .env patterns
2. **Code Quality** — console.logs, unused imports, unpinned deps
3. **SEO** — missing metadata exports, missing Open Graph, heading hierarchy
4. **Next.js** — missing error boundaries, raw img/a tags, unnecessary 'use client'
5. **Accessibility** — missing alt text, missing form labels

Output a short checklist:
```
## Quick Review
- Security:      PASS / WARN / FAIL
- Code Quality:  PASS / WARN / FAIL
- SEO:           PASS / WARN / FAIL
- Next.js:       PASS / WARN / FAIL
- Accessibility: PASS / WARN / FAIL

Issues found: [count]
[list each issue with file path and line]
```

Do NOT fix anything. Do NOT edit files. Report only.
