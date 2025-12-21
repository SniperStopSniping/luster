'use client';

import { useState } from 'react';

interface AccordionSection {
  id: string;
  title: string;
  items: string[];
  defaultOpen?: boolean;
}

const SECTIONS: AccordionSection[] = [
  {
    id: 'formulation',
    title: 'Formulation',
    items: [
      'HEMA-free · Acid-free',
      'Medium–thick · Self-leveling',
      'Finish: Clear · Warm Nude',
      'For licensed professionals',
    ],
    defaultOpen: true,
  },
  {
    id: 'performance',
    title: 'Performance',
    items: [
      'Supports controlled apex formation',
      '3–4 weeks wear (professional application)',
    ],
    defaultOpen: true,
  },
  {
    id: 'cure-removal',
    title: 'Cure & Removal',
    items: [
      'Cure: 30–40s LED (48W+)',
      'Removal: Soak-off · 6–10 minutes',
    ],
    defaultOpen: false,
  },
  {
    id: 'origin',
    title: 'Origin',
    items: [
      'Formulated & engineered in Japan',
      'Lot No. 2025-JPN-01',
    ],
    defaultOpen: false,
  },
];

export function TechAccordion() {
  // Initialize with sections that should be open by default
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    SECTIONS.forEach(s => {
      if (s.defaultOpen) initial.add(s.id);
    });
    return initial;
  });

  function toggleSection(id: string) {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        // On mobile, only allow one open at a time
        // Check if we're on mobile by window width
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="divide-y divide-ink/10">
      {SECTIONS.map(section => {
        const isOpen = openIds.has(section.id);
        const contentId = `accordion-content-${section.id}`;

        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex justify-between items-center py-5 text-left cursor-pointer group"
            >
              <span className="text-sm md:text-base font-medium">{section.title}</span>
              <span 
                className={`text-ink/55 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={`accordion-header-${section.id}`}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="space-y-4">
                {section.items.map((item, idx) => (
                  <li key={idx} className="text-sm md:text-base text-ink/70 leading-relaxed pl-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

