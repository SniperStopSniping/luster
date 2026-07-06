import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Confirmed | LUSTER',
  description: 'Thank you for your order.',
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-4xl mb-6">Order Confirmed</h1>
        <p className="text-ink/75 mb-8">Thank you for your purchase — your order is being processed.</p>

        <Link
          href="/"
          className="inline-block bg-gold text-canvas rounded-full px-8 py-3 text-sm font-medium hover:bg-champagne transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}

