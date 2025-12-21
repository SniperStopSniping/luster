import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { STRIPE_PRICES } from '@/lib/stripePrices';

export const runtime = 'nodejs';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key, { apiVersion: '2025-11-17.clover' });
}

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) throw new Error('Missing NEXT_PUBLIC_SITE_URL');
  return raw.replace(/\/+$/, '');
}

function clampQuantity(input: unknown) {
  if (typeof input !== 'number' || !Number.isInteger(input)) return 1;
  if (input < 1 || input > 10) return 1;
  return input;
}

const allowedPriceIds = new Set(Object.values(STRIPE_PRICES) as string[]);

function isValidPriceId(id: unknown): id is string {
  return typeof id === 'string' && allowedPriceIds.has(id);
}

// ============================================
// Multi-item cart checkout (new shop page)
// ============================================
type CartItem = { priceId: string; quantity: number };

function parseCartItems(body: unknown): CartItem[] | null {
  if (!body || typeof body !== 'object') return null;
  const obj = body as Record<string, unknown>;
  
  if (!Array.isArray(obj.items)) return null;
  
  const items: CartItem[] = [];
  for (const item of obj.items) {
    if (!item || typeof item !== 'object') return null;
    const { priceId, quantity } = item as Record<string, unknown>;
    
    if (!isValidPriceId(priceId)) return null;
    
    items.push({
      priceId,
      quantity: clampQuantity(quantity),
    });
  }
  
  if (items.length === 0 || items.length > 20) return null;
  return items;
}

// ============================================
// Single-item checkout (legacy homepage)
// ============================================
type SingleItem = { priceId: string; quantity: number; shade?: string };

function parseSingleItem(body: unknown): SingleItem | null {
  if (!body || typeof body !== 'object') return null;
  const obj = body as Record<string, unknown>;
  
  // Must have priceId directly (not items array)
  if ('items' in obj) return null;
  
  const { priceId, quantity, shade } = obj;
  if (!isValidPriceId(priceId)) return null;
  
  return {
    priceId,
    quantity: clampQuantity(quantity),
    shade: typeof shade === 'string' && shade.trim() ? shade.trim() : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    // Try multi-item cart first
    const cartItems = parseCartItems(body);
    if (cartItems) {
      const lineItems = cartItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: lineItems,
        success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/shop`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Fall back to single-item (legacy homepage)
    const singleItem = parseSingleItem(body);
    if (singleItem) {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price: singleItem.priceId, quantity: singleItem.quantity }],
        success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/cancel`,
        ...(singleItem.shade ? { metadata: { shade: singleItem.shade } } : {}),
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
