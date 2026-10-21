import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'new-york';
const m = K.M(S);
const rh = K.est('rhinoplasty', S), rhn = K.est('rhinoplasty');
const ba = K.est('breast_aug', S), bah = K.est('breast_aug', S, 'hopd');
const tt = K.est('tummy_tuck', S);
const cfRank = K.METROS.slice().sort((a, b) => b.anesCf - a.anesCf).findIndex((x) => x.slug === S) + 1;

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost New York 2026: OR and Anesthesia Fees',
  description: 'Plastic surgery cost in New York for 2026: anesthesia at the Manhattan factor and operating room at the local wage index for 15 procedures, plus your quote.',
  intro: `New York has the highest anesthesia factor of the ${K.METROS.length} metro areas priced here, and one of the highest wage indexes.`,
  resume: `In the New York metro area the operating room and anesthesia of a rhinoplasty come to a benchmark of ${K.usd(rh.total)} in 2026, against ${K.usd(rhn.total)} at national rates, and a tummy tuck to ${K.usd(tt.total)}. The difference comes from two public factors. Medicare's FY 2026 wage index for the New York-Jersey City-White Plains area is ${K.dec(m.wiAsc, 4)} before floor and reclassification, used for surgery centers, and ${K.dec(m.wiHospital, 4)} after them, used for hospitals. The anesthesia conversion factor of the Manhattan locality is ${K.cents(m.anesCf)}, ranked ${cfRank === 1 ? 'first' : `number ${cfRank}`} among the metros priced here, against ${K.cents(K.R.anesNationalCf)} nationally. The surgeon's fee is left out, because no public file gives New York surgeons' fees; it is the line a Manhattan quote adds on top of the benchmark, and the one to ask about first. Enter it in the calculator to see the whole bill.`,
  body: (h) => `
<h2>Manhattan and the rest of the area</h2>
<p>Medicare divides the region into several payment localities for physicians and anesthesia. This page uses the Manhattan factor, ${K.cents(m.anesCf)}. In the 2026 file, the locality of the New York suburbs and Long Island has a slightly higher factor, the northern suburbs around Poughkeepsie and northern New Jersey slightly lower ones, so a practice outside Manhattan can be billed a little more or a little less for the same anesthesia time. The operating room line uses one wage index for the whole statistical area, so it applies on both sides of the Hudson.</p>
<p>The index for hospitals is higher than the one for surgery centers, ${K.dec(m.wiHospital, 4)} against ${K.dec(m.wiAsc, 4)}, and hospitals apply it to a larger part of their rate. For a breast augmentation, the room costs ${K.usd(ba.facilityAmount)} in a surgery center and ${K.usd(bah.facilityAmount)} in a hospital outpatient department here: a gap of ${K.usd(bah.facilityAmount - ba.facilityAmount)} for the same operation. The ${h.a('surgery-center-vs-hospital', 'facility page')} explains the two payment systems.</p>
${h.mini('facility', { t: 'Center or hospital in New York', p: ['pr'], d: { pr: 'rhinoplasty', mx: S } })}
<h2>Reading a New York quote</h2>
<p>A New York quote may arrive as one all-inclusive price. Taking it apart with the ${h.a('plastic-surgery-quote', 'quote calculator')} shows how much is left for the surgeon once the room and the anesthesia are counted at local Medicare rates. Because private facilities charge more than Medicare, the true surgeon share is lower than that result, but the order of magnitude helps compare two quotes.</p>
`,
  faqs: [
    { q: 'How much does plastic surgery cost in New York?', a: `At 2026 Medicare rates for the room and anesthesia, adjusted to the New York area: about ${K.usd(tt.total)} for a tummy tuck, ${K.usd(rh.total)} for a rhinoplasty and ${K.usd(ba.total)} for a breast augmentation in a surgery center, before the surgeon's fee. Private prices in the city are usually higher, and the surgeon's fee comes from your quote.` },
    { q: 'Why is anesthesia more expensive in New York?', a: `Medicare sets a conversion factor for each locality, and Manhattan's 2026 factor, ${K.cents(m.anesCf)}, is above the national ${K.cents(K.R.anesNationalCf)}. Each anesthesia unit costs more, so the same operation costs more. Private anesthesia groups set their own rates, but local costs push them in the same direction.` },
    { q: 'Is a hospital much more expensive than a surgery center in New York?', a: `Yes, at Medicare rates. The hospital index for the area is ${K.dec(m.wiHospital, 4)} and applies to sixty percent of the rate, so a breast augmentation room costs ${K.usd(bah.facilityAmount)} in a hospital department against ${K.usd(ba.facilityAmount)} in a surgery center, at 2026 Medicare rates for the area.` },
  ],
  related: ['rhinoplasty-cost', 'surgery-center-vs-hospital', 'plastic-surgery-quote', 'metro:boston'],
  toolArg: { pr: 'rhinoplasty' },
});
