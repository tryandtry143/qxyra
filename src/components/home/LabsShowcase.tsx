'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';
import { FlaconViewer360 } from '@/components/product/FlaconViewer360';

const notesData = {
  top: {
    title: 'Top Notes (The Prelude)',
    duration: '0 - 15 Min',
    description: 'The luminous opening impression upon vaporization.',
    items: [
      { name: 'Calabrian Bergamot', origin: 'Italy', desc: 'Sun-drenched, crisp citrus sparkle that awakens the senses.' },
      { name: 'Pink Peppercorn', origin: 'Madagascar', desc: 'Vibrant, effervescent spice with aromatic rosaceous undertones.' },
      { name: 'Davana Bloom', origin: 'India', desc: 'Fruity, intoxicating herbal nectar that warms upon touch.' },
    ],
  },
  heart: {
    title: 'Heart Notes (The Signature)',
    duration: '15 Min - 4 Hrs',
    description: 'The voluptuous emotional core that defines your personal sillage.',
    items: [
      { name: 'Smoked Crimson Saffron', origin: 'Kashmir', desc: 'Precious hand-picked crimson threads with rich, smoky leather nuances.' },
      { name: 'Bulgarian Damask Rose', origin: 'Bulgaria', desc: 'Harvested at dawn; an opulent, velvety floral depth.' },
      { name: 'Omani Frankincense Resin', origin: 'Dhofar', desc: 'Ancient sacred tears that lend mystical, meditative warmth.' },
    ],
  },
  base: {
    title: 'Base Notes (The Memory)',
    duration: '4 - 24+ Hrs',
    description: 'The profound, magnetic foundation lingering on cashmere and skin.',
    items: [
      { name: 'Cambodian Agarwood (Oud)', origin: 'Koh Kong', desc: '20-year naturally aged wild resin; animalic, dark, and royal.' },
      { name: 'Bourbon Amber & Honey', origin: 'Madagascar', desc: 'Caramelized golden balsam delivering irresistible warmth.' },
      { name: 'Mysore Sandalwood', origin: 'India', desc: 'Creamy, lactonic, smooth timber of unparalleled sophistication.' },
    ],
  },
};

export function LabsShowcase() {
  const [activeNoteTier, setActiveNoteTier] = useState<'top' | 'heart' | 'base'>('base');
  const [monogramText, setMonogramText] = useState('M. DE SILVA');
  const [activeRightTab, setActiveRightTab] = useState<'engraving' | '360'>('360');

  const currentTier = notesData[activeNoteTier];

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#06090F] border-b border-white/10 relative overflow-x-clip text-white">
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-14 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
                Interactive Olfactory Atelier
              </span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-serif font-light tracking-tight text-white">
              The Architecture of <span className="italic text-amber-300">Haute Parfumerie</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Step inside the Maison {BRAND_NAME} formulation room. Explore rare botanical layers, spin the 360° crystal flacon, and preview custom laser monogramming.
            </p>
          </div>

          <Link
            href="/store?category=perfume"
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-400 text-black font-semibold text-[11px] sm:text-xs uppercase tracking-[0.18em] rounded-xl sm:rounded hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 self-start md:self-auto"
          >
            Explore Perfume Atelier
          </Link>
        </div>

        {/* Dual Interactive Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: Scent Pyramid Explorer */}
          <div className="min-w-0 lg:col-span-6 rounded-2xl bg-[#0B101A] border border-white/10 p-4 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400">Olfactory Pyramid</span>
                <span className="text-[11px] sm:text-xs font-mono text-amber-300">38% Pure Extrait</span>
              </div>

              {/* Tier Selector Buttons */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 bg-[#070A0F] rounded-xl border border-white/10 mb-5">
                <button
                  type="button"
                  onClick={() => setActiveNoteTier('top')}
                  className={`py-2 px-2 text-[10px] sm:text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeNoteTier === 'top'
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Top Notes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoteTier('heart')}
                  className={`py-2 px-2 text-[10px] sm:text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeNoteTier === 'heart'
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Heart Notes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoteTier('base')}
                  className={`py-2 px-2 text-[10px] sm:text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeNoteTier === 'base'
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Base Notes
                </button>
              </div>

              {/* Active Tier Header */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif text-lg sm:text-2xl text-amber-300 font-light">{currentTier.title}</h4>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-400 bg-white/5 px-2 py-0.5 sm:py-1 rounded shrink-0">{currentTier.duration}</span>
                </div>
                <p className="text-xs text-gray-400 font-light">{currentTier.description}</p>
              </div>

              {/* Items in Tier */}
              <div className="space-y-2.5 sm:space-y-3">
                {currentTier.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[#0F1624] border border-white/5 hover:border-amber-400/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-white">{item.name}</span>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-300/85 bg-amber-400/10 px-2 py-0.5 rounded shrink-0">
                        {item.origin}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 sm:pt-6 mt-5 sm:mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-400 font-light">
              <span>Wild-Harvested Botanicals</span>
              <span className="text-amber-400 font-medium">0% Synthetic Fixatives</span>
            </div>
          </div>

          {/* RIGHT: Studio Switcher */}
          <div className="min-w-0 lg:col-span-6 flex flex-col justify-between space-y-3.5 sm:space-y-4">
            
            {/* Studio Mode Selector Pills */}
            <div className="grid grid-cols-2 sm:inline-flex items-center gap-1.5 p-1 bg-[#090D15] rounded-xl border border-white/10 w-full sm:w-auto sm:self-start">
              <button
                type="button"
                onClick={() => setActiveRightTab('360')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeRightTab === '360'
                    ? 'bg-amber-400 text-black font-semibold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                360° Flacon Studio
              </button>
              <button
                type="button"
                onClick={() => setActiveRightTab('engraving')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeRightTab === 'engraving'
                    ? 'bg-amber-400 text-black font-semibold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Flacon Engraving
              </button>
            </div>

            {/* TAB 1: 360 Flacon Studio */}
            {activeRightTab === '360' ? (
              <FlaconViewer360
                monogramText={monogramText}
                className="h-full flex flex-col justify-between"
              />
            ) : (
              /* TAB 2: Live Personalized 3D Monogramming */
              <div className="rounded-2xl sm:rounded-3xl bg-[#0B101A] border border-amber-500/20 p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden h-full shadow-2xl space-y-4">
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">
                      Atelier Monogram
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
                      Live on 3D Flacon
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl text-white font-light mb-1">
                      Personalized 3D Bottle Engraving
                    </h4>
                    <p className="text-xs text-gray-400 font-light">
                      Type your initials below to watch gold-leaf laser engraving render live on the 3D crystal bottle.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-300 font-medium block">
                      Custom Flacon Inscription:
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      value={monogramText}
                      onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                      placeholder="E.G. JULIAN M."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#070A0F] border border-amber-400/40 text-amber-300 font-serif tracking-widest text-sm focus:outline-none focus:border-amber-400 uppercase placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Live 3D Crystal Bottle showing engraved inscription directly on the 3D plaque */}
                <FlaconViewer360 monogramText={monogramText} compact />

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs text-gray-400 font-light">Included on 100ml Flacons</span>
                  <Link
                    href="/scent-finder"
                    className="text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold text-amber-300 hover:text-amber-200 whitespace-nowrap"
                  >
                    Find Your Scent →
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
