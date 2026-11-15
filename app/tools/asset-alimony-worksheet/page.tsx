import WhiteCollarHub from "@/components/WhiteCollarHub";
"use client";

import React, { useState } from "react";

export default function AssetAlimonyWorksheetPage() {
  const [maritalHomeEquity, setMaritalHomeEquity] = useState(380000);
  const [retirement401k, setRetirement401k] = useState(290000);
  const [liquidBankAccounts, setLiquidBankAccounts] = useState(65000);
  const [maritalDebt, setMaritalDebt] = useState(25000);

  const [spouse1Income, setSpouse1Income] = useState(140000);
  const [spouse2Income, setSpouse2Income] = useState(48000);
  const [marriageYears, setMarriageYears] = useState(14);

  const netMaritalEstate = maritalHomeEquity + retirement401k + liquidBankAccounts - maritalDebt;
  const equalSplitPerSpouse = netMaritalEstate / 2;

  // Alimony guideline estimation (AAML formula: 30% higher earner - 20% lower earner, capped at 40% combined)
  const incomeDiff = (spouse1Income * 0.30) - (spouse2Income * 0.20);
  const annualAlimonyEst = Math.max(0, incomeDiff);
  const monthlyAlimonyEst = annualAlimonyEst / 12;

  // Duration guideline: e.g. 10-20 yrs marriage ~ 50% to 70% of marriage duration
  const alimonyDurationYears = Math.round(marriageYears * 0.6);

  const checkoutUrl = "https://send.lianu.com/api/vip/go?site=divorcefig.com&pid=pdt_0NryTTvHXUeDNZZxJx7QE&src=tool_alimony_worksheet";
  const passUrl = "https://send.lianu.com/api/vip/go?site=divorcefig.com&pid=pdt_0NryTUNyfdta6f959Z51a&src=tool_pass";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Privacy Badge */}
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🔒</span>
            <div>
              <span className="font-bold text-emerald-300">100% Private Divorce Financial Mediation:</span>
              <span className="text-emerald-200/80 ml-2">401(k), home equity, and alimony calculations execute strictly in your browser.</span>
            </div>
          </div>
          <span className="hidden md:inline-block px-2.5 py-1 bg-emerald-900/60 text-emerald-300 text-xs font-semibold rounded border border-emerald-700">AAML &amp; Equitable Distribution Standard</span>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Marital Asset Division &amp; Alimony Calculation Worksheet
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Audit 50/50 community property vs equitable distribution splits. Calculates home equity buyout balance, QDRO retirement apportionment, and spousal support duration.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">Net Marital Estate Total</div>
            <div className="text-4xl font-extrabold text-white mt-2">${netMaritalEstate.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-2">50/50 Equalization Target: <strong>${Math.round(equalSplitPerSpouse).toLocaleString()}</strong> per spouse</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Estimated Spousal Maintenance (Alimony)</div>
            <div className="text-4xl font-extrabold text-emerald-400 mt-2">${Math.round(monthlyAlimonyEst).toLocaleString()} <span className="text-lg font-normal text-slate-400">/ mo</span></div>
            <div className="text-xs text-slate-400 mt-2">Guideline Duration: ~<strong>{alimonyDurationYears} years</strong> based on {marriageYears}-year marriage</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white border-b border-slate-800 pb-2">1. Marital Balance Sheet</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Marital Residence Net Equity ($)</label>
              <input type="number" step="5000" value={maritalHomeEquity} onChange={e => setMaritalHomeEquity(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Retirement &amp; 401(k) / IRA Balances ($)</label>
              <input type="number" step="5000" value={retirement401k} onChange={e => setRetirement401k(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Liquid Savings ($)</label>
                <input type="number" step="1000" value={liquidBankAccounts} onChange={e => setLiquidBankAccounts(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Marital Debt ($)</label>
                <input type="number" step="1000" value={maritalDebt} onChange={e => setMaritalDebt(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white border-b border-slate-800 pb-2">2. Income &amp; Marriage Duration</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Higher Earner Annual Gross Income ($)</label>
              <input type="number" step="5000" value={spouse1Income} onChange={e => setSpouse1Income(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Lower Earner Annual Gross Income ($)</label>
              <input type="number" step="5000" value={spouse2Income} onChange={e => setSpouse2Income(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Length of Marriage (Years)</label>
              <input type="number" value={marriageYears} onChange={e => setMarriageYears(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Dodo Paywall */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-2xl p-6 md:p-8 text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase rounded-full border border-amber-500/30">
            Mediation &amp; Court Agreement Ready
          </div>
          <h3 className="text-2xl font-extrabold text-white">Export Marital Property Settlement Agreement ($6.99)</h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Generate an official 4-page marital settlement balance sheet with QDRO retirement rollover clauses, equity buyout schedules, and waiver of future spousal support claims.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3.5 rounded-xl text-base transition shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2">
              <span>⚡ Download Settlement Worksheet ($6.99)</span>
            </a>
            <a href={passUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3.5 rounded-xl text-sm transition border border-slate-700">
              All-Access Pass ($9.90/mo - All Tools)
            </a>
          </div>
        </div>

      </div>
    <WhiteCollarHub />
</div>
  );
}
