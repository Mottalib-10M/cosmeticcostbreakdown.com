import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('gynecomastia');
const hp = K.est('gynecomastia', 'us', 'hopd');
const withLipo = K.combine(['gynecomastia', 'lipo']);
const phx = K.est('gynecomastia', 'phoenix');
const chi = K.est('gynecomastia', 'chicago');
const loan = K.loan(a.total, K.P.credit.personalLoan24, 12);

export default defineGuide({
  id: 'gynecomastia-surgery-cost',
  group: 'body',
  order: 9,
  slug: 'gynecomastia-surgery-cost',
  nav: 'Gynecomastia surgery cost',
  card: 'Male breast reduction: the shortest body operation here, a small anesthesia line, and when a plan might pay.',
  title: 'Gynecomastia Surgery Cost 2026: Anesthesia and OR Fees',
  description: 'Gynecomastia surgery cost in 2026: male breast reduction anesthesia and operating room at 2026 Medicare rates, with or without liposuction, plus your quote.',
  h1: 'Gynecomastia surgery cost: male breast reduction, line by line',
  intro: 'Male breast reduction removes glandular tissue, often with liposuction; the CMS time for the operation is short, so anesthesia is a small line.',
  resume: `The operating room and the anesthesia of gynecomastia surgery, the reduction of enlarged male breasts, come to a benchmark of ${K.usd(a.total)} at national rates in 2026. The room for CPT 19300, whose CMS descriptor is "${K.R.cpt['19300'].asc.label}", is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center and ${K.usd(hp.facilityAmount)} to a hospital outpatient department. Anesthesia comes to ${K.usd(a.anesthesiaAmount)}: ${a.anesthesia.baseUnits} base units and the ${Math.round(a.minutes)} minutes CMS records for the code, the shortest body operation priced on this site, which keeps that line small whatever the metro area. The surgeon's fee is set by each practice and appears in no public file, so the calculator adds it only from your own quote. When liposuction of the chest is added in the same session, the calculator shows what that second code does to the room and anesthesia lines of the bill.`,
  body: (h) => `
<h2>Excision, liposuction, or both</h2>
<p>CPT 19300 describes the removal of breast tissue in a man. When fat is removed by liposuction, the surgeon may bill a liposuction code as well. The site prices the second code with the trunk liposuction code, 15877, which Medicare pays at half rate in a surgery center when it follows another procedure; anesthesia is then billed once for the longer session. Together the room and anesthesia benchmark is ${K.usd(withLipo.combined.total)}, but the default liposuction time on this site, taken from abdominal series, is longer than a chest liposuction is likely to be, so that figure leans high on anesthesia.</p>
${h.table(['Line', 'Excision alone', 'With liposuction'], [
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(withLipo.combined.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(withLipo.combined.facilityAmount)],
    ['Room and anesthesia', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(withLipo.combined.total)}</strong>`],
  ], 'National Medicare rates, 2026; the surgeon fee for either option comes from your quote.', ['l', 'r', 'r'])}
${h.mini('combo', { t: 'Excision with liposuction', p: ['mx'], d: { a: 'gynecomastia', b: 'lipo', c: 'none' } })}

<h2>When a health plan might pay</h2>
<p>Gynecomastia surgery sits close to the line between cosmetic and medical. Plans and Medicare exclude operations done to change appearance, which is the case of most male breast reductions; some plans cover it when a doctor documents a cause or symptoms that meet the plan's written criteria, and only after prior approval. The ${h.a('cosmetic-surgery-insurance', 'insurance page')} explains how that decision works. The Internal Revenue Service treats cosmetic surgery as not deductible, as the same page explains, unless it corrects a deformity of the kinds it lists.</p>

<h2>Paying for it</h2>
<p>The room and anesthesia benchmark spread over twelve months at the Federal Reserve's average personal loan rate of ${K.pct(K.P.credit.personalLoan24 / 100, 2)} would cost ${K.usd(loan.monthly)} a month, before the surgeon's fee. Phoenix comes to ${K.usd(phx.total)} and Chicago to ${K.usd(chi.total)} for those two lines; the surgeon's fee, which no public file measures by city, is where real quotes differ most between them.</p>
`,
  faqs: [
    { q: 'How much does gynecomastia surgery cost in 2026?', a: `The room and anesthesia come to about ${K.usd(a.total)} at national rates: anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 19300. With chest liposuction in the same session, they rise to about ${K.usd(withLipo.combined.total)}. The surgeon's fee comes on top, from your quote.` },
    { q: 'Does insurance cover male breast reduction?', a: 'Rarely when it is done for appearance, which plans and Medicare exclude. Some plans cover it when a doctor documents a medical cause or symptoms that meet the plan’s written criteria and the plan approves it in advance. Without that approval in writing, assume you will pay the whole bill yourself.' },
    { q: 'Why is the anesthesia line so small for gynecomastia surgery?', a: `CMS records a median of ${Math.round(a.minutes)} minutes for the operation, and the anesthesia code used carries ${a.anesthesia.baseUnits} base units, so the line comes to ${K.usd(a.anesthesiaAmount)} at the 2026 national factor. A private anesthesia group sets its own rate, usually above Medicare’s, so ask for it before the day.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'gynecomastia' },
  related: ['liposuction-cost', 'cosmetic-surgery-insurance', 'combined-procedures', 'breast-lift-cost'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cfr_416_172', 'cfr_411_15'],
});
