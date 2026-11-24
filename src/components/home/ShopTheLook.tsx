'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';
import { BRAND_NAME } from '@/lib/constants';

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  productId: string;
  title: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  image: string;
  slug: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'spot-trench',
    x: 32,
    y: 34,
    productId: 'prod-men-trench',
    title: 'The Sovereign Wool Trench',
    subtitle: '100% Virgin Italian Melton Wool',
    price: 780,
    priceFormatted: '$780',
    image: '/images/wool_trench.jpg',
    slug: 'sovereign-double-breasted-trench',
  },
  {
    id: 'spot-gown',
    x: 68,
    y: 42,
    productId: 'prod-women-gown',
    title: 'Luminary Obsidian Silk Gown',
    subtitle: '32 Momme Pure Mulberry Silk',
    price: 850,
    priceFormatted: '$850',
    image: '/images/silk_gown.jpg',
    slug: 'luminary-silk-bias-evening-gown',
  },
  {
    id: 'spot-perfume',
    x: 48,
    y: 70,
    productId: 'prod-nocturne-oud',
    title: 'Nocturne Oud Extrait de Parfum',
    subtitle: '38% Pure Extrait with Laser Engraving',
    price: 340,
    priceFormatted: '$340',
    image: '/images/perfume_flacon.jpg',
    slug: 'nocturne-oud-extrait',
  },
  {
    id: 'spot-bag',
    x: 82,
    y: 68,
    productId: 'prod-hoodie-obsidian',
    title: '450gsm Heavyweight Luxury Hoodie',
    subtitle: 'French Terry with 24K Gold Aglets',
    price: 220,
    priceFormatted: '$220',
    image: '/images/luxury_hoodie.jpg',
    slug: 'heavyweight-french-terry-luxury-hoodie',
  },
];

export function ShopTheLook() {
  const [activeSpot, setActiveSpot] = useState<string | null>('spot-perfume');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const getProductBySlug = useProductStore((s) => s.getProductBySlug);

  const handleQuickAdd = (spot: Hotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = getProductBySlug(spot.slug);
    if (product) {
      const variant = product.variants[0] || {
        id: `${product.id}-default`,
        productId: product.id,
        price: spot.price,
        stock: 10,
        sku: `QXY-${spot.id.toUpperCase()}`,
      };
      addItem(product, variant, 1);
      setAddedItem(spot.id);
      setTimeout(() => setAddedItem(null), 2200);
    }
  };

  const activeHotspotData = hotspots.find((h) => h.id === activeSpot);

  return (
    <section className="py-20 lg:py-28 bg-[#05080E] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
                Editorial Lookbook Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
              Interactive <span className="italic text-amber-300">Shop The Look</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Touch the glowing golden pins on our Autumn / Winter Haute Couture campaign to reveal individual pieces and add them directly to your personal shopping bag.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
              Active Ensemble:
            </span>
            <span className="text-xs font-medium text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded">
              Gala No. IV — Milan & Grasse
            </span>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Large Editorial Canvas with Hotspots (8 cols) */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#090D15]">
            <Image
              src="/images/lookbook.jpg"
              alt={`Maison ${BRAND_NAME} Autumn Lookbook`}
              fill
              priority
              className="object-cover object-top filter brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Hotspot Pins */}
            {hotspots.map((spot) => {
              const isActive = activeSpot === spot.id;

              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Outer Radar Pulse */}
                  <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />

                  {/* Pin Button */}
                  <button
                    onClick={() => setActiveSpot(isActive ? null : spot.id)}
                    aria-label={`View ${spot.title}`}
                    className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs shadow-2xl transition-all duration-300 backdrop-blur-md cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-black scale-110 ring-4 ring-amber-400/40'
                        : 'bg-black/80 text-amber-300 border border-amber-400/60 hover:scale-110 hover:bg-amber-400 hover:text-black'
                    }`}
                  >
                    {isActive ? '✕' : '+'}
                  </button>

                  {/* Quick Floating Tooltip on Hover / Mobile */}
                  {isActive && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-xl bg-black/90 border border-amber-400/40 backdrop-blur-xl shadow-2xl text-left pointer-events-auto z-30 animate-in fade-in slide-in-from-bottom-2 lg:hidden">
                      <div className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">
                        {spot.subtitle}
                      </div>
                      <div className="text-xs font-serif text-white font-medium truncate">
                        {spot.title}
                      </div>
                      <div className="text-xs font-mono text-amber-300 mt-1 font-semibold">
                        {spot.priceFormatted}
                      </div>
                      <button
                        onClick={(e) => handleQuickAdd(spot, e)}
                        className="w-full mt-2 py-1.5 bg-amber-400 text-black text-[10px] uppercase font-bold tracking-wider rounded"
                      >
                        {addedItem === spot.id ? '✓ Added' : 'Quick Add'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Floating Legend */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-3 p-2.5 px-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Click any pin to inspect garments & fragrances</span>
            </div>
          </div>

          {/* RIGHT: Curated Piece Spotlight Detail Card (4 cols) */}
          <div className="lg:col-span-4">
            {activeHotspotData ? (
              <div className="rounded-2xl bg-[#090E17] border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold">
                    Selected Lookbook Piece
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    Piece {hotspots.findIndex((h) => h.id === activeSpot) + 1} of {hotspots.length}
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-inner">
                  <Image
                    src={activeHotspotData.image}
                    alt={activeHotspotData.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-amber-300 border border-amber-400/30">
                    {activeHotspotData.priceFormatted}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                    {activeHotspotData.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    {activeHotspotData.subtitle}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={(e) => handleQuickAdd(activeHotspotData, e)}
                    className="w-full py-3 bg-amber-400 text-black font-semibold text-xs uppercase tracking-[0.2em] rounded hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{addedItem === activeHotspotData.id ? '✓ Added To Bag' : 'Add To Shopping Bag'}</span>
                    <span>→</span>
                  </button>

                  <Link
                    href={`/store/${activeHotspotData.slug}`}
                    className="w-full py-2.5 border border-white/20 text-gray-300 text-center block text-xs uppercase tracking-[0.16em] rounded hover:border-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View Atelier Specifications
                  </Link>
                </div>

                {/* Guarantees */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-light">
                  <span>✨ Bespoke Box Included</span>
                  <span className="text-amber-400">Complimentary Shipping</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#090E17] border border-white/10 p-8 text-center text-gray-400">
                <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">Interactive Guide</p>
                <p className="text-sm font-serif text-white">Click any pin on the model image to view and order that piece.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
