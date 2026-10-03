import type { CollectionConfig } from 'payload';
import { editorialAccess, slugField } from './shared';
export const Tags: CollectionConfig = {
  slug: 'tags', admin: { useAsTitle: 'name' }, access: editorialAccess,
  fields: [{ name: 'name', type: 'text', required: true }, slugField('name')],
};
