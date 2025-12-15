import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | LUSTER',
  description: 'Privacy policy for LUSTER Japanese Builder Gel.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link href="/" className="text-ink/40 hover:text-ink text-sm mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="font-serif text-4xl mb-12">Privacy Policy</h1>

        <div className="space-y-8 text-ink/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Information We Collect</h2>
            <p>
              When you make a purchase, we collect information necessary to process your order: 
              name, email address, shipping address, and payment details. Payment processing 
              is handled securely by Stripe.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">How We Use Your Information</h2>
            <p>
              We use your information solely to fulfill orders, provide customer support, 
              and send order-related communications. We do not sell or share your personal 
              information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. 
              Payment data is processed directly by Stripe and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Cookies</h2>
            <p>
              We use essential cookies to maintain site functionality. No tracking or 
              advertising cookies are used.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Contact</h2>
            <p>
              For privacy-related inquiries, please contact us through our website.
            </p>
          </section>

          <p className="text-sm text-ink/40 pt-8 border-t border-ink/10">
            Last updated: December 2024
          </p>
        </div>
      </div>
    </main>
  );
}

