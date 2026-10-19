import React from 'react';

interface BenchmarkCardProps {
  title?: string;
  subtitle?: string;
  items: Array<{
    label: string;
    value: string;
    note?: string;
  }>;
  sourceText?: string;
  sourceUrl?: string;
}

export function BenchmarkCard({
  title = "2026 Statutory & Clinical Benchmarks",
  subtitle = "Official state guidelines, federal standards, and clinical scoring thresholds",
  items,
  sourceText = "Official State Statutory Guidelines & Clinical Standards",
  sourceUrl
}: BenchmarkCardProps) {
  return (
    <div className="bg-slate-900/5 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 my-6 shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700/60 pb-2">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded">
          2026 Standards
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-100 dark:border-slate-700/40">
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.value}</p>
            {item.note && <p className="text-[11px] text-slate-400 mt-0.5">{item.note}</p>}
          </div>
        ))}
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
        <span>Verified Source: <strong>{sourceText}</strong></span>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            View Official Data →
          </a>
        )}
      </div>
    </div>
  );
}
export default BenchmarkCard;
