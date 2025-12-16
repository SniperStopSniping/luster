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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      priceId?: string;
      quantity?: unknown;
      shade?: string;
    };

    const priceId = body?.priceId;
    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json({ error: 'Invalid priceId' }, { status: 400 });
    }

    const allowlisted = (Object.values(STRIPE_PRICES) as string[]).includes(priceId);
    if (!allowlisted) {
      return NextResponse.json({ error: 'Invalid priceId' }, { status: 400 });
    }

    const quantity = clampQuantity(body?.quantity);
    const shade = typeof body?.shade === 'string' && body.shade.trim() ? body.shade.trim() : undefined;

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity }],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      ...(shade ? { metadata: { shade } } : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}

