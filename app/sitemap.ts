// DivorceFig — generated sitemap (Next.js static export).
// Enumerates every static route and the two standalone public HTML pages.
// Per-state /forms routes are noindexed (2026-09-13) and excluded here.
// Replaces the stale hand-maintained public/sitemap.xml (which only listed 3 URLs).

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

  // INDEX POLICY (2026-09-13): per-state /forms pages are noindexed
  // (pooled Jaccard 0.912) and must not be submitted here; the /forms/ hub
  // (declared in STATIC_PATHS) stays indexable.

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
