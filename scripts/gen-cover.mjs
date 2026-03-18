#!/usr/bin/env node
/**
 * scripts/gen-cover.mjs
 *
 * Generates a 16:9 cover image for a log post using Nano Banana 2
 * (Gemini 3.1 Flash Image, gemini-3.1-flash-image-preview).
 *
 * Usage:
 *   node scripts/gen-cover.mjs --slug 2026-03-18-the-era-thesis
 *   node scripts/gen-cover.mjs 2026-03-18-the-era-thesis
 *
 * Requires:
 *   GEMINI_API_KEY set in .env.local or as an env var
 *   npm install @google/generative-ai gray-matter
 *
 * Output:
 *   public/log/covers/<slug>.jpg
 *   Patches `cover: /log/covers/<slug>.jpg` into the MDX frontmatter
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// --- resolve API key (env var or .env.local) ---
function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = path.join(ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('GEMINI_API_KEY=')) {
        return trimmed.slice('GEMINI_API_KEY='.length).trim();
      }
    }
  }
  return null;
}

// --- resolve slug from args ---
function resolveSlug() {
  const args = process.argv.slice(2);
  const flagIdx = args.indexOf('--slug');
  if (flagIdx !== -1 && args[flagIdx + 1]) return args[flagIdx + 1];
  const positional = args.find((a) => !a.startsWith('-'));
  return positional ?? null;
}

// --- build concept-aware prompt from post content ---
function buildPrompt(title, description, body) {
  // Strip markdown syntax to extract plain-text concept
  const plainBody = body
    .replace(/^#+\s+.+$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*>]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600);

  const concept = plainBody || description || title;

  return (
    'Create a dark, moody abstract cover image for a developer build log post. ' +
    'Visual style: near-black background (#050505), amber and burnt orange accents (#F97415 range). ' +
    'The composition is minimal and abstract — no text, no people, no logos, no photography. ' +
    'Use shapes, light, and structure that visually represent the CONCEPT of the post, not a literal illustration. ' +
    'Make the image feel specific to this post — a reader should be able to glance at it and sense the topic. ' +
    `Post concept: "${concept}". ` +
    'Output in 16:9 landscape aspect ratio.'
  );
}

async function main() {
  const slug = resolveSlug();
  if (!slug) {
    console.error('Usage: node scripts/gen-cover.mjs --slug <slug>');
    process.exit(1);
  }

  const apiKey = loadApiKey();
  if (!apiKey) {
    console.error('GEMINI_API_KEY not found. Set it in .env.local or as an environment variable.');
    process.exit(1);
  }

  const mdxPath = path.join(ROOT, 'content', 'log', `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    console.error(`Post not found: ${mdxPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(mdxPath, 'utf-8');
  const { data: frontmatter, content: body } = matter(raw);
  const { title = slug, description = '' } = frontmatter;

  console.log(`Generating cover for: ${title}`);
  const prompt = buildPrompt(title, description, body);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-image-preview' });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '16:9', imageSize: '1K' },
    },
  });

  const candidate = result.response.candidates?.[0];
  if (!candidate) {
    console.error('No candidates returned from API.');
    process.exit(1);
  }

  let imageData = null;
  for (const part of candidate.content.parts) {
    if (part.inlineData?.mimeType?.startsWith('image/')) {
      imageData = part.inlineData;
      break;
    }
  }

  if (!imageData) {
    console.error('No image returned in response.');
    process.exit(1);
  }

  const outDir = path.join(ROOT, 'public', 'log', 'covers');
  fs.mkdirSync(outDir, { recursive: true });

  const ext = imageData.mimeType.includes('png') ? 'png' : 'jpg';
  const outFile = path.join(outDir, `${slug}.${ext}`);
  fs.writeFileSync(outFile, Buffer.from(imageData.data, 'base64'));
  console.log(`Saved: ${outFile}`);

  // Patch cover into MDX frontmatter
  const coverPath = `/log/covers/${slug}.${ext}`;
  // Normalize CRLF → LF so the regex works on Windows-authored files
  const normalized = raw.replace(/\r\n/g, '\n');
  const patched = normalized.replace(/^(---\n[\s\S]*?)(\n---)/m, (_, head, tail) => {
    if (/^cover:/m.test(head)) {
      // Update existing cover line
      return head.replace(/^cover:.+$/m, `cover: ${coverPath}`) + tail;
    }
    // Insert before closing ---
    return head + `\ncover: ${coverPath}` + tail;
  });

  if (patched === normalized) {
    console.warn('Warning: frontmatter patch did not match — cover not inserted.');
  } else {
    // Write without BOM
    fs.writeFileSync(mdxPath, patched, { encoding: 'utf-8' });
    console.log(`Patched frontmatter: cover: ${coverPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
