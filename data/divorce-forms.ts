// Divorce forms checklist by state.
//
// For every state we list (a) the official state court / self-help center URL
// where the current, downloadable forms live, and (b) the typical set of forms
// a self-represented filer submits. The form *names* are standardized across
// the country; the official URL points to the state-specific packets.
//
// Source of the URL map: each state's official court system self-help / forms
// portal (or the state's official legal-aid forms hub where the court defers
// to it). Retrieved: 2026-08-15.

export const FORMS_RETRIEVED = '2026-08-15';

export const FORMS_SOURCE =
  'Official state court self-help / forms portals (or the state official legal-aid forms hub). Retrieved 2026-08-15.';

// Standard forms a self-represented filer typically submits in a divorce.
// Names vary slightly by state but the set is consistent nationwide.
export const TYPICAL_FORMS: string[] = [
  'Petition / Complaint for Dissolution of Marriage (or Divorce)',
  'Summons',
  'Vital Statistics Form (marriage certificate / certificate of dissolution)',
  'Financial Affidavit / Statement of Income and Expenses',
  'Marital Settlement Agreement (property & debt division)',
  'Parenting Plan / Custody Agreement (if minor children)',
  'Certificate of Service / UCCJEA affidavit (if minor children)',
  'Final Decree / Judgment of Divorce',
];

export interface FormsEntry {
  url: string; // official state court / self-help forms page
  note?: string;
  forms: string[]; // typical form list (shared standard set)
  source: string;
}

export const FORMS: Record<string, FormsEntry> = {
  AL: { url: 'https://www.alabamalegalhelp.org/children-and-families/divorce', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  AK: { url: 'https://selfrepresent.alaska.gov/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  AZ: { url: 'https://www.azcourts.gov/selfservicecenter/Forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  AR: { url: 'https://www.arkansaslegalhelp.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  CA: { url: 'https://selfhelp.courts.ca.gov/divorce-forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  CO: { url: 'https://www.courts.state.co.us/Forms/Forms_List.cfm', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  CT: { url: 'https://www.jud.ct.gov/lawlib/divorce.htm', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  DE: { url: 'https://courts.delaware.gov/family/forms.aspx', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  DC: { url: 'https://www.dccourts.gov/family/divorce', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  FL: { url: 'https://www.flcourts.gov/Forms-and-Rules/Forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  GA: { url: 'https://www.georgialegalaid.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  HI: { url: 'https://www.courts.state.hi.us/self_help/family/divorce', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  ID: { url: 'https://www.isc.idaho.gov/ifiles/forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  IL: { url: 'https://www.illinoislegalaid.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  IN: { url: 'https://www.in.gov/judiciary/selfservice/forms/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  IA: { url: 'https://www.iowacourts.gov/for-the-public/represent-yourself/divorce/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  KS: { url: 'https://www.kansaslegalhelp.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  KY: { url: 'https://kycourts.gov/Forms/Pages/default.aspx', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  LA: { url: 'https://www.lasc.org/self-help-resources', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  ME: { url: 'https://www.courts.maine.gov/forms/family.html', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MD: { url: 'https://www.courts.state.md.us/legalhelp/forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MA: { url: 'https://www.mass.gov/info-details/divorce-forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MI: { url: 'https://www.michiganlegalhelp.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MN: { url: 'https://www.mncourts.gov/GetForms.aspx?c=21', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MS: { url: 'https://www.mslegaladvocates.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MO: { url: 'https://www.courts.mo.gov/page.jsp?id=834', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  MT: { url: 'https://courts.mt.gov/forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NE: { url: 'https://supremecourt.nebraska.gov/self-help', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NV: { url: 'https://selfhelp.nvcourts.gov/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NH: { url: 'https://www.courts.nh.gov/self-help/family', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NJ: { url: 'https://www.njcourts.gov/self-help/divorce', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NM: { url: 'https://nmcourts.gov/self-help/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NY: { url: 'https://www.nycourts.gov/forms/divorce/index.shtml', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  NC: { url: 'https://www.nccourts.gov/help-topics/divorce-and-marriage', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  ND: { url: 'https://www.ndcourts.gov/forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  OH: { url: 'https://www.supremecourt.ohio.gov/legalhelp/selfhelp/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  OK: { url: 'https://www.okbar.org/public/self-help/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  OR: { url: 'https://www.courts.oregon.gov/forms/Pages/default.aspx', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  PA: { url: 'https://www.pacourts.us/forms/forms-for-self-represented-parties', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  RI: { url: 'https://www.courts.ri.gov/Forms/Pages/Family.aspx', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  SC: { url: 'https://www.sccourts.org/forms/index.gsp', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  SD: { url: 'https://ujs.sd.gov/forms/family_form.aspx', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  TN: { url: 'https://tncourts.gov/forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  TX: { url: 'https://texaslawhelp.org/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  UT: { url: 'https://www.utcourts.gov/howto/divorce/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  VT: { url: 'https://www.vermontjudiciary.org/divorce-forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  VA: { url: 'https://selfhelp.vacourts.gov/', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  WA: { url: 'https://www.courts.wa.gov/forms/?fa=courtsforms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  WV: { url: 'https://www.courtswv.gov/legalinfo/familylaw/Pages/default.aspx', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  WI: { url: 'https://www.wicourts.gov/forms/divorce.htm', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
  WY: { url: 'https://www.courts.state.wy.us/SelfHelp/Forms', forms: TYPICAL_FORMS, source: FORMS_SOURCE },
};

export function getForms(code: string): FormsEntry | undefined {
  return FORMS[code.toUpperCase()];
}
