'use client';

import { useEffect, useId, useState } from 'react';

type NavItem = { label: string; href: string };

const ITEMS: NavItem[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'Builder in a Bottle', href: '/shop/builder-in-a-bottle' },
  { label: 'Hard Builder Gel', href: '/shop/hard-builder-gel' },
  { label: 'Studio Access', href: '/studio' },
  { label: 'Learn', href: '/learn' },
];

export function MinimalDrawerNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    // lock scroll (document + main scroll container)
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const main = document.getElementById('main-content');
    const prevMain = main?.style.overflow;
    if (main) main.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = prev;
      if (main && typeof prevMain === 'string') main.style.overflow = prevMain;
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        aria-label="Open menu"
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="group fixed right-4 top-4 z-50 rounded-full p-3
                   bg-black/40 backdrop-blur-md ring-1 ring-gold/25
                   shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                   active:scale-[0.98] transition"
      >
        {/* 3-line icon (thin lines) */}
        <span className="relative block h-[14px] w-[18px]">
          <span className="absolute left-0 top-0 h-px w-full bg-ink/80" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/60" />
          <span className="absolute left-0 bottom-0 h-px w-full bg-ink/80" />
        </span>
      </button>

      {/* Backdrop */}
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={[
          'fixed inset-0 z-40 transition',
          open ? 'bg-black/55' : 'pointer-events-none bg-black/0',
        ].join(' ')}
      />

      {/* Panel */}
      <aside
        id={panelId}
        role="dialog"
        aria-modal="true"
        className={[
          'fixed right-0 top-0 z-50 h-dvh w-[78vw] sm:w-[360px] lg:w-[22vw]',
          'bg-charcoal/90 backdrop-blur-2xl ring-1 ring-gold/20',
          'shadow-[-30px_0_80px_rgba(0,0,0,0.6)]',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-full flex-col px-6 pt-6">
          <div className="flex items-start justify-between">
            <div className="text-[11px] tracking-[0.35em] text-gold/90">
              MENU
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 ring-1 ring-gold/25 bg-black/30 backdrop-blur
                         active:scale-[0.98] transition"
              aria-label="Close menu"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-ink/80">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-5">
            {ITEMS.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between py-2
                           border-b border-ink/10"
              >
                <span className="text-[18px] text-ink/85 tracking-tight group-hover:text-champagne transition-colors">
                  {it.label}
                </span>
                <span className="text-[11px] tracking-[0.35em] text-gold/80 group-hover:text-gold/95 transition">
                  進む
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-ink/10 text-[11px] text-ink/70 leading-relaxed">
            Shipping from Canada<br />
            Free Canadian shipping over $75<br />
            Free Japan shipping over $99
          </div>

          <div className="pb-8 pt-4">
            <div className="text-[11px] text-ink/70 leading-relaxed">
              Enhance with precision.<br />
              <span className="tracking-[0.2em] text-gold/85">構造美学</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
