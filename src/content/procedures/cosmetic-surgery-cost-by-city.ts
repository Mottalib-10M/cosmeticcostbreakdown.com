import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { PLANNED_METROS } from '../../lib/planned';

const ms = K.METROS.map((m) => {
  const a = K.est('tummy_tuck', m.slug), hp = K.est('tummy_tuck', m.slug, 'hopd'), b = K.est('breast_aug', m.slug);
  return { m, a, hp, b };
}).sort((x, y) => y.a.total - x.a.total);
const hi = ms[0], lo = ms[ms.length - 1];
const nat = K.est('tummy_tuck');
const byWi = K.METROS.slice().sort((a, b) => b.wiAsc - a.wiAsc);

export default defineGuide({
  id: 'cosmetic-surgery-cost-by-city',
  group: 'bill',
  order: 24,
  slug: 'cosmetic-surgery-cost-by-city',
  nav: 'Cost by city',
  card: 'The same procedure in 26 metro areas: what the wage index and anesthesia factors change, and what they do not.',
  title: 'Cosmetic Surgery Cost by City 2026: 26 US Metros Compared',
  description: 'Cosmetic surgery cost by city in 2026: operating room and anesthesia at Medicare rates adjusted to 26 US metros, plus the surgeon average for each procedure.',
  h1: 'Cosmetic surgery cost by city: 26 metro areas side by side',
  intro: 'Pick a procedure: every metro area appears with its room, its anesthesia and its benchmark total, from the highest to the lowest.',
  resume: `Moving from one city to another changes the two lines of a cosmetic surgery bill that Medicare adjusts for local costs, and leaves the surgeon's survey average unchanged, because no public file gives surgeons' fees by city. For a tummy tuck in a surgery center, the benchmark runs from ${K.usd(lo.a.total)} in ${lo.m.name} to ${K.usd(hi.a.total)} in ${hi.m.name}, against ${K.usd(nat.total)} at national rates. The room line follows the FY 2026 wage index of each metro's core-based statistical area: ${byWi[0].name} has the highest index among the areas priced here, ${K.dec(byWi[0].wiAsc, 4)} for surgery centers, and ${byWi[byWi.length - 1].name} the lowest, ${K.dec(byWi[byWi.length - 1].wiAsc, 4)}. The anesthesia line follows the conversion factor of the Medicare locality. In a hospital the spread is wider, because sixty percent of the hospital rate follows wages. Any larger gap between real quotes from two cities lies in the surgeon's fee, which no public file gives by city.`,
  body: (h) => `
<h2>What moves with the city</h2>
<p>Medicare adjusts the surgery center rate with the wage index of the area on half of the rate and the hospital rate on sixty percent of it, using the ${h.src('cms_wage_index', 'FY 2026 wage index')}. The anesthesia conversion factor is set for each Medicare locality, which may be a city, a group of counties or the rest of a state, in the ${h.src('cms_anes', 'CMS anesthesia file')}. Both adjustments are modest: across the metros priced here the tummy tuck room varies by ${K.usd(hi.a.facilityAmount - lo.a.facilityAmount)} in a surgery center.</p>
${h.table(['Metro area', 'Tummy tuck, center', 'Tummy tuck, hospital', 'Breast augmentation, center'], ms.map((x) => [PLANNED_METROS.includes(x.m.slug) ? h.a(`metro:${x.m.slug}`, x.m.name) : x.m.name, K.usd(x.a.total), K.usd(x.hp.total), K.usd(x.b.total)]), 'Benchmarks: surgeon survey average plus Medicare 2026 anesthesia and room adjusted to each metro.', ['l', 'r', 'r', 'r'])}

<h2>What does not</h2>
<p>The surgeon's fee is the largest line, yet no public file measures it by metro: the survey publishes national averages. The site keeps it national rather than invent a local figure. A quote in a high-cost city well above the benchmark is therefore expected, and it is the surgeon's line that explains it. Asking for the lines separately shows whether the room and anesthesia are in line with the local benchmark.</p>
${h.mini('cost', { t: 'Your procedure in your metro', p: ['pr', 'mx'], d: { pr: 'rhinoplasty', mx: 'dallas' } })}

<h2>Traveling for surgery</h2>
<p>Some patients travel to a cheaper city or abroad. The benchmarks show that the room and anesthesia rarely justify a trip within the country; any saving comes from the surgeon's fee, and it must be set against travel, lodging, time off and the cost of follow-up far from the surgeon. The ${h.a('recovery-time-off', 'recovery page')} prices the days, and each city page details its own rates.</p>
`,
  faqs: [
    { q: 'Which US city is most expensive for cosmetic surgery?', a: `Among the metro areas priced here, ${hi.m.name} has the highest benchmark for a tummy tuck, ${K.usd(hi.a.total)}, because its wage index and anesthesia factor are high. That covers only the room and anesthesia lines. Surgeons' fees are not published by city, so any larger gap between real quotes comes from that unmeasured line.` },
    { q: 'Why is the difference between cities so small on this site?', a: 'Because the public files only measure two lines of the bill, the operating room and the anesthesia, and Medicare adjusts only part of each for local wages. The surgeon’s fee, the largest line, is kept at the national survey average. Real quotes can differ more between cities, on that unmeasured line.' },
    { q: 'Is it worth traveling to another city for cheaper surgery?', a: 'On the room and anesthesia lines, rarely: the benchmarks differ by a few hundred dollars between most metros. Any real saving comes from the surgeon’s fee, and it must be weighed against travel, lodging, time off and follow-up visits far from the surgeon. Continuity of care after the operation is a medical question to raise with the surgeon.' },
  ],
  tool: 'metros',
  toolArg: { pr: 'tummy_tuck' },
  related: ['surgery-center-vs-hospital', 'anesthesia-fee', 'plastic-surgery-quote', 'tummy-tuck-cost'],
  sources: ['cms_wage_index', 'cms_anes', 'cms_asc_addenda', 'cms_opps_b', 'fr_opps_asc_2026'],
});
