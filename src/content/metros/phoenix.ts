import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'phoenix';
const m = K.M(S);
const up = K.est('eyelid_upper', S);
const both = K.combine(['eyelid_upper', 'eyelid_lower'], S);
const al = K.est('arm_lift', S), alh = K.est('arm_lift', S, 'hopd');
const tl = K.combine(['thigh_lift', 'arm_lift'], S);

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Phoenix 2026: Eyelids, Arm Lift, Room',
  description: 'Plastic surgery cost in Phoenix for 2026: eyelid surgery, arm and thigh lift benchmarks, with the statewide Arizona anesthesia factor and the local wage index.',
  intro: 'Phoenix uses Arizona’s single anesthesia locality, with a factor below the national one, and a hospital wage index above its surgery center index.',
  resume: `Upper eyelid surgery in the Phoenix area comes to a benchmark of ${K.usd(up.total)} in a surgery center in 2026, both eyelids in one session to ${K.usd(both.combined.total)}, and an arm lift to ${K.usd(al.total)}. For anesthesia, Medicare treats all of Arizona as one locality, whose 2026 conversion factor is ${K.cents(m.anesCf)}, below the national ${K.cents(K.R.anesNationalCf)}; a practice in Phoenix, Tucson or Flagstaff applies the same factor. For the operating room, the FY 2026 wage index of the Phoenix-Mesa-Chandler area is ${K.dec(m.wiAsc, 4)} before floor and reclassification, used by surgery centers, and ${K.dec(m.wiHospital, 4)} after, used by hospitals. The surgeon's line is the national survey average, which a Phoenix surgeon may charge above or below. Operations on the eyelids and the limbs have small room and anesthesia lines, so the metro barely moves them.`,
  body: (h) => `
<h2>Eyelid surgery</h2>
<p>The two eyelid codes share one surgery center rate, and in one session the second is paid at half. The Phoenix room for both comes to ${K.usd(both.combined.facilityAmount)}, and anesthesia to ${K.usd(both.combined.anesthesiaAmount)} at the Arizona factor. MedlinePlus notes that eyelid surgery can be done with numbing medicine in a surgeon's office, in which case the anesthesia line may not appear at all. When drooping upper lids reduce vision, a plan may pay after an eye examination; the ${h.a('eyelid-surgery-cost', 'eyelid page')} explains how.</p>
${h.mini('cost', { t: 'Eyelid surgery in Phoenix', p: ['pr', 'st'], d: { pr: 'eyelid_lower', mx: S } })}
<h2>Surgery center or hospital in Phoenix</h2>
<p>The Phoenix hospital index, ${K.dec(m.wiHospital, 4)}, is above the surgery center index, ${K.dec(m.wiAsc, 4)}, because hospitals receive the final index after floor and reclassification. On short operations such as eyelid surgery the difference is a few hundred dollars; on operations paid as comprehensive hospital packages, it grows. The ${h.a('surgery-center-vs-hospital', 'facility page')} sets the two payment systems side by side.</p>
<h2>Arm and thigh lifts</h2>
<p>An arm lift room is ${K.usd(al.facilityAmount)} in a surgery center here and ${K.usd(alh.facilityAmount)} in a hospital department. With a thigh lift in the same session, the pair comes to ${K.usd(tl.combined.total)}, the second room at half rate and one anesthesia session at the lower base units of skin procedures on the limbs. The ${h.a('thigh-lift-cost', 'thigh lift page')} compares the two operations.</p>
`,
  faqs: [
    { q: 'How much does eyelid surgery cost in Phoenix?', a: `About ${K.usd(up.total)} for the upper lids and ${K.usd(both.combined.total)} for upper and lower lids in one session, as 2026 benchmarks in a surgery center: national surgeon averages, anesthesia at the Arizona factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to Phoenix.` },
    { q: 'Is anesthesia priced the same across Arizona?', a: `Yes, for Medicare: the whole state forms one anesthesia locality with a 2026 conversion factor of ${K.cents(m.anesCf)}. A Phoenix practice and a Tucson practice apply the same factor, though private anesthesia groups set their own rates. The operating room wage index, by contrast, differs between metro areas.` },
    { q: 'How much does an arm lift cost in Phoenix?', a: `About ${K.usd(al.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the Arizona factor and a room of ${K.usd(al.facilityAmount)} at Medicare's rate adjusted to the area. In a hospital outpatient department the room alone is ${K.usd(alh.facilityAmount)}.` },
  ],
  related: ['eyelid-surgery-cost', 'arm-lift-cost', 'thigh-lift-cost', 'metro:las-vegas'],
  toolArg: { pr: 'eyelid_upper' },
});
