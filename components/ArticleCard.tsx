import Link from 'next/link';
import type { Article } from '@/payload-types';
import { ArticleType } from './ArticleType';
import { EditorialImage } from './EditorialImage';
import { formatDate } from '@/lib/format-date';
export function ArticleCard({ article, lead = false }: { article: Article; lead?: boolean }) {
  return <article className={lead ? 'story lead' : 'story'}>
    <ArticleType type={article.articleType} />
    <h2><Link href={`/artikel/${article.slug}`}>{article.title}</Link></h2>
    <EditorialImage media={article.heroImage} priority={lead} />
    <p className="excerpt">{article.excerpt}</p>
    <p className="meta">{typeof article.author === 'object' && article.author && <>Av {article.author.name} · </>}{article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>}</p>
  </article>;
}
