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
    default: 'Luster Studio | Professional Japanese Gel for Nail Artists',
    template: '%s | Luster Studio',
  },
  description:
    'Professional Japanese gel, practical education, and opportunities for modern nail artists. Explore Luster Studio products, guides, wholesale, and community.',
  keywords: [
    'Japanese builder gel',
    'professional builder gel',
    'builder gel Canada',
    'builder gel Toronto',
    'builder in a bottle Canada',
    'hard builder gel',
    'structure gel',
    'nail builder gel',
    'nail artist education',
    'nail supplies Canada',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Luster Studio | Professional Japanese Gel',
    description: 'Professional Japanese gel, education, and opportunities for modern nail artists.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Luster Studio',
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
    title: 'Luster Studio | Professional Japanese Gel',
    description: 'Professional Japanese gel, education, and opportunities for modern nail artists.',
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
  name: 'Luster Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: CONTACT_EMAIL,
  sameAs: [INSTAGRAM_URL],
  description:
    'Luster Studio creates professional Japanese gel products and education to help nail artists grow with confidence.',
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
