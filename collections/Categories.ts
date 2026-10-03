import type { CollectionConfig } from 'payload';
import { editorialAccess, slugField } from './shared';
export const Categories: CollectionConfig = {
  slug: 'categories', admin: { useAsTitle: 'name' }, access: editorialAccess,
  fields: [{ name: 'name', type: 'text', required: true }, slugField('name'), { name: 'description', type: 'textarea' }],
};
