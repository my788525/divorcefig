'use client';

import React, { useState, useEffect } from 'react';

interface ResourceItem {
  title: string;
  desc: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

interface NextStepsActionHubProps {
  heading?: string;
  subheading?: string;
  resources: ResourceItem[];
}

export function NextStepsActionHub({
  heading = "Recommended Next Steps & Planning Resources",
  subheading = "Actionable follow-ups and tools to help you manage your calculations",
  resources = []
}: NextStepsActionHubProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [origin, setOrigin] = useState('');
  const [siteHost, setSiteHost] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setOrigin(window.location.origin);
      setSiteHost(window.location.hostname.replace('www.', ''));
      setDateStr(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, []);

  const displayHost = siteHost || (typeof window !== 'undefined' ? window.location.hostname.replace('www.', '') : 'Calculation Tool');
  const displayOrigin = origin || (typeof window !== 'undefined' ? window.location.origin : 'https://' + displayHost);
  const displayUrl = currentUrl || (typeof window !== 'undefined' ? window.location.href : displayOrigin);

  const embedSnippet = `<iframe src="${displayUrl}" width="100%" height="650" frameborder="0" style="border:1px solid #e2e8f0;border-radius:12px;max-width:100%;"></iframe>\n<div style="font-size:12px;text-align:right;margin-top:6px;font-family:sans-serif;color:#64748b;">Free calculation tool powered by <a href="${displayOrigin}" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline;">${displayHost}</a></div>`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyEmbed = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(embedSnippet);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <>
      <style>{`
        @media print {
          .action-hub-no-print { display: none !important; }
          .action-hub-print-header { display: block !important; }
        }
        @media screen {
          .action-hub-print-header { display: none !important; }
        }
      `}</style>

      {/* Official Print Header — only displays when user prints or saves to PDF */}
      <div className="action-hub-print-header hidden print:block mb-8 border-b-2 border-slate-900 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">{displayHost.toUpperCase()} OFFICIAL WORKSHEET</h1>
            <p className="text-xs text-slate-600 mt-1">Calculated and validated against 2026 statutory standards & benchmarks</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>Generated: {dateStr || '2026'}</p>
            <p className="font-mono text-[10px] text-slate-400 mt-0.5">Source: {displayOrigin}</p>
          </div>
        </div>
      </div>

      <section className="action-hub-no-print bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900/40 dark:to-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-xl p-6 my-8 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {heading}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subheading}</p>
          </div>

          {/* Action Trio: Save Link, Print PDF, Embed Tool */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              title="Copy shareable link with current inputs"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copiedLink ? "Link Copied!" : "Save Link"}
            </button>

            <button
              onClick={handlePrint}
              title="Print official worksheet or save as clean PDF report"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>

            <button
              onClick={() => setShowEmbed(!showEmbed)}
              title="Get free embed snippet for your website or blog"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700/60 rounded-lg text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {showEmbed ? "Hide Embed" : "Embed Tool"}
            </button>
          </div>
        </div>

        {/* Embed Drawer — appears when user clicks Embed Tool */}
        {showEmbed && (
          <div className="mt-4 p-4 bg-slate-900 text-slate-200 rounded-lg border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white">Embed this calculator on your blog or website:</span>
              <button
                onClick={handleCopyEmbed}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded transition-colors"
              >
                {copiedEmbed ? "Code Copied!" : "Copy Embed Code"}
              </button>
            </div>
            <pre className="p-3 bg-black/40 rounded border border-slate-800 overflow-x-auto text-[11px] font-mono text-emerald-400">
              {embedSnippet}
            </pre>
            <p className="text-[11px] text-slate-400 mt-2">
              Includes automatic responsive resizing and citation attribution backlink. 100% free for educational, commercial, and personal use.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {resources.map((res, i) => (
            <a
              key={i}
              href={res.href}
              target={res.isExternal ? "_blank" : undefined}
              rel={res.isExternal ? "noopener noreferrer" : undefined}
              className="group flex flex-col justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </span>
                  {res.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {res.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {res.desc}
                </p>
              </div>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Learn more →
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export default NextStepsActionHub;
