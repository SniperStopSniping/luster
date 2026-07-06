'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Load three.js only when the canvas actually mounts (desktop, motion allowed).
const HeroBottleCanvas = dynamic(() => import('@/components/three/HeroBottleCanvas'), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => setShow3D(mq.matches);
    // Defer past first paint so the photo + copy own the LCP.
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const idle = hasIdle
      ? window.requestIdleCallback(apply, { timeout: 2000 })
      : window.setTimeout(apply, 800);
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] min-h-[100dvh] flex items-center overflow-hidden bg-canvas"
    >
      {/* Cinematic photo ground with slow parallax drift */}
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y: photoY }}>
        <Image
          src="/images/luster-builder-gel-system-hero.jpg"
          alt="The LUSTER Structure System — matte black builder gel bottles and presentation box"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[70%_center] md:object-center scale-[1.08]"
        />
      </motion.div>
      {/* Sink the photo into the page black */}
      <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/78 to-canvas/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/60" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />

      {/* 3D bottle — desktop only, faded in once mounted */}
      {show3D && (
        <motion.div
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
          style={{ opacity: fadeOut }}
        >
          <HeroBottleCanvas animate={!prefersReducedMotion} />
        </motion.div>
      )}

      {/* Copy */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12"
        style={prefersReducedMotion ? undefined : { opacity: fadeOut }}
      >
        <div className="max-w-xl">
          <motion.span
            className="mb-6 block text-[11px] uppercase tracking-[0.3em] text-gold/95"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            プロフェッショナル · For Licensed Nail Professionals
          </motion.span>

          <motion.h1
            className="font-serif text-[4rem] leading-none tracking-tight text-ink md:text-[7rem] lg:text-[8rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease }}
          >
            LUSTER
          </motion.h1>

          <motion.p
            className="mt-4 font-serif text-xl tracking-tight text-champagne md:text-2xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease }}
          >
            Enhance with precision.
          </motion.p>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-ink/80 md:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.26, ease }}
          >
            The LUSTER Structure System — Japanese builder gel engineered for
            structure, control, and refined application. HEMA-free. Acid-free.
            Made for studios that demand more.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.36, ease }}
          >
            <a
              href="#system"
              className="inline-flex items-center justify-center rounded-full bg-gold px-9 py-3.5 text-sm font-medium text-canvas transition-all hover:bg-champagne hover:shadow-[0_0_40px_rgba(198,168,94,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:translate-y-px"
            >
              Discover the System
            </a>
            <a
              href="/studio"
              className="inline-flex items-center justify-center rounded-full border border-ink/25 px-9 py-3.5 text-sm text-ink/85 transition-colors hover:border-gold/60 hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              Apply for Studio Access
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-ink/55"
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.div>
      )}
    </section>
  );
}
