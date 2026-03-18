#!/usr/bin/env node
/**
 * scripts/new-post.mjs
 *
 * Scaffolds a new build log MDX file with frontmatter + authoring hints.
 *
 * Usage:
 *   node scripts/new-post.mjs --slug my-post-title
 *   node scripts/new-post.mjs --slug my-post-title --tag milestone
 *
 * Tags: build | milestone | reflection | ship
 * After writing, generate a cover:
 *   node scripts/gen-cover.mjs --slug my-post-title
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function resolveArg(flag) {
  const args = process.argv.slice(2);
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return null;
}

const slug = resolveArg('--slug');
if (!slug) {
  console.error('Usage: node scripts/new-post.mjs --slug <slug> [--tag <tag>]');
  process.exit(1);
}

const tag = resolveArg('--tag') ?? 'build';
const date = new Date().toISOString().slice(0, 10);
const filename = `${date}-${slug}.mdx`;
const outPath = path.join(ROOT, 'content', 'log', filename);

if (fs.existsSync(outPath)) {
  console.error(`Already exists: ${outPath}`);
  process.exit(1);
}

const template = `---
title: ''
date: '${date}'
tag: '${tag}'
description: ''
seoTitle: ''
---

Write your opening here. One or two sentences. Lead with the most interesting thing.

## Section One

Body copy.

<!-- CALLOUT — use for the one sentence that matters most. Remove comment tags to activate.
<div class="callout">Your key insight here.</div>
-->

## Section Two

Body copy.

<!-- MERMAID — use for timelines, flows, comparisons. Remove comment tags to activate.
\`\`\`mermaid
graph LR
  A[Step One] --> B[Step Two] --> C[Step Three]
\`\`\`
-->

## What's Next

One line on what comes after this post.
`;

fs.writeFileSync(outPath, template, { encoding: 'utf-8' });
console.log(`Created: content/log/${filename}`);
console.log(`Next: fill in the frontmatter, write the post, then run:`);
console.log(`  node scripts/gen-cover.mjs --slug ${date}-${slug}`);
