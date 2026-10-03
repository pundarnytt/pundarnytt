import Link from 'next/link';
export function Pagination({ page, hasNextPage, base }: { page: number; hasNextPage: boolean; base: string }) {
  if (page === 1 && !hasNextPage) return null;
  return <nav className="pagination" aria-label="Sidindelning">
    {page > 1 && <Link href={page === 2 ? base : `${base}?sida=${page - 1}`}>← Nyare artiklar</Link>}
    <span>Sida {page}</span>
    {hasNextPage && <Link href={`${base}?sida=${page + 1}`}>Äldre artiklar →</Link>}
  </nav>;
}
