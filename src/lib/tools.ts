import fs from "fs";
import path from "path";

export type ToolStatus = "live" | "beta" | "building" | "coming-soon";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  status: ToolStatus;
  url?: string;
  icon?: string;
}

const TOOLS_DIR = path.join(process.cwd(), "content", "tools");

export function getAllTools(): Tool[] {
  if (!fs.existsSync(TOOLS_DIR)) return [];

  const files = fs.readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".json"));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(TOOLS_DIR, filename), "utf-8");
    const data = JSON.parse(raw) as Omit<Tool, "slug">;

    return {
      slug: filename.replace(/\.json$/, ""),
      ...data,
    };
  });
}

export function getToolBySlug(slug: string): Tool | null {
  const filePath = path.join(TOOLS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as Omit<Tool, "slug">;

  return { slug, ...data };
}
