'use client';

import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';

export function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-[#080C14] border-b border-white/10 relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
                The Heritage of {BRAND_NAME}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Quiet Luxury. <br />
              <span className="italic text-amber-300">Artisanal Botanical Integrity.</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Maison {BRAND_NAME} was established with a singular devotion: creating timeless objects of beauty that transcend ephemeral seasonal trends. We unite bespoke sartorial tailoring from Northern Italy with rare artisanal perfumery macerated in Grasse, France.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#0D131F] border border-amber-500/20 space-y-2">
                <span className="text-amber-400 font-serif text-lg">01. Sartorial Tailoring</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Virgin Italian melton wool, Mongolian grade-A cashmere, and pure mulberry silks sculpted into architectural silhouettes.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0D131F] border border-amber-500/20 space-y-2">
                <span className="text-amber-400 font-serif text-lg">02. Haute Parfumerie</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  35-38% pure Extrait de Parfum compositions with wild Cambodian agarwood and precious Florentine orris butter.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>Read The Full Maison Philosophy</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Values & Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#0C121D] border border-white/10 space-y-3">
              <span className="text-2xl font-serif text-amber-400 font-light">01</span>
              <h4 className="font-serif text-base font-medium text-white">Noble Raw Origins</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Zero synthetic filler oils. Every botanical is ethically and sustainably wild-harvested across Grasse, Kashmir, and Koh Kong.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C121D] border border-white/10 space-y-3">
              <span className="text-2xl font-serif text-amber-400 font-light">02</span>
              <h4 className="font-serif text-base font-medium text-white">Bespoke Monogramming</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Complimentary personalized gold foil or laser engraving on every crystal flacon and tailored garment label.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C121D] border border-white/10 space-y-3">
              <span className="text-2xl font-serif text-amber-400 font-light">03</span>
              <h4 className="font-serif text-base font-medium text-white">White-Glove Delivery</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Insured express worldwide transit packaged in signature embossed midnight navy coffrets with ribbon wrapping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C121D] border border-white/10 space-y-3">
              <span className="text-2xl font-serif text-amber-400 font-light">04</span>
              <h4 className="font-serif text-base font-medium text-white">Private Concierge</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Direct access to personal fragrance consultants and sizing specialists available via WhatsApp and private appointment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
