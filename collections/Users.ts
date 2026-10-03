import type { CollectionConfig } from 'payload';
import { authenticated } from './shared';
export const Users: CollectionConfig = {
  slug: 'users', auth: true, admin: { useAsTitle: 'email' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  fields: [],
};
