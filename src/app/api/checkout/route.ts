import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const LOT = 'Lot No. 2025-JPN-01';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
  });
}

// Separate SKUs with fixed prices in cents — no multipliers
const PRICES = {
  single: {
    clear: 1800,
    nude: 1800,
    duo: 2800,
  },
  studio: {
    clear: 5800,
    nude: 5800,
    duo: 9800,
  },
} as const;

const PRODUCT_NAMES: Record<string, string> = {
  clear: 'LUSTER Clear Structure',
  nude: 'LUSTER Nude Structure',
  duo: 'LUSTER System Duo',
};

const SIZES = {
  single: '5g',
  studio: '25g',
} as const;

const DESCRIPTIONS = {
  single: {
    clear: '5g · Professional use',
    nude: '5g · Professional use',
    duo: '5g Clear + 5g Nude',
  },
  studio: {
    clear: '25g Studio size',
    nude: '25g Studio size',
    duo: '25g Clear + 25g Nude',
  },
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variant, pack } = body as { variant: string; pack: string };

    if (!variant || !['clear', 'nude', 'duo'].includes(variant)) {
      return NextResponse.json({ error: 'Invalid variant' }, { status: 400 });
    }

    if (!['single', 'studio'].includes(pack)) {
      return NextResponse.json({ error: 'Invalid pack' }, { status: 400 });
    }

    const packKey = pack as keyof typeof PRICES;
    const variantKey = variant as keyof typeof PRICES.single;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: PRODUCT_NAMES[variant],
              description: DESCRIPTIONS[packKey][variantKey],
            },
            unit_amount: PRICES[packKey][variantKey],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
      metadata: {
        variant,
        pack,
        size: SIZES[packKey],
        lot: LOT,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

