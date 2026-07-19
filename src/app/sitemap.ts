import type { MetadataRoute } from 'next';

import { PILLARS } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...PILLARS.map((p) => ({
      url: `${SITE_URL}/shop/${p.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/promotions`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/learn`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ...GUIDE_SLUGS.map((slug) => ({ url: `${SITE_URL}/learn/${slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.6 })),
    { url: `${SITE_URL}/join`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/wholesale`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
  ];
}

const GUIDE_SLUGS = [
  'builder-gel-foundations', 'nail-preparation-and-retention', 'choosing-flex-vs-control-builder',
  'builder-gel-application', 'apex-and-structure', 'rebalancing-and-fill-maintenance',
  'safe-product-removal', 'troubleshooting-lifting', 'troubleshooting-heat-spikes',
  'product-storage-and-handling',
];
