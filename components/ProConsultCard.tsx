"use client";
import React, { useState } from "react";

export default function ProConsultCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [notes, setNotes] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !tcpa) return;
    setStatus("sending");
    try {
      const res = await fetch("https://send.lianu.com/api/leads/pro-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "divorcefig.com",
          name,
          phone,
          email,
          state: stateCode,
          urgency: "high",
          notes,
          tcpa_consent: true,
        }),
      });
      if (res.ok) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="my-8 rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 text-slate-100 shadow-xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Professional Match &amp; Negotiation Prep
          </span>
          <h3 className="text-xl font-bold text-white">Need a Family Law Attorney? Compare Options Before Paying $400/hr</h3>
          <p className="text-sm text-slate-300">
            Before signing a $3,000+ retainer, ask about flat-fee vs. hourly billing, unbundled document review, and free 15-minute intake screening.
          </p>
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Vetted Partner Directory</p>
          <div className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 flex items-center justify-between"><span>LegalZoom Family Law</span><span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">Coming Soon</span></div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 flex items-center justify-between"><span>Martindale-Nolo Attorney Match</span><span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">Coming Soon</span></div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 flex items-center justify-between"><span>Unbundled Legal Help</span><span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">Coming Soon</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
          {status === "done" ? (
            <div className="py-8 text-center">
              <p className="text-lg font-semibold text-emerald-400">Request Received</p>
              <p className="mt-1 text-xs text-slate-300">A matching specialist or partner intake desk will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-sm font-semibold text-white">Request a Free 15-Min Callback</p>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white" />
                <input type="text" placeholder="State (e.g. CA, TX)" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="tel" required placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white" />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white" />
              </div>
              <textarea rows={2} placeholder="Brief summary of your situation..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white" />
              <label className="flex items-start gap-2 text-[11px] text-slate-400">
                <input type="checkbox" required checked={tcpa} onChange={(e) => setTcpa(e.target.checked)} className="mt-0.5" />
                <span>I consent to receive calls or texts (including automated/prerecorded) from divorcefig.com and its matching legal/financial partners at the number provided. Not a law firm; informational matching only.</span>
              </label>
              <button type="submit" disabled={status === "sending"} className="w-full rounded-xl bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition">
                {status === "sending" ? "Submitting..." : "Request Free Case Callback"}
              </button>
              {status === "error" && <p className="text-xs text-rose-400">Submission failed. Please check your phone number and try again.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
