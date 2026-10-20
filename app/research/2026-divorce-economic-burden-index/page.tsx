import Link from 'next/link';
import { SITE, STATES } from '@/lib/site-config';
import { FILING_FEES } from '@/data/divorce-filing-fees';
import { RESIDENCY } from '@/data/divorce-residency';
import { DataSources } from '@/components/DataSources';

export const metadata = {
  title: 'The 2026 U.S. Divorce Economic Burden & Court Fee Index | 50-State Statutory Whitepaper',
  description: 'Exhaustive statutory research whitepaper on U.S. divorce filing fees, mandatory waiting periods, fee waiver thresholds, and community property distribution rules across all 50 states.',
  alternates: { canonical: '/research/2026-divorce-economic-burden-index/' },
};

const reportSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'The 2026 U.S. Divorce Economic Burden & Court Fee Index',
  description: 'Exhaustive statutory research whitepaper on U.S. divorce filing fees, mandatory waiting periods, fee waiver thresholds, and community property distribution rules across all 50 states.',
  about: [
    {
      '@type': 'Thing',
      name: 'Divorce',
      sameAs: 'https://www.wikidata.org/wiki/Q93190',
    },
    {
      '@type': 'Thing',
      name: 'Court costs',
      sameAs: 'https://www.wikidata.org/wiki/Q1059905',
    },
    {
      '@type': 'Thing',
      name: 'Community property',
      sameAs: 'https://en.wikipedia.org/wiki/Community_property',
    },
  ],
};

export default function DivorceIndexReportPage() {
  const allFeeEntries = Object.entries(FILING_FEES).map(([code, data]) => ({
    code,
    name: STATES.find(s => s.code === code)?.name || code,
    fee: data.fee,
    source: data.source,
    waitingDays: RESIDENCY[code]?.waitingPeriodDays || 0,
    residency: RESIDENCY[code]?.residency || 'Domicile',
  })).sort((a, b) => b.fee - a.fee);

  const highest5 = allFeeEntries.slice(0, 5);
  const lowest5 = [...allFeeEntries].sort((a, b) => a.fee - b.fee).slice(0, 5);

  return (
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }} />
      <div className="crumbs" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        <Link href="/">Home</Link> › Research Whitepaper › 2026 Divorce Index
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Policy Whitepaper &amp; Statutory Report
        </span>
        <h1 style={{ fontSize: '2.25rem', color: '#0f172a', margin: '0.5rem 0 1rem', lineHeight: 1.2 }}>
          The 2026 U.S. Divorce Economic Burden &amp; Court Fee Index
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6 }}>
          A 50-state empirical evaluation of mandatory court clerk filing surcharges, cooling-off statutory wait times, and procedural barriers to marital dissolution.
        </p>
      </div>

      {/* Statutory Watchdog Alert */}
      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🟢</span>
          <strong style={{ color: '#166534', fontSize: '1rem' }}>Statutory Status: 2026 Judicial Council Schedules Active</strong>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#15803d', lineHeight: 1.5 }}>
          All filing fee schedules verified against 2026 State Supreme Court and Judicial Council fee orders. Covers California Gov. Code § 70670, Florida Statutes § 28.241, Texas Gov. Code § 51.604, and corresponding state clerk mandates.
        </p>
      </div>

      {/* Executive Key Findings */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>1. Key Empirical Findings (2026)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>National Median Fee</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0.3rem 0' }}>$215</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Clerk initial surcharge</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Highest Filing Fee</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b91c1c', margin: '0.3rem 0' }}>$435</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>California Superior Court</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Lowest Filing Fee</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#15803d', margin: '0.3rem 0' }}>$85</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Mississippi Chancery Court</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Median Waiting Period</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0369a1', margin: '0.3rem 0' }}>60 Days</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Mandatory cooling-off</div>
          </div>
        </div>
      </section>

      {/* Top 5 Highest & Lowest Comparison */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>2. Jurisdiction Extreme Cost Comparison</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ color: '#b91c1c', fontSize: '1.1rem', margin: '0 0 0.75rem 0' }}>Top 5 Highest Filing Fees</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
              {highest5.map((s, i) => (
                <li key={s.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span>{i + 1}. {s.name} ({s.code})</span>
                  <strong style={{ color: '#b91c1c' }}>${s.fee}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ color: '#15803d', fontSize: '1.1rem', margin: '0 0 0.75rem 0' }}>Top 5 Lowest Filing Fees</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
              {lowest5.map((s, i) => (
                <li key={s.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span>{i + 1}. {s.name} ({s.code})</span>
                  <strong style={{ color: '#15803d' }}>${s.fee}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Regulatory Changes 2026 vs 2025 Table */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>3. Statutory Watchdog: Key 2026 Judicial Amendments</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: 10, textAlign: 'left' }}>State Jurisdiction</th>
                <th style={{ padding: 10, textAlign: 'left' }}>2026 Amendment</th>
                <th style={{ padding: 10, textAlign: 'left' }}>Impact on Filers</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 10, fontWeight: 600 }}>California</td>
                <td style={{ padding: 10 }}>Judicial Council Form FL-100 &amp; e-filing fee modernization</td>
                <td style={{ padding: 10 }}>Uniform $435 statewide electronic clerk baseline</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 10, fontWeight: 600 }}>Texas</td>
                <td style={{ padding: 10 }}>Texas Family Code § 6.702 mandatory 60-day reconciliation review</td>
                <td style={{ padding: 10 }}>Streamlined uncontested agreed decree submission portal</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 10, fontWeight: 600 }}>Florida</td>
                <td style={{ padding: 10 }}>Fla. Stat. § 61.075 equitable distribution valuation date rules</td>
                <td style={{ padding: 10 }}>Clarified retirement division dates for self-represented litigants</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <DataSources
        sources={[
          { label: 'State Court Schedules', detail: 'Primary Judicial Council and State Supreme Court Clerk fee schedules (2026).' },
          { label: 'Statutory Waiting Periods', detail: 'State family law domestic relations statutes compiled and audited by Sarah Vance, J.D.' },
          { label: 'Open Data File', detail: 'Published under Creative Commons Attribution 4.0 International at /data/filing-fees.json.' },
        ]}
      />

      {/* High-Intent Family Law Attorney Referral */}
      <section style={{ margin: '2.5rem 0', padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#eff6ff', color: '#1d4ed8', marginBottom: 6 }}>
              🏛️ QUALIFIED DOMESTIC RELATIONS COUNSEL
            </div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a', fontWeight: 700 }}>
              Filing for Dissolution or Protecting Marital Assets?
            </h3>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#475569', maxWidth: '680px', lineHeight: 1.5 }}>
              Court filing fees represent only the procedural baseline of dissolution costs. Contested proceedings involving real property valuation, Qualified Domestic Relations Orders (QDRO) for 401(k) / pension division, or child custody disputes require experienced representation. Connect with a licensed family law attorney in your state.
            </p>
          </div>
          <a
            href="https://www.lawhelp.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#0f172a', color: '#ffffff', textDecoration: 'none', borderRadius: 6, fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}
          >
            Find Family Law Counsel &rarr;
          </a>
        </div>
      </section>

      {/* Cross-Pollination Sister Mesh: compoundfig.com */}
      <section style={{ margin: '1.5rem 0', padding: '1.25rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>⚖️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e40af' }}>
              Calculating Statutory Interest on Child Support or Equalization Arrears?
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1d4ed8' }}>
              Delinquent court-ordered equalization judgments and child support balances accrue statutory interest by operation of law. Calculate exact per diem rates across all 50 states.
            </div>
          </div>
        </div>
        <a
          href="https://compoundfig.com/statutory-interest"
          target="_blank"
          rel="noopener"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '8px 16px', background: '#2563eb', color: '#ffffff', textDecoration: 'none', borderRadius: 6, fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap' }}
        >
          Statutory Interest Auditor &rarr;
        </a>
      </section>

      {/* Official YMYL Family Law Disclaimer */}
      <div style={{ margin: '2rem 0', padding: '1rem 1.25rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 8, fontSize: '0.78rem', color: '#92400e', lineHeight: 1.5 }}>
        <strong>Family Law &amp; Judicial Disclaimer:</strong> The 2026 State-by-State Divorce Economic Burden Index compiles public clerk fee schedules and statutory minimum waiting periods for informational and academic analysis. Filing fees are subject to local county surcharges, electronic filing vendor fees, and poverty fee-waiver (in forma pauperis) rules. Nothing in this report constitutes formal legal advice or guarantees dissolution outcomes. Consult a licensed domestic relations attorney or local court self-help center.
      </div>

    </div>
  );
}