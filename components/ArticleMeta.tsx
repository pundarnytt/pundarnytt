import type { Article } from '@/payload-types';
import { formatDate } from '@/lib/format-date';

export function ArticleMeta({ article }: { article: Article }) {
  const author = typeof article.author === 'object' ? article.author : null;
  return (
    <div className="article-meta">
      {author && <span className="byline">Av {author.name}</span>}
      {article.publishedAt && (
        <time dateTime={article.publishedAt}>Publicerad {formatDate(article.publishedAt)}</time>
      )}
    </div>
  );
}
