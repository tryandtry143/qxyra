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
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-12 lg:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold">
                Autumn / Winter • Milan & Grasse
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

          <h1 className="font-serif text-[2.6rem] sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-2.5 sm:mb-4 leading-[1.03]">
            MAISON <span className="font-normal text-amber-300 tracking-wider drop-shadow-[0_2px_20px_rgba(217,167,74,0.3)]">{BRAND_NAME}</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-300 font-light tracking-wide max-w-md sm:max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            {BRAND_TAGLINE}. Bespoke menswear, sculptural evening silhouettes, and 38% artisanal crystal flacons.
          </p>

          {/* Compact Dual CTA Actions (Side-by-side even on Mobile!) */}
          <div className="grid grid-cols-2 sm:flex items-center justify-center gap-2.5 sm:gap-4 mt-5 sm:mt-8 max-w-sm sm:max-w-none mx-auto">
            <Link
              href="/store"
              className="px-4 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold bg-amber-400 text-black rounded-xl sm:rounded hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20 text-center whitespace-nowrap active:scale-97"
            >
              All Collections
            </Link>
            <Link
              href="/store?category=perfume"
              className="px-4 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium border border-white/20 text-white rounded-xl sm:rounded hover:border-amber-400 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm text-center whitespace-nowrap active:scale-97"
            >
              Perfume Atelier
            </Link>
          </div>
        </div>

        {/* Dual Luxury Portals: Horizontal Snap-Carousel on Mobile -> Side-by-Side Split on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 -mx-4 px-4 pb-2 no-scrollbar lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-2 lg:gap-8 max-w-6xl lg:mx-auto">
          
          {/* Card 1: Haute Parfumerie */}
          <div className="luxury-media-card group relative w-[84vw] sm:w-[70vw] lg:w-auto shrink-0 snap-center rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[340px] sm:min-h-[460px] lg:min-h-[500px]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/perfume_flacon.jpg"
                alt="QXYRA Haute Parfumerie"
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 50vw"
                className="object-cover object-center brightness-80 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/55 to-black/20" />
            </div>

            <div className="relative z-10 p-4 sm:p-8 flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold text-amber-300 bg-black/65 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                01. Olfactory House
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">Grasse, France</span>
            </div>

            <div className="relative z-10 p-5 sm:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1.5 sm:mb-2 font-light group-hover:text-amber-200 transition-colors leading-snug">
                Haute Parfumerie & Extraits
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-light mb-4 sm:mb-5 max-w-md line-clamp-2">
                Hand-poured 38% concentration crystal flacons with aged Cambodian Oud and laser monogramming.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/store?category=perfume"
                  className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform py-1"
                >
                  <span>Discover Scents</span>
                  <span>→</span>
                </Link>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-[10px] sm:text-[11px] text-gray-300 font-mono">38% Extrait</span>
              </div>
            </div>
          </div>

          {/* Card 2: Men's & Women's Haute Couture */}
          <div className="luxury-media-card group relative w-[84vw] sm:w-[70vw] lg:w-auto shrink-0 snap-center rounded-2xl overflow-hidden border border-white/15 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[340px] sm:min-h-[460px] lg:min-h-[500px]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/wool_trench.jpg"
                alt="QXYRA Haute Couture & Tailoring"
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 50vw"
                className="object-cover object-center brightness-80 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/55 to-black/20" />
            </div>

            <div className="relative z-10 p-4 sm:p-8 flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold text-amber-300 bg-black/65 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                02. Haute Couture
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">Florence, Italy</span>
            </div>

            <div className="relative z-10 p-5 sm:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1.5 sm:mb-2 font-light group-hover:text-amber-200 transition-colors leading-snug">
                Bespoke Clothings & Silhouettes
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-light mb-4 sm:mb-5 max-w-md line-clamp-2">
                Italian virgin wool coats, 450gsm heavyweight French terry hoodies, and pure mulberry silk gowns.
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  href="/store?category=clothings&sub=mens"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-white hover:text-amber-300 transition-colors py-1"
                >
                  <span>Men&apos;s</span>
                  <span>→</span>
                </Link>
                <span className="text-gray-400 text-xs">|</span>
                <Link
                  href="/store?category=clothings&sub=womens"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-white hover:text-amber-300 transition-colors py-1"
                >
                  <span>Women&apos;s</span>
                  <span>→</span>
                </Link>
                <span className="text-gray-400 text-xs">|</span>
                <Link
                  href="/store?category=clothings&sub=hoodies"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-amber-300 hover:text-amber-200 transition-colors py-1"
                >
                  <span>Hoodies</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Subtle Mobile Swipe Cue */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono">
          <span className="w-4 h-[1px] bg-amber-400/50" />
          <span>Swipe to explore divisions</span>
          <span className="w-4 h-[1px] bg-amber-400/50" />
        </div>

      </div>
    </section>
  );
}
