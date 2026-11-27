'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/context/CurrencyContext';
import { CartItem as CartItemType } from '@/types';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();
  const { formatProductPrice } = useCurrency();

  const price = item.product.salePrice || item.variant.price || item.product.basePrice;
  const lkrUnit =
    item.variant.lkrPrice ??
    (item.product.salePrice != null && item.product.salePrice < item.product.basePrice
      ? (item.product.lkrSalePrice ?? item.product.lkrPrice)
      : item.product.lkrPrice);
  const subtotal = price * item.quantity;
  const lkrSubtotal = lkrUnit != null ? lkrUnit * item.quantity : undefined;
  const thumbUrl = item.product.images?.[0]?.url;

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-6 border-b border-white/10 gap-4">
      {/* Product Info (Col 1-6) */}
      <div className="col-span-6 flex gap-4 w-full">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#0D121D] border border-white/10 rounded-xl flex-shrink-0 overflow-hidden shadow-inner flex items-center justify-center">
          {thumbUrl ? (
            <Image
              src={thumbUrl}
              alt={item.product.name}
              fill
              sizes="96px"
              className="object-cover object-center"
            />
          ) : (
            <span className="text-[10px] text-center text-gray-400 p-2">{item.product.name}</span>
          )}
        </div>
        
        <div className="flex flex-col justify-center flex-grow">
          <h3 className="font-medium text-white text-base md:text-lg line-clamp-2">{item.product.name}</h3>
          <div className="text-xs text-gray-400 mt-1 flex gap-3 font-mono">
            {item.variant.size && <span>Option: {item.variant.size}</span>}
            {item.variant.color && <span>Color: {item.variant.color}</span>}
          </div>
          <div className="font-medium text-amber-300 mt-2 md:hidden font-mono text-sm">
            {formatProductPrice(price, lkrUnit)}
          </div>
        </div>
      </div>

      {/* Mobile Actions Container */}
      <div className="flex w-full items-center justify-between md:hidden mt-2">
        <div className="flex items-center border border-white/15 rounded-md h-9 bg-[#0B101A]">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 h-full text-gray-300 hover:text-white transition-colors rounded-l-md cursor-pointer"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 min-w-[2.5rem] text-center font-medium text-sm text-white">
            {item.quantity}
          </span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 h-full text-gray-300 hover:text-white transition-colors rounded-r-md cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-400 text-sm font-medium underline transition-colors cursor-pointer"
        >
          Remove
        </button>
      </div>

      {/* Desktop Layout (Col 7-12) */}
      <div className="hidden md:block col-span-2 text-right font-medium text-gray-300 font-mono text-sm">
        {formatProductPrice(price, lkrUnit)}
      </div>

      <div className="hidden md:flex col-span-2 justify-center">
        <div className="flex items-center border border-white/15 rounded-md h-9 bg-[#0B101A]">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 h-full text-gray-300 hover:text-white transition-colors rounded-l-md cursor-pointer"
          >
            -
          </button>
          <span className="px-2 min-w-[2.5rem] text-center font-medium text-sm text-white">
            {item.quantity}
          </span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 h-full text-gray-300 hover:text-white transition-colors rounded-r-md cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
        <div className="font-bold text-amber-300 text-right font-mono text-sm">
          {formatProductPrice(subtotal, lkrSubtotal)}
        </div>
        <button 
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
          aria-label="Remove item"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
}
