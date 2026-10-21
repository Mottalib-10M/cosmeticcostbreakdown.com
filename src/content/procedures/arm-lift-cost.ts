import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('arm_lift');
const hp = K.est('arm_lift', 'us', 'hopd');
const sea = K.est('arm_lift', 'seattle');
const clt = K.est('arm_lift', 'charlotte');
const withLipo = K.combine(['arm_lift', 'lipo']);

export default defineGuide({
  id: 'arm-lift-cost',
  group: 'body',
  order: 7,
  slug: 'arm-lift-cost',
  nav: 'Arm lift cost',
  card: 'Brachioplasty: a modest operating room, anesthesia on few base units, and your surgeon quote on top.',
  title: 'Arm Lift Cost 2026: Brachioplasty Anesthesia and Room Fees',
  description: 'Arm lift cost in 2026: brachioplasty anesthesia and operating room at 2026 Medicare surgery center and hospital rates by US metro, plus your surgeon quote.',
  h1: 'Arm lift cost: brachioplasty, a small room and anesthesia bill',
  intro: 'An arm lift removes loose skin of the upper arms; its room and anesthesia lines are among the smallest of the body procedures.',
  resume: `The operating room and the anesthesia of an arm lift, or brachioplasty, come to a benchmark of ${K.usd(a.total)} at national rates in 2026. The room is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center for CPT 15836, excision of excessive skin of the arm, and ${K.usd(hp.facilityAmount)} to a hospital outpatient department, where the code is comprehensive. Anesthesia comes to ${K.usd(a.anesthesiaAmount)}: the anesthesia code for procedures on the skin of the trunk and limbs carries only ${a.anesthesia.baseUnits} base units, and CMS records ${Math.round(a.minutes)} minutes for the operation. The surgeon's fee is a separate bill that each practice sets and no public file publishes, so the calculator adds it only from your own quote. With such small public lines, two quotes for an arm lift usually differ by the surgeon's fee and by what the package includes.`,
  body: (h) => `
<h2>Why the room is cheap</h2>
<p>Medicare places CPT 15836 in a payment group with other skin excisions of the limbs, at a surgery center rate of ${K.usd(K.R.cpt['15836'].asc.rate)}, lower than the rate for a tummy tuck though the arm lift lasts about as long in the CMS time file. The surgeon's fee is not tied to that group: it is what each surgeon charges, and no public file records it. The site uses the anesthesia code 00400, procedures on the integumentary system of the extremities, anterior trunk and perineum, which has ${a.anesthesia.baseUnits} base units, against 5 for operations on the abdominal wall or the breast.</p>
${h.table(['Line', 'Surgery center', 'Hospital'], [
    ["Surgeon's fee", 'your quote', 'your quote'],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(hp.anesthesiaAmount)],
    ['Operating room', K.usd(a.facilityAmount), K.usd(hp.facilityAmount)],
    ['Room and anesthesia', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(hp.total)}</strong>`],
  ], 'National Medicare rates, 2026; the surgeon line is left to your quote.', ['l', 'r', 'r'])}

<h2>After weight loss</h2>
<p>Many arm lifts follow a large weight loss, and some are combined with liposuction of the arms or with other body lifts. Adding trunk liposuction in the same session brings the room and anesthesia benchmark to ${K.usd(withLipo.combined.total)}; liposuction of the arms themselves uses its own code, which the site does not price separately. Whether loose skin after weight loss is treated as a medical problem by a health plan is a question for the plan: the ${h.a('cosmetic-surgery-insurance', 'insurance page')} explains how plans draw that line.</p>
${h.mini('quote', { t: 'An arm lift quote, line by line', p: ['q', 'mx'], d: { pr: 'arm_lift', q: 9000 } })}

<h2>Metro areas</h2>
<p>Seattle comes to ${K.usd(sea.total)} and Charlotte to ${K.usd(clt.total)} for the room and anesthesia: a gap of only ${K.usd(sea.total - clt.total)}, because the lines that move with the metro are small here. A quote that differs by thousands from the benchmark differs in the surgeon's fee or in what is included, such as garments and follow-up; asking for the quote split into its lines shows which.</p>
`,
  faqs: [
    { q: 'How much does an arm lift cost in 2026?', a: `The room and anesthesia come to about ${K.usd(a.total)} at national rates: anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 15836. In a hospital outpatient department the room is ${K.usd(hp.facilityAmount)}. The surgeon's fee comes on top, from your own quote.` },
    { q: 'Why is anesthesia cheap for an arm lift?', a: `Because the anesthesia code used for skin procedures on the limbs carries ${a.anesthesia.baseUnits} base units, fewer than the 5 of breast or abdominal operations, and the operation is not long in the CMS time file. At the 2026 national factor the line comes to ${K.usd(a.anesthesiaAmount)}. Private anesthesia groups charge their own rates, usually more.` },
    { q: 'Is an arm lift covered after weight loss?', a: 'Sometimes, when a plan accepts that the loose skin causes a medical problem, documented by a doctor, and the operation meets its written criteria. Removing skin for appearance is excluded by plans and by Medicare. Coverage always needs the plan’s prior approval, and the bill on this page assumes you pay it yourself.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'arm_lift' },
  related: ['thigh-lift-cost', 'liposuction-cost', 'cosmetic-surgery-insurance', 'anesthesia-fee'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026'],
});
