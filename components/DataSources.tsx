import { SITE } from '@/lib/site-config';

// Data-sources block — YMYL compliance. Transparent provenance with retrieved date.
export function DataSources({
  sources,
  retrieved = SITE.retrieved,
}: {
  sources: { label: string; detail: string }[];
  retrieved?: string;
}) {
  return (
    <section className="data-sources" aria-label="Data sources and methodology">
      <h2 className="ds-title">Data sources &amp; methodology</h2>
      <ul className="ds-list">
        {sources.map((s, i) => (
          <li key={i}>
            <span className="ds-label">{s.label}</span>
            <span className="ds-detail">{s.detail}</span>
          </li>
        ))}
      </ul>
      <p className="ds-foot">
        Data sources &amp; retrieved: {retrieved}. Methodology and citations are maintained by the{' '}
        {SITE.name} editorial team. Filing fees, residency rules, and forms are set by each state and
        change — always confirm the current requirement with your state court or a licensed attorney
        in your state before relying on any figure.
      </p>
    </section>
  );
}
