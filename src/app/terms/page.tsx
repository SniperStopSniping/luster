import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | LUSTER',
  description: 'Terms of service for LUSTER Japanese Builder Gel.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link href="/" className="text-ink/40 hover:text-ink text-sm mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="font-serif text-4xl mb-12">Terms of Service</h1>

        <div className="space-y-8 text-ink/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Professional Use</h2>
            <p>
              LUSTER products are formulated for professional nail technicians. 
              By purchasing, you acknowledge that you have the training and expertise 
              to use professional-grade builder gel products safely.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Orders and Payment</h2>
            <p>
              All prices are listed in Canadian Dollars (CAD). Payment is processed 
              securely through Stripe at the time of purchase. Orders are confirmed 
              via email upon successful payment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Shipping</h2>
            <p>
              Orders are processed and shipped within 2-3 business days. Shipping times 
              vary by destination. You will receive tracking information once your order ships.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Returns</h2>
            <p>
              Due to the nature of professional cosmetic products, we cannot accept returns 
              on opened items. Unopened products may be returned within 14 days of delivery 
              for a full refund. Please contact us to initiate a return.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Product Use</h2>
            <p>
              Always perform a patch test before use. Avoid skin contact with uncured gel. 
              Cure according to product specifications. We are not liable for improper use 
              or allergic reactions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Limitation of Liability</h2>
            <p>
              Our liability is limited to the purchase price of the product. We are not 
              responsible for indirect, incidental, or consequential damages arising from 
              product use.
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

