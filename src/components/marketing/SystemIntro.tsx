'use client';

import { motion } from 'framer-motion';

export function SystemIntro() {
  return (
    <section
      data-scroll-section
      className="relative min-h-[100svh] min-h-[100dvh] flex items-center bg-canvas border-t border-ink/[0.06] overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-6 py-24 md:py-32">
        <motion.h2
          className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight mb-12 md:mb-16 leading-[1.1]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Precision
          <br />
          Builder Gel Systems
        </motion.h2>

        <motion.div
          className="space-y-7 md:space-y-9"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-base md:text-lg text-ink/75 leading-[1.75] max-w-2xl">
            LUSTER builder gel systems are engineered for controlled structure,
            natural nail strength, and long-term wear.
          </p>

          <p className="text-base md:text-lg text-ink/75 leading-[1.75] max-w-2xl">
            HEMA-free and acid-free, each formula is self-leveling with controlled
            flow for precise application without flooding.
          </p>
        </motion.div>

        {/* Product links */}
        <div className="flex flex-col gap-2.5 mt-12 md:mt-16">
          <a
            href="/shop"
            className="text-sm font-medium text-ink/85 hover:text-ink underline underline-offset-2 decoration-ink/40 hover:decoration-ink transition-colors w-fit"
          >
            Explore Builder Gel in a Jar →
          </a>
          <a
            href="/shop"
            className="text-sm font-medium text-ink/85 hover:text-ink underline underline-offset-2 decoration-ink/40 hover:decoration-ink transition-colors w-fit"
          >
            Explore Builder Gel in a Bottle →
          </a>
        </div>

        {/* Japanese characters accent */}
        <span className="block mt-14 md:mt-20 text-[10px] uppercase tracking-[0.25em] text-ink/55">
          精密構造 · Precision Structure
        </span>
      </div>
    </section>
  );
}
