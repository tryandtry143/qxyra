'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { BRAND_NAME } from '@/lib/constants';

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setStartX(e.clientX);
    setRotationAngle((prev) => (prev + delta * 0.8 + 360) % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert angle into 3D transform perspectives and reflection shifts
  const normalizedAngle = Math.round(rotationAngle);
  const lightPositionX = 50 + Math.sin((rotationAngle * Math.PI) / 180) * 35;

  return (
    <div 
      className={`rounded-3xl border border-amber-500/25 bg-[#090D16] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl ${className}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dynamic Ambient Backlight matching chosen Lighting Mood */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700 blur-[120px] opacity-35"
        style={{
          background: lightingMood === 'amber'
            ? 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 65%)'
            : 'radial-gradient(circle at 50% 50%, #60A5FA 0%, transparent 65%)'
        }}
      />

      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold block">
            Interactive Atelier 360° Studio
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
            Crystal Flacon Architecture
          </h3>
        </div>

        {/* Lighting Mood Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setLightingMood('amber')}
            className={`px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all cursor-pointer ${
              lightingMood === 'amber'
                ? 'bg-amber-400 text-black font-semibold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ☀️ Amber Gold Dusk
          </button>
          <button
            type="button"
            onClick={() => setLightingMood('moonlight')}
            className={`px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all cursor-pointer ${
              lightingMood === 'moonlight'
                ? 'bg-blue-400 text-black font-semibold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🌙 Midnight Moon
          </button>
        </div>
      </div>

      {/* Main 360 Interactive Viewing Stage */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        className="relative my-8 sm:my-10 h-72 sm:h-96 w-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing group"
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
          className="relative w-64 h-80 sm:w-80 sm:h-96 transition-transform duration-75"
          style={{
            transform: `perspective(1000px) rotateY(${(rotationAngle % 30) - 15}deg)`,
          }}
        >
          <Image
            src="/images/perfume_pdp.jpg"
            alt={productTitle}
            fill
            priority
            className="object-contain filter contrast-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Real-time Angle Floating Pill */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-[11px] font-mono text-amber-300">
          Rotation: {normalizedAngle}°
        </div>

        {/* Drag Instruction Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] text-gray-300 flex items-center gap-2">
          <span>⇄</span>
          <span>Click & Drag to rotate 360°</span>
        </div>
      </div>

      {/* Manual Slider & Material Callouts */}
      <div className="space-y-4 pt-4 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400">0°</span>
          <input
            type="range"
            min={0}
            max={360}
            value={normalizedAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
            className="flex-1 accent-amber-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
          />
          <span className="text-xs font-mono text-gray-400">360°</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center pt-2">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
            <span className="text-amber-400 font-serif block text-sm">Faceted French Crystal</span>
            <span>480g Heavyweight Base</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
            <span className="text-amber-400 font-serif block text-sm">24K Gold Magnetic Cap</span>
            <span>Laser-Engraved Crest</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
            <span className="text-amber-400 font-serif block text-sm">Fine Particle Atomizer</span>
            <span>Ultra-Light Mist Spray</span>
          </div>
        </div>
      </div>
    </div>
  );
}
