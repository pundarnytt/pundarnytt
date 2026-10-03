import type { Metadata } from 'next';
import { getArticles } from '@/lib/cms';
import { ArticleCard } from '@/components/ArticleCard';
import { Pagination } from '@/components/Pagination';
import { pageNumber } from '@/lib/format-date';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default async function Home({ searchParams }: { searchParams: Promise<{ sida?: string }> }) {
  const page = pageNumber((await searchParams).sida);
  const result = await getArticles(undefined, page);
  const [lead, ...rest] = result.docs;
  return <>
    <h1 className="section-title">Senaste nytt</h1>
    {lead ? <><ArticleCard article={lead} lead /><section className="story-grid" aria-label="Fler artiklar">{rest.map(article => <ArticleCard key={article.id} article={article} />)}</section></> : <div className="empty"><h2>{page > 1 ? 'Inga fler artiklar' : 'Första numret är på väg'}</h2><p>{page > 1 ? 'Gå tillbaka för att läsa tidigare publicerade artiklar.' : 'Här publicerar vi snart våra första artiklar. Välkommen tillbaka.'}</p></div>}
    <Pagination page={page} hasNextPage={result.hasNextPage} base="/" />
  </>;
}
