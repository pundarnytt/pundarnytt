import Image from 'next/image';
import type { Media } from '@/payload-types';
export function EditorialImage({ media, priority = false }: { media?: number | Media | null; priority?: boolean }) {
  if (!media || typeof media !== 'object' || !media.url) return null;
  return <Image className="editorial-image" src={media.sizes?.editorial?.url || media.url} alt={media.alt} width={media.sizes?.editorial?.width || media.width || 1600} height={media.sizes?.editorial?.height || media.height || 1000} unoptimized priority={priority} />;
}
