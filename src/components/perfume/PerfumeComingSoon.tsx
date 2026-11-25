'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants';
import { CategoryCollectionFeed } from '@/components/store/CategoryCollectionFeed';

interface UpcomingChapter {
  number: string;
  title: string;
  notes: string;
  concentration: string;
  mood: string;
}

const UPCOMING_CHAPTERS: UpcomingChapter[] = [
  {
    number: 'N° 01',
    title: 'Damask Rose & Royal Oud',
    notes: 'Midnight Damask Rose Petals • Cambodian Oud • Saffron',
    concentration: '38% Pure Extrait',
    mood: 'Velvet Floral Noir',
  },
  {
    number: 'N° 02',
    title: 'Amber Nocturne Elixir',
    notes: 'Warm Bourbon Amber • Frankincense • Roasted Tonka',
    concentration: '36% Pure Extrait',
    mood: 'Golden Resinous',
  },
  {
    number: 'N° 03',
    title: 'Florentine Iris Blanc',
    notes: 'Orris Butter • Sicilian Bergamot • White Musk',
    concentration: '35% Pure Extrait',
    mood: 'Luminous Silk',
  },
];

const WAITLIST_STORAGE_KEY = 'qxyra_perfume_waitlist';

export function PerfumeComingSoon() {
  const [mounted, setMounted] = useState(false);
  const [contactInput, setContactInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const products = useProductStore((s) => s.products);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(WAITLIST_STORAGE_KEY);
      if (saved) {
        setIsSubscribed(true);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const perfumeProducts = useMemo(
    () => products.filter((p) => p.isActive && p.categoryId === 'perfume'),
    [products]
  );

  if (mounted && perfumeProducts.length > 0) {
    return (
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
        emptyDescription={`Maison ${BRAND_NAME} is bottling rare Grasse parfums for this season.`}
        emptyActionHref="/scent-finder"
        emptyActionLabel="Take Scent Finder Quiz"
      />
    );
  }

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    try {
      window.localStorage.setItem(
        WAITLIST_STORAGE_KEY,
        JSON.stringify({ contact: contactInput.trim(), timestamp: new Date().toISOString() })
      );
    } catch {
      // Ignore storage access errors
    }
    setIsSubscribed(true);
    setContactInput('');
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Maison ${BRAND_NAME} Concierge, please notify me with private premiere access when the Haute Parfumerie Perfume Collection launches.`
  )}`;

  return (
    <section
      id="coming-soon-vault"
      className={cn(
        'relative py-12 sm:py-20 overflow-hidden border-b transition-colors',
        isLight ? 'bg-[#F9F8F6] border-stone-200' : 'bg-[#070A0F] border-white/10'
      )}
    >
      {/* Atmospheric Rose & Amber Breathing Halo */}
      <div
        aria-hidden="true"
        className="animate-aura-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[680px] h-[320px] sm:h-[440px] rounded-full bg-gradient-to-tr from-rose-500/15 via-amber-400/10 to-transparent blur-[110px] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Luxury Frosted Coming Soon Hero Veil Card */}
        <div
          className={cn(
            'relative overflow-hidden rounded-3xl border p-6 sm:p-12 text-center shadow-2xl transition-colors',
            isLight
              ? 'bg-white/90 border-amber-500/30 shadow-stone-200/70'
              : 'bg-gradient-to-b from-[#0E1320]/95 via-[#090D16]/95 to-[#06090F]/95 border-amber-400/30 backdrop-blur-xl'
          )}
        >
          {/* Metallic Gold Shimmer Light Sweep */}
          <div
            aria-hidden="true"
            className="animate-luxury-shimmer absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-transparent via-amber-300/10 to-transparent pointer-events-none"
          />

          {/* Subtle Drifting Rose Petals Inside the Showcase */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <svg
              className="animate-petal-1 absolute top-4 left-[10%] w-4 h-4 text-rose-400/50"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 3C11 7 6 14 9 22c2 5 7 7 11 4 5-4 7-13 2-19-2-2-4-4-6-4z" />
            </svg>
            <svg
              className="animate-petal-2 absolute top-6 right-[12%] w-4 h-4 text-rose-300/45"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M18 4C12 6 5 13 8 21c2 6 8 7 12 3 5-5 6-14 1-19-1-1-2-1-3-1z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
            {/* Pulsing Premiere Seal */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/75 border border-rose-400/40 text-rose-100 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-300" />
              </span>
              <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] font-semibold">
                Coming Soon • Private Maceration
              </span>
            </div>

            <h2
              className={cn(
                'font-serif text-3xl sm:text-5xl font-light tracking-tight leading-tight',
                isLight ? 'text-slate-900' : 'text-white'
              )}
            >
              La Première{' '}
              <span className="italic text-amber-400">Parfumerie</span> Reveal
            </h2>

            <p
              className={cn(
                'text-xs sm:text-base font-light leading-relaxed max-w-xl mx-auto',
                isLight ? 'text-slate-600' : 'text-gray-300'
              )}
            >
              Our artisanal Damask rose &amp; aged oud Extraits are currently aging in Grasse oak &amp; crystal vessels before opening for acquisition.
              Reserve your name on our private launch guestlist below.
            </p>

            {/* VIP Early-Access Form OR Confirmed Badge */}
            {isSubscribed ? (
              <div className="mt-4 inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs sm:text-sm font-medium">
                <span className="flex items-center gap-2">
                  <span>✓</span>
                  <span>You&apos;re registered for Maison {BRAND_NAME} Premiere Perfume Access.</span>
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleWaitlistSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md mx-auto pt-2"
              >
                <input
                  type="text"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  placeholder="Email or WhatsApp number..."
                  aria-label="Email or WhatsApp number for perfume launch alert"
                  required
                  className={cn(
                    'flex-1 px-4 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors',
                    isLight
                      ? 'bg-stone-50 border-stone-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500'
                      : 'bg-black/60 border-white/15 text-white placeholder:text-gray-500 focus:border-amber-400'
                  )}
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[11px] uppercase tracking-[0.18em] font-semibold transition-all shadow-lg shadow-amber-500/20 cursor-pointer whitespace-nowrap active:scale-97"
                >
                  Notify Me
                </button>
              </form>
            )}

            <div className="pt-1 flex items-center justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors',
                  isLight ? 'text-amber-700 hover:text-amber-600' : 'text-amber-300 hover:text-amber-200'
                )}
              >
                <span>Or Reserve VIP Alert via WhatsApp Concierge</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Frosted Upcoming Scent Chapters Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-[0.24em] text-amber-400 font-semibold font-mono">
              Preview · Upcoming Premiere Editions
            </span>
            <span className={cn('text-[10px] font-mono', isLight ? 'text-slate-500' : 'text-gray-400')}>
              3 Signature Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
            {UPCOMING_CHAPTERS.map((chapter) => (
              <div
                key={chapter.number}
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-5 space-y-3 transition-all',
                  isLight
                    ? 'bg-white border-stone-200 shadow-sm'
                    : 'bg-[#0B101C]/80 border-white/10 hover:border-amber-400/35'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-amber-400 font-semibold">{chapter.number}</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-400/30 font-mono">
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-1">
                  <h3
                    className={cn(
                      'font-serif text-lg sm:text-xl font-light',
                      isLight ? 'text-slate-900' : 'text-white'
                    )}
                  >
                    {chapter.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    {chapter.notes}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-300/90">{chapter.concentration}</span>
                  <span className="text-gray-400">{chapter.mood}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
