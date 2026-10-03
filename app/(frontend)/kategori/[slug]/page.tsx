import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticles, getCategory } from '@/lib/cms';
import { ArticleCard } from '@/components/ArticleCard';
import { Pagination } from '@/components/Pagination';
import { pageNumber } from '@/lib/format-date';
export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ sida?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) notFound();
  return { title: category.name, description: category.description || `Senaste artiklarna inom ${category.name}.`, alternates: { canonical: `/kategori/${category.slug}` } };
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getCategory((await params).slug);
  if (!category) notFound();
  const page = pageNumber((await searchParams).sida);
  const result = await getArticles(category.id, page);
  return <><h1 className="section-title">{category.name}</h1>{category.description && <p className="standfirst">{category.description}</p>}
    {result.docs.length ? <div className="story-grid">{result.docs.map(article => <ArticleCard key={article.id} article={article} />)}</div> : <p className="empty">Det finns inga publicerade artiklar här ännu.</p>}
    <Pagination page={page} hasNextPage={result.hasNextPage} base={`/kategori/${category.slug}`} />
  </>;
}
