// C6 — SERP description variants. Active variant is exported as a constant so
// the layout/metadata can read a single source of truth per page type.

export const HOME_DESC_VARIANTS = [
  'Free state-by-state divorce information: filing-fee estimator, residency and separation requirements, and official court forms checklists for all 50 states and D.C.',
  'Compare divorce costs, residency rules, and official court forms by state — real cited filing fees plus clearly labelled attorney and mediation cost bands.',
  'Plan your divorce by state: see real filing fees, separation periods, and the exact court forms you need, for all 50 states and the District of Columbia.',
];

export const COST_DESC_VARIANTS = [
  'Estimate divorce cost by state: real cited filing fees plus clearly labelled attorney and mediation cost bands for DIY, uncontested, mediation, and contested divorces.',
  'See your divorce cost range by state — we combine your real court filing fee with industry-average attorney and mediation costs, all clearly labelled.',
  'How much does divorce cost in your state? Get a cited filing fee plus transparent attorney and mediation ranges for every divorce type.',
];

export const FORMS_DESC_VARIANTS = [
  'The typical divorce forms filed in each state, with a direct link to the official court forms portal. Retrieved 2026-08-15.',
  'What forms do you file for divorce in your state? See the typical checklist and open the official court forms portal in one click.',
  'Divorce forms by state: the standard self-represented filer paperwork plus a link to your state’s official, current court forms portal.',
];

export const ACTIVE_VARIANT = 0 as const;

export function homeDescription(): string {
  return HOME_DESC_VARIANTS[ACTIVE_VARIANT];
}

export function costDescription(): string {
  return COST_DESC_VARIANTS[ACTIVE_VARIANT];
}

export function formsDescription(): string {
  return FORMS_DESC_VARIANTS[ACTIVE_VARIANT];
}
