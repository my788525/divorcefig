"use client";

import React, { useState, useEffect } from "react";

const MATRIX_TOOLS = [
  { category: "Tax & IRS Defense", site: "fisctalk.com", url: "https://fisctalk.com/tools/irs-mileage-audit", title: "IRS Mileage & Home Office Audit", price: "$2.99" },
  { category: "Tax & IRS Defense", site: "fisctalk.com", url: "https://fisctalk.com/tools/crypto-tax", title: "Crypto Tax Basis & Loss Harvesting", price: "$4.99" },
  { category: "Automotive & Loans", site: "vehcalc.com", url: "https://vehcalc.com/tools/dealer-otd-trap-scanner", title: "Dealer OTD Junk Fee Trap Scanner", price: "$3.99" },
  { category: "Automotive & Loans", site: "vehcalc.com", url: "https://vehcalc.com/tools/depreciation-curve-sim", title: "Sec 179 Heavy SUV Depreciation", price: "$4.99" },
  { category: "Legal, HR & Work", site: "tipfig.com", url: "https://tipfig.com/tools/flsa-overtime-dossier", title: "FLSA Unpaid Overtime & Wage Dispute", price: "$3.99" },
  { category: "Legal, HR & Work", site: "filefixpro.com", url: "https://filefixpro.com/tools/pii-redactor", title: "Confidential Document PII Redactor", price: "$2.99" },
  { category: "Real Estate & Home", site: "estatefig.com", url: "https://estatefig.com/tools/closing-cost-netsheet", title: "Realtor Closing Cost Net Sheet", price: "$4.99" },
  { category: "Real Estate & Home", site: "renofig.com", url: "https://renofig.com/tools/contractor-lien-waiver", title: "Contractor Mechanic's Lien Waiver", price: "$4.99" },
  { category: "Insurance & Claims", site: "insurtool.com", url: "https://insurtool.com/tools/denial-appeal-letter", title: "Claim Denial DOI Bad-Faith Appeal", price: "$4.99" },
  { category: "Family & Divorce", site: "childsupportfig.com", url: "https://childsupportfig.com/tools/parenting-expense-splitter", title: "Parenting Time & Expense Splitter", price: "$4.99" },
  { category: "Family & Divorce", site: "divorcefig.com", url: "https://divorcefig.com/tools/asset-alimony-worksheet", title: "Marital Asset Distribution Worksheet", price: "$6.99" },
  { category: "Developer & Data", site: "devfixpro.com", url: "https://devfixpro.com/tools/dirty-csv-quickfixer", title: "Dirty CSV Enterprise Data Cleaner", price: "$1.99" }
];

export default function WhiteCollarHub() {
  const [open, setOpen] = useState(false);
  const [hasPass, setHasPass] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [keyMsg, setKeyMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("matrix_all_access_key");
      if (saved && saved.startsWith("PASS-")) {
        setHasPass(true);
      }
    }
  }, []);

  const handleActivate = async () => {
    const clean = keyInput.trim().toUpperCase();
    if (!clean) return;
    try {
      const res = await fetch("https://send.lianu.com/api/vip/verify-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: clean })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        localStorage.setItem("matrix_all_access_key", clean);
        setHasPass(true);
        setKeyMsg("✓ All-Access Pass Activated!");
      } else {
        setKeyMsg("Invalid key. Format: PASS-XXXX-XXXX-XXXX-XXXX");
      }
    } catch {
      setKeyMsg("Validation offline. Check connection.");
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-40 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md text-xs font-bold flex items-center space-x-2 transition cursor-pointer hover:border-amber-500/50"
      >
        <span className="text-amber-400">⚡</span>
        <span>Office Matrix Hub (36-in-1)</span>
        {hasPass && <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full">VIP</span>}
      </button>

      {/* Slide-Over Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400">North America White-Collar Matrix</div>
                <h3 className="text-lg font-black text-white">36-in-1 Statutory Tool Suite</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Subtitle */}
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              100% In-Browser Execution. Client-side privacy guaranteed. Instant tax-deductible expense reimbursement receipts.
            </p>

            {/* All-Access Pass Banner */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">All-Access Monthly Pass</span>
                <span className="text-amber-400 font-extrabold text-xs">$9.90/mo</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Unlock unlimited certified exports across all 36 sites with one universal license key.
              </p>
              {hasPass ? (
                <div className="text-xs text-emerald-400 font-semibold pt-1">
                  ✓ Universal All-Access Pass Active on this device
                </div>
              ) : (
                <div className="pt-2 space-y-2">
                  <a
                    href="https://send.lianu.com/api/vip/go?site=matrix&pid=pdt_0NryTUNyfdta6f959Z51a&src=hub_drawer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition"
                  >
                    Get Universal All-Access Pass ($9.90) →
                  </a>
                  <div className="flex gap-1.5 pt-1">
                    <input
                      type="text"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder="PASS-XXXX-XXXX-XXXX-XXXX"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleActivate}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer"
                    >
                      Activate
                    </button>
                  </div>
                  {keyMsg && <div className="text-[10px] text-amber-300">{keyMsg}</div>}
                </div>
              )}
            </div>

            {/* Quick Tool Directory */}
            <div className="flex-1 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Verified High-Intent Tools</div>
              {MATRIX_TOOLS.map((t, idx) => (
                <a
                  key={idx}
                  href={t.url}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 transition group text-decoration-none"
                >
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-slate-500 group-hover:text-amber-400/80 transition">{t.category} · {t.site}</div>
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white transition">{t.title}</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md shrink-0">
                    {t.price}
                  </span>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 pt-3 mt-4 text-center text-[10px] text-slate-500">
              Zero Server Cloud Upload · HIPAA / SOC-2 / GDPR Privacy Compliant
            </div>
          </div>
        </div>
      )}
    </>
  );
}
