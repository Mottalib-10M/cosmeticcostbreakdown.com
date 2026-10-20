import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'chicago';
const m = K.M(S);
const mm = K.combine(['tummy_tuck', 'breast_lift', 'lipo'], S);
const mmh = K.combine(['tummy_tuck', 'breast_lift', 'lipo'], S, 'hopd');
const tt = K.est('tummy_tuck', S);
const gy = K.est('gynecomastia', S);
const anesHour = m.anesCf * 4;

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Chicago 2026: Mommy Makeover and More',
  description: 'Plastic surgery cost in Chicago for 2026: mommy makeover, tummy tuck and male breast reduction benchmarks, with a near-national room and high anesthesia rates.',
  intro: 'Chicago’s surgery center wage index is almost exactly the national level; its anesthesia factor is one of the highest of the metros priced here.',
  resume: `A tummy tuck in the Chicago area comes to a benchmark of ${K.usd(tt.total)} in a surgery center in 2026, and a mommy makeover of a tummy tuck, a breast lift and liposuction in one session to ${K.usd(mm.combined.total)}. The surgery center room barely moves from national rates, because the FY 2026 wage index of the Chicago-Naperville-Schaumburg area before floor and reclassification is ${K.dec(m.wiAsc, 4)}. Hospitals receive a higher final index, ${K.dec(m.wiHospital, 4)}. Anesthesia is where Chicago differs: the 2026 conversion factor of the Chicago locality is ${K.cents(m.anesCf)}, against ${K.cents(K.R.anesNationalCf)} nationally, so every hour of anesthesia costs about ${K.usd(anesHour)} at Medicare's rate. Long combined sessions feel that most. The surgeon's line is the national survey average, kept national because no public file reports what Chicago surgeons charge.`,
  body: (h) => `
<h2>City and suburbs</h2>
<p>Medicare splits the Chicago area into a city locality and a suburban one for physicians and anesthesia. This page uses the Chicago locality; the suburban locality had a lower factor in the 2026 file, so a practice in the suburbs may be billed a little less for the same anesthesia time. The wage index, by contrast, covers the whole statistical division.</p>
<h2>A mommy makeover in Chicago</h2>
<p>In a surgery center, the tummy tuck, the breast lift and the liposuction of one session cost ${K.usd(mm.combined.facilityAmount)} for the room, the two lower codes being paid at half rate, and ${K.usd(mm.combined.anesthesiaAmount)} for ${Math.round(mm.combined.minutes)} minutes of anesthesia. In a hospital department the room is ${K.usd(mmh.combined.facilityAmount)}, because the comprehensive payment of the highest code packages the others. The ${h.a('mommy-makeover-cost', 'mommy makeover page')} explains why the surgeon line of a combination is a ceiling.</p>
${h.mini('combo', { t: 'Your Chicago combination', p: ['b', 'c', 'st'], d: { a: 'tummy_tuck', b: 'breast_aug', c: 'lipo', mx: S } })}
<h2>Male breast reduction</h2>
<p>Gynecomastia surgery comes to ${K.usd(gy.total)} here. It is one of the shorter operations priced on this site, so the high anesthesia factor adds little. The ${h.a('gynecomastia-surgery-cost', 'gynecomastia page')} explains when a health plan may cover part of it.</p>
`,
  faqs: [
    { q: 'How much does a mommy makeover cost in Chicago?', a: `About ${K.usd(mm.combined.total)} as a benchmark for a tummy tuck, a breast lift and liposuction in one surgery center session in 2026: the three national surgeon averages added, anesthesia at the Chicago factor and the room at Medicare's combined-session rates for the area. A surgeon's combined fee is usually below the sum of averages.` },
    { q: 'Why is anesthesia higher in Chicago than elsewhere?', a: `Medicare's 2026 anesthesia conversion factor for the Chicago locality is ${K.cents(m.anesCf)}, one of the highest among the metros priced here, against ${K.cents(K.R.anesNationalCf)} nationally. An hour of anesthesia, four time units, costs about ${K.usd(anesHour)} at that rate. Suburban Chicago has a separate, lower factor.` },
    { q: 'Does the Chicago wage index raise surgery center prices?', a: `Hardly. The surgery center index of the area for fiscal 2026 is ${K.dec(m.wiAsc, 4)}, almost exactly the national level, so the room line is close to national rates. Hospitals receive a higher final index of ${K.dec(m.wiHospital, 4)}, which raises their rooms somewhat more.` },
  ],
  related: ['mommy-makeover-cost', 'combined-procedures', 'gynecomastia-surgery-cost', 'anesthesia-fee'],
  toolArg: { pr: 'tummy_tuck' },
});
