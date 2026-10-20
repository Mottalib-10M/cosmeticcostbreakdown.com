import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'atlanta';
const m = K.M(S);
const fl = K.est('facelift', S), flN = K.est('facelift');
const fe = K.combine(['facelift', 'eyelid_upper', 'eyelid_lower'], S);
const tt = K.est('tummy_tuck', S), tth = K.est('tummy_tuck', S, 'hopd');
const same = Math.abs(m.wiAsc - m.wiHospital) < 0.00005;

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Atlanta 2026: Facelift and Tummy Tuck',
  description: 'Plastic surgery cost in Atlanta for 2026: facelift, eyelid and tummy tuck benchmarks, with one wage index for centers and hospitals and a local anesthesia rate.',
  intro: `In Atlanta the surgery center and hospital wage indexes are ${same ? 'the same' : 'close'}, so the gap between the two settings is the national one.`,
  resume: `A facelift in the Atlanta area comes to a benchmark of ${K.usd(fl.total)} in a surgery center in 2026, against ${K.usd(flN.total)} at national rates, and a tummy tuck to ${K.usd(tt.total)}. The area is simple to read. Its FY 2026 wage index is ${K.dec(m.wiAsc, 4)} ${same ? 'both before and after floor and reclassification, so surgery centers and hospitals are adjusted with the same value' : `before floor and reclassification and ${K.dec(m.wiHospital, 4)} after`}; being just under 1, it lowers the room line slightly. The anesthesia factor of the Atlanta locality is ${K.cents(m.anesCf)}, a few cents above the national ${K.cents(K.R.anesNationalCf)}. The two effects nearly cancel, so Atlanta benchmarks sit close to national ones. The surgeon's fee is the national survey average, and for a facelift it is most of the bill, so a real Atlanta quote will be decided by that line.`,
  body: (h) => `
<h2>Facelift and eyelids</h2>
<p>For a facelift the room and anesthesia lines are small next to the surgeon's average fee, and the local adjustment changes little. Adding upper and lower eyelid surgery in the same session brings the benchmark to ${K.usd(fe.combined.total)} in Atlanta: the two eyelid codes are paid at half rate in a surgery center, and anesthesia is billed once for the longer session. The ${h.a('facelift-cost', 'facelift page')} explains the time used for anesthesia.</p>
${h.mini('combo', { t: 'Face procedures in one Atlanta session', p: ['b', 'c'], d: { a: 'facelift', b: 'eyelid_upper', c: 'brow_lift', mx: S } })}
<h2>Center or hospital</h2>
<p>With one index for both settings, the hospital room for a tummy tuck, ${K.usd(tth.facilityAmount)}, stands to the center room, ${K.usd(tt.facilityAmount)}, almost exactly as at national rates. In metros where hospitals receive a higher index than centers, such as Los Angeles or Washington, the gap widens; here it does not. The ${h.a('surgery-center-vs-hospital', 'facility page')} explains the two payment systems.</p>
<p>The Atlanta anesthesia locality covers the core counties of the area; practices farther out may fall in the rest of Georgia, with a lower factor. For them the anesthesia line on this page leans slightly high.</p>
`,
  faqs: [
    { q: 'How much does a facelift cost in Atlanta?', a: `About ${K.usd(fl.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the Atlanta factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to the area. The surgeon's fee is most of that figure, and it is the part that varies between practices.` },
    { q: 'Are Atlanta plastic surgery prices close to the national average?', a: `For the public lines, yes. The area's wage index, ${K.dec(m.wiAsc, 4)}, is just below 1 and its anesthesia factor just above the national one, so the benchmarks are within a few dozen dollars of national rates. Real quotes depend mainly on the surgeon's fee.` },
    { q: 'Do Atlanta hospitals cost much more than surgery centers?', a: `About as much more as nationally: with one wage index for both settings, a tummy tuck room is ${K.usd(tth.facilityAmount)} in a hospital department and ${K.usd(tt.facilityAmount)} in a surgery center at Medicare's 2026 rates. In some other metros, hospitals receive a higher index and the gap is wider.` },
  ],
  related: ['facelift-cost', 'eyelid-surgery-cost', 'surgery-center-vs-hospital', 'metro:washington-dc'],
  toolArg: { pr: 'facelift' },
});
