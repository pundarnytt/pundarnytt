import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getArticle } from '@/lib/cms';
import { formatDate } from '@/lib/format-date';
import { ArticleType } from '@/components/ArticleType';
import { EditorialImage } from '@/components/EditorialImage';
export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const image = typeof article.heroImage === 'object' ? article.heroImage : null;
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/artikel/${article.slug}` }, openGraph: { type: 'article', title: article.title, description: article.excerpt, publishedTime: article.publishedAt || undefined, ...(image?.url ? { images: [{ url: image.url, alt: image.alt }] } : {}) } };
}
export default async function ArticlePage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const author = typeof article.author === 'object' ? article.author : null;
  const category = typeof article.category === 'object' ? article.category : null;
  return <article className="article-page">
    <header><ArticleType type={article.articleType} explain /><h1>{article.title}</h1><p className="standfirst">{article.excerpt}</p>
    <p className="meta">{author && <span>Av {author.name}</span>}{article.publishedAt && <time dateTime={article.publishedAt}>Publicerad {formatDate(article.publishedAt)}</time>}</p></header>
    <EditorialImage media={article.heroImage} priority />
    <div className="article-body"><RichText data={article.content} /></div>
    <aside className="article-details" aria-label="Artikelinformation">
      {category && <p>Kategori: <Link href={`/kategori/${category.slug}`}>{category.name}</Link></p>}
      {!!article.tags?.length && <p>Ämnen: {article.tags.filter(tag => typeof tag === 'object').map(tag => tag.name).join(', ')}</p>}
    </aside>
  </article>;
}
