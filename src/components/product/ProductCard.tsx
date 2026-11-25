'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useTheme } from '@/context/ThemeContext';
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [activeColorImage, setActiveColorImage] = useState<string | null>(null);

  const { format } = useCurrency();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  const hasDiscount = product.salePrice != null && product.salePrice < product.basePrice;
  const displayPrice = hasDiscount ? product.salePrice! : product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  const primaryImage =
    activeColorImage ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      price: displayPrice,
      stock: 10,
      sku: `MM-${product.slug.slice(0, 6).toUpperCase()}`,
    };
    addItem(product, defaultVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello Maison QXYRA! I would like to inquire about ordering:\n\n✨ *Piece*: ${product.name}\n💰 *Price*: ${format(displayPrice)}\n\nPlease assist me with bespoke availability, sizing or flacon engraving.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden",
        isLight
          ? "bg-white border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400/60"
          : "bg-[#0D131F] border-white/10 hover:border-amber-400/40 shadow-lg hover:shadow-2xl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area - Aspect 4/5 for Haute Couture Silhouette */}
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden transition-colors flex items-center justify-center",
          isLight ? "bg-stone-50 border-b border-stone-100" : "bg-[#080C14] border-b border-white/5"
        )}
      >
        {/* Sale Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-amber-400 text-stone-950 text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md uppercase tracking-wider font-mono">
            -{discountPercent}%
          </div>
        )}

        {/* Top Right Action Icon: Wishlist */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm hover:scale-110",
              isLight
                ? "bg-white/90 border border-stone-200 text-stone-700 hover:text-red-500 shadow-stone-200/50"
                : "bg-black/60 border border-white/10 text-white hover:text-red-400"
            )}
            aria-label="Toggle Wishlist"
          >
            <span
              className={cn(
                "text-xs sm:text-sm",
                isWishlisted ? "text-red-500 scale-110" : isLight ? "text-stone-500" : "text-white/70"
              )}
            >
              {isWishlisted ? "♥" : "♡"}
            </span>
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/store/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        {/* Desktop Quick Add Bar */}
        <div
          className={cn(
            "hidden md:block absolute inset-x-3 bottom-3 z-20 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-semibold rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {justAdded ? (
              <>
                <span>✓</span>
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <span>🛍️</span>
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div
        className={cn(
          "p-3 sm:p-4 flex flex-col flex-grow transition-colors",
          isLight ? "bg-white" : "bg-[#0F141E]"
        )}
      >
        {/* Color Dots Row */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <span className="hidden sm:inline text-[9px] font-mono uppercase text-gray-500 mr-0.5">Colors:</span>
            {product.colorOptions.slice(0, 4).map((opt) => {
              const isSelected = activeColorImage === opt.image;
              return (
                <button
                  key={opt.name}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveColorImage(opt.image || null);
                  }}
                  onMouseEnter={() => {
                    if (opt.image) setActiveColorImage(opt.image);
                  }}
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4 rounded-full border transition-all cursor-pointer shadow-sm hover:scale-125",
                    isSelected
                      ? "ring-2 ring-brand-gold scale-110 border-white"
                      : "border-black/30 hover:ring-1 hover:ring-brand-gold"
                  )}
                  style={{ backgroundColor: opt.hex }}
                  title={opt.name}
                  aria-label={`View ${opt.name}`}
                />
              );
            })}
            {product.colorOptions.length > 4 && (
              <span className="text-[9px] font-mono text-gray-500">
                +{product.colorOptions.length - 4}
              </span>
            )}
          </div>
        )}

        {categoryName && (
          <p
            className={cn(
              "text-[9px] sm:text-[11px] uppercase tracking-[0.15em] mb-0.5 sm:mb-1 font-mono font-semibold truncate",
              isLight ? "text-amber-800" : "text-brand-gold/80"
            )}
          >
            {categoryName}
          </p>
        )}

        {/* Title */}
        <Link href={`/store/${product.slug}`} className="block mb-1.5 flex-grow">
          <h3
            className={cn(
              "font-heading text-[13px] sm:text-base font-medium line-clamp-2 min-h-[2.25rem] sm:min-h-[2.75rem] transition-colors leading-snug",
              isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold"
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Quick Specs Badges (Hidden on tight 2-col mobile to preserve editorial breathing room) */}
        {product.specsHighlights && product.specsHighlights.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1 mb-2">
            {product.specsHighlights.slice(0, 2).map((badge, idx) => (
              <span
                key={idx}
                className={cn(
                  "text-[9px] font-mono px-1.5 py-0.5 rounded-md border font-medium truncate max-w-[120px]",
                  isLight
                    ? "bg-gray-100 text-gray-700 border-gray-200"
                    : "bg-white/[0.05] text-gray-300 border-white/10"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Rating & Sold count */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
          <div className="flex text-amber-500 text-[9px] sm:text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.floor(product.rating || 5) ? '★' : '☆'}</span>
            ))}
          </div>
          <span
            className={cn(
              "text-[9px] sm:text-[11px] font-mono",
              isLight ? "text-gray-600 font-medium" : "text-gray-400"
            )}
          >
            ({product.rating?.toFixed(1) || '5.0'})
          </span>
          {product.totalSold ? (
            <span
              className={cn(
                "text-[9px] sm:text-[10px] ml-auto hidden sm:inline font-mono",
                isLight ? "text-gray-500" : "text-gray-500"
              )}
            >
              {product.totalSold}+ sold
            </span>
          ) : null}
        </div>

        {/* Price & Action */}
        <div
          className={cn(
            "flex items-center justify-between pt-2 border-t gap-1.5",
            isLight ? "border-gray-100" : "border-white/10"
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 min-w-0">
            <span
              className={cn(
                "font-semibold text-xs sm:text-base font-mono truncate",
                isLight ? "text-gray-950 font-bold" : "text-white"
              )}
            >
              {format(displayPrice)}
            </span>
            {hasDiscount && (
              <span
                className={cn(
                  "text-[9px] sm:text-xs line-through font-mono",
                  isLight ? "text-gray-400" : "text-gray-500"
                )}
              >
                {format(product.basePrice)}
              </span>
            )}
          </div>

          {/* Mobile Tap-to-Add Circular Luxury Button */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "md:hidden w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 active:scale-90 cursor-pointer shadow-md",
              justAdded
                ? "bg-emerald-500 text-white font-bold text-xs"
                : "bg-amber-400 text-black hover:bg-amber-300 text-base font-medium shadow-amber-500/20"
            )}
            aria-label="Add to shopping bag"
          >
            {justAdded ? "✓" : "+"}
          </button>

          {/* Desktop Link */}
          <Link
            href={`/store/${product.slug}`}
            className={cn(
              "hidden md:inline text-xs font-semibold whitespace-nowrap transition-colors",
              isLight
                ? "text-amber-800 hover:text-amber-950 hover:underline"
                : "text-brand-gold hover:underline"
            )}
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
