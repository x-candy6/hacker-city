import { GCSContentClient } from '@stackmatix/cms-core';
import type { Article, Category } from '@stackmatix/cms-core';
import fs from 'fs';
import path from 'path';

// On Vercel: write GOOGLE_CREDENTIALS env var to temp file for GCS SDK
if (process.env.GOOGLE_CREDENTIALS && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const tmpPath = path.join('/tmp', 'gcs-credentials.json');
  fs.writeFileSync(tmpPath, process.env.GOOGLE_CREDENTIALS);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath;
}

/** Singleton GCS content client for reading articles and categories. */
const client = new GCSContentClient({
  bucketName: process.env.GCS_CONTENT_BUCKET ?? 'stackmatix-cdn',
  prefix: process.env.GCS_CONTENT_PREFIX ?? 'ln/subscribers/hacker-city',
  projectId: process.env.GCS_PROJECT_ID,
  cacheTtl: 300,
});

/** Wrapper that catches GCS errors during build (no credentials on Vercel build). */
export const contentClient = {
  getArticles: async (opts?: Parameters<typeof client.getArticles>[0]): Promise<Article[]> => {
    try { return await client.getArticles(opts); } catch { return []; }
  },
  getArticle: async (slug: string): Promise<Article | null> => {
    try { return await client.getArticle(slug); } catch { return null; }
  },
  getArticlesByCategory: async (cat: string, opts?: Parameters<typeof client.getArticlesByCategory>[1]): Promise<Article[]> => {
    try { return await client.getArticlesByCategory(cat, opts); } catch { return []; }
  },
  getArticlesBySubCategory: async (cat: string, sub: string, opts?: Parameters<typeof client.getArticlesBySubCategory>[2]): Promise<Article[]> => {
    try { return await client.getArticlesBySubCategory(cat, sub, opts); } catch { return []; }
  },
  getArticlesByTag: async (tag: string, opts?: Parameters<typeof client.getArticlesByTag>[1]): Promise<Article[]> => {
    try { return await client.getArticlesByTag(tag, opts); } catch { return []; }
  },
  searchArticles: async (q: string, opts?: Parameters<typeof client.searchArticles>[1]): Promise<Article[]> => {
    try { return await client.searchArticles(q, opts); } catch { return []; }
  },
  getCategories: async (): Promise<Category[]> => {
    try { return await client.getCategories(); } catch { return []; }
  },
  getCategory: async (slug: string): Promise<Category | null> => {
    try { return await client.getCategory(slug); } catch { return null; }
  },
  invalidateCache: (slug?: string) => client.invalidateCache(slug),
  clearCache: () => client.clearCache(),
};
