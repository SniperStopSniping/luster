import { Metadata } from 'next';
import Link from 'next/link';
import Stripe from 'stripe';

export const metadata: Metadata = {
  title: 'Order Confirmed | LUSTER',
  description: 'Thank you for your order.',
  robots: { index: false, follow: false },
};

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
  });
}

async function getSession(sessionId: string) {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const session = sessionId ? await getSession(sessionId) : null;

  if (!session || session.payment_status !== 'paid') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-canvas px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-4xl mb-6">Session Not Found</h1>
          <p className="text-ink/60 mb-8">
            We couldn&apos;t verify your payment session. If you completed a purchase, 
            you&apos;ll receive a confirmation email shortly.
          </p>
          <Link
            href="/"
            className="inline-block bg-ink text-canvas px-8 py-3 hover:bg-ink/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  const { variant, pack, lot } = session.metadata || {};

  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-emerald/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-serif text-4xl mb-4">Order Confirmed</h1>
        <p className="text-ink/60 mb-8">
          Thank you for your purchase. A confirmation email has been sent to{' '}
          <span className="text-ink">{session.customer_details?.email}</span>.
        </p>

        <dl className="text-left border border-ink/10 divide-y divide-ink/10 mb-8">
          {variant && (
            <div className="flex justify-between p-4">
              <dt className="text-ink/50">Product</dt>
              <dd className="font-mono text-sm">{variant.toUpperCase()}</dd>
            </div>
          )}
          {pack && (
            <div className="flex justify-between p-4">
              <dt className="text-ink/50">Pack</dt>
              <dd className="font-mono text-sm">{pack === 'studio' ? 'Studio (3)' : 'Single'}</dd>
            </div>
          )}
          {lot && (
            <div className="flex justify-between p-4">
              <dt className="text-ink/50">Lot</dt>
              <dd className="font-mono text-sm">{lot}</dd>
            </div>
          )}
        </dl>

        <Link
          href="/"
          className="inline-block bg-ink text-canvas px-8 py-3 hover:bg-ink/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}

