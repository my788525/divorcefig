import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import { FaqBlock, faqLd } from '@/components/FaqBlock';

export const metadata = {
  title: 'About DivorceFig — Methodology, Disclaimer & Data Sources',
  description:
    'How DivorceFig compiles state-level divorce information, our YMYL disclaimer, and the official sources behind every figure. Not legal advice.',
  alternates: { canonical: '/about/' },
};

const FAQ = [
  {
    q: 'Is DivorceFig a law firm?',
    a: 'No. DivorceFig is an independent educational website. We are not attorneys and do not provide legal advice, representation, or case-specific guidance.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Filing fees are drawn from each state’s official court fee schedule (compiled via legalcostcalculator.org 2026 and cross-checked against Nolo / Realcostreport). Residency and separation rules come from state family-law statutes and court self-help tables. Forms link to each state’s official court portal. Every figure carries a retrieved date of 2026-08-15.',
  },
  {
    q: 'Why do you label attorney costs as estimates?',
    a: 'Attorney and mediation fees vary by case complexity, county, and local market. We publish national industry averages (e.g., Martindale-Nolo and Clio) as clearly labelled ranges — never a state-specific fabricated quote.',
  },
  {
    q: 'What should I do for my actual case?',
    a: 'Confirm the current rule and forms with your state court or a licensed attorney in your state. Use DivorceFig to understand the landscape, not as a substitute for professional advice.',
  },
];

export default function AboutPage() {
  return (
    <div className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> › About
      </div>
      <div className="section-head">
        <h1>About DivorceFig</h1>
        <p className="lead prose" style={{ color: 'var(--ink-soft)' }}>
          DivorceFig is a free, independent reference for U.S. divorce information — built to help
          readers understand, by state, what a divorce costs, what the residency and separation
          rules are, and which official court forms are used.
        </p>
      </div>

      <div className="note warn">
        <strong>Disclaimer — please read.</strong> This site provides general information only and
        is <strong>not legal advice</strong>. Divorce is governed by state law and decided by a
        court. Nothing here creates an attorney–client relationship. Consult a licensed attorney in
        your state for advice about your situation.
      </div>

      <h2 style={{ marginTop: 28 }}>Our approach</h2>
      <div className="prose">
        <ul>
          <li>
            <strong>Real, cited data.</strong> We use each state&apos;s official court fee schedules,
            statutes, and self-help tables — never invented numbers.
          </li>
          <li>
            <strong>Labelled estimates.</strong> Where we show attorney or mediation costs, they are
            national industry averages, clearly marked as estimates.
          </li>
          <li>
            <strong>Transparent sources.</strong> Every data table cites its source and a retrieved
            date ({SITE.retrieved}).
          </li>
          <li>
            <strong>No affiliate thin content.</strong> We do not publish &quot;best lawyer&quot;
            roundups or paid comparisons.
          </li>
        </ul>
      </div>

      <h2>Data sources &amp; retrieved: {SITE.retrieved}</h2>
      <div className="prose">
        <ul>
          <li>
            <strong>Filing fees:</strong> legalcostcalculator.org &quot;Divorce Filing Fees by State
            2026&quot; (official state court fee schedules), cross-checked vs Nolo / Realcostreport
            2026.
          </li>
          <li>
            <strong>Residency &amp; separation:</strong> state family-law statutes and court self-help
            tables (DivorceNet, DivorceClear, LegalClarity, Recording-law 2026).
          </li>
          <li>
            <strong>Forms:</strong> each state&apos;s official court self-help / forms portal.
          </li>
          <li>
            <strong>Attorney &amp; mediation cost bands:</strong> Martindale-Nolo Research divorce-cost
            survey and Clio Legal Trends Report 2025.
          </li>
        </ul>
      </div>

      <h2>Tools</h2>
      <div className="grid cols-3">
        <div className="card">
          <h3>Cost Estimator</h3>
          <p>Real state filing fees plus industry-average professional cost bands.</p>
          <Link className="textlink" href="/divorce-cost/">
            Open →
          </Link>
        </div>
        <div className="card">
          <h3>Residency &amp; Separation</h3>
          <p>Per-state rules on how long you must live in a state and whether you must live apart.</p>
          <Link className="textlink" href="/divorce-requirements/">
            Open →
          </Link>
        </div>
        <div className="card">
          <h3>Forms by State</h3>
          <p>The typical forms filed, linked to each state&apos;s official portal.</p>
          <Link className="textlink" href="/forms/california/">
            Open →
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }}
      />
      <FaqBlock items={FAQ} />
    </div>
  );
}
