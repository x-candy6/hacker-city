import { GCSContentClient } from '@stackmatix/cms-core';

/** Singleton GCS content client for reading articles and categories. */
export const contentClient = new GCSContentClient({
  bucketName: process.env.GCS_CONTENT_BUCKET ?? 'stackmatix-cdn',
  prefix: process.env.GCS_CONTENT_PREFIX ?? 'ln/subscribers/hacker-city',
  projectId: process.env.GCS_PROJECT_ID,
  cacheTtl: 300,
});
