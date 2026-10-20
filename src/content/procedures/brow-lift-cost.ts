import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('brow_lift');
const hp = K.est('brow_lift', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const withUp = K.combine(['brow_lift', 'eyelid_upper']);
const tox = K.P.botox.asps2023;
const yearsOfToxin = a.total / tox;
const orl = K.est('brow_lift', 'orlando');
const mpls = K.est('brow_lift', 'minneapolis');

export default defineGuide({
  id: 'brow-lift-cost',
  group: 'face',
  order: 13,
  slug: 'brow-lift-cost',
  nav: 'Brow lift cost',
  card: 'Forehead lift: the smallest room rate of the face procedures, often done with the upper eyelids.',
  title: 'Brow Lift Cost 2026: Forehead Lift Surgeon, Anesthesia, Room',
  description: 'Brow lift cost in 2026: forehead lift surgeon fee average, anesthesia and operating room at 2026 Medicare rates, alone or with upper eyelid surgery, by metro.',
  h1: 'Brow lift cost: the forehead lift and its three lines',
  intro: 'A brow lift raises sagging brows and smooths the forehead; it is cheap on the room line and often paired with the upper eyelids.',
  resume: `A brow lift, also called a forehead lift, comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr}, according to the surgeons' society, which excludes anesthesia and the operating room. The room is priced from CPT 67900, repair of brow ptosis, which Medicare pays a surgery center only ${K.usd(a.facilityAmount)}, the lowest facility rate of the face procedures priced here, and a hospital outpatient department ${K.usd(hp.facilityAmount)}. Anesthesia comes to ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records. MedlinePlus adds that the operation may be done with eyelid surgery; in one session the benchmark for a brow lift with upper eyelid surgery is ${K.usd(withUp.combined.total)}, the eyelid room being paid at half rate and the anesthesia billed only once.`,
  body: (h) => `
<h2>What the code describes</h2>
<p>The ${h.src('medlineplus_brow', 'MedlinePlus page on forehead lift')} describes an operation to correct sagging of the forehead skin, the eyebrows and the upper eyelids, done through an incision at the hairline or through several small cuts with an endoscope, usually without an overnight stay and often under local anesthesia with medicine to relax. The site prices it with CPT 67900. Its Medicare surgery center rate, ${K.usd(K.R.cpt['67900'].asc.rate)}, is lower than for eyelid surgery, though CMS records a longer operation, ${Math.round(a.minutes)} minutes against ${Math.round(K.min('eyelid_upper'))}.</p>
${h.table(['Line', 'Brow lift', 'Brow lift with upper eyelids'], [
    ["Surgeons' fees, survey averages", K.usd(a.surgeon), K.usd(withUp.combined.surgeon)],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(withUp.combined.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(withUp.combined.facilityAmount)],
    ['Benchmark total', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(withUp.combined.total)}</strong>`],
  ], 'National Medicare rates. Combined: the lower-rated code at half rate, one anesthesia session.', ['l', 'r', 'r'])}

<h2>Brow lift or injections</h2>
<p>Some people weigh a brow lift against regular injections of a neuromodulator in the forehead and between the brows. The two are different treatments with different effects, a choice for a surgeon or dermatologist. On cost alone, the survey average for one session of botulinum toxin was ${K.usd(tox)} in ${yr}, so the brow lift benchmark equals about ${Math.round(yearsOfToxin)} treatment sessions. The ${h.a('botox-cost', 'Botox page')} prices those sessions by area and units.</p>
${h.mini('botox', { t: 'The cost of forehead injections', p: ['ar', 'pu'], d: { ar: 'forehead' } })}

<h2>Coverage and metro areas</h2>
<p>When drooping brows block vision, a health plan may treat the repair as medically necessary, in the same way as for upper eyelids, after an eye examination and prior approval. Done for appearance it is cosmetic and excluded. The benchmark comes to ${K.usd(orl.total)} in Orlando and ${K.usd(mpls.total)} in Minneapolis.</p>
`,
  faqs: [
    { q: 'How much does a brow lift cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 67900. The hospital outpatient rate for the same room is ${K.usd(hp.facilityAmount)}.` },
    { q: 'Is a brow lift cheaper with eyelid surgery at the same time?', a: `Cheaper than two separate operations, yes. In one session the eyelid code is paid at half rate in a surgery center and anesthesia is billed once, so the pair comes to ${K.usd(withUp.combined.total)} against ${K.usd(a.total + K.est('eyelid_upper').total)} separately at national rates. The surgeon's own combined fee is the part that varies most.` },
    { q: 'How does a brow lift compare with Botox on cost?', a: `The brow lift benchmark of ${K.usd(a.total)} equals about ${Math.round(yearsOfToxin)} sessions at the ${yr} survey average of ${K.usd(tox)} per botulinum toxin treatment. They are different treatments with different effects and durations, a choice to make with a surgeon or dermatologist rather than on price.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'brow_lift' },
  related: ['eyelid-surgery-cost', 'botox-cost', 'facelift-cost', 'cosmetic-surgery-insurance'],
  sources: ['asps_brow_lift', 'asps_botulinum_toxin', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'medlineplus_brow'],
});
