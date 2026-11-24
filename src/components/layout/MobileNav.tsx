'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { BRAND_NAME } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);
  const [clothingsExpanded, setClothingsExpanded] = useState(true);
  const [perfumeExpanded, setPerfumeExpanded] = useState(true);

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
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[85vw] max-w-sm bg-[#070A0F] text-white border-r border-white/10 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link href="/" onClick={onClose} className="hover:opacity-90 transition-opacity">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Quick Pillar Jump Banners */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/store?category=clothings"
              onClick={onClose}
              className="p-3 rounded-xl bg-[#0D121D] border border-amber-500/30 text-center text-amber-300 font-medium hover:bg-black transition-colors"
            >
              🧥 Clothings
            </Link>
            <Link
              href="/store?category=perfume"
              onClick={onClose}
              className="p-3 rounded-xl bg-[#0D121D] border border-amber-500/30 text-center text-amber-300 font-medium hover:bg-black transition-colors"
            >
              ✨ Perfume
            </Link>
          </div>

          {/* 1. CLOTHINGS ACCORDION */}
          <div className="space-y-2 border-b border-white/10 pb-5">
            <div 
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => setClothingsExpanded(!clothingsExpanded)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🧥</span>
                <span className="font-serif text-base font-light text-white">Clothings</span>
                <span className="text-[9px] bg-amber-400/15 text-amber-300 px-1.5 py-0.2 rounded font-mono uppercase">Apparel</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{clothingsExpanded ? '▲' : '▼'}</span>
            </div>

            {clothingsExpanded && (
              <div className="pl-6 space-y-2 pt-1 text-xs">
                <div className="pl-3 space-y-2 border-l border-amber-500/30">
                  <Link 
                    href="/store?category=clothings&sub=mens" 
                    onClick={onClose} 
                    className="block text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    • Men&apos;s Tailoring & Coats
                  </Link>
                  <Link 
                    href="/store?category=clothings&sub=womens" 
                    onClick={onClose} 
                    className="block text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    • Women&apos;s Gowns & Outerwear
                  </Link>
                  <Link 
                    href="/store?category=clothings&sub=hoodies" 
                    onClick={onClose} 
                    className="flex items-center justify-between text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    <span>• Luxury Hoodies (450gsm)</span>
                    <span className="text-[8px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-bold uppercase">Trending</span>
                  </Link>
                  <Link 
                    href="/store?category=clothings&sub=tshirts" 
                    onClick={onClose} 
                    className="block text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    • Designer T-Shirts (280gsm)
                  </Link>
                  <Link 
                    href="/store?category=clothings" 
                    onClick={onClose} 
                    className="block text-amber-400 hover:underline py-1 font-medium"
                  >
                    View All Clothings →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 2. PERFUME ACCORDION */}
          <div className="space-y-2 border-b border-white/10 pb-5">
            <div 
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => setPerfumeExpanded(!perfumeExpanded)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">✨</span>
                <span className="font-serif text-base font-light text-white">Perfume</span>
                <span className="text-[9px] bg-amber-400/15 text-amber-300 px-1.5 py-0.2 rounded font-mono uppercase">Extraits</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{perfumeExpanded ? '▲' : '▼'}</span>
            </div>

            {perfumeExpanded && (
              <div className="pl-6 space-y-2 pt-1 text-xs">
                <div className="pl-3 space-y-2 border-l border-amber-500/30">
                  <Link 
                    href="/store?category=perfume&sub=mens" 
                    onClick={onClose} 
                    className="block text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    • Men&apos;s Perfume (Nocturne Oud, Santal)
                  </Link>
                  <Link 
                    href="/store?category=perfume&sub=womens" 
                    onClick={onClose} 
                    className="block text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    • Women&apos;s Perfume (Ambér Impérial, Velvet Rose)
                  </Link>
                  <Link 
                    href="/scent-finder" 
                    onClick={onClose} 
                    className="flex items-center justify-between text-gray-300 hover:text-amber-300 py-1 font-light"
                  >
                    <span>• Scent Finder Quiz</span>
                    <span className="text-[8px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">Interactive</span>
                  </Link>
                  <Link 
                    href="/store?category=perfume" 
                    onClick={onClose} 
                    className="block text-amber-400 hover:underline py-1 font-medium"
                  >
                    View All Perfumes →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Direct Core Links */}
          <div className="space-y-3 pt-2 text-xs">
            <Link 
              href="/store?view=lookbook" 
              onClick={onClose}
              className="flex items-center justify-between text-gray-300 hover:text-amber-300 py-2 border-b border-white/5 font-serif text-sm"
            >
              <span>Autumn / Winter Lookbook</span>
              <span className="text-xs text-amber-400">→</span>
            </Link>
            <Link 
              href="/about" 
              onClick={onClose}
              className="flex items-center justify-between text-gray-300 hover:text-amber-300 py-2 border-b border-white/5 font-serif text-sm"
            >
              <span>The Maison {BRAND_NAME} Story</span>
              <span className="text-xs text-amber-400">→</span>
            </Link>
            <Link 
              href="/contact" 
              onClick={onClose}
              className="flex items-center justify-between text-gray-300 hover:text-amber-300 py-2 border-b border-white/5 font-serif text-sm"
            >
              <span>Private Client Concierge</span>
              <span className="text-xs text-amber-400">→</span>
            </Link>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-white/10 bg-[#05070B] text-xs text-gray-400 space-y-2">
          <p className="text-white font-medium">Maison {BRAND_NAME} Concierge</p>
          <p className="text-[11px] font-light">Complimentary White-Glove Worldwide Delivery</p>
        </div>
      </div>
    </>
  );
}
