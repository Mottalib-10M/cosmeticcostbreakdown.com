import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('chin');
const hp = K.est('chin', 'us', 'hopd');
const rh = K.est('rhinoplasty');
const yr = K.P.surgeonFee.year;
const pair = K.combine(['rhinoplasty', 'chin']);
const roomShare = a.facilityAmount / a.total;
const bos = K.est('chin', 'boston');
const sat = K.est('chin', 'san-antonio');

export default defineGuide({
  id: 'chin-implant-cost',
  group: 'face',
  order: 14,
  slug: 'chin-implant-cost',
  nav: 'Chin implant cost',
  card: 'Chin augmentation: a modest surgeon average, a large room line, often paired with a rhinoplasty.',
  title: 'Chin Implant Cost 2026: Surgeon, Anesthesia, Operating Room',
  description: 'Chin implant cost in 2026: chin augmentation surgeon fee average, anesthesia and operating room at 2026 Medicare rates, alone or with a rhinoplasty, by metro.',
  h1: 'Chin implant cost: where the room weighs more than usual',
  intro: 'Chin augmentation with an implant has one of the lower surgeon averages of the face, and one of the higher room rates.',
  resume: `Chin augmentation with an implant comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr}, one of the lowest of the face procedures, according to the surgeons' society, which excludes anesthesia and the operating room from it. The room line is unusually heavy: Medicare pays a surgery center ${K.usd(a.facilityAmount)} for CPT 21120, genioplasty by augmentation, the same rate as a rhinoplasty, and a hospital outpatient department ${K.usd(hp.facilityAmount)}. That makes the room ${K.pct(roomShare, 0)} of the benchmark, the largest room share of any procedure priced here. Anesthesia adds ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records. A chin implant placed during a rhinoplasty costs much less on the room and anesthesia lines than as a separate operation.`,
  body: (h) => `
<h2>The implant and the code</h2>
<p>CPT 21120 describes genioplasty by augmentation, with an implant or graft. Medicare places it in the same surgery center payment group as the rhinoplasty, at ${K.usd(K.R.cpt['21120'].asc.rate)}, and in a comprehensive hospital group. The implant itself is packaged into those payments: Medicare does not pay it separately. A private practice may list it as its own item. Reshaping the chin bone, a sliding genioplasty, uses other codes and is not priced here.</p>
${h.table(['Line', 'Chin implant', 'Share'], [
    ["Surgeon's fee", K.usd(a.surgeon), K.pct(a.surgeon / a.total, 0)],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.pct(a.anesthesiaAmount / a.total, 0)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.pct(roomShare, 0)],
  ], `National Medicare rates; surgeon: ${yr} survey average for chin augmentation.`, ['l', 'r', 'r'])}

<h2>With a rhinoplasty</h2>
<p>The chin and the nose are often assessed together, and some surgeons place a chin implant during a rhinoplasty. In a surgery center the two codes have the same rate, so one is paid in full and the other at half; in a hospital both are comprehensive and only one is paid. Anesthesia is billed once. A rhinoplasty with a chin implant comes to ${K.usd(pair.combined.total)}, against ${K.usd(rh.total + a.total)} for two operations: the saving of ${K.usd(rh.total + a.total - pair.combined.total)} is entirely on the room and anesthesia lines. The ${h.a('rhinoplasty-cost', 'rhinoplasty page')} details the nose operation.</p>
${h.mini('combo', { t: 'Rhinoplasty and chin implant together', p: ['st', 'mx'], d: { a: 'rhinoplasty', b: 'chin', c: 'none' } })}

<h2>Metro areas</h2>
<p>Because the room line is large, the metro area moves this benchmark more than most: ${K.usd(bos.total)} in Boston against ${K.usd(sat.total)} in San Antonio. A quote close to the survey average for the surgeon but much higher in total is usually explained by the facility, which is worth asking about directly.</p>
`,
  faqs: [
    { q: 'How much does a chin implant cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 21120, which packages the implant. A hospital outpatient department is paid ${K.usd(hp.facilityAmount)}.` },
    { q: 'Why is the operating room so expensive for a chin implant?', a: `Medicare puts chin augmentation in the same surgery center payment group as rhinoplasty, at ${K.usd(K.R.cpt['21120'].asc.rate)} nationally, and packages the implant into that rate. The operation is short, but the group's rate reflects the resources of the procedures it contains. Private facilities set their own prices and may differ.` },
    { q: 'Does a chin implant cost less with a nose job?', a: `On the room and anesthesia lines, yes. At national rates a rhinoplasty with a chin implant in one session comes to ${K.usd(pair.combined.total)}, about ${K.usd(rh.total + a.total - pair.combined.total)} below two separate operations, because the second code is paid at half rate and anesthesia is billed once. The surgeon decides the combined fee.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'chin' },
  related: ['rhinoplasty-cost', 'facelift-cost', 'combined-procedures', 'surgery-center-vs-hospital'],
  sources: ['asps_chin_surgery', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026', 'cfr_416_172'],
});
