import Link from 'next/link';
import PropertyClassifier from '@/components/PropertyClassifier';
import { FaqBlock, faqLd } from '@/components/FaqBlock';
import { propertyDescription } from '@/lib/serp_variants';

export const metadata = {
  title: 'Marital vs Separate Property Calculator (2026): 50-State Asset Division Rules',
  description: propertyDescription(),
  alternates: { canonical: '/property-division/' },
};

const FAQ = [
  {
    q: 'What is the difference between separate and marital property?',
    a: 'Separate property is what one spouse owned before the marriage, or received individually by gift or inheritance during it, plus assets acquired after permanent separation. Marital (or community) property is what either spouse earned or bought during the marriage, even if only one name is on the title. Only marital property is divided in a divorce.',
  },
  {
    q: 'What is a community property state?',
    a: 'Nine states are community property (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, Wisconsin; Alaska by opt-in). There, property and debt acquired during the marriage are presumed owned 50/50. The other 41 states and D.C. use equitable distribution, where a judge divides marital property fairly — not always equally.',
  },
  {
    q: 'Can my separate property become marital property?',
    a: 'Yes. The two main ways are commingling (mixing separate funds into a joint account so thoroughly they cannot be traced) and transmutation (an intentional act, such as adding a spouse to a deed). Keeping inheritances and pre-marital assets in separate accounts in your own name helps preserve their separate character.',
  },
  {
    q: 'Does a 50/50 split mean I get half of every item?',
    a: 'No. In community property states you are entitled to half the value of the marital estate, not necessarily half of each physical item. Spouses often agree who keeps what, as long as the total each receives is roughly equal in value. A court can approve an unequal division if both spouses sign voluntarily.',
  },
  {
    q: 'Is this classification a guarantee of how my case turns out?',
    a: 'No. This tool applies the general legal definitions to the facts you enter. Actual outcomes depend on your state’s statutes, documentation, and a judge’s findings — especially in equitable-distribution states where many factors apply. Confirm with your state court or a licensed attorney before relying on any classification.',
  },
];

export default function PropertyDivisionPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Separate vs Marital Property Classifier',
    url: 'https://divorcefig.com/property-division/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Classify an asset as separate or marital/community property by state, using established legal definitions of community property and equitable distribution.',
  };

  return (
    <div className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> › Separate vs Marital Property
      </div>
      <div className="section-head">
        <h1>Separate vs Marital Property by State</h1>
        <p className="lead prose" style={{ color: 'var(--ink-soft)' }}>
          Pick your state and how an asset came into the marriage to see whether it is treated as
          separate or marital/community property. The classification follows established legal
          definitions; the division approach depends on your state’s property system.
        </p>
      </div>

      <div className="benefit-row">
        <span className="benefit-pill">Community vs equitable distribution</span>
        <span className="benefit-pill">Separate vs marital classification</span>
        <span className="benefit-pill">All 50 states + D.C.</span>
      </div>

      {/* GEO Atomic Direct Answer & Statutory Provenance Chunk */}
      <section
        className="geo-direct-answer-chunk"
        aria-label="Direct Statutory Answer"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderLeft: '5px solid var(--brand)',
          borderRadius: 'var(--radius)',
          padding: '18px 22px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--brand)', display: 'inline-block' }}></span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Direct Statutory Rule: Community Property vs. Equitable Distribution
          </span>
        </div>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>
          <strong>Statutory Marital Asset Classification:</strong> Nine U.S. states (AZ, CA, ID, LA, NV, NM, TX, WA, WI) operate under <strong>Community Property</strong> laws, mandating an equal 50/50 division of assets and debts acquired during marriage. The remaining 41 states follow <strong>Equitable Distribution</strong>, dividing marital property fairly based on statutory economic factors. Pre-marital assets, individual inheritances, and gifts remain separate property unless commingled or transmuted.
        </p>
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', gap: '8px' }}>
          <span><strong>Governing Law:</strong> State Marital Property Acts &amp; Uniform Marriage and Divorce Act (UMDA)</span>
          <span><strong>Last Verified:</strong> October 2026</span>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }}
      />

      <PropertyClassifier />

      <section className="howto-block" aria-label="Why property classification matters" style={{ marginTop: 24 }}>
        <h2>Why the classification decides what gets divided</h2>
        <p>
          Before any split happens, a court must label each asset and debt as separate or marital. Only
          the marital (or community) portion is on the table. That single step drives the outcome more
          than most people expect: a 401(k) funded during the marriage, a house bought with marital
          income, and even a credit-card balance run up during the marriage are all typically marital —
          while a pre-marital brokerage account, a gift from a parent to one spouse, or an inheritance
          kept in one name usually stays separate. Use the classifier above, then review the{' '}
          <Link href="/divorce-cost/">cost estimator</Link> to see how attorney and filing fees shift
          with case type, and open your <Link href="/forms/ca/">state forms checklist</Link> for
          the paperwork your court expects.
        </p>
      </section>

      <p className="small muted" style={{ marginTop: 18 }}>
        Methodology and citations are maintained by the DivorceFig editorial team. See{' '}
        <Link href="/about/">About DivorceFig</Link> for the responsible party, sources, and contact
        details.
      </p>

      <FaqBlock items={FAQ} />
    </div>
  );
}
