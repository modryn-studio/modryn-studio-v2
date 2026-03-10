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
  /** Public URL to a light-mode screenshot or preview image */
  screenshotUrl?: string;
  /** Public URL to a dark-mode screenshot (falls back to screenshotUrl if absent) */
  screenshotUrlDark?: string;
  /** ISO date string (YYYY-MM-DD) — when the tool shipped */
  launchedAt?: string;
  /** Slug of the /log post that documented this build */
  logSlug?: string;
  /** Short tagline (~30 chars) used to enrich the SEO title tag */
  tagline?: string;
  /** Optional feature bullets shown on the tool detail page */
  bullets?: string[];
  /** Subreddits where the target user's pain lives — used by /social for distribution */
  subreddits?: string[];
  /** Public URL to the tool's logomark (square, transparent bg, ideally /icon.png from the tool's deployment) */
  logoUrl?: string;
  /** Path to the briefings index for this tool, if it has one */
  briefingsPath?: string;
  /** Audio example clips showcased on the tool detail page */
  examples?: ToolAudioExample[];
}

export interface ToolAudioExample {
  /** Display name shown on the card, e.g. "Monica" */
  name: string;
  /** Short song subtitle shown under the name, e.g. "Big 1-2" */
  subtitle: string;
  /** Genre tag shown as a badge, e.g. "pop" */
  genre: string;
  /** URL to the audio file — relative path from public/, e.g. "/audio/examples/foo.mp3" */
  audioUrl: string;
  /** URL to the cover/background image shown on the card */
  coverUrl?: string;
  /** One-line context shown on the card: audience + occasion + memorable detail */
  context?: string;
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
