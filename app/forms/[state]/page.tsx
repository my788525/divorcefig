import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STATES, getState, stateName } from '@/lib/site-config';
import { getForms, FORMS_RETRIEVED, FORMS_SOURCE } from '@/data/divorce-forms';
import { getResidency } from '@/data/divorce-residency';
import { DataSources } from '@/components/DataSources';
import Breadcrumbs from '@/components/Breadcrumbs';
import { formsDescription } from '@/lib/serp_variants';

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.code.toLowerCase() }));
}

export function generateMetadata({ params }: { params: { state: string } }) {
  const state = getState(params.state);
  if (!state) return {};
  return {
    title: `Divorce Forms in ${state.name} (2026 Checklist)`,
    description: formsDescription(),
    alternates: { canonical: `/forms/${state.code.toLowerCase()}/` },
  };
}

export default function FormsByStatePage({ params }: { params: { state: string } }) {
  const state = getState(params.state);
  if (!state) notFound();
  const code = state.code;
  const entry = getForms(code);
  const res = getResidency(code);

  if (!entry) notFound();

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Forms by state', url: '/forms/ca/' },
          { name: state.name, url: `/forms/${state.code.toLowerCase()}/` },
        ]}
      />

      <div className="section-head">
        <h1>Divorce Forms in {state.name}</h1>
        <p className="lead prose" style={{ color: 'var(--ink-soft)' }}>
          The typical forms a self-represented filer submits for a divorce in {state.name}. Always
          use the current forms from the official court portal linked below — county and case-type
          variations exist.
        </p>
      </div>

      <a className="btn" href={entry.url} target="_blank" rel="noopener noreferrer">
        Open the official {state.name} court forms portal →
      </a>

      <h2 style={{ marginTop: 28 }}>Typical forms checklist</h2>
      <ul className="checklist">
        {entry.forms.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      {res ? (
        <div className="note" style={{ marginTop: 20 }}>
          <strong>Before you file in {state.name}:</strong> {res.residency}.{' '}
          {res.separationMonths
            ? `A separation period of about ${res.separationMonths} month(s) generally applies. `
            : res.separation && res.separation !== 'None required before filing.'
              ? `${res.separation} `
              : 'No pre-filing separation is required. '}
          {res.waitingPeriodDays
            ? `A waiting period of about ${res.waitingPeriodDays} days applies after filing.`
            : 'No mandatory post-filing waiting period applies.'}{' '}
          <Link href="/divorce-requirements/">See all state requirements →</Link>
        </div>
      ) : null}

      <h2 style={{ marginTop: 30 }}>Browse another state</h2>
      <div className="state-picker">
        {STATES.map((s) => (
          <Link
            key={s.code}
            href={`/forms/${s.code.toLowerCase()}/`}
            className={s.code === code ? 'active' : ''}
          >
            {s.name}
          </Link>
        ))}
      </div>

      <DataSources
        sources={[{ label: `Forms — ${state.name}`, detail: `${FORMS_SOURCE} Portal: ${entry.url}` }]}
      />
    </div>
  );
}
