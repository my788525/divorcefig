import type { Metadata } from 'next';
import { NetworkStrip } from "@/components/NetworkStrip";
import './globals.css';
import { SITE } from '@/lib/site-config';
import DisclaimerBanner from '@/components/DisclaimerBanner';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'DivorceFig — Divorce Information by State (Cost, Residency, Forms)',
    template: `%s | ${SITE.name}`,
  },
  description:
    'State-by-state U.S. divorce information: filing-fee estimator, residency and separation requirements, and official court forms checklists for all 50 states and D.C.',
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.name,
  keywords: [
    'divorce by state',
    'divorce filing fee',
    'divorce cost estimator',
    'divorce residency requirement',
    'separation before divorce',
    'divorce forms by state',
    'how to file for divorce',
    'divorce 2026',
  ],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'DivorceFig — Divorce Information by State',
    description:
      'Filing-fee estimator, residency/separation rules, and official court forms checklists for all 50 states + D.C.',
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — U.S. divorce information by state` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DivorceFig — Divorce Information by State',
    description: 'Filing-fee estimator, residency/separation rules, and official court forms checklists.',
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/forms/{state}` },
    'query-input': 'required name=state',
  },
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  sameAs: ['https://github.com/my788525/divorcefig'],
  description: SITE.description,
  email: SITE.email,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: SITE.email,
    availableLanguage: ['English'],
  },
  knowsAbout: ['divorce', 'family law', 'divorce filing fees', 'divorce residency requirements'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />

        <header className="navbar">
          <div className="inner">
            <a className="brand" href="/">
              <img className="brand-logo" src={SITE.logo} alt={`${SITE.name} logo`} width={32} height={32} />
              <span className="brand-text">
                <span className="star">★</span>
                Divorce<span>Fig</span>
              </span>
            </a>
            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/divorce-cost/">Cost Estimator</a>
              <a href="/property-division/">Property Division</a>
              <a href="/divorce-requirements/">Residency &amp; Separation</a>
              <a href="/forms/ca/">Forms by State</a>
              <a href="/about/">About</a>
            </nav>
          </div>
        </header>

        <DisclaimerBanner />

        <main>{children}</main>

        <NetworkStrip self="divorcefig.com" />

<footer className="footer">
          <div className="container">
            <div className="grid">
              <div>
                <div className="brand-mini">
                  <img className="brand-logo" src={SITE.logo} alt={`${SITE.name} logo`} width={24} height={24} />
                  DivorceFig
                </div>
                <p>
                  Independent, free divorce information for all 50 states and the District of
                  Columbia — filing-fee estimates, residency and separation rules, and official
                  court forms checklists.
                </p>
              </div>
              <div>
                <h4>Tools</h4>
                <p>
                  <a href="/divorce-cost/">Divorce cost estimator</a>
                  <br />
                  <a href="/property-division/">Separate vs marital property</a>
                  <br />
                  <a href="/divorce-requirements/">Residency &amp; separation rules</a>
                  <br />
                  <a href="/forms/ca/">Forms checklist by state</a>
                </p>
              </div>
              <div>
                <h4>Trust &amp; compliance</h4>
                <p>
                  <a href="/about/">About &amp; methodology</a>
                  <br />
                  Every figure cites an official state court or government source (retrieved{' '}
                  {SITE.retrieved}).
                </p>
              </div>
            </div>
            <div className="fine">
              <strong>Not legal advice.</strong> Divorce is governed by state law and decided by a
              court. This site provides general information only. Laws and fees change — always
              confirm the current rule with your state court or a licensed attorney in your state
              before relying on any number.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
