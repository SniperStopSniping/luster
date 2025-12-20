'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useTransition, useEffect, useRef } from 'react';

import { goToCheckout } from '@/lib/goToCheckout';
import { STRIPE_PRICES } from '@/lib/stripePrices';

type Variant = 'clear' | 'nude' | 'duo';
type Pack = 'single' | 'studio';
type SkuKey = `${Variant}-${Pack}`;

interface Sku {
  name: string;
  finish: string;
  grams: string;
  priceCad: number;
  specLine: string;
}

// Single source of truth for all SKU data
const SKUS: Record<SkuKey, Sku> = {
  'clear-single': { 
    name: 'Clear Structure', 
    finish: 'Clear', 
    grams: '5g', 
    priceCad: 18,
    specLine: 'Clear · 5g · For licensed professionals',
  },
  'nude-single': { 
    name: 'Nude Structure', 
    finish: 'Warm Nude', 
    grams: '5g', 
    priceCad: 18,
    specLine: 'Warm Nude · 5g · For licensed professionals',
  },
  'duo-single': { 
    name: 'System Duo', 
    finish: 'Clear + Nude', 
    grams: '5g + 5g', 
    priceCad: 28,
    specLine: '5g Clear + 5g Nude',
  },
  'clear-studio': { 
    name: 'Clear Structure', 
    finish: 'Clear', 
    grams: '25g', 
    priceCad: 58,
    specLine: 'Clear · 25g Studio size',
  },
  'nude-studio': { 
    name: 'Nude Structure', 
    finish: 'Warm Nude', 
    grams: '25g', 
    priceCad: 58,
    specLine: 'Warm Nude · 25g Studio size',
  },
  'duo-studio': { 
    name: 'System Duo', 
    finish: 'Clear + Nude', 
    grams: '25g + 25g', 
    priceCad: 98,
    specLine: '25g Clear + 25g Nude',
  },
};

// Product display names for the selection cards
const PRODUCTS: Record<Variant, { name: string }> = {
  clear: { name: 'Clear Structure' },
  nude: { name: 'Nude Structure' },
  duo: { name: 'System Duo' },
};

function getSkuKey(variant: Variant, pack: Pack): SkuKey {
  return `${variant}-${pack}`;
}

function getPriceId(variant: Variant, pack: Pack) {
  if (pack === 'single') {
    if (variant === 'clear') return STRIPE_PRICES.gel5g_clear;
    if (variant === 'nude') return STRIPE_PRICES.gel5g_nude;
    return STRIPE_PRICES.duo5g_nude_clear;
  }

  if (variant === 'clear') return STRIPE_PRICES.gel25g_clear;
  if (variant === 'nude') return STRIPE_PRICES.gel25g_nude;
  return STRIPE_PRICES.duo25g_nude_clear;
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
  // Initialize variant to null — no pre-selection
  const [variant, setVariant] = useState<Variant | null>(null);
  const [pack, setPack] = useState<Pack>('single');
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
        // Show checkout bar when section is at least 30% visible
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      { threshold: [0, 0.3, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Derive selected SKU from state — null if no variant selected
  const selectedSku = variant ? SKUS[getSkuKey(variant, pack)] : null;

  async function handleCheckout() {
    if (!variant || !selectedSku) return;
    
    setError(null);
    startTransition(async () => {
      try {
        const priceId = getPriceId(variant, pack);
        await goToCheckout(priceId, `${selectedSku.name} ${selectedSku.grams}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    });
  }

  return (
    <section ref={sectionRef} id="shop" data-scroll-section className="py-24 md:py-32 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-4xl mb-12">Select Your System</h2>

        <fieldset className="mb-12">
          <legend className="text-xs uppercase tracking-widest text-ink/40 mb-4">Volume</legend>
          <div className="flex gap-6">
            {(['single', 'studio'] as const).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPack(p)}
                className={`cursor-pointer pb-1 ${pack === p ? 'border-b border-ink' : 'text-ink/40'}`}
              >
                {p === 'single' ? 'Single Unit' : 'Studio Pack'}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs uppercase tracking-widest text-ink/40 mb-4">Choose Formula</legend>
          <div className="border border-ink/10 divide-y divide-ink/10">
            {(Object.keys(PRODUCTS) as Variant[]).map(v => {
              const sku = SKUS[getSkuKey(v, pack)];
              const isSelected = variant === v;
              const isDuoRecommended = v === 'duo' && variant !== 'duo';
              
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`flex justify-between items-start p-5 cursor-pointer transition-colors text-left w-full ${
                    isSelected 
                      ? 'bg-clay' 
                      : isDuoRecommended 
                        ? 'bg-clay/40 border-l-2 border-l-ink/10' 
                        : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isSelected && <GlassCheck />}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block">{sku.name}</span>
                        {isDuoRecommended && (
                          <span className="text-[10px] uppercase tracking-widest text-ink/40">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-ink/40 mt-1">{sku.specLine}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs">
                    ${sku.priceCad} CAD
                  </span>
                </button>
              );
            })}
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
                  {selectedSku.name} · {selectedSku.grams}
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
            <p className="text-ink/40 text-sm">Select a formula to continue</p>
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
                  {selectedSku.name} · {selectedSku.grams}
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
