'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { StoreCategoryCard } from '@/components/store/StoreCategoryCard';
import { products as fallbackProducts } from '@/lib/mock-data';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';
import { interleaveByCategory, getCategoryLabel } from '@/lib/catalog-helpers';

type MainPillar = 'all' | 'clothings' | 'perfume' | 'watches';

export function StoreCatalog() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') as MainPillar | null;
  const urlSub = searchParams.get('sub');

  const storeProducts = useProductStore((s) => s.products);
  const [mounted, setMounted] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<MainPillar>(urlCategory || 'all');
  const [selectedSub, setSelectedSub] = useState<string | null>(urlSub || null);

  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
    if (urlCategory) setSelectedPillar(urlCategory);
    if (urlSub) setSelectedSub(urlSub);
  }, [urlCategory, urlSub]);

  const activeProducts = useMemo(
    () => (mounted ? storeProducts : fallbackProducts).filter((p) => p.isActive),
    [mounted, storeProducts]
  );

  const clothingsProducts = activeProducts.filter((p) => p.categoryId === 'clothings');
  const perfumeProducts = activeProducts.filter((p) => p.categoryId === 'perfume');
  const watchesProducts = activeProducts.filter((p) => p.categoryId === 'watches');

  const displayedProducts = useMemo(() => {
    const filtered = activeProducts.filter((p) => {
      if (selectedPillar !== 'all' && p.categoryId !== selectedPillar) return false;
      if (selectedSub && p.subcategoryId !== selectedSub) return false;
      return true;
    });
    return selectedPillar === 'all' ? interleaveByCategory(filtered) : filtered;
  }, [activeProducts, selectedPillar, selectedSub]);

  return (
    <>
      {/* 3 Primary Category Showcase Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Banner 1: Clothings */}
        <StoreCategoryCard
          title="Clothings Salon"
          subtitle="Bespoke Italian virgin wool coats, sculptural silk evening gowns, 450gsm hoodies & 280gsm tees."
          href="/clothings"
          image="/images/clothings_editorial_banner.jpg"
          itemCount={clothingsProducts.length}
          subcategories={[
            { name: "Men's Tailoring", href: '/clothings?sub=mens' },
            { name: "Women's Gowns", href: '/clothings?sub=womens' },
            { name: "450gsm Hoodies", href: '/clothings?sub=hoodies' },
            { name: "280gsm T-Shirts", href: '/clothings?sub=tshirts' },
          ]}
        />

        {/* Banner 2: Perfume */}
        <StoreCategoryCard
          title="Perfume Maison"
          subtitle="Damask rose & 38% pure Extrait de Parfum artisanal fragrances with complimentary flacon engraving."
          href="/perfume"
          image="/images/perfume_floral_banner.jpg"
          itemCount={perfumeProducts.length}
          subcategories={[
            { name: "Men's Perfume", href: '/perfume?sub=mens' },
            { name: "Women's Perfume", href: '/perfume?sub=womens' },
            { name: "Scent Finder Quiz", href: '/scent-finder' },
          ]}
        />

        {/* Banner 3: Watches */}
        <StoreCategoryCard
          title="Watches Vault"
          subtitle="Precision automatic movements, sapphire crystal chronographs & collector luxury timepieces."
          href="/watches"
          image="/images/watch_luxury.jpg"
          itemCount={watchesProducts.length}
          subcategories={[
            { name: "Men's Watches", href: '/watches?sub=mens' },
            { name: "Women's Watches", href: '/watches?sub=womens' },
            { name: "Automatic Calibers", href: '/watches?sub=automatic' },
            { name: "Chronographs", href: '/watches?sub=chronograph' },
          ]}
        />
      </div>

      {/* Filter and Mixed Grid */}
      <div className="space-y-6 sm:space-y-8 pt-6 sm:pt-8">
        <div
          className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 transition-colors",
            isLight ? "border-stone-200" : "border-white/10"
          )}
        >
          <div>
            <h2
              className={cn(
                "text-2xl sm:text-3xl font-serif font-light tracking-wide transition-colors",
                isLight ? "text-stone-900" : "text-white"
              )}
            >
              {selectedPillar === 'all'
                ? `All Creations (${displayedProducts.length})`
                : selectedPillar === 'clothings'
                ? `Clothings (${displayedProducts.length})`
                : selectedPillar === 'perfume'
                ? `Perfumes (${displayedProducts.length})`
                : `Watches (${displayedProducts.length})`}
            </h2>
            <p
              className={cn(
                "text-xs font-light mt-1 transition-colors",
                isLight ? "text-stone-600" : "text-gray-400"
              )}
            >
              Curated by Maison {BRAND_NAME}.
            </p>
          </div>

          {/* 4-Pillar Grid Tabs on Mobile */}
          <div className="grid grid-cols-4 sm:inline-flex items-center gap-1 sm:gap-2 pb-1 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedPillar('all');
                setSelectedSub(null);
              }}
              className={cn(
                "px-1 sm:px-4 py-2 rounded-lg text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'all'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : isLight
                  ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                  : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
              )}
            >
              All ({activeProducts.length})
            </button>
            <button
              onClick={() => {
                setSelectedPillar('clothings');
                setSelectedSub(null);
              }}
              className={cn(
                "px-1 sm:px-4 py-2 rounded-lg text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'clothings'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : isLight
                  ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                  : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
              )}
            >
              Clothings ({clothingsProducts.length})
            </button>
            <button
              onClick={() => {
                setSelectedPillar('perfume');
                setSelectedSub(null);
              }}
              className={cn(
                "px-1 sm:px-4 py-2 rounded-lg text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'perfume'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : isLight
                  ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                  : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
              )}
            >
              Perfume ({perfumeProducts.length})
            </button>
            <button
              onClick={() => {
                setSelectedPillar('watches');
                setSelectedSub(null);
              }}
              className={cn(
                "px-1 sm:px-4 py-2 rounded-lg text-[9.5px] sm:text-xs uppercase tracking-[0.04em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'watches'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : isLight
                  ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                  : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
              )}
            >
              Watches ({watchesProducts.length})
            </button>
          </div>
        </div>

        {/* Subcategory Secondary Pills */}
        {selectedPillar === 'clothings' && (
          <div className="flex flex-wrap items-center gap-2 py-1 animate-in fade-in">
            <span className={cn("text-[11px] font-mono uppercase tracking-widest mr-1", isLight ? "text-stone-500 font-semibold" : "text-gray-500")}>
              Subcategory:
            </span>
            {[
              { id: null, label: 'All Clothings' },
              { id: 'mens', label: "Men's" },
              { id: 'womens', label: "Women's" },
              { id: 'hoodies', label: 'Hoodies (450gsm)' },
              { id: 'tshirts', label: 'T-Shirts (280gsm)' },
            ].map((sub) => (
              <button
                key={sub.label}
                onClick={() => setSelectedSub(sub.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                  selectedSub === sub.id
                    ? "bg-amber-400 text-black font-bold shadow"
                    : isLight
                    ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {selectedPillar === 'perfume' && (
          <div className="flex flex-wrap items-center gap-2 py-1 animate-in fade-in">
            <span className={cn("text-[11px] font-mono uppercase tracking-widest mr-1", isLight ? "text-stone-500 font-semibold" : "text-gray-500")}>
              Subcategory:
            </span>
            {[
              { id: null, label: 'All Perfumes' },
              { id: 'mens', label: "Men's Perfume (Oud & Woods)" },
              { id: 'womens', label: "Women's Perfume (Rose & Amber)" },
            ].map((sub) => (
              <button
                key={sub.label}
                onClick={() => setSelectedSub(sub.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                  selectedSub === sub.id
                    ? "bg-amber-400 text-black font-bold shadow"
                    : isLight
                    ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {selectedPillar === 'watches' && (
          <div className="flex flex-wrap items-center gap-2 py-1 animate-in fade-in">
            <span className={cn("text-[11px] font-mono uppercase tracking-widest mr-1", isLight ? "text-stone-500 font-semibold" : "text-gray-500")}>
              Subcategory:
            </span>
            {[
              { id: null, label: 'All Watches' },
              { id: 'mens', label: "Men's Watches" },
              { id: 'womens', label: "Women's Watches" },
              { id: 'automatic', label: 'Automatic' },
              { id: 'chronograph', label: 'Chronograph' },
            ].map((sub) => (
              <button
                key={sub.label}
                onClick={() => setSelectedSub(sub.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                  selectedSub === sub.id
                    ? "bg-amber-400 text-black font-bold shadow"
                    : isLight
                    ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {displayedProducts.map((product) => (
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
              New arrivals across Clothings, Perfumes, and Watches are currently being registered into the catalog.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
