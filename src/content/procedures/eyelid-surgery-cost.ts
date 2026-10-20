import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const up = K.est('eyelid_upper');
const low = K.est('eyelid_lower');
const uph = K.est('eyelid_upper', 'us', 'hopd');
const both = K.combine(['eyelid_upper', 'eyelid_lower']);
const yr = K.P.surgeonFee.year;
const den = K.est('eyelid_upper', 'denver');
const mia = K.est('eyelid_upper', 'miami');

export default defineGuide({
  id: 'eyelid-surgery-cost',
  group: 'face',
  order: 12,
  slug: 'eyelid-surgery-cost',
  nav: 'Eyelid surgery cost',
  card: 'Upper and lower blepharoplasty: two survey averages, one room rate, and the line between cosmetic and vision.',
  title: 'Eyelid Surgery Cost 2026: Upper and Lower Blepharoplasty',
  description: 'Eyelid surgery cost in 2026: upper and lower blepharoplasty surgeon fee averages, anesthesia and operating room at 2026 Medicare rates, and when vision counts.',
  h1: 'Eyelid surgery cost: upper lids, lower lids, or both',
  intro: 'Upper and lower blepharoplasty each have their own code and their own survey average; done together, the room and anesthesia lines shrink.',
  resume: `Upper eyelid surgery comes to a benchmark of ${K.usd(up.total)} at national rates in 2026 and lower eyelid surgery to ${K.usd(low.total)}. The surgeons' society reported average fees of ${K.usd(up.surgeon)} for an upper blepharoplasty and ${K.usd(low.surgeon)} for a lower one in ${yr}, excluding anesthesia and the operating room. Medicare pays a surgery center the same rate for both codes, CPT 15822 for the upper lids and 15820 for the lower, ${K.usd(up.facilityAmount)}, and a hospital outpatient department ${K.usd(uph.facilityAmount)}. Anesthesia is short: about ${Math.round(up.minutes)} minutes in the CMS file for the upper lids, ${K.usd(up.anesthesiaAmount)} at the 2026 national factor. Both procedures in one session come to ${K.usd(both.combined.total)}, the lower lids' room paid at half rate. MedlinePlus describes the operation as done in a surgeon's office or a surgery center with numbing medicine injected around the eye, in which case a separate anesthesia bill may not exist.`,
  body: (h) => `
<h2>Two codes, one rate</h2>
<p>CMS gives the two operations the same facility rate and almost the same time, ${Math.round(up.minutes)} minutes for the upper lids and ${Math.round(low.minutes)} for the lower. What separates them on the bill is the surgeon's fee, ${K.usd(low.surgeon - up.surgeon)} higher on average for the lower lids. The ${h.src('medlineplus_eyelid', 'MedlinePlus page on eyelid lift')} describes the operation as removing loose skin and extra fat through small cuts in the natural creases, and adds that it does not remove wrinkles around the eyes, lift sagging eyebrows or get rid of dark circles, which is worth knowing before comparing it with a brow lift.</p>
${h.table(['', 'Upper lids', 'Lower lids', 'Both, one session'], [
    ["Surgeon's fee, survey average", K.usd(up.surgeon), K.usd(low.surgeon), K.usd(both.combined.surgeon)],
    ['Anesthesia', K.usd(up.anesthesiaAmount), K.usd(low.anesthesiaAmount), K.usd(both.combined.anesthesiaAmount)],
    ['Room, surgery center', K.usd(up.facilityAmount), K.usd(low.facilityAmount), K.usd(both.combined.facilityAmount)],
    ['Benchmark total', `<strong>${K.usd(up.total)}</strong>`, `<strong>${K.usd(low.total)}</strong>`, `<strong>${K.usd(both.combined.total)}</strong>`],
  ], 'National Medicare rates, October 2026.', ['l', 'r', 'r', 'r'])}

<h2>When it is about vision</h2>
<p>MedlinePlus explains that an eyelid lift is needed when drooping lids reduce vision, and that an eye doctor may test the visual field before surgery; done to improve appearance, it is cosmetic surgery. Health plans and Medicare follow the same line. When the upper lids block vision and the plan approves the operation, it becomes a covered procedure, and the patient pays the plan's usual share instead of this bill. The ${h.a('cosmetic-surgery-insurance', 'insurance page')} explains the approval process.</p>
${h.mini('cost', { t: 'Eyelid surgery in your metro area', p: ['pr', 'mx'], d: { pr: 'eyelid_lower' } })}

<h2>Metro areas and added procedures</h2>
<p>Upper lid surgery comes to ${K.usd(den.total)} in Denver and ${K.usd(mia.total)} in Miami. Eyelid surgery is often added to a facelift or a brow lift, and the ${h.a('facelift-cost', 'facelift page')} prices that combination.</p>
`,
  faqs: [
    { q: 'How much does eyelid surgery cost in 2026?', a: `At national rates, about ${K.usd(up.total)} for the upper lids and ${K.usd(low.total)} for the lower lids, and ${K.usd(both.combined.total)} for both in one session. Each figure adds the surgeon's ${yr} survey average, anesthesia at the 2026 Medicare rate and a surgery center room, ${K.usd(up.facilityAmount)} at Medicare's rate for either code.` },
    { q: 'Is lower eyelid surgery more expensive than upper?', a: `Slightly. The surgeon's average fee was ${K.usd(low.surgeon)} for the lower lids and ${K.usd(up.surgeon)} for the upper lids in ${yr}. Medicare pays the same facility rate for the two codes and records nearly the same time, so the room and anesthesia lines barely differ.` },
    { q: 'Will insurance pay for eyelid surgery?', a: 'Only when it is medically necessary, typically when drooping upper lids reduce vision and an eye examination documents it, and the plan approves the operation in advance. Eyelid surgery done to look younger or less tired is cosmetic, and plans and Medicare exclude it. Ask the plan for its written criteria before the visual field test.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'eyelid_upper' },
  related: ['brow-lift-cost', 'facelift-cost', 'cosmetic-surgery-insurance', 'botox-cost'],
  sources: ['asps_eyelid_surgery', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026', 'medlineplus_eyelid'],
});
