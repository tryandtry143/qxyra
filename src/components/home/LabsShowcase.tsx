'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME } from '@/lib/constants';
import { FlaconViewer360 } from '@/components/product/FlaconViewer360';

const notesData = {
  top: {
    title: 'Top Notes (The Prelude)',
    duration: '0 - 15 Minutes',
    description: 'The luminous opening impression upon vaporization.',
    items: [
      { name: 'Calabrian Bergamot', origin: 'Southern Italy', desc: 'Sun-drenched, crisp citrus sparkle that awakens the senses.' },
      { name: 'Pink Peppercorn', origin: 'Madagascar', desc: 'Vibrant, effervescent spice with aromatic rosaceous undertones.' },
      { name: 'Davana Bloom', origin: 'India', desc: 'Fruity, intoxicating herbal nectar that warms upon touch.' },
    ],
  },
  heart: {
    title: 'Heart Notes (The Signature)',
    duration: '15 Min - 4 Hours',
    description: 'The voluptuous emotional core that defines your personal sillage.',
    items: [
      { name: 'Smoked Crimson Saffron', origin: 'Kashmir', desc: 'Precious hand-picked crimson threads with rich, smoky leather nuances.' },
      { name: 'Bulgarian Damask Rose', origin: 'Valley of Roses', desc: 'Harvested at dawn; an opulent, velvety floral depth.' },
      { name: 'Omani Frankincense Resin', origin: 'Dhofar', desc: 'Ancient sacred tears that lend mystical, meditative warmth.' },
    ],
  },
  base: {
    title: 'Base Notes (The Memory)',
    duration: '4 - 24+ Hours',
    description: 'The profound, magnetic foundation lingering on cashmere and skin.',
    items: [
      { name: 'Cambodian Agarwood (Oud)', origin: 'Koh Kong', desc: '20-year naturally aged wild resin; animalic, dark, and royal.' },
      { name: 'Bourbon Amber & Honey', origin: 'Madagascar', desc: 'Caramelized golden balsam delivering irresistible warmth.' },
      { name: 'Mysore Sandalwood', origin: 'Southern India', desc: 'Creamy, lactonic, smooth timber of unparalleled sophistication.' },
    ],
  },
};

export function LabsShowcase() {
  const [activeNoteTier, setActiveNoteTier] = useState<'top' | 'heart' | 'base'>('base');
  const [monogramText, setMonogramText] = useState('M. DE SILVA');
  const [activeRightTab, setActiveRightTab] = useState<'engraving' | '360'>('360');

  const currentTier = notesData[activeNoteTier];

  return (
    <section className="py-20 lg:py-28 bg-[#06090F] border-b border-white/10 relative overflow-hidden text-white">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
                Interactive Olfactory Atelier
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight text-white">
              The Architecture of <span className="italic text-amber-300">Nocturne Oud</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Step inside the Maison {BRAND_NAME} formulation room. Explore the rare botanical layers, inspect the 360° flacon craftsmanship, and personalize your crystal bottle.
            </p>
          </div>

          <Link
            href="/store/nocturne-oud"
            className="px-6 py-3 bg-amber-400 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 self-start md:self-auto"
          >
            Acquire Nocturne Oud ($340)
          </Link>
        </div>

        {/* Dual Interactive Experience: Left Note Pyramid | Right Interactive Studio (360 or Engraving) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: Scent Pyramid Explorer (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-[#0B101A] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Olfactory Architecture</span>
                <span className="text-xs font-mono text-amber-300">38% Pure Extrait</span>
              </div>

              {/* Tier Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#070A0F] rounded-xl border border-white/10 mb-6">
                <button
                  onClick={() => setActiveNoteTier('top')}
                  className={`py-2 px-3 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeNoteTier === 'top'
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Top Notes
                </button>
                <button
                  onClick={() => setActiveNoteTier('heart')}
                  className={`py-2 px-3 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeNoteTier === 'heart'
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Heart Notes
                </button>
                <button
                  onClick={() => setActiveNoteTier('base')}
                  className={`py-2 px-3 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeNoteTier === 'base'
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Base Notes
                </button>
              </div>

              {/* Active Tier Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif text-xl sm:text-2xl text-amber-300 font-light">{currentTier.title}</h4>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded">{currentTier.duration}</span>
                </div>
                <p className="text-xs text-gray-400 font-light">{currentTier.description}</p>
              </div>

              {/* Items in Tier */}
              <div className="space-y-3">
                {currentTier.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0F1624] border border-white/5 hover:border-amber-400/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{item.name}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded">
                        {item.origin}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-light">
              <span>Sustainably Wild-Harvested Botanicals</span>
              <span className="text-amber-400 font-medium">Certified 0% Synthetic Fixatives</span>
            </div>
          </div>

          {/* RIGHT: Studio Switcher (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Studio Mode Selector Pills */}
            <div className="flex items-center gap-2 p-1 bg-[#090D15] rounded-xl border border-white/10 self-start">
              <button
                type="button"
                onClick={() => setActiveRightTab('360')}
                className={`px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer ${
                  activeRightTab === '360'
                    ? 'bg-amber-400 text-black font-semibold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🔄 360° Flacon Studio
              </button>
              <button
                type="button"
                onClick={() => setActiveRightTab('engraving')}
                className={`px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer ${
                  activeRightTab === 'engraving'
                    ? 'bg-amber-400 text-black font-semibold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ✨ Live Flacon Engraving
              </button>
            </div>

            {/* TAB 1: 360 Flacon Studio */}
            {activeRightTab === '360' ? (
              <FlaconViewer360 className="h-full flex flex-col justify-between" />
            ) : (
              /* TAB 2: Live Personalized Monogramming */
              <div className="rounded-3xl bg-[#0B101A] border border-amber-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-full shadow-2xl">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                    <span className="text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">Atelier Monogram</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Complimentary</span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl text-white font-light mb-2">
                    Personalized Bottle Engraving
                  </h4>
                  <p className="text-xs text-gray-400 font-light mb-6">
                    Type your name or initials to preview the laser-engraved gold leaf monogramming on your crystal flacon.
                  </p>

                  {/* Input for Monogram */}
                  <div className="space-y-2 mb-6">
                    <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">
                      Custom Flacon Inscription:
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      value={monogramText}
                      onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                      placeholder="E.G. JULIAN M."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#070A0F] border border-amber-400/40 text-amber-300 font-serif tracking-widest text-sm focus:outline-none focus:border-amber-400 uppercase placeholder:text-gray-600"
                    />
                  </div>

                  {/* Visual Simulated Flacon Display */}
                  <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#131B2A] to-[#070A0F] flex items-center justify-center p-4">
                    <Image
                      src="/images/perfume_pdp.jpg"
                      alt="Crystal Flacon with Engraving"
                      fill
                      className="object-cover opacity-60 brightness-75"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                    
                    {/* Engraved Monogram Floating Overlay */}
                    <div className="relative z-10 text-center p-4 rounded border border-amber-400/40 bg-black/70 backdrop-blur-md shadow-2xl max-w-[240px]">
                      <div className="text-[9px] uppercase tracking-[0.3em] text-amber-400 font-mono mb-1">
                        MAISON {BRAND_NAME}
                      </div>
                      <div className="text-xs font-serif text-white tracking-widest uppercase mb-1">
                        NOCTURNE OUD
                      </div>
                      <div className="py-1 px-3 border-t border-b border-amber-400/40 my-1">
                        <span className="font-serif text-sm tracking-[0.25em] text-amber-300 drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)] font-medium">
                          {monogramText || 'YOUR NAME'}
                        </span>
                      </div>
                      <div className="text-[8px] font-mono text-gray-400 tracking-widest uppercase mt-1">
                        EXTRAIT DE PARFUM • 100ML
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-light">Included with every 100ml Flacon</span>
                  <Link
                    href="/store/nocturne-oud"
                    className="text-xs uppercase tracking-[0.18em] font-semibold text-amber-300 hover:text-amber-200"
                  >
                    Order with Engraving →
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
