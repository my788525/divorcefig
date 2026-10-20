'use client';

import { useMemo, useState } from 'react';
import { STATES, stateName } from '@/lib/site-config';
import {
  CASE_ORDER,
  CASE_PROFILES,
  COST_SOURCES,
  estimateCost,
  formatUSD,
  type CaseType,
} from '@/lib/calc';
import { getFilingFee, FILING_FEES } from '@/data/divorce-filing-fees';
import { RESIDENCY } from '@/data/divorce-residency';
import { DataSources } from '@/components/DataSources';

export default function CostEstimator() {
  const [code, setCode] = useState('CA');
  const [type, setType] = useState<CaseType>('uncontested');
  
  // Fee waiver checker state
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const est = useMemo(() => estimateCost(code, type), [code, type]);
  const profile = CASE_PROFILES[type];
  const fee = getFilingFee(code);
  const residencyInfo = RESIDENCY[code];

  // 50-state filing fee percentile calculation
  const feePercentileInfo = useMemo(() => {
    const allFees = Object.values(FILING_FEES).map((f) => f.fee).sort((a, b) => a - b);
    const currentFee = est.filingFee;
    const countLower = allFees.filter((f) => f < currentFee).length;
    const pct = Math.round((countLower / allFees.length) * 100);
    const medianFee = 215;
    const diffPct = Math.round(((currentFee - medianFee) / medianFee) * 100);
    return { pct, medianFee, diffPct };
  }, [est.filingFee]);

  // 2026 HHS Poverty 150% threshold for In Forma Pauperis (IFP) fee waiver estimation
  const waiverThreshold = useMemo(() => {
    const base = 1950; // single monthly 150% FPL
    const perPerson = 690;
    return base + (Math.max(1, householdSize) - 1) * perPerson;
  }, [householdSize]);

  const qualifiesForWaiver = useMemo(() => {
    if (!monthlyIncome || isNaN(Number(monthlyIncome))) return null;
    return Number(monthlyIncome) <= waiverThreshold;
  }, [monthlyIncome, waiverThreshold]);

  const handleCopySummary = () => {
    const summaryText = [
      `=== 2026 Divorce Cost & Statutory Breakdown: ${stateName(code)} ===`,
      `Case Profile: ${profile.label}`,
      `Statutory Court Filing Fee: ${formatUSD(est.filingFee)} (${feePercentileInfo.pct}th percentile nationally)`,
      `Estimated Professional Costs: ${formatUSD(est.attorneyMin)} - ${formatUSD(est.attorneyMax)}`,
      `Estimated Total Out-of-Pocket: ${formatUSD(est.totalMin)} - ${formatUSD(est.totalMax)}`,
      `Statutory Waiting Period: ${residencyInfo?.waitingPeriodDays ? `${residencyInfo.waitingPeriodDays} days` : 'None / Court Discretion'}`,
      `Residency Requirement: ${residencyInfo?.residency || 'Check local rules'}`,
      qualifiesForWaiver ? `In Forma Pauperis (Fee Waiver): Likely Eligible (Income under $${waiverThreshold.toLocaleString()}/mo)` : '',
      `Source: DivorceFig (https://divorcefig.com/divorce-cost/)`,
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div>
      <div className="estimator">
        <div className="controls">
          <div className="field">
            <label htmlFor="state">Your state</label>
            <select
              id="state"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            >
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="type">Type of divorce</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as CaseType)}
            >
              {CASE_ORDER.map((k) => (
                <option key={k} value={k}>
                  {CASE_PROFILES[k].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="small muted" style={{ marginBottom: 14 }}>
          {profile.note}
        </p>

        <div className="result-total">
          <div className="range">
            {formatUSD(est.totalMin)} – {formatUSD(est.totalMax)}
          </div>
          <div className="cap">
            Estimated total for a <strong>{profile.label.toLowerCase()}</strong> in{' '}
            <strong>{stateName(code)}</strong> (filing fee {formatUSD(est.filingFee)} + professional
            costs).
          </div>
        </div>

        <div className="breakdown">
          <table>
            <tbody>
              <tr>
                <td>State filing fee ({stateName(code)})</td>
                <td className="num">{formatUSD(est.filingFee)}</td>
              </tr>
              {est.attorneyMin > 0 || est.attorneyMax > 0 ? (
                <tr>
                  <td>{profile.label} — professional cost</td>
                  <td className="num">
                    {formatUSD(est.attorneyMin)} – {formatUSD(est.attorneyMax)}
                  </td>
                </tr>
              ) : null}
              {est.extraMax > 0 ? (
                <tr>
                  <td>Service of process + form/copy costs</td>
                  <td className="num">
                    {formatUSD(est.extraMin)} – {formatUSD(est.extraMax)}
                  </td>
                </tr>
              ) : null}
              <tr>
                <td>
                  <strong>Estimated total range</strong>
                </td>
                <td className="num">
                  <strong>
                    {formatUSD(est.totalMin)} – {formatUSD(est.totalMax)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 50-State Filing Fee Percentile Gauge */}
        <div style={{ marginTop: 20, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              📊 50-State Statutory Filing Fee Percentile
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: 999 }}>
              {feePercentileInfo.pct}th Percentile Nationally
            </span>
          </div>
          <div style={{ width: '100%', height: 8, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden', margin: '8px 0' }}>
            <div style={{ width: `${Math.max(5, feePercentileInfo.pct)}%`, height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #2563eb)', borderRadius: 999, transition: 'width 0.4s ease' }} />
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', margin: '4px 0 0', lineHeight: 1.4 }}>
            {stateName(code)}'s court clerk fee of <strong>{formatUSD(est.filingFee)}</strong> is higher than approximately <strong>{feePercentileInfo.pct}%</strong> of U.S. jurisdictions (U.S. median filing fee is {formatUSD(feePercentileInfo.medianFee)}).
          </p>
        </div>

        {fee?.note ? (
          <p className="small muted" style={{ marginTop: 12 }}>
            Filing fee note: {fee.note}
          </p>
        ) : null}

        {/* Statutory Cooling-Off & Timeline Card */}
        <div style={{ marginTop: 20, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#1e293b' }}>
            ⏳ Statutory Timeline &amp; Waiting Period: {stateName(code)}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Mandatory Cooling-Off Period:</span>
              <strong style={{ color: '#0f172a' }}>
                {residencyInfo?.waitingPeriodDays ? `${residencyInfo.waitingPeriodDays} days after service` : 'None required by statute'}
              </strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>State Residency Required:</span>
              <strong style={{ color: '#0f172a' }}>{residencyInfo?.residency || 'Domicile at filing'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Pre-Filing Separation:</span>
              <strong style={{ color: '#0f172a' }}>{residencyInfo?.separation || 'None required'}</strong>
            </div>
          </div>
        </div>

        {/* In Forma Pauperis (Court Fee Waiver) Calculator */}
        <div style={{ marginTop: 20, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#166534' }}>
            💡 In Forma Pauperis (Court Fee Waiver) Eligibility
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#15803d', margin: '0 0 12px 0' }}>
            Low-income filers can petition the court for a 100% waiver of the {formatUSD(est.filingFee)} filing fee under state poverty exemption rules (typically 150% of Federal Poverty Guidelines).
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#166534', marginBottom: 4 }}>
                Household Monthly Income ($)
              </label>
              <input
                type="number"
                placeholder="e.g. 1800"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #86efac', width: 140 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#166534', marginBottom: 4 }}>
                Household Size
              </label>
              <select
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #86efac' }}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>
          </div>
          {qualifiesForWaiver !== null && (
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 6, background: qualifiesForWaiver ? '#dcfce7' : '#fef2f2', border: qualifiesForWaiver ? '1px solid #86efac' : '1px solid #fecaca' }}>
              {qualifiesForWaiver ? (
                <span style={{ color: '#15803d', fontSize: '0.875rem', fontWeight: 600 }}>
                  ✓ You likely qualify for an In Forma Pauperis (IFP) fee waiver! You may pay $0 instead of {formatUSD(est.filingFee)} by filing the state waiver petition with your initial complaint.
                </span>
              ) : (
                <span style={{ color: '#991b1b', fontSize: '0.875rem' }}>
                  ℹ Your reported income exceeds the typical 150% poverty guideline (${waiverThreshold.toLocaleString()}/mo) for an automatic waiver, but you may still request an installment plan or discretionary waiver.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Hub: Print & Copy Summary */}
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn secondary"
            style={{ fontSize: '0.875rem', padding: '8px 16px' }}
          >
            {copied ? '✓ Summary Copied!' : '📋 Copy Case Breakdown'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn secondary"
            style={{ fontSize: '0.875rem', padding: '8px 16px' }}
          >
            🖨️ Print Official Filing &amp; Cost Dossier
          </button>
        </div>
      </div>

      <div className="note warn" style={{ marginTop: 18 }}>
        <strong>Estimates only.</strong> The filing fee is real and cited; attorney and mediation
        figures are national industry averages, not a quote for your case. Your actual cost depends
        on your facts, your county, and whether issues are contested.
      </div>

      <DataSources sources={COST_SOURCES} />
    </div>
  );
}
