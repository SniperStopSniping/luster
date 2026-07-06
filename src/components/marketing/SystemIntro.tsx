'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function SystemIntro() {
  return (
    <section
      className="relative flex items-center bg-canvas border-t border-ink/[0.07] overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-6 py-24 md:py-36">
        <motion.h2
          className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight mb-12 md:mb-16 leading-[1.1] text-ink"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          A system,
          <br />
          not a supply shelf.
        </motion.h2>

        <motion.div
          className="space-y-7 md:space-y-9"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-base md:text-lg text-ink/80 leading-[1.75] max-w-2xl">
            LUSTER builder gel is engineered for controlled structure, natural
            nail strength, and long-term wear — a Japanese-inspired discipline
            of precision over volume.
          </p>

          <p className="text-base md:text-lg text-ink/80 leading-[1.75] max-w-2xl">
            HEMA-free and acid-free, each formula is self-leveling with
            controlled flow for precise application without flooding. Choose
            the bottle for refined daily control, or the jar for elite
            structure and 6+ week retention.
          </p>
        </motion.div>

        {/* Product links */}
        <div className="flex flex-col gap-2.5 mt-12 md:mt-16">
          <Link
            href="/shop/builder-in-a-bottle"
            className="text-sm font-medium text-champagne hover:text-champagne underline underline-offset-4 decoration-gold/70 hover:decoration-gold transition-colors w-fit"
          >
            Explore Builder in a Bottle →
          </Link>
          <Link
            href="/shop/hard-builder-gel"
            className="text-sm font-medium text-champagne hover:text-champagne underline underline-offset-4 decoration-gold/70 hover:decoration-gold transition-colors w-fit"
          >
            Explore Japanese Hard Builder Gel →
          </Link>
        </div>

        {/* Japanese characters accent */}
        <span className="block mt-14 md:mt-20 text-[11px] uppercase tracking-[0.25em] text-gold/80">
          精密構造 · Precision Structure
        </span>
      </div>
    </section>
  );
}
