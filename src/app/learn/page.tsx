import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/learn';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = { title: 'Learn', description: 'Practical builder gel education for nail artists and studios.', alternates: { canonical: `${SITE_URL}/learn` } };

export default function LearnPage() {
  return <main className="min-h-screen bg-canvas text-ink"><div className="mx-auto max-w-6xl px-6 py-12"><Link href="/" className="font-serif tracking-[.2em] text-sm">LUSTER</Link><header className="py-24 md:py-32"><span className="text-[11px] uppercase tracking-[.3em] text-gold/90">The Learning Studio</span><h1 className="mt-5 max-w-3xl font-serif text-6xl tracking-tight md:text-8xl">Learn with intention.</h1><p className="mt-8 max-w-xl text-lg leading-8 text-ink/65">Practical guidance for preparation, structure, application, retention, and the decisions behind each service.</p></header><div className="grid gap-5 md:grid-cols-2">{GUIDES.map((guide) => <Link href={`/learn/${guide.slug}`} key={guide.slug} className="border border-ink/10 bg-charcoal p-7 transition hover:border-gold/40"><div className="flex justify-between gap-4 text-[11px] uppercase tracking-[.18em] text-gold/85"><span>Guide</span><span>{guide.readingTime}</span></div><h2 className="mt-16 font-serif text-3xl text-ink">{guide.title}</h2><p className="mt-4 leading-7 text-ink/65">{guide.summary}</p><span className="mt-8 inline-block text-sm text-champagne underline underline-offset-4">{guide.comingSoon ? 'Coming soon' : 'Read guide'} →</span></Link>)}</div></div></main>;
}
