// Divorce filing fees by state (base first-paper filing fee, USD).
//
// Source of record: legalcostcalculator.org, "Divorce Filing Fees by State 2026"
// (which compiles each state's official court fee schedule). Cross-checked
// against Nolo and Realcostreport 2026 for high-fee states
// (CA $435, FL $408 per Fla. Stat. § 28.241, NY $335, IL $388 Cook County).
//
// Filing fees are set by statute or statewide judicial schedule and are the
// same for every filer in a state; many states add per-summons or local
// surcharges (noted per state). County-level variation exists in a few states
// (e.g. TX, IL, LA) and is noted.
//
// Retrieved: 2026-08-15.

export interface FilingFeeEntry {
  fee: number; // base first-paper filing fee in USD
  note?: string; // county/surcharge nuance
  source: string;
}

export const FILING_FEE_RETRIEVED = '2026-08-15';

export const FILING_FEE_SOURCE =
  'legalcostcalculator.org, "Divorce Filing Fees by State 2026" (official state court fee schedules); cross-checked vs Nolo / Realcostreport 2026.';

export const FILING_FEES: Record<string, FilingFeeEntry> = {
  AL: { fee: 290, source: FILING_FEE_SOURCE },
  AK: { fee: 200, source: FILING_FEE_SOURCE },
  AZ: { fee: 349, source: FILING_FEE_SOURCE },
  AR: { fee: 165, source: FILING_FEE_SOURCE },
  CA: { fee: 435, note: 'Statewide; some counties add a local construction surcharge.', source: FILING_FEE_SOURCE },
  CO: { fee: 230, source: FILING_FEE_SOURCE },
  CT: { fee: 350, source: FILING_FEE_SOURCE },
  DE: { fee: 165, source: FILING_FEE_SOURCE },
  DC: { fee: 80, note: 'DC Superior Court; mutual-consent filing.', source: FILING_FEE_SOURCE },
  FL: { fee: 408, note: 'Per Fla. Stat. § 28.241; +$10 per summons issued.', source: FILING_FEE_SOURCE },
  GA: { fee: 200, source: FILING_FEE_SOURCE },
  HI: { fee: 215, source: FILING_FEE_SOURCE },
  ID: { fee: 207, source: FILING_FEE_SOURCE },
  IL: { fee: 289, note: 'Cook County petitioner ≈ $388; fee varies by county.', source: FILING_FEE_SOURCE },
  IN: { fee: 157, source: FILING_FEE_SOURCE },
  IA: { fee: 185, source: FILING_FEE_SOURCE },
  KS: { fee: 195, source: FILING_FEE_SOURCE },
  KY: { fee: 148, source: FILING_FEE_SOURCE },
  LA: { fee: 250, note: 'Varies by parish.', source: FILING_FEE_SOURCE },
  ME: { fee: 120, source: FILING_FEE_SOURCE },
  MD: { fee: 165, source: FILING_FEE_SOURCE },
  MA: { fee: 200, source: FILING_FEE_SOURCE },
  MI: { fee: 175, source: FILING_FEE_SOURCE },
  MN: { fee: 365, source: FILING_FEE_SOURCE },
  MS: { fee: 100, source: FILING_FEE_SOURCE },
  MO: { fee: 163, source: FILING_FEE_SOURCE },
  MT: { fee: 120, source: FILING_FEE_SOURCE },
  NE: { fee: 157, source: FILING_FEE_SOURCE },
  NV: { fee: 299, source: FILING_FEE_SOURCE },
  NH: { fee: 260, source: FILING_FEE_SOURCE },
  NJ: { fee: 300, source: FILING_FEE_SOURCE },
  NM: { fee: 137, source: FILING_FEE_SOURCE },
  NY: { fee: 335, note: '$210 index number + $125 combined RJI/Note of Issue.', source: FILING_FEE_SOURCE },
  NC: { fee: 225, source: FILING_FEE_SOURCE },
  ND: { fee: 80, source: FILING_FEE_SOURCE },
  OH: { fee: 250, source: FILING_FEE_SOURCE },
  OK: { fee: 183, source: FILING_FEE_SOURCE },
  OR: { fee: 301, source: FILING_FEE_SOURCE },
  PA: { fee: 201, source: FILING_FEE_SOURCE },
  RI: { fee: 160, source: FILING_FEE_SOURCE },
  SC: { fee: 150, source: FILING_FEE_SOURCE },
  SD: { fee: 95, source: FILING_FEE_SOURCE },
  TN: { fee: 184, source: FILING_FEE_SOURCE },
  TX: { fee: 300, note: 'No statewide fee; each district clerk sets $300–$400.', source: FILING_FEE_SOURCE },
  UT: { fee: 325, source: FILING_FEE_SOURCE },
  VT: { fee: 90, source: FILING_FEE_SOURCE },
  VA: { fee: 86, source: FILING_FEE_SOURCE },
  WA: { fee: 314, source: FILING_FEE_SOURCE },
  WV: { fee: 135, source: FILING_FEE_SOURCE },
  WI: { fee: 184, source: FILING_FEE_SOURCE },
  WY: { fee: 100, source: FILING_FEE_SOURCE },
};

export function getFilingFee(code: string): FilingFeeEntry | undefined {
  return FILING_FEES[code.toUpperCase()];
}
