'use client';

import React from 'react';
import Link from 'next/link';
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  STORE_ADDRESS,
  SUPPORT_EMAIL,
} from '@/lib/constants';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#05070B] text-white pt-12 sm:pt-20 pb-36 lg:pb-10 border-t border-white/10 font-sans">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* VIP Circle Newsletter Banner */}
        <div className="mb-10 sm:mb-16 p-5 sm:p-10 rounded-2xl bg-[#090D14] border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
              The {BRAND_NAME} Private Client Society
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Private Olfactory Previews & Haute Lookbooks
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light max-w-md">
              Receive private invitations to limited-batch perfume drops, private tailoring trunk shows, and complimentary seasonal gift sets.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row w-full md:w-auto max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-black/60 border border-white/15 text-white px-4 py-3 text-xs rounded focus:outline-none focus:border-amber-400 flex-grow placeholder:text-gray-500 font-light"
              required
            />
            <button 
              type="submit" 
              className="bg-amber-400 text-black font-semibold px-6 py-3 text-xs uppercase tracking-[0.18em] rounded hover:bg-amber-300 transition-colors whitespace-nowrap shadow-md cursor-pointer"
            >
              Request Access
            </button>
          </form>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 pb-14 border-b border-white/10">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="col-span-2 space-y-4 sm:space-y-5">
            <Logo size="md" />
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-light">
              {BRAND_TAGLINE}. An independent luxury house celebrating the union of Italian sartorial excellence and French haute parfumerie.
            </p>
            <div className="space-y-1 text-xs text-gray-400 font-light pt-2">
              <p className="text-white font-medium">Flagship Maison:</p>
              <p>{STORE_ADDRESS}</p>
              <p className="pt-1">Concierge: <span className="text-amber-300">{SUPPORT_EMAIL}</span></p>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {FOOTER_LINKS.map((col, idx) => (
            <div key={idx} className="space-y-3.5">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      className="text-xs text-gray-400 hover:text-amber-300 transition-colors font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} {BRAND_NAME} Luxury Group. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {SOCIAL_LINKS.map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-300 transition-colors uppercase tracking-wider text-[11px]"
              >
                {soc.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
