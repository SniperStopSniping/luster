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
        <p className="text-ink/60 mb-8">Thank you for your purchase.</p>

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

