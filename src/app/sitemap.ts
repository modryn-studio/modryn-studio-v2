import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/log';
import { getAllTools } from '@/lib/tools';
import { getAllBriefings } from '@/lib/briefings';
import { site } from '@/config/site';

const BASE_URL = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tools = getAllTools();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-03-06'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date('2026-03-06'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/log`,
      lastModified: new Date('2026-03-06'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-02-25'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2026-02-25'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-02-25'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const logRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/log/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Only include live tools in the sitemap
  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.status === 'live')
    .map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: new Date(tool.launchedAt ?? '2026-02-25'),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const briefings = getAllBriefings();
  const briefingIndexRoute: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/tools/trend-detector/briefings`,
    lastModified: briefings[0] ? new Date(briefings[0].date) : new Date('2026-03-07'),
    changeFrequency: 'daily',
    priority: 0.8,
  };
  const briefingRoutes: MetadataRoute.Sitemap = briefings.map((b) => ({
    url: `${BASE_URL}/tools/trend-detector/briefings/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, briefingIndexRoute, ...briefingRoutes, ...logRoutes, ...toolRoutes];
}
