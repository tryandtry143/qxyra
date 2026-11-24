'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/context/ThemeContext';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="19" 
    height="19" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ClothingsIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="19" 
    height="19" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={active ? "2.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  </svg>
);

const PerfumeIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="19" 
    height="19" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={active ? "2.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="6" y="8" width="12" height="14" rx="2" />
    <path d="M10 8V5a2 2 0 0 1 4 0v3" />
    <line x1="12" y1="2" x2="12" y2="4" />
  </svg>
);

const CartIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="19" 
    height="19" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const UserIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="19" 
    height="19" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      label: 'Home',
      href: '/',
      active: pathname === '/',
      icon: (active: boolean) => <HomeIcon active={active} />,
    },
    {
      label: 'Clothings',
      href: '/store?category=clothings',
      active: pathname.includes('category=clothings'),
      icon: (active: boolean) => <ClothingsIcon active={active} />,
    },
    {
      label: 'Perfume',
      href: '/store?category=perfume',
      active: pathname.includes('category=perfume') || pathname === '/scent-finder',
      icon: (active: boolean) => <PerfumeIcon active={active} />,
    },
    {
      label: 'Bag',
      href: '/cart',
      active: pathname === '/cart',
      hasCount: true,
      icon: (active: boolean) => <CartIcon active={active} />,
    },
    {
      label: 'Account',
      href: '/account',
      active: pathname.startsWith('/account'),
      icon: (active: boolean) => <UserIcon active={active} />,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className={cn(
        "fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur-xl border-t px-2 py-1.5 transition-colors duration-300",
        isLight
          ? "bg-white/95 border-stone-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.06)]"
          : "bg-[#0A0D14]/95 border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.7)]"
      )}
      style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 group",
              item.active 
                ? (isLight ? "text-amber-600 font-semibold" : "text-amber-400 font-semibold")
                : (isLight ? "text-stone-500 hover:text-stone-900" : "text-gray-400 hover:text-gray-200")
            )}
          >
            {/* Top Indicator Glow Bar for active item */}
            {item.active && (
              <span className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(217,167,74,0.8)]" />
            )}

            {/* Icon & Badges */}
            <div className="relative flex items-center justify-center w-6 h-6 my-0.5">
              {item.icon(item.active)}

              {/* Cart Count Badge */}
              {item.hasCount && mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-amber-400 text-stone-950 text-[9px] font-bold font-mono min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>

            {/* Text Label */}
            <span className="text-[10px] font-medium font-sans tracking-tight transition-colors mt-0.5">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
