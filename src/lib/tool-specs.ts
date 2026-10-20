/**
 * The calculators of the site, one entry per subject, rendered by components/calc/SpecTool.tsx (full tool)
 * and MiniSim.tsx (mini-simulator). Rates come from src/data/rates.json and metros.json through the engine
 * (lib/engine/cost.ts); every default comes from params-2026.json. This file ships to the browser.
 */
import P from '../data/params-2026.json';
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import { formatMoney, formatPercent, formatNumber, formatDecimal } from './format';
import { cost, combineSaving, facilityFee, anesthesiaFee, toxinCost, type Setting } from './engine/cost';
import { amortize, deferred } from './engine/finance';
import { RATES, RULES, PROCS, PROC_IDS, METROS, proc, placeOf, minutesOf } from './data';

export const usd = (x: number) => `${x < -0.5 ? '-' : ''}${formatMoney(Math.abs(Math.round(x)), 0)}`;
export const cents = (x: number) => formatMoney(x, 2);
export const pct = (x: number, d = 1) => formatPercent(x, d);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k]);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;
export const DAILY_PAY = Math.round((P.earnings.medianWeekly / 5) * 10) / 10;
const SURGEON_YEAR = P.surgeonFee.year;

const SURGERY_IDS = PROC_IDS.filter((k) => PROCS[k].kind === 'surgery');
const procIn = (def: string, id = 'pr', label = 'Procedure', none = false): Input => ({
  kind: 'select', id, label, def,
  options: [...(none ? [{ value: 'none', label: 'None' }] : []), ...SURGERY_IDS.map((k) => ({ value: k, label: PROCS[k].short }))],
});
const metroIn = (def = 'us'): Input => ({ kind: 'select', id: 'mx', label: 'Metro area', def, options: [{ value: 'us', label: 'National rates (no metro)' }, ...METROS.map((m) => ({ value: m.slug, label: m.name }))] });
const SETTING: Input = { kind: 'choice', id: 'st', label: 'Operating room', def: 'asc', options: [{ value: 'asc', label: 'Surgery center' }, { value: 'hopd', label: 'Hospital' }] };
const settingName = (x: string) => (x === 'hopd' ? 'hospital outpatient department' : 'surgery center');
const placeLabel = (slug: string) => (slug === 'us' ? 'at national rates' : `in ${METROS.find((m) => m.slug === slug)!.name}`);

function costCard(v: V, ids: string[], title: string): ToolOut {
  const slug = s(v, 'mx'), setting = s(v, 'st') as Setting, place = placeOf(slug);
  const procs = ids.map(proc);
  const c = cost({
    procs, setting, place, minutes: n(v, 'am'), surgeonQuote: n(v, 'sq'), facilityQuote: n(v, 'fq'), anesthesiaQuote: n(v, 'aq'),
    daysOff: n(v, 'do'), dailyPay: v.dp === undefined ? DAILY_PAY : n(v, 'dp'), extras: n(v, 'ex'),
  }, RATES, RULES);
  const rows: ToolOut['rows'] = [
    [c.surgeonIsQuote ? "Surgeon's fee, your quote" : `Surgeon's fee, survey average (${SURGEON_YEAR})`, usd(c.surgeon), c.surgeon],
    [c.anesthesiaIsQuote ? 'Anesthesia, your quote' : `Anesthesia, ${formatDecimal(c.anesthesia.baseUnits + c.anesthesia.timeUnits, 1)} units`, usd(c.anesthesiaAmount), c.anesthesiaAmount],
    [c.facilityIsQuote ? 'Operating room, your quote' : `Operating room, ${settingName(setting)}`, usd(c.facilityAmount), c.facilityAmount],
  ];
  if (c.after > 0.5) rows.push(['Time off work and items after surgery', usd(c.after), c.after]);
  const lines = c.facility.lines.map((l) => [`CPT ${l.cpt}`, RATES.cpt[l.cpt].asc.label, l.packaged ? 'packaged' : pct(l.share, 0), usd(l.national), usd(l.amount)]);
  return {
    label: `${title} ${placeLabel(slug)}`, value: usd(c.total),
    sub: `Surgeon ${usd(c.surgeon)}, anesthesia ${usd(c.anesthesiaAmount)}, operating room ${usd(c.facilityAmount)}${c.after > 0.5 ? `, after surgery ${usd(c.after)}` : ''}.`,
    rows,
    table: {
      caption: `Operating room: CMS ${setting === 'hopd' ? 'OPPS Addendum B' : 'ASC Addendum AA'}, October 2026, local factor ${formatDecimal(c.facility.factor, 4)}. Anesthesia: ${c.anesthesia.baseUnits} base units + ${formatDecimal(c.anesthesia.timeUnits, 1)} time units (${Math.round(c.minutes)} minutes) x ${cents(c.anesthesia.cf)}.`,
      headers: ['Code', 'CMS short descriptor', 'Share paid', 'National rate', 'Local amount'],
      rows: lines, align: ['l', 'l', 'r', 'r', 'r'],
    },
    note: `Benchmark, not a quote: the operating room and anesthesia lines are 2026 Medicare rates for the same codes; private prices for cosmetic work are set by each practice and are often higher. The surgeon line is the national average fee its survey reports for ${SURGEON_YEAR}.`,
  };
}

const QUOTES: Input[] = [
  { id: 'am', label: 'Minutes under anesthesia', def: 0, unit: 'min', max: 900, adv: true, help: 'Empty: the default of the procedure' },
  { id: 'aq', label: 'Anesthesia quote', def: 0, unit: '$', max: 100000, adv: true },
  { id: 'fq', label: 'Operating room quote', def: 0, unit: '$', max: 200000, adv: true },
  { id: 'do', label: 'Unpaid days off work', def: 0, unit: 'days', max: 365, adv: true },
  { id: 'dp', label: 'Your pay per working day', def: DAILY_PAY, unit: '$', max: 100000, adv: true, help: 'Default: the US median, BLS' },
  { id: 'ex', label: 'Garments, medicines, other items', def: 0, unit: '$', max: 100000, adv: true },
];

export const SPECS: Record<string, (arg?: Record<string, number | string>) => ToolSpec> = {
  /* Procedure x metro x setting -> total, line by line */
  cost: (arg) => ({
    inputs: [procIn(String(arg?.pr ?? 'tummy_tuck')), metroIn(), SETTING, { id: 'sq', label: "Surgeon's quote, if you have one", def: 0, unit: '$', max: 200000, help: 'Empty: the survey average' }, ...QUOTES],
    run: (v) => costCard(v, [s(v, 'pr')], `${PROCS[s(v, 'pr')].short}, estimated total`),
  }),
  /* Several procedures in one session */
  combo: () => ({
    inputs: [procIn('tummy_tuck', 'a', 'First procedure'), procIn('breast_lift', 'b', 'Second procedure', true), procIn('lipo', 'c', 'Third procedure', true), metroIn(), SETTING],
    run: (v) => {
      const ids = [s(v, 'a'), s(v, 'b'), s(v, 'c')].filter((x, i, a) => x !== 'none' && a.indexOf(x) === i);
      const slug = s(v, 'mx'), setting = s(v, 'st') as Setting, place = placeOf(slug);
      const r = combineSaving(ids.map(proc), setting, place, RATES, RULES);
      const apartTotal = r.separate.reduce((t, c) => t + c.total, 0);
      return {
        label: `${ids.length > 1 ? 'One session' : PROCS[ids[0]].short} ${placeLabel(slug)}`, value: usd(r.combined.total),
        sub: ids.length > 1 ? `${usd(apartTotal - r.combined.total)} less than ${ids.length} separate operations, on the operating room and anesthesia lines alone.` : 'Add a second procedure to see the combined session.',
        rows: [
          [`Surgeons' fees, survey averages added (${SURGEON_YEAR})`, usd(r.combined.surgeon), r.combined.surgeon],
          [`Anesthesia, one session of ${Math.round(r.combined.minutes)} minutes`, usd(r.combined.anesthesiaAmount), r.combined.anesthesiaAmount],
          [`Operating room, ${settingName(setting)}`, usd(r.combined.facilityAmount), r.combined.facilityAmount],
          ['Saved on the operating room', usd(r.facilitySaved)],
          ['Saved on anesthesia base units', usd(r.anesthesiaSaved)],
        ],
        note: 'Medicare pays the highest-rated code in full and the others at half, or packages them into one comprehensive hospital payment. Surgeons price combined work themselves; the survey averages are simply added here.',
      };
    },
  }),
  /* One procedure in every metro area */
  metros: (arg) => ({
    inputs: [procIn(String(arg?.pr ?? 'bbl')), SETTING],
    run: (v) => {
      const id = s(v, 'pr'), setting = s(v, 'st') as Setting;
      const rows = METROS.map((m) => ({ m, c: cost({ procs: [proc(id)], setting, place: m }, RATES, RULES) })).sort((a, b) => b.c.total - a.c.total);
      const nat = cost({ procs: [proc(id)], setting, place: null }, RATES, RULES);
      const hi = rows[0], lo = rows[rows.length - 1];
      return {
        label: `${PROCS[id].short}: highest of ${rows.length} metro areas`, value: usd(hi.c.total), sub: `${hi.m.name}; the lowest is ${lo.m.name} at ${usd(lo.c.total)}, national rates give ${usd(nat.total)}.`,
        rows: [[`Highest: ${hi.m.name}`, usd(hi.c.total), hi.c.total], ['National rates', usd(nat.total), nat.total], [`Lowest: ${lo.m.name}`, usd(lo.c.total), lo.c.total]],
        table: { headers: ['Metro area', 'Operating room', 'Anesthesia', 'Total with surgeon average'], rows: rows.map((r) => [r.m.name, usd(r.c.facilityAmount), usd(r.c.anesthesiaAmount), usd(r.c.total)]), align: ['l', 'r', 'r', 'r'] },
        note: 'Only the operating room and anesthesia lines move with the metro area; the surgeon average is national.',
      };
    },
  }),
  /* Surgery center against hospital */
  facility: (arg) => ({
    inputs: [procIn(String(arg?.pr ?? 'breast_aug')), metroIn(String(arg?.mx ?? 'us'))],
    run: (v) => {
      const id = s(v, 'pr'), slug = s(v, 'mx'), place = placeOf(slug), cpts = proc(id).codes.map((l) => l.cpt);
      const a = facilityFee(cpts, 'asc', place, RATES, RULES), h = facilityFee(cpts, 'hopd', place, RATES, RULES);
      return {
        label: `Operating room for ${PROCS[id].short.toLowerCase()}, hospital minus surgery center`, value: usd(h.total - a.total),
        sub: `${usd(a.total)} in a surgery center, ${usd(h.total)} in a hospital outpatient department, ${placeLabel(slug)}.`,
        rows: [['Surgery center (ASC)', usd(a.total), a.total], ['Hospital outpatient department', usd(h.total), h.total], ['Hospital as a multiple of the center', `${formatDecimal(h.total / a.total, 2)} x`]],
        note: 'Medicare 2026 rates for the same codes, adjusted with the wage index of the metro area (50 % of the center rate, 60 % of the hospital rate).',
      };
    },
  }),
  /* Anesthesia units */
  anesthesia: (arg) => {
    const pr = String(arg?.pr ?? 'facelift');
    return {
      inputs: [procIn(pr), { id: 'am', label: 'Minutes under anesthesia', def: Number(arg?.am ?? 0), unit: 'min', max: 900, help: 'Empty: the default of the procedure' }, metroIn()],
      run: (v) => {
        const p = proc(s(v, 'pr')), slug = s(v, 'mx');
        const a = anesthesiaFee(p.asa ? [p.asa] : [], n(v, 'am') || minutesOf(p.id), placeOf(slug), RATES, RULES);
        return {
          label: `Anesthesia for ${p.short.toLowerCase()} ${placeLabel(slug)}`, value: usd(a.total),
          sub: `(${a.baseUnits} base units + ${formatDecimal(a.timeUnits, 1)} time units) x ${cents(a.cf)}.`,
          rows: [[`Base units, anesthesia code ${p.asa}`, String(a.baseUnits)], [`Time units for ${Math.round((n(v, 'am') || minutesOf(p.id)))} minutes`, formatDecimal(a.timeUnits, 1)], ['Conversion factor of the locality', cents(a.cf)], ['Each extra 15 minutes', usd(a.cf)]],
          note: 'Medicare 2026 conversion factor; the default time is the median skin-to-skin time CMS records for the codes, or a published series where CMS records none.',
        };
      },
    };
  },
  /* A quote in hand: the surgeon's share */
  quote: (arg) => ({
    inputs: [procIn(String(arg?.pr ?? 'tummy_tuck')), { id: 'q', label: 'All-inclusive quote', def: Number(arg?.q ?? 12000), unit: '$', max: 500000 }, metroIn(), SETTING],
    run: (v) => {
      const id = s(v, 'pr'), slug = s(v, 'mx'), setting = s(v, 'st') as Setting, q = n(v, 'q');
      const c = cost({ procs: [proc(id)], setting, place: placeOf(slug) }, RATES, RULES);
      const rest = q - c.facilityAmount - c.anesthesiaAmount;
      return {
        label: 'Left for the surgeon once the room and anesthesia are counted at Medicare rates', value: usd(rest),
        sub: rest >= c.surgeon ? `${usd(rest - c.surgeon)} above the ${SURGEON_YEAR} survey average for the surgeon.` : `${usd(c.surgeon - rest)} below the ${SURGEON_YEAR} survey average for the surgeon.`,
        rows: [['Your quote', usd(q), q], ['Operating room at the Medicare rate', usd(c.facilityAmount), c.facilityAmount], ['Anesthesia at the Medicare rate', usd(c.anesthesiaAmount), c.anesthesiaAmount], [`Survey average for the surgeon (${SURGEON_YEAR})`, usd(c.surgeon), c.surgeon]],
        note: 'Private facilities and anesthesia groups usually charge more than Medicare, so the true surgeon share of a quote is lower than this figure. Ask for the quote split into its parts.',
      };
    },
  }),
  /* Neuromodulator by area */
  botox: () => ({
    inputs: [
      { kind: 'select', id: 'ar', label: 'Area treated', def: 'glabellar', options: Object.entries(P.botox.areas).map(([k, a]) => ({ value: k, label: `${a.label} (${a.units} units)` })) },
      { id: 'pu', label: 'Price per unit you were quoted', def: 0, unit: '$', max: 100, decimals: 2, help: 'Empty: no quote yet' },
    ],
    run: (v) => {
      const a = (P.botox.areas as Record<string, { label: string; units: number }>)[s(v, 'ar')];
      const lim = RATES.asp.J0585.limit;
      const t = toxinCost(a.units, lim, n(v, 'pu'));
      const avg = P.botox.asps2023;
      return {
        label: t.quote ? `Your quote for ${a.units} units` : 'Average fee per treatment, national survey', value: usd(t.quote || avg),
        sub: t.quote ? `${usd(t.quote - t.product)} above the toxin's own cost at the Medicare payment limit.` : `Survey of ${SURGEON_YEAR}; the toxin alone for ${a.units} units costs about ${usd(t.product)} at the Medicare payment limit.`,
        rows: [[`Units on the label for this area`, String(a.units)], ['Toxin at the Medicare limit, per unit', cents(lim)], ['Toxin for the area', usd(t.product), t.product], [`Average fee per treatment (${SURGEON_YEAR})`, usd(avg), avg]],
        note: 'Units: FDA-approved label of onabotulinumtoxinA for cosmetic use. Payment limit: CMS, October 2026, code J0585. Other brands use other units that do not convert one to one.',
      };
    },
  }),
  /* Paying over time */
  finance: (arg) => ({
    inputs: [
      { id: 'a', label: 'Amount to spread', def: Number(arg?.a ?? 10000), unit: '$', max: 500000 },
      { id: 'apr', label: 'APR', def: P.credit.cardAssessedInterest, unit: '%', max: 60, decimals: 2, help: `Card rate on accounts charged interest, ${MONTHS[Number(P.credit.period.slice(5, 7)) - 1]} ${P.credit.period.slice(0, 4)}` },
      { id: 'm', label: 'Months to repay', def: 24, unit: 'mo', max: 120 },
      { id: 'pm', label: 'Deferred-interest promotion', def: 12, unit: 'mo', max: 60, adv: true },
      { id: 'pp', label: 'You pay each month during it', def: 600, unit: '$', max: 100000, adv: true },
    ],
    run: (v) => {
      const l = amortize(n(v, 'a'), n(v, 'apr'), n(v, 'm'));
      const d = deferred(n(v, 'a'), n(v, 'apr'), n(v, 'pm'), n(v, 'pp'));
      const loan = amortize(n(v, 'a'), P.credit.personalLoan24, 24);
      return {
        label: 'Monthly payment', value: usd(l.monthly), sub: `${usd(l.totalInterest)} of interest over ${Math.round(n(v, 'm'))} months.`,
        rows: [['Total repaid', usd(l.total), l.total], ['Interest', usd(l.totalInterest), l.totalInterest], [`Same amount over 24 months at ${pct(P.credit.personalLoan24 / 100, 1)} (personal loan average)`, `${usd(loan.monthly)} a month`], ['Payment that clears the promotion in time', usd(d.payoffMonthly)], ['Interest charged back if a balance remains', usd(d.backInterest)]],
        note: 'No lender is named or recommended. Rates: Federal Reserve G.19. A deferred-interest plan charges all the interest of the promotion when any balance is left at its end.',
      };
    },
  }),
  /* The weeks after */
  recovery: (arg) => ({
    inputs: [
      { id: 'do', label: 'Unpaid days off work', def: Number(arg?.do ?? 10), unit: 'days', max: 365 },
      { id: 'dp', label: 'Your pay per working day', def: DAILY_PAY, unit: '$', max: 100000, help: 'Default: the US median, BLS' },
      { id: 'ex', label: 'Garments, medicines, other items', def: Number(arg?.ex ?? 0), unit: '$', max: 100000 },
      { id: 'ct', label: 'Rides and help at home', def: 0, unit: '$', max: 100000 },
    ],
    run: (v) => {
      const pay = n(v, 'do') * n(v, 'dp'), total = pay + n(v, 'ex') + n(v, 'ct');
      return {
        label: 'Cost of the recovery, outside the bill', value: usd(total), sub: `${Math.round(n(v, 'do'))} unpaid working days at ${usd(n(v, 'dp'))}.`,
        rows: [['Pay forgone', usd(pay), pay], ['Garments, medicines, other items', usd(n(v, 'ex')), n(v, 'ex')], ['Rides and help at home', usd(n(v, 'ct')), n(v, 'ct')]],
        note: `Default daily pay: median usual weekly earnings of full-time workers, ${P.earnings.period.replace('-Q', ', quarter ')}, ${usd(P.earnings.medianWeekly)} a week, divided by five.`,
      };
    },
  }),
};

/** A spec with its defaults overridden by `arg` (same keys as the input ids). */
export function getTool(kind: string, arg?: Record<string, number | string>): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  const spec = f(arg);
  if (!arg) return spec;
  return { ...spec, inputs: spec.inputs.map((i) => (arg[i.id] === undefined ? i : ({ ...i, def: arg[i.id] } as typeof i))) };
}
export const TOOL_KINDS = Object.keys(SPECS);
export { formatNumber };
