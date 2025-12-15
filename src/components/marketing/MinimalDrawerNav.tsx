'use client';

import { useEffect, useId, useState } from 'react';

type NavItem = { label: string; href: string };

const ITEMS: NavItem[] = [
  { label: 'Shop', href: '#shop' },
  { label: 'System', href: '#system' },
  { label: 'Studio', href: '#studio' },
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
                   bg-white/40 backdrop-blur-md ring-1 ring-black/10
                   shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                   active:scale-[0.98] transition"
      >
        {/* 3-line icon (thin lines) */}
        <span className="relative block h-[14px] w-[18px]">
          <span className="absolute left-0 top-0 h-px w-full bg-black/70" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-black/55" />
          <span className="absolute left-0 bottom-0 h-px w-full bg-black/70" />
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
          open ? 'bg-black/25' : 'pointer-events-none bg-black/0',
        ].join(' ')}
      />

      {/* Panel */}
      <aside
        id={panelId}
        role="dialog"
        aria-modal="true"
        className={[
          'fixed right-0 top-0 z-50 h-dvh w-[78vw] sm:w-[360px] lg:w-[20vw]',
          'bg-white/55 backdrop-blur-2xl ring-1 ring-black/10',
          'shadow-[-30px_0_80px_rgba(0,0,0,0.18)]',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-full flex-col px-6 pt-6">
          <div className="flex items-start justify-between">
            <div className="text-[11px] tracking-[0.35em] text-black/45">
              MENU
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 ring-1 ring-black/10 bg-white/35 backdrop-blur
                         active:scale-[0.98] transition"
              aria-label="Close menu"
            >
              <span className="block text-black/70 text-lg leading-none">×</span>
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-5">
            {ITEMS.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between py-2
                           border-b border-black/10"
              >
                <span className="text-[18px] text-black/80 tracking-tight">
                  {it.label}
                </span>
                <span className="text-[11px] tracking-[0.35em] text-black/35 group-hover:text-black/50 transition">
                  進む
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-black/10 text-[11px] text-black/45 leading-relaxed">
            Shipping from Canada<br />
            Free Canadian shipping over $75
          </div>

          <div className="pb-8 pt-4">
            <div className="text-[11px] text-black/40 leading-relaxed">
              Pure Structure.<br />
              <span className="tracking-[0.2em]">構造美学</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

