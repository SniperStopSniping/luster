"use client";

import Link from "next/link";
import React, { useId, useRef, useState, useTransition } from "react";

import { MinimalDrawerNav } from "@/components/marketing/MinimalDrawerNav";
import { goToCartCheckout, CartCheckoutItem } from "@/lib/goToCartCheckout";
import {
  BUILDER_IN_A_BOTTLE,
  HARD_BUILDER_GEL,
  moneyCAD,
  TIERS,
  type Format,
  type Pillar,
  type Tier,
} from "@/lib/products";
import { STRIPE_PRICES, StripePriceKey } from "@/lib/stripePrices";

/**
 * LUSTER — Shop System
 * - Matte-black luxury aesthetic, gold accents
 * - Two-pillar system: Japanese Hard Builder Gel (jar) + Builder in a Bottle
 * - Correct tab semantics + arrow key navigation + focus management
 * - Tier selection stored per-format at page level
 * - Integrated with Stripe multi-item checkout
 */

type Product = {
  id: string;
  name: string;
  jpName: string;
  format: Format;
  swatch: string;
  description: string;
  shade: string; // Used for Stripe price key lookup
};

type CartItem = {
  uid: string;
  productId: string;
  name: string;
  format: Format;
  shade: string;
  tierId: string;
  tierLabel: string;
  price: number;
  priceId: string;
};

const PILLAR_BY_FORMAT: Record<Format, Pillar> = {
  jar: HARD_BUILDER_GEL,
  bottle: BUILDER_IN_A_BOTTLE,
};

function productsFor(format: Format): Product[] {
  return PILLAR_BY_FORMAT[format].shades.map((s) => ({
    id: `${s.id}-${format}`,
    name: s.name,
    jpName: s.jpName,
    format,
    swatch: s.swatch,
    description: s.description,
    shade: s.id,
  }));
}

function getDefaultTierId(tiers: Tier[]) {
  return tiers.find((t) => t.recommended)?.id ?? tiers[0]?.id ?? "";
}

function formatSpec(format: Format, tier: Tier) {
  const label = format === "jar" ? "NET WT." : "NET VOL.";
  return `${label} ${tier.spec.value} ${tier.spec.unit}`;
}

/**
 * Build the Stripe price key from shade, format, and tier
 * e.g., "clear" + "jar" + "sample" => "clear_jar_sample"
 */
function getStripePriceId(shade: string, format: Format, tierId: string): string {
  const key = `${shade}_${format}_${tierId}` as StripePriceKey;
  return STRIPE_PRICES[key] ?? "";
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 9V7a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6.5 9.5h11l1 12H5.5l1-12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function LusterShopPage() {
  const baseId = useId();
  const jarTabId = `${baseId}-tab-jar`;
  const bottleTabId = `${baseId}-tab-bottle`;
  const jarPanelId = `${baseId}-panel-jar`;
  const bottlePanelId = `${baseId}-panel-bottle`;

  const [format, setFormat] = useState<Format>("bottle");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Tier selection per format (robust, intentional)
  const [tierSelection, setTierSelection] = useState<Record<Format, string>>({
    jar: getDefaultTierId(TIERS.jar),
    bottle: getDefaultTierId(TIERS.bottle),
  });

  const activeProducts = productsFor(format);
  const activePillar = PILLAR_BY_FORMAT[format];

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  // Tab focus + arrow-key nav
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const setFormatAndFocus = (next: Format) => {
    setFormat(next);
    requestAnimationFrame(() => {
      tabRefs.current[next === "bottle" ? 0 : 1]?.focus();
    });
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();

    const order: Format[] = ["bottle", "jar"];
    const idx = order.indexOf(format);
    const nextIdx = e.key === "ArrowRight" ? (idx + 1) % order.length : (idx - 1 + order.length) % order.length;
    setFormatAndFocus(order[nextIdx]);
  };

  const addToCart = (product: Product, tier: Tier) => {
    const priceId = getStripePriceId(product.shade, product.format, tier.id);

    const uid =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${product.id}-${tier.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const item: CartItem = {
      uid,
      productId: product.id,
      name: product.name,
      format: product.format,
      shade: product.shade,
      tierId: tier.id,
      tierLabel: tier.label,
      price: tier.price,
      priceId,
    };

    setCart((prev) => [...prev, item]);
    setError(null);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setError(null);
    startTransition(async () => {
      try {
        // Aggregate cart items by priceId
        const aggregated = new Map<string, number>();
        for (const item of cart) {
          const current = aggregated.get(item.priceId) ?? 0;
          aggregated.set(item.priceId, current + 1);
        }

        const items: CartCheckoutItem[] = Array.from(aggregated.entries()).map(
          ([priceId, quantity]) => ({ priceId, quantity })
        );

        await goToCartCheckout(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-40">
      <MinimalDrawerNav />

      {/* Warm bloom */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-60
                   bg-[radial-gradient(ellipse_at_20%_10%,rgba(198,168,94,0.07)_0%,transparent_55%),radial-gradient(ellipse_at_85%_80%,rgba(198,168,94,0.04)_0%,transparent_45%)]"
      />

      {/* Header */}
      <header className="relative max-w-3xl mx-auto px-6 pt-14 md:pt-20">
        <Link href="/" className="font-serif tracking-[0.2em] text-xs font-medium select-none text-ink/80 hover:text-champagne transition-colors">
          LUSTER STUDIO
        </Link>

        <div className="mt-12 md:mt-16">
          <p className="text-[11px] tracking-[0.25em] text-gold/90 uppercase font-sans mb-4">
            精 密 構 造 · Precision Structure
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-ink">Shop</h1>
          <p className="mt-3 text-sm md:text-[15px] text-ink/70 font-sans">
            Select format, choose tier, build your system.
          </p>
        </div>

        {/* Format Tabs */}
        <div className="mt-10">
          <div
            role="tablist"
            aria-label="Select format"
            onKeyDown={onTabKeyDown}
            className="inline-flex gap-8 border-b border-ink/10 w-full md:w-auto"
          >
            <Tab
              id={bottleTabId}
              controls={bottlePanelId}
              active={format === "bottle"}
              label="Builder in a Bottle"
              onClick={() => setFormatAndFocus("bottle")}
              tabRef={(el) => (tabRefs.current[0] = el)}
            />
            <Tab
              id={jarTabId}
              controls={jarPanelId}
              active={format === "jar"}
              label="Hard Builder Gel · Jar"
              onClick={() => setFormatAndFocus("jar")}
              tabRef={(el) => (tabRefs.current[1] = el)}
            />
          </div>

          {/* Active pillar context */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="text-sm text-ink/70">
              <span className="text-champagne font-serif">{activePillar.name}</span>
              {" — "}
              {activePillar.tagline}
            </p>
            <a
              href={`/shop/${activePillar.slug}`}
              className="text-xs text-gold/95 hover:text-champagne underline underline-offset-4 decoration-gold/70 transition-colors"
            >
              About this formula →
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="relative max-w-3xl mx-auto px-4 md:px-6 mt-14 space-y-16">
        {/* Bottle panel */}
        <section
          id={bottlePanelId}
          role="tabpanel"
          aria-labelledby={bottleTabId}
          tabIndex={0}
          hidden={format !== "bottle"}
          className="space-y-16"
        >
          {format === "bottle" &&
            activeProducts.map((product) => (
              <ProductRow
                key={`${format}-${product.id}`}
                product={product}
                tiers={TIERS.bottle}
                format="bottle"
                selectedTierId={tierSelection.bottle}
                onSelectTier={(id) => setTierSelection((prev) => ({ ...prev, bottle: id }))}
                onAdd={addToCart}
              />
            ))}
        </section>

        {/* Jar panel */}
        <section
          id={jarPanelId}
          role="tabpanel"
          aria-labelledby={jarTabId}
          tabIndex={0}
          hidden={format !== "jar"}
          className="space-y-16"
        >
          {format === "jar" &&
            activeProducts.map((product) => (
              <ProductRow
                key={`${format}-${product.id}`}
                product={product}
                tiers={TIERS.jar}
                format="jar"
                selectedTierId={tierSelection.jar}
                onSelectTier={(id) => setTierSelection((prev) => ({ ...prev, jar: id }))}
                onAdd={addToCart}
              />
            ))}
        </section>

        {/* Technical footer */}
        <div className="pt-10 border-t border-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs text-ink/70">
            <div className="flex justify-between md:block">
              <span className="text-ink/55 block mb-1">Formulation</span>
              <span>HEMA-free · Acid-free</span>
            </div>
            <div className="flex justify-between md:block">
              <span className="text-ink/55 block mb-1">Origin</span>
              <span>Engineered in Japan</span>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky cart */}
      {cartCount > 0 && (
        <StickyCartBar
          count={cartCount}
          total={cartTotal}
          onCheckout={handleCheckout}
          isPending={isPending}
          error={error}
        />
      )}
    </div>
  );
}

function Tab({
  id,
  controls,
  active,
  label,
  onClick,
  tabRef,
}: {
  id: string;
  controls: string;
  active: boolean;
  label: string;
  onClick: () => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={tabRef}
      id={id}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={[
        "pb-4 text-xs tracking-[0.12em] uppercase transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm",
        active
          ? "text-champagne border-b-2 border-gold font-medium"
          : "text-ink/60 hover:text-ink/80 border-b-2 border-transparent",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ProductRow({
  product,
  tiers,
  onAdd,
  format,
  selectedTierId,
  onSelectTier,
}: {
  product: Product;
  tiers: Tier[];
  onAdd: (p: Product, t: Tier) => void;
  format: Format;
  selectedTierId: string;
  onSelectTier: (tierId: string) => void;
}) {
  const currentTier = tiers.find((t) => t.id === selectedTierId) ?? tiers[0];

  return (
    <article className="group">
      {/* Product header */}
      <div className="flex gap-5 mb-6">
        <div
          className="w-12 h-12 rounded-full border border-ink/15 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] shrink-0"
          style={{ backgroundColor: product.swatch }}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <h2 className="font-serif text-2xl text-ink flex items-baseline gap-3 flex-wrap">
            {product.name}
            <span className="font-sans text-xs text-gold/85 font-normal tracking-normal">{product.jpName}</span>
          </h2>
          <p className="text-[15px] text-ink/75 mt-1 leading-relaxed max-w-md">{product.description}</p>
        </div>
      </div>

      {/* Tier options */}
      <div className="space-y-2 md:pl-[4.25rem]">
        {tiers.map((t) => {
          const selected = t.id === selectedTierId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTier(t.id)}
              className={[
                "w-full text-left p-4 rounded-sm border transition-all duration-200 flex items-center justify-between gap-4",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
                selected
                  ? "bg-clay border-gold/35 shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
                  : "bg-transparent border-transparent hover:bg-clay/50 hover:border-ink/10",
              ].join(" ")}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={["text-sm", selected ? "font-medium text-champagne" : "text-ink/65"].join(" ")}>
                    {t.label}
                  </span>

                  {t.recommended && (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-gold/95 border border-gold/30 px-2 py-1 rounded-[2px]">
                      推奨
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="uppercase tracking-[0.18em] text-[10px] font-mono text-ink/60 bg-ink/[0.04] px-1 py-0.5 rounded-[2px]">
                    {formatSpec(format, t)}
                  </span>
                  <span className={["text-[11px]", selected ? "text-ink/75" : "text-ink/60"].join(" ")}>
                    {t.sub}
                  </span>
                </div>
              </div>

              <div className="text-sm font-medium tabular-nums text-ink/90">{moneyCAD.format(t.price)}</div>
            </button>
          );
        })}
      </div>

      {/* Add button */}
      <div className="mt-6 md:pl-[4.25rem] flex md:justify-end">
        <button
          type="button"
          onClick={() => onAdd(product, currentTier)}
          disabled={!currentTier}
          className="
            w-full md:w-auto bg-gold text-canvas px-8 py-3 rounded-full
            text-xs font-bold tracking-[0.15em] uppercase
            hover:bg-champagne transition-all shadow-lg shadow-black/30
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
          "
        >
          Add — {currentTier?.label ?? "Select Tier"}
        </button>
      </div>

      {/* Divider */}
      <div className="mt-14 h-px bg-ink/[0.08]" />
    </article>
  );
}

function StickyCartBar({
  count,
  total,
  onCheckout,
  isPending,
  error,
}: {
  count: number;
  total: number;
  onCheckout: () => void;
  isPending: boolean;
  error: string | null;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-3xl mx-auto bg-clay text-ink rounded-xl shadow-2xl shadow-black/60 p-4 flex flex-col pointer-events-auto ring-1 ring-gold/25">
        {error && (
          <p className="text-red-400 text-xs mb-3 px-1">{error}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="bg-gold/15 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <BagIcon className="w-4 h-4 text-champagne" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] uppercase tracking-widest text-ink/70">
                {count} item{count > 1 ? "s" : ""} in cart
              </span>
              <span className="font-serif text-lg leading-none mt-1 tabular-nums">{moneyCAD.format(total)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={isPending}
            className="bg-gold text-canvas px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase
                       hover:bg-champagne transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          >
            {isPending ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
