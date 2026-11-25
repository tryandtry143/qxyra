'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';

export function GatewayHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Subtle luxury soundscape generator using Web Audio API (No external files needed)
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

        // Warm harmonic luxury tones (C3, G3, E4 chord)
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-900/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Floating Gold Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-amber-300 blur-[0.5px] animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.5px] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-amber-200 blur-[0.5px] animate-pulse" />
      </div>

      {/* Top Floating Luxury Audio Toggle */}
      <div className="container mx-auto px-4 lg:px-8 pt-4 flex justify-end relative z-20">
        <button
          onClick={toggleSoundscape}
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 hover:border-amber-400/50 text-[10px] tracking-widest uppercase transition-all backdrop-blur-md cursor-pointer text-gray-300 hover:text-amber-300"
          title="Toggle Maison QXYRA Boutique Ambient Audio"
        >
          <span>{isPlayingAudio ? '🔊' : '🔈'}</span>
          <span>{isPlayingAudio ? 'Maison Sound: On' : 'Ambient Soundscape: Off'}</span>
        </button>
      </div>

      {/* Main Split Editorial Showcase */}
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-16 pt-4">
        
        {/* Brand Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4 shadow-lg shadow-amber-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
              The Autumn / Winter Capsule
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-4 leading-tight">
            MAISON <span className="font-normal text-amber-300 tracking-wider drop-shadow-[0_2px_20px_rgba(217,167,74,0.3)]">{BRAND_NAME}</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-300 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            {BRAND_TAGLINE}. Timeless bespoke menswear, sculptural evening gowns, and artisanal crystal flacons distilled for the modern aesthete.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/store"
              className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold bg-amber-400 text-black rounded hover:bg-amber-300 transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-105"
            >
              Explore All Collections
            </Link>
            <Link
              href="/store?category=perfume"
              className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium border border-white/20 text-white rounded hover:border-amber-400 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm"
            >
              Haute Parfumerie (38% Extraits)
            </Link>
          </div>
        </div>

        {/* Dual Luxury Portals (Split Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Haute Parfumerie */}
          <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[440px] sm:min-h-[500px]">
            {/* Visual Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/perfume_flacon.jpg"
                alt="QXYRA Haute Parfumerie"
                fill
                priority
                className="object-cover object-center brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/60 to-transparent" />
            </div>

            {/* Card Content Top */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-amber-300 bg-black/60 px-3 py-1 rounded backdrop-blur-md border border-amber-500/30">
                01. Olfactory House
              </span>
              <span className="text-xs font-mono text-gray-300">Grasse, France</span>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-6 sm:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 font-light group-hover:text-amber-200 transition-colors">
                Haute Parfumerie & Niche Extraits
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light mb-5 max-w-md line-clamp-2">
                Hand-poured 38% concentration crystal flacons with aged Cambodian Oud, Florentine Iris, and complimentary laser monogramming.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/store?category=perfume"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform"
                >
                  <span>Discover Scents</span>
                  <span>→</span>
                </Link>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-[11px] text-gray-400">From $120 to $340</span>
              </div>
            </div>
          </div>

          {/* Card 2: Men's & Women's Haute Couture */}
          <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0C111A] transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[440px] sm:min-h-[500px]">
            {/* Visual Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/wool_trench.jpg"
                alt="QXYRA Haute Couture & Tailoring"
                fill
                priority
                className="object-cover object-center brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/60 to-transparent" />
            </div>

            {/* Card Content Top */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-amber-300 bg-black/60 px-3 py-1 rounded backdrop-blur-md border border-amber-500/30">
                02. Haute Couture
              </span>
              <span className="text-xs font-mono text-gray-300">Florence, Italy</span>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-6 sm:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 font-light group-hover:text-amber-200 transition-colors">
                Bespoke Menswear & Women&apos;s Silhouettes
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light mb-5 max-w-md line-clamp-2">
                Italian virgin melton wool trench coats, unlined Mongolian cashmere cocoon capes, and fluid obsidian silk evening gowns.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/store?category=clothings&sub=mens"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>Men&apos;s Tailoring</span>
                  <span>→</span>
                </Link>
                <span className="text-gray-500 text-xs">|</span>
                <Link
                  href="/store?category=clothings&sub=womens"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>Women&apos;s Gowns</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
