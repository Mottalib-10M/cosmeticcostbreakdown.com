import { defineMetro } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = 'san-diego';
const m = K.M(S);
const la = K.M('los-angeles');
const rh = K.est('rhinoplasty', S), rhh = K.est('rhinoplasty', S, 'hopd');
const pair = K.combine(['rhinoplasty', 'chin'], S);
const ch = K.est('chin', S);
const rhLa = K.est('rhinoplasty', 'los-angeles');

export default defineMetro({
  slug: S,
  title: 'Plastic Surgery Cost San Diego 2026: Rhinoplasty, Chin, Room',
  description: 'Plastic surgery cost in San Diego for 2026: rhinoplasty and chin implant benchmarks, with the hospital wage index of Los Angeles and a lower center index.',
  intro: 'San Diego shares its hospital wage index with Los Angeles but has a lower surgery center index and its own anesthesia locality.',
  resume: `A rhinoplasty in the San Diego area comes to a benchmark of ${K.usd(rh.total)} in a surgery center in 2026, and a chin implant to ${K.usd(ch.total)}. Both operations have large room lines, so the local wage index shows on them. San Diego's FY 2026 index before floor and reclassification, used for surgery centers, is ${K.dec(m.wiAsc, 4)}; the final index used for hospitals is ${K.dec(m.wiHospital, 4)}, exactly the value of Los Angeles. The rhinoplasty room therefore costs ${K.usd(rh.facilityAmount)} in a surgery center and ${K.usd(rhh.facilityAmount)} in a hospital department here. Anesthesia follows the 2026 factor of the San Diego-Chula Vista-Carlsbad locality, ${K.cents(m.anesCf)}, a little above the national ${K.cents(K.R.anesNationalCf)}. The surgeon's line is the national survey average, which no public file adjusts to San Diego; patients who cross the border for surgery leave this comparison altogether.`,
  body: (h) => `
<h2>Nose and chin together</h2>
<p>A chin implant can be placed during a rhinoplasty. The two codes share one Medicare surgery center rate, so in one session one is paid in full and the other at half, and anesthesia is billed once. In San Diego the pair comes to ${K.usd(pair.combined.total)}, against ${K.usd(rh.total + ch.total)} for two separate operations. In a hospital, both codes are comprehensive and only one is paid. The ${h.a('chin-implant-cost', 'chin implant page')} explains why its room line is unusually heavy.</p>
${h.mini('combo', { t: 'Rhinoplasty and chin in San Diego', p: ['st'], d: { a: 'rhinoplasty', b: 'chin', c: 'none', mx: S } })}
<h2>San Diego against Los Angeles</h2>
<p>Los Angeles has the higher surgery center index, ${K.dec(la.wiAsc, 4)} against ${K.dec(m.wiAsc, 4)}, and a slightly higher anesthesia factor, so a rhinoplasty benchmark is ${K.usd(rhLa.total)} there and ${K.usd(rh.total)} here. In a hospital, the two metros are paid with the same index and the difference nearly disappears. The ${h.a('metro:los-angeles', 'Los Angeles page')} explains why California hospital indexes sit so far above center indexes.</p>
<p>Surgery abroad is outside the scope of these figures: the public rates describe the United States, and the costs of travel, follow-up and complications far from home are not in any file the site reads.</p>
`,
  faqs: [
    { q: 'How much does a rhinoplasty cost in San Diego?', a: `About ${K.usd(rh.total)} as a benchmark in a surgery center in 2026: the national survey average for the surgeon, anesthesia at the San Diego factor of ${K.cents(m.anesCf)} and the room at Medicare's rate adjusted to the area. A hospital outpatient department is paid ${K.usd(rhh.facilityAmount)} for the same room.` },
    { q: 'Is San Diego cheaper than Los Angeles for cosmetic surgery?', a: `Slightly, in a surgery center, at the public rates used here: ${K.usd(rh.total)} against ${K.usd(rhLa.total)} for a rhinoplasty, because San Diego's center wage index and anesthesia factor are lower. In a hospital the two areas use the same wage index. Surgeons' fees, not measured by city, can outweigh both.` },
    { q: 'How much does a chin implant with a nose job cost in San Diego?', a: `About ${K.usd(pair.combined.total)} in one surgery center session in 2026, with both survey averages for the surgeon, one anesthesia session and the second code's room paid at half rate. Two separate operations would come to ${K.usd(rh.total + ch.total)} at the same public rates.` },
  ],
  related: ['rhinoplasty-cost', 'chin-implant-cost', 'metro:los-angeles', 'combined-procedures'],
  toolArg: { pr: 'rhinoplasty' },
});
