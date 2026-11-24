import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { StoreCatalog } from '@/components/store/StoreCatalog';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${BRAND_NAME} Collections | Clothings & Artisanal Perfumes`,
  description: `Explore the complete ${BRAND_NAME} catalog: luxury clothings (men's, women's, 450gsm hoodies, designer tees) and rare artisanal perfumes with complimentary laser flacon engraving.`,
};

export default function StorePage() {
  return (
    <div className="min-h-screen py-8 sm:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Luxury Catalog Header Banner */}
        <div className="relative p-6 sm:p-14 rounded-3xl border shadow-2xl overflow-hidden space-y-5 transition-colors bg-white dark:bg-[#0C111C] border-stone-200 dark:border-amber-500/25">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300 font-semibold">
              The Maison Catalog
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 dark:text-white tracking-tight leading-tight">
              MAISON <span className="text-amber-600 dark:text-amber-300 italic font-normal">{BRAND_NAME}</span>
            </h1>
            <p className="text-stone-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Where Italian tailoring mastery meets the alchemy of Grasse perfumery. Every piece is created with uncompromising devotion to noble raw materials and bespoke craftsmanship.
            </p>
          </div>

          {/* Quick Department Jump */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Link
              href="/store"
              className="px-4 sm:px-5 py-2.5 rounded bg-amber-400 text-black text-xs uppercase tracking-wider font-semibold hover:bg-amber-300 transition-colors shadow"
            >
              All Creations
            </Link>
            <Link
              href="/store?category=clothings"
              className="px-4 sm:px-5 py-2.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 dark:bg-black/60 dark:hover:bg-black/90 dark:text-white dark:border-white/20 dark:hover:border-amber-400 text-xs uppercase tracking-wider font-medium transition-all"
            >
              🧥 Clothings
            </Link>
            <Link
              href="/store?category=perfume"
              className="px-4 sm:px-5 py-2.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 dark:bg-black/60 dark:hover:bg-black/90 dark:text-white dark:border-white/20 dark:hover:border-amber-400 text-xs uppercase tracking-wider font-medium transition-all"
            >
              ✨ Perfume
            </Link>
            <Link
              href="/scent-finder"
              className="px-4 sm:px-5 py-2.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider font-medium transition-all"
            >
              🌿 Scent Finder Quiz
            </Link>
          </div>
        </div>

        {/* Catalog Grid View with Filters & Sort */}
        <Suspense fallback={<div className="py-24 text-center text-amber-300 font-serif text-lg animate-pulse">Loading Maison Collections...</div>}>
          <StoreCatalog />
        </Suspense>

      </div>
    </div>
  );
}
