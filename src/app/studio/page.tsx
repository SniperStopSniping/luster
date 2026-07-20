import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { MinimalDrawerNav } from '@/components/marketing/MinimalDrawerNav';
import { JsonLd } from '@/components/seo/JsonLd';
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Studio Access — For Artists, Salons & Studios',
  description:
    'Apply for LUSTER Studio Access: professional pricing, education, and early releases for artists, salons, educators, and studios in Toronto and across Canada. Application review required.',
  alternates: { canonical: `${SITE_URL}/studio` },
  openGraph: {
    title: 'LUSTER Studio Access',
    description:
      'A selective professional network for artists, salons, studios, and educators. Studio pricing, education, and early releases.',
    url: `${SITE_URL}/studio`,
  },
};

const BENEFITS = [
  {
    title: 'Studio Pricing',
    body: 'Professional pricing tiers across the full Structure System — bottle and jar — with no minimum order.',
  },
  {
    title: 'Education',
    body: 'Technique guidance on apex shaping, flooding control, and long-retention structure work, developed for working professionals.',
  },
  {
    title: 'Early Releases',
    body: 'First access to new shades, formats, and limited releases before they open to the wider professional list.',
  },
  {
    title: 'Selective Distribution',
    body: 'LUSTER is not sold everywhere, by design. Studio partners represent the brand in their city — not alongside commodity supply racks.',
  },
];

const STEPS = [
  { step: '01', title: 'Apply', body: 'Send your name, studio or salon, city, and Instagram or website.' },
  { step: '02', title: 'Review', body: 'Applications are reviewed individually. We reply to every serious application.' },
  { step: '03', title: 'Access', body: 'Approved professionals receive studio pricing, education access, and early releases.' },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Studio Access', item: `${SITE_URL}/studio` },
          ],
        }}
      />
      <MinimalDrawerNav />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <Image
          src="/images/luster-builder-gel-box-flat-lay.jpg"
          alt="LUSTER Builder Gel presentation box — matte black with gold branding"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/55 to-canvas/20" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-40 md:pb-24">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold/95">
            プロフェッショナル · Professional Access
          </span>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-ink md:text-7xl">Studio</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg">
            LUSTER is a selective system for artists, salons, studios, and educators. Studio
            Access is entry into that standard — reviewed, not automatic.
          </p>
        </div>
      </section>

      {/* Positioning statement */}
      <section className="border-t border-ink/[0.07] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-serif text-2xl leading-[1.4] tracking-tight text-ink/85 md:text-3xl">
            Not for everyone — deliberately. LUSTER partners with studios and
            artists who treat structure as a craft: disciplined, thoughtful, and
            uncompromising about the quality of their work.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-ink/[0.07] bg-charcoal py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">What access unlocks</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border border-ink/10 bg-canvas/60 p-7">
                <h3 className="font-serif text-xl text-champagne">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application flow */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">How it works</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step}>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/85">{s.step}</span>
                <h3 className="mt-3 font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/75">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-gold/15 pt-10 sm:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Studio%20Access%20Application&body=Name%3A%0AStudio%20or%20salon%20name%3A%0ACity%3A%0AInstagram%20or%20website%3A`}
              className="inline-flex items-center justify-center rounded-full bg-gold px-9 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-champagne"
            >
              Apply for Studio Access
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Wholesale%20Inquiry`}
              className="inline-flex items-center justify-center rounded-full border border-ink/25 px-9 py-3.5 text-sm text-ink/85 transition-colors hover:border-gold/60 hover:text-champagne"
            >
              Wholesale Inquiry
            </a>
          </div>
          <p className="mt-6 text-xs text-ink/60">
            No license required · Application review required · No minimum order
          </p>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-ink/60 sm:flex-row">
          <Link href="/" className="font-serif tracking-[0.2em] text-ink/80 hover:text-champagne transition-colors">
            LUSTER
          </Link>
          <div className="flex items-center gap-4">
            <span>Toronto · Canada</span>
            <a href="/privacy" className="hover:text-champagne transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-champagne transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
