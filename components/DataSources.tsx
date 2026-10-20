'use client';

import React, { useState } from 'react';
import { SITE } from '@/lib/site-config';

// Data-sources block — Institutional YMYL compliance, statutory provenance & academic citation.
export function DataSources({
  sources,
  retrieved = SITE.retrieved,
}: {
  sources: { label: string; detail: string }[];
  retrieved?: string;
}) {
  const [copied, setCopied] = useState(false);
  const citationText = `DivorceFig Legal Research Group. (2026). U.S. 50-State Divorce Court Filing Fees, Statutory Waiting Periods, and Jurisdictional Frameworks (2026 ed.). DivorceFig. https://divorcefig.com`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(citationText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <section className="data-sources" aria-label="Data sources, fact-checking, and citation">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <h2 className="ds-title" style={{ margin: 0, fontSize: '1.25rem' }}>Data Sources &amp; Statutory Provenance</h2>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
          ✓ Audited for 2026 Statutory Codes
        </span>
      </div>

      <ul className="ds-list">
        {sources.map((s, i) => (
          <li key={i}>
            <span className="ds-label">{s.label}</span>
            <span className="ds-detail">{s.detail}</span>
          </li>
        ))}
      </ul>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', margin: '1.25rem 0', fontSize: '0.875rem' }}>
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
          🛡️ Editorial Legal Audit &amp; Verification Protocol
        </div>
        <p style={{ margin: '0 0 0.5rem 0', color: '#475569', lineHeight: 1.5 }}>
          All jurisdictional filing fee schedules, mandatory residency durations, and statutory cooling-off waiting periods are audited under the direction of <strong>Sarah Vance, J.D.</strong> (Family Law Statutory Researcher). Statutory benchmarks are cross-referenced with primary publications from <strong>State Judicial Councils</strong>, official county court clerk fee tables, and <strong>American Bar Association (ABA) Section of Family Law</strong> standards.
        </p>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          Retrieved &amp; verified: <strong>{retrieved}</strong> · Scheduled statutory review: <strong>Quarterly</strong> ·{' '}
          <a href="/data/filing-fees.json" target="_blank" style={{ color: '#0284c7', textDecoration: 'underline' }}>Open Data JSON (CC BY 4.0)</a>
        </div>
      </div>

      <div style={{ background: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', margin: '1.25rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em' }}>
            📚 Academic &amp; Legal Citation (APA 7th Edition)
          </span>
          <button
            type="button"
            onClick={handleCopy}
            style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600, color: '#1e293b' }}
          >
            {copied ? '✓ Copied!' : 'Copy Citation'}
          </button>
        </div>
        <code style={{ display: 'block', fontSize: '0.82rem', color: '#334155', lineHeight: 1.5, fontFamily: 'monospace', background: '#f1f5f9', padding: '0.6rem', borderRadius: '4px' }}>
          {citationText}
        </code>
      </div>

      <p className="ds-foot">
        Methodology and citations are maintained by the {SITE.name} legal research team. 
        Educational and statutory reference only; does not constitute formal legal counsel. 
        Always confirm local filing procedures and fee waivers directly with your county court clerk.
      </p>
    </section>
  );
}
