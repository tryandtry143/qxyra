'use client';

import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/context/CurrencyContext';
import { getCartEffectiveLkrSubtotal, validatePromoOnServer } from '@/lib/promo-client';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, Gift, Loader2, Tag, X } from 'lucide-react';

export function CartSummary() {
  const {
    items,
    appliedPromo,
    pendingPromoCode,
    setAppliedPromo,
    clearPromo,
    setPendingPromoCode,
    getTotal,
    getLkrTotal,
  } = useCartStore();
  const { formatProductPrice, rates } = useCurrency();

  const lkrRate = rates?.LKR || 330.41;
  const subtotal = getTotal();
  const lkrSubtotal = getLkrTotal();
  const effectiveLkrSubtotal = lkrSubtotal ?? getCartEffectiveLkrSubtotal(items, lkrRate);

  const discountLkr = appliedPromo ? Math.min(appliedPromo.discountLkr || 0, effectiveLkrSubtotal) : 0;
  const discountUsd = discountLkr / lkrRate;
  const shippingCost = 0; // Islandwide Express COD
  const totalUsd = Math.max(0, subtotal - discountUsd + shippingCost);
  const totalLkr = lkrSubtotal != null ? Math.max(0, lkrSubtotal - discountLkr) : undefined;

  const [promoInput, setPromoInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [promoMessage, setPromoMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const applyCode = useCallback(
    async (codeToApply: string) => {
      if (!codeToApply.trim() || items.length === 0) return;
      setIsApplying(true);
      setPromoMessage(null);
      const res = await validatePromoOnServer({
        code: codeToApply,
        items,
        usdToLkrRate: lkrRate,
      });
      setIsApplying(false);
      if (res.ok && res.promo) {
        setAppliedPromo(res.promo);
        setPendingPromoCode(null);
        setPromoInput('');
        setPromoMessage({ type: 'success', text: res.message });
      } else {
        setAppliedPromo(null);
        setPromoMessage({ type: 'error', text: res.message });
      }
    },
    [items, lkrRate, setAppliedPromo, setPendingPromoCode]
  );

  // Auto-apply pending QR promo code when items exist in cart
  useEffect(() => {
    if (pendingPromoCode && items.length > 0 && !appliedPromo) {
      applyCode(pendingPromoCode);
    }
  }, [pendingPromoCode, items.length, appliedPromo, applyCode]);

  // Re-validate applied promo whenever cart items/totals change
  const cartSignature = items.map((i) => `${i.id}:${i.quantity}`).join('|');
  useEffect(() => {
    if (appliedPromo?.code && items.length > 0) {
      validatePromoOnServer({
        code: appliedPromo.code,
        items,
        usdToLkrRate: lkrRate,
      }).then((res) => {
        if (res.ok && res.promo) {
          if (res.promo.discountLkr !== appliedPromo.discountLkr) {
            setAppliedPromo(res.promo);
          }
        } else if (!res.ok) {
          setAppliedPromo(null);
          setPromoMessage({ type: 'error', text: res.message });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSignature]);

  return (
    <div className="bg-[#0B101A] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl text-white">
      <h2 className="text-xl font-light text-white mb-6 font-serif tracking-wide">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-medium font-mono text-white">
            {formatProductPrice(subtotal, lkrSubtotal)}
          </span>
        </div>

        {appliedPromo && (
          <div className="flex justify-between text-sm text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Promo ({appliedPromo.code})</span>
            </span>
            <span className="font-bold font-mono">
              {appliedPromo.discountType === 'free_item' && discountLkr <= 0
                ? `🎁 Free ${appliedPromo.rewardItemName || 'Gift'}`
                : `- ${formatProductPrice(discountUsd, discountLkr > 0 ? discountLkr : undefined)}`}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Delivery</span>
          <span className="font-medium text-emerald-400 font-mono">Complimentary</span>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 mb-2">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-light font-serif text-white">Total</span>
          <span className="text-2xl font-bold font-mono text-amber-300">
            {formatProductPrice(totalUsd, totalLkr)}
          </span>
        </div>

        {/* Applied Promo Pill OR Input Box */}
        {appliedPromo ? (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/35 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {appliedPromo.discountType === 'free_item' ? (
                  <Gift className="w-4 h-4 text-amber-300 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span className="text-xs font-bold tracking-wider text-emerald-300 truncate">
                  {appliedPromo.code} APPLIED
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearPromo();
                  setPromoMessage(null);
                }}
                aria-label="Remove promo code"
                className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-300 leading-snug">{appliedPromo.message}</p>
            {appliedPromo.validUntilIso && (
              <p className="text-[10px] font-mono text-gray-400">
                Valid until: {new Date(appliedPromo.validUntilIso).toLocaleDateString('en-GB')}
              </p>
            )}
          </div>
        ) : (
          <div className="mb-5 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter POS / Offer Promo Code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    applyCode(promoInput);
                  }
                }}
                className="flex-grow px-4 py-2 border border-white/15 rounded-xl focus:outline-none focus:border-amber-400 bg-black/50 text-white placeholder:text-gray-500 text-sm uppercase font-mono tracking-wider"
              />
              <button
                type="button"
                disabled={isApplying || !promoInput.trim()}
                onClick={() => applyCode(promoInput)}
                className="px-4 py-2 bg-white/10 border border-white/15 text-white rounded-xl hover:bg-amber-400 hover:text-black transition-colors whitespace-nowrap text-sm font-medium cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
              </button>
            </div>
            {promoMessage && promoMessage.type === 'error' && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-400/25 rounded-lg px-3 py-2">
                {promoMessage.text}
              </p>
            )}
          </div>
        )}

        <Link
          href="/checkout"
          className="block text-center w-full bg-amber-400 text-black font-semibold py-4 rounded-xl hover:bg-amber-300 transition-colors mb-4 text-xs uppercase tracking-[0.18em] shadow-lg"
        >
          Proceed to Checkout (Cash on Delivery)
        </Link>

        <div className="text-center mt-4">
          <Link href="/store" className="text-gray-400 underline hover:text-amber-300 transition-colors text-xs uppercase tracking-wider font-mono">
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/10">
        <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono">
          Methmi Mobile (Pvt) Ltd • Secure Checkout
        </span>
      </div>
    </div>
  );
}
