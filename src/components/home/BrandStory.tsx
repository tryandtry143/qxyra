'use client';

import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';

export function BrandStory() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#080C14] border-b border-white/10 relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
                The Heritage of {BRAND_NAME}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Quiet Luxury. <br />
              <span className="italic text-amber-300">Artisanal Botanical Integrity.</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Maison {BRAND_NAME} unites bespoke sartorial tailoring from Northern Italy with rare artisanal perfumery macerated in Grasse, France—crafted to transcend seasonal trends.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="p-3.5 sm:p-5 rounded-xl bg-[#0D131F] border border-amber-500/20 space-y-1.5">
                <span className="text-amber-400 font-serif text-sm sm:text-lg block">01. Tailoring</span>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                  Italian virgin melton wool, cashmere, and pure mulberry silks.
                </p>
              </div>

              <div className="p-3.5 sm:p-5 rounded-xl bg-[#0D131F] border border-amber-500/20 space-y-1.5">
                <span className="text-amber-400 font-serif text-sm sm:text-lg block">02. Parfumerie</span>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                  35–38% pure extraits with wild Cambodian oud &amp; orris.
                </p>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>Read The Maison Philosophy</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Architectural Values Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0C111C] border border-white/10 space-y-2">
              <span className="text-xl sm:text-2xl font-serif text-amber-400 font-light block">01</span>
              <h4 className="font-serif text-sm sm:text-base font-medium text-white">Noble Origins</h4>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                Ethically wild-harvested botanicals from Grasse &amp; Koh Kong.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#0C111C] border border-white/10 space-y-2">
              <span className="text-xl sm:text-2xl font-serif text-amber-400 font-light block">02</span>
              <h4 className="font-serif text-sm sm:text-base font-medium text-white">Monogramming</h4>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                Complimentary custom gold-leaf laser engraving on flacons.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#0C111C] border border-white/10 space-y-2">
              <span className="text-xl sm:text-2xl font-serif text-amber-400 font-light block">03</span>
              <h4 className="font-serif text-sm sm:text-base font-medium text-white">Velvet Delivery</h4>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                Insured courier in signature midnight-navy coffrets.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#0C111C] border border-white/10 space-y-2">
              <span className="text-xl sm:text-2xl font-serif text-amber-400 font-light block">04</span>
              <h4 className="font-serif text-sm sm:text-base font-medium text-white">VIP Concierge</h4>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                Direct sizing guidance &amp; personal scent curation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
