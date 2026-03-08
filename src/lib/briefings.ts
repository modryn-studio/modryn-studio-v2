import fs from 'fs';
import path from 'path';

export interface Briefing {
  slug: string;
  date: string;
  title: string;
  description: string;
  content: string;
}

const BRIEFINGS_DIR = path.join(process.cwd(), 'content', 'briefings');

function excerptFromContent(content: string): string {
  const match = content.match(/\*Sources:.+?\*/);
  return match
    ? match[0].replace(/\*/g, '')
    : 'Daily trend briefing from Modryn Studio.';
}

export function getAllBriefings(): Briefing[] {
  if (!fs.existsSync(BRIEFINGS_DIR)) return [];

  const files = fs
    .readdirSync(BRIEFINGS_DIR)
    .filter((f) => f.startsWith('briefing_') && f.endsWith('.md'));

  const briefings = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BRIEFINGS_DIR, filename), 'utf-8');
    const slug = filename.replace(/^briefing_/, '').replace(/\.md$/, '');
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const title = titleMatch?.[1] ?? `Trend Briefing — ${slug}`;

    return {
      slug,
      date: slug,
      title,
      description: excerptFromContent(raw),
      content: raw,
    };
  });

  return briefings.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getBriefingByDate(date: string): Briefing | null {
  const filePath = path.join(BRIEFINGS_DIR, `briefing_${date}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] ?? `Trend Briefing — ${date}`;

  return {
    slug: date,
    date,
    title,
    description: excerptFromContent(raw),
    content: raw,
  };
}
