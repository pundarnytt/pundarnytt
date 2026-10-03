import type { CollectionConfig } from 'payload';
import { editorialAccess } from './shared';
export const Media: CollectionConfig = {
  slug: 'media', access: editorialAccess,
  upload: { staticDir: 'media', mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'], imageSizes: [{ name: 'editorial', width: 1600, withoutEnlargement: true }] },
  fields: [{ name: 'alt', label: 'Bildbeskrivning', type: 'text', required: true }],
};
