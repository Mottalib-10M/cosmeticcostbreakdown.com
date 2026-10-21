import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ids = ['tummy_tuck', 'breast_lift', 'lipo'];
const mm = K.combine(ids);
const apart = mm.separate.reduce((t, c) => t + c.total, 0);
const withImp = K.combine(['tummy_tuck', 'breast_aug', 'lipo']);
const hosp = K.combine(ids, 'us', 'hopd');
const la = K.combine(ids, 'los-angeles');
const loan = K.loan(mm.combined.total, K.P.credit.personalLoan24, 24);
const off = 15 * K.DAILY_PAY;

export default defineGuide({
  id: 'mommy-makeover-cost',
  group: 'body',
  order: 6,
  slug: 'mommy-makeover-cost',
  nav: 'Mommy makeover cost',
  card: 'Tummy tuck, breast surgery and liposuction in one session: what combining saves, and what it does not.',
  title: 'Mommy Makeover Cost 2026: Tummy Tuck, Breast, Lipo Combined',
  description: 'Mommy makeover cost in 2026: tummy tuck, breast lift or implants and liposuction in one session, with the room and anesthesia savings at 2026 Medicare rates.',
  h1: 'Mommy makeover cost: three operations, one session, one bill',
  intro: 'A mommy makeover is not a procedure code but a combination; choose its parts and see the room and anesthesia lines shrink against separate operations.',
  resume: `The operating room and the anesthesia of a mommy makeover made of a tummy tuck, a breast lift and liposuction of the flanks come to a benchmark of ${K.usd(mm.combined.total)} in one session at national rates in 2026, against ${K.usd(apart)} for the same three operations done separately. The saving sits in those two lines. In a surgery center, Medicare pays the highest rated code in full and the others at half, so the room costs ${K.usd(mm.combined.facilityAmount)} instead of ${K.usd(mm.separate.reduce((t, c) => t + c.facilityAmount, 0))}; and anesthesia is billed once, with one set of base units, for ${Math.round(mm.combined.minutes)} minutes. The surgeon's fee is the third line, and the one no public file prices: each practice sets it, often below the sum of its separate fees for a combined session, so the calculator leaves it to your own quote rather than guessing it.`,
  body: (h) => `
<h2>No code for the combination</h2>
<p>The name is a marketing term. On a claim or an itemized quote, a mommy makeover appears as its parts: CPT 15830 for the tummy tuck, 19316 for a breast lift or 19325 for implants, 15877 for liposuction of the trunk. The room and anesthesia lines follow precise public rules for combined sessions, which is what makes them worth computing; the surgeon's fee follows no public rule at all, and only the practice can state it.</p>
${h.table(['Line', 'One session', 'Three separate operations'], [
    ['Anesthesia', K.usd(mm.combined.anesthesiaAmount), K.usd(mm.separate.reduce((t, c) => t + c.anesthesiaAmount, 0))],
    ['Room, surgery center', K.usd(mm.combined.facilityAmount), K.usd(mm.separate.reduce((t, c) => t + c.facilityAmount, 0))],
    ['Room and anesthesia', `<strong>${K.usd(mm.combined.total)}</strong>`, `<strong>${K.usd(apart)}</strong>`],
  ], 'Tummy tuck, breast lift and trunk liposuction; Medicare 2026 national rates; surgeon not included.', ['l', 'r', 'r'])}

<h2>Lift or implants</h2>
<p>Replacing the breast lift with implants changes the room and anesthesia benchmark to ${K.usd(withImp.combined.total)}: the room is higher because the implant code carries the highest surgery center rate of the three and is paid in full. Some patients have both a lift and implants, which adds a fourth code; the calculator above takes three procedures, and the ${h.a('breast-lift-cost', 'breast lift page')} prices the lift with implants.</p>

<h2>Surgery center or hospital</h2>
<p>In a hospital outpatient department the tummy tuck and the breast lift are both comprehensive codes, so the hospital is paid the higher of them once and the other operations are packaged: the hospital room for the three comes to ${K.usd(hosp.combined.facilityAmount)}. Where a combined session takes place is decided by the surgeon and the anesthesia team, for reasons of safety as much as price, so the hospital line is worth knowing even when a surgery center is expected.</p>
${h.mini('combo', { t: 'Your combination', p: ['b', 'c', 'mx'], d: { a: 'tummy_tuck', b: 'breast_aug', c: 'lipo' } })}

<h2>The whole cost, recovery included</h2>
<p>In Los Angeles the room and anesthesia of the three operations come to ${K.usd(la.combined.total)}. The surgeon sets the time off after a combined session; as an example, fifteen unpaid working days at the US median pay come to ${K.usd(off)}, a figure the ${h.a('recovery-time-off', 'recovery page')} lets you replace with your own. Spread over 24 months at the Federal Reserve's average personal loan rate of ${K.pct(K.P.credit.personalLoan24 / 100, 2)}, the room and anesthesia alone would cost ${K.usd(loan.monthly)} a month, before the surgeon's fee.</p>
`,
  faqs: [
    { q: 'How much does a mommy makeover cost in 2026?', a: `For a tummy tuck, breast lift and liposuction in one session, the room and anesthesia come to a benchmark of ${K.usd(mm.combined.total)} at national rates: ${K.usd(mm.combined.anesthesiaAmount)} for anesthesia and ${K.usd(mm.combined.facilityAmount)} for a surgery center room with Medicare's combined-session rules. The surgeon's fee comes on top, from the practice's own quote.` },
    { q: 'Is a mommy makeover cheaper than separate surgeries?', a: `On the room and anesthesia lines, yes: about ${K.usd(apart - mm.combined.total)} less at the rates used here, because the second and third codes are paid at half rate and anesthesia is billed once. Whether the surgeon also lowers the fee depends on the surgeon. One longer operation and one recovery also replace three.` },
    { q: 'What procedures are in a mommy makeover?', a: 'There is no fixed definition. Most combine a tummy tuck with breast surgery, a lift, implants or both, and often liposuction of the flanks. Some add other areas. Each part is billed under its own code, so asking the practice for the list of codes is the surest way to compare two quotes for a mommy makeover.' },
  ],
  tool: 'combo',
  toolArg: { a: 'tummy_tuck', b: 'breast_lift', c: 'lipo' },
  related: ['tummy-tuck-cost', 'breast-lift-cost', 'combined-procedures', 'plastic-surgery-financing'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cfr_416_172', 'cms_anes', 'fed_g19'],
});
