"use client";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "fst_ad_consent_v1";
const EVENT_NAME = "fst:open-consent";
type Choice = "granted" | "denied" | null;

export default function CookieConsent() {
  const [choice, setChoice] = useState<Choice | "loading">("loading");
  const injected = useRef(false);

  const injectAdScript = () => {
    if (injected.current) return;
    if (document.querySelector("script[data-fst-adsense]")) return;
    injected.current = true;
    const s = document.createElement("script");
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-5014006117898962';
    s.async = true;
    s.crossOrigin = "anonymous";
    s.dataset.fstAdsense = "1";
    document.head.appendChild(s);
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      setChoice("granted");
      injectAdScript();
    } else if (stored === "denied") {
      setChoice("denied");
    } else {
      setChoice(null);
    }
  }, []);

  const decide = (value: "granted" | "denied") => {
    localStorage.setItem(STORAGE_KEY, value);
    setChoice(value);
    if (value === "granted") injectAdScript();
  };

  if (choice !== null) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a1a2e", color: "#eee", padding: "16px 24px", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", boxShadow: "0 -2px 12px rgba(0,0,0,0.3)" }}>
      <div style={{ flex: 1, minWidth: "280px" }}>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
          We use cookies and ad personalization to improve your experience and show relevant ads.
          By continuing, you agree to our{" "}
          <a href="/privacy/" style={{ color: "#7ec8e3", textDecoration: "underline" }}>Privacy Policy</a>.
        </p>
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#aaa" }}>
          Your choices apply to all devices you use. You can change your preferences anytime.
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button onClick={() => decide("denied")} style={{ padding: "8px 16px", background: "transparent", border: "1px solid #555", color: "#ccc", borderRadius: 4, cursor: "pointer", fontSize: "13px" }}>
          Decline
        </button>
        <button onClick={() => decide("granted")} style={{ padding: "8px 16px", background: "#4f46e5", border: "none", color: "#fff", borderRadius: 4, cursor: "pointer", fontSize: "13px", fontWeight: 500 }}>
          Accept &amp; Close
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const open = () => window.dispatchEvent(new CustomEvent(EVENT_NAME));
  return (
    <button onClick={open} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, textDecoration: "underline", fontSize: "inherit" }} aria-label="Cookie settings">
      Cookie Settings
    </button>
  );
}
