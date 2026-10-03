import 'server-only';
import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
export const getCMS = () => getPayload({ config });
// Local API bypasses access by default. All public reads explicitly enforce it.
export const getArticle = cache(async (slug: string) => {
  const cms = await getCMS();
  const result = await cms.find({ collection: 'articles', overrideAccess: false, draft: false, depth: 1, limit: 1, where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] } });
  return result.docs[0] || null;
});
export const getCategory = cache(async (slug: string) => {
  const cms = await getCMS();
  const result = await cms.find({ collection: 'categories', overrideAccess: false, limit: 1, where: { slug: { equals: slug } } });
  return result.docs[0] || null;
});
export async function getArticles(category?: number, page = 1) {
  const cms = await getCMS();
  return cms.find({ collection: 'articles', overrideAccess: false, draft: false, depth: 1, limit: 13, page, sort: ['-publishedAt', '-id'], where: { and: [{ _status: { equals: 'published' } }, ...(category ? [{ category: { equals: category } }] : [])] } });
}

export const getCategories = cache(async () => {
  const cms = await getCMS();
  const result = await cms.find({ collection: 'categories', overrideAccess: false, depth: 0, pagination: false, sort: 'name' });
  return result.docs;
});
