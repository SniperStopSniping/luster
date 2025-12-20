'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ColorSystemHeroProps {
  imageSrc: string;
  imageAlt: string;
  headline?: string;
  body?: string;
  microLabel?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function ColorSystemHero({
  imageSrc,
  imageAlt,
  headline = 'Clarity First. Color Without Compromise.',
  body = 'Our Super Clear builder gel delivers unmatched clarity, designed to accept any color without distortion or clouding. From sheer to nude tones, each shade is balanced for natural depth and professional structure.',
  microLabel = 'Clear · Milky · Nude · Signature Nudes',
  ctaText = 'View All Products →',
  ctaHref = '#shop',
}: ColorSystemHeroProps) {
  return (
    <section
      data-scroll-section
      className="relative min-h-[100svh] min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Background image - shifted up on mobile to reveal more of the booklet */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        priority
        className="object-cover object-[center_35%] md:object-center"
      />

      {/* Gradient overlay - lighter on mobile for more image visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/40 to-transparent md:from-canvas md:via-canvas/60" />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 pb-8 md:pb-20 lg:pb-24 pt-32 md:pt-40">
        {/* Semi-transparent panel for text readability */}
        <motion.div 
          className="bg-canvas/80 backdrop-blur-sm rounded-2xl px-5 py-6 md:px-10 md:py-10 max-w-[22rem] md:max-w-xl lg:max-w-2xl mx-auto md:mx-0 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Micro label - subtle, reads as a label */}
          <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink/35 md:text-ink/50 mb-3 md:mb-5">
            {microLabel}
          </span>

          {/* Headline */}
          <h2 className="font-serif text-[1.625rem] md:text-[2.25rem] lg:text-[2.75rem] tracking-tight leading-[1.15] text-ink mb-3 md:mb-5">
            {headline}
          </h2>

          {/* Body text */}
          <p className="text-sm md:text-[15px] text-ink/70 leading-[1.7] mb-5 md:mb-8">
            {body}
          </p>

          {/* CTA Button */}
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center bg-ink text-canvas px-7 py-3.5 text-sm font-medium rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-ink/90 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:translate-y-[1px]"
          >
            {ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

