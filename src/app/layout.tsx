import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'LUSTER Japanese Builder Gel | Professional Structure Gel',
  description:
    'LUSTER is a Japanese builder gel engineered for controlled structure, clarity, and repeatability. Designed for professional nail technicians.',
  keywords: [
    'Japanese builder gel',
    'professional builder gel',
    'structure gel',
    'nail builder gel',
  ],
  openGraph: {
    title: 'LUSTER Japanese Builder Gel',
    description:
      'Japanese builder gel engineered for professional structural control.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'LUSTER',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUSTER Japanese Builder Gel',
    description:
      'Professional Japanese builder gel for controlled nail structure.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} bg-canvas text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
