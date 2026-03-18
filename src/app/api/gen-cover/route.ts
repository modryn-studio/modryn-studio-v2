import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import matter from 'gray-matter';
import { createRouteLogger } from '@/lib/route-logger';

const log = createRouteLogger('gen-cover');

// Dev-only endpoint — returns 404 in production
export async function POST(req: Request): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const ctx = log.begin();

  try {
    const { slug } = (await req.json()) as { slug?: string };
    if (!slug) {
      return log.end(ctx, NextResponse.json({ error: 'slug is required' }, { status: 400 }));
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return log.end(ctx, NextResponse.json({ error: 'GEMINI_API_KEY not set' }, { status: 500 }));
    }

    const mdxPath = path.join(process.cwd(), 'content', 'log', `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      return log.end(ctx, NextResponse.json({ error: 'Post not found' }, { status: 404 }));
    }

    const raw = fs.readFileSync(mdxPath, 'utf-8');
    const { data: frontmatter } = matter(raw);
    const fm = frontmatter as { title?: string; description?: string };
    const title = fm.title ?? slug;
    const description = fm.description ?? '';

    log.info(ctx.reqId, 'Generating cover', { slug, title });

    // Strip markdown to plain text for concept extraction
    const plainBody = raw
      .replace(/^---[\s\S]*?---/, '') // remove frontmatter
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
    const prompt =
      'Create a dark, moody abstract cover image for a developer build log post. ' +
      'Visual style: near-black background (#050505), amber and burnt orange accents (#F97415 range). ' +
      'The composition is minimal and abstract — no text, no people, no logos, no photography. ' +
      'Use shapes, light, and structure that visually represent the CONCEPT of the post, not a literal illustration. ' +
      'Make the image feel specific to this post — a reader should be able to glance at it and sense the topic. ' +
      `Post concept: "${concept}". ` +
      'Output in 16:9 landscape aspect ratio.';

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-image-preview' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '16:9', imageSize: '1K' },
      } as Record<string, unknown>,
    });

    const candidate = result.response.candidates?.[0];
    let imageData: { mimeType: string; data: string } | null = null;
    for (const part of candidate?.content?.parts ?? []) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        imageData = part.inlineData as { mimeType: string; data: string };
        break;
      }
    }

    if (!imageData) {
      return log.end(
        ctx,
        NextResponse.json({ error: 'No image returned from API' }, { status: 502 })
      );
    }

    const ext = imageData.mimeType.includes('png') ? 'png' : 'jpg';
    const outDir = path.join(process.cwd(), 'public', 'log', 'covers');
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, `${slug}.${ext}`);
    fs.writeFileSync(outFile, Buffer.from(imageData.data, 'base64'));

    const coverPath = `/log/covers/${slug}.${ext}`;

    // Patch cover into MDX frontmatter (normalize CRLF first)
    const normalized = raw.replace(/\r\n/g, '\n');
    const patched = normalized.replace(/^(---\n[\s\S]*?)(\n---)/m, (_, head, tail) => {
      if (/^cover:/m.test(head)) {
        return head.replace(/^cover:.+$/m, `cover: ${coverPath}`) + tail;
      }
      return head + `\ncover: ${coverPath}` + tail;
    });

    if (patched !== normalized) {
      fs.writeFileSync(mdxPath, patched, { encoding: 'utf-8' });
    }

    return log.end(ctx, NextResponse.json({ cover: coverPath }), { slug, coverPath });
  } catch (error) {
    log.err(ctx, error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
