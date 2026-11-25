'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { useTheme } from '@/context/ThemeContext';
import { BRAND_NAME } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);
  const [clothingsExpanded, setClothingsExpanded] = useState(true);
  const [perfumeExpanded, setPerfumeExpanded] = useState(true);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Haute Couture Slide Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[88vw] max-w-sm border-r shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col",
          isLight
            ? "bg-[#F9F8F6] text-slate-900 border-stone-200"
            : "bg-[#070A0F] text-white border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className={cn(
          "flex items-center justify-between px-5 py-4 border-b",
          isLight ? "border-stone-200 bg-white" : "border-white/10 bg-[#05070B]"
        )}>
          <Logo size="sm" onClick={onClose} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className={cn(
                "min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl transition-colors active:scale-95",
                isLight ? "text-slate-600 hover:text-black" : "text-gray-400 hover:text-white"
              )}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 no-scrollbar">
          
          {/* Editorial Search Bar Shortcut */}
          <Link
            href="/search"
            onClick={onClose}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-xl border text-xs transition-all",
              isLight
                ? "bg-white border-stone-200 text-slate-500 hover:border-amber-500"
                : "bg-[#0D121D] border-white/10 text-gray-400 hover:border-amber-400/50"
            )}
          >
            <span className="font-light tracking-wide">Search coats, silk, extraits...</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-amber-500 font-semibold">Search</span>
          </Link>

          {/* Dual Maison Pillars */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <Link
              href="/store?category=clothings"
              onClick={onClose}
              className={cn(
                "p-3.5 rounded-xl border text-left transition-all active:scale-98",
                isLight
                  ? "bg-white border-stone-200 hover:border-amber-500 shadow-xs"
                  : "bg-[#0B101A] border-amber-500/25 hover:border-amber-400"
              )}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-amber-500 mb-0.5">01. Atelier</span>
              <span className="font-serif text-base font-medium">Clothings</span>
            </Link>
            <Link
              href="/store?category=perfume"
              onClick={onClose}
              className={cn(
                "p-3.5 rounded-xl border text-left transition-all active:scale-98",
                isLight
                  ? "bg-white border-stone-200 hover:border-amber-500 shadow-xs"
                  : "bg-[#0B101A] border-amber-500/25 hover:border-amber-400"
              )}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-amber-500 mb-0.5">02. Grasse</span>
              <span className="font-serif text-base font-medium">Perfume</span>
            </Link>
          </div>

          {/* 1. CLOTHINGS ACCORDION */}
          <div className={cn("space-y-2 border-b pb-4", isLight ? "border-stone-200" : "border-white/10")}>
            <button 
              type="button"
              className="w-full flex items-center justify-between py-2.5 cursor-pointer text-left"
              onClick={() => setClothingsExpanded(!clothingsExpanded)}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-amber-500">01</span>
                <span className="font-serif text-lg font-light">Clothings</span>
                <span className="text-[9px] bg-amber-400/15 text-amber-500 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Apparel</span>
              </div>
              <span className="text-[10px] opacity-60 font-mono">{clothingsExpanded ? '−' : '+'}</span>
            </button>

            {clothingsExpanded && (
              <div className="pl-5 space-y-1 pt-1 text-xs">
                <div className="pl-3.5 space-y-1 border-l border-amber-500/30">
                  <Link href="/store?category=clothings&sub=mens" onClick={onClose} className="block py-2 font-light opacity-85 hover:text-amber-500">
                    Men&apos;s Tailoring & Coats
                  </Link>
                  <Link href="/store?category=clothings&sub=womens" onClick={onClose} className="block py-2 font-light opacity-85 hover:text-amber-500">
                    Women&apos;s Gowns & Outerwear
                  </Link>
                  <Link href="/store?category=clothings&sub=hoodies" onClick={onClose} className="flex items-center justify-between py-2 font-light opacity-85 hover:text-amber-500">
                    <span>Luxury Hoodies (450gsm)</span>
                    <span className="text-[8px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">New</span>
                  </Link>
                  <Link href="/store?category=clothings&sub=tshirts" onClick={onClose} className="block py-2 font-light opacity-85 hover:text-amber-500">
                    Designer T-Shirts (280gsm)
                  </Link>
                  <Link href="/store?category=clothings" onClick={onClose} className="block py-2 text-amber-500 font-medium tracking-wide">
                    Explore All Clothings →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 2. PERFUME ACCORDION */}
          <div className={cn("space-y-2 border-b pb-4", isLight ? "border-stone-200" : "border-white/10")}>
            <button 
              type="button"
              className="w-full flex items-center justify-between py-2.5 cursor-pointer text-left"
              onClick={() => setPerfumeExpanded(!perfumeExpanded)}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-amber-500">02</span>
                <span className="font-serif text-lg font-light">Perfume</span>
                <span className="text-[9px] bg-amber-400/15 text-amber-500 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Extraits</span>
              </div>
              <span className="text-[10px] opacity-60 font-mono">{perfumeExpanded ? '−' : '+'}</span>
            </button>

            {perfumeExpanded && (
              <div className="pl-5 space-y-1 pt-1 text-xs">
                <div className="pl-3.5 space-y-1 border-l border-amber-500/30">
                  <Link href="/store?category=perfume&sub=mens" onClick={onClose} className="block py-2 font-light opacity-85 hover:text-amber-500">
                    Men&apos;s Extraits (Oud & Woods)
                  </Link>
                  <Link href="/store?category=perfume&sub=womens" onClick={onClose} className="block py-2 font-light opacity-85 hover:text-amber-500">
                    Women&apos;s Extraits (Rose & Amber)
                  </Link>
                  <Link href="/scent-finder" onClick={onClose} className="flex items-center justify-between py-2 font-light opacity-85 hover:text-amber-500">
                    <span>Olfactory Scent Finder Quiz</span>
                    <span className="text-[8px] border border-amber-500/40 text-amber-500 px-1.5 py-0.5 rounded font-mono uppercase">Quiz</span>
                  </Link>
                  <Link href="/store?category=perfume" onClick={onClose} className="block py-2 text-amber-500 font-medium tracking-wide">
                    Explore All Perfumes →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Direct Core & Client Links */}
          <div className="space-y-1 pt-1 text-xs">
            <Link href="/account/wishlist" onClick={onClose} className={cn("flex items-center justify-between py-3 border-b font-serif text-base font-light", isLight ? "border-stone-200" : "border-white/5")}>
              <span>Saved Wishlist</span>
              <span className="text-xs text-amber-500">→</span>
            </Link>
            <Link href="/about" onClick={onClose} className={cn("flex items-center justify-between py-3 border-b font-serif text-base font-light", isLight ? "border-stone-200" : "border-white/5")}>
              <span>The Maison {BRAND_NAME} Story</span>
              <span className="text-xs text-amber-500">→</span>
            </Link>
            <Link href="/contact" onClick={onClose} className="flex items-center justify-between py-3 font-serif text-base font-light">
              <span>Private Client Concierge</span>
              <span className="text-xs text-amber-500">→</span>
            </Link>
          </div>

          {/* Mobile Currency Selection */}
          <div className={cn("flex items-center justify-between p-3.5 rounded-xl border", isLight ? "bg-white border-stone-200" : "bg-[#0B101A] border-white/10")}>
            <span className="text-[11px] uppercase tracking-[0.15em] font-mono opacity-75">Display Currency</span>
            <CurrencySelector showRateBadge={false} />
          </div>

        </div>

        {/* Drawer Footer */}
        <div className={cn(
          "px-5 py-4 border-t text-xs space-y-1",
          isLight ? "bg-white border-stone-200 text-slate-600" : "bg-[#05070B] border-white/10 text-gray-400"
        )}>
          <p className="font-serif text-sm font-medium text-amber-500">Maison {BRAND_NAME} Concierge</p>
          <p className="text-[11px] font-light">Complimentary Insured Worldwide Delivery</p>
        </div>
      </div>
    </>
  );
}
