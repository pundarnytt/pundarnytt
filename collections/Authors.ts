import type { CollectionConfig } from 'payload';
import { editorialAccess, slugField } from './shared';
export const Authors: CollectionConfig = {
  slug: 'authors', admin: { useAsTitle: 'name' }, access: editorialAccess,
  fields: [{ name: 'name', type: 'text', required: true }, slugField('name'), { name: 'bio', type: 'textarea' }, { name: 'image', type: 'upload', relationTo: 'media' }],
};
