export interface PromoCartItemInput {
  name: string;
  categoryId?: string;
  subcategoryId?: string;
  brand?: string;
  quantity: number;
  lkrUnitPrice: number;
  lkrLineTotal: number;
}

export interface PromoDocData {
  code?: string;
  title?: string;
  discountType?: string; // 'percentage' | 'flat' | 'free_item'
  discountValue?: number;
  maxDiscount?: number | null;
  minSpend?: number;
  validFrom?: unknown;
  validUntil?: unknown;
  validityDays?: number;
  usageLimit?: number;
  usedCount?: number;
  perCustomerLimit?: number;
  usedCustomers?: string[];
  applicableCategories?: string[];
  excludedCategories?: string[];
  excludedProductNames?: string[];
  channel?: string; // 'both' | 'pos' | 'website'
  triggerCategories?: string[];
  rewardItemName?: string;
  isActive?: boolean;
}

const PHONE_TOKENS = [
  'phone',
  'phones',
  'smartphone',
  'smartphones',
  'mobile',
  'redmi',
  'xiaomi',
  'vivo',
  'infinix',
  'tecno',
  'tecno-infinix',
  'apple',
  'iphone',
  'samsung',
];

const ACCESSORY_TOKENS = [
  'accessory',
  'accessories',
  'back cover',
  'tempered glass',
  'charger',
  'cable',
  'audio',
  'earbuds',
  'headphones',
];

const WATCH_TOKENS = ['watch', 'watches', 'smartwatch', 'smartwatches', 'horology'];

export function parseFirestoreDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    const fn = (value as { toDate?: () => Date }).toDate;
    if (typeof fn === 'function') return fn();
  }
  if (typeof value === 'object' && value !== null && '_seconds' in value) {
    const sec = Number((value as { _seconds: number })._seconds);
    if (!Number.isNaN(sec)) return new Date(sec * 1000);
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

function matchesCategoryToken(item: PromoCartItemInput, ruleCategory: string): boolean {
  const target = ruleCategory.trim().toLowerCase();
  if (!target) return false;

  const haystack = [
    item.categoryId || '',
    item.subcategoryId || '',
    item.brand || '',
    item.name || '',
  ]
    .join(' ')
    .toLowerCase();

  // Direct substring match against categoryId / subcategoryId / brand
  const catFields = `${item.categoryId || ''} ${item.subcategoryId || ''} ${item.brand || ''}`.toLowerCase();
  if (catFields.includes(target)) return true;

  // Smart cross-system aliases (POS category names <-> Web category slugs)
  if (PHONE_TOKENS.some((t) => target.includes(t))) {
    if (PHONE_TOKENS.some((t) => catFields.includes(t))) return true;
  }
  if (ACCESSORY_TOKENS.some((t) => target.includes(t))) {
    if (ACCESSORY_TOKENS.some((t) => haystack.includes(t))) return true;
  }
  if (WATCH_TOKENS.some((t) => target.includes(t))) {
    if (WATCH_TOKENS.some((t) => haystack.includes(t))) return true;
  }
  if (target.includes('clothing') || target.includes('fashion')) {
    if (catFields.includes('clothings') || catFields.includes('fashion')) return true;
  }
  if (target.includes('perfume')) {
    if (catFields.includes('perfume')) return true;
  }

  return false;
}

export function isWebItemEligibleForPromo(item: PromoCartItemInput, promo: PromoDocData): boolean {
  const excludedCats = Array.isArray(promo.excludedCategories) ? promo.excludedCategories : [];
  for (const exCat of excludedCats) {
    if (exCat && matchesCategoryToken(item, exCat)) {
      return false;
    }
  }

  const excludedNames = Array.isArray(promo.excludedProductNames) ? promo.excludedProductNames : [];
  const lowerName = (item.name || '').toLowerCase();
  for (const exName of excludedNames) {
    const token = (exName || '').trim().toLowerCase();
    if (token && lowerName.includes(token)) {
      return false;
    }
  }

  const applicableCats = Array.isArray(promo.applicableCategories) ? promo.applicableCategories : [];
  if (applicableCats.length === 0) return true;

  return applicableCats.some((ac) => matchesCategoryToken(item, ac));
}

export function evaluatePromoForWebCart(params: {
  promoDocId: string;
  promo: PromoDocData;
  items: PromoCartItemInput[];
  lkrSubtotal: number;
  customerPhone?: string;
}) {
  const { promoDocId, promo, items, lkrSubtotal, customerPhone } = params;
  const cleanCode = String(promo.code || '').trim().toUpperCase();

  if (promo.isActive === false) {
    return { isValid: false as const, message: 'This promo code is currently disabled.' };
  }

  const channel = String(promo.channel || 'both').toLowerCase();
  if (channel === 'pos') {
    return {
      isValid: false as const,
      message: `Promo "${cleanCode}" is valid only for in-store POS purchases at Methmi Mobile.`,
    };
  }

  const now = new Date();
  const validFrom = parseFirestoreDate(promo.validFrom);
  const validUntil = parseFirestoreDate(promo.validUntil);

  if (validFrom && now < validFrom) {
    return {
      isValid: false as const,
      message: `Promo "${cleanCode}" starts on ${validFrom.toLocaleDateString('en-GB')}.`,
    };
  }

  if (validUntil && now > validUntil) {
    return {
      isValid: false as const,
      message: `Promo "${cleanCode}" expired on ${validUntil.toLocaleDateString('en-GB')}.`,
    };
  }

  const usageLimit = Number(promo.usageLimit || 0);
  const usedCount = Number(promo.usedCount || 0);
  if (usageLimit > 0 && usedCount >= usageLimit) {
    return {
      isValid: false as const,
      message: `Usage limit reached for promo "${cleanCode}".`,
    };
  }

  const perCustomerLimit = Number(promo.perCustomerLimit ?? 1);
  if (customerPhone && customerPhone.trim() && perCustomerLimit > 0) {
    const cleanPhone = cleanPhoneNumber(customerPhone);
    if (cleanPhone.length >= 9) {
      const usedCustomers = Array.isArray(promo.usedCustomers) ? promo.usedCustomers : [];
      const timesUsed = usedCustomers.filter((p) => cleanPhoneNumber(String(p)) === cleanPhone).length;
      if (timesUsed >= perCustomerLimit) {
        return {
          isValid: false as const,
          message: `Promo code "${cleanCode}" has already been used by this phone number.`,
        };
      }
    }
  }

  const minSpend = Number(promo.minSpend || 0);
  if (minSpend > 0 && lkrSubtotal < minSpend) {
    return {
      isValid: false as const,
      message: `Minimum order of Rs. ${Math.round(minSpend).toLocaleString()} required (Current: Rs. ${Math.round(lkrSubtotal).toLocaleString()}).`,
    };
  }

  const triggerCategories = Array.isArray(promo.triggerCategories) ? promo.triggerCategories : [];
  if (triggerCategories.length > 0 && items.length > 0) {
    const hasTrigger = items.some((it) => triggerCategories.some((tc) => matchesCategoryToken(it, tc)));
    if (!hasTrigger) {
      return {
        isValid: false as const,
        message: `Promo "${cleanCode}" applies only when ordering: ${triggerCategories.join(', ')}.`,
      };
    }
  }

  const discountType = String(promo.discountType || 'flat');
  const discountValue = Number(promo.discountValue || 0);
  const maxDiscount = promo.maxDiscount != null ? Number(promo.maxDiscount) : null;
  const rewardItemName = String(promo.rewardItemName || '').trim();

  // Compute eligible subtotal (profit protection: excluded phones/categories are skipped)
  let eligibleSubtotal = lkrSubtotal;
  if (items.length > 0 && discountType !== 'free_item') {
    eligibleSubtotal = items.reduce((sum, item) => {
      return isWebItemEligibleForPromo(item, promo) ? sum + Number(item.lkrLineTotal || 0) : sum;
    }, 0);

    if (eligibleSubtotal <= 0) {
      const applicable = Array.isArray(promo.applicableCategories) ? promo.applicableCategories : [];
      const scopeHint =
        applicable.length > 0
          ? applicable.join(', ')
          : 'eligible items (selected phones/categories are excluded)';
      return {
        isValid: false as const,
        message: `Promo "${cleanCode}" applies only to ${scopeHint}.`,
      };
    }
  }

  let discountLkr = 0;
  if (discountType === 'percentage') {
    discountLkr = Math.round(eligibleSubtotal * (discountValue / 100));
    if (maxDiscount && maxDiscount > 0 && discountLkr > maxDiscount) {
      discountLkr = Math.round(maxDiscount);
    }
  } else if (discountType === 'free_item') {
    const targetItem = items.find((it) => {
      if (rewardItemName && it.name.toLowerCase().includes(rewardItemName.toLowerCase())) return true;
      const applicable = Array.isArray(promo.applicableCategories) ? promo.applicableCategories : [];
      return applicable.some((ac) => matchesCategoryToken(it, ac));
    });
    if (targetItem) {
      discountLkr = Math.round(targetItem.lkrUnitPrice || 0);
      if (maxDiscount && maxDiscount > 0 && discountLkr > maxDiscount) {
        discountLkr = Math.round(maxDiscount);
      }
    } else {
      // Gift included complimentary with order at dispatch (no cash deduction unless gift item is in cart)
      discountLkr = 0;
    }
  } else {
    discountLkr = Math.round(discountValue);
  }

  if (discountType !== 'free_item') {
    discountLkr = Math.max(0, Math.min(discountLkr, Math.round(eligibleSubtotal), Math.round(lkrSubtotal)));
  }

  const message =
    discountType === 'free_item'
      ? `🎁 Complimentary Gift Unlocked: ${rewardItemName || 'Special Gift'}${discountLkr > 0 ? ` (Saved Rs. ${discountLkr.toLocaleString()})` : ' (Included free with your order!)'}`
      : `✅ Promo "${cleanCode}" applied! Saved Rs. ${discountLkr.toLocaleString()}`;

  return {
    isValid: true as const,
    message,
    promoDocId,
    code: cleanCode,
    title: String(promo.title || cleanCode),
    discountType,
    discountValue,
    maxDiscount,
    minSpend,
    discountLkr,
    rewardItemName,
    applicableCategories: Array.isArray(promo.applicableCategories) ? promo.applicableCategories : [],
    excludedCategories: Array.isArray(promo.excludedCategories) ? promo.excludedCategories : [],
    validUntilIso: validUntil ? validUntil.toISOString() : null,
    validityDays: Number(promo.validityDays || 14),
    channel,
  };
}
