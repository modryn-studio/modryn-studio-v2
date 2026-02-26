import fs from 'fs';
import path from 'path';

export type ToolStatus = 'live' | 'beta' | 'building' | 'coming-soon';

const VALID_STATUSES: ToolStatus[] = ['live', 'beta', 'building', 'coming-soon'];

export interface Tool {
  slug: string;
  name: string;
  description: string;
  status: ToolStatus;
  url?: string;
  icon?: string;
}

const TOOLS_DIR = path.join(process.cwd(), 'content', 'tools');

export function getAllTools(): Tool[] {
  if (!fs.existsSync(TOOLS_DIR)) return [];

  const files = fs.readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.json'));

  const tools: Tool[] = [];

  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(TOOLS_DIR, filename), 'utf-8');
      const data = JSON.parse(raw) as Omit<Tool, 'slug'>;

      // Validate required fields
      if (!data.name || !data.description) continue;
      if (!VALID_STATUSES.includes(data.status)) continue;

      tools.push({ slug: filename.replace(/\.json$/, ''), ...data });
    } catch {
      // Skip malformed JSON files silently
      continue;
    }
  }

  return tools;
}

export function getToolBySlug(slug: string): Tool | null {
  const filePath = path.join(TOOLS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw) as Omit<Tool, 'slug'>;

    if (!data.name || !data.description) return null;
    if (!VALID_STATUSES.includes(data.status)) return null;

    return { slug, ...data };
  } catch {
    return null;
  }
}
