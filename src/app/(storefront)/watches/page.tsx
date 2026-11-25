import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';
import { CategoryCollectionFeed } from '@/components/store/CategoryCollectionFeed';

export const metadata: Metadata = {
  title: `Haute Horlogerie — Luxury Watches & Timepieces | ${BRAND_NAME}`,
  description:
    'Discover Maison QXYRA fine timepieces: precision automatic calibers, sapphire crystal chronographs, and sculpted 18K champagne gold dress watches.',
};

const HOROLOGY_SPECS = [
  {
    num: '01',
    title: 'Sapphire Crystal',
    desc: 'Scratch-proof anti-reflective domed sapphire protecting every architectural dial.',
  },
  {
    num: '02',
    title: 'Precision Calibers',
    desc: 'Automatic self-winding and chronograph movements calibrated for lifelong accuracy.',
  },
  {
    num: '03',
    title: 'Sculpted Alloys',
    desc: 'Brushed champagne gold-tone cases paired with hand-stitched alligator & steel straps.',
  },
  {
    num: '04',
    title: 'Vault Presentation',
    desc: 'Delivered in an heirloom collector box with authenticity certificate and care kit.',
  },
];

export default function WatchesPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#070A0F] text-white">
      
      {/* 1. Haute Horlogerie Precision Vault Hero */}
      <section className="luxury-media-card relative min-h-[68svh] sm:min-h-[580px] flex items-end sm:items-center overflow-hidden border-b border-amber-500/20 bg-[#05070B]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/watch_luxury.jpg"
            alt={`Maison ${BRAND_NAME} Luxury Mechanical Chronograph Timepiece`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/55 to-black/30 sm:bg-gradient-to-r sm:from-[#05070B]/92 sm:via-[#05070B]/55 sm:to-transparent" />
        </div>

        {/* Subtle Architectural Horological Dial Ring Motif */}
        <div
          className="absolute -right-24 sm:-right-16 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] pointer-events-none opacity-25 z-10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-amber-300 animate-dial-slow"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="100" cy="100" r="92" strokeWidth="0.6" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="78" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="58" strokeWidth="0.4" strokeDasharray="1 10" />
          </svg>
        </div>

        {/* Hero Copy */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/65 border border-amber-400/35 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-amber-300 font-semibold">
                Haute Horlogerie • Precision Vault
              </span>
            </div>

            <h1 className="font-serif text-[2.45rem] sm:text-5xl lg:text-6xl font-light text-white leading-[1.04] tracking-tight">
              Eternal Mastery <br />
              <span className="italic text-amber-300">Measured In Gold</span>
            </h1>

            <p className="text-xs sm:text-base text-gray-200 font-light leading-relaxed max-w-md">
              Automatic mechanical movements, brushed champagne chronographs, and slimline dress timepieces designed for discerning collectors.
            </p>

            {/* Quick Sub-Department Pills */}
            <div className="grid grid-cols-2 sm:flex flex-wrap items-center gap-2 pt-1">
              <Link
                href="/watches?sub=mens"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-colors text-center"
              >
                Men&apos;s Watches
              </Link>
              <Link
                href="/watches?sub=womens"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium border border-white/25 text-white rounded-xl sm:rounded hover:border-amber-400 backdrop-blur-md text-center"
              >
                Women&apos;s Watches
              </Link>
              <Link
                href="/watches?sub=automatic"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium border border-white/20 text-gray-200 rounded-xl sm:rounded hover:border-amber-400 backdrop-blur-md text-center"
              >
                Automatic
              </Link>
              <Link
                href="/watches?sub=chronograph"
                className="px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium border border-white/20 text-gray-200 rounded-xl sm:rounded hover:border-amber-400 backdrop-blur-md text-center"
              >
                Chronographs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Filtered Watches Collection */}
      <CategoryCollectionFeed
        categoryId="watches"
        departmentLabel="Haute Horlogerie"
        sectionEyebrow="Collector Archive"
        sectionTitle="Fine"
        sectionAccent="Timepieces"
        subcategories={[
          { id: null, label: 'All Timepieces' },
          { id: 'mens', label: "Men's Watches" },
          { id: 'womens', label: "Women's Watches" },
          { id: 'automatic', label: 'Automatic' },
          { id: 'chronograph', label: 'Chronograph' },
        ]}
        emptyTitle="Timepiece Vault Curating"
        emptyDescription={`Maison ${BRAND_NAME} is calibrating our inaugural mechanical and chronograph watch series. Exclusive timepieces will arrive shortly.`}
        emptyActionHref="/store"
        emptyActionLabel="Browse Mixed Gallery"
      />

      {/* 3. Horological Standards Grid */}
      <section className="py-12 sm:py-20 bg-[#080C14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              Architectural Calibers
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
              Precision Without <span className="italic text-amber-300">Compromise</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {HOROLOGY_SPECS.map((item) => (
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
