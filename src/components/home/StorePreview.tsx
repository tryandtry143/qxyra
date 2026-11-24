'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { useProductStore } from '@/store/productStore';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';

type FilterKey = 'all' | 'clothings' | 'clothings-mens' | 'clothings-womens' | 'clothings-hoodies' | 'clothings-tshirts' | 'perfume' | 'perfume-mens' | 'perfume-womens';

export function StorePreview() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const products = useProductStore((s) => s.products);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'clothings') return p.categoryId === 'clothings';
    if (activeFilter === 'clothings-mens') return p.categoryId === 'clothings' && p.subcategoryId === 'mens';
    if (activeFilter === 'clothings-womens') return p.categoryId === 'clothings' && p.subcategoryId === 'womens';
    if (activeFilter === 'clothings-hoodies') return p.categoryId === 'clothings' && p.subcategoryId === 'hoodies';
    if (activeFilter === 'clothings-tshirts') return p.categoryId === 'clothings' && p.subcategoryId === 'tshirts';
    if (activeFilter === 'perfume') return p.categoryId === 'perfume';
    if (activeFilter === 'perfume-mens') return p.categoryId === 'perfume' && p.subcategoryId === 'mens';
    if (activeFilter === 'perfume-womens') return p.categoryId === 'perfume' && p.subcategoryId === 'womens';
    return true;
  });

  const clothingsCount = products.filter((p) => p.categoryId === 'clothings').length;
  const perfumeCount = products.filter((p) => p.categoryId === 'perfume').length;

  return (
    <section className={cn(
      "py-16 sm:py-24 border-b transition-colors",
      isLight ? "bg-[#F9F8F6] border-stone-200" : "bg-[#070A0F] border-white/5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
                Primary Collections
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white">
              The {BRAND_NAME} <span className="italic text-amber-300">Clothings & Perfumes</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed font-light">
              Explore bespoke men&apos;s and women&apos;s tailoring, 450gsm luxury hoodies, designer tees, and artisanal perfumes with complimentary laser flacon engraving.
            </p>
          </div>

          <Link
            href="/store"
            className="self-start md:self-end text-xs uppercase tracking-[0.2em] font-medium text-amber-300 hover:text-amber-200 inline-flex items-center gap-2 group pb-1 border-b border-amber-400/30 hover:border-amber-300"
          >
            <span>View Full Catalog</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Primary Categories & Subcategory Tabs */}
        <div className="space-y-3">
          {/* Main Pillar Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-white/10">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap rounded cursor-pointer",
                activeFilter === 'all'
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              All Pieces ({products.length})
            </button>
            <button
              onClick={() => setActiveFilter('clothings')}
              className={cn(
                "px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap rounded cursor-pointer",
                activeFilter === 'clothings' || activeFilter.startsWith('clothings-')
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              🧥 Clothings ({clothingsCount})
            </button>
            <button
              onClick={() => setActiveFilter('perfume')}
              className={cn(
                "px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap rounded cursor-pointer",
                activeFilter === 'perfume' || activeFilter.startsWith('perfume-')
                  ? "bg-amber-400 text-black font-semibold shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              ✨ Perfume ({perfumeCount})
            </button>
          </div>

          {/* Subcategory Secondary Pills */}
          {(activeFilter === 'clothings' || activeFilter.startsWith('clothings-')) && (
            <div className="flex items-center gap-2 overflow-x-auto py-2 animate-in fade-in">
              <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mr-1">Clothings:</span>
              <button
                onClick={() => setActiveFilter('clothings-mens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
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
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
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
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
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
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                  activeFilter === 'clothings-tshirts'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                T-Shirts (280gsm)
              </button>
            </div>
          )}

          {(activeFilter === 'perfume' || activeFilter.startsWith('perfume-')) && (
            <div className="flex items-center gap-2 overflow-x-auto py-2 animate-in fade-in">
              <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mr-1">Perfumes:</span>
              <button
                onClick={() => setActiveFilter('perfume-mens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                  activeFilter === 'perfume-mens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Men&apos;s Perfumes (Oud & Woods)
              </button>
              <button
                onClick={() => setActiveFilter('perfume-womens')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors cursor-pointer",
                  activeFilter === 'perfume-womens'
                    ? "bg-white text-black font-bold"
                    : "bg-[#0D121D] border border-white/10 text-gray-300 hover:text-white"
                )}
              >
                Women&apos;s Perfumes (Rose & Amber)
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="p-8 sm:p-10 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-[#0B1019] to-[#0B1019] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-xl sm:text-2xl text-white font-light">
              Can&apos;t decide on a signature scent or luxury silhouette?
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Take our 60-second Olfactory Consultation quiz or speak directly with our private client concierge.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/scent-finder"
              className="px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold bg-amber-400 text-black rounded hover:bg-amber-300 transition-colors shadow"
            >
              Start Scent Quiz
            </Link>
            <Link
              href="/store?category=clothings"
              className="px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium border border-white/20 text-white rounded hover:border-amber-400 hover:text-amber-300 transition-colors"
            >
              Explore Clothings
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
