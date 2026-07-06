import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Checkout Cancelled | LUSTER',
  description: 'Your checkout was cancelled.',
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-4xl mb-6">Checkout Cancelled</h1>
        <p className="text-ink/75 mb-8">
          Your checkout was cancelled. No payment was processed.
        </p>
        <Link
          href="/#shop"
          className="inline-block bg-gold text-canvas rounded-full px-8 py-3 text-sm font-medium hover:bg-champagne transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    </main>
  );
}

