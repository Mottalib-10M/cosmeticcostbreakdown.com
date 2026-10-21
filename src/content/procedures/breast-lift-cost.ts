import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('breast_lift');
const hp = K.est('breast_lift', 'us', 'hopd');
const ba = K.est('breast_aug');
const bos = K.est('breast_lift', 'boston');
const det = K.est('breast_lift', 'detroit');
const both = K.combine(['breast_lift', 'breast_aug']);
const both_h = K.combine(['breast_lift', 'breast_aug'], 'us', 'hopd');

export default defineGuide({
  id: 'breast-lift-cost',
  group: 'body',
  order: 5,
  slug: 'breast-lift-cost',
  nav: 'Breast lift cost',
  card: 'Mastopexy without implants: a longer operation than an augmentation, a lower room, and implants as an option.',
  title: 'Breast Lift Cost 2026: Mastopexy Anesthesia and OR Fees',
  description: 'Breast lift cost in 2026: mastopexy anesthesia and operating room at 2026 Medicare rates, alone or with implants, in 26 US metros, before the surgeon fee.',
  h1: 'Breast lift cost: a mastopexy, with or without implants',
  intro: 'A breast lift reshapes and raises the breast without adding volume; priced here alone, and with implants in the same session.',
  resume: `A breast lift, or mastopexy, comes to a room and anesthesia benchmark of ${K.usd(a.total)} at national rates in 2026, before the surgeon's fee. CMS records a longer operation for it than for a breast augmentation, ${Math.round(K.min('breast_lift'))} minutes against ${Math.round(K.min('breast_aug'))}, so its anesthesia line is larger: ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records. The operating room for CPT 19316 is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center and ${K.usd(hp.facilityAmount)} to a hospital outpatient department, the same rates as a tummy tuck because both codes sit in the same payment group. The surgeon's fee is set by each practice and no public file publishes it, so it enters the calculator only from your own quote. With implants added in the same session, the room and anesthesia benchmark rises to ${K.usd(both.combined.total)} in a surgery center.`,
  body: (h) => `
<h2>What the operation is billed as</h2>
<p>The ${h.src('medlineplus_breast_lift', 'MedlinePlus page on breast lift')} describes one to three incisions, removal of extra skin and sometimes some breast tissue, and moving the nipple and areola. Surgeons bill it under CPT 19316, "${K.R.cpt['19316'].asc.label}" in the CMS files. MedlinePlus adds that women planning to lose weight, to be pregnant or to nurse a child are often advised to wait, which is a timing question for the surgeon but also a cost question: a second lift later is a second full bill.</p>
${h.table(['', 'Breast lift alone', 'Lift with implants, one session'], [
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(both.combined.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(both.combined.facilityAmount)],
    ['Room and anesthesia', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(both.combined.total)}</strong>`],
    ["Surgeon's fee", 'your quote', 'your quote'],
  ], 'National Medicare rates, October 2026. Combined: second code at half rate, one anesthesia session.', ['l', 'r', 'r'])}

<h2>Adding implants</h2>
<p>A lift does not add volume, so some patients have implants placed in the same operation. The room and anesthesia lines follow Medicare's rules. In a surgery center the implant code is paid in full and the lift at half rate. In a hospital both codes are comprehensive, so only the higher one is paid and the hospital room for the pair is ${K.usd(both_h.combined.facilityAmount)}, the same as for the augmentation alone. The surgeon prices the combined operation as he or she sees fit; ask for one fee covering both, rather than two separate fees added together.</p>
${h.mini('combo', { t: 'Lift and implants in one session', p: ['b', 'st'], d: { a: 'breast_lift', b: 'breast_aug', c: 'none' } })}

<h2>Metro areas</h2>
<p>The room and anesthesia come to ${K.usd(bos.total)} in Boston and ${K.usd(det.total)} in Detroit. Boston's hospital wage index is high, so a quote naming a hospital there is the one most affected by the local adjustment. No public file gives surgeons' fees by city, so the calculator leaves that line to your quote. Quotes in large coastal metros well above the benchmark are expected; a quote whose room and anesthesia lines fall below it should list what they exclude.</p>
`,
  faqs: [
    { q: 'How much does a breast lift cost in 2026?', a: `The room and anesthesia come to about ${K.usd(a.total)} at national rates: anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 19316. A hospital outpatient department is paid ${K.usd(hp.facilityAmount)} for the same room. The surgeon's fee comes on top and only your quote gives it.` },
    { q: 'Why does a breast lift take longer than an augmentation?', a: `CMS records ${Math.round(K.min('breast_lift'))} minutes of operating time for the lift against ${Math.round(K.min('breast_aug'))} for an augmentation, so the anesthesia line is higher. The facility line goes the other way: the lift has no implant to package, so the surgery center room is lower than for an augmentation.` },
    { q: 'How much do a breast lift and implants cost together?', a: `For the room and anesthesia, ${K.usd(both.combined.total)} in a surgery center at national rates: one anesthesia session and the room with the lift paid at half rate. The surgeon's fee for the combined operation comes on top; it is set by the practice, often as one figure for the whole session.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'breast_lift' },
  related: ['breast-augmentation-cost', 'mommy-makeover-cost', 'combined-procedures', 'gynecomastia-surgery-cost'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'medlineplus_breast_lift'],
});
