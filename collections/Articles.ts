import type { CollectionConfig } from 'payload';
import { authenticated, slugField } from './shared';
import { articleTypes } from '../lib/article-types';
export const Articles: CollectionConfig = {
  slug: 'articles', admin: { useAsTitle: 'title', defaultColumns: ['title', 'articleType', '_status', 'publishedAt'] },
  access: {
    read: ({ req }) => req.user ? true : { _status: { equals: 'published' } },
    create: authenticated, update: authenticated, delete: authenticated,
    readVersions: authenticated,
  },
  versions: { drafts: true, maxPerDoc: 30 },
  hooks: { beforeChange: [({ data, originalDoc }) => {
    if (data._status === 'published' && !data.publishedAt) data.publishedAt = originalDoc?.publishedAt || new Date().toISOString();
    return data;
  }] },
  fields: [
    { name: 'title', label: 'Rubrik', type: 'text', required: true },
    slugField('title'),
    { name: 'excerpt', label: 'Ingress', type: 'textarea', required: true },
    { name: 'content', label: 'Artikeltext', type: 'richText', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'articleType', type: 'select', required: true, defaultValue: 'news', options: Object.entries(articleTypes).map(([value, label]) => ({ value, label })) },
    { name: 'publishedAt', label: 'Publiceringsdatum', type: 'date', admin: { description: 'Sätts vid första publicering. Detta fält schemalägger inte publicering.' } },
  ],
};
