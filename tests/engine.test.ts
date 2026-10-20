import { describe, expect, it } from 'vitest';
import { facilityFee, anesthesiaFee, cost, combineSaving, defaultMinutes, toxinCost, type Rates, type Rules } from '../src/lib/engine/cost';
import { amortize, deferred } from '../src/lib/engine/finance';
import P from '../src/data/params-2026.json';
import RATES from '../src/data/rates.json';
import METROS from '../src/data/metros.json';

const R = RATES as unknown as Rates;
const RU = P.rules as Rules;
const ny = (METROS as Array<{ slug: string; wiAsc: number; wiHospital: number; anesCf: number }>).find((m) => m.slug === 'new-york')!;
const pr = (id: string) => (P.procedures as Record<string, { codes: Array<{ cpt: string }>; asa: string; minutes: number | null; aspsFee: number }>)[id];

describe('CMS files as read', () => {
  it('ASC national rates of October 2026 (Addendum AA)', () => {
    expect(R.cpt['15830'].asc.rate).toBe(2848.2);
    expect(R.cpt['19325'].asc.rate).toBe(3171.5);
    expect(R.cpt['30410'].asc.rate).toBe(3025.62);
  });
  it('ASC rate = relative weight x CY 2026 ASC conversion factor', () => {
    // Addendum AA, 15830: weight 50.5699 x $56.322 = $2,848.20
    expect(Math.round(50.5699 * P.rules.ascConversionFactor * 100) / 100).toBe(R.cpt['15830'].asc.rate);
  });
  it('OPPS status and rates (Addendum B)', () => {
    expect(R.cpt['15830'].opps.status).toBe('J1');
    expect(R.cpt['15830'].opps.rate).toBe(6783.99);
    expect(R.cpt['15877'].opps.status).toBe('T');
  });
  it('anesthesia base units and national factor', () => {
    expect(R.asa['00402']).toBe(5);
    expect(R.asa['00400']).toBe(3);
    expect(R.anesNationalCf).toBe(20.49754);
  });
  it('wage indexes of New York (FY 2026 Table 3)', () => {
    expect(ny.wiAsc).toBe(1.2714);
    expect(ny.wiHospital).toBe(1.3697);
    expect(ny.anesCf).toBe(22.81);
  });
});

describe('operating room', () => {
  it('ASC: 50 % labor share with the pre-floor wage index', () => {
    const f = facilityFee(['15830'], 'asc', ny, R, RU);
    expect(f.factor).toBeCloseTo(0.5 * 1.2714 + 0.5, 10);
    expect(f.total).toBeCloseTo(2848.2 * (0.5 * 1.2714 + 0.5), 6);
  });
  it('ASC: second code at 50 %', () => {
    const f = facilityFee(['15877', '15771'], 'asc', null, R, RU);
    expect(f.total).toBeCloseTo(1940.78 * 1.5, 6);
  });
  it('hospital: J1 packages the other codes', () => {
    const f = facilityFee(['15830', '15877'], 'hopd', null, R, RU);
    expect(f.total).toBeCloseTo(6783.99, 6);
    expect(f.lines.find((l) => l.cpt === '15877')!.packaged).toBe(true);
  });
  it('hospital: two T codes, 100 % and 50 %, 60 % labor share', () => {
    const f = facilityFee(['15877', '15771'], 'hopd', ny, R, RU);
    expect(f.total).toBeCloseTo(3620.48 * 1.5 * (0.6 * 1.3697 + 0.4), 6);
  });
});

describe('anesthesia', () => {
  it('(base + minutes / 15) x conversion factor', () => {
    const a = anesthesiaFee(['00802'], 120, null, R, RU);
    expect(a.timeUnits).toBe(8);
    expect(a.total).toBeCloseTo((5 + 8) * 20.49754, 6);
  });
  it('one session: the highest base unit only', () => {
    const a = anesthesiaFee(['00400', '00402'], 90, ny, R, RU);
    expect(a.baseUnits).toBe(5);
    expect(a.total).toBeCloseTo((5 + 6) * 22.81, 6);
  });
  it('default minutes: CMS intra-service time, or the published series', () => {
    expect(defaultMinutes(pr('tummy_tuck'), R)).toBe(120);
    expect(defaultMinutes(pr('facelift'), R)).toBe(153);
  });
});

describe('total', () => {
  it('tummy tuck at national rates in a surgery center', () => {
    const c = cost({ procs: [pr('tummy_tuck')], setting: 'asc', place: null }, R, RU);
    expect(c.surgeon).toBe(8174);
    expect(c.total).toBeCloseTo(8174 + 2848.2 + 13 * 20.49754, 6);
  });
  it('quotes replace the benchmarks; recovery is added', () => {
    const c = cost({ procs: [pr('tummy_tuck')], setting: 'asc', place: null, surgeonQuote: 9000, facilityQuote: 3000, anesthesiaQuote: 1200, daysOff: 10, dailyPay: 250, extras: 300 }, R, RU);
    expect(c.total).toBe(9000 + 3000 + 1200 + 2500 + 300);
  });
  it('combining saves on the room and the base units', () => {
    const r = combineSaving([pr('tummy_tuck'), pr('breast_lift')], 'asc', null, R, RU);
    expect(r.facilitySaved).toBeCloseTo(2848.2 * 0.5, 6);
    expect(r.anesthesiaSaved).toBeCloseTo(5 * 20.49754, 6);
  });
  it('toxin at the payment limit', () => {
    expect(toxinCost(20, 6.514, 0).product).toBeCloseTo(130.28, 6);
    expect(toxinCost(20, 6.514, 12).quote).toBe(240);
  });
});

describe('finance', () => {
  it('amortizes', () => {
    const l = amortize(10000, 12, 24);
    expect(l.monthly).toBeCloseTo(470.73, 2);
  });
  it('deferred interest is charged back when a balance remains', () => {
    expect(deferred(1200, 24, 12, 100).backInterest).toBe(0);
    expect(deferred(1200, 24, 12, 50).backInterest).toBeGreaterThan(0);
  });
});

describe('parameters as read on their sources (2026-10-20)', () => {
  it('surgeon survey averages of 2023 (ASPS cost pages), one per procedure', () => {
    const fees = Object.fromEntries(Object.entries(P.procedures).map(([k, v]) => [k, (v as { aspsFee: number }).aspsFee]));
    expect(fees).toEqual({ tummy_tuck: 8174, lipo: 4711, bbl: 7264, breast_aug: 4875, breast_lift: 6816, rhinoplasty: 7637, facelift: 11395, brow_lift: 5460, eyelid_upper: 3359, eyelid_lower: 3876, chin: 3641, otoplasty: 4625, arm_lift: 6192, thigh_lift: 7641, gynecomastia: 5587 });
    expect(P.surgeonFee.year).toBe(2023);
    expect((P.procedures.breast_aug as { aspsFatGrafting: number }).aspsFatGrafting).toBe(5719);
    expect(P.botox.asps2023).toBe(435);
  });
  it('Botox Cosmetic label doses and the J0585 payment limit', () => {
    expect(Object.values(P.botox.areas).map((a) => a.units)).toEqual([20, 24, 40, 64, 26]);
    expect((RATES as unknown as { asp: Record<string, { limit: number }> }).asp.J0585.limit).toBe(6.514);
  });
  it('BLS earnings and Federal Reserve G.19 rates', () => {
    expect(P.earnings.medianWeekly).toBe(1251);
    expect(P.credit.cardAssessedInterest).toBe(22.36);
    expect(P.credit.personalLoan24).toBe(11.9);
  });
  it('every procedure and every source key resolves', () => {
    for (const [id, p] of Object.entries(P.procedures) as Array<[string, { aspsSource: string; codes: Array<{ cpt: string }>; asa: string }]>) {
      expect(P.sources[p.aspsSource as keyof typeof P.sources], id).toBeTruthy();
      for (const c of p.codes) expect(R.cpt[c.cpt], `${id} ${c.cpt}`).toBeTruthy();
      expect(R.asa[p.asa], id).toBeGreaterThan(0);
    }
  });
});
