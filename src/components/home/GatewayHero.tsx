'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface HousePortal {
  id: string;
  badge: string;
  origin: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
  shortLabel: string;
  comingSoon?: boolean;
}

const HOUSE_PORTALS: HousePortal[] = [
  {
    id: 'clothings',
    badge: '01. Couture',
    origin: 'Florence, Italy',
    title: 'Bespoke Clothings',
    description:
      'Virgin wool coats, mulberry silk gowns, 450gsm hoodies & 280gsm combed cotton tees.',
    cta: 'Enter Clothings Salon',
    href: '/clothings',
    image: '/images/clothings_editorial_banner.jpg',
    alt: 'QXYRA Haute Couture & Tailoring Salon',
    shortLabel: 'Clothings',
  },
  {
    id: 'watches',
    badge: '02. Horlogerie',
    origin: 'Geneva Craft',
    title: 'Fine Timepieces',
    description:
      'Automatic calibers, sapphire crystal chronographs, and collector heirloom dress watches.',
    cta: 'Enter Horology Vault',
    href: '/watches',
    image: '/images/watch_luxury.jpg',
    alt: 'QXYRA Haute Horlogerie Mechanical Chronograph Watch',
    shortLabel: 'Watches',
  },
  {
    id: 'perfume',
    badge: '03. Parfumerie',
    origin: 'Grasse, France',
    title: 'Haute Parfumerie',
    description:
      'Rose-infused botanical elixirs & 38% pure crystal extraits arriving soon for private premiere.',
    cta: 'View Coming Soon Preview',
    href: '/perfume',
    image: '/images/perfume_floral_banner.jpg',
    alt: 'QXYRA Haute Parfumerie with Damask Rose Petals',
    shortLabel: 'Perfume',
    comingSoon: true,
  },
];

const SLIDE_DURATION_MS = 4800;

export function GatewayHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goToNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HOUSE_PORTALS.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HOUSE_PORTALS.length) % HOUSE_PORTALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNextSlide, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused, activeSlide, goToNextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 36) {
        if (dx < 0) {
          goToNextSlide();
        } else {
          goToPrevSlide();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  const toggleSoundscape = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [130.81, 196.0, 329.63, 392.0];
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          oscGain.gain.setValueAtTime(0.015, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
        });

        setIsPlayingAudio(true);
      } catch {
        // Fallback gracefully if browser audio is blocked
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#06090F] text-white">
      {/* Dynamic Atmospheric Ambient Mist Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[350px] sm:h-[500px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-900/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Split Editorial Showcase */}
      <div className="container mx-auto px-4 lg:px-8 pt-3.5 pb-7 sm:pt-8 sm:pb-14 lg:pb-16">
        {/* Brand Headline & Ambient Sound Bar */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-amber-300 font-semibold">
                Couture • Horlogerie • Parfumerie
              </span>
            </div>

            <button
              onClick={toggleSoundscape}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 text-[9px] tracking-[0.15em] uppercase transition-all cursor-pointer text-gray-300 hover:text-amber-300 active:scale-95"
              title="Toggle Maison QXYRA Boutique Ambient Audio"
              aria-label="Toggle Boutique Soundscape"
            >
              <span>{isPlayingAudio ? '🔊' : '🔈'}</span>
              <span className="hidden sm:inline">{isPlayingAudio ? 'Sound On' : 'Ambience'}</span>
            </button>
          </div>

          <h1 className="font-serif text-[2.25rem] sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-2 sm:mb-4 leading-[1.03]">
            MAISON{' '}
            <span className="font-normal text-amber-300 tracking-wider drop-shadow-[0_2px_20px_rgba(217,167,74,0.3)]">
              {BRAND_NAME}
            </span>
          </h1>
          <p className="text-[11.5px] sm:text-base text-gray-300 font-light tracking-wide max-w-md sm:max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            {BRAND_TAGLINE}. Italian tailoring, collector mechanical timepieces, and Grasse 38% crystal extraits.
          </p>

          {/* Compact 4-Pill Quick Entry Grid on Mobile -> Row on Desktop */}
          <div className="grid grid-cols-2 sm:flex items-center justify-center gap-2 sm:gap-3 mt-3.5 sm:mt-7 max-w-sm sm:max-w-none mx-auto">
            <Link
              href="/store"
              className="px-4 sm:px-7 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20 text-center whitespace-nowrap active:scale-97"
            >
              All Creations
            </Link>
            <Link
              href="/clothings"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-medium border border-white/20 text-white rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm text-center whitespace-nowrap active:scale-97"
            >
              Clothings
            </Link>
            <Link
              href="/watches"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-medium border border-amber-400/35 text-amber-300 rounded-xl sm:rounded hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 backdrop-blur-sm text-center whitespace-nowrap active:scale-97"
            >
              Watches
            </Link>
            <Link
              href="/perfume"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium border border-rose-400/35 text-rose-200 rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm text-center whitespace-nowrap active:scale-97 inline-flex items-center justify-center gap-1.5"
            >
              <span>Perfume</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-400/30 font-mono">
                Soon
              </span>
            </Link>
          </div>
        </div>

        {/* MOBILE VIEW (< lg): Auto-Changing Smooth Cinematic Ken-Burns & Crossfade Banner Stage */}
        <div className="lg:hidden space-y-2.5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="luxury-media-card relative w-full min-h-[320px] sm:min-h-[430px] rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] shadow-2xl"
          >
            {HOUSE_PORTALS.map((portal, index) => {
              const isActive = index === activeSlide;
              const isPrev = index === (activeSlide - 1 + HOUSE_PORTALS.length) % HOUSE_PORTALS.length;

              return (
                <Link
                  key={portal.id}
                  href={portal.href}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    'group absolute inset-0 flex flex-col justify-between transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isActive
                      ? 'opacity-100 scale-100 translate-x-0 z-20 pointer-events-auto'
                      : isPrev
                      ? 'opacity-0 scale-[0.97] -translate-x-4 z-10 pointer-events-none'
                      : 'opacity-0 scale-[1.03] translate-x-4 z-0 pointer-events-none'
                  )}
                >
                  {/* Ken-Burns Smooth Scaling Background Photography */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={portal.image}
                      alt={portal.alt}
                      fill
                      priority
                      sizes="95vw"
                      className={cn(
                        'object-cover object-center transition-transform duration-[4800ms] ease-out',
                        isActive ? 'scale-100 brightness-90' : 'scale-110 brightness-75'
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06090F] via-[#06090F]/45 to-black/25" />
                  </div>

                  {/* Floating Drifting Rose Petals on Perfume Slide */}
                  {portal.comingSoon && isActive && (
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
                      <svg
                        className="animate-petal-1 absolute top-10 left-[14%] w-5 h-5 text-rose-400/75"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M16 3C11 7 6 14 9 22c2 5 7 7 11 4 5-4 7-13 2-19-2-2-4-4-6-4z" />
                      </svg>
                      <svg
                        className="animate-petal-2 absolute top-14 right-[16%] w-4 h-4 text-rose-300/70"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M18 4C12 6 5 13 8 21c2 6 8 7 12 3 5-5 6-14 1-19-1-1-2-1-3-1z" />
                      </svg>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="relative z-20 p-4 flex items-center justify-between gap-2">
                    <span className="text-[9.5px] tracking-[0.2em] uppercase font-semibold text-amber-300 bg-black/65 px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                      {portal.badge}
                    </span>

                    {portal.comingSoon ? (
                      <span className="relative overflow-hidden inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.18em] font-semibold text-rose-100 bg-rose-950/80 border border-rose-400/45 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                        <span>Coming Soon</span>
                        <span className="animate-luxury-shimmer absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-gray-200 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                        {portal.origin}
                      </span>
                    )}
                  </div>

                  {/* Bottom Typography with Staggered Smooth Reveal */}
                  <div
                    className={cn(
                      'relative z-20 p-5 pb-6 transition-all duration-700 ease-out',
                      isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'
                    )}
                  >
                    <h3 className="font-serif text-[1.75rem] text-white mb-1.5 font-light leading-tight">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-gray-200 font-light mb-4 line-clamp-2 max-w-sm">
                      {portal.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-300">
                      <span>{portal.cta}</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Interactive 3-Pillar Hairline Gold Progress Selector */}
          <div className="grid grid-cols-3 gap-2 px-0.5" role="tablist" aria-label="Maison Houses">
            {HOUSE_PORTALS.map((portal, index) => {
              const isActive = index === activeSlide;
              return (
                <button
                  key={portal.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSlide(index)}
                  className={cn(
                    'text-left py-2 px-2.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden',
                    isActive
                      ? 'bg-[#0F1522] border-amber-400/50 text-white shadow-md'
                      : 'bg-[#090D16]/70 border-white/10 text-gray-400 hover:text-gray-200'
                  )}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[9.5px] font-serif tracking-wide truncate font-medium">
                      0{index + 1} · {portal.shortLabel}
                    </span>
                    {portal.comingSoon && (
                      <span className="text-[7.5px] uppercase tracking-wider px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono shrink-0">
                        Soon
                      </span>
                    )}
                  </div>
                  <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    {isActive && (
                      <div
                        key={`progress-${activeSlide}-${isPaused ? 'paused' : 'running'}`}
                        className={cn(
                          'h-full w-full bg-gradient-to-r from-amber-300 via-amber-400 to-rose-300 rounded-full',
                          isPaused ? 'opacity-60' : 'animate-story-progress'
                        )}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP VIEW (lg+): Tri-Pillar Salon Grid with Perfume Placed 3rd */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl lg:mx-auto">
          {HOUSE_PORTALS.map((portal) => (
            <Link
              key={portal.id}
              href={portal.href}
              className="luxury-media-card group relative rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[460px]"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={portal.image}
                  alt={portal.alt}
                  fill
                  priority
                  sizes="33vw"
                  className="object-cover object-center brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/45 to-black/20" />
              </div>

              <div className="relative z-10 p-6 flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-300 bg-black/65 px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                  {portal.badge}
                </span>
                {portal.comingSoon ? (
                  <span className="relative overflow-hidden inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-semibold text-rose-100 bg-rose-950/80 border border-rose-400/45 px-3 py-1 rounded-full backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    <span>Coming Soon</span>
                    <span className="animate-luxury-shimmer absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-gray-200 bg-black/45 px-2.5 py-0.5 rounded backdrop-blur-sm">
                    {portal.origin}
                  </span>
                )}
              </div>

              <div className="relative z-10 p-6">
                <h3 className="font-serif text-3xl text-white mb-1.5 font-light group-hover:text-amber-200 transition-colors leading-snug">
                  {portal.title}
                </h3>
                <p className="text-xs text-gray-200 font-light mb-4 line-clamp-2">
                  {portal.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>{portal.cta}</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
