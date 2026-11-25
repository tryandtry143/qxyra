'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/context/ThemeContext';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.6" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ClothingsIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.6" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  </svg>
);

const PerfumeIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.6" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="12" height="14" rx="2" />
    <path d="M10 8V5a2 2 0 0 1 4 0v3" />
    <line x1="12" y1="2" x2="12" y2="4" />
  </svg>
);

const WatchIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="6" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.18" : "0"} />
    <polyline points="12 9.5 12 12 13.8 13" />
    <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
  </svg>
);

const CartIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.6" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

function MobileBottomNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
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
      label: 'Maison',
      href: '/',
      active: pathname === '/',
      icon: (active: boolean) => <HomeIcon active={active} />,
    },
    {
      label: 'Clothings',
      href: '/clothings',
      active: pathname === '/clothings' || (pathname.startsWith('/store') && category === 'clothings'),
      icon: (active: boolean) => <ClothingsIcon active={active} />,
    },
    {
      label: 'Perfume',
      href: '/perfume',
      active: pathname === '/perfume' || (pathname.startsWith('/store') && category === 'perfume') || pathname === '/scent-finder',
      icon: (active: boolean) => <PerfumeIcon active={active} />,
    },
    {
      label: 'Watches',
      href: '/watches',
      active: pathname === '/watches' || pathname === '/watch' || (pathname.startsWith('/store') && category === 'watches'),
      icon: (active: boolean) => <WatchIcon active={active} />,
    },
    {
      label: 'Bag',
      href: '/cart',
      active: pathname === '/cart',
      hasCount: true,
      icon: (active: boolean) => <CartIcon active={active} />,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-2.5 inset-x-3 z-40 lg:hidden pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-md rounded-2xl backdrop-blur-2xl border px-1.5 py-1.5 transition-all duration-300",
          isLight
            ? "bg-white/92 border-stone-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            : "bg-[#0B0F17]/92 border-amber-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
        )}
      >
        <div className="grid grid-cols-5 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 active:scale-92",
                item.active 
                  ? (isLight ? "text-amber-700 font-semibold" : "text-amber-300 font-semibold")
                  : (isLight ? "text-slate-500 hover:text-slate-900" : "text-gray-400 hover:text-white")
              )}
            >
              {/* Subtle Active Top Hairline */}
              {item.active && (
                <span className="absolute -top-1 w-5 h-[2px] rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
              )}

              {/* Icon & Badges */}
              <div className="relative flex items-center justify-center w-6 h-5">
                {item.icon(item.active)}

                {item.hasCount && mounted && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-amber-400 text-stone-950 text-[9px] font-bold font-mono min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>

              {/* Micro Tracked Label */}
              <span className="text-[9px] uppercase tracking-[0.08em] font-sans mt-1 leading-none">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function MobileBottomNav() {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavInner />
    </Suspense>
  );
}
