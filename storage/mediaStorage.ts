import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import type { Plugin } from 'payload';

// Keep provider selection here; collections and readers depend only on Media.
export function mediaStorage(): Plugin {
  const onVercel = process.env.VERCEL === '1';
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // The adapter otherwise silently falls back to disk when its token is absent.
  if (onVercel && !token?.trim()) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required for media storage on Vercel.');
  }

  return vercelBlobStorage({
    enabled: onVercel,
    token: onVercel ? token : undefined,
    collections: { media: true },
    // Keep storage metadata identical in local and deployed database schemas.
    alwaysInsertFields: true,
    clientUploads: true,
  });
}
