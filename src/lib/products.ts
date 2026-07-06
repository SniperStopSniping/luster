/**
 * The LUSTER Structure System — two signature pillars.
 *
 * Builder in a Bottle  — the gateway product: refined control, no flooding,
 *                        precise brush application for daily studio work.
 * Japanese Hard Builder Gel (Jar) — the elite performance product: sculpted
 *                        structure, advanced control, 6+ week retention.
 */

export type Format = 'jar' | 'bottle';
export type TierUnit = 'g' | 'mL';

export type Tier = {
  id: string;
  label: string;
  price: number;
  sub: string;
  spec: { value: number; unit: TierUnit };
  recommended?: boolean;
};

export type Shade = {
  id: string;
  name: string;
  jpName: string;
  swatch: string;
  description: string;
};

export type Pillar = {
  slug: string;
  format: Format;
  name: string;
  shortName: string;
  jpLabel: string;
  role: 'gateway' | 'elite';
  tagline: string;
  description: string;
  positioning: string[];
  whoFor: string[];
  tiers: Tier[];
  shades: Shade[];
  image: string;
  imageAlt: string;
  faq: { question: string; answer: string }[];
};

export const TIERS: Record<Format, Tier[]> = {
  jar: [
    { id: 'sample', label: 'Sample Jar', price: 18, sub: 'Pure structural control', spec: { value: 5, unit: 'g' } },
    { id: 'studio', label: 'Studio Jar', price: 58, sub: 'Balanced coverage for regular services', spec: { value: 25, unit: 'g' } },
    { id: 'refill', label: 'Refill Jar', price: 158, sub: 'Designed for high-volume studio use', spec: { value: 100, unit: 'g' }, recommended: true },
  ],
  bottle: [
    { id: 'sample', label: 'Sample Bottle', price: 14, sub: 'Precision application · Try format', spec: { value: 5, unit: 'mL' } },
    { id: 'standard', label: 'Standard Bottle', price: 28, sub: 'Daily studio workflow', spec: { value: 15, unit: 'mL' }, recommended: true },
    { id: 'studio', label: 'Studio Bottle', price: 44, sub: 'Designed for high-use professional services', spec: { value: 30, unit: 'mL' } },
  ],
};

const JAR_SHADES: Shade[] = [
  { id: 'clear', name: 'Clear Structure', jpName: 'クリア', swatch: 'rgba(255,255,255,0.92)', description: 'Unmatched clarity for color layering and encapsulation.' },
  { id: 'milky', name: 'Milky Structure', jpName: 'ミルキー', swatch: 'rgba(252,250,245,1)', description: 'Soft diffusion for natural depth and gentle coverage.' },
  { id: 'nude', name: 'Nude Structure', jpName: 'ヌード', swatch: 'rgba(228,203,180,0.75)', description: 'Warm coverage with a natural finish for studio staples.' },
  { id: 'sheer', name: 'Sheer Structure', jpName: 'シアー', swatch: 'rgba(245,235,228,0.85)', description: 'A translucent veil for subtle structure and refinement.' },
];

const BOTTLE_SHADES: Shade[] = [
  { id: 'clear', name: 'Clear Structure', jpName: 'クリア', swatch: 'rgba(255,255,255,0.92)', description: 'Brush-applied control for consistent structure work.' },
  { id: 'milky', name: 'Milky Structure', jpName: 'ミルキー', swatch: 'rgba(252,250,245,1)', description: 'Soft coverage with workflow speed and brush control.' },
  { id: 'nude', name: 'Nude Structure', jpName: 'ヌード', swatch: 'rgba(228,203,180,0.75)', description: 'Natural warmth in a controlled-flow workflow format.' },
];

export const BUILDER_IN_A_BOTTLE: Pillar = {
  slug: 'builder-in-a-bottle',
  format: 'bottle',
  name: 'Builder in a Bottle',
  shortName: 'Bottle',
  jpLabel: '精密 · Precision',
  role: 'gateway',
  tagline: 'Refined control. No flooding.',
  description:
    'A self-leveling Japanese builder gel in a precision brush format. Controlled flow keeps the product exactly where you place it — clean sidewalls, clean cuticle lines, efficient services.',
  positioning: [
    'Controlled, self-leveling flow — no flooding',
    'Precision brush application',
    'HEMA-free · Acid-free formulation',
    'Efficient for daily studio workflow',
    'The refined entry into the LUSTER system',
  ],
  whoFor: [
    'Licensed nail technicians building structured overlays daily',
    'Studios that value speed without giving up control',
    'Professionals moving up from mass-market BIAB products',
  ],
  tiers: TIERS.bottle,
  shades: BOTTLE_SHADES,
  image: '/images/luster-builder-gel-system-hero.jpg',
  imageAlt: 'LUSTER Builder in a Bottle — matte black bottles with gold branding in a presentation box',
  faq: [
    {
      question: 'What is Builder in a Bottle?',
      answer:
        'Builder in a Bottle is a self-leveling professional builder gel applied with a precision brush. It builds controlled structure and apex support without the flooding common to runnier formulas.',
    },
    {
      question: 'Is LUSTER Builder in a Bottle HEMA-free?',
      answer: 'Yes. The formulation is HEMA-free and acid-free, developed for professional use on licensed technicians’ clients.',
    },
    {
      question: 'How long does it wear?',
      answer: 'With professional application, expect 3–4 weeks of wear before infill.',
    },
    {
      question: 'How is it cured and removed?',
      answer: 'Cure 30–40 seconds under a 48W+ LED lamp. Removal is soak-off, typically 6–10 minutes.',
    },
  ],
};

export const HARD_BUILDER_GEL: Pillar = {
  slug: 'hard-builder-gel',
  format: 'jar',
  name: 'Japanese Hard Builder Gel',
  shortName: 'Jar',
  jpLabel: '構造 · Structure',
  role: 'elite',
  tagline: 'Elite structure. 6+ week retention.',
  description:
    'The performance pillar of the LUSTER system. A Japanese hard builder gel in a jar, engineered for sculpted apex work, advanced structural control, and retention that holds past six weeks.',
  positioning: [
    'High-structure sculpting for apex and arch control',
    '6+ week retention with professional application',
    'Engineered in Japan for advanced control',
    'Medium–thick viscosity, self-leveling on your terms',
    'The elite tier of the LUSTER system',
  ],
  whoFor: [
    'Advanced technicians sculpting full structure sets',
    'Studios serving clients who demand maximum retention',
    'Professionals who want the highest performance in the system',
  ],
  tiers: TIERS.jar,
  shades: JAR_SHADES,
  image: '/images/luster-hard-builder-gel-jar.jpg',
  imageAlt: 'LUSTER Japanese Hard Builder Gel — matte black jar with gold branding on black marble',
  faq: [
    {
      question: 'What makes hard builder gel different from builder in a bottle?',
      answer:
        'Hard builder gel is a firmer, jar-based formula built for sculpted structure and maximum retention. Builder in a Bottle prioritizes brush precision and workflow speed; the jar prioritizes strength and longevity.',
    },
    {
      question: 'How long does Japanese Hard Builder Gel last?',
      answer: 'With correct preparation and professional application, retention of six weeks or more is typical.',
    },
    {
      question: 'Is it suitable for beginners?',
      answer:
        'It is formulated for licensed professionals. Technicians newer to structured gel often begin with Builder in a Bottle and move to the jar as their sculpting work advances.',
    },
    {
      question: 'Is the formula HEMA-free?',
      answer: 'Yes. Like the entire LUSTER system, the jar formula is HEMA-free and acid-free.',
    },
  ],
};

export const PILLARS: Pillar[] = [BUILDER_IN_A_BOTTLE, HARD_BUILDER_GEL];

export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

export const moneyCAD = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });
