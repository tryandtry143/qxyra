'use client';

import { useState } from 'react';
import { BRAND_NAME, WHATSAPP_NUMBER, WHATSAPP_DISPLAY_NUMBER } from '@/lib/constants';

export function WhatsAppFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);

  const defaultMsg = encodeURIComponent(
    `Hello Maison ${BRAND_NAME} Concierge! I would like private assistance with Clothings, Perfumes, sizing, or flacon engraving.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;

  return (
    <aside aria-label="Maison QXYRA Private Client Concierge" className="fixed bottom-[82px] right-3.5 sm:bottom-8 sm:right-8 z-30 flex items-center gap-3">
      {/* Tooltip Card on Desktop Hover */}
      <div
        className={`hidden sm:flex flex-col bg-[#0D131F] text-white border border-amber-500/30 shadow-2xl rounded-2xl p-3 text-xs transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-amber-300 font-serif tracking-wide text-xs">Maison {BRAND_NAME} Concierge</span>
        </div>
        <p className="text-gray-200 font-light">Private styling &amp; fragrance consultation</p>
        <span className="text-gray-400 font-mono text-[10px] mt-0.5">{WHATSAPP_DISPLAY_NUMBER}</span>
      </div>

      {/* Sleek Luxury Concierge Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Maison ${BRAND_NAME} Concierge on WhatsApp`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="luxury-media-card group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#0D1520]/95 border border-amber-400/50 text-amber-300 shadow-[0_8px_28px_rgba(0,0,0,0.65)] backdrop-blur-xl hover:border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Live Emerald Status Dot */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0D1520] rounded-full" />
      </a>
    </aside>
  );
}
