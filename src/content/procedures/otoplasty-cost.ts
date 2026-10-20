import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('otoplasty');
const hp = K.est('otoplasty', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const local = a.total - a.anesthesiaAmount;
const phl = K.est('otoplasty', 'philadelphia');
const slc = K.est('otoplasty', 'salt-lake-city');
const loan = K.loan(a.total, K.P.credit.personalLoan24, 12);

export default defineGuide({
  id: 'otoplasty-cost',
  group: 'face',
  order: 15,
  slug: 'otoplasty-cost',
  nav: 'Otoplasty cost',
  card: 'Ear pinning: a two-hour operation, often for children, priced line by line.',
  title: 'Otoplasty Cost 2026: Ear Pinning Surgeon, Anesthesia and OR',
  description: 'Otoplasty cost in 2026: ear pinning surgeon fee average, anesthesia and operating room at 2026 Medicare rates, for adults and children, in 26 US metro areas.',
  h1: 'Otoplasty cost: what ear pinning adds up to',
  intro: 'Cosmetic ear surgery brings prominent ears closer to the head; MedlinePlus says it lasts about two hours, and general anesthesia is preferred in children.',
  resume: `Cosmetic ear surgery, or otoplasty, comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr}, according to the surgeons' society, which states that anesthesia and the operating room are excluded. The room is priced from CPT 69300, revision of the external ear, which Medicare pays a surgery center ${K.usd(a.facilityAmount)} and a hospital outpatient department ${K.usd(hp.facilityAmount)}. Anesthesia comes to ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records, which matches the duration of about two hours given by MedlinePlus. MedlinePlus adds that the operation can be done under local anesthesia, which brings the bill closer to ${K.usd(local)}, and that general anesthesia is the preferred method in children, for whom the full anesthesia line therefore applies and a parent's time off work is part of the cost.`,
  body: (h) => `
<h2>One code, both ears</h2>
<p>CPT 69300 describes one ear. When both ears are treated, the facility bills the code for each side, and the second is subject to the reduction for multiple procedures. The site counts the code once, so its room line is a floor for an operation on both ears; the calculator's facility quote field accepts the amount on your estimate. The ${h.src('medlineplus_ear', 'MedlinePlus page on cosmetic ear surgery')} describes the usual technique: a cut behind the ear, the cartilage folded to bring the ear closer to the head, stitches to close.</p>
${h.table(['Line', 'Amount', 'Note'], [
    ["Surgeon's fee", K.usd(a.surgeon), `Survey average, ${yr}`],
    ['Anesthesia', K.usd(a.anesthesiaAmount), `${a.anesthesia.baseUnits} base units for procedures on the external ear + ${K.dec(a.anesthesia.timeUnits, 1)} time units`],
    ['Room, surgery center', K.usd(a.facilityAmount), 'CPT 69300, one ear'],
    ['Room, hospital department', K.usd(hp.facilityAmount), 'Comprehensive payment'],
  ], 'National Medicare rates, October 2026.', ['l', 'r', 'l'])}

<h2>Children</h2>
<p>MedlinePlus says the operation can be done in children from about five or six years old, when ear growth is almost finished, and earlier when the ears are very misshapen. For a child, general anesthesia is the preferred method, so the anesthesia line applies in full, and a parent's time off work is part of the cost. Health plans usually treat ear pinning for prominent ears as cosmetic; a plan may cover reconstruction of an ear deformed by a birth defect or an injury, which is a different operation with its own codes, after prior approval.</p>
${h.mini('recovery', { t: 'Days off for a parent', p: ['do', 'dp'], d: { do: 5 } })}

<h2>Metro areas and payment</h2>
<p>Philadelphia comes to ${K.usd(phl.total)} and Salt Lake City to ${K.usd(slc.total)}. Spread over a year at the Federal Reserve's average personal loan rate, the national benchmark would cost ${K.usd(loan.monthly)} a month; the ${h.a('plastic-surgery-financing', 'financing page')} compares the options.</p>
`,
  faqs: [
    { q: 'How much does otoplasty cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} for about two hours and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 69300. Under local anesthesia the bill drops by the anesthesia line, and treating both ears can add to the room.` },
    { q: 'At what age can a child have ear pinning?', a: 'MedlinePlus says the procedure can be done after a child is five or six years old, when ear growth is almost finished, and earlier if the ears are very disfigured. General anesthesia is the preferred method for children. The timing for a given child is a decision for the surgeon and the family, not a cost question.' },
    { q: 'Does insurance cover otoplasty?', a: 'Usually not when the goal is to pin back prominent ears, which plans treat as cosmetic. Repair of an ear deformed by a birth defect or an injury may be covered as reconstruction, with prior approval and the plan’s own criteria. Ask the plan in writing before scheduling, especially for a child.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'otoplasty' },
  related: ['rhinoplasty-cost', 'cosmetic-surgery-insurance', 'recovery-time-off', 'anesthesia-fee'],
  sources: ['asps_ear_surgery', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026', 'medlineplus_ear'],
});
