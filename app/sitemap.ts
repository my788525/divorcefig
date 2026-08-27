// DivorceFig — generated sitemap (Next.js static export).
// Enumerates every static route, all 51 /forms/[state] routes, and the two
// standalone public HTML pages. Replaces the stale hand-maintained
// public/sitemap.xml (which only listed 3 URLs).

import { STATES } from '@/lib/site-config';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://divorcefig.com';

const STATIC_PATHS = [
  '',
  'divorce-cost',
  'property-division',
  'divorce-requirements',
  'about',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const p of STATIC_PATHS) {
    entries.push({
      url: `${BASE_URL}/${p}/`,
      lastModified: new Date('2026-08-15'),
      changeFrequency: 'monthly',
      priority: p === '' ? 0.8 : 0.7,
    });
  }

  for (const s of STATES) {
    entries.push({
      url: `${BASE_URL}/forms/${s.code.toLowerCase()}/`,
      lastModified: new Date('2026-08-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Standalone public HTML pages.
  for (const file of ['data-library.html', 'printable.html']) {
    entries.push({
      url: `${BASE_URL}/${file}`,
      lastModified: new Date('2026-08-15'),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  return entries;
}
