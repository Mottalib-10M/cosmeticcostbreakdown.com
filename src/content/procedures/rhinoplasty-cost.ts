import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('rhinoplasty');
const hp = K.est('rhinoplasty', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const ny = K.est('rhinoplasty', 'new-york');
const sd = K.est('rhinoplasty', 'san-diego');
const long = K.anes('rhinoplasty', 180).total;
const short = K.anes('rhinoplasty', 60).total;

export default defineGuide({
  id: 'rhinoplasty-cost',
  group: 'face',
  order: 10,
  slug: 'rhinoplasty-cost',
  nav: 'Rhinoplasty cost',
  card: 'Nose reshaping: surgeon, anesthesia and a room priced like other complex face operations.',
  title: 'Rhinoplasty Cost 2026: Nose Job Surgeon, Anesthesia, OR Fees',
  description: 'Rhinoplasty cost in 2026: the nose job surgeon fee average, anesthesia and operating room at 2026 Medicare surgery center and hospital rates, for 26 US metros.',
  h1: 'Rhinoplasty cost: the three bills of a nose job',
  intro: 'A primary rhinoplasty on bone and cartilage, priced as the surgeon, the anesthesia and the operating room each bill it.',
  resume: `A rhinoplasty comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr}, according to the surgeons' society, which states that anesthesia and the operating room are not part of it. The room is priced from CPT 30410, a rhinoplasty on the bony pyramid, the lateral and alar cartilages and the tip: Medicare pays a surgery center ${K.usd(a.facilityAmount)} for it and a hospital outpatient department ${K.usd(hp.facilityAmount)}, as a comprehensive payment. Anesthesia is ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records, at ${a.anesthesia.baseUnits} base units for procedures on the nose. MedlinePlus notes that a rhinoplasty often takes one to three hours and can be done under local or general anesthesia, so the anesthesia line can range from ${K.usd(short)} to ${K.usd(long)} at Medicare's rate, or disappear under local anesthesia given by the surgeon.`,
  body: (h) => `
<h2>Which code, which price</h2>
<p>Rhinoplasty codes are graded by extent. CPT 30400 covers the cartilage of the tip only, 30410 the bones and cartilage together, 30420 adds work on the septum, and 30430 to 30450 are secondary operations, revisions of an earlier rhinoplasty. The site prices 30410, the usual full primary rhinoplasty. In Medicare's surgery center file it shares a payment group and a rate of ${K.usd(K.R.cpt['30410'].asc.rate)} with other complex procedures on the face, such as the chin implant. The ${h.src('medlineplus_rhinoplasty', 'MedlinePlus page on rhinoplasty')} describes the incisions and splints the operation involves.</p>
${h.table(['Line', 'National', 'New York', 'San Diego'], [
    ["Surgeon's fee, survey average", K.usd(a.surgeon), K.usd(ny.surgeon), K.usd(sd.surgeon)],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(ny.anesthesiaAmount), K.usd(sd.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(ny.facilityAmount), K.usd(sd.facilityAmount)],
    ['Benchmark total', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(ny.total)}</strong>`, `<strong>${K.usd(sd.total)}</strong>`],
  ], 'Medicare 2026 rates adjusted with each metro’s wage index and anesthesia factor; the surgeon line is national.', ['l', 'r', 'r', 'r'])}

<h2>When a nose operation is partly medical</h2>
<p>MedlinePlus lists among the reasons for a rhinoplasty correcting a birth defect or an injury and relieving breathing problems. When breathing is the problem, part of the work may be a septoplasty or a repair that a health plan covers, and the cosmetic part is billed to the patient. The two then appear on different lines, sometimes from the same surgeon, and the plan needs to approve its share in advance. The ${h.a('cosmetic-surgery-insurance', 'insurance page')} explains how that split is usually made.</p>
${h.mini('anesthesia', { t: 'Anesthesia for a rhinoplasty of your length', p: ['am', 'mx'], d: { pr: 'rhinoplasty', am: 150 } })}

<h2>Revision rhinoplasty</h2>
<p>A second operation to correct a first one uses its own codes, and the survey publishes no separate average for it. Its surgeon's fee is whatever the surgeon quotes. The room line, by contrast, does not change: in the October 2026 surgery center file, the secondary codes 30430, 30435 and 30450 carry the same rate as 30410, so the calculator's room line holds for a revision, and its detailed fields take the expected anesthesia time. The ${h.a('plastic-surgery-quote', 'quote page')} shows how to read the lines of the estimate you are given.</p>
`,
  faqs: [
    { q: 'How much does a rhinoplasty cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 30410. In New York the benchmark is ${K.usd(ny.total)}, because the room and anesthesia cost more there.` },
    { q: 'Does insurance pay for a nose job?', a: 'Not for reshaping done for appearance. A plan may pay for the part of an operation that restores breathing or repairs an injury, such as work on the septum, when a doctor documents the problem and the plan approves it in advance. The cosmetic part stays with the patient, and the two parts should appear on separate lines.' },
    { q: 'How long does a rhinoplasty take, and does it change the price?', a: `MedlinePlus says the procedure often takes one to three hours. Time changes the anesthesia line: at Medicare's 2026 national factor, one hour costs about ${K.usd(short)} in anesthesia and three hours ${K.usd(long)}. The surgeon's fee and the room are usually priced per operation rather than per hour.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'rhinoplasty' },
  related: ['chin-implant-cost', 'facelift-cost', 'cosmetic-surgery-insurance', 'anesthesia-fee'],
  sources: ['asps_rhinoplasty', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026', 'medlineplus_rhinoplasty'],
});
