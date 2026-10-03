import { articleTypes } from '@/lib/article-types';
import type { Article } from '@/payload-types';
export function ArticleType({ type, explain = false }: { type: Article['articleType']; explain?: boolean }) {
  const invented = type === 'satire' || type === 'fiction';
  return <div className={invented ? 'article-type invented' : 'article-type'}>
    <span>{articleTypes[type]}</span>
    {explain && invented && <p>{type === 'satire' ? 'Detta är satir. Texten kan innehålla påhittade händelser och personer.' : 'Detta är en fiktiv berättelse, inte faktabaserad nyhetsrapportering.'}</p>}
  </div>;
}
