'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Gift, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

/**
 * Listens for `?promo=CODE` anywhere on the website (such as when a customer
 * scans the QR code on their POS receipt) and stores it in cart state so it
 * automatically validates & applies in Cart and Checkout.
 */
export function UrlPromoListener() {
  const searchParams = useSearchParams();
  const { pendingPromoCode, setPendingPromoCode, appliedPromo, items } = useCartStore();
  const [dismissed, setDismissed] = useState(false);

  const urlPromo = searchParams.get('promo');

  useEffect(() => {
    if (urlPromo && urlPromo.trim().length > 0) {
      const clean = urlPromo.trim().toUpperCase();
      setPendingPromoCode(clean);
      setDismissed(false);
    }
  }, [urlPromo, setPendingPromoCode]);

  const activeBannerCode = appliedPromo?.code || pendingPromoCode;
  if (!activeBannerCode || dismissed || !urlPromo) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#0F172A]/95 backdrop-blur-md border border-amber-400/50 text-white rounded-2xl p-3.5 shadow-2xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 text-amber-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-amber-300 tracking-wide">
            Promo Code Saved: {activeBannerCode}
          </p>
          <p className="text-[11px] text-gray-300 truncate">
            {items.length > 0
              ? 'Ready in your Cart — view Cart to see your discount!'
              : 'Add any eligible item to your Cart to claim this offer.'}
          </p>
        </div>
        {items.length > 0 && (
          <Link
            href="/cart"
            className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-black text-[11px] font-bold flex items-center gap-1 hover:bg-amber-300 transition-colors shrink-0"
          >
            <span>Cart</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
        <button
          type="button"
          aria-label="Dismiss promo banner"
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-white p-1 shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
