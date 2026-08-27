// DivorceFig — property-division regime classification by state.
//
// Two legal systems govern how marital assets and debts are divided at divorce:
//   1. Community property — a presumption of a 50/50 split of property/debt
//      acquired during the marriage (regardless of whose name is on title).
//   2. Equitable distribution — the court divides marital property in a way it
//      finds fair (not automatically equal; often 50/50 to 60/40 or beyond).
//
// The nine MANDATORY community property states are well established (Cornell
// Legal Information Institute, "marital property"; Justia, "Property Division
// Law in Divorce"). Alaska allows couples to OPT IN by a written community
// property agreement or trust; by default it is equitable distribution. Every
// other state + D.C. uses equitable distribution.
//
// These facts are legal classifications, not dollar figures, so they carry no
// fabrication risk. Statute anchors are included for citation.

export type Regime = 'community' | 'opt-in' | 'equitable';

// Mandatory community property states (Cornell LII / Justia).
export const COMMUNITY_PROPERTY_STATES = [
  'AZ', // A.R.S. § 25-211
  'CA', // Cal. Fam. Code § 760
  'ID', // Idaho Code § 32-906
  'LA', // La. Civ. Code art. 2336
  'NV', // NRS § 123.220
  'NM', // N.M. Stat. § 40-3-8
  'TX', // Tex. Fam. Code § 3.002
  'WA', // RCW § 26.16.030
  'WI', // Wis. Stat. § 766.31 (Marital Property Act)
] as const;

// Opt-in only (default is equitable distribution).
export const OPT_IN_COMMUNITY_STATES = ['AK'] as const; // Alaska Stat. § 34.77.090

export function getRegime(code: string): Regime {
  const c = code.toUpperCase();
  if ((COMMUNITY_PROPERTY_STATES as readonly string[]).includes(c)) return 'community';
  if ((OPT_IN_COMMUNITY_STATES as readonly string[]).includes(c)) return 'opt-in';
  return 'equitable';
}

export const REGIME_INFO: Record<Regime, { label: string; split: string; note: string }> = {
  community: {
    label: 'Community property',
    split: 'A presumption of a 50/50 split of assets and debts acquired during the marriage.',
    note: 'Most property and debt either spouse acquires during the marriage is owned equally (50/50), regardless of whose name is on the title or the account.',
  },
  'opt-in': {
    label: 'Equitable distribution (community-property opt-in available)',
    split: 'Default is a fair (not necessarily equal) division; couples may elect 50/50 community property by a signed written agreement or community property trust.',
    note: 'Alaska is an equitable-distribution state by default. A signed community property agreement or trust can make specific assets community property.',
  },
  equitable: {
    label: 'Equitable distribution',
    split: 'The court divides marital property in a way it finds fair under the circumstances — not automatically 50/50.',
    note: 'Judges weigh factors such as marriage length, each spouse’s finances and earning capacity, and contributions (including homemaking). Results often land 50/50 to 60/40 or beyond.',
  },
};

// Classification inputs for the Separate vs Marital Property tool.
export type Acquisition = 'before' | 'during' | 'after';
export type Source = 'earned' | 'gift' | 'inheritance';

export interface ClassificationResult {
  category: 'separate' | 'marital';
  title: string;
  explanation: string;
}

// Classify one asset based on when it was acquired and how it came in.
// Rules follow Cornell LII / Justia:
//  - acquired before marriage  -> separate
//  - acquired after permanent separation -> separate (in CP states; also the
//    general rule in most equitable-distribution states)
//  - acquired during marriage:
//      earned (bought with marital income) -> marital / community
//      gift to one spouse alone            -> separate
//      inheritance to one spouse alone     -> separate
export function classifyAsset(
  regime: Regime,
  acquired: Acquisition,
  source: Source,
): ClassificationResult {
  if (acquired === 'before') {
    return {
      category: 'separate',
      title: 'Separate property',
      explanation:
        'Property you owned before the marriage is separate property. It is generally not divided in the divorce.',
    };
  }
  if (acquired === 'after') {
    return {
      category: 'separate',
      title: 'Separate property',
      explanation:
        'Assets and income acquired after the couple permanently separated are treated as separate property in community property states (and under the general rule in most equitable-distribution states).',
    };
  }
  // acquired === 'during'
  if (source === 'gift') {
    return {
      category: 'separate',
      title: 'Separate property',
      explanation:
        'A gift made to one spouse alone during the marriage is separate property, even though it arrived while you were married.',
    };
  }
  if (source === 'inheritance') {
    return {
      category: 'separate',
      title: 'Separate property',
      explanation:
        'An inheritance received by one spouse alone is separate property and is generally not divided, provided it was kept in that spouse’s name.',
    };
  }
  // earned during marriage
  if (regime === 'community') {
    return {
      category: 'marital',
      title: 'Community property',
      explanation:
        'Bought with income earned during the marriage, this is community property — owned 50/50 by both spouses regardless of whose name is on the title.',
    };
  }
  return {
    category: 'marital',
    title: 'Marital property',
    explanation:
      'Acquired during the marriage with marital income, this is marital property and subject to division. In an equitable-distribution state the court divides it fairly, which is not automatically 50/50.',
  };
}

export const PROPERTY_SOURCES: { key: Source; label: string; hint: string }[] = [
  { key: 'earned', label: 'Bought with income earned during the marriage', hint: 'Salary, bonuses, or purchases made while married.' },
  { key: 'gift', label: 'A gift given to one spouse alone', hint: 'e.g. a family member’s gift to you only.' },
  { key: 'inheritance', label: 'An inheritance received by one spouse alone', hint: 'Left to one spouse individually.' },
];
