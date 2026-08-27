'use client';

import { useMemo, useState } from 'react';
import { STATES, stateName } from '@/lib/site-config';
import {
  getRegime,
  REGIME_INFO,
  classifyAsset,
  PROPERTY_SOURCES,
  type Acquisition,
  type Source,
} from '@/data/property-regimes';
import { DataSources } from '@/components/DataSources';

const ACQUISITION_OPTIONS: { key: Acquisition; label: string }[] = [
  { key: 'before', label: 'Before the marriage' },
  { key: 'during', label: 'During the marriage' },
  { key: 'after', label: 'After permanent separation' },
];

export default function PropertyClassifier() {
  const [code, setCode] = useState('CA');
  const [acquired, setAcquired] = useState<Acquisition>('during');
  const [source, setSource] = useState<Source>('earned');

  const regime = useMemo(() => getRegime(code), [code]);
  const regimeInfo = REGIME_INFO[regime];
  const result = useMemo(
    () => classifyAsset(regime, acquired, source),
    [regime, acquired, source],
  );

  const isCpLike = regime === 'community' || regime === 'opt-in';

  return (
    <div>
      <div className="estimator">
        <div className="controls">
          <div className="field">
            <label htmlFor="state">Your state</label>
            <select id="state" value={code} onChange={(e) => setCode(e.target.value)}>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="acquired">When was it acquired?</label>
            <select
              id="acquired"
              value={acquired}
              onChange={(e) => setAcquired(e.target.value as Acquisition)}
            >
              {ACQUISITION_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {acquired === 'during' ? (
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="source">How did it come into the marriage?</label>
            <select id="source" value={source} onChange={(e) => setSource(e.target.value as Source)}>
              {PROPERTY_SOURCES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="result-total" style={{ marginTop: 16 }}>
          <div className="cap" style={{ fontWeight: 600 }}>
            In <strong>{stateName(code)}</strong> the property system is:{' '}
            <strong>{regimeInfo.label}</strong>
          </div>
        </div>

        <div
          className="breakdown"
          style={{
            marginTop: 16,
            padding: '16px 18px',
            borderRadius: 12,
            border: `1px solid ${result.category === 'separate' ? '#1d6f42' : '#b45309'}`,
            background: result.category === 'separate' ? '#f0fdf4' : '#fffbeb',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: result.category === 'separate' ? '#15803d' : '#b45309',
              marginBottom: 6,
            }}
          >
            {result.title}
          </div>
          <p style={{ margin: 0, color: '#334155' }}>{result.explanation}</p>
        </div>

        <div className="note" style={{ marginTop: 14 }}>
          <strong>How your state divides it:</strong> {regimeInfo.split}
        </div>

        <div className="note warn" style={{ marginTop: 12 }}>
          <strong>Watch out for commingling.</strong> Separate property can lose its protected status
          if it is mixed with marital funds so thoroughly it can no longer be traced (e.g. an
          inheritance deposited into a joint account used for household bills). In most
          equitable-distribution states the spouse claiming separate property carries the burden of
          proof with documentation.
        </div>
      </div>

      <div className="note" style={{ marginTop: 18 }}>
        <strong>Community vs equitable distribution.</strong>{' '}
        {isCpLike
          ? 'Community property states (AZ, CA, ID, LA, NV, NM, TX, WA, WI; Alaska by opt-in) presume a 50/50 split of what was earned or bought during the marriage.'
          : 'The 41 equitable-distribution states + D.C. divide marital property by what a judge finds fair, weighing factors such as marriage length and each spouse’s circumstances — the result is often close to equal but not guaranteed.'}{' '}
        Only marital (or community) property is divided; separate property is not.
      </div>

      <DataSources
        sources={[
          {
            label: 'Marital vs separate property',
            detail:
              'Cornell Legal Information Institute, "marital property" (law.cornell.edu/wex/marital_property) — definitions of marital and separate property and the community-property states.',
          },
          {
            label: 'Community vs equitable distribution',
            detail:
              'Justia, "Property Division Law in Divorce" — the two systems for dividing property and the nine mandatory community property states (AZ, CA, ID, LA, NV, NM, TX, WA, WI).',
          },
        ]}
      />
    </div>
  );
}
