import { Metadata } from 'next';
import { Suspense } from 'react';
import { StoreCatalog } from '@/components/store/StoreCatalog';
import { StoreBanner } from '@/components/store/StoreBanner';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${BRAND_NAME} Collections | Clothings & Artisanal Perfumes`,
  description: `Explore the complete ${BRAND_NAME} catalog: luxury clothings (men's, women's, 450gsm hoodies, designer tees) and rare artisanal perfumes with complimentary laser flacon engraving.`,
};

export default function StorePage() {
  return (
    <div className="min-h-screen py-6 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-14">
        
        {/* Luxury Catalog Header Banner */}
        <StoreBanner />

        {/* Catalog Grid View with Filters & Sort */}
        <Suspense fallback={<div className="py-24 text-center text-amber-300 font-serif text-lg animate-pulse">Loading Maison Collections...</div>}>
          <StoreCatalog />
        </Suspense>

      </div>
    </div>
  );
}
