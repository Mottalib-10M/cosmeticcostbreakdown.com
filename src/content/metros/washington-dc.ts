import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'washington-dc';
const m = K.M(S);
const tt = K.est('tummy_tuck', S), tth = K.est('tummy_tuck', S, 'hopd');
const gap = tth.facilityAmount - tt.facilityAmount;
const gapN = K.est('tummy_tuck', 'us', 'hopd').facilityAmount - K.est('tummy_tuck').facilityAmount;
const thl = K.est('thigh_lift', S);
const loan = K.loan(tt.total, K.P.credit.personalLoan24, 24);

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Washington DC 2026: Tummy Tuck, Lifts',
  description: 'Plastic surgery cost in Washington DC for 2026: tummy tuck and body lift benchmarks, with one anesthesia locality for DC and suburbs and a high hospital index.',
  intro: 'In Washington the hospital wage index is well above the surgery center index, and one anesthesia locality covers the District and its Maryland and Virginia suburbs.',
  resume: `A tummy tuck in the Washington area comes to a benchmark of ${K.usd(tt.total)} in a surgery center in 2026 and a thigh lift to ${K.usd(thl.total)}. Medicare uses one anesthesia locality for the District of Columbia and its Maryland and Virginia suburbs, with a 2026 conversion factor of ${K.cents(m.anesCf)}, above the national ${K.cents(K.R.anesNationalCf)}. For the operating room, the FY 2026 wage index of the Washington, DC-MD division is ${K.dec(m.wiAsc, 4)} before floor and reclassification, used for surgery centers, and ${K.dec(m.wiHospital, 4)} after them, used for hospitals. That spread makes the setting matter: a tummy tuck room costs ${K.usd(tt.facilityAmount)} in a surgery center and ${K.usd(tth.facilityAmount)} in a hospital department, a gap of ${K.usd(gap)} against ${K.usd(gapN)} at national rates. The surgeon's line is the national survey average.`,
  body: (h) => `
<h2>One locality, several wage areas</h2>
<p>The anesthesia factor applies on both sides of the Potomac. The wage index does not: Medicare's statistical divisions separate the District and its Maryland suburbs from the Northern Virginia counties, which form their own division with their own index. The room line on this page uses the Washington, DC-MD division; a Virginia surgery center may differ slightly.</p>
${h.mini('facility', { t: 'Center or hospital in Washington', p: ['pr'], d: { pr: 'tummy_tuck', mx: S } })}
<h2>Paying for it</h2>
<p>Spread over 24 months at the Federal Reserve's average personal loan rate, the tummy tuck benchmark would cost ${K.usd(loan.monthly)} a month. Federal employees and others with flexible spending accounts cannot use them for cosmetic surgery, under the rule the IRS sets out in Publication 502, except for surgery that corrects a deformity of the kinds it lists. The ${h.a('plastic-surgery-financing', 'financing page')} compares a loan, a card and a deferred-interest plan.</p>
<h2>Body lifts</h2>
<p>Arm and thigh lifts have small room rates at Medicare, so the Washington adjustment changes them little; the surgeon's fee is most of the bill. The ${h.a('thigh-lift-cost', 'thigh lift page')} details the operation and the ${h.a('metro:boston', 'Boston page')} another East Coast metro with a high hospital index.</p>
`,
  faqs: [
    { q: 'How much does a tummy tuck cost in Washington DC?', a: `About ${K.usd(tt.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the DC and suburbs factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to the area. In a hospital outpatient department the room alone is ${K.usd(tth.facilityAmount)}.` },
    { q: 'Are Maryland and Virginia suburbs priced like DC?', a: 'For anesthesia, yes: Medicare uses one locality for the District and its Maryland and Virginia suburbs. For the operating room, Northern Virginia is a separate wage index division, so a Virginia facility’s benchmark can differ slightly from the DC figures here. The surgeon line is national everywhere.' },
    { q: 'Can a federal FSA pay for cosmetic surgery?', a: 'Generally not. Flexible spending accounts pay medical expenses as the IRS defines them, and Publication 502 excludes cosmetic surgery unless it corrects a deformity arising from a congenital abnormality, an accident or trauma, or a disfiguring disease. Reconstructive surgery meeting that definition can qualify; ask the plan administrator first.' },
  ],
  related: ['tummy-tuck-cost', 'surgery-center-vs-hospital', 'plastic-surgery-financing', 'metro:boston'],
  toolArg: { pr: 'tummy_tuck' },
});
