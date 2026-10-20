import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'miami';
const m = K.M(S);
const fl = K.M('fort-lauderdale');
const bbl = K.est('bbl', S), bblN = K.est('bbl');
const bblFl = K.est('bbl', 'fort-lauderdale');
const tt = K.est('tummy_tuck', S);
const mm = K.combine(['tummy_tuck', 'breast_lift', 'lipo'], S);
const cfRank = K.METROS.slice().sort((a, b) => b.anesCf - a.anesCf).findIndex((x) => x.slug === S) + 1;

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Miami 2026: BBL, Tummy Tuck, Each Line',
  description: 'Plastic surgery cost in Miami for 2026: BBL, tummy tuck and mommy makeover benchmarks, with a high anesthesia factor and a low surgery center wage index.',
  intro: `Miami combines a surgery center wage index below the national level with the ${cfRank === 2 ? 'second highest' : 'a high'} anesthesia factor of the metros priced here.`,
  resume: `A Brazilian butt lift in Miami comes to a benchmark of ${K.usd(bbl.total)} in a surgery center in 2026, close to the national ${K.usd(bblN.total)}, and a tummy tuck to ${K.usd(tt.total)}. The two local factors pull in opposite directions. The FY 2026 wage index of the Miami-Miami Beach-Kendall area before floor and reclassification, used for surgery centers, is ${K.dec(m.wiAsc, 4)}, below the national level of 1, so the room costs a little less than at national rates. The anesthesia conversion factor of the Miami locality, ${K.cents(m.anesCf)}, is one of the highest in the country, so anesthesia costs more. Hospitals receive a higher final index, ${K.dec(m.wiHospital, 4)}, shared by every Florida metro priced here. The surgeon's line is the national survey average, the part of a Miami quote that no public file can check.`,
  body: (h) => `
<h2>Miami and Fort Lauderdale</h2>
<p>The two counties are neighbors but separate for Medicare. Miami-Dade has its own anesthesia locality with a factor of ${K.cents(m.anesCf)}, Broward its own at ${K.cents(fl.anesCf)}; their surgery center indexes are ${K.dec(m.wiAsc, 4)} and ${K.dec(fl.wiAsc, 4)}. A BBL comes to ${K.usd(bbl.total)} in Miami and ${K.usd(bblFl.total)} in Fort Lauderdale: the public factors move the bill by ${K.usd(Math.abs(bbl.total - bblFl.total))}. Any larger gap between quotes in the two cities comes from the surgeons and the facilities themselves.</p>
${h.mini('metros', { t: 'A BBL across the metro areas', p: ['pr'], d: { pr: 'bbl' } })}
<h2>Body contouring and combinations</h2>
<p>Body contouring can be proposed as a combined session. A tummy tuck, a breast lift and liposuction in one session come to ${K.usd(mm.combined.total)} here, the second and third codes paid at half rate and the anesthesia billed once. The ${h.a('mommy-makeover-cost', 'mommy makeover page')} explains the arithmetic and the ${h.a('combined-procedures', 'combined procedures page')} the rules.</p>
<p>Patients who travel to Miami for surgery should add travel, lodging and the days spent near the surgeon after the operation, priced on the ${h.a('recovery-time-off', 'recovery page')}. Whether and when it is safe to travel home is a question for the surgeon.</p>
`,
  faqs: [
    { q: 'How much does a BBL cost in Miami?', a: `About ${K.usd(bbl.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the Miami locality factor of ${K.cents(m.anesCf)} and the room for liposuction and fat grafting at Medicare's rate adjusted to Miami. A package price follows its own logic; ask what it includes.` },
    { q: 'Why is anesthesia expensive in Miami?', a: `Medicare's 2026 anesthesia conversion factor for the Miami locality is ${K.cents(m.anesCf)}, against ${K.cents(K.R.anesNationalCf)} nationally, so each anesthesia unit costs more. The room goes the other way, because the surgery center wage index of the area is below 1. Private anesthesia groups set their own rates.` },
    { q: 'Is cosmetic surgery cheaper in Fort Lauderdale than in Miami?', a: `At the public rates used here, slightly: a BBL benchmark is ${K.usd(bblFl.total)} in Fort Lauderdale and ${K.usd(bbl.total)} in Miami, mostly because Broward's anesthesia factor is lower. The surgeon's fee, which the benchmark keeps national, matters more than that difference for a real quote.` },
  ],
  related: ['bbl-cost', 'mommy-makeover-cost', 'liposuction-cost', 'recovery-time-off'],
  toolArg: { pr: 'bbl' },
});
