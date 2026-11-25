'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { useProductStore } from '@/store/productStore';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';
import { interleaveByCategory, getCategoryLabel } from '@/lib/catalog-helpers';

type FilterKey =
  | 'all'
  | 'clothings'
  | 'clothings-mens'
  | 'clothings-womens'
  | 'clothings-hoodies'
  | 'clothings-tshirts'
  | 'perfume'
  | 'perfume-mens'
  | 'perfume-womens'
  | 'watches'
  | 'watches-mens'
  | 'watches-womens'
  | 'watches-automatic'
  | 'watches-chronograph';

export function StorePreview() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [mounted, setMounted] = useState(false);
  const products = useProductStore((s) => s.products);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeProducts = useMemo(() => products.filter((p) => p.isActive), [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return interleaveByCategory(activeProducts);
    }

    return activeProducts.filter((p) => {
      if (activeFilter === 'clothings') return p.categoryId === 'clothings';
      if (activeFilter === 'clothings-mens') return p.categoryId === 'clothings' && p.subcategoryId === 'mens';
      if (activeFilter === 'clothings-womens') return p.categoryId === 'clothings' && p.subcategoryId === 'womens';
      if (activeFilter === 'clothings-hoodies') return p.categoryId === 'clothings' && p.subcategoryId === 'hoodies';
      if (activeFilter === 'clothings-tshirts') return p.categoryId === 'clothings' && p.subcategoryId === 'tshirts';
      if (activeFilter === 'perfume') return p.categoryId === 'perfume';
      if (activeFilter === 'perfume-mens') return p.categoryId === 'perfume' && p.subcategoryId === 'mens';
      if (activeFilter === 'perfume-womens') return p.categoryId === 'perfume' && p.subcategoryId === 'womens';
      if (activeFilter === 'watches') return p.categoryId === 'watches';
      if (activeFilter === 'watches-mens') return p.categoryId === 'watches' && p.subcategoryId === 'mens';
      if (activeFilter === 'watches-womens') return p.categoryId === 'watches' && p.subcategoryId === 'womens';
      if (activeFilter === 'watches-automatic') return p.categoryId === 'watches' && p.subcategoryId === 'automatic';
      if (activeFilter === 'watches-chronograph') return p.categoryId === 'watches' && p.subcategoryId === 'chronograph';
      return true;
    });
  }, [activeFilter, activeProducts]);

  const clothingsCount = activeProducts.filter((p) => p.categoryId === 'clothings').length;
  const perfumeCount = activeProducts.filter((p) => p.categoryId === 'perfume').length;
  const watchesCount = activeProducts.filter((p) => p.categoryId === 'watches').length;

  return (
    <section
      className={cn(
        "py-12 sm:py-20 lg:py-24 border-b transition-colors",
        isLight ? "bg-[#F9F8F6] border-stone-200" : "bg-[#070A0F] border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
                Curated Mixed Gallery
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-light tracking-tight text-white">
              All {BRAND_NAME} <span className="italic text-amber-300">Creations</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed font-light">
              Browse bespoke Clothings, Artisanal Perfumes, and Fine Watches showcased together in one unified maison feed—or enter each dedicated salon.
            </p>
          </div>

          <Link
            href="/store"
            className="self-start md:self-end text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-amber-300 hover:text-amber-200 inline-flex items-center gap-2 group pb-1 border-b border-amber-400/30 hover:border-amber-300"
          >
            <span>Explore Full Catalog</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Primary Categories & Subcategory Tabs */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Main 4-Pillar Tabs: Fits cleanly in 1 row even on 360px phones */}
          <div className="grid grid-cols-4 sm:inline-flex items-center gap-1 sm:gap-2 pb-1.5 border-b border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-1 sm:px-4 py-2 sm:py-2.5 text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-[0.14em] font-medium transition-all whitespace-nowrap rounded-lg cursor-pointer text-center",
                activeFilter === 'all'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              All ({activeProducts.length})
            </button>
            <button
              onClick={() => setActiveFilter('clothings')}
              className={cn(
                "px-1 sm:px-4 py-2 sm:py-2.5 text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-[0.14em] font-medium transition-all whitespace-nowrap rounded-lg cursor-pointer text-center",
                activeFilter === 'clothings' || activeFilter.startsWith('clothings-')
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              Clothings ({clothingsCount})
            </button>
            <button
              onClick={() => setActiveFilter('watches')}
              className={cn(
                "px-1 sm:px-4 py-2 sm:py-2.5 text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-[0.14em] font-medium transition-all whitespace-nowrap rounded-lg cursor-pointer text-center",
                activeFilter === 'watches' || activeFilter.startsWith('watches-')
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              Watches ({watchesCount})
            </button>
            <button
              onClick={() => setActiveFilter('perfume')}
              className={cn(
                "px-1 sm:px-4 py-2 sm:py-2.5 text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-[0.14em] font-medium transition-all whitespace-nowrap rounded-lg cursor-pointer text-center",
                activeFilter === 'perfume' || activeFilter.startsWith('perfume-')
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              Perfume ({perfumeCount})
            </button>
          </div>

          {/* Subcategory Secondary Pills */}
          {(activeFilter === 'clothings' || activeFilter.startsWith('clothings-')) && (
            <div className="flex items-center gap-2 overflow-x-auto py-1.5 no-scrollbar animate-in fade-in">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mr-1 shrink-0">Clothings:</span>
              <button
                onClick={() => setActiveFilter('clothings-mens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'clothings-mens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Men&apos;s
              </button>
              <button
                onClick={() => setActiveFilter('clothings-womens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'clothings-womens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Women&apos;s
              </button>
              <button
                onClick={() => setActiveFilter('clothings-hoodies')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'clothings-hoodies'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Hoodies (450gsm)
              </button>
              <button
                onClick={() => setActiveFilter('clothings-tshirts')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'clothings-tshirts'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                T-Shirts (280gsm)
              </button>
              <Link href="/clothings" className="text-[11px] font-mono text-amber-400 underline ml-2 whitespace-nowrap shrink-0">
                Full Salon →
              </Link>
            </div>
          )}

          {(activeFilter === 'perfume' || activeFilter.startsWith('perfume-')) && (
            <div className="flex items-center gap-2 overflow-x-auto py-1.5 no-scrollbar animate-in fade-in">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mr-1 shrink-0">Perfumes:</span>
              <button
                onClick={() => setActiveFilter('perfume-mens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'perfume-mens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Men&apos;s Perfumes (Oud &amp; Woods)
              </button>
              <button
                onClick={() => setActiveFilter('perfume-womens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'perfume-womens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Women&apos;s Perfumes (Rose &amp; Amber)
              </button>
              <Link href="/perfume" className="text-[11px] font-mono text-amber-400 underline ml-2 whitespace-nowrap shrink-0">
                Full Parfumerie →
              </Link>
            </div>
          )}

          {(activeFilter === 'watches' || activeFilter.startsWith('watches-')) && (
            <div className="flex items-center gap-2 overflow-x-auto py-1.5 no-scrollbar animate-in fade-in">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mr-1 shrink-0">Watches:</span>
              <button
                onClick={() => setActiveFilter('watches-mens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'watches-mens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Men&apos;s
              </button>
              <button
                onClick={() => setActiveFilter('watches-womens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'watches-womens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Women&apos;s
              </button>
              <button
                onClick={() => setActiveFilter('watches-automatic')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'watches-automatic'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Automatic
              </button>
              <button
                onClick={() => setActiveFilter('watches-chronograph')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  activeFilter === 'watches-chronograph'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Chronograph
              </button>
              <Link href="/watches" className="text-[11px] font-mono text-amber-400 underline ml-2 whitespace-nowrap shrink-0">
                Full Vault →
              </Link>
            </div>
          )}
        </div>

        {/* Product Grid: 2-Column Editorial Mixed Feed on Mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={getCategoryLabel(product.categoryId)}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "py-14 sm:py-20 text-center border border-dashed rounded-2xl p-6 sm:p-12 space-y-3 sm:space-y-4 transition-colors",
              isLight ? "bg-white border-stone-300" : "bg-[#090E17]/60 border-amber-500/25"
            )}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 flex items-center justify-center mx-auto text-xl sm:text-2xl shadow-lg">
              ✦
            </div>
            <h3 className="font-serif text-xl sm:text-3xl text-white font-light tracking-tight">
              Boutique Collection Curating
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md mx-auto leading-relaxed">
              Maison {BRAND_NAME} is currently preparing new Clothings, Perfumes, and Watches for the mixed showcase.
            </p>
          </div>
        )}

        {/* Bottom Editorial Callout with Direct Links to All 3 Houses */}
        <div
          className={cn(
            "p-6 sm:p-10 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 text-center lg:text-left transition-colors",
            isLight
              ? "bg-white border-stone-200 shadow-sm"
              : "border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-[#0B101A] to-[#0B101A]"
          )}
        >
          <div className="space-y-1.5">
            <h4 className="font-serif text-xl sm:text-2xl text-white font-light">
              Explore Each Maison Universe Individually
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Immerse yourself in our tailored fashion salon, floral Grasse parfumerie, or Swiss-inspired watch vault.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:flex items-center gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/clothings"
              className="px-3 sm:px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] font-medium border border-white/20 text-white rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-colors text-center whitespace-nowrap"
            >
              Clothings
            </Link>
            <Link
              href="/watches"
              className="px-3 sm:px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-colors shadow text-center whitespace-nowrap"
            >
              Watches
            </Link>
            <Link
              href="/perfume"
              className="px-3 sm:px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] font-medium border border-rose-400/35 text-rose-200 rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-colors text-center whitespace-nowrap"
            >
              Perfume
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
