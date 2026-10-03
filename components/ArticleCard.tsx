import Link from 'next/link';
import type { Article } from '@/payload-types';
import { openingParagraphs } from '@/lib/homepage';
import { ArticleType } from './ArticleType';
import { ArticleMeta } from './ArticleMeta';
import { EditorialImage } from './EditorialImage';

type Props = { article: Article; variant?: 'lead' | 'secondary' | 'latest'; headingLevel?: 2 | 3 };

export function ArticleCard({ article, variant = 'latest', headingLevel = 2 }: Props) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const category = typeof article.category === 'object' ? article.category : null;
  const invented = article.articleType === 'satire' || article.articleType === 'fiction';
  const preview = variant === 'lead' ? openingParagraphs(article) : [];
  const href = `/artikel/${article.slug}`;

  return (
    <article className={`story story-${variant}${invented ? ` story-${article.articleType}` : ''}`}>
      <div className="story-kicker">
        <ArticleType type={article.articleType} />
        {category && <Link className="category-link" href={`/kategori/${category.slug}`}>{category.name}</Link>}
      </div>
      <Heading className="story-headline"><Link href={href}>{article.title}</Link></Heading>
      <p className="excerpt">{article.excerpt}</p>
      <ArticleMeta article={article} />
      <EditorialImage media={article.heroImage} priority={variant === 'lead'} />
      {preview.length > 0 && (
        <div className="lead-preview">{preview.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      )}
      {variant === 'lead' && <Link className="read-story" href={href}>Läs hela artikeln <span aria-hidden="true">→</span></Link>}
    </article>
  );
}
