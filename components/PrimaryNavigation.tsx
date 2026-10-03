'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/payload-types';

type NavCategory = Pick<Category, 'id' | 'name' | 'slug'>;

export function PrimaryNavigation({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname();
  return (
    <nav className="primary-navigation" aria-label="Huvudnavigation">
      <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>Förstasidan</Link>
      {categories.map(category => {
        const href = `/kategori/${category.slug}`;
        return (
          <Link key={category.id} href={href} aria-current={pathname === href ? 'page' : undefined}>
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
