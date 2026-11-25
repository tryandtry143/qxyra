import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME } from '@/lib/constants';
import { CategoryCollectionFeed } from '@/components/store/CategoryCollectionFeed';
import { LabsShowcase } from '@/components/home/LabsShowcase';

export const metadata: Metadata = {
  title: `Perfume Atelier — Botanical Extraits & Rose Petals | ${BRAND_NAME}`,
  description:
    'Discover Maison QXYRA Haute Parfumerie: 35-38% pure Extrait de Parfum fragrances infused with Damascus rose petals, aged Cambodian Oud, and complimentary laser flacon monogramming.',
};

const PERFUME_PILLARS = [
  {
    num: '01',
    title: 'Damask Rose Harvest',
    desc: 'Hand-picked at dawn in Grasse & Bulgaria for velvety floral luminosity and rich natural sillage.',
  },
  {
    num: '02',
    title: '38% Pure Extrait',
    desc: 'Ultra-concentrated pure parfum oils macerated for months for 24-hour skin & silk longevity.',
  },
  {
    num: '03',
    title: 'French Crystal Flacons',
    desc: 'Heavyweight 550g faceted glass bottles crowned with solid 24K gold-tone magnetic caps.',
  },
  {
    num: '04',
    title: 'Laser Monogramming',
    desc: 'Complimentary bespoke inscription of your initials directly onto your collector bottle.',
  },
];

export default function PerfumePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#070A0F] text-white">
      
      {/* 1. Botanical Rose-Petal Sensory Campaign Hero */}
      <section className="luxury-media-card relative min-h-[70svh] sm:min-h-[600px] flex items-end sm:items-center overflow-hidden border-b border-amber-500/20 bg-[#05070B]">
        {/* Full-bleed Campaign Photography with Petals & Amber Flacon */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/perfume_floral_banner.jpg"
            alt={`Maison ${BRAND_NAME} Haute Parfumerie with Floating Rose Petals`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/55 to-black/35 sm:bg-gradient-to-r sm:from-[#05070B]/92 sm:via-[#05070B]/55 sm:to-transparent" />
        </div>

        {/* Delicate GPU-Smooth Drifting Damask Rose Petals Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg
            className="animate-petal-1 absolute top-6 left-[14%] w-6 h-6 text-rose-500/75 drop-shadow-[0_4px_12px_rgba(244,63,94,0.4)]"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 3C11 7 6 14 9 22c2 5 7 7 11 4 5-4 7-13 2-19-2-2-4-4-6-4z" />
          </svg>
          <svg
            className="animate-petal-2 absolute top-12 right-[18%] w-5 h-5 text-rose-300/70 drop-shadow-[0_4px_10px_rgba(251,113,133,0.35)]"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M18 4C12 6 5 13 8 21c2 6 8 7 12 3 5-5 6-14 1-19-1-1-2-1-3-1z" />
          </svg>
          <svg
            className="animate-petal-3 hidden sm:block absolute top-8 left-[58%] w-7 h-7 text-rose-600/65"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M15 2C10 6 4 14 8 23c3 6 9 6 13 2 5-5 5-15 0-20-2-2-4-3-6-3z" />
          </svg>
        </div>

        {/* Hero Typography & Actions */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-amber-400/35 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-amber-200 font-semibold">
                Haute Parfumerie • Grasse, France
              </span>
            </div>

            <h1 className="font-serif text-[2.45rem] sm:text-5xl lg:text-6xl font-light text-white leading-[1.04] tracking-tight">
              Liquid Gold &amp; <br />
              <span className="italic text-amber-300">Damask Rose Petals</span>
            </h1>

            <p className="text-xs sm:text-base text-gray-200 font-light leading-relaxed max-w-md">
              Rare 35–38% Extrait de Parfum creations blending wild Cambodian agarwood, midnight rose petals, and warm Bourbon amber.
            </p>

            <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-4 pt-1">
              <Link
                href="/scent-finder"
                className="px-4 sm:px-7 py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-all shadow-lg text-center whitespace-nowrap"
              >
                Scent Finder Quiz
              </Link>
              <a
                href="#perfume-collection"
                className="px-4 sm:px-7 py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium border border-white/25 text-white rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-all backdrop-blur-md text-center whitespace-nowrap"
              >
                View Extraits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Filtered Perfume Collection */}
      <div id="perfume-collection">
        <CategoryCollectionFeed
          categoryId="perfume"
          departmentLabel="Haute Parfumerie"
          sectionEyebrow="The Fragrance Vault"
          sectionTitle="Artisanal"
          sectionAccent="Perfumes"
          subcategories={[
            { id: null, label: 'All Extraits' },
            { id: 'mens', label: "Men's Perfume" },
            { id: 'womens', label: "Women's Perfume" },
          ]}
          emptyTitle="New Floral & Oud Extraits Curating"
          emptyDescription={`Maison ${BRAND_NAME} is bottling rare Grasse parfums for this season. Take our 60-second scent consultation while the collection launches.`}
          emptyActionHref="/scent-finder"
          emptyActionLabel="Take Scent Finder Quiz"
        />
      </div>

      {/* 3. Interactive Olfactory Atelier, 360° Studio & Live Flacon Engraving */}
      <div id="engraving">
        <LabsShowcase />
      </div>

      {/* 4. Botanical Craftsmanship Highlights (2x2 Mobile Grid) */}
      <section className="py-12 sm:py-20 bg-[#080C14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              Olfactory Alchemy
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
              Crafted With <span className="italic text-amber-300">Noble Botanicals</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {PERFUME_PILLARS.map((item) => (
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
