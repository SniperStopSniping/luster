'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

function SparkleOverlay({ variant = 'soft' }: { variant?: 'soft' | 'strong' }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  const shimmerOpacity = variant === 'strong' ? 0.22 : 0.14;
  const twinkleOpacity = variant === 'strong' ? 0.65 : 0.48;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-[-35%] mix-blend-screen"
        style={{
          background:
            'linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.0) 60%, rgba(255,255,255,0) 100%)',
          filter: 'blur(1px)',
          opacity: shimmerOpacity,
          transform: 'translateX(-55%) rotate(8deg)',
        }}
        animate={{
          x: ['-55%', '65%'],
          opacity: [shimmerOpacity * 0.6, shimmerOpacity, shimmerOpacity * 0.6],
        }}
        transition={{
          duration: 4.6,
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
          repeatDelay: 1.0,
        }}
      />

      {/* Micro twinkles */}
      {[
        { top: '22%', left: '34%', size: 7, delay: 0.2, dur: 2.6 },
        { top: '38%', left: '64%', size: 5, delay: 1.1, dur: 2.9 },
        { top: '58%', left: '44%', size: 6, delay: 0.8, dur: 3.2 },
        { top: '72%', left: '70%', size: 4, delay: 1.9, dur: 2.4 },
      ].map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full mix-blend-screen"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0) 70%)',
            opacity: 0,
            filter: 'blur(0.2px)',
          }}
          animate={{
            opacity: [0, twinkleOpacity, 0],
            scale: [0.85, 1.15, 0.9],
          }}
          transition={{
            duration: s.dur,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}

      {/* Soft edge gloss */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 10%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 58%), radial-gradient(120% 120% at 35% 80%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 55%)',
          opacity: variant === 'strong' ? 0.55 : 0.45,
        }}
      />
    </div>
  );
}

export function Hero3DFeel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Responsive separation so mobile doesn't crop, while desktop starts further apart.
  // Use a stable initial value (avoids hydration mismatch) and then sync in a layout effect
  // to prevent a visible "bounce" on refresh.
  const [sepRange, setSepRange] = useState({ start: 20, end: 8 });
  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => {
      // Smaller values = jars start more centered (further from viewport edges).
      setSepRange(mq.matches ? { start: 36, end: 14 } : { start: 18, end: 7 });
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Progress is local to this hero: 0 at top of page, 1 after scrolling past the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const sepRaw = useTransform(scrollYProgress, [0, 1], [sepRange.start, sepRange.end]);
  const sep = useSpring(sepRaw, { stiffness: 160, damping: 34, mass: 0.6 });
  const leftX = useTransform(sep, (v) => -v);

  const ctaBaseClass =
    // Slightly lighter base + liquid-glass lens on top
    "relative isolate overflow-hidden inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-normal leading-none tracking-[0.02em] text-canvas/90 [text-shadow:0_1px_0_rgba(0,0,0,0.45)] ring-1 ring-white/10 bg-gradient-to-b from-[#2c2c2f] to-[#141416] shadow-[10px_18px_44px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.40)] transition-[transform,box-shadow,filter,ring-color] hover:brightness-[1.02] hover:ring-white/14 hover:shadow-[12px_22px_56px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:translate-y-[1px] active:shadow-[8px_14px_34px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-2px_0_rgba(0,0,0,0.52)] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.10)_42%,rgba(255,255,255,0)_74%)] before:opacity-80 hover:before:opacity-95 before:transition-opacity before:duration-200 after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(90%_70%_at_50%_120%,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0)_60%)] after:opacity-75 hover:after:opacity-90 after:transition-opacity after:duration-200";
  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative min-h-[100svh] min-h-[100dvh] md:min-h-screen flex items-center bg-paper-gradient overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <motion.div 
        className="absolute -right-20 top-0 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[140px]"
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ 
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div 
        className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]"
        animate={{ 
          scale: [1, 1.12, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ 
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-[54px] pb-[44px] md:py-[54px] w-full">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-0 md:gap-16 md:items-center">
          {/* Text content - top part on mobile */}
          <div className="md:col-span-5 md:order-1">
            <motion.h1 
              className="font-serif text-[4rem] md:text-[7rem] lg:text-[9rem] tracking-tight"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(198, 168, 94, 0)",
                    "0 0 20px rgba(198, 168, 94, 0.15)",
                    "0 0 0px rgba(198, 168, 94, 0)",
                  ],
                }}
                transition={{ 
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                {title}
              </motion.span>
            </motion.h1>
            <motion.p 
              className="mt-3 md:mt-4 text-[1.25rem] md:text-[1.625rem] font-serif text-ink/80 tracking-tight origin-left"
              initial={{ opacity: 0, y: 4 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                letterSpacing: ["-0.02em", "0em", "-0.02em"],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                letterSpacing: { duration: 10, ease: "easeInOut", repeat: Infinity, delay: 2 },
              }}
            >
              Pure Structure.
            </motion.p>
            <motion.span
              className="block mt-1 md:mt-2 text-[10px] uppercase tracking-widest text-ink/30"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0.15, 0.15, 1, 1],
              }}
              transition={{ 
                duration: 8,
                delay: 0.16,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.1, 0.4, 0.5, 0.6, 0.7, 1],
              }}
            >
              構造美学
            </motion.span>
            <motion.p 
              className="mt-2 md:mt-3 text-xs md:text-sm text-ink/50 max-w-sm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
            
            {/* CTA button */}
            <motion.a
              href="#shop"
              className={`inline-flex mt-12 md:mt-14 ${ctaBaseClass}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Build Your System
            </motion.a>
          </div>

          {/* Product images container */}
          <div
            className="md:col-span-7 md:order-2 flex justify-center items-end -translate-y-[5px] md:translate-y-0"
          >
            <div className="flex items-end">
              {/* NUDE jar - left, slightly behind */}
              <motion.div
                className="relative z-10 will-change-transform"
                style={{
                  x: prefersReducedMotion ? -sepRange.end : leftX,
                  rotate: -3,
                }}
              >
                <div className="absolute bottom-2 left-1/2 h-6 w-[70%] -translate-x-1/2 bg-black/10 md:bg-black/15 blur-xl rounded-full" />
                <div className="relative">
                  <Image
                    src="/images/nude-builder-gel.png"
                    alt="LUSTER Nude Builder Gel"
                    width={340}
                    height={340}
                    sizes="(min-width: 768px) 280px, 50vw"
                    priority
                    className="relative jar-shadow w-[160px] md:w-[280px]"
                    style={{ objectFit: 'contain' }}
                  />
                  <SparkleOverlay variant="strong" />
                </div>
              </motion.div>

              {/* CLEAR jar - right, in front */}
              <motion.div
                className="relative z-20 -ml-4 md:-ml-12 will-change-transform"
                style={{
                  x: prefersReducedMotion ? sepRange.end : sep,
                  y: -16,
                  rotate: 3,
                }}
              >
                <div className="absolute bottom-2 left-1/2 h-6 w-[70%] -translate-x-1/2 bg-black/12 md:bg-black/20 blur-xl rounded-full" />
                <div className="relative">
                  <Image
                    src="/images/clear-builder-gel.png"
                    alt="LUSTER Clear Builder Gel"
                    width={380}
                    height={380}
                    sizes="(min-width: 768px) 320px, 55vw"
                    priority
                    className="relative jar-shadow w-[180px] md:w-[320px]"
                    style={{ objectFit: 'contain' }}
                  />
                  <SparkleOverlay variant="strong" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* (Temporarily removed mobile-after-images CTA to avoid duplicate buttons on mobile) */}
        </div>
      </div>
    </section>
  );
}
