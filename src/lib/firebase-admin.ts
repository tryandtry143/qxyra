import { cert, getApps, initializeApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let cachedApp: App | null = null;
let cachedDb: Firestore | null = null;

function parseServiceAccount(): {
  projectId: string;
  clientEmail: string;
  privateKey: string;
} | null {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();
  if (rawJson) {
    try {
      const jsonStr = rawJson.startsWith('{')
        ? rawJson
        : Buffer.from(rawJson, 'base64').toString('utf8');
      const parsed = JSON.parse(jsonStr);
      if (parsed.project_id && parsed.client_email && parsed.private_key) {
        return {
          projectId: parsed.project_id,
          clientEmail: parsed.client_email,
          privateKey: String(parsed.private_key).replace(/\\n/g, '\n'),
        };
      }
    } catch (err) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', err);
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }

  return null;
}

export function isFirebaseAdminConfigured(): boolean {
  return parseServiceAccount() !== null;
}

export function getAdminDb(): Firestore {
  if (cachedDb) return cachedDb;

  const creds = parseServiceAccount();
  if (!creds) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }

  if (getApps().length > 0) {
    cachedApp = getApps()[0];
  } else {
    cachedApp = initializeApp({
      credential: cert({
        projectId: creds.projectId,
        clientEmail: creds.clientEmail,
        privateKey: creds.privateKey,
      }),
    });
  }

  cachedDb = getFirestore(cachedApp);
  return cachedDb;
}

/**
 * Strictly locks website promo lookups & redemptions to this shop's tenant namespace
 * (`shops/METHMI`), keeping all other SaaS POS buyers completely isolated.
 */
export function getShopCollection(collectionName: string) {
  const shopId = (process.env.POS_SHOP_ID || 'METHMI').trim();
  return getAdminDb().collection('shops').doc(shopId).collection(collectionName);
}
