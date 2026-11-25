import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';
import { CategoryCollectionFeed } from '@/components/store/CategoryCollectionFeed';

export const metadata: Metadata = {
  title: `Clothings Salon — Haute Couture & Luxury Streetwear | ${BRAND_NAME}`,
  description:
    'Explore Maison QXYRA Clothings: tailored Italian melton wool coats, 32 momme mulberry silk evening gowns, 450gsm heavyweight French Terry hoodies, and 280gsm designer tees.',
};

const TEXTILE_SPECIFICATIONS = [
  {
    num: '01',
    title: '680gsm Virgin Wool',
    desc: 'Woven in Biella, Italy with hand-finished seams and water buffalo horn buttons.',
  },
  {
    num: '02',
    title: '32 Momme Mulberry Silk',
    desc: 'Cut exclusively on the bias for sculptural, fluid movement on evening silhouettes.',
  },
  {
    num: '03',
    title: '450gsm French Terry',
    desc: 'Boxy heavyweight luxury hoodies finished with solid 24K PVD champagne hardware.',
  },
  {
    num: '04',
    title: '280gsm Combed Cotton',
    desc: 'Dense compact cotton jersey with non-sag ribbed necklines for clean architectural drape.',
  },
];

export default function ClothingsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#070A0F] text-white">
      
      {/* 1. Italian Couture Salon Campaign Hero */}
      <section className="luxury-media-card relative min-h-[68svh] sm:min-h-[580px] flex items-end sm:items-center overflow-hidden border-b border-amber-500/20 bg-[#05070B]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/clothings_editorial_banner.jpg"
            alt={`Maison ${BRAND_NAME} Haute Couture Tailoring & Silk Gowns`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/55 to-black/30 sm:bg-gradient-to-r sm:from-[#05070B]/92 sm:via-[#05070B]/50 sm:to-transparent" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-400/35 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-amber-300 font-semibold">
                Atelier De Couture • Florence &amp; Milan
              </span>
            </div>

            <h1 className="font-serif text-[2.45rem] sm:text-5xl lg:text-6xl font-light text-white leading-[1.04] tracking-tight">
              Architectural Silk <br />
              <span className="italic text-amber-300">&amp; Bespoke Tailoring</span>
            </h1>

            <p className="text-xs sm:text-base text-gray-200 font-light leading-relaxed max-w-md">
              From structured men&apos;s overcoats and fluid obsidian evening gowns to 450gsm heavyweight French Terry hoodies.
            </p>

            {/* Quick Mobile Sub-Department Pills */}
            <div className="grid grid-cols-2 sm:flex flex-wrap items-center gap-2 pt-1">
              <Link
                href="/clothings?sub=mens"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-colors text-center"
              >
                Men&apos;s Couture
              </Link>
              <Link
                href="/clothings?sub=womens"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium border border-white/25 text-white rounded-xl sm:rounded hover:border-amber-400 backdrop-blur-md text-center"
              >
                Women&apos;s Gowns
              </Link>
              <Link
                href="/clothings?sub=hoodies"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium border border-white/20 text-gray-200 rounded-xl sm:rounded hover:border-amber-400 backdrop-blur-md text-center"
              >
                450gsm Hoodies
              </Link>
              <Link
                href="/clothings?sub=tshirts"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium border border-white/20 text-gray-200 rounded-xl sm:rounded hover:border-amber-400 backdrop-blur-md text-center"
              >
                280gsm T-Shirts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Filtered Clothings Collection */}
      <CategoryCollectionFeed
        categoryId="clothings"
        departmentLabel="Haute Couture"
        sectionEyebrow="The Atelier Wardrobe"
        sectionTitle="Luxury"
        sectionAccent="Clothings"
        subcategories={[
          { id: null, label: 'All Clothings' },
          { id: 'mens', label: "Men's" },
          { id: 'womens', label: "Women's" },
          { id: 'hoodies', label: 'Hoodies (450gsm)' },
          { id: 'tshirts', label: 'T-Shirts (280gsm)' },
        ]}
        emptyTitle="Atelier Capsule Wardrobe Curating"
        emptyDescription={`Fresh tailored silhouettes, heavyweight hoodies, and silk garments for Maison ${BRAND_NAME} will be showcased here soon.`}
        emptyActionHref="/store"
        emptyActionLabel="Browse Mixed Gallery"
      />

      {/* 3. Signature Silhouettes Editorial Strip (Swipeable on Mobile -> 3-col Desktop) */}
      <section className="py-12 sm:py-18 bg-[#06090F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              Signature Fabrics
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
              Tactile <span className="italic text-amber-300">Craftsmanship</span>
            </h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 -mx-4 px-4 pb-2 no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6">
            {[
              {
                img: '/images/wool_trench.jpg',
                tag: "Men's Tailoring",
                title: 'Virgin Melton Wool',
                sub: 'Structured winter outerwear & silk blazers',
                href: '/clothings?sub=mens',
              },
              {
                img: '/images/silk_gown.jpg',
                tag: "Women's Couture",
                title: 'Obsidian Mulberry Silk',
                sub: 'Bias-cut evening silhouettes & cashmere',
                href: '/clothings?sub=womens',
              },
              {
                img: '/images/luxury_hoodie.jpg',
                tag: 'Street Couture',
                title: '450gsm Heavyweight Terry',
                sub: 'Architectural boxy hoodies & luxury tees',
                href: '/clothings?sub=hoodies',
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="luxury-media-card group relative w-[76vw] md:w-auto shrink-0 snap-center aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0B101A]"
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 78vw, 33vw"
                  className="object-cover object-top brightness-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-amber-300 font-mono font-semibold">
                    {card.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light">{card.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Material Heritage Grid */}
      <section className="py-12 sm:py-20 bg-[#080C14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {TEXTILE_SPECIFICATIONS.map((item) => (
              <div
                key={item.num}
                className="p-4 sm:p-6 rounded-2xl bg-[#0C111C] border border-white/10 space-y-2"
              >
                <span className="text-xl sm:text-2xl font-serif text-amber-400 font-light block">
                  {item.num}
                </span>
                <h3 className="font-serif text-sm sm:text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
