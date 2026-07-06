import type { Metadata } from 'next';

import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Shop Professional Builder Gel',
  description:
    'Shop the LUSTER Structure System: Builder in a Bottle for refined daily control, and Japanese Hard Builder Gel in a jar with 6+ week retention. Professional builder gel for licensed nail technicians in Canada.',
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: 'Shop | LUSTER',
    description:
      'The LUSTER Structure System — professional builder gel in bottle and jar formats, for licensed nail professionals.',
    url: `${SITE_URL}/shop`,
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
