/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand.
 *   K.P                 params-2026.json (procedures, metros, rules, surgeon survey year, earnings, credit, botox, sources)
 *   K.R                 rates.json (CMS rates of every CPT code, base units, national anesthesia factor, ASP limits)
 *   K.PROCS, K.PR(id)   the procedures (label, codes, anesthesia code, survey fee, default minutes)
 *   K.METROS, K.M(slug) the metro areas (wage indexes, anesthesia conversion factor, locality)
 *   K.est(id, slug, setting)   benchmark cost of a procedure (engine `cost`), slug "us" = national rates
 *   K.across(id, setting)      the procedure in every metro, highest first
 *   K.min(id)           default minutes of a procedure
 *   K.tool(kind, args)  runs a calculator of tool-specs.ts and returns its result card
 *   engine              K.cost, K.combine, K.facility, K.anes, K.loan, K.deferred
 *   formats             K.usd, K.cents, K.pct, K.num, K.dec, K.day (2026-04-30 -> April 30, 2026), K.month (2026-08 -> August 2026)
 */
import P from '../data/params-2026.json';
import { RATES, RULES, PROCS, PROC_IDS, METROS, proc, metro, placeOf, estimate, acrossMetros, minutesOf } from './data';
import { usd, cents, pct, getTool, longDate, DAILY_PAY } from './tool-specs';
import { formatNumber, formatDecimal } from './format';
import { cost, combineSaving, facilityFee, anesthesiaFee } from './engine/cost';
import { amortize, deferred } from './engine/finance';
import type { V } from './tool-types';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function tool(kind: string, args: V = {}) {
  const spec = getTool(kind);
  const v: V = { ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...args };
  return spec.run(v);
}
const combine = (ids: string[], slug = 'us', setting: 'asc' | 'hopd' = 'asc') => combineSaving(ids.map(proc), setting, placeOf(slug), RATES, RULES);
const facility = (id: string, slug = 'us', setting: 'asc' | 'hopd' = 'asc') => facilityFee(proc(id).codes.map((l) => l.cpt), setting, placeOf(slug), RATES, RULES);
const anes = (id: string, minutes?: number, slug = 'us') => { const p = proc(id); return anesthesiaFee(p.asa ? [p.asa] : [], minutes ?? minutesOf(id), placeOf(slug), RATES, RULES); };

export const KIT = {
  P, R: RATES, RULES, PROCS, PROC_IDS, METROS, PR: proc, M: metro,
  est: estimate, across: acrossMetros, min: minutesOf, tool, cost, combine, facility, anes,
  loan: amortize, deferred, DAILY_PAY,
  usd, cents, pct, num: (x: number) => formatNumber(x, 0), dec: (x: number, d = 1) => formatDecimal(x, d), day: longDate,
  month: (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`,
};
export type Kit = typeof KIT;
