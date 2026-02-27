import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type LogTag = 'launch' | 'build' | 'killed' | 'milestone' | 'learning' | 'meta' | 'philosophy';

export interface LogPost {
  slug: string;
  title: string;
  date: string;
  tag: LogTag;
  content: string;
}

const LOG_DIR = path.join(process.cwd(), 'content', 'log');

export function getAllPosts(): LogPost[] {
  if (!fs.existsSync(LOG_DIR)) return [];

  const files = fs.readdirSync(LOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(LOG_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug: filename.replace(/\.mdx$/, ''),
      title: data.title ?? filename,
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : (data.date ?? ''),
      tag: data.tag ?? 'build',
      content,
    } as LogPost;
  });

  // Newest first
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): LogPost | null {
  const filePath = path.join(LOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : (data.date ?? ''),
    tag: data.tag ?? 'build',
    content,
  };
}

export function getRecentPosts(count: number = 3): LogPost[] {
  return getAllPosts().slice(0, count);
}
