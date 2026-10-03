import type { Article } from '@/payload-types';

// Input is already publication-ordered and access-filtered by getArticles.
export function selectHomepageArticles(articles: Article[]) {
  const lead = articles.find(article =>
    typeof article.heroImage === 'object' && article.heroImage?.url,
  ) || articles[0];
  const remaining = articles.filter(article => article.id !== lead?.id);
  return { lead, secondary: remaining.slice(0, 4), latest: remaining.slice(4) };
}

function plainText(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  if ('text' in node && typeof node.text === 'string') return node.text;
  if ('children' in node && Array.isArray(node.children)) return node.children.map(plainText).join('');
  return '';
}

// A short, real excerpt of the lead's opening paragraphs, never invented filler.
export function openingParagraphs(article: Article): string[] {
  return article.content.root.children
    .filter(node => node.type === 'paragraph')
    .map(plainText)
    .filter(text => text.trim() && text.trim() !== article.excerpt.trim())
    .slice(0, 2)
    .map(text => text.length > 420 ? `${text.slice(0, 420).replace(/\s+\S*$/, '')}…` : text);
}
