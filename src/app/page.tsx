import { CinematicShowcase } from '@/components/marketing/CinematicShowcase';
import { ColorSystemHero } from '@/components/marketing/ColorSystemHero';
import { Hero } from '@/components/marketing/Hero';
import { MinimalDrawerNav } from '@/components/marketing/MinimalDrawerNav';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';
import { SignatureSystem } from '@/components/marketing/SignatureSystem';
import { SystemIntro } from '@/components/marketing/SystemIntro';
import { ProductSelector } from '@/components/store/ProductSelector';
import { TechAccordion } from '@/components/ui/TechAccordion';
import { SmoothScroll } from '@/components/SmoothScroll';

export default function HomePage() {
  return (
    <main id="main-content" className="bg-canvas text-ink">
      <SmoothScroll />
      <MinimalDrawerNav />

      <Hero />

      <SignatureSystem />

      <CinematicShowcase />

      <SystemIntro />

      <ColorSystemHero
        imageSrc="/images/colour-book.png"
        imageAlt="LUSTER Structure System color palette showing sheer, milky, nude, and signature nude gel shades"
        headline="Clarity First. Color Without Compromise."
        body="Our Super Clear builder gel delivers unmatched clarity and accepts any color without distortion or clouding. From sheer to nude tones, each shade is balanced for natural depth and professional structure."
        microLabel="Clear · Milky · Nude · Signature Nudes"
        ctaText="View All Products →"
        ctaHref="/shop"
      />

      <ProductSelector />

      <section id="technical" className="bg-charcoal py-24 md:py-32 border-t border-ink/[0.07]">
        <div className="max-w-3xl mx-auto px-6">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold/90 mb-4">
            Formulation Notes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-ink">Technical Overview</h2>
          <TechAccordion />
        </div>
      </section>

      {/* Studio — professional access */}
      <section id="studio" className="min-h-[90dvh] bg-clay flex items-center border-t border-gold/15">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-gold/90 mb-6">
            プロフェッショナル · Professional Access
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight text-ink">Studio</h2>
          <p className="text-ink/75 text-base md:text-lg mb-2">Licensed professionals only.</p>
          <p className="text-ink/75 text-base md:text-lg mb-10">Application review required. No minimum order.</p>
          <p className="text-ink/80 text-base md:text-lg max-w-lg mb-12 leading-relaxed">
            Studio access unlocks education, studio pricing, and early releases —
            entry into a selective professional network, not a mailing list.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="/studio"
              className="inline-flex items-center justify-center rounded-full bg-gold text-canvas px-8 py-3.5 text-sm font-medium hover:bg-champagne transition-colors"
            >
              Apply for Studio Access
            </a>
            <a
              href="mailto:hello@lustergel.com?subject=Wholesale%20Inquiry"
              className="inline-flex items-center justify-center rounded-full border border-ink/25 text-ink/85 px-8 py-3.5 text-sm hover:border-gold/60 hover:text-champagne transition-colors"
            >
              Wholesale Inquiry
            </a>
          </div>
          <a
            href="mailto:hello@lustergel.com?subject=Education%20Updates"
            className="text-ink/70 text-sm underline underline-offset-4 decoration-gold/60 hover:text-champagne hover:decoration-gold transition-colors"
          >
            Sign up for Education Updates →
          </a>
        </div>
      </section>

      {/* Final section - Newsletter + Footer combined */}
      <footer className="bg-canvas flex flex-col border-t border-ink/[0.07]">
        {/* Main content - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 md:py-28">
          {/* Brand mark */}
          <span className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 text-ink">LUSTER</span>
          <p className="text-ink/70 text-sm max-w-sm mx-auto text-center mb-8">
            The LUSTER Structure System — Japanese builder gel for controlled
            structure and clarity.
          </p>

          {/* Newsletter - compact */}
          <div className="w-full max-w-sm text-center mb-8">
            <p className="text-sm text-ink/75 mb-4">Stay connected for early access and updates.</p>
            <NewsletterForm />
          </div>

          {/* Social + Contact */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="https://instagram.com/luster.gel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-champagne transition-colors flex items-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
              </svg>
              @luster.gel
            </a>
            <a
              href="mailto:hello@lustergel.com"
              className="text-ink/70 hover:text-champagne transition-colors"
            >
              hello@lustergel.com
            </a>
          </div>
        </div>

        {/* Footer bar */}
        <div className="border-t border-ink/10 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <div className="flex items-center gap-3 text-ink/60">
              <span>Formulated in Japan</span>
              <span>·</span>
              <span>Free CA $75+ · JP $99+</span>
            </div>
            <div className="flex items-center gap-4 text-ink/70">
              <span className="text-gold/70">構造美学</span>
              <a href="/privacy" className="hover:text-champagne transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-champagne transition-colors">Terms</a>
              <span className="text-ink/50">© 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
