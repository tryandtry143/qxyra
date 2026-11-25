'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem, CartSummary } from '@/components/cart';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';

export default function CartPage() {
  const { items, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-amber-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const itemCount = getItemCount();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-7xl">
      <nav className="text-xs mb-6 sm:mb-8 text-gray-400 font-mono uppercase tracking-wider">
        <Link href="/" className="hover:text-amber-400 transition-colors">Maison</Link>
        <span className="mx-2 opacity-40">/</span>
        <span className={isLight ? "text-slate-900 font-semibold" : "text-white font-medium"}>Shopping Bag</span>
      </nav>

      <div className={cn(
        "mb-8 sm:mb-10 flex items-baseline justify-between border-b pb-4 sm:pb-6",
        isLight ? "border-stone-200" : "border-white/10"
      )}>
        <h1 className={cn(
          "text-3xl sm:text-4xl font-light font-serif tracking-tight",
          isLight ? "text-slate-900" : "text-white"
        )}>
          Your <span className="italic text-amber-400">Shopping Bag</span>
        </h1>
        {itemCount > 0 && (
          <span className="text-sm sm:text-base text-gray-400 font-mono">
            {itemCount} {itemCount === 1 ? 'creation' : 'creations'}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className={cn(
          "text-center py-16 sm:py-24 rounded-2xl px-6 border shadow-xl",
          isLight ? "bg-white border-stone-200" : "bg-[#0B101A] border-white/10"
        )}>
          <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 flex items-center justify-center mx-auto mb-6 text-2xl">
            ✦
          </div>
          <h2 className={cn(
            "text-2xl sm:text-3xl font-light mb-3 font-serif",
            isLight ? "text-slate-900" : "text-white"
          )}>
            Your shopping bag is currently empty
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-xs sm:text-sm font-light leading-relaxed">
            Explore Maison {BRAND_NAME} haute couture garments and 38% artisanal perfume extraits crafted in Florence and Grasse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              href="/store" 
              className="w-full sm:w-auto inline-block bg-amber-400 text-black px-8 py-3.5 rounded-xl hover:bg-amber-300 font-semibold transition-all duration-300 shadow-lg text-xs uppercase tracking-[0.18em]"
            >
              Explore Collections
            </Link>
            <Link 
              href="/scent-finder" 
              className={cn(
                "w-full sm:w-auto inline-block px-8 py-3.5 rounded-xl border font-medium transition-all duration-300 text-xs uppercase tracking-[0.18em]",
                isLight ? "border-stone-300 text-slate-800 hover:border-amber-500" : "border-white/20 text-white hover:border-amber-400"
              )}
            >
              Take Scent Quiz
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs text-gray-400 uppercase tracking-widest font-mono">
              <div className="col-span-6">Creation</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="flex flex-col">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <CartSummary />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
