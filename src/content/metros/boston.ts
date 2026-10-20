import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'boston';
const m = K.M(S);
const fl = K.est('facelift', S);
const brow = K.combine(['brow_lift', 'eyelid_upper'], S);
const oto = K.est('otoplasty', S), otoh = K.est('otoplasty', S, 'hopd');
const ny = K.M('new-york');

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Boston 2026: Facelift, Brow, Otoplasty',
  description: 'Plastic surgery cost in Boston for 2026: facelift, brow lift and otoplasty benchmarks, with the Metropolitan Boston anesthesia factor and a high hospital index.',
  intro: 'Boston has a wage index well above the national level, higher still for hospitals, and its own metropolitan anesthesia locality.',
  resume: `A facelift in the Boston area comes to a benchmark of ${K.usd(fl.total)} in a surgery center in 2026, a brow lift with upper eyelid surgery in one session to ${K.usd(brow.combined.total)}, and ear surgery to ${K.usd(oto.total)}. The FY 2026 wage index of the Boston division is ${K.dec(m.wiAsc, 4)} before floor and reclassification, used for surgery centers, and ${K.dec(m.wiHospital, 4)} after them, used for hospitals: the room costs more than at national rates in both settings, and much more in a hospital. Anesthesia follows the 2026 factor of the Metropolitan Boston locality, ${K.cents(m.anesCf)}; the rest of Massachusetts has a lower one. The surgeon's line is the national survey average, kept national because no public file reports Boston fees; for a facelift it is most of the bill, so the local factors decide little of a real quote.`,
  body: (h) => `
<h2>Face procedures in Boston</h2>
<p>Facelifts, brow lifts and eyelid operations have modest room rates at Medicare, so even Boston's high index adds only a few hundred dollars to them. A brow lift with upper eyelid surgery costs ${K.usd(brow.combined.facilityAmount)} for the room in a surgery center here, the eyelid code paid at half rate, and ${K.usd(brow.combined.anesthesiaAmount)} for one anesthesia session. The ${h.a('brow-lift-cost', 'brow lift page')} explains the pairing.</p>
${h.mini('combo', { t: 'Face procedures in one Boston session', p: ['b', 'c'], d: { a: 'facelift', b: 'eyelid_upper', c: 'brow_lift', mx: S } })}
<h2>Ear surgery for a child</h2>
<p>Otoplasty is often done in children, under general anesthesia according to MedlinePlus. The Boston room for one ear is ${K.usd(oto.facilityAmount)} in a surgery center and ${K.usd(otoh.facilityAmount)} in a hospital department, where children's operations may take place. With Boston's hospital index, the setting changes the bill more than the city does. The ${h.a('otoplasty-cost', 'otoplasty page')} explains why both ears can add to the room line.</p>
<h2>Boston against New York</h2>
<p>New York has the higher surgery center index, ${K.dec(ny.wiAsc, 4)} against ${K.dec(m.wiAsc, 4)}, and the higher anesthesia factor. The ${h.a('metro:new-york', 'New York page')} gives its figures, and the ${h.a('metro:washington-dc', 'Washington page')} another metro where hospitals receive a much higher index than centers.</p>
`,
  faqs: [
    { q: 'How much does a facelift cost in Boston?', a: `About ${K.usd(fl.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the Metropolitan Boston factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to the area. The surgeon's fee is most of that figure, and real Boston quotes vary mostly on that line.` },
    { q: 'Why are Boston hospital rooms expensive?', a: `Medicare pays hospitals with the final wage index of the area, ${K.dec(m.wiHospital, 4)} for Boston in fiscal 2026, applied to sixty percent of the rate. Surgery centers use the lower index before floor and reclassification, ${K.dec(m.wiAsc, 4)}, on half of theirs. The same operation therefore costs noticeably more in a hospital department.` },
    { q: 'How much does ear pinning cost in Boston?', a: `About ${K.usd(oto.total)} as a benchmark for one coded ear in a surgery center in 2026, with the national surgeon average, anesthesia at the Boston factor and the room at Medicare's rate for the area. Treating both ears can add to the room line, and a hospital department is paid ${K.usd(otoh.facilityAmount)}.` },
  ],
  related: ['facelift-cost', 'brow-lift-cost', 'otoplasty-cost', 'metro:new-york'],
  toolArg: { pr: 'facelift' },
});
