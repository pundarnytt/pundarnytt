import type { Metadata } from 'next';
import { getArticles } from '@/lib/cms';
import { selectHomepageArticles } from '@/lib/homepage';
import { ArticleCard } from '@/components/ArticleCard';
import { Pagination } from '@/components/Pagination';
import { pageNumber } from '@/lib/format-date';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default async function Home({ searchParams }: { searchParams: Promise<{ sida?: string }> }) {
  const page = pageNumber((await searchParams).sida);
  const result = await getArticles(undefined, page);
  const { lead, secondary, latest } = selectHomepageArticles(result.docs);

  return (
    <>
      <div className="section-heading frontpage-heading">
        <h1>{page === 1 ? 'Förstasidan' : 'Tidigare publicerat'}</h1>
        <span>Journalistik & andra berättelser</span>
      </div>
      {lead ? (
        <>
          <div className={`frontpage-grid${secondary.length ? '' : ' single-story'}`}>
            <ArticleCard article={lead} variant="lead" />
            {secondary.length > 0 && (
              <section className="editorial-rail" aria-label="Fler artiklar">
                {secondary.map(article => <ArticleCard key={article.id} article={article} variant="secondary" />)}
              </section>
            )}
          </div>
          {latest.length > 0 && (
            <section className="latest-news" aria-labelledby="latest-heading">
              <div className="section-heading"><h2 id="latest-heading">Senaste nytt & fler berättelser</h2><span>Ur publiceringen</span></div>
              <div className="story-grid">
                {latest.map(article => <ArticleCard key={article.id} article={article} headingLevel={3} />)}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="empty">
          <span className="empty-mark" aria-hidden="true">P.</span>
          <h2>{page > 1 ? 'Inga fler artiklar' : 'Första numret är på väg'}</h2>
          <p>{page > 1 ? 'Gå tillbaka för att läsa tidigare publicerade artiklar.' : 'Här publicerar vi snart våra första artiklar. Välkommen tillbaka.'}</p>
        </div>
      )}
      <Pagination page={page} hasNextPage={result.hasNextPage} base="/" />
    </>
  );
}
