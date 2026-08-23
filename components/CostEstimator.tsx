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
import { getFilingFee } from '@/data/divorce-filing-fees';
import { DataSources } from '@/components/DataSources';

export default function CostEstimator() {
  const [code, setCode] = useState('CA');
  const [type, setType] = useState<CaseType>('uncontested');

  const est = useMemo(() => estimateCost(code, type), [code, type]);
  const profile = CASE_PROFILES[type];
  const fee = getFilingFee(code);

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

        {fee?.note ? (
          <p className="small muted" style={{ marginTop: 12 }}>
            Filing fee note: {fee.note}
          </p>
        ) : null}
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
