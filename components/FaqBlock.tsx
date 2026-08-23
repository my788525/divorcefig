// Reusable FAQ block + JSON-LD.
export function FaqBlock({
  items,
  title = 'Frequently Asked Questions',
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="faq-block" aria-label={title}>
      <h2>{title}</h2>
      <div className="faq-list">
        {items.map((it, i) => (
          <details key={i} className="faq-item">
            <summary>{it.q}</summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
