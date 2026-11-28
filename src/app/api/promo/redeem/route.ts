import { NextRequest, NextResponse } from 'next/server';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getAdminDb, getShopCollection, isFirebaseAdminConfigured } from '@/lib/firebase-admin';
import { cleanPhoneNumber, parseFirestoreDate, PromoDocData } from '@/lib/promo-utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawCode = String(body?.code || '').trim().toUpperCase();
    const orderNumber = String(body?.orderNumber || '').trim();
    const discountLkr = Number(body?.discountLkr || 0);
    const billTotalLkr = Number(body?.billTotalLkr || 0);
    const customerName = String(body?.customerName || 'Online Customer').trim();
    const customerPhone = String(body?.customerPhone || '').trim();

    if (!rawCode || !orderNumber) {
      return NextResponse.json({ ok: false, message: 'Missing code or orderNumber.' }, { status: 400 });
    }

    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json({ ok: false, message: 'Firebase Admin not configured.' }, { status: 503 });
    }

    const promoRefCol = getShopCollection('promo_codes');
    const redemptionsCol = getShopCollection('promo_redemptions');

    const snap = await promoRefCol.where('code', '==', rawCode).limit(1).get();
    if (snap.empty) {
      return NextResponse.json({ ok: false, message: 'Promo code not found.' }, { status: 404 });
    }

    const promoDocRef = snap.docs[0].ref;
    const db = getAdminDb();

    await db.runTransaction(async (tx) => {
      const freshSnap = await tx.get(promoDocRef);
      if (!freshSnap.exists) return;
      const data = freshSnap.data() as PromoDocData;

      if (data.isActive === false) {
        throw new Error('Promo code is disabled');
      }
      const validUntil = parseFirestoreDate(data.validUntil);
      if (validUntil && new Date() > validUntil) {
        throw new Error('Promo code expired');
      }
      const usageLimit = Number(data.usageLimit || 0);
      const usedCount = Number(data.usedCount || 0);
      if (usageLimit > 0 && usedCount >= usageLimit) {
        throw new Error('Promo usage limit reached');
      }

      const promoUpdate: Record<string, unknown> = {
        usedCount: FieldValue.increment(1),
      };
      const cleanPhone = cleanPhoneNumber(customerPhone);
      if (cleanPhone.length >= 9) {
        promoUpdate.usedCustomers = FieldValue.arrayUnion(cleanPhone);
      }

      tx.update(promoDocRef, promoUpdate);

      const logRef = redemptionsCol.doc();
      tx.set(logRef, {
        promoDocId: promoDocRef.id,
        promoCode: rawCode,
        invoiceNo: orderNumber,
        discountAmount: discountLkr,
        billTotal: billTotalLkr,
        customerName: customerName || 'Website Customer',
        customerPhone,
        cashierName: 'Website Storefront',
        branch: 'Online Store',
        channel: 'website',
        redeemedAt: Timestamp.now(),
      });
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Promo redeem error:', err);
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : 'Redeem failed.' },
      { status: 500 }
    );
  }
}
