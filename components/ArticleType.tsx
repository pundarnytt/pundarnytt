import { articleTypes } from '@/lib/article-types';
import type { Article } from '@/payload-types';

export function ArticleType({ type, explain = false }: { type: Article['articleType']; explain?: boolean }) {
  const invented = type === 'satire' || type === 'fiction';
  return (
    <div className={`article-type${invented ? ` invented type-${type}` : ''}`}>
      <span className="type-stamp">{invented ? `[ ${articleTypes[type]} ]` : articleTypes[type]}</span>
      {invented && (
        <span className="type-disclosure">
          {type === 'satire' ? 'Fiktiv text för underhållningsändamål' : 'Påhittad berättelse · inte nyhetsrapportering'}
        </span>
      )}
      {explain && invented && (
        <p className="type-explanation">
          {type === 'satire'
            ? 'Detta är satir. Texten kan innehålla påhittade händelser och personer.'
            : 'Detta är en fiktiv berättelse, inte faktabaserad nyhetsrapportering.'}
        </p>
      )}
    </div>
  );
}
