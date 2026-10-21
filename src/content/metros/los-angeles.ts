import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'los-angeles';
const m = K.M(S);
const ba = K.est('breast_aug', S), bah = K.est('breast_aug', S, 'hopd');
const lipo = K.est('lipo', S);
const bbl = K.est('bbl', S), bblh = K.est('bbl', S, 'hopd');
const sd = K.M('san-diego');

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Los Angeles 2026: Room and Anesthesia',
  description: 'Plastic surgery cost in Los Angeles for 2026: breast augmentation, liposuction and BBL line by line, with the wide gap between center and hospital rooms.',
  intro: 'In Los Angeles the hospital wage index is far above the surgery center index, so where the operation happens weighs more than in most cities.',
  resume: `The operating room and anesthesia of a breast augmentation in the Los Angeles area come to a benchmark of ${K.usd(ba.total)} in a surgery center in 2026, and liposuction of the trunk to ${K.usd(lipo.total)}. Those figures add the anesthesia at the 2026 factor of the Los Angeles-Long Beach-Anaheim locality, ${K.cents(m.anesCf)}, and the operating room at Medicare's rate adjusted with the area's wage index. Los Angeles stands out for the gap between its two indexes: ${K.dec(m.wiAsc, 4)} before floor and reclassification, used for surgery centers, and ${K.dec(m.wiHospital, 4)} after them, used for hospitals. A hospital outpatient department is therefore paid ${K.usd(bah.facilityAmount)} for the breast augmentation room, against ${K.usd(ba.facilityAmount)} for a surgery center, the widest gap of any procedure here. The surgeon's fee is not included, because no public file reports Los Angeles fees or national ones; the calculator adds it from the figure on your own quote.`,
  body: (h) => `
<h2>Why the hospital index is so high</h2>
<p>Hospitals receive the final wage index of their area, after the rural floor and reclassifications that let hospitals be paid at the index of a neighboring area. Surgery centers receive the index before those adjustments. In Los Angeles the final index is ${K.dec(m.wiHospital, 4)}, the same as San Diego's (${K.dec(sd.wiHospital, 4)}), while the center index is ${K.dec(m.wiAsc, 4)}. Since hospitals apply the index to sixty percent of their rate and centers to half, a hospital room here costs much more than a center's for every procedure.</p>
${h.table(['Procedure', 'Surgery center room', 'Hospital room'], [['Breast augmentation', K.usd(ba.facilityAmount), K.usd(bah.facilityAmount)], ['Brazilian butt lift', K.usd(bbl.facilityAmount), K.usd(bblh.facilityAmount)]], 'Medicare 2026 rates adjusted to the Los Angeles area.', ['l', 'r', 'r'])}
<h2>Body contouring in Los Angeles</h2>
<p>Liposuction and the Brazilian butt lift are sometimes sold as package prices. The room and anesthesia benchmark for a BBL here is ${K.usd(bbl.total)} in a surgery center, before any surgeon's fee. A package close to that figure is not necessarily wrong, but it needs the list of what it includes: the anesthesia provider, the facility, garments and follow-up. The ${h.a('bbl-cost', 'BBL page')} explains the two codes behind the operation.</p>
${h.mini('quote', { t: 'A Los Angeles package price, taken apart', p: ['pr', 'q'], d: { pr: 'bbl', q: 9000, mx: S } })}
<p>Orange County belongs to the same anesthesia locality as Los Angeles County but to a different wage index area, so the room line of an Orange County practice may differ slightly from this page.</p>
`,
  faqs: [
    { q: 'How much does a breast augmentation cost in Los Angeles?', a: `About ${K.usd(ba.total)} for the operating room and anesthesia in a surgery center: anesthesia at the 2026 Los Angeles factor and the room at Medicare's rate adjusted to the area, implant included. In a hospital outpatient department the room alone is ${K.usd(bah.facilityAmount)}. The surgeon's fee comes on top, from your quote.` },
    { q: 'Why are hospital rooms so expensive in Los Angeles?', a: `Because Medicare pays hospitals with the final wage index of the area, ${K.dec(m.wiHospital, 4)} for Los Angeles in fiscal 2026, applied to sixty percent of the rate. Surgery centers use the index before floor and reclassification, ${K.dec(m.wiAsc, 4)}, on half the rate. The same operation therefore costs far more in a hospital department.` },
    { q: 'Is Orange County priced like Los Angeles?', a: 'For anesthesia, yes: both counties form one Medicare locality with one conversion factor. For the operating room, Orange County has its own wage index area, so its room line can differ a little from the Los Angeles figures on this page. The surgeon’s fee is set by each practice in both counties.' },
  ],
  related: ['breast-augmentation-cost', 'bbl-cost', 'surgery-center-vs-hospital', 'metro:san-diego'],
  toolArg: { pr: 'breast_aug' },
});
