import Link from 'next/link';

export interface Crumb {
  name: string;
  url: string;
}

// Visual breadcrumb trail + matching BreadcrumbList JSON-LD (C3).
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = 'https://divorcefig.com';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${base}${c.url}`,
    })),
  };

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        {items.map((c, i) => (
          <span key={c.url}>
            {i > 0 ? <span aria-hidden="true"> › </span> : null}
            <Link href={c.url}>{c.name}</Link>
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
