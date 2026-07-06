import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MinimalDrawerNav } from '@/components/marketing/MinimalDrawerNav';
import { JsonLd } from '@/components/seo/JsonLd';
import { ProductPurchase } from '@/components/store/ProductPurchase';
import { getPillarBySlug, PILLARS } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};

  const title =
    pillar.role === 'gateway'
      ? `${pillar.name} — Professional Builder Gel`
      : `${pillar.name} — Jar, 6+ Week Retention`;
  const description =
    pillar.role === 'gateway'
      ? 'LUSTER Builder in a Bottle: self-leveling professional builder gel with controlled flow and no flooding. HEMA-free, acid-free, made for licensed nail technicians in Canada.'
      : 'LUSTER Japanese Hard Builder Gel in a jar: elite sculpting structure, advanced apex control, and 6+ week retention. For licensed nail professionals in Canada.';

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/shop/${pillar.slug}` },
    openGraph: {
      title: `${pillar.name} | LUSTER`,
      description,
      url: `${SITE_URL}/shop/${pillar.slug}`,
      images: [{ url: `${SITE_URL}${pillar.image}` }],
      type: 'website',
    },
  };
}

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const other = PILLARS.find((p) => p.slug !== pillar.slug)!;
  const prices = pillar.tiers.map((t) => t.price);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `LUSTER ${pillar.name}`,
    description: pillar.description,
    image: `${SITE_URL}${pillar.image}`,
    brand: { '@type': 'Brand', name: 'LUSTER' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: pillar.tiers.length * pillar.shades.length,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/shop/${pillar.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
      { '@type': 'ListItem', position: 3, name: pillar.name, item: `${SITE_URL}/shop/${pillar.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pillar.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <MinimalDrawerNav />

      {/* Breadcrumb / header */}
      <header className="mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          <Link href="/" className="hover:text-champagne transition-colors">LUSTER</Link>
          <span className="mx-2 text-gold/70">/</span>
          <Link href="/shop" className="hover:text-champagne transition-colors">Shop</Link>
          <span className="mx-2 text-gold/70">/</span>
          <span className="text-ink/80">{pillar.name}</span>
        </nav>
      </header>

      {/* Product hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            <Image
              src={pillar.image}
              alt={pillar.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 46vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 border border-gold/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-champagne backdrop-blur-sm">
              {pillar.role === 'gateway' ? 'The Gateway' : 'The Elite Tier'}
            </span>
          </div>

          <div>
            <span className="block text-[11px] uppercase tracking-[0.3em] text-gold/90">
              {pillar.jpLabel}
            </span>
            <h1 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              {pillar.name}
            </h1>
            <p className="mt-3 font-serif text-lg text-champagne">{pillar.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
              {pillar.description}
            </p>

            <ul className="mt-8 space-y-2.5">
              {pillar.positioning.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-gold/50" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ProductPurchase pillar={pillar} />
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-ink/[0.07] bg-charcoal py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">Who this is for</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillar.whoFor.map((who, i) => (
              <div key={who} className="border border-ink/10 bg-canvas/60 p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/85">
                  0{i + 1}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/85">{who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">Questions</h2>
          <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {pillar.faq.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink/85 md:text-base [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span className="text-gold/85 transition-transform duration-200 group-open:rotate-45" aria-hidden="true">＋</span>
                </summary>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/75">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Complete the system */}
      <section className="border-t border-gold/15 bg-clay py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold/90">
            Complete the System
          </span>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <a href={`/shop/${other.slug}`} className="group relative block aspect-[16/10] overflow-hidden bg-canvas">
              <Image
                src={other.image}
                alt={other.imageAlt}
                fill
                sizes="(min-width: 768px) 46vw, 92vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-clay via-transparent to-transparent" />
            </a>
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">{other.name}</h2>
              <p className="mt-2 font-serif text-champagne">{other.tagline}</p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/80">{other.description}</p>
              <a
                href={`/shop/${other.slug}`}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-gold/50 px-8 py-3.5 text-sm text-champagne transition-colors hover:bg-gold hover:text-canvas"
              >
                Explore {other.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-ink/60 sm:flex-row">
          <Link href="/" className="font-serif tracking-[0.2em] text-ink/80 hover:text-champagne transition-colors">
            LUSTER
          </Link>
          <div className="flex items-center gap-4">
            <span>Formulated in Japan</span>
            <a href="/privacy" className="hover:text-champagne transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-champagne transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
