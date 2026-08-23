import Link from 'next/link';
import CostEstimator from '@/components/CostEstimator';
import { FaqBlock, faqLd } from '@/components/FaqBlock';
import { costDescription } from '@/lib/serp_variants';

export const metadata = {
  title: 'How Much Does a Divorce Cost in My State? (2026)',
  description: costDescription(),
  alternates: { canonical: '/divorce-cost/' },
};

const FAQ = [
  {
    q: 'How much does a divorce cost in the U.S.?',
    a: 'Court filing fees alone typically run $80–$450 depending on the state. With attorney help, an uncontested divorce often totals a few thousand dollars, while a contested divorce can reach $20,000 or more. This estimator combines your state’s real filing fee with industry-average professional cost bands.',
  },
  {
    q: 'Is the filing fee the only court cost?',
    a: 'No. Many states add a per-summons fee, and you may pay for service of process, certified copies, and parenting-class or mediation programs. The estimator separates the cited filing fee from other typical out-of-pocket costs.',
  },
  {
    q: 'What is the cheapest way to get divorced?',
    a: 'A do-it-yourself (pro se) uncontested divorce — where both spouses agree and you complete the forms yourself — is usually the least expensive, limited mainly to the filing fee plus service and copying costs.',
  },
  {
    q: 'Why are attorney costs shown as ranges?',
    a: 'Attorney fees depend on whether the case is uncontested (often a flat fee) or contested (billed hourly), the complexity of assets and custody, and your local market. The ranges here are national industry averages, not a quote.',
  },
];

export default function DivorceCostPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Divorce Cost Estimator',
    url: 'https://divorcefig.com/divorce-cost/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Estimate divorce cost by state using real cited filing fees and industry-average attorney/mediation cost bands.',
  };

  const howToSteps = [
    { name: 'Meet your state’s residency requirement', text: 'Live in the filing state for the required continuous period before you submit any paperwork.' },
    { name: 'Gather the typical court forms', text: 'Use your state’s official forms checklist (see Forms by state) — the exact packet varies by state and case type.' },
    { name: 'File the petition and pay the filing fee', text: 'Submit the initial forms to the county clerk and pay the cited filing fee; fee waivers exist in many states.' },
    { name: 'Serve your spouse', text: 'Provide formal notice of the filing by the method your state requires (sheriff, process server, or certified mail).' },
    { name: 'Observe the waiting period, then finalize', text: 'Most states impose a post-filing waiting period before a judge signs the final decree.' },
  ];

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Typical steps to file for divorce in the U.S.',
    description:
      'The general filing sequence used across U.S. states. Exact forms, fees, and wait times differ by state — confirm with your state court.',
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <div className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> › Divorce Cost Estimator
      </div>
      <div className="section-head">
        <h1>How Much Does a Divorce Cost in My State?</h1>
        <p className="lead prose" style={{ color: 'var(--ink-soft)' }}>
          Pick your state and the type of divorce to see an estimated total cost range. The filing
          fee is a real, cited figure; attorney and mediation numbers are clearly labelled industry
          averages.
        </p>
      </div>

      <div className="benefit-row">
        <span className="benefit-pill">Real cited filing fees</span>
        <span className="benefit-pill">Attorney &amp; mediation bands labelled</span>
        <span className="benefit-pill">All 50 states + D.C.</span>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }}
      />

      <CostEstimator />

      <section className="howto-block" aria-label="Typical divorce filing steps">
        <h2>Typical steps to file for divorce</h2>
        <ol>
          {howToSteps.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
        <p className="small muted">
          General sequence across U.S. states. Exact forms, fees, and waiting periods differ by
          state — always confirm with your state court or a licensed attorney.
        </p>
      </section>

      <FaqBlock items={FAQ} />
    </div>
  );
}
