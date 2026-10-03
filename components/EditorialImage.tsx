import Image from 'next/image';
import type { Media } from '@/payload-types';

export function EditorialImage({ media, priority = false }: { media?: number | Media | null; priority?: boolean }) {
  if (!media || typeof media !== 'object' || !media.url) return null;
  const rendition = media.sizes?.editorial;
  return (
    <figure className="newspaper-image">
      <Image
        className="editorial-image"
        src={rendition?.url || media.url}
        alt={media.alt}
        width={rendition?.width || media.width || 1600}
        height={rendition?.height || media.height || 1000}
        unoptimized
        priority={priority}
      />
      <figcaption>{media.alt}</figcaption>
    </figure>
  );
}
