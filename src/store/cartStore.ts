import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

export interface AppliedPromo {
  code: string;
  promoDocId?: string;
  title: string;
  discountType: string;
  discountValue: number;
  discountLkr: number;
  rewardItemName?: string;
  validUntilIso?: string | null;
  message: string;
}

interface CartState {
  items: CartItem[];
  appliedPromo: AppliedPromo | null;
  pendingPromoCode: string | null;
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setAppliedPromo: (promo: AppliedPromo | null) => void;
  clearPromo: () => void;
  setPendingPromoCode: (code: string | null) => void;
  getTotal: () => number;
  getLkrTotal: () => number | undefined;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      pendingPromoCode: null,
      addItem: (product, variant, quantity) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.variant.id === variant.id
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            product,
            variant,
            quantity,
          };
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const nextItems = state.items.filter((item) => item.id !== id);
          return {
            items: nextItems,
            appliedPromo: nextItems.length === 0 ? null : state.appliedPromo,
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [], appliedPromo: null, pendingPromoCode: null }),
      setAppliedPromo: (promo) => set({ appliedPromo: promo }),
      clearPromo: () => set({ appliedPromo: null, pendingPromoCode: null }),
      setPendingPromoCode: (code) =>
        set({ pendingPromoCode: code ? code.trim().toUpperCase() : null }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice || item.variant.price || item.product.basePrice;
          return total + price * item.quantity;
        }, 0);
      },
      getLkrTotal: () => {
        const items = get().items;
        if (items.length === 0) return 0;
        let total = 0;
        for (const item of items) {
          const lkrUnit =
            item.variant.lkrPrice ??
            (item.product.salePrice != null && item.product.salePrice < item.product.basePrice
              ? (item.product.lkrSalePrice ?? item.product.lkrPrice)
              : item.product.lkrPrice);
          if (lkrUnit == null) return undefined;
          total += lkrUnit * item.quantity;
        }
        return total;
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'methmi-mobile-cart',
    }
  )
);
