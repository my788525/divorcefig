// DivorceFig — site config + 50-state + D.C. registry
//
// All state-level figures (filing fees, residency, separation, forms) live in
// /data and are cited to official state court / government sources. This file
// only holds site identity + the canonical state list used for routing and
// generateStaticParams.

export const SITE = {
  name: 'DivorceFig',
  domain: 'divorcefig.com',
  url: 'https://divorcefig.com',
  tagline: 'U.S. Divorce Information by State',
  description:
    'State-by-state divorce information: filing-fee estimator, residency and separation requirements, and official court forms checklists for all 50 states and D.C.',
  locale: 'en_US',
  author: 'DivorceFig Editorial Team',
  email: 'support@divorcefig.com',
  lastEditorialReview: '2026-08-15',
  logo: '/logo.svg',
  favicon: '/favicon.svg',
  ogImage: '/og-default.png',
  retrieved: '2026-08-15',
} as const;

export interface StateEntry {
  code: string; // 2-letter USPS
  name: string;
}

// Canonical 51 jurisdictions (50 states + District of Columbia).
export const STATES: StateEntry[] = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

export function getState(code: string): StateEntry | undefined {
  return STATES.find((s) => s.code.toLowerCase() === code.toLowerCase());
}

export function stateName(code: string): string {
  return getState(code)?.name ?? code.toUpperCase();
}
