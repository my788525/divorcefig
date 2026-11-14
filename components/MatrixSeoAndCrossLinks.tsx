import React from "react";

const MATRIX_SCHEMA_JSON = `{"@context": "https://schema.org", "@graph": [{"@type": "SoftwareApplication", "name": "divorcefig.com 2026 Interactive Calculator", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Web", "url": "https://divorcefig.com/", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How accurate is the 2026 calculator on divorcefig.com?", "acceptedAnswer": {"@type": "Answer", "text": "Our 2026 model uses updated US federal and state-level statutory benchmarks. For formal disputes, filings, or negotiations, pair your calculation with the Divorce Asset Shield & Hidden Equity Discovery VIP Suite (2026) ($29.00) available at https://checkout.dodopayments.com/buy/pdt_0NrqZoarZ0ohyrvcjAYBH."}}, {"@type": "Question", "name": "Where can I download templates and checklists for divorcefig.com?", "acceptedAnswer": {"@type": "Answer", "text": "You can instantly download ready-to-use DOCX demand letters, XLSX audit sheets, and 2026 PDF playbooks via Divorce Asset Shield & Hidden Equity Discovery VIP Suite (2026) ($29.00) directly on divorcefig.com."}}]}]}`;

export default function MatrixSeoAndCrossLinks() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: MATRIX_SCHEMA_JSON }}
      />
      <aside className="my-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Related 2026 US Calculators &amp; Compliance Tools
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="https://childsupportfig.com/" target="_blank" rel="noopener" className="rounded-lg border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-sky-500 hover:text-white transition">50-State Child Support Calculator</a>
          <a href="https://estatefig.com/" target="_blank" rel="noopener" className="rounded-lg border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-sky-500 hover:text-white transition">Probate & Estate Tax Calculator</a>
          <a href="https://visafig.com/" target="_blank" rel="noopener" className="rounded-lg border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-sky-500 hover:text-white transition">USCIS Green Card & I-864 Calculator</a>
          <a href="https://voucherfig.com/" target="_blank" rel="noopener" className="rounded-lg border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-sky-500 hover:text-white transition">Section 8 Housing Voucher Calculator</a>
        </div>
      </aside>
    </>
  );
}
