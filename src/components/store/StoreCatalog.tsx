'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { StoreCategoryCard } from '@/components/store/StoreCategoryCard';
import { products as fallbackProducts } from '@/lib/mock-data';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';

type MainPillar = 'all' | 'clothings' | 'perfume';

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

  const activeProducts = (mounted ? storeProducts : fallbackProducts).filter((p) => p.isActive);

  const clothingsProducts = activeProducts.filter((p) => p.categoryId === 'clothings');
  const perfumeProducts = activeProducts.filter((p) => p.categoryId === 'perfume');

  const displayedProducts = activeProducts.filter((p) => {
    if (selectedPillar !== 'all' && p.categoryId !== selectedPillar) return false;
    if (selectedSub && p.subcategoryId !== selectedSub) return false;
    return true;
  });

  return (
    <>
      {/* 2 Primary Category Showcase Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Banner 1: Clothings */}
        <StoreCategoryCard
          title="Clothings Collection"
          subtitle="Bespoke Italian virgin wool coats, sculptural silk evening gowns, 450gsm luxury hoodies, and 280gsm designer tees."
          href="/store?category=clothings"
          image="/images/wool_trench.jpg"
          itemCount={clothingsProducts.length}
          subcategories={[
            { name: "Men's Tailoring", href: '/store?category=clothings&sub=mens' },
            { name: "Women's Gowns", href: '/store?category=clothings&sub=womens' },
            { name: "Heavyweight Hoodies", href: '/store?category=clothings&sub=hoodies' },
            { name: "Designer T-Shirts", href: '/store?category=clothings&sub=tshirts' },
          ]}
        />

        {/* Banner 2: Perfume */}
        <StoreCategoryCard
          title="Perfume Atelier"
          subtitle="35-38% pure Extrait de Parfum artisanal fragrances crafted for gentlemen and ladies with complimentary laser flacon engraving."
          href="/store?category=perfume"
          image="/images/perfume_flacon.jpg"
          itemCount={perfumeProducts.length}
          subcategories={[
            { name: "Men's Perfume (Oud & Sandalwood)", href: '/store?category=perfume&sub=mens' },
            { name: "Women's Perfume (Rose & Amber)", href: '/store?category=perfume&sub=womens' },
            { name: "Interactive Scent Quiz", href: '/scent-finder' },
          ]}
        />
      </div>

      {/* Filter and Grid */}
      <div className="space-y-8 pt-8">
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 transition-colors",
          isLight ? "border-stone-200" : "border-white/10"
        )}>
          <div>
            <h2 className={cn(
              "text-2xl sm:text-3xl font-serif font-light tracking-wide transition-colors",
              isLight ? "text-stone-900" : "text-white"
            )}>
              {selectedPillar === 'all'
                ? `All Creations (${displayedProducts.length})`
                : selectedPillar === 'clothings'
                ? `Clothings (${displayedProducts.length})`
                : `Perfumes (${displayedProducts.length})`}
            </h2>
            <p className={cn(
              "text-xs font-light mt-1 transition-colors",
              isLight ? "text-stone-600" : "text-gray-400"
            )}>
              Curated by Maison {BRAND_NAME}.
            </p>
          </div>

          {/* Primary Pillar Buttons */}
          <div className="grid grid-cols-3 sm:inline-flex items-center gap-1.5 sm:gap-2 pb-1 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedPillar('all');
                setSelectedSub(null);
              }}
              className={cn(
                "px-2 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'all'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "text-gray-400 hover:text-white bg-white/5 border border-white/5")
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
                "px-2 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'clothings'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "text-gray-400 hover:text-white bg-white/5 border border-white/5")
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
                "px-2 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap text-center",
                selectedPillar === 'perfume'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "text-gray-400 hover:text-white bg-white/5 border border-white/5")
              )}
            >
              Perfume ({perfumeProducts.length})
            </button>
          </div>
        </div>

        {/* Subcategory Secondary Pills */}
        {selectedPillar === 'clothings' && (
          <div className="flex flex-wrap items-center gap-2 py-1 animate-in fade-in">
            <span className={cn(
              "text-[11px] font-mono uppercase tracking-widest mr-1",
              isLight ? "text-stone-500 font-semibold" : "text-gray-500"
            )}>
              Subcategory:
            </span>
            <button
              onClick={() => setSelectedSub(null)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === null
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              All Clothings
            </button>
            <button
              onClick={() => setSelectedSub('mens')}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === 'mens'
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              Men&apos;s
            </button>
            <button
              onClick={() => setSelectedSub('womens')}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === 'womens'
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              Women&apos;s
            </button>
            <button
              onClick={() => setSelectedSub('hoodies')}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === 'hoodies'
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              Hoodies (450gsm)
            </button>
            <button
              onClick={() => setSelectedSub('tshirts')}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === 'tshirts'
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              T-Shirts (280gsm)
            </button>
          </div>
        )}

        {selectedPillar === 'perfume' && (
          <div className="flex flex-wrap items-center gap-2 py-1 animate-in fade-in">
            <span className={cn(
              "text-[11px] font-mono uppercase tracking-widest mr-1",
              isLight ? "text-stone-500 font-semibold" : "text-gray-500"
            )}>
              Subcategory:
            </span>
            <button
              onClick={() => setSelectedSub(null)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === null
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              All Perfumes
            </button>
            <button
              onClick={() => setSelectedSub('mens')}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === 'mens'
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              Men&apos;s Perfume (Oud & Woods)
            </button>
            <button
              onClick={() => setSelectedSub('womens')}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                selectedSub === 'womens'
                  ? "bg-amber-400 text-black font-bold shadow"
                  : (isLight ? "bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200" : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white")
              )}
            >
              Women&apos;s Perfume (Rose & Amber)
            </button>
          </div>
        )}

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={cn(
            "py-14 sm:py-20 text-center border border-dashed rounded-2xl p-6 sm:p-12 space-y-3 sm:space-y-4 transition-colors",
            isLight ? "bg-white border-stone-300" : "bg-[#090E17]/60 border-amber-500/25"
          )}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 flex items-center justify-center mx-auto text-xl sm:text-2xl shadow-lg">
              ✦
            </div>
            <h3 className="font-serif text-xl sm:text-3xl text-white font-light tracking-tight">
              Boutique Collection Curating
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md mx-auto leading-relaxed">
              New arrivals and artisanal flacons are currently being registered into the catalog.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
