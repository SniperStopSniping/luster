import { ColorSystemHero } from '@/components/marketing/ColorSystemHero';
import { Hero3DFeel } from '@/components/marketing/Hero3DFeel';
import { MinimalDrawerNav } from '@/components/marketing/MinimalDrawerNav';
import { SystemIntro } from '@/components/marketing/SystemIntro';
import { ProductSelector } from '@/components/store/ProductSelector';
import { TechAccordion } from '@/components/ui/TechAccordion';
import { SectionScrollController } from '@/components/SectionScrollController';

export default function HomePage() {
  return (
    <main id="main-content" className="pb-3 md:pb-0 overflow-y-auto h-[100dvh]">
      <SectionScrollController />
      <MinimalDrawerNav />
      <Hero3DFeel
        title="LUSTER"
        subtitle={
          'HEMA-free Japanese builder gel.\nDesigned for natural nail strength, clarity, and control.'
        }
      />

      <SystemIntro />

      <ColorSystemHero
        imageSrc="/images/colour-book.png"
        imageAlt="LUSTER Structure System color palette showing sheer, milky, nude, and signature nude gel shades"
        headline="Clarity First. Color Without Compromise."
        body="Our Super Clear builder gel delivers unmatched clarity, designed to accept any color without distortion or clouding. From sheer to nude tones, each shade is balanced for natural depth and professional structure."
        microLabel="Clear · Milky · Nude · Signature Nudes"
        ctaText="View All Products →"
        ctaHref="#shop"
      />

      <ProductSelector />

      <section id="system" data-scroll-section className="bg-clay py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-8">Technical Overview</h2>
          <TechAccordion />
        </div>
      </section>

      <section id="studio" data-scroll-section className="bg-canvas py-24 md:py-32 border-b border-ink/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-1">Studio</h2>
          <p className="text-ink/50 text-sm mb-6">Licensed professionals only.</p>
          <p className="text-ink/70 text-sm max-w-md mb-12 md:mb-14">
            Studio access unlocks education, studio pricing, and early releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@lustergel.com?subject=Studio%20Access%20Application"
              className="inline-flex items-center justify-center bg-ink text-canvas px-6 py-3 text-sm hover:bg-ink/90 transition-colors"
            >
              Apply for Studio Access
            </a>
            <a
              href="mailto:hello@lustergel.com?subject=Wholesale%20Inquiry"
              className="inline-flex items-center justify-center border border-ink/15 text-ink px-6 py-2.5 text-sm hover:border-ink/30 hover:bg-ink/[0.02] transition-colors"
            >
              Wholesale Inquiry
            </a>
            <a
              href="mailto:hello@lustergel.com?subject=Education%20Updates"
              className="inline-flex items-center justify-center border border-ink/15 text-ink px-6 py-2.5 text-sm hover:border-ink/30 hover:bg-ink/[0.02] transition-colors"
            >
              Education Updates
            </a>
          </div>
        </div>
      </section>

      <footer data-scroll-section className="pt-[28px] pb-[6px] md:py-[38px] border-t border-ink/10 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-3">
            <p className="font-mono text-xs text-ink/50">
              Formulated & Engineered in Japan
            </p>
            <p className="font-mono text-xs text-ink/30">
              © 2025 LUSTER
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 font-mono text-xs text-ink/40">
            <a href="/privacy" className="hover:text-ink transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-ink transition-colors">Terms</a>
            <a href="/contact" className="hover:text-ink transition-colors">Contact</a>
            <a href="/wholesale" className="hover:text-ink transition-colors">Wholesale</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
