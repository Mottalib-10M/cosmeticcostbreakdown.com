/**
 * Cost of a cosmetic procedure, line by line (method page). Pure functions, no I/O: the data are passed in.
 *
 *  - Operating room. Surgery center (ASC): national rate of Addendum AA x (labor share x wage index + the rest),
 *    with the wage index of the CBSA before floor and reclassification (42 CFR 416.172(c); CY 2026 final rule).
 *    Codes flagged for multiple procedure discounting: the code with the highest national rate is paid in full,
 *    every other one at 50 % (42 CFR 416.172(e)). Hospital outpatient department: national rate of Addendum B
 *    x (60 % x wage index + 40 %); a code with status J1 is a comprehensive APC that packages the other codes of
 *    the session, so only the highest J1 rate is paid; without J1, status T codes follow the 100 % / 50 % rule.
 *  - Anesthesia: (base units of the anesthesia code + minutes / 15) x conversion factor of the Medicare locality.
 *    A session with several procedures is billed once: the highest base unit, the time of the whole session.
 *  - Surgeon: the survey average published for the procedure, or the reader's quote.
 *  - After: unpaid days off x daily pay, plus the items the reader was quoted.
 */

export interface CptRate {
  asc: { indicator: string; multiple: boolean; rate: number; label: string };
  opps: { status: string; apc: string; rate: number };
  intraMinutes: number | null;
}
export interface Rates { cpt: Record<string, CptRate>; asa: Record<string, number>; anesNationalCf: number }
export interface Rules { ascLaborShare: number; oppsLaborShare: number; multipleProcedureShare: number; minutesPerTimeUnit: number }
/** Local factors; `null` = national, unadjusted rates. */
export interface Place { wiAsc: number; wiHospital: number; anesCf: number }
export type Setting = 'asc' | 'hopd';

export interface FacilityLine { cpt: string; national: number; share: number; amount: number; packaged: boolean }
export interface Facility { total: number; factor: number; lines: FacilityLine[] }

export function facilityFee(cpts: string[], setting: Setting, place: Place | null, rates: Rates, rules: Rules): Facility {
  const rows = cpts.map((c) => {
    const r = rates.cpt[c];
    if (!r) throw new Error(`No CMS rate for CPT ${c}`);
    return { c, r };
  });
  if (setting === 'asc') {
    const wi = place ? place.wiAsc : 1;
    const factor = rules.ascLaborShare * wi + (1 - rules.ascLaborShare);
    const sorted = rows.slice().sort((a, b) => b.r.asc.rate - a.r.asc.rate);
    let firstDone = false;
    const lines = sorted.map(({ c, r }) => {
      let share = 1;
      if (r.asc.multiple) { share = firstDone ? rules.multipleProcedureShare : 1; firstDone = true; }
      return { cpt: c, national: r.asc.rate, share, amount: r.asc.rate * share * factor, packaged: false };
    });
    return { total: lines.reduce((t, l) => t + l.amount, 0), factor, lines };
  }
  const wi = place ? place.wiHospital : 1;
  const factor = rules.oppsLaborShare * wi + (1 - rules.oppsLaborShare);
  const sorted = rows.slice().sort((a, b) => b.r.opps.rate - a.r.opps.rate);
  const comprehensive = sorted.find((x) => x.r.opps.status === 'J1');
  let firstT = false;
  const lines = sorted.map(({ c, r }) => {
    let share = 0, packaged = false;
    if (comprehensive) { share = c === comprehensive.c ? 1 : 0; packaged = share === 0; }
    else { share = firstT ? rules.multipleProcedureShare : 1; firstT = true; }
    return { cpt: c, national: r.opps.rate, share, amount: r.opps.rate * share * factor, packaged };
  });
  return { total: lines.reduce((t, l) => t + l.amount, 0), factor, lines };
}

export interface Anesthesia { baseUnits: number; timeUnits: number; cf: number; total: number }
export function anesthesiaFee(asaCodes: string[], minutes: number, place: Place | null, rates: Rates, rules: Rules): Anesthesia {
  if (!asaCodes.length) return { baseUnits: 0, timeUnits: 0, cf: 0, total: 0 };
  const baseUnits = Math.max(...asaCodes.map((a) => { const u = rates.asa[a]; if (u === undefined) throw new Error(`No base units for ${a}`); return u; }));
  // Medicare counts time units to one decimal place (actual minutes / 15).
  const timeUnits = Math.round((Math.max(0, minutes) / rules.minutesPerTimeUnit) * 10) / 10;
  const cf = place ? place.anesCf : rates.anesNationalCf;
  return { baseUnits, timeUnits, cf, total: (baseUnits + timeUnits) * cf };
}

export interface Proc { codes: Array<{ cpt: string }>; asa: string | null; minutes: number | null; aspsFee: number }
/** Default minutes of a procedure: its own figure (a published series) or the CMS median intra-service time of its codes. */
export function defaultMinutes(p: Proc, rates: Rates): number {
  if (p.minutes) return p.minutes;
  return p.codes.reduce((t, l) => t + (rates.cpt[l.cpt]?.intraMinutes ?? 0), 0);
}

export interface CostIn {
  procs: Proc[]; setting: Setting; place: Place | null;
  /** Session minutes; 0 or undefined = the sum of the defaults. */
  minutes?: number;
  /** Quotes in hand; 0 or undefined = the benchmark. */
  surgeonQuote?: number; facilityQuote?: number; anesthesiaQuote?: number;
  daysOff?: number; dailyPay?: number; extras?: number;
}
export interface Cost {
  surgeon: number; surgeonIsQuote: boolean;
  facility: Facility; facilityAmount: number; facilityIsQuote: boolean;
  anesthesia: Anesthesia; anesthesiaAmount: number; anesthesiaIsQuote: boolean;
  minutes: number; after: number; total: number;
}

export function cost(x: CostIn, rates: Rates, rules: Rules): Cost {
  const cpts = x.procs.flatMap((p) => p.codes.map((l) => l.cpt));
  const facility = facilityFee(cpts, x.setting, x.place, rates, rules);
  const minutes = x.minutes && x.minutes > 0 ? x.minutes : x.procs.reduce((t, p) => t + defaultMinutes(p, rates), 0);
  const anesthesia = anesthesiaFee(x.procs.map((p) => p.asa).filter((a): a is string => !!a), minutes, x.place, rates, rules);
  const surgeonIsQuote = !!x.surgeonQuote && x.surgeonQuote > 0;
  const surgeon = surgeonIsQuote ? x.surgeonQuote! : x.procs.reduce((t, p) => t + p.aspsFee, 0);
  const facilityIsQuote = !!x.facilityQuote && x.facilityQuote > 0;
  const anesthesiaIsQuote = !!x.anesthesiaQuote && x.anesthesiaQuote > 0;
  const facilityAmount = facilityIsQuote ? x.facilityQuote! : facility.total;
  const anesthesiaAmount = anesthesiaIsQuote ? x.anesthesiaQuote! : anesthesia.total;
  const after = Math.max(0, x.daysOff ?? 0) * Math.max(0, x.dailyPay ?? 0) + Math.max(0, x.extras ?? 0);
  return {
    surgeon, surgeonIsQuote, facility, facilityAmount, facilityIsQuote, anesthesia, anesthesiaAmount, anesthesiaIsQuote,
    minutes, after, total: surgeon + facilityAmount + anesthesiaAmount + after,
  };
}

/** What separate sessions would cost against one combined session (same place and setting). */
export function combineSaving(procs: Proc[], setting: Setting, place: Place | null, rates: Rates, rules: Rules) {
  const one = cost({ procs, setting, place }, rates, rules);
  const apart = procs.map((p) => cost({ procs: [p], setting, place }, rates, rules));
  const sum = (k: 'facilityAmount' | 'anesthesiaAmount') => apart.reduce((t, c) => t + c[k], 0);
  return {
    combined: one, separate: apart,
    facilitySaved: sum('facilityAmount') - one.facilityAmount,
    anesthesiaSaved: sum('anesthesiaAmount') - one.anesthesiaAmount,
  };
}

/** Neuromodulator: the toxin at the Medicare payment limit, and the reader's per-unit quote. */
export function toxinCost(units: number, limitPerUnit: number, quotePerUnit: number) {
  const u = Math.max(0, units);
  return { product: u * limitPerUnit, quote: quotePerUnit > 0 ? u * quotePerUnit : 0 };
}
