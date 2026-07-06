'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PILLARS } from '@/lib/products';

const ease = [0.22, 1, 0.36, 1] as const;

export function SignatureSystem() {
  return (
    <section id="system" className="relative bg-charcoal py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold/90">
            構造システム · The LUSTER Structure System
          </span>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-6xl">
            Two pillars.
            <br />
            One discipline.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
            Every LUSTER formula exists for a reason. Builder in a Bottle is the
            refined entry — controlled, precise, efficient. The Japanese Hard
            Builder Gel is the elite tier — sculpted structure and retention
            that holds past six weeks.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-8 lg:gap-14">
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.slug}
              className="group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
            >
              <a href={`/shop/${pillar.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60">
                <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(min-width: 768px) 44vw, 92vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  />
                  {/* Light sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 border border-gold/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-champagne backdrop-blur-sm">
                    {pillar.role === 'gateway' ? 'The Gateway' : 'The Elite Tier'}
                  </span>
                </div>

                <div className="mt-7">
                  <span className="block text-[11px] uppercase tracking-[0.25em] text-gold/85">
                    {pillar.jpLabel}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight text-ink md:text-3xl">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 font-serif text-base text-champagne">{pillar.tagline}</p>
                  <ul className="mt-5 space-y-2.5">
                    {pillar.positioning.slice(0, 3).map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/75">
                        <span className="mt-[9px] h-px w-4 shrink-0 bg-gold/50" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-champagne transition-colors group-hover:text-champagne">
                    Explore {pillar.name}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
