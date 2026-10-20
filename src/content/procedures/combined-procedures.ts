import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pairs: Array<[string, string]> = [['tummy_tuck', 'lipo'], ['breast_aug', 'breast_lift'], ['facelift', 'eyelid_upper'], ['rhinoplasty', 'chin'], ['arm_lift', 'thigh_lift'], ['brow_lift', 'eyelid_upper']];
const rows = pairs.map(([x, y]) => {
  const c = K.combine([x, y]), h2 = K.combine([x, y], 'us', 'hopd');
  return [`${K.PR(x).short} + ${K.PR(y).short.toLowerCase()}`, K.usd(c.facilitySaved), K.usd(c.anesthesiaSaved), K.usd(h2.facilitySaved), K.usd(c.combined.total)];
});
const tl = K.combine(['tummy_tuck', 'lipo']);
const tlh = K.combine(['tummy_tuck', 'lipo'], 'us', 'hopd');
const fe = K.combine(['facelift', 'eyelid_upper']);
const share = K.P.rules.multipleProcedureShare;

export default defineGuide({
  id: 'combined-procedures',
  group: 'bill',
  order: 19,
  slug: 'combined-plastic-surgery-cost',
  nav: 'Combined procedures',
  card: 'What a second or third procedure in the same session saves on the room and the anesthesia.',
  title: 'Combined Plastic Surgery Cost 2026: What One Session Saves',
  description: 'Combined plastic surgery cost in 2026: the multiple procedure rule, one anesthesia session and hospital packaging, with savings for common pairs at 2026 rates.',
  h1: 'Combined procedures: what one session saves, line by line',
  intro: 'Choose up to three procedures: the calculator applies Medicare’s rules for combined sessions to the room and the anesthesia, and adds the surgeon averages.',
  resume: `Doing two cosmetic operations in one session lowers two lines of the bill by rules that Medicare publishes. In a surgery center, the code with the highest rate is paid in full and every other code that carries the multiple procedure flag is paid at ${K.pct(share, 0)}, under 42 CFR 416.172(e). In a hospital outpatient department, a code with status J1 is a comprehensive payment that packages the others, so a second operation may add nothing to the room line. Anesthesia is billed once, with the base units of the most demanding procedure and the time of the whole session, which saves the second set of base units. A tummy tuck with liposuction saves ${K.usd(tl.facilitySaved)} on the surgery center room and ${K.usd(tl.anesthesiaSaved)} on anesthesia at national rates, against two separate operations. The surgeon's fee follows no public rule: survey averages are per procedure, and surgeons price combinations themselves.`,
  body: (h) => `
<h2>The surgery center rule</h2>
<p>The rule in ${h.src('cfr_416_172', '42 CFR 416.172(e)')} reduces payment for the second and later procedures of a session. Every cosmetic code priced here carries the flag in Addendum AA, so the rule applies to all of them. The order does not depend on which operation is done first: the highest rated code is the one paid in full.</p>
${h.table(['Pair', 'Saved on the center room', 'Saved on anesthesia', 'Saved on the hospital room', 'Combined benchmark'], rows, 'National Medicare rates, October 2026, against two separate operations. Combined benchmark: surgery center, surgeon averages added.', ['l', 'r', 'r', 'r', 'r'])}

<h2>The hospital packaging</h2>
<p>In ${h.src('cms_opps_b', 'Addendum B')}, codes such as the tummy tuck, the breast lift and augmentation, the rhinoplasty and the arm and thigh lifts carry status J1. When one of them is in the session, the hospital receives one comprehensive payment, the highest J1 rate, and the other procedures are packaged. A tummy tuck with liposuction in a hospital therefore saves ${K.usd(tlh.facilitySaved)} on the room, the whole liposuction rate. Codes with status T, such as liposuction, the facelift and the eyelids, follow the same 100 % and 50 % rule as in a center when no J1 code is present.</p>
${h.mini('combo', { t: 'Three procedures, one session', p: ['a', 'b', 'c'], d: { a: 'facelift', b: 'brow_lift', c: 'eyelid_upper' } })}

<h2>Anesthesia once</h2>
<p>An anesthesia provider bills one anesthesia record per session: the base units of the highest-valued procedure and the total time. A facelift with upper eyelid surgery saves ${K.usd(fe.anesthesiaSaved)} on anesthesia against two sessions, the base units of the second one. The time itself is not saved: a longer session costs more time units. The ${h.a('anesthesia-fee', 'anesthesia page')} details the formula.</p>

<h2>What the savings do not say</h2>
<p>A longer operation is not only a billing question. Whether two or three procedures can safely be done together, and in which setting, depends on the patient and the operations, and that judgment belongs to the surgeon and the anesthesia team. The savings above are the arithmetic of the public rates; they are not an argument for combining anything. The ${h.a('mommy-makeover-cost', 'mommy makeover page')} applies the same rules to the most common combination.</p>
`,
  faqs: [
    { q: 'Is it cheaper to have two plastic surgeries at once?', a: `On the room and anesthesia lines, yes. At Medicare rates a surgery center is paid half the rate of the second procedure, and anesthesia is billed once. A tummy tuck with liposuction saves ${K.usd(tl.facilitySaved + tl.anesthesiaSaved)} on those two lines at national rates. Whether the surgeon lowers the fee is up to the surgeon.` },
    { q: 'What is the multiple procedure discount?', a: `A Medicare rule for surgery centers, written in 42 CFR 416.172(e): when several procedures are done in one session, the one with the highest rate is paid in full and each other flagged procedure at ${K.pct(share, 0)} of its rate. Private facilities are free to set their own rules for combined sessions, so ask how they price the second procedure.` },
    { q: 'Does a hospital charge less for a second procedure?', a: `Often nothing at Medicare rates. Most cosmetic codes have status J1 in the hospital outpatient file, a comprehensive payment that packages the other procedures of the day, so only the highest J1 rate is paid. A tummy tuck with liposuction saves the whole liposuction room rate, ${K.usd(tlh.facilitySaved)}, in a hospital.` },
  ],
  tool: 'combo',
  related: ['mommy-makeover-cost', 'anesthesia-fee', 'surgery-center-vs-hospital', 'facelift-cost'],
  sources: ['cfr_416_172', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'fr_opps_asc_2026'],
});
