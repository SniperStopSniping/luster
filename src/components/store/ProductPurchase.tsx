'use client';

import { useState, useTransition } from 'react';

import { goToCheckout } from '@/lib/goToCheckout';
import { STRIPE_PRICES, StripePriceKey } from '@/lib/stripePrices';
import { moneyCAD, type Pillar, type Tier } from '@/lib/products';
import { useToast } from '@/components/ui/Toast';

function priceIdFor(shadeId: string, format: Pillar['format'], tierId: string): string {
  const key = `${shadeId}_${format}_${tierId}` as StripePriceKey;
  return STRIPE_PRICES[key] ?? '';
}

function specLabel(format: Pillar['format'], tier: Tier) {
  const label = format === 'jar' ? 'NET WT.' : 'NET VOL.';
  return `${label} ${tier.spec.value} ${tier.spec.unit}`;
}

export function ProductPurchase({ pillar }: { pillar: Pillar }) {
  const [shadeId, setShadeId] = useState(pillar.shades[0].id);
  const [tierId, setTierId] = useState(
    pillar.tiers.find((t) => t.recommended)?.id ?? pillar.tiers[0].id
  );
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const shade = pillar.shades.find((s) => s.id === shadeId) ?? pillar.shades[0];
  const tier = pillar.tiers.find((t) => t.id === tierId) ?? pillar.tiers[0];

  function handleCheckout() {
    startTransition(async () => {
      try {
        await goToCheckout(priceIdFor(shade.id, pillar.format, tier.id), `${shade.name} · ${tier.label}`);
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
      }
    });
  }

  return (
    <div className="border border-ink/10 bg-clay/60 p-6 md:p-8">
      <span className="block text-[11px] uppercase tracking-[0.25em] text-gold/90 mb-6">
        Configure
      </span>

      {/* Shade */}
      <fieldset className="mb-8">
        <legend className="text-xs uppercase tracking-widest text-ink/70 mb-3">Shade</legend>
        <div className="flex flex-wrap gap-3">
          {pillar.shades.map((s) => {
            const selected = s.id === shadeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setShadeId(s.id)}
                aria-pressed={selected}
                className={[
                  'flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm transition-colors',
                  selected
                    ? 'border-gold/70 text-champagne bg-canvas'
                    : 'border-ink/15 text-ink/75 hover:border-gold/40 hover:text-ink/85',
                ].join(' ')}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/30"
                  style={{ backgroundColor: s.swatch }}
                  aria-hidden="true"
                />
                {s.name.replace(' Structure', '')}
                <span className="text-[11px] text-gold/85">{s.jpName}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/65">{shade.description}</p>
      </fieldset>

      {/* Tier */}
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-ink/70 mb-3">Size</legend>
        <div className="border border-ink/10 divide-y divide-ink/10">
          {pillar.tiers.map((t) => {
            const selected = t.id === tierId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTierId(t.id)}
                aria-pressed={selected}
                className={[
                  'flex w-full items-center justify-between gap-4 p-4 text-left transition-colors',
                  selected ? 'bg-canvas' : 'hover:bg-canvas/50',
                ].join(' ')}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={selected ? 'text-champagne text-sm font-medium' : 'text-ink/75 text-sm'}>
                      {t.label}
                    </span>
                    {t.recommended && (
                      <span className="border border-gold/40 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gold/95">
                        推奨 · Recommended
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                      {specLabel(pillar.format, t)}
                    </span>
                    <span className="text-[11px] text-ink/65">{t.sub}</span>
                  </div>
                </div>
                <span className="font-mono text-sm tabular-nums text-ink/90">{moneyCAD.format(t.price)}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Checkout */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
        <div>
          <p className="text-xs text-ink/70">
            {shade.name} · {tier.label}
          </p>
          <span className="font-mono text-xl text-ink">{moneyCAD.format(tier.price)} CAD</span>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isPending}
          className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Processing…' : 'Begin Checkout'}
        </button>
      </div>
    </div>
  );
}
