import Link from 'next/link';
import { RESIDENCY, RESIDENCY_RETRIEVED, RESIDENCY_SOURCE } from '@/data/divorce-residency';
import { STATES, stateName } from '@/lib/site-config';
import { DataSources } from '@/components/DataSources';
import { FaqBlock, faqLd } from '@/components/FaqBlock';

export const metadata = {
  title: 'Divorce Residency & Separation Requirements by State (2026)',
  description:
    'How long you must live in a state before filing for divorce, whether a separation period is required, and the mandatory waiting period before a decree — for all 50 states and D.C.',
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

      <FaqBlock items={FAQ} />
    </div>
  );
}
