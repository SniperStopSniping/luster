import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { JsonLd } from '@/components/seo/JsonLd';
import { ToastProvider } from '@/components/ui/Toast';
import { CONTACT_EMAIL, INSTAGRAM_URL, SITE_URL } from '@/lib/site';

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LUSTER Japanese Builder Gel | Professional Structure System',
    template: '%s | LUSTER',
  },
  description:
    'LUSTER is a professional builder gel system for nail artists who value structure, control, and refined application. Builder in a Bottle and Japanese Hard Builder Gel with 6+ week retention — HEMA-free, acid-free, for licensed professionals in Toronto and across Canada.',
  keywords: [
    'Japanese builder gel',
    'professional builder gel',
    'builder gel Canada',
    'builder gel Toronto',
    'builder in a bottle Canada',
    'hard builder gel',
    'structure gel',
    'nail builder gel',
    'HEMA-free builder gel',
    'nail tech supplies Toronto',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'LUSTER Japanese Builder Gel',
    description:
      'The LUSTER Structure System — professional Japanese builder gel engineered for structure, control, and refined application.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'LUSTER',
    url: SITE_URL,
    images: [
      {
        url: '/images/og-luster-builder-gel.jpg',
        width: 1200,
        height: 630,
        alt: 'The LUSTER Structure System — matte black builder gel bottles and presentation box',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUSTER Japanese Builder Gel',
    description:
      'Professional Japanese builder gel for controlled nail structure. For licensed nail professionals.',
    images: ['/images/og-luster-builder-gel.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0C',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LUSTER',
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: CONTACT_EMAIL,
  sameAs: [INSTAGRAM_URL],
  description:
    'LUSTER is a professional Japanese builder gel system for licensed nail technicians — Builder in a Bottle and Japanese Hard Builder Gel with 6+ week retention.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} bg-canvas text-ink antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
