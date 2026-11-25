'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export interface SubcategoryTab {
  id: string | null;
  label: string;
}

interface CategoryCollectionFeedProps {
  categoryId: 'clothings' | 'perfume' | 'watches';
  departmentLabel: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionAccent: string;
  subcategories: SubcategoryTab[];
  emptyTitle: string;
  emptyDescription: string;
  emptyActionHref?: string;
  emptyActionLabel?: string;
}

function CategoryCollectionFeedInner({
  categoryId,
  departmentLabel,
  sectionEyebrow,
  sectionTitle,
  sectionAccent,
  subcategories,
  emptyTitle,
  emptyDescription,
  emptyActionHref,
  emptyActionLabel,
}: CategoryCollectionFeedProps) {
  const searchParams = useSearchParams();
  const urlSub = searchParams.get('sub');
  const [selectedSub, setSelectedSub] = useState<string | null>(urlSub || null);
  const [mounted, setMounted] = useState(false);

  const products = useProductStore((s) => s.products);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
    setSelectedSub(urlSub || null);
  }, [urlSub]);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.isActive && p.categoryId === categoryId),
    [products, categoryId]
  );

  const displayedProducts = useMemo(() => {
    if (!selectedSub) return categoryProducts;
    return categoryProducts.filter((p) => p.subcategoryId === selectedSub);
  }, [categoryProducts, selectedSub]);

  return (
    <section
      className={cn(
        "py-12 sm:py-18 border-b transition-colors",
        isLight ? "bg-[#F9F8F6] border-stone-200" : "bg-[#070A0F] border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-9">
        
        {/* Header & Item Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
                {sectionEyebrow}
              </span>
            </div>
            <h2
              className={cn(
                "text-2xl sm:text-4xl font-serif font-light tracking-tight",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              {sectionTitle}{' '}
              <span className={cn("italic", isLight ? "text-amber-700" : "text-amber-300")}>
                {sectionAccent}
              </span>{' '}
              <span className="text-base sm:text-xl font-mono text-gray-400">
                ({displayedProducts.length})
              </span>
            </h2>
          </div>

          <Link
            href="/store"
            className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 pb-1 border-b border-amber-400/30 self-start sm:self-auto"
          >
            <span>View All Creations</span>
            <span>→</span>
          </Link>
        </div>

        {/* Subcategory Horizontal Scroll / Wrap Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {subcategories.map((sub) => {
            const isActive = selectedSub === sub.id;
            return (
              <button
                key={sub.label}
                type="button"
                onClick={() => setSelectedSub(sub.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-serif transition-all cursor-pointer whitespace-nowrap shrink-0",
                  isActive
                    ? "bg-amber-400 text-black font-bold shadow"
                    : isLight
                    ? "bg-white border border-stone-200 text-slate-700 hover:border-amber-500"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white hover:border-amber-400/40"
                )}
              >
                {sub.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 2-Col Mobile Editorial Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={departmentLabel}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "py-14 sm:py-20 text-center border border-dashed rounded-2xl p-6 sm:p-12 space-y-4 transition-colors",
              isLight ? "bg-white border-stone-300" : "bg-[#090E17]/60 border-amber-500/25"
            )}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 flex items-center justify-center mx-auto text-xl sm:text-2xl shadow-lg">
              ✦
            </div>
            <h3
              className={cn(
                "font-serif text-xl sm:text-3xl font-light tracking-tight",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              {emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md mx-auto leading-relaxed">
              {emptyDescription}
            </p>
            {emptyActionHref && emptyActionLabel && (
              <div className="pt-2">
                <Link
                  href={emptyActionHref}
                  className="inline-block px-6 py-2.5 rounded-xl bg-amber-400 text-black text-xs uppercase tracking-[0.16em] font-semibold hover:bg-amber-300 transition-colors shadow"
                >
                  {emptyActionLabel}
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export function CategoryCollectionFeed(props: CategoryCollectionFeedProps) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-amber-300 font-serif">Loading Collection...</div>}>
      <CategoryCollectionFeedInner {...props} />
    </Suspense>
  );
}
