import { NextRequest, NextResponse } from 'next/server';
import { getShopCollection, isFirebaseAdminConfigured } from '@/lib/firebase-admin';
import { evaluatePromoForWebCart, PromoCartItemInput, PromoDocData } from '@/lib/promo-utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawCode = String(body?.code || '').trim().toUpperCase();

    if (!rawCode) {
      return NextResponse.json(
        { isValid: false, message: 'Please enter a promo code.' },
        { status: 400 }
      );
    }

    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json(
        {
          isValid: false,
          code: 'PROMO_NOT_CONFIGURED',
          message:
            'Online promo verification is waiting for Firebase Service Account configuration on the server.',
        },
        { status: 503 }
      );
    }

    const items: PromoCartItemInput[] = Array.isArray(body?.items) ? body.items : [];
    const lkrSubtotal = Number(body?.lkrSubtotal || 0);
    const customerPhone = body?.customerPhone ? String(body.customerPhone) : undefined;

    const snap = await getShopCollection('promo_codes')
      .where('code', '==', rawCode)
      .limit(1)
      .get();

    if (snap.empty) {
      return NextResponse.json(
        { isValid: false, message: `Invalid promo code "${rawCode}".` },
        { status: 404 }
      );
    }

    const doc = snap.docs[0];
    const promo = doc.data() as PromoDocData;

    const result = evaluatePromoForWebCart({
      promoDocId: doc.id,
      promo,
      items,
      lkrSubtotal,
      customerPhone,
    });

    return NextResponse.json(result, { status: result.isValid ? 200 : 400 });
  } catch (err) {
    console.error('Promo validation error:', err);
    return NextResponse.json(
      { isValid: false, message: 'Could not validate promo code right now.' },
      { status: 500 }
    );
  }
}
