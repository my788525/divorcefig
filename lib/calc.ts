// Divorce cost estimator logic (lib/calc.ts).
//
// The estimator combines a REAL, cited state filing fee (data/divorce-filing-fees.ts)
// with REAL industry-average attorney / mediation cost bands (clearly labelled
// ESTIMATES). It never invents a per-state attorney number — attorney costs are
// national industry averages layered on top of the real state filing fee.

import { getFilingFee } from '@/data/divorce-filing-fees';

export type CaseType = 'diy' | 'uncontested' | 'contested' | 'mediation';

export interface CaseProfile {
  key: CaseType;
  label: string;
  attorneyMin: number;
  attorneyMax: number;
  extraMin: number; // service / copying / misc, DIY only
  extraMax: number;
  note: string;
}

// Industry-average cost bands (ESTIMATES — not state-specific).
//  - Uncontested flat-fee attorney: Martindale-Nolo Research — avg ≈ $4,100.
//  - Contested hourly: Clio 2025 family-law avg $344/hr; Martindale-Nolo avg
//    trial cost $20,379+. Range reflects limited dispute → full trial.
//  - Mediation: industry norm ≈ $3,000–$8,000 total (~$150–$300/hr).
//  - DIY: filing fee + service of process + form/copy costs.
export const CASE_PROFILES: Record<CaseType, CaseProfile> = {
  diy: {
    key: 'diy',
    label: 'Do-it-yourself (no attorney)',
    attorneyMin: 0,
    attorneyMax: 0,
    extraMin: 50,
    extraMax: 600,
    note: 'You complete and file everything yourself. Cost = state filing fee + service of process + form/copy costs.',
  },
  uncontested: {
    key: 'uncontested',
    label: 'Uncontested with an attorney (flat fee)',
    attorneyMin: 2500,
    attorneyMax: 5500,
    extraMin: 0,
    extraMax: 0,
    note: 'Both spouses agree; a flat-fee attorney handles the paperwork. National average ≈ $4,100 (Martindale-Nolo Research).',
  },
  contested: {
    key: 'contested',
    label: 'Contested (hourly attorney)',
    attorneyMin: 4000,
    attorneyMax: 25000,
    extraMin: 0,
    extraMax: 0,
    note: 'Disputed issues billed hourly. Family-law rates $196–$492/hr (Clio 2025); contested cases average $20,379+ (Martindale-Nolo Research).',
  },
  mediation: {
    key: 'mediation',
    label: 'Mediation (no full-scope attorney)',
    attorneyMin: 3000,
    attorneyMax: 8000,
    extraMin: 0,
    extraMax: 0,
    note: 'A neutral mediator helps you settle. Total typically $3,000–$8,000 (≈ $150–$300/hr).',
  },
};

export const CASE_ORDER: CaseType[] = ['diy', 'uncontested', 'mediation', 'contested'];

export const COST_SOURCES: { label: string; detail: string }[] = [
  {
    label: 'Filing fees',
    detail:
      'legalcostcalculator.org, "Divorce Filing Fees by State 2026" (official state court fee schedules); cross-checked vs Nolo / Realcostreport 2026.',
  },
  {
    label: 'Attorney & mediation cost bands',
    detail:
      'Martindale-Nolo Research divorce-cost survey (uncontested avg ≈ $4,100; contested/trial avg $20,379+) and Clio Legal Trends Report 2025 (family-law hourly $196–$492).',
  },
];

export interface CostEstimate {
  filingFee: number;
  filingNote?: string;
  attorneyMin: number;
  attorneyMax: number;
  extraMin: number;
  extraMax: number;
  totalMin: number;
  totalMax: number;
}

export function estimateCost(code: string, type: CaseType): CostEstimate {
  const fee = getFilingFee(code);
  const filingFee = fee?.fee ?? 0;
  const p = CASE_PROFILES[type];
  return {
    filingFee,
    filingNote: fee?.note,
    attorneyMin: p.attorneyMin,
    attorneyMax: p.attorneyMax,
    extraMin: p.extraMin,
    extraMax: p.extraMax,
    totalMin: filingFee + p.attorneyMin + p.extraMin,
    totalMax: filingFee + p.attorneyMax + p.extraMax,
  };
}

export function formatUSD(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}
