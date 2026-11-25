import { BRAND_NAME } from '@/lib/constants';
import { Product } from '@/types';

/**
 * Interleaves active products across the 3 primary Maison pillars (Clothings, Perfume, Watches)
 * so mixed "All Creations" galleries surface a balanced luxury variety.
 */
export function interleaveByCategory(items: Product[]): Product[] {
  const buckets: Record<'clothings' | 'perfume' | 'watches' | 'other', Product[]> = {
    clothings: [],
    perfume: [],
    watches: [],
    other: [],
  };

  items.forEach((p) => {
    if (p.categoryId === 'clothings') buckets.clothings.push(p);
    else if (p.categoryId === 'perfume') buckets.perfume.push(p);
    else if (p.categoryId === 'watches') buckets.watches.push(p);
    else buckets.other.push(p);
  });

  const mixed: Product[] = [];
  const maxLen = Math.max(
    buckets.clothings.length,
    buckets.perfume.length,
    buckets.watches.length,
    buckets.other.length
  );

  for (let i = 0; i < maxLen; i++) {
    if (buckets.clothings[i]) mixed.push(buckets.clothings[i]);
    if (buckets.perfume[i]) mixed.push(buckets.perfume[i]);
    if (buckets.watches[i]) mixed.push(buckets.watches[i]);
    if (buckets.other[i]) mixed.push(buckets.other[i]);
  }
  return mixed;
}

/**
 * Maps internal category IDs to editorial Maison department labels.
 */
export function getCategoryLabel(categoryId: string): string {
  if (categoryId === 'watches') return 'Haute Horlogerie';
  if (categoryId === 'perfume') return 'Haute Parfumerie';
  if (categoryId === 'clothings') return 'Haute Couture';
  return BRAND_NAME;
}
