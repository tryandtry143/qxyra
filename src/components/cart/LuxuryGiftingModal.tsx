'use client';

import React, { useState } from 'react';
import { BRAND_NAME } from '@/lib/constants';

interface LuxuryGiftingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGifting: (details: GiftingDetails) => void;
}

export interface GiftingDetails {
  boxStyle: string;
  ribbonColor: string;
  waxSealColor: string;
  waxInitial: string;
  recipientName: string;
  giftMessage: string;
}

export function LuxuryGiftingModal({
  isOpen,
  onClose,
  onApplyGifting,
}: LuxuryGiftingModalProps) {
  const [boxStyle, setBoxStyle] = useState<'navy' | 'obsidian'>('navy');
  const [waxColor, setWaxColor] = useState<'gold' | 'burgundy' | 'obsidian'>('gold');
  const [waxInitial, setWaxInitial] = useState('Q');
  const [recipientName, setRecipientName] = useState('DEAREST JULIAN');
  const [giftMessage, setGiftMessage] = useState(
    'May this bespoke creation bring you timeless joy and unforgettable elegance.'
  );
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyGifting({
      boxStyle: boxStyle === 'navy' ? 'Midnight Navy Velvet Coffret' : 'Obsidian Matte Coffret',
      ribbonColor: 'Brushed 24K Champagne Gold Ribbon',
      waxSealColor: waxColor,
      waxInitial: waxInitial.slice(0, 2).toUpperCase(),
      recipientName,
      giftMessage,
    });
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#090E17] border border-amber-500/30 p-6 sm:p-10 text-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
                Maison {BRAND_NAME} Atelier
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Bespoke Luxury Gifting & Packaging Suite
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-amber-400 hover:text-amber-300 flex items-center justify-center transition-colors text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Left Inputs | Right Live Unboxing Preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 overflow-y-auto pr-1">
          
          {/* LEFT: Customization Options (6 cols) */}
          <div className="md:col-span-6 space-y-5">
            {/* 1. Box Style */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                1. Select Velvet Coffret Finish:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setBoxStyle('navy')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    boxStyle === 'navy'
                      ? 'border-amber-400 bg-amber-400/10 text-white shadow'
                      : 'border-white/10 bg-[#0C121F] text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-[#0D1F38] border border-amber-400/40 mb-1.5" />
                  <div className="text-xs font-semibold">Midnight Navy Velvet</div>
                  <div className="text-[10px] text-gray-400">Signature House Fabric</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBoxStyle('obsidian')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    boxStyle === 'obsidian'
                      ? 'border-amber-400 bg-amber-400/10 text-white shadow'
                      : 'border-white/10 bg-[#0C121F] text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-black border border-amber-400/40 mb-1.5" />
                  <div className="text-xs font-semibold">Obsidian Matte Black</div>
                  <div className="text-[10px] text-gray-400">Minimalist Monolith</div>
                </button>
              </div>
            </div>

            {/* 2. Wax Seal Color & Initial */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                2. Artisan Wax Seal Stamp:
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWaxColor('gold')}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      waxColor === 'gold' ? 'scale-110 border-white' : 'border-transparent opacity-60'
                    }`}
                    style={{ backgroundColor: '#D4AF37' }}
                    title="Antique Gold Wax"
                  />
                  <button
                    type="button"
                    onClick={() => setWaxColor('burgundy')}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      waxColor === 'burgundy' ? 'scale-110 border-white' : 'border-transparent opacity-60'
                    }`}
                    style={{ backgroundColor: '#6B1426' }}
                    title="Royal Burgundy Wax"
                  />
                  <button
                    type="button"
                    onClick={() => setWaxColor('obsidian')}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      waxColor === 'obsidian' ? 'scale-110 border-white' : 'border-transparent opacity-60'
                    }`}
                    style={{ backgroundColor: '#1A1A1A' }}
                    title="Obsidian Wax"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    maxLength={2}
                    value={waxInitial}
                    onChange={(e) => setWaxInitial(e.target.value.toUpperCase())}
                    placeholder="INITIAL"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#070A0F] border border-amber-400/40 text-amber-300 font-serif text-center uppercase tracking-widest text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. Recipient Name & Message */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                3. Calligraphy Gift Card Message:
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value.toUpperCase())}
                placeholder="RECIPIENT NAME"
                className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-white/10 text-white font-serif tracking-wider text-xs focus:outline-none focus:border-amber-400 uppercase mb-2"
              />
              <textarea
                rows={3}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                maxLength={140}
                placeholder="Write your personal message..."
                className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-white/10 text-gray-200 text-xs focus:outline-none focus:border-amber-400 resize-none font-light leading-relaxed"
              />
            </div>
          </div>

          {/* RIGHT: Live Visual Unboxing Simulation (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#0F1626] to-[#070A10] shadow-2xl relative flex flex-col items-center text-center space-y-4">
              
              {/* Simulated 3D Gift Box Presentation */}
              <div 
                className={`w-48 h-40 sm:w-56 sm:h-48 rounded-2xl border border-amber-400/50 shadow-2xl relative flex items-center justify-center transition-colors duration-500 ${
                  boxStyle === 'navy' ? 'bg-[#0A1629]' : 'bg-[#0F0F12]'
                }`}
              >
                {/* Gold Stamped Ribbon Crossing */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-lg left-1/2 -translate-x-1/2" />
                <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 shadow-lg top-1/2 -translate-y-1/2" />

                {/* Wax Seal in Center */}
                <div 
                  className="relative z-10 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-2 border-amber-300 text-white font-serif font-bold text-lg select-none transition-colors duration-300"
                  style={{
                    backgroundColor:
                      waxColor === 'gold' ? '#B8860B' : waxColor === 'burgundy' ? '#6B1426' : '#141414',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.4)',
                  }}
                >
                  <span className="drop-shadow-md text-amber-200">{waxInitial || 'Q'}</span>
                </div>

                <div className="absolute bottom-2 text-[8px] font-mono tracking-widest text-amber-300/80 uppercase">
                  MAISON {BRAND_NAME}
                </div>
              </div>

              {/* Calligraphy Card Preview */}
              <div className="w-full p-4 rounded-xl bg-[#F9F8F5] text-stone-900 shadow-xl border border-stone-300 text-left space-y-1 relative">
                <div className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-mono">
                  To: <span className="font-serif font-bold text-stone-900">{recipientName || 'RECIPIENT'}</span>
                </div>
                <p className="font-serif italic text-xs text-stone-800 leading-relaxed pt-1">
                  &ldquo;{giftMessage || 'Your message here...'}&rdquo;
                </p>
                <div className="text-[8px] uppercase tracking-widest text-amber-800 font-mono text-right pt-1">
                  Compliments of Maison {BRAND_NAME}
                </div>
              </div>

              <div className="text-[11px] text-gray-400 font-light">
                Hand-packed with scented tissue, black velvet ribbon, and seal.
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            <span className="text-amber-400 font-semibold">Complimentary</span> on orders over $250 (or $25)
          </div>
          <button
            onClick={handleApply}
            className="px-6 py-3 bg-amber-400 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            {applied ? '✓ Packaging Added to Bag' : 'Save Packaging Selection'}
          </button>
        </div>
      </div>
    </div>
  );
}
