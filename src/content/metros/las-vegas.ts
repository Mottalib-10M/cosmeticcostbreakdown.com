import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'las-vegas';
const m = K.M(S);
const bl = K.est('breast_lift', S), blN = K.est('breast_lift');
const pair = K.combine(['breast_lift', 'breast_aug'], S);
const lipo = K.est('lipo', S);
const phx = K.M('phoenix');

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost Las Vegas 2026: Breast Lift, Lipo, Room',
  description: 'Plastic surgery cost in Las Vegas for 2026: breast lift, implants and liposuction benchmarks, a wage index above 1 and the single Nevada anesthesia rate.',
  intro: 'Las Vegas has a surgery center wage index above the national level and a statewide anesthesia factor below it.',
  resume: `A breast lift in the Las Vegas area comes to a benchmark of ${K.usd(bl.total)} in a surgery center in 2026, against ${K.usd(blN.total)} at national rates, and liposuction of the trunk to ${K.usd(lipo.total)}. The FY 2026 wage index of the Las Vegas-Henderson-North Las Vegas area is ${K.dec(m.wiAsc, 4)} before floor and reclassification, above the national level, which raises the surgery center room a little; hospitals receive ${K.dec(m.wiHospital, 4)}. For anesthesia, Medicare treats all of Nevada as one locality, whose 2026 conversion factor is ${K.cents(m.anesCf)}, below the national ${K.cents(K.R.anesNationalCf)}. The two effects partly offset. The surgeon's line is the national survey average, which a Las Vegas practice sets in its own way. Patients who travel to the city for surgery should add lodging and the days spent near the surgeon after the operation.`,
  body: (h) => `
<h2>Breast lift, with or without implants</h2>
<p>A lift alone costs ${K.usd(bl.facilityAmount)} for the room in a Las Vegas surgery center. With implants in the same session, the implant code is paid in full and the lift at half rate, and anesthesia is billed once: ${K.usd(pair.combined.total)} for the pair. In a hospital both codes are comprehensive and only the higher one is paid. The ${h.a('breast-lift-cost', 'breast lift page')} explains why the surgeon line of the pair is a ceiling.</p>
${h.mini('combo', { t: 'Lift and implants in Las Vegas', p: ['st'], d: { a: 'breast_lift', b: 'breast_aug', c: 'none', mx: S } })}
<h2>Visitors and residents</h2>
<p>Medicare rates do not depend on where the patient lives, only on where the operation takes place, so a visitor and a resident face the same benchmark. What differs is the cost around the operation: a visitor pays for lodging and stays near the surgeon for the first follow-up visits, which the ${h.a('recovery-time-off', 'recovery page')} can price as extra days and items. Liposuction of the trunk comes to ${K.usd(lipo.total)} here, its anesthesia line at the Nevada factor; a longer session adds about ${K.usd(m.anesCf * 2)} per half hour.</p>
<h2>Las Vegas against Phoenix</h2>
<p>The two large desert metros differ little on the public lines. Las Vegas has the higher surgery center wage index, ${K.dec(m.wiAsc, 4)} against ${K.dec(phx.wiAsc, 4)}, and a slightly higher statewide anesthesia factor, ${K.cents(m.anesCf)} against ${K.cents(phx.anesCf)}. On a breast lift the two benchmarks differ by ${K.usd(Math.abs(bl.total - K.est('breast_lift', 'phoenix').total))}. The ${h.a('metro:phoenix', 'Phoenix page')} gives that city's lines, and the ${h.a('recovery-time-off', 'recovery page')} prices the days off work, for residents and visitors alike.</p>
`,
  faqs: [
    { q: 'How much does a breast lift cost in Las Vegas?', a: `About ${K.usd(bl.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the Nevada factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to the area. With implants in the same session, about ${K.usd(pair.combined.total)}.` },
    { q: 'Is anesthesia the same everywhere in Nevada?', a: `For Medicare, yes: Nevada is a single anesthesia locality with a 2026 conversion factor of ${K.cents(m.anesCf)}, a little below the national ${K.cents(K.R.anesNationalCf)}. Reno and Las Vegas practices apply the same factor. Private anesthesia groups set their own rates, which may differ.` },
    { q: 'Is Las Vegas cheaper than Phoenix for plastic surgery?', a: 'Not at the public rates used here: Las Vegas has a higher surgery center wage index and a slightly higher anesthesia factor, so its benchmarks are a little higher. The difference is small next to the surgeon’s fee, which no public file gives by city and which decides most of a real quote.' },
  ],
  related: ['breast-lift-cost', 'liposuction-cost', 'metro:phoenix', 'recovery-time-off'],
  toolArg: { pr: 'breast_lift' },
});
