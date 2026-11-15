"use client";

import React, { useState, useEffect } from "react";

interface ToolPaywallDossierProps {
  badge: string;
  title: string;
  desc: string;
  price: string;
  pid: string;
  site: string;
  features: string[];
  dynamicAmount?: string;
  docType?: string;
  storageKey?: string;
  sampleLines?: { label: string; value: string }[];
}

export default function ToolPaywallDossier({
  badge,
  title,
  desc,
  price,
  pid,
  site,
  features,
  dynamicAmount,
  docType = "Official Compliance Deliverable",
  storageKey,
  sampleLines,
}: ToolPaywallDossierProps) {
  const [showQr, setShowQr] = useState(false);
  const [restoredNotice, setRestoredNotice] = useState(false);

  const checkoutUrl = `https://send.lianu.com/api/vip/go?site=${encodeURIComponent(site)}&pid=${encodeURIComponent(pid)}&src=dossier_v2`;
  const passUrl = `https://send.lianu.com/api/vip/go?site=${encodeURIComponent(site)}&pid=pdt_0NryTUNyfdta6f959Z51a&src=dossier_pass`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(checkoutUrl)}`;

  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`calc_${storageKey}`);
        if (saved) {
          setRestoredNotice(true);
          setTimeout(() => setRestoredNotice(false), 5000);
        }
      } catch {}
    }
  }, [storageKey]);

  return (
    <div className="my-10 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Restored from LocalStorage Banner */}
      {restoredNotice && (
        <div className="mb-6 bg-sky-950/80 border border-sky-500/40 text-sky-200 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>💾</span>
            <span>Welcome back! Your previous calculation session has been securely restored from your browser.</span>
          </div>
          <span className="font-bold">Session Active</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Visual A4 Document Skeleton / Teaser Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[320px] bg-slate-950 border border-slate-700/80 rounded-xl p-5 shadow-2xl relative transform -rotate-1 hover:rotate-0 transition duration-300">
            {/* Header / Seal */}
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">DOC ID: 2026-STATUTORY</div>
                <div className="text-xs font-black text-white uppercase">{docType}</div>
              </div>
              <div className="w-7 h-7 rounded-full border border-amber-500/60 bg-amber-500/10 flex items-center justify-center text-[10px] text-amber-400 font-bold">
                ★
              </div>
            </div>

            {/* Document Body Sample Lines */}
            <div className="my-4 space-y-2.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Jurisdiction Standard:</span>
                <span className="text-white font-bold">U.S. Federal / State</span>
              </div>
              {dynamicAmount && (
                <div className="flex justify-between text-slate-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                  <span className="font-bold text-amber-300">Audited Amount:</span>
                  <span className="font-black text-amber-300">{dynamicAmount}</span>
                </div>
              )}
              {sampleLines ? (
                sampleLines.map((s, i) => (
                  <div key={i} className="flex justify-between text-slate-400">
                    <span>{s.label}:</span>
                    <span className="text-slate-200 font-semibold">{s.value}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between text-slate-400">
                    <span>Statutory Safe Harbor:</span>
                    <span className="text-emerald-400">Verified IRM &amp; DOL</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Audit Defense Layer:</span>
                    <span className="text-slate-200">100% Contemporaneous</span>
                  </div>
                </>
              )}
            </div>

            {/* Watermark / Ghost Overlay */}
            <div className="mt-4 pt-3 border-t border-dashed border-slate-800 text-center relative">
              <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                Security Watermark Verification
              </div>
              <div className="inline-block px-2 py-1 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-bold text-amber-400/90 font-mono tracking-tight">
                [READY FOR 1-CLICK EXPORT]
              </div>
              <div className="text-[9px] text-slate-500 mt-1">Form 100% Filled · Sign &amp; Submit</div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Converting Value & Action Area */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider rounded-full border border-amber-500/30">
                ★ {badge}
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                <span>🔒</span> <span>100% In-Browser · Zero Cloud Upload</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {dynamicAmount ? `Export Official ${dynamicAmount} Audit Packet` : title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
          </div>

          {/* Feature Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-300">
            {features.map((f, i) => (
              <div key={i} className="flex items-center space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm transition shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 text-center"
            >
              <span>⚡ Download Official Deliverable ({price})</span>
            </a>

            {/* Mobile QR Button for Office IT Firewall Bypass */}
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center justify-center space-x-1.5"
              title="Work computer blocking checkout? Scan with your phone to pay via Apple Pay"
            >
              <span>📱</span>
              <span>{showQr ? "Hide QR" : "Pay via Phone"}</span>
            </button>
          </div>

          {/* QR Code Popover */}
          {showQr && (
            <div className="p-4 bg-slate-950 border border-slate-700 rounded-2xl flex items-center space-x-4 animate-in fade-in duration-200">
              <img
                src={qrImageUrl}
                alt="Scan to pay via Apple Pay on phone"
                className="w-24 h-24 rounded-lg bg-white p-1 shrink-0"
              />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-white flex items-center space-x-1">
                  <span>Pay / Google Pay on Mobile</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  On a corporate laptop with firewall restrictions? Scan this code with your phone camera to pay in 2 seconds via Apple Pay. The file will be available immediately.
                </p>
              </div>
            </div>
          )}

          {/* Corporate Expensable Reassurance & Trust Seals */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="text-[11px] text-amber-200/90 flex items-center space-x-2">
              <span>🧾</span>
              <span>
                <strong>100% Tax-Deductible &amp; Expensable:</strong> Instant invoice &amp; receipt provided for Concur / Expensify corporate expense reimbursement.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-slate-300">Accepted:</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-200 font-bold">Pay</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-200 font-bold">GPay</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-200 font-bold">Visa/Mastercard</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-200 font-bold">AMEX</span>
              </div>
              <a
                href={passUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white underline transition mt-1 sm:mt-0"
              >
                Or get All-Access Pass ($9.90/mo)
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
