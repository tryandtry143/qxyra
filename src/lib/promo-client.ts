import { CartItem } from '@/types';
import { AppliedPromo } from '@/store/cartStore';

export function getCartItemLkrUnitPrice(item: CartItem, usdToLkrRate: number): number {
  const hasSale = item.product.salePrice != null && item.product.salePrice < item.product.basePrice;
  const explicitLkr =
    item.variant.lkrPrice ??
    (hasSale ? (item.product.lkrSalePrice ?? item.product.lkrPrice) : item.product.lkrPrice);
  if (explicitLkr != null && explicitLkr > 0) return explicitLkr;
  const usdUnit = item.product.salePrice || item.variant.price || item.product.basePrice;
  return Math.round(usdUnit * (usdToLkrRate || 330.41));
}

export function getCartEffectiveLkrSubtotal(items: CartItem[], usdToLkrRate: number): number {
  return items.reduce((sum, it) => sum + getCartItemLkrUnitPrice(it, usdToLkrRate) * it.quantity, 0);
}

export interface PromoValidateResponse {
  isValid: boolean;
  message: string;
  promoDocId?: string;
  code?: string;
  title?: string;
  discountType?: string;
  discountValue?: number;
  discountLkr?: number;
  rewardItemName?: string;
  validUntilIso?: string | null;
}

export async function validatePromoOnServer(params: {
  code: string;
  items: CartItem[];
  usdToLkrRate: number;
  customerPhone?: string;
}): Promise<{ ok: boolean; promo?: AppliedPromo; message: string }> {
  const cleanCode = params.code.trim().toUpperCase();
  if (!cleanCode) {
    return { ok: false, message: 'Please enter a promo code.' };
  }

  const rate = params.usdToLkrRate || 330.41;
  const lkrSubtotal = getCartEffectiveLkrSubtotal(params.items, rate);
  const payloadItems = params.items.map((it) => {
    const lkrUnitPrice = getCartItemLkrUnitPrice(it, rate);
    return {
      name: it.product.name,
      categoryId: it.product.categoryId,
      subcategoryId: it.product.subcategoryId,
      brand: it.product.brand,
      quantity: it.quantity,
      lkrUnitPrice,
      lkrLineTotal: lkrUnitPrice * it.quantity,
    };
  });

  try {
    const res = await fetch('/api/promo/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: cleanCode,
        items: payloadItems,
        lkrSubtotal,
        customerPhone: params.customerPhone,
      }),
    });

    const data = (await res.json()) as PromoValidateResponse;
    if (!res.ok || !data.isValid) {
      return { ok: false, message: data.message || 'Invalid promo code.' };
    }

    return {
      ok: true,
      message: data.message,
      promo: {
        code: data.code || cleanCode,
        promoDocId: data.promoDocId,
        title: data.title || cleanCode,
        discountType: data.discountType || 'flat',
        discountValue: Number(data.discountValue || 0),
        discountLkr: Number(data.discountLkr || 0),
        rewardItemName: data.rewardItemName || '',
        validUntilIso: data.validUntilIso || null,
        message: data.message,
      },
    };
  } catch {
    return { ok: false, message: 'Network error validating promo code. Please try again.' };
  }
}

export async function redeemPromoOnServer(params: {
  code: string;
  orderNumber: string;
  discountLkr: number;
  billTotalLkr: number;
  customerName?: string;
  customerPhone?: string;
}): Promise<void> {
  try {
    await fetch('/api/promo/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  } catch (err) {
    console.warn('Non-fatal promo redemption sync error:', err);
  }
}
