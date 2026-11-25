'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface FlaconViewer360Props {
  productTitle?: string;
  className?: string;
}

export function FlaconViewer360({
  productTitle = 'Nocturne Oud Extrait de Parfum',
  className = '',
}: FlaconViewer360Props) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lightingMood, setLightingMood] = useState<'amber' | 'moonlight'>('amber');
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setStartX(e.clientX);
    setRotationAngle((prev) => (prev + delta * 0.9 + 360) % 360);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const normalizedAngle = Math.round(rotationAngle);
  const lightPositionX = 50 + Math.sin((rotationAngle * Math.PI) / 180) * 35;

  return (
    <div 
      className={`rounded-2xl sm:rounded-3xl border border-amber-500/25 bg-[#090D16] p-4 sm:p-8 text-white relative overflow-hidden shadow-2xl ${className}`}
    >
      {/* Dynamic Ambient Backlight matching chosen Lighting Mood */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700 blur-[110px] opacity-35"
        style={{
          background: lightingMood === 'amber'
            ? 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 65%)'
            : 'radial-gradient(circle at 50% 50%, #60A5FA 0%, transparent 65%)'
        }}
      />

      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3.5 sm:pb-4 border-b border-white/10 relative z-10">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold block">
            Interactive Atelier 360° Studio
          </span>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-light">
            Crystal Flacon Architecture
          </h3>
        </div>

        {/* Lighting Mood Switcher */}
        <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/10 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setLightingMood('amber')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              lightingMood === 'amber'
                ? 'bg-amber-400 text-black font-semibold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Amber Dusk
          </button>
          <button
            type="button"
            onClick={() => setLightingMood('moonlight')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              lightingMood === 'moonlight'
                ? 'bg-blue-400 text-black font-semibold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Midnight Moon
          </button>
        </div>
      </div>

      {/* Main 360 Interactive Touch & Mouse Stage */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="luxury-media-card relative my-5 sm:my-8 h-64 sm:h-88 w-full flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing group rounded-xl overflow-hidden bg-[#06090F]/70 border border-white/5"
      >
        {/* Dynamic Light Sheen across Flacon */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-100 opacity-40 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${lightPositionX}% 40%, rgba(255,255,255,0.8) 0%, transparent 45%)`
          }}
        />

        {/* The Flacon Image with 3D Tilt Shift Effect */}
        <div 
          className="relative w-48 h-60 sm:w-72 sm:h-84 transition-transform duration-75 pointer-events-none"
          style={{
            transform: `perspective(1000px) rotateY(${(rotationAngle % 30) - 15}deg)`,
          }}
        >
          <Image
            src="/images/perfume_pdp.jpg"
            alt={productTitle}
            fill
            priority
            sizes="(max-width: 640px) 220px, 320px"
            className="object-contain filter contrast-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Non-overlapping Top-Right & Bottom-Left Instructions */}
        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/40 text-[10px] sm:text-[11px] font-mono text-amber-300 pointer-events-none">
          {normalizedAngle}°
        </div>

        <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/10 text-[9px] sm:text-[10px] text-gray-200 flex items-center gap-1.5 pointer-events-none">
          <span>⇄</span>
          <span className="sm:hidden">Swipe to rotate 360°</span>
          <span className="hidden sm:inline">Click & Drag to rotate 360°</span>
        </div>
      </div>

      {/* Manual Slider & Material Callouts */}
      <div className="space-y-3.5 sm:space-y-4 pt-3.5 sm:pt-4 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[10px] sm:text-xs font-mono text-gray-400">0°</span>
          <input
            type="range"
            min={0}
            max={360}
            value={normalizedAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
            aria-label="Rotate Flacon 360 Degrees"
            className="flex-1 accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
          />
          <span className="text-[10px] sm:text-xs font-mono text-gray-400">360°</span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center pt-1">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
            <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">French Crystal</span>
            <span className="text-[9px] sm:text-xs opacity-80">480g Base</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
            <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">24K Gold Cap</span>
            <span className="text-[9px] sm:text-xs opacity-80">Engraved Crest</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-gray-300">
            <span className="text-amber-400 font-serif block text-[11px] sm:text-sm leading-tight mb-0.5">Micro Atomizer</span>
            <span className="text-[9px] sm:text-xs opacity-80">Fine Mist</span>
          </div>
        </div>
      </div>
    </div>
  );
}
