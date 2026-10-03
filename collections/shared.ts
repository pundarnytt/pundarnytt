import type { Access, Field } from 'payload';
export const authenticated: Access = ({ req }) => Boolean(req.user);
export const editorialAccess = {
  read: () => true,
  create: authenticated, update: authenticated, delete: authenticated,
};
export function slugField(source: string): Field {
  return {
    name: 'slug', type: 'text', required: true, unique: true, index: true,
    admin: { description: 'Skapas automatiskt om fältet lämnas tomt. Kan ändras manuellt.' },
    hooks: { beforeValidate: [({ value, siblingData }) => {
      const input = value || siblingData?.[source];
      return typeof input === 'string' ? input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : value;
    }] },
  };
}
