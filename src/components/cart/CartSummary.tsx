'use client';

import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';
import { useState } from 'react';

export function CartSummary() {
  const { getTotal, getLkrTotal } = useCartStore();
  const { formatProductPrice } = useCurrency();
  const subtotal = getTotal();
  const lkrSubtotal = getLkrTotal();
  const shippingCost = 0; // Islandwide Express COD
  const total = subtotal + shippingCost;
  const lkrTotal = lkrSubtotal != null ? lkrSubtotal : undefined;

  const [promoCode, setPromoCode] = useState('');

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
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Delivery</span>
          <span className="font-medium text-emerald-400 font-mono">Complimentary</span>
        </div>
      </div>
      
      <div className="border-t border-white/10 py-6 mb-2">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-light font-serif text-white">Total</span>
          <span className="text-2xl font-bold font-mono text-amber-300">
            {formatProductPrice(total, lkrTotal)}
          </span>
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Promo code" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow px-4 py-2 border border-white/15 rounded-xl focus:outline-none focus:border-amber-400 bg-black/50 text-white placeholder:text-gray-500 text-sm"
          />
          <button
            type="button"
            className="px-4 py-2 bg-white/10 border border-white/15 text-white rounded-xl hover:bg-amber-400 hover:text-black transition-colors whitespace-nowrap text-sm font-medium cursor-pointer"
          >
            Apply
          </button>
        </div>
        
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
          Maison QXYRA • Secure Checkout
        </span>
      </div>
    </div>
  );
}
