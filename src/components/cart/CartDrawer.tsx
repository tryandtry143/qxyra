'use client';

import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/context/CurrencyContext';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LuxuryGiftingModal, GiftingDetails } from './LuxuryGiftingModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, getTotal, getItemCount, removeItem } = useCartStore();
  const { format } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [isGiftingModalOpen, setIsGiftingModalOpen] = useState(false);
  const [activeGifting, setActiveGifting] = useState<GiftingDetails | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when drawer is open
  useEffect(() => {
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

  const subtotal = getTotal();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#0A0E17] text-white border-l border-white/10 z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block">
              Shopping Bag
            </span>
            <h2 className="text-xl font-serif text-white flex items-center gap-2 font-light">
              Your Curated Pieces
              {getItemCount() > 0 && (
                <span className="text-xs font-mono font-bold text-black bg-amber-400 px-2 py-0.5 rounded-full">
                  {getItemCount()}
                </span>
              )}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 px-6 bg-[#070A10] border-b border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300 font-light">
              {remainingForFreeShipping === 0 ? (
                <span className="text-amber-400 font-medium">✨ You qualify for Complimentary White-Glove Shipping!</span>
              ) : (
                <span>Add <span className="text-amber-300 font-semibold">{format(remainingForFreeShipping)}</span> for Free Express Worldwide Courier</span>
              )}
            </span>
            <span className="font-mono text-[10px] text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <span className="text-4xl text-amber-400/80 mb-2">⚜️</span>
              <p className="text-white font-serif text-lg font-light">Your shopping bag is empty.</p>
              <p className="text-gray-400 text-xs max-w-xs font-light leading-relaxed">
                Discover our curated extraits, bespoke tailoring, and evening silhouettes.
              </p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-amber-400 text-black text-xs uppercase tracking-[0.18em] font-semibold rounded hover:bg-amber-300 transition-colors shadow"
              >
                Explore The Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.product.salePrice || item.variant.price || item.product.basePrice;
                const primaryImage = item.product.images?.[0]?.url || '/images/hero.jpg';

                return (
                  <div key={item.id} className="flex gap-4 items-start p-3.5 rounded-xl bg-[#0F1524] border border-white/5 group">
                    <div className="relative w-18 h-20 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <Image
                        src={primaryImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-serif text-white font-medium line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {item.product.name}
                      </h3>
                      <div className="text-[11px] text-gray-400 font-light mt-0.5">
                        {item.variant.size && <span>Size: {item.variant.size}</span>}
                        {item.variant.size && item.variant.color && <span> • </span>}
                        {item.variant.color && <span>Color: {item.variant.color}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="text-[10px] font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          Qty: {item.quantity}
                        </div>
                        <div className="text-xs font-mono font-bold text-amber-300">
                          {format(price * item.quantity)}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors text-base p-1"
                      title="Remove piece"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}

              {/* Bespoke Gifting Callout inside Cart */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                    <span>✨</span>
                    <span>Bespoke Packaging & Wax Seal</span>
                  </span>
                  {activeGifting && (
                    <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-bold">
                      Applied
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {activeGifting
                    ? `Packaging: ${activeGifting.boxStyle} with ${activeGifting.waxInitial} initial seal.`
                    : 'Add signature midnight navy velvet coffret, ribbon, and calligraphy card.'}
                </p>
                <button
                  onClick={() => setIsGiftingModalOpen(true)}
                  className="text-xs text-amber-300 hover:text-amber-200 font-medium underline tracking-wide cursor-pointer"
                >
                  {activeGifting ? 'Edit Gifting Specifications →' : 'Personalize Gifting Suite →'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Actions */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#070A10] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-light">Subtotal</span>
              <span className="text-xl font-serif font-medium text-white">{format(subtotal)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/cart"
                onClick={onClose}
                className="py-3 border border-white/20 text-gray-200 text-center text-xs uppercase tracking-[0.16em] rounded hover:border-amber-400 hover:text-amber-300 transition-colors"
              >
                View Full Bag
              </Link>
              <Link 
                href="/checkout"
                onClick={onClose}
                className="py-3 bg-amber-400 text-black text-center text-xs uppercase tracking-[0.18em] font-semibold rounded hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
              >
                Checkout Now
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Luxury Gifting Suite Modal */}
      <LuxuryGiftingModal
        isOpen={isGiftingModalOpen}
        onClose={() => setIsGiftingModalOpen(false)}
        onApplyGifting={(details) => setActiveGifting(details)}
      />
    </>
  );
}
