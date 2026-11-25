'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS, BRAND_NAME } from '@/lib/constants';
import { MobileNav } from './MobileNav';
import { Logo } from './Logo';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { useCartStore } from '@/store/cartStore';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isLight
          ? (isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm text-gray-900" : "bg-white border-b border-gray-100 text-gray-900")
          : (isScrolled ? "bg-[#070A0F]/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl text-white" : "bg-[#070A0F] border-b border-white/10 text-white")
      )}>
        {/* Luxury Top Announcement & Currency Bar */}
        <div className={cn(
          "h-8 px-3 sm:px-8 flex justify-between items-center border-b transition-colors",
          isLight 
            ? "bg-stone-100 text-stone-700 border-stone-200" 
            : "bg-[#04060A] text-amber-300/90 border-white/5"
        )}>
          <div className="flex items-center min-w-0 pr-2">
            <span className="sm:hidden text-[9px] font-medium tracking-[0.14em] uppercase truncate">
              Maison {BRAND_NAME} • Free Delivery Over $250
            </span>
            <span className="hidden sm:inline text-[11px] font-medium tracking-wider uppercase truncate">
              Maison {BRAND_NAME} • Complimentary White-Glove Worldwide Delivery on Orders Over $250
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] shrink-0">
            <span className="hidden md:inline text-[10px] uppercase tracking-widest text-amber-400/90 font-medium">
              Complimentary Flacon Engraving
            </span>
            <span className="opacity-30 hidden md:inline">|</span>
            <CurrencySelector showRateBadge={false} />
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-3 lg:flex items-center lg:justify-between h-14 sm:h-16 lg:h-20">
            {/* Mobile Left Controls: Menu + Search */}
            <div className="flex items-center gap-1 lg:hidden">
              <button 
                type="button"
                className={cn(
                  "min-w-[40px] min-h-[40px] flex items-center justify-center -ml-1.5 rounded-xl transition-colors active:scale-95",
                  isLight ? "text-slate-800 hover:text-amber-700" : "text-white hover:text-amber-400"
                )}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
              <Link 
                href="/search" 
                aria-label="Search" 
                className={cn(
                  "min-w-[38px] min-h-[38px] flex items-center justify-center rounded-xl transition-colors active:scale-95",
                  isLight ? "text-slate-700 hover:text-amber-700" : "text-gray-300 hover:text-amber-400"
                )}
              >
                <SearchIcon />
              </Link>
            </div>

            {/* Logo: Centered on Mobile, Left-aligned on Desktop */}
            <div className="flex items-center justify-center lg:justify-start flex-shrink-0">
              <div className="sm:hidden">
                <Logo size="sm" />
              </div>
              <div className="hidden sm:block">
                <Logo size="md" />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-9">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]));
                const hasChildren = link.children && link.children.length > 0;

                return (
                  <div key={link.href} className="relative group py-2">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs font-medium tracking-[0.16em] uppercase transition-all duration-200 py-1 flex items-center gap-1.5 cursor-pointer",
                        isActive
                          ? "text-amber-400 font-semibold"
                          : (isLight ? "text-stone-700 hover:text-black" : "text-gray-300 hover:text-amber-300")
                      )}
                    >
                      <span>{link.label}</span>
                      {hasChildren && (
                        <span className="text-[8px] text-gray-400 group-hover:rotate-180 transition-transform">▼</span>
                      )}
                      {link.badge && (
                        <span className="ml-1 text-[8px] tracking-widest px-1.5 py-0.5 rounded uppercase font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                          {link.badge}
                        </span>
                      )}
                      <span className={cn(
                        "absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 transition-all duration-300 group-hover:w-full",
                        isActive && "w-full"
                      )} />
                    </Link>

                    {/* Luxury Hover Dropdown Menu */}
                    {hasChildren && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                        <div className="w-80 p-3.5 rounded-2xl bg-[#0B101A]/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl space-y-1">
                          <div className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-semibold px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                            <span>{link.label} Collection</span>
                            <span className="text-[8px] font-mono text-gray-400">MAISON {BRAND_NAME}</span>
                          </div>
                          {link.children?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block p-2.5 rounded-xl hover:bg-white/5 transition-colors group/sub"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-serif text-white group-hover/sub:text-amber-300 transition-colors font-medium">
                                  {sub.label}
                                </span>
                                {sub.badge && (
                                  <span className="text-[8px] px-1.5 py-0.2 rounded font-mono uppercase bg-amber-400 text-black font-bold">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.description && (
                                <p className="text-[10px] text-gray-400 font-light mt-0.5 line-clamp-1">
                                  {sub.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Icons */}
            <div className={cn("flex items-center justify-end space-x-1 sm:space-x-4", isLight ? "text-slate-700" : "text-gray-200")}>
              <ThemeToggle />
              <Link 
                href="/search" 
                aria-label="Search" 
                className="hidden lg:flex hover:text-amber-400 transition-colors p-1.5"
              >
                <SearchIcon />
              </Link>
              <Link 
                href="/account/wishlist" 
                aria-label="Wishlist" 
                className="hidden sm:flex hover:text-amber-400 transition-colors p-1.5"
              >
                <HeartIcon />
              </Link>
              <Link 
                href="/cart" 
                aria-label="Shopping Bag" 
                className="hover:text-amber-400 transition-colors relative min-w-[38px] min-h-[38px] flex items-center justify-center rounded-xl active:scale-95"
              >
                <CartIcon />
                {mounted && cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-amber-400 text-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center font-mono shadow-md animate-in zoom-in-75">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[88px] sm:h-[96px] lg:h-[112px]" />
    </>
  );
}
