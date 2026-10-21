import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'dallas';
const m = K.M(S);
const ba = K.est('breast_aug', S), baN = K.est('breast_aug'), bah = K.est('breast_aug', S, 'hopd');
const tt = K.est('tummy_tuck', S);
const rh = K.est('rhinoplasty', S);
const below = K.est('breast_aug').total - ba.total;

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Dallas 2026: Breast, Tummy Tuck, Nose',
  description: 'Plastic surgery cost in Dallas for 2026: breast augmentation, tummy tuck and rhinoplasty room and anesthesia fees, below national rates, line by line.',
  intro: 'In Dallas both public factors sit below the national level, so every benchmark on this page is a little under the national figure.',
  resume: `The operating room and anesthesia of a breast augmentation in the Dallas area come to a benchmark of ${K.usd(ba.total)} in a surgery center in 2026, ${K.usd(below)} below the national ${K.usd(baN.total)}, and a tummy tuck to ${K.usd(tt.total)}. Both local factors are below the national level. The FY 2026 wage index of the Dallas-Plano-Irving area, before floor and reclassification, is ${K.dec(m.wiAsc, 4)}, which lowers the surgery center room, and the anesthesia conversion factor of the Dallas locality is ${K.cents(m.anesCf)}, against ${K.cents(K.R.anesNationalCf)} nationally. Hospitals receive the higher final index of ${K.dec(m.wiHospital, 4)}, the value shared by the large Texas metros. The surgeon's fee is not part of these figures: each Dallas practice sets its own, no public file publishes it, and it is the line to ask about first when comparing two quotes in the area. Enter it in the calculator to see the whole bill.`,
  body: (h) => `
<h2>Dallas and Fort Worth</h2>
<p>The two cities form one metropolitan area but not one Medicare geography. Dallas and Fort Worth are separate statistical divisions for the wage index, and separate anesthesia localities, with factors that differ by about a cent in 2026. For a practice on the Fort Worth side, the benchmarks on this page are a close approximation, not an exact figure.</p>
<h2>Breast augmentation in a center or a hospital</h2>
<p>The room for a breast augmentation is paid ${K.usd(ba.facilityAmount)} in a Dallas surgery center and ${K.usd(bah.facilityAmount)} in a hospital outpatient department at Medicare's 2026 rates, the implant packaged in both. Because the hospital index is above the center index here, the gap is a little wider than at national rates. The ${h.a('breast-augmentation-cost', 'breast augmentation page')} details what the room line includes.</p>
${h.mini('quote', { t: 'A Dallas breast augmentation quote', p: ['q', 'st'], d: { pr: 'breast_aug', q: 8500, mx: S } })}
<h2>Rhinoplasty</h2>
<p>The room and anesthesia of a rhinoplasty come to ${K.usd(rh.total)} here. Its room line is one of the larger ones among face operations, because Medicare places the code in a well-paid group, so the local wage index shows more on it than on an eyelid operation. The ${h.a('metro:houston', 'Houston page')} compares the four large Texas metros side by side.</p>
`,
  faqs: [
    { q: 'How much does a breast augmentation cost in Dallas?', a: `About ${K.usd(ba.total)} for the operating room and anesthesia in a surgery center in 2026: anesthesia at the Dallas factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to the area, implant packaged. A hospital department is paid ${K.usd(bah.facilityAmount)} for the room. The surgeon's fee comes on top.` },
    { q: 'Why are Dallas benchmarks below the national ones?', a: `Because both local factors are below the national level: the surgery center wage index of the area is ${K.dec(m.wiAsc, 4)} and the anesthesia factor ${K.cents(m.anesCf)}. They only move the room and anesthesia lines. The surgeon's fee, which no public file measures, is set by each practice and comes on top.` },
    { q: 'Are Fort Worth prices the same as Dallas?', a: 'Close but not identical for the public lines: Fort Worth is a separate wage index division and a separate Medicare anesthesia locality, with factors near those of Dallas. The surgeon’s fee is set by each practice on either side. A Fort Worth quote can be read against the Dallas benchmark with a small margin.' },
  ],
  related: ['breast-augmentation-cost', 'tummy-tuck-cost', 'metro:houston', 'plastic-surgery-quote'],
  toolArg: { pr: 'breast_aug' },
});
