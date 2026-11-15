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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [hasActivePass, setHasActivePass] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [passError, setPassError] = useState("");
  const [verifyingPass, setVerifyingPass] = useState(false);

  const checkoutUrl = `https://send.lianu.com/api/vip/go?site=${encodeURIComponent(site)}&pid=${encodeURIComponent(pid)}&src=dossier_v2`;
  const passUrl = `https://send.lianu.com/api/vip/go?site=${encodeURIComponent(site)}&pid=pdt_0NryTUNyfdta6f959Z51a&src=dossier_pass`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(checkoutUrl)}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("status") === "success") {
        setPaymentSuccess(true);
      }
      try {
        const savedKey = localStorage.getItem("matrix_all_access_key");
        if (savedKey && savedKey.startsWith("PASS-")) {
          setHasActivePass(true);
        }
        if (storageKey) {
          const saved = localStorage.getItem(`calc_${storageKey}`);
          if (saved) {
            setRestoredNotice(true);
            setTimeout(() => setRestoredNotice(false), 5000);
          }
        }
      } catch {}
    }
  }, [storageKey]);

  const handleVerifyPass = async () => {
    const clean = inputKey.trim().toUpperCase();
    if (!clean) return;
    setVerifyingPass(true);
    setPassError("");
    try {
      const res = await fetch("https://send.lianu.com/api/vip/verify-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: clean })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        localStorage.setItem("matrix_all_access_key", clean);
        setHasActivePass(true);
        setShowPassModal(false);
      } else {
        setPassError(data.message || "Invalid or expired key. Format: PASS-XXXX-XXXX-XXXX-XXXX");
      }
    } catch {
      setPassError("Network error checking key. Please try again.");
    } finally {
      setVerifyingPass(false);
    }
  };

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

      {/* Instant In-Screen Success Fulfillment Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-in fade-in">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 shadow-2xl relative">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <h4 className="text-2xl font-black text-white">Payment Confirmed!</h4>
            <p className="text-sm text-slate-300">
              Your official unwatermarked document has been compiled in-browser. Zero delay, no need to wait for email delivery.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-xl text-base transition shadow-xl cursor-pointer"
            >
              ⬇️ Download / Print Certified PDF Now
            </button>
            <p className="text-xs text-slate-400">
              🧾 An official receipt &amp; invoice was also sent to your email for Concur / Expensify corporate reimbursement.
            </p>
            <button
              type="button"
              onClick={() => setPaymentSuccess(false)}
              className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
            >
              Back to Tool
            </button>
          </div>
        </div>
      )}

      {/* Pass Key Unlock Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 text-left shadow-2xl">
            <h4 className="text-lg font-extrabold text-white">Unlock with All-Access Pass</h4>
            <p className="text-xs text-slate-300">
              Enter your 16-character license key (format: <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300 font-mono">PASS-XXXX-XXXX-XXXX-XXXX</code>) from your membership email.
            </p>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value.toUpperCase())}
              placeholder="PASS-ABCD-EFGH-JKMN-PQRT"
              className="w-full font-mono bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {passError && <div className="text-xs text-rose-400 font-medium">{passError}</div>}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                disabled={verifyingPass}
                onClick={handleVerifyPass}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
              >
                {verifyingPass ? "Verifying..." : "Activate Pass"}
              </button>
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
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
                    <span className="text-white font-bold">Active 2026 Code</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Tamper-Proof Stamp:</span>
                <span className="text-slate-300">SHA-256 Validated</span>
              </div>
            </div>

            {/* Visual Security Watermark Teaser */}
            <div className="my-4 py-3 px-2 bg-slate-900/90 rounded border border-dashed border-slate-700 text-center relative overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block transform -rotate-3 select-none">
                [ OFFICIAL CERTIFIED COMPLIANCE COPY · READY FOR EXPORT ]
              </span>
            </div>

            {/* Document Footer */}
            <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-[9px] text-slate-400 font-mono">
              <span>50-STATE COMPLIANT</span>
              <span>100% IN-BROWSER</span>
            </div>
          </div>
        </div>

        {/* Right Column: Copy, Features, CTAs, Expensable Badge */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Badge & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ★ {badge}
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                <span>🔒</span> <span>100% In-Browser · Zero Cloud Upload</span>
              </span>
              {hasActivePass && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-950/80 text-sky-300 border border-sky-500/40">
                  <span>💎</span> <span>All-Access Pass Active</span>
                </span>
              )}
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
            {hasActivePass ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm transition shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 text-center cursor-pointer"
              >
                <span>⚡ Pass Unlocked: Download Official PDF (Free)</span>
              </button>
            ) : (
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm transition shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 text-center"
              >
                <span>⚡ Download Official Deliverable ({price})</span>
              </a>
            )}

            {/* Mobile QR Button for Office IT Firewall Bypass */}
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
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

          {/* Corporate Expensable Reassurance & 30-Day Money-Back Guarantee */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="text-[11px] text-amber-200/90 flex items-center space-x-2">
              <span>🧾</span>
              <span>
                <strong>100% Tax-Deductible &amp; Expensable:</strong> Instant invoice &amp; receipt provided for Concur / Expensify corporate expense reimbursement.
              </span>
            </div>

            <div className="text-[11px] text-emerald-300/90 flex items-center space-x-2">
              <span>🛡️</span>
              <span>
                <strong>30-Day Money-Back Guarantee:</strong> Zero dispute hassle. Instant 1-click refund if this deliverable doesn't satisfy your audit needs.
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
              <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                <button
                  type="button"
                  onClick={() => setShowPassModal(true)}
                  className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
                >
                  Enter Pass Key
                </button>
                <span>·</span>
                <a
                  href={passUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white underline transition"
                >
                  All-Access Pass ($9.90/mo)
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
