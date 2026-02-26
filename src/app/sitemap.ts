import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/log";
import { getAllTools } from "@/lib/tools";

const BASE_URL = "https://modrynstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tools = getAllTools();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/log`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const logRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/log/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Only include live tools in the sitemap
  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.status === "live")
    .map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...logRoutes, ...toolRoutes];
}
