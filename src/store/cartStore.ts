import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getLkrTotal: () => number | undefined;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
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
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
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
