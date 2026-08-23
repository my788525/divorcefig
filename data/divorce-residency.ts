// Divorce residency & separation requirements by state.
//
// Compiled from state family-law statutes and court self-help resources:
//  - DivorceNet, "Divorce Residency Requirements in Your State" (2026)
//  - DivorceClear state residency & waiting-period tables (2026)
//  - LegalClarity, "What States Require Separation Before Divorce?" (2026)
//  - Recording-law, "Divorce Laws by State (2026)"
//
// residencyMonths: normalized minimum months one spouse must reside/be domiciled
//   in the state before filing. `null` = no fixed durational minimum (domicile
//   at filing is sufficient).
// separationMonths: required period of living apart before a no-fault divorce can
//   be filed/finalized. `null` = no separation period required (a post-filing
//   waiting period may still apply — see waitingPeriodDays).
// waitingPeriodDays: mandatory cooling-off period after filing before a court can
//   enter the final decree. `null` = no mandatory waiting period.
//
// Retrieved: 2026-08-15.

export interface ResidencyEntry {
  residency: string;
  residencyMonths: number | null;
  separation: string;
  separationMonths: number | null;
  waitingPeriodDays: number | null;
  source: string;
}

export const RESIDENCY_RETRIEVED = '2026-08-15';

export const RESIDENCY_SOURCE =
  'DivorceNet "Divorce Residency Requirements in Your State" (2026); DivorceClear state tables (2026); LegalClarity "What States Require Separation Before Divorce?" (2026); Recording-law "Divorce Laws by State (2026)"; state family-law statutes.';

export const RESIDENCY: Record<string, ResidencyEntry> = {
  AL: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 30, source: RESIDENCY_SOURCE },
  AK: { residency: 'No fixed minimum — Alaska resident/domiciliary at filing (30 days if both spouses are residents).', residencyMonths: null, separation: 'None required.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  AZ: { residency: '90 days', residencyMonths: 3, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  AR: { residency: '60 days', residencyMonths: 2, separation: '18 months separation required for no-fault grounds (fault grounds avoid this).', separationMonths: 18, waitingPeriodDays: 30, source: RESIDENCY_SOURCE },
  CA: { residency: '6 months in state + 3 months in the filing county.', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 180, source: RESIDENCY_SOURCE },
  CO: { residency: '91 days', residencyMonths: 3, separation: 'None required before filing (91-day waiting period runs during the case).', separationMonths: null, waitingPeriodDays: 91, source: RESIDENCY_SOURCE },
  CT: { residency: '12 months for the final decree (exceptions apply).', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 90, source: RESIDENCY_SOURCE },
  DE: { residency: '6 months', residencyMonths: 6, separation: '6 months separation before filing in most no-fault cases.', separationMonths: 6, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  DC: { residency: '6 months', residencyMonths: 6, separation: 'No mandatory separation for a mutual-consent divorce (statute revised 2024); longer if contested.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  FL: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 20, source: RESIDENCY_SOURCE },
  GA: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 30, source: RESIDENCY_SOURCE },
  HI: { residency: '6 months (domicile at filing).', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  ID: { residency: '6 weeks', residencyMonths: 1.5, separation: 'None required before filing (20-day post-service wait).', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  IL: { residency: '90 days', residencyMonths: 3, separation: 'None for no-fault; 6-month separation creates a presumption of irreconcilable differences.', separationMonths: null, waitingPeriodDays: 90, source: RESIDENCY_SOURCE },
  IN: { residency: '6 months in state + 3 months in county.', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  IA: { residency: '1 year', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 90, source: RESIDENCY_SOURCE },
  KS: { residency: '60 days', residencyMonths: 2, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  KY: { residency: '180 days', residencyMonths: 6, separation: '60-day separation before decree (irretrievably broken).', separationMonths: 2, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  LA: { residency: 'Domiciled in state; 180 days (no minor children) / 365 days (with minor children).', residencyMonths: 6, separation: '180 days (no minor children) / 365 days (with minor children) separation.', separationMonths: 6, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  ME: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  MD: { residency: '6 months if grounds arose out of state; 1 year otherwise (mutual consent: no minimum).', residencyMonths: 12, separation: '6 months separation (separation ground only); none for mutual consent.', separationMonths: 6, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  MA: { residency: '1 year (or state was the last marital domicile).', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 90, source: RESIDENCY_SOURCE },
  MI: { residency: '180 days in state + 10 days in county.', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  MN: { residency: '180 days', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  MS: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  MO: { residency: '90 days', residencyMonths: 3, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  MT: { residency: '90 days', residencyMonths: 3, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  NE: { residency: '1 year', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  NV: { residency: '6 weeks', residencyMonths: 1.5, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  NH: { residency: '1 year', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  NJ: { residency: '1 year (or 6 months for irreconcilable differences).', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  NM: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  NY: { residency: '1 year (several statutory alternatives exist).', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  NC: { residency: '6 months', residencyMonths: 6, separation: '1 year separation before filing (sole no-fault ground).', separationMonths: 12, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  ND: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  OH: { residency: '6 months in state + 90 days in county.', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  OK: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 10, source: RESIDENCY_SOURCE },
  OR: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  PA: { residency: '6 months', residencyMonths: 6, separation: '90 days (mutual consent) / 1 year (unilateral) separation.', separationMonths: 3, waitingPeriodDays: 90, source: RESIDENCY_SOURCE },
  RI: { residency: '1 year', residencyMonths: 12, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  SC: { residency: '1 year (3 months if both spouses are residents).', residencyMonths: 12, separation: '1 year separation before filing (sole no-fault ground).', separationMonths: 12, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  SD: { residency: 'No fixed minimum — state resident/domiciliary at filing.', residencyMonths: null, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  TN: { residency: '6 months', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  TX: { residency: '6 months in state + 90 days in county.', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 60, source: RESIDENCY_SOURCE },
  UT: { residency: '3 months', residencyMonths: 3, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 30, source: RESIDENCY_SOURCE },
  VT: { residency: '6 months', residencyMonths: 6, separation: '6 months separation before the final hearing.', separationMonths: 6, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  VA: { residency: '6 months', residencyMonths: 6, separation: '6 months (no minor children + written agreement) or 1 year separation.', separationMonths: 6, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  WA: { residency: '90 days (resident at filing; no fixed minimum).', residencyMonths: 3, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 90, source: RESIDENCY_SOURCE },
  WV: { residency: '1 year', residencyMonths: 12, separation: '1 year separation (unilateral); none for mutual consent.', separationMonths: 12, waitingPeriodDays: null, source: RESIDENCY_SOURCE },
  WI: { residency: '6 months in state + 30 days in county.', residencyMonths: 6, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 120, source: RESIDENCY_SOURCE },
  WY: { residency: '60 days', residencyMonths: 2, separation: 'None required before filing.', separationMonths: null, waitingPeriodDays: 20, source: RESIDENCY_SOURCE },
};

export function getResidency(code: string): ResidencyEntry | undefined {
  return RESIDENCY[code.toUpperCase()];
}
