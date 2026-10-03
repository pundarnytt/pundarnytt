/** Run against a local development/test database and a running Next server. */
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { getPayload } from 'payload';
import sharp from 'sharp';
import config from '../payload.config';

const base = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const payload = await getPayload({ config });
const marker = `smoke-${Date.now()}`;
const password = randomBytes(24).toString('hex');
const created: { articles: number[]; media: number[]; authors: number[]; categories: number[]; users: number[] } = { articles: [], media: [], authors: [], categories: [], users: [] };
async function request(path: string, init?: RequestInit) {
  return fetch(`${base}${path}`, init);
}
try {
  const user = await payload.create({ collection: 'users', data: { email: `${marker}@example.invalid`, password } });
  created.users.push(user.id);
  const login = await request('/api/users/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email, password }) });
  assert.equal(login.status, 200);
  const { token } = await login.json();
  const headers = { 'Content-Type': 'application/json', Authorization: `JWT ${token}` };
  const author = await payload.create({ collection: 'authors', data: { name: marker, slug: marker } });
  created.authors.push(author.id);
  const category = await payload.create({ collection: 'categories', data: { name: marker, slug: marker } });
  created.categories.push(category.id);
  const image = await sharp({ create: { width: 80, height: 60, channels: 3, background: '#333333' } }).png().toBuffer();
  const form = new FormData();
  form.set('_payload', JSON.stringify({ alt: 'Grå testbild' }));
  form.set('file', new Blob([new Uint8Array(image)], { type: 'image/png' }), `${marker}.png`);
  const upload = await request('/api/media', { method: 'POST', headers: { Authorization: `JWT ${token}` }, body: form });
  assert.equal(upload.status, 201);
  const media = (await upload.json()).doc;
  created.media.push(media.id);
  assert.equal((await request(media.url)).status, 200);
  const data = {
    title: `En kväll i Göteborg ${marker}`, excerpt: 'Test av å, ä och ö.', author: author.id, category: category.id, heroImage: media.id,
    articleType: 'satire', _status: 'draft',
    content: { root: { type: 'root', format: '', indent: 0, version: 1, direction: null, children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: null, children: [{ type: 'text', text: 'Svensk artikeltext.', format: 0, detail: 0, mode: 'normal', style: '', version: 1 }] }] } },
  };
  const draft = await request('/api/articles?draft=true', { method: 'POST', headers, body: JSON.stringify(data) });
  assert.equal(draft.status, 201);
  const article = (await draft.json()).doc;
  created.articles.push(article.id);
  assert.equal(article.slug, `en-kvall-i-goteborg-${marker}`);
  const lookup = `/api/articles?where[slug][equals]=${article.slug}`;
  assert.equal((await (await request(`${lookup}&draft=true`)).json()).totalDocs, 0);
  assert.equal((await request(`/artikel/${article.slug}`)).status, 404);
  assert.equal((await request('/')).status, 200);
  assert.equal((await request('/api/articles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })).status, 403);
  const publish = await request(`/api/articles/${article.id}`, { method: 'PATCH', headers, body: JSON.stringify({ _status: 'published' }) });
  assert.equal(publish.status, 200);
  assert.ok((await publish.json()).doc.publishedAt);
  assert.equal((await (await request(lookup)).json()).totalDocs, 1);
  const home = await (await request('/')).text();
  assert.ok(home.includes(article.slug));
  assert.ok(home.includes('SATIR'));
  const page = await request(`/artikel/${article.slug}`);
  assert.equal(page.status, 200);
  const html = await page.text();
  for (const text of ['Detta är satir', 'Svensk artikeltext.', 'Grå testbild', 'Publicerad', 'canonical']) assert.ok(html.includes(text), text);
  assert.ok((await (await request(`/kategori/${category.slug}`)).text()).includes(article.slug));
  assert.equal((await request(`/kategori/missing-${marker}`)).status, 404);
  const secretDraft = `UNPUBLISHED-${marker}`;
  assert.equal((await request(`/api/articles/${article.id}?draft=true`, { method: 'PATCH', headers, body: JSON.stringify({ title: secretDraft, _status: 'draft' }) })).status, 200);
  const publicVersion = await (await request(lookup)).json();
  assert.equal(publicVersion.docs[0].title, data.title);
  assert.ok(!(await (await request(`/artikel/${article.slug}`)).text()).includes(secretDraft));
  const versions = await request(`/api/articles/versions?where[parent][equals]=${article.id}`);
  assert.equal(versions.status, 403);
  console.log('PASS: login, uploads, Swedish slugs, draft isolation, publishing, homepage, article, category, 404, access control and unpublished revisions.');
} finally {
  for (const collection of ['articles', 'media', 'authors', 'categories', 'users'] as const) {
    for (const id of created[collection]) await payload.delete({ collection, id });
  }
  await payload.destroy();
}
