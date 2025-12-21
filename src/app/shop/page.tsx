"use client";

import React, { useId, useRef, useState, useTransition } from "react";

import { goToCartCheckout, CartCheckoutItem } from "@/lib/goToCartCheckout";
import { STRIPE_PRICES, StripePriceKey } from "@/lib/stripePrices";

/**
 * LUSTER — Shop System (Brand New Shop Page)
 * - Japanese industrial / warm paper aesthetic
 * - Correct tab semantics + arrow key navigation + focus management
 * - Tier selection stored per-format at page level (robust)
 * - Typed size spec: { value, unit } with luxury-correct formatting
 * - Jars: NET WT. (g) / Bottles: NET VOL. (mL)
 * - Mobile ergonomics: Add button full-width, desktop aligns right
 * - Sticky cart summary includes bag icon, no delete actions
 * - Integrated with Stripe multi-item checkout
 */

type Format = "jar" | "bottle";
type TierUnit = "g" | "mL";

type TierSpec = { value: number; unit: TierUnit };

type Tier = {
  id: string;
  label: string;
  price: number;
  sub: string;
  spec: TierSpec;
  recommended?: boolean;
};

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
  jpName: string;
  format: Format;
  shade: string;
  tierId: string;
  tierLabel: string;
  price: number;
  priceId: string;
};

const TIERS: Record<Format, Tier[]> = {
  jar: [
    { id: "sample", label: "Sample Jar", price: 18, sub: "Pure structural control", spec: { value: 5, unit: "g" } },
    { id: "studio", label: "Studio Jar", price: 58, sub: "Balanced coverage for regular services", spec: { value: 25, unit: "g" } },
    {
      id: "refill",
      label: "Refill Jar",
      price: 158,
      sub: "Designed for high-volume studio use",
      spec: { value: 100, unit: "g" },
      recommended: true,
    },
  ],
  bottle: [
    { id: "sample", label: "Sample Bottle", price: 14, sub: "Precision application · Try format", spec: { value: 5, unit: "mL" } },
    { id: "standard", label: "Standard Bottle", price: 28, sub: "Daily studio workflow", spec: { value: 15, unit: "mL" }, recommended: true },
    { id: "studio", label: "Studio Bottle", price: 44, sub: "Designed for high-use professional services", spec: { value: 30, unit: "mL" } },
  ],
};

const PRODUCTS: Product[] = [
  // JAR
  { id: "clear-jar", name: "Clear Structure", jpName: "クリア", format: "jar", swatch: "rgba(255,255,255,0.92)", description: "Unmatched clarity for color layering and encapsulation.", shade: "clear" },
  { id: "milky-jar", name: "Milky Structure", jpName: "ミルキー", format: "jar", swatch: "rgba(252,250,245,1)", description: "Soft diffusion for natural depth and gentle coverage.", shade: "milky" },
  { id: "nude-jar", name: "Nude Structure", jpName: "ヌード", format: "jar", swatch: "rgba(228,203,180,0.75)", description: "Warm coverage with a natural finish for studio staples.", shade: "nude" },
  { id: "sheer-jar", name: "Sheer Structure", jpName: "シアー", format: "jar", swatch: "rgba(245,235,228,0.85)", description: "A translucent veil for subtle structure and refinement.", shade: "sheer" },

  // BOTTLE
  { id: "clear-bottle", name: "Clear Structure", jpName: "クリア", format: "bottle", swatch: "rgba(255,255,255,0.92)", description: "Brush-applied control for consistent structure work.", shade: "clear" },
  { id: "milky-bottle", name: "Milky Structure", jpName: "ミルキー", format: "bottle", swatch: "rgba(252,250,245,1)", description: "Soft coverage with workflow speed and brush control.", shade: "milky" },
  { id: "nude-bottle", name: "Nude Structure", jpName: "ヌード", format: "bottle", swatch: "rgba(228,203,180,0.75)", description: "Natural warmth in a controlled-flow workflow format.", shade: "nude" },
];

const moneyCAD = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });

function getDefaultTierId(tiers: Tier[]) {
  return tiers.find((t) => t.recommended)?.id ?? tiers[0]?.id ?? "";
}

function formatSpec(format: Format, spec: TierSpec) {
  const label = format === "jar" ? "NET WT." : "NET VOL.";
  return `${label} ${spec.value} ${spec.unit}`;
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

  const [format, setFormat] = useState<Format>("jar");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Tier selection per format (robust, intentional)
  const [tierSelection, setTierSelection] = useState<Record<Format, string>>({
    jar: getDefaultTierId(TIERS.jar),
    bottle: getDefaultTierId(TIERS.bottle),
  });

  const tiers = TIERS[format];
  const activeProducts = PRODUCTS.filter((p) => p.format === format);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  // Tab focus + arrow-key nav
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const setFormatAndFocus = (next: Format) => {
    setFormat(next);
    requestAnimationFrame(() => {
      tabRefs.current[next === "jar" ? 0 : 1]?.focus();
    });
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();

    const order: Format[] = ["jar", "bottle"];
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
      jpName: product.jpName,
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
    <div className="min-h-screen bg-[#F5F3EF] text-[#2D2D2D] pb-40 selection:bg-[#2D2D2D] selection:text-[#F5F3EF]">
      {/* Paper bloom */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-45
                   bg-[radial-gradient(ellipse_at_20%_18%,rgba(255,255,255,0.90)_0%,transparent_55%),radial-gradient(ellipse_at_80%_72%,rgba(255,255,255,0.55)_0%,transparent_45%)]"
      />

      {/* Header */}
      <header className="relative max-w-3xl mx-auto px-6 pt-14 md:pt-20">
        <div className="flex items-center justify-between">
          <a href="/" className="font-serif tracking-[0.2em] text-xs font-medium select-none hover:opacity-70 transition-opacity">
            LUSTER STUDIO
          </a>

          <button
            type="button"
            aria-label="Open menu"
            className="h-10 w-10 rounded-full bg-white/50 border border-black/5 flex flex-col items-center justify-center gap-1
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            <span className="w-4 h-px bg-[#2D2D2D]" />
            <span className="w-4 h-px bg-[#2D2D2D]" />
          </button>
        </div>

        <div className="mt-12 md:mt-16">
          <p className="text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase font-sans mb-4">
            精 密 構 造 · Precision Structure
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-[#1A1A1A]">Shop</h1>
          <p className="mt-3 text-sm md:text-[15px] text-[#6D6D6D] font-sans">
            Select format, choose tier, build your system.
          </p>
        </div>

        {/* Format Tabs */}
        <div className="mt-10">
          <div
            role="tablist"
            aria-label="Select format"
            onKeyDown={onTabKeyDown}
            className="inline-flex gap-8 border-b border-black/10 w-full md:w-auto"
          >
            <Tab
              id={jarTabId}
              controls={jarPanelId}
              active={format === "jar"}
              label="Builder in a Jar"
              onClick={() => setFormatAndFocus("jar")}
              tabRef={(el) => (tabRefs.current[0] = el)}
            />
            <Tab
              id={bottleTabId}
              controls={bottlePanelId}
              active={format === "bottle"}
              label="Builder in a Bottle"
              onClick={() => setFormatAndFocus("bottle")}
              tabRef={(el) => (tabRefs.current[1] = el)}
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="relative max-w-3xl mx-auto px-4 md:px-6 mt-14 space-y-16">
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

        {/* Technical footer */}
        <div className="pt-10 border-t border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs text-[#666]">
            <div className="flex justify-between md:block">
              <span className="text-[#999] block mb-1">Formulation</span>
              <span>HEMA-free · Acid-free</span>
            </div>
            <div className="flex justify-between md:block">
              <span className="text-[#999] block mb-1">Origin</span>
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
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-sm",
        active
          ? "text-[#1A1A1A] border-b-2 border-[#1A1A1A] font-medium"
          : "text-[#999] hover:text-[#555] border-b-2 border-transparent",
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
          className="w-12 h-12 rounded-full border border-black/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] shrink-0"
          style={{ backgroundColor: product.swatch }}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <h2 className="font-serif text-2xl text-[#1A1A1A] flex items-baseline gap-3 flex-wrap">
            {product.name}
            <span className="font-sans text-xs text-[#999] font-normal tracking-normal">{product.jpName}</span>
          </h2>
          <p className="text-sm text-[#666] mt-1 leading-relaxed max-w-md">{product.description}</p>
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
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                selected
                  ? "bg-white border-[#2D2D2D]/20 shadow-sm"
                  : "bg-transparent border-transparent hover:bg-white/40 hover:border-black/5",
              ].join(" ")}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={["text-sm", selected ? "font-medium text-[#1A1A1A]" : "text-[#555]"].join(" ")}>
                    {t.label}
                  </span>

                  {t.recommended && (
                    <span className="text-[9px] uppercase tracking-[0.18em] text-[#777] bg-black/[0.04] px-2 py-1 rounded-[2px]">
                      推奨
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="uppercase tracking-[0.18em] text-[9px] font-mono text-black/45 bg-black/[0.03] px-1 py-0.5 rounded-[2px]">
                    {formatSpec(format, t.spec)}
                  </span>
                  <span className={["text-[11px]", selected ? "text-[#666]" : "text-[#999]"].join(" ")}>
                    {t.sub}
                  </span>
                </div>
              </div>

              <div className="text-sm font-medium tabular-nums text-[#222]">{moneyCAD.format(t.price)}</div>
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
            w-full md:w-auto bg-[#1A1A1A] text-[#F5F3EF] px-8 py-3 rounded-full
            text-xs font-bold tracking-[0.15em] uppercase
            hover:bg-[#333] transition-all shadow-lg shadow-black/5
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20
          "
        >
          Add — {currentTier?.label ?? "Select Tier"}
        </button>
      </div>

      {/* Divider */}
      <div className="mt-14 h-px bg-black/[0.05]" />
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
      <div className="max-w-3xl mx-auto bg-[#1A1A1A] text-[#F5F3EF] rounded-xl shadow-2xl p-4 flex flex-col pointer-events-auto ring-1 ring-white/10">
        {error && (
          <p className="text-red-400 text-xs mb-3 px-1">{error}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <BagIcon className="w-4 h-4 text-white/85" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-white/60">
                {count} item{count > 1 ? "s" : ""} in cart
              </span>
              <span className="font-serif text-lg leading-none mt-1 tabular-nums">{moneyCAD.format(total)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={isPending}
            className="bg-[#F5F3EF] text-[#1A1A1A] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase
                       hover:bg-white transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {isPending ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}

