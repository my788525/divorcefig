'use client';

import React, { useState } from 'react';

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
  heading = "Recommended Next Steps & Verified Resources",
  subheading = "Actionable follow-up guidance, state forms, and planning tools",
  resources
}: NextStepsActionHubProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900/40 dark:to-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-xl p-6 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {heading}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subheading}</p>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm shrink-0"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? "Link Copied!" : "Save & Share Calculation"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {resources.map((res, i) => (
          <a
            key={i}
            href={res.href}
            target={res.isExternal ? "_blank" : undefined}
            rel={res.isExternal ? "noopener noreferrer" : undefined}
            className="group flex flex-col justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {res.title}
                </span>
                {res.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                    {res.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {res.desc}
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
export default NextStepsActionHub;
