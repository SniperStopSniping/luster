'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useTransition, useEffect, useRef } from 'react';

import { goToCheckout } from '@/lib/goToCheckout';
import { STRIPE_PRICES } from '@/lib/stripePrices';

type Format = 'jar' | 'bottle';
type JarVariant = 'sample' | 'studio' | 'refill';
type BottleVariant = 'sample' | 'standard' | 'studio';

interface Sku {
  name: string;
  description: string;
  priceCad: number;
  recommended?: boolean;
}

// Builder in a Jar options
const JAR_SKUS: Record<JarVariant, Sku> = {
  sample: { 
    name: 'Sample Jar', 
    description: 'Pure structural control',
    priceCad: 18,
  },
  studio: { 
    name: 'Studio Jar', 
    description: 'Balanced coverage for regular services',
    priceCad: 58,
  },
  refill: { 
    name: 'Refill Jar', 
    description: 'Designed for high-volume studio use',
    priceCad: 158,
    recommended: true,
  },
};

// Builder in a Bottle options
const BOTTLE_SKUS: Record<BottleVariant, Sku> = {
  sample: { 
    name: 'Sample Bottle', 
    description: 'Precision application · Try format',
    priceCad: 14,
  },
  standard: { 
    name: 'Standard Bottle', 
    description: 'Daily studio workflow',
    priceCad: 28,
  },
  studio: { 
    name: 'Studio Bottle', 
    description: 'Designed for high-use professional services',
    priceCad: 44,
    recommended: true,
  },
};

function getJarPriceId(variant: JarVariant) {
  if (variant === 'sample') return STRIPE_PRICES.jar_sample;
  if (variant === 'studio') return STRIPE_PRICES.jar_studio;
  return STRIPE_PRICES.jar_refill;
}

function getBottlePriceId(variant: BottleVariant) {
  if (variant === 'sample') return STRIPE_PRICES.bottle_sample;
  if (variant === 'standard') return STRIPE_PRICES.bottle_standard;
  return STRIPE_PRICES.bottle_studio;
}

// Glass checkmark component
function GlassCheck() {
  return (
    <span className="glass-check flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M2.5 6L5 8.5L9.5 3.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ProductSelector() {
  const [format, setFormat] = useState<Format>('jar');
  const [jarVariant, setJarVariant] = useState<JarVariant | null>(null);
  const [bottleVariant, setBottleVariant] = useState<BottleVariant | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Track if the shop section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      { threshold: [0, 0.3, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Derive selected SKU based on format
  const selectedSku = format === 'jar' 
    ? (jarVariant ? JAR_SKUS[jarVariant] : null)
    : (bottleVariant ? BOTTLE_SKUS[bottleVariant] : null);

  async function handleCheckout() {
    if (!selectedSku) return;
    
    setError(null);
    startTransition(async () => {
      try {
        const priceId = format === 'jar' 
          ? getJarPriceId(jarVariant!)
          : getBottlePriceId(bottleVariant!);
        await goToCheckout(priceId, selectedSku.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    });
  }

  const jarVariants: JarVariant[] = ['sample', 'studio', 'refill'];
  const bottleVariants: BottleVariant[] = ['sample', 'standard', 'studio'];

  return (
    <section ref={sectionRef} id="shop" data-scroll-section className="py-24 md:py-32 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-4xl mb-12">Select Your System</h2>

        <fieldset className="mb-12">
          <legend className="text-xs uppercase tracking-widest text-ink/40 mb-4">Format</legend>
          <div className="flex gap-6">
            {(['jar', 'bottle'] as const).map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`cursor-pointer pb-1 ${format === f ? 'border-b border-ink' : 'text-ink/40'}`}
              >
                {f === 'jar' ? 'Builder in a Jar' : 'Builder in a Bottle'}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs uppercase tracking-widest text-ink/40 mb-4">Choose Option</legend>
          <div className="border border-ink/10 divide-y divide-ink/10">
            {format === 'jar' ? (
              jarVariants.map(v => {
                const sku = JAR_SKUS[v];
                const isSelected = jarVariant === v;
                const showRecommended = sku.recommended && !isSelected;
                
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setJarVariant(v)}
                    className={`flex justify-between items-start p-5 cursor-pointer transition-colors text-left w-full ${
                      isSelected 
                        ? 'bg-clay' 
                        : showRecommended 
                          ? 'bg-clay/40 border-l-2 border-l-ink/10' 
                          : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isSelected && <GlassCheck />}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="block">{sku.name}</span>
                          {showRecommended && (
                            <span className="text-[10px] uppercase tracking-widest text-ink/40">
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="block text-xs text-ink/40 mt-1">{sku.description}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs">
                      ${sku.priceCad}
                    </span>
                  </button>
                );
              })
            ) : (
              bottleVariants.map(v => {
                const sku = BOTTLE_SKUS[v];
                const isSelected = bottleVariant === v;
                const showRecommended = sku.recommended && !isSelected;
                
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setBottleVariant(v)}
                    className={`flex justify-between items-start p-5 cursor-pointer transition-colors text-left w-full ${
                      isSelected 
                        ? 'bg-clay' 
                        : showRecommended 
                          ? 'bg-clay/40 border-l-2 border-l-ink/10' 
                          : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isSelected && <GlassCheck />}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="block">{sku.name}</span>
                          {showRecommended && (
                            <span className="text-[10px] uppercase tracking-widest text-ink/40">
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="block text-xs text-ink/40 mt-1">{sku.description}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs">
                      ${sku.priceCad}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </fieldset>

        {/* Desktop checkout - hidden on mobile, only shows when selection exists */}
        {selectedSku ? (
          <div className="hidden md:block mt-16 border-t border-ink pt-6">
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-ink/60 mb-1">
                  {selectedSku.name}
                </p>
                <span className="font-mono text-xl">${selectedSku.priceCad} CAD</span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isPending}
                className="bg-ink text-canvas px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors"
              >
                {isPending ? 'Processing...' : 'Begin Checkout'}
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:block mt-16 border-t border-ink pt-6">
            <p className="text-ink/40 text-sm">Select a format to continue</p>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA - only renders when selection exists AND section is in view */}
      <AnimatePresence>
        {selectedSku && isInView && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-canvas border-t border-ink/10 p-4"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
          >
            {error && (
              <p className="text-red-600 text-sm mb-2">{error}</p>
            )}
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  {selectedSku.name}
                </p>
                <p className="font-mono text-lg">${selectedSku.priceCad} CAD</p>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isPending}
                className="bg-ink text-canvas px-6 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors whitespace-nowrap"
              >
                {isPending ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
