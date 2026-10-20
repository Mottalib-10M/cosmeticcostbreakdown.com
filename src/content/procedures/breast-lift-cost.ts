import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('breast_lift');
const hp = K.est('breast_lift', 'us', 'hopd');
const ba = K.est('breast_aug');
const yr = K.P.surgeonFee.year;
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
  card: 'Mastopexy without implants: the surgeon average is higher than for an augmentation, the room lower.',
  title: 'Breast Lift Cost 2026: Mastopexy Surgeon, Anesthesia and OR',
  description: 'Breast lift cost in 2026: the mastopexy surgeon fee average, anesthesia and operating room at 2026 Medicare rates, alone or with implants, in 26 US metro areas.',
  h1: 'Breast lift cost: a mastopexy, with or without implants',
  intro: 'A breast lift reshapes and raises the breast without adding volume; priced here alone, and with implants in the same session.',
  resume: `A breast lift, or mastopexy, comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr}, higher than the ${K.usd(ba.surgeon)} reported for a breast augmentation, and CMS records a longer operation for it, ${Math.round(K.min('breast_lift'))} minutes against ${Math.round(K.min('breast_aug'))}; the society that publishes the average says it excludes anesthesia and facilities. The operating room for CPT 19316 is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center and ${K.usd(hp.facilityAmount)} to a hospital outpatient department, the same rates as a tummy tuck because both codes sit in the same payment group. Anesthesia is ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records. With implants added in the same session, the benchmark rises to ${K.usd(both.combined.total)} in a surgery center.`,
  body: (h) => `
<h2>What the operation is billed as</h2>
<p>The ${h.src('medlineplus_breast_lift', 'MedlinePlus page on breast lift')} describes one to three incisions, removal of extra skin and sometimes some breast tissue, and moving the nipple and areola. Surgeons bill it under CPT 19316, "${K.R.cpt['19316'].asc.label}" in the CMS files. MedlinePlus adds that women planning to lose weight, to be pregnant or to nurse a child are often advised to wait, which is a timing question for the surgeon but also a cost question: a second lift later is a second full bill.</p>
${h.table(['', 'Breast lift alone', 'Lift with implants, one session'], [
    ["Surgeons' fees, survey averages", K.usd(a.surgeon), K.usd(both.combined.surgeon)],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(both.combined.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(both.combined.facilityAmount)],
    ['Benchmark total', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(both.combined.total)}</strong>`],
  ], 'National Medicare rates, October 2026. Combined: second code at half rate, one anesthesia session.', ['l', 'r', 'r'])}

<h2>Adding implants</h2>
<p>A lift does not add volume, so some patients have implants placed in the same operation. The survey publishes no average for the combination; adding the two averages, as the table does, probably overstates the surgeon's line, since a surgeon who does both at once rarely charges two full fees. The room and anesthesia lines follow Medicare's rules. In a surgery center the implant code is paid in full and the lift at half rate. In a hospital both codes are comprehensive, so only the higher one is paid and the hospital room for the pair is ${K.usd(both_h.combined.facilityAmount)}, the same as for the augmentation alone.</p>
${h.mini('combo', { t: 'Lift and implants in one session', p: ['b', 'st'], d: { a: 'breast_lift', b: 'breast_aug', c: 'none' } })}

<h2>Metro areas</h2>
<p>The benchmark is ${K.usd(bos.total)} in Boston and ${K.usd(det.total)} in Detroit. Boston's hospital wage index is high, so a quote naming a hospital there is the one most affected by the local adjustment. The surgeon's line does not move in the calculator, because no public survey gives fees by city. Quotes in large coastal metros above the benchmark are expected; quotes far below it should list what they exclude.</p>
`,
  faqs: [
    { q: 'How much does a breast lift cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 19316. A hospital outpatient department is paid ${K.usd(hp.facilityAmount)} for the same room.` },
    { q: 'Why does a breast lift cost more than an augmentation?', a: `The surgeon's average fee is higher, ${K.usd(a.surgeon)} against ${K.usd(ba.surgeon)} in the ${yr} survey, and CMS records twice the operating time for the lift, ${Math.round(K.min('breast_lift'))} minutes against ${Math.round(K.min('breast_aug'))}. The facility line goes the other way: the lift has no implant to package, so the surgery center room is lower than for an augmentation.` },
    { q: 'How much do a breast lift and implants cost together?', a: `A benchmark of ${K.usd(both.combined.total)} in a surgery center at national rates, adding both survey averages for the surgeon, one anesthesia session and the room with the lift paid at half rate. Surgeons usually charge less than two full fees for a combined operation, so a real quote may be lower on that line.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'breast_lift' },
  related: ['breast-augmentation-cost', 'mommy-makeover-cost', 'combined-procedures', 'gynecomastia-surgery-cost'],
  sources: ['asps_breast_lift', 'asps_breast_augmentation', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'medlineplus_breast_lift'],
});
