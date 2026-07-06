'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed parallax moment: the packaging photography drifts slowly while
 * the manifesto copy pins the brand voice.
 */
export function CinematicShowcase() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-canvas">
      <div className="relative min-h-[110svh]">
        <motion.div
          className="absolute inset-[-10%_0]"
          style={prefersReducedMotion ? undefined : { y }}
        >
          <Image
            src="/images/luster-builder-gel-set-open-box.jpg"
            alt="LUSTER presentation box open on black velvet, holding five matte black builder gel bottles"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/35 to-canvas" />

        <div className="relative z-10 flex min-h-[110svh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div className="max-w-lg">
              <motion.span
                className="block text-[11px] uppercase tracking-[0.3em] text-gold/90"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.8, ease }}
              >
                精密構造 · Precision Structure
              </motion.span>
              {['Precision.', 'Structure.', 'Control.'].map((word, i) => (
                <motion.span
                  key={word}
                  className="mt-2 block font-serif text-5xl leading-[1.05] tracking-tight text-ink first-of-type:mt-6 md:text-7xl"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.9, delay: 0.12 + i * 0.14, ease }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.p
                className="mt-8 max-w-md text-base leading-relaxed text-ink/80 md:text-lg"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
              >
                LUSTER is not a supply catalogue. It is a curated system —
                selective, disciplined, and made for professionals who treat
                structure as a craft. Self-leveling flow without flooding.
                Apex control without compromise.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
