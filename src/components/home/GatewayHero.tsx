'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';

export function GatewayHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSoundscape = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [130.81, 196.00, 329.63, 392.00];
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
      <div className="container mx-auto px-4 lg:px-8 pt-5 pb-10 sm:pt-8 sm:pb-14 lg:pb-16">
        
        {/* Brand Headline & Ambient Sound Bar */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-amber-300 font-semibold">
                Couture • Parfumerie • Horlogerie
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

          <h1 className="font-serif text-[2.5rem] sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-2.5 sm:mb-4 leading-[1.03]">
            MAISON <span className="font-normal text-amber-300 tracking-wider drop-shadow-[0_2px_20px_rgba(217,167,74,0.3)]">{BRAND_NAME}</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-300 font-light tracking-wide max-w-md sm:max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            {BRAND_TAGLINE}. Italian tailoring, Grasse 38% crystal extraits, and collector mechanical timepieces.
          </p>

          {/* Compact 4-Pill Quick Entry Grid on Mobile -> Row on Desktop */}
          <div className="grid grid-cols-2 sm:flex items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-7 max-w-sm sm:max-w-none mx-auto">
            <Link
              href="/store"
              className="px-4 sm:px-7 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20 text-center whitespace-nowrap active:scale-97"
            >
              All Creations
            </Link>
            <Link
              href="/perfume"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-medium border border-white/20 text-white rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm text-center whitespace-nowrap active:scale-97"
            >
              Perfume
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
          </div>
        </div>

        {/* Tri-Pillar Luxury Portals: Horizontal Snap-Carousel on Mobile -> 3-Column Salon Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 -mx-4 px-4 pb-2 no-scrollbar lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl lg:mx-auto">
          
          {/* Card 1: Haute Parfumerie */}
          <Link
            href="/perfume"
            className="luxury-media-card group relative w-[82vw] sm:w-[66vw] lg:w-auto shrink-0 snap-center rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[330px] sm:min-h-[430px] lg:min-h-[460px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/perfume_floral_banner.jpg"
                alt="QXYRA Haute Parfumerie with Damask Rose Petals"
                fill
                priority
                sizes="(max-width: 1024px) 84vw, 33vw"
                className="object-cover object-center brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/45 to-black/20" />
            </div>

            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-300 bg-black/65 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                01. Parfumerie
              </span>
              <span className="text-[10px] font-mono text-gray-200 bg-black/45 px-2 py-0.5 rounded backdrop-blur-sm">Grasse, France</span>
            </div>

            <div className="relative z-10 p-5 sm:p-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1.5 font-light group-hover:text-amber-200 transition-colors leading-snug">
                Haute Parfumerie
              </h3>
              <p className="text-xs text-gray-200 font-light mb-4 line-clamp-2">
                Rose-infused botanical elixirs &amp; 38% pure crystal extraits with laser monogramming.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>Enter Perfume Maison</span>
                <span>→</span>
              </span>
            </div>
          </Link>

          {/* Card 2: Haute Couture Clothings */}
          <Link
            href="/clothings"
            className="luxury-media-card group relative w-[82vw] sm:w-[66vw] lg:w-auto shrink-0 snap-center rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[330px] sm:min-h-[430px] lg:min-h-[460px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/clothings_editorial_banner.jpg"
                alt="QXYRA Haute Couture & Tailoring Salon"
                fill
                priority
                sizes="(max-width: 1024px) 84vw, 33vw"
                className="object-cover object-center brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/45 to-black/20" />
            </div>

            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-300 bg-black/65 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                02. Couture
              </span>
              <span className="text-[10px] font-mono text-gray-200 bg-black/45 px-2 py-0.5 rounded backdrop-blur-sm">Florence, Italy</span>
            </div>

            <div className="relative z-10 p-5 sm:p-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1.5 font-light group-hover:text-amber-200 transition-colors leading-snug">
                Bespoke Clothings
              </h3>
              <p className="text-xs text-gray-200 font-light mb-4 line-clamp-2">
                Virgin wool coats, mulberry silk gowns, 450gsm hoodies &amp; 280gsm combed cotton tees.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>Enter Clothings Salon</span>
                <span>→</span>
              </span>
            </div>
          </Link>

          {/* Card 3: Haute Horlogerie Watches */}
          <Link
            href="/watches"
            className="luxury-media-card group relative w-[82vw] sm:w-[66vw] lg:w-auto shrink-0 snap-center rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[330px] sm:min-h-[430px] lg:min-h-[460px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/watch_luxury.jpg"
                alt="QXYRA Haute Horlogerie Mechanical Chronograph Watch"
                fill
                priority
                sizes="(max-width: 1024px) 84vw, 33vw"
                className="object-cover object-center brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/45 to-black/20" />
            </div>

            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-300 bg-black/65 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                03. Horlogerie
              </span>
              <span className="text-[10px] font-mono text-gray-200 bg-black/45 px-2 py-0.5 rounded backdrop-blur-sm">Geneva Craft</span>
            </div>

            <div className="relative z-10 p-5 sm:p-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1.5 font-light group-hover:text-amber-200 transition-colors leading-snug">
                Fine Timepieces
              </h3>
              <p className="text-xs text-gray-200 font-light mb-4 line-clamp-2">
                Automatic calibers, sapphire crystal chronographs, and collector heirloom dress watches.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>Enter Horology Vault</span>
                <span>→</span>
              </span>
            </div>
          </Link>

        </div>

        {/* Subtle Mobile Swipe Cue */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono">
          <span className="w-4 h-[1px] bg-amber-400/50" />
          <span>Swipe to explore all 3 houses</span>
          <span className="w-4 h-[1px] bg-amber-400/50" />
        </div>

      </div>
    </section>
  );
}
