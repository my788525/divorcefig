import Link from 'next/link';
import { RESIDENCY, RESIDENCY_RETRIEVED, RESIDENCY_SOURCE } from '@/data/divorce-residency';
import { STATES, stateName } from '@/lib/site-config';
import { DataSources } from '@/components/DataSources';
import { FaqBlock, faqLd } from '@/components/FaqBlock';

export const metadata = {
  title: 'Divorce Waiting Period & Residency Requirements by State (2026 Table)',
  description:
    'Interactive 2026 statutory waiting period and residency requirement tool: cooling-off periods, living-apart rules, and decree timelines for all 50 states and D.C.',
  alternates: { canonical: '/divorce-requirements/' },
};

function fmtMonths(m: number | null): string {
  if (m === null) return 'No fixed minimum (domicile at filing)';
  if (m < 1) return `${Math.round(m * 30)} days`;
  if (m === 1) return '1 month';
  return `${m} months`;
}

function fmtDays(d: number | null): string {
  if (d === null) return 'None';
  if (d % 30 === 0) return `${d / 30} months`;
  return `${d} days`;
}

const FAQ = [
  {
    q: 'What does “residency requirement” mean for divorce?',
    a: 'It is how long at least one spouse must live in (or be domiciled in) a state before its courts have jurisdiction to grant a divorce. Most states require 3–12 months; a few have no fixed durational minimum beyond domicile.',
  },
  {
    q: 'What is a separation period, and which states require one?',
    a: 'Some states require spouses to live apart for a set time (commonly 6–12 months, up to 18 in Arkansas) before a no-fault divorce can be filed or finalized. States such as California, Florida, and Texas do not require a pre-filing separation.',
  },
  {
    q: 'What is the waiting period after filing?',
    a: 'Many states impose a cooling-off period (often 30–90 days, up to 6 months in California) between filing and the final decree, even when everything is agreed. See the “Waiting period” column in the table.',
  },
  {
    q: 'Do these rules ever change?',
    a: 'Yes. Residency, separation, and waiting-period rules are set by state statute and can change. The figures here were retrieved 2026-08-15 — confirm the current rule with your state court or a licensed attorney.',
  },
];

export default function DivorceRequirementsPage() {
  const rows = STATES.map((s) => ({ state: s, entry: RESIDENCY[s.code] }));

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'Divorce residency, separation, and waiting-period requirements by U.S. state',
    description:
      'Per-state residency duration, required separation period, and mandatory post-filing waiting period for divorce.',
    about: { '@type': 'Thing', name: 'Divorce residency and separation requirements' },
  };

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Divorce Waiting Period & Residency Requirements Tool (2026)',
    url: 'https://divorcefig.com/divorce-requirements/',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Interactive statutory waiting period and residency requirement tool covering mandatory cooling-off durations and separation rules across all 50 U.S. states.',
  };

  return (
    <div className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> › Residency &amp; Separation
      </div>
      <div className="section-head">
        <h1>Residency &amp; Separation Requirements by State</h1>
        <p className="lead prose" style={{ color: 'var(--ink-soft)' }}>
          Before you can file, a state court must have jurisdiction. The table below shows, for each
          state, the residency duration required to file, whether you must live apart first, and the
          mandatory waiting period before a final decree. Retrieved {RESIDENCY_RETRIEVED}.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }}
      />

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>State</th>
              <th>Residency to file</th>
              <th>Separation required?</th>
              <th>Waiting period after filing</th>
              <th>Forms</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ state, entry }) => (
              <tr key={state.code}>
                <td>
                  <a href={`/forms/${state.code.toLowerCase()}/`}>{state.name}</a>
                </td>
                <td>{entry?.residency ?? '—'}</td>
                <td>
                  {entry?.separationMonths
                    ? `${fmtMonths(entry.separationMonths)}`
                    : entry?.separation ?? 'None required'}
                </td>
                <td>{fmtDays(entry?.waitingPeriodDays ?? null)}</td>
                <td>
                  <a href={`/forms/${state.code.toLowerCase()}/`}>Checklist →</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note" style={{ marginTop: 18 }}>
        <strong>Reading the table:</strong> “Residency to file” is the minimum time one spouse must
        reside in the state. “Separation required?” shows living-apart time where applicable.
        “Waiting period after filing” is the mandatory cooling-off before a decree — it is separate
        from any pre-filing separation.
      </div>

      <DataSources sources={[{ label: 'Residency & separation', detail: RESIDENCY_SOURCE }]} />

      <section className="howto-block" aria-label="Choosing a divorce path" style={{ marginTop: 24 }}>
        <h2>No-fault vs. fault: why the requirements differ</h2>
        <p>
          Most states now allow a <strong>no-fault</strong> divorce (irreconcilable differences or a
          completed separation), which is usually faster and is governed mainly by the residency and
          waiting-period rules in the table. A <strong>fault</strong> divorce (adultery, cruelty,
          abandonment, etc.) can still be available in some states but generally adds proof, time, and
          cost. The residency and separation columns above apply regardless of the grounds you plead;
          the waiting period is the minimum even when both spouses fully agree. Use the{' '}
          <Link href="/divorce-cost/">cost estimator</Link> to see how attorney and filing fees shift
          with case type, and open your <Link href="/forms/ca/">state forms checklist</Link>{' '}
          for the exact packet your court expects.
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
