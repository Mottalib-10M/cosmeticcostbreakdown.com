import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const rows = K.PROC_IDS.map((id) => {
  const f = K.facility(id), g = K.facility(id, 'us', 'hopd');
  const c = K.PR(id).codes.map((x) => x.cpt);
  return { id, a: f.total, hp: g.total, st: c.map((x) => K.R.cpt[x].opps.status).join(' + ') };
}).sort((x, y) => (y.hp - y.a) - (x.hp - x.a));
const byRatio = rows.slice().sort((x, y) => y.hp / y.a - x.hp / x.a);
const big = byRatio[0], small = byRatio[byRatio.length - 1];
const la = K.M('los-angeles');
const tt = K.facility('tummy_tuck'), tth = K.facility('tummy_tuck', 'us', 'hopd');
const ttla = K.facility('tummy_tuck', 'los-angeles'), ttlah = K.facility('tummy_tuck', 'los-angeles', 'hopd');

export default defineGuide({
  id: 'surgery-center-vs-hospital',
  group: 'bill',
  order: 18,
  slug: 'surgery-center-vs-hospital-cost',
  nav: 'Surgery center or hospital',
  card: 'The operating room line in a surgery center and in a hospital department, code by code.',
  title: 'Surgery Center vs Hospital Cost 2026: Plastic Surgery Fees',
  description: 'Surgery center vs hospital cost in 2026 for plastic surgery: the operating room fee of each procedure at Medicare center and hospital outpatient rates, by city.',
  h1: 'Surgery center or hospital: what the operating room costs in each',
  intro: 'The same code is paid very differently in an ambulatory surgery center and in a hospital outpatient department; pick a procedure and a metro to compare.',
  resume: `The operating room is the line that changes most with the place of the operation. Medicare publishes two rates for each procedure code: one for an ambulatory surgery center, in Addendum AA, and one for a hospital outpatient department, in Addendum B. For cosmetic operations the hospital rate is always the higher of the two in the October 2026 files, from about ${K.dec(small.hp / small.a, 1)} times the center rate for ${K.PR(small.id).short.toLowerCase()} to ${K.dec(big.hp / big.a, 1)} times for ${K.PR(big.id).short.toLowerCase()}. A tummy tuck room costs ${K.usd(tt.total)} in a center and ${K.usd(tth.total)} in a hospital at national rates. The metro adjustment widens the gap in high-wage areas, because ${K.pct(K.P.rules.oppsLaborShare, 0)} of a hospital rate follows the local wage index against ${K.pct(K.P.rules.ascLaborShare, 0)} of a center rate. Private facilities set their own prices, but the direction is usually the same.`,
  body: (h) => `
<h2>Two payment systems</h2>
<p>Surgery centers and hospitals are paid under different Medicare systems. A center receives the rate of ${h.src('cms_asc_addenda', 'Addendum AA')}, based on the hospital relative weights, as the file's payment indicators state, but multiplied by its own conversion factor of ${K.cents(K.P.rules.ascConversionFactor)} in 2026. A hospital receives the rate of the payment group of the code in ${h.src('cms_opps_b', 'Addendum B')}; when the code has status J1, the payment is comprehensive and packages everything else done that day. That is why combined operations cost little more in a hospital: the second procedure is often packaged.</p>
${h.table(['Procedure', 'Surgery center', 'Hospital', 'Hospital status', 'Ratio'], rows.map((r) => [K.PR(r.id).short, K.usd(r.a), K.usd(r.hp), r.st, `${K.dec(r.hp / r.a, 2)} x`]), 'National Medicare rates, October 2026; sorted by the dollar gap.', ['l', 'r', 'r', 'l', 'r'])}

<h2>The wage index</h2>
<p>Both rates are adjusted to the place with the FY 2026 wage index of its area, as the ${h.src('fr_opps_asc_2026', 'final rule for 2026')} sets out. Surgery centers use the index before the rural floor and reclassification, hospitals the final index. In Los Angeles the center index is ${K.dec(la.wiAsc, 4)} and the hospital index ${K.dec(la.wiHospital, 4)}, so a tummy tuck room there is ${K.usd(ttla.total)} in a center and ${K.usd(ttlah.total)} in a hospital. The ${h.a('cosmetic-surgery-cost-by-city', 'metro comparison')} shows every area.</p>
${h.mini('facility', { t: 'Center or hospital for your procedure', p: ['pr', 'mx'], d: { pr: 'rhinoplasty', mx: 'chicago' } })}

<h2>Office operating rooms</h2>
<p>Some plastic surgeons operate in an operating room inside their own office. Medicare publishes no facility rate for such a room for the codes priced here, which its surgery center file lists as procedures for centers and hospitals, so the practice sets the fee itself. A quote that names an office suite can be compared with the surgery center benchmark, which is the closer of the two. The choice between an office, a center and a hospital also depends on your health and the length of the operation, which the surgeon and anesthesia team weigh. The ${h.a('plastic-surgery-quote', 'quote page')} explains what to ask.</p>
`,
  faqs: [
    { q: 'Is plastic surgery cheaper in a surgery center than a hospital?', a: `At Medicare rates, yes, for every cosmetic procedure priced here. The October 2026 hospital outpatient rate runs from ${K.dec(small.hp / small.a, 1)} to ${K.dec(big.hp / big.a, 1)} times the surgery center rate for the same code. A tummy tuck room is ${K.usd(tt.total)} in a center and ${K.usd(tth.total)} in a hospital at national rates.` },
    { q: 'Why does the hospital charge more for the same operation?', a: 'Hospitals and surgery centers are paid under different Medicare systems. Hospital rates are built from hospital costs, and many cosmetic codes are paid there as comprehensive packages for the whole day. Surgery center rates use the same relative weights as the hospital system but a lower conversion factor, so they come out lower.' },
    { q: 'What is an office operating room?', a: 'An operating room inside a surgeon’s practice, which may be accredited by a private body. Medicare publishes no facility rate for the cosmetic codes done there, so the practice sets the price. The surgery center benchmark on this site is the closest public reference to compare such a facility fee with.' },
  ],
  tool: 'facility',
  toolArg: { pr: 'tummy_tuck' },
  related: ['anesthesia-fee', 'combined-procedures', 'plastic-surgery-quote', 'cosmetic-surgery-cost-by-city'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_wage_index', 'fr_opps_asc_2026', 'cfr_416_172'],
});
