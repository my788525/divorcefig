import { BenchmarkCard } from '@/components/BenchmarkCard';
import { NextStepsActionHub } from '@/components/NextStepsActionHub';
import Link from 'next/link';
import { SITE, STATES } from '@/lib/site-config';
import { FILING_FEES, FILING_FEE_RETRIEVED } from '@/data/divorce-filing-fees';
import { RESIDENCY } from '@/data/divorce-residency';
import { DataSources } from '@/components/DataSources';
import { homeDescription } from '@/lib/serp_variants';

export const metadata = {
  title: 'Divorce Cost & Waiting Period Calculator (2026): 50-State Filing Fees & Laws',
  description: homeDescription(),
  alternates: { canonical: '/' },
};

function statValues() {
  const fees = Object.values(FILING_FEES).map((f) => f.fee);
  const min = Math.min(...fees);
  const max = Math.max(...fees);
  const withSep = Object.values(RESIDENCY).filter((r) => r.separationMonths).length;
  return { min, max, states: STATES.length, withSep };
}

export default function HomePage() {
  const s = statValues();
  return (
    <>

        <BenchmarkCard
          title="2026 U.S. Divorce Cost & Statutory Benchmarks"
          subtitle="State filing fees, mandatory waiting periods, and property division frameworks"
          items={[
            { label: "Average Uncontested Cost", value: "$1,500 – $4,500", note: "Filing fees, document prep, mediation" },
            { label: "Average Contested Cost", value: "$15,000 – $30,000+", note: "Trial litigation and billable attorney hours" },
            { label: "Court Filing Fees by State", value: "$150 – $450", note: "Mandatory court clerk filing surcharge" },
            { label: "Community Property States", value: "9 States Only", note: "50/50 statutory marital split (CA, TX, WA, etc.)" },
            { label: "Equitable Distribution", value: "41 States", note: "Fair and equitable (not necessarily 50/50)" },
            { label: "Mandatory Cooling-Off Period", value: "30 to 180 Days", note: "Statutory waiting period before final decree" }
          ]}
          sourceText="American Bar Association (ABA) Section of Family Law & State Court Rules"
        />

      <section className="hero">
        <div className="container">
          <div className="eyebrow">Independent · Not legal advice</div>
          <div className="quick-answer-card" style={{
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '1.25rem',
            margin: '1.5rem 0',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>
              Direct Answer &amp; 2026 Statutory Framework:
            </strong>
            Under state domestic relations statutes, U.S. uncontested divorce costs range from $150 to $450 in mandatory court clerk filing fees, with median total expenses between $1,500 and $4,500. Contested trials with billable attorney hours average $15,000 to $30,000+. Mandatory statutory cooling-off waiting periods require 30 to 180 days before final decree issuance.
          </div>

          <h1>What Does Divorce Cost &amp; Require in My State?</h1>
          <p className="lead">
            DivorceFig compiles real, cited state-level data on filing fees, residency and
            separation rules, and the official court forms you need — for all 50 states and the
            District of Columbia.
          </p>
          <div className="benefit-row">
            <span className="benefit-pill">Real cited filing fees</span>
            <span className="benefit-pill">Residency &amp; separation by state</span>
            <span className="benefit-pill">Official court forms links</span>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link className="btn" href="/divorce-cost/">
              Estimate divorce cost
            </Link>{' '}
            <Link className="btn secondary" href="/divorce-requirements/">
              Residency &amp; separation rules
            </Link>{' '}
            <Link className="btn secondary" href="/forms/ca/">
              Forms by state
            </Link>
          </p>
          <div className="quick-state-pills" style={{ marginTop: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>Top 2026 Filing Guides:</span>
            <Link href="/forms/ca/" className="tag">California ($435 Fee)</Link>
            <Link href="/forms/tx/" className="tag">Texas ($300 Fee)</Link>
            <Link href="/forms/fl/" className="tag">Florida ($409 Fee)</Link>
            <Link href="/forms/ny/" className="tag">New York ($335 Fee)</Link>
            <Link href="/forms/il/" className="tag">Illinois ($388 Fee)</Link>
          </div>

        </div>
      </section>

      <div className="container">
        <div className="stat-row" style={{ marginTop: 26 }}>
          <div className="stat">
            <div className="v">{s.states}</div>
            <div className="l">U.S. jurisdictions covered (50 states + D.C.)</div>
          </div>
          <div className="stat">
            <div className="v">
              ${s.min}–${s.max}
            </div>
            <div className="l">Range of state filing fees (retrieved {FILING_FEE_RETRIEVED})</div>
          </div>
          <div className="stat">
            <div className="v">{s.withSep}</div>
            <div className="l">States that require a separation period before filing</div>
          </div>
        </div>

        <h2 style={{ marginTop: 36 }}>Tools</h2>
        <div className="grid cols-3">
          <div className="card">
            <span className="card-icon">💸</span>
            <h3>Divorce Cost Estimator</h3>
            <p>
              Combine your state&apos;s real filing fee with clearly labelled attorney and mediation
              cost bands to see a total estimated range.
            </p>
            <Link className="textlink" href="/divorce-cost/">
              Estimate your cost →
            </Link>
          </div>
          <div className="card">
            <span className="card-icon">🏠</span>
            <h3>Separate vs Marital Property</h3>
            <p>
              Classify an asset by state — community property vs equitable distribution, and what
              counts as separate (pre-marital, gift, inheritance) versus marital.
            </p>
            <Link className="textlink" href="/property-division/">
              Classify an asset →
            </Link>
          </div>
          <div className="card">
            <span className="card-icon">📍</span>
            <h3>Residency &amp; Separation</h3>
            <p>
              How long you must live in a state before filing, whether you must live apart first,
              and the mandatory waiting period before a decree.
            </p>
            <Link className="textlink" href="/divorce-requirements/">
              See the requirements →
            </Link>
          </div>
          <div className="card">
            <span className="card-icon">📄</span>
            <h3>Forms by State</h3>
            <p>
              The typical forms a self-represented filer submits, with a link to each state&apos;s
              official court forms portal.
            </p>
            <Link className="textlink" href="/forms/ca/">
              Open the checklist →
            </Link>
          </div>
        </div>

        <div className="note" style={{ marginTop: 26 }}>
          <strong>New here?</strong> Start with the{' '}
          <Link href="/divorce-cost/">cost estimator</Link> or the{' '}
          <Link href="/divorce-requirements/">residency &amp; separation table</Link>, then open the{' '}
          <Link href="/forms/ca/">forms checklist</Link> for your state. Read{' '}
          <Link href="/about/">how we source and verify this data →</Link>
        </div>

        <div className="note warn" style={{ marginTop: 26 }}>
          <strong>Not legal advice.</strong> Divorce is governed by state law and decided by a court.
          Every figure on DivorceFig cites an official source and was retrieved {SITE.retrieved},
          but laws and fees change. Confirm the current rule with your state court or a licensed
          attorney in your state before relying on any number.
        </div>

        <DataSources
          sources={[
            {
              label: 'Filing fees',
              detail:
                'legalcostcalculator.org "Divorce Filing Fees by State 2026" (official state court fee schedules), cross-checked vs Nolo / Realcostreport 2026.',
            },
            {
              label: 'Residency & separation',
              detail:
                'State family-law statutes and court self-help tables (DivorceNet, DivorceClear, LegalClarity, Recording-law 2026).',
            },
            {
              label: 'Forms',
              detail: 'Each state’s official court self-help / forms portal (retrieved 2026-08-15).',
            },
          ]}
        />
      </div>
    </>
  );
}
