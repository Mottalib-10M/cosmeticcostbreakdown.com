import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('brow_lift');
const hp = K.est('brow_lift', 'us', 'hopd');
const withUp = K.combine(['brow_lift', 'eyelid_upper']);
const fh = K.P.botox.areas.forehead;
const toxForehead = fh.units * K.R.asp.J0585.limit;
const orl = K.est('brow_lift', 'orlando');
const mpls = K.est('brow_lift', 'minneapolis');

export default defineGuide({
  id: 'brow-lift-cost',
  group: 'face',
  order: 13,
  slug: 'brow-lift-cost',
  nav: 'Brow lift cost',
  card: 'Forehead lift: the smallest room rate of the face procedures, often done with the upper eyelids.',
  title: 'Brow Lift Cost 2026: Forehead Lift Anesthesia and Room Fees',
  description: 'Brow lift cost in 2026: forehead lift anesthesia and operating room at 2026 Medicare rates, alone or with upper eyelid surgery, by metro, before the surgeon fee',
  h1: 'Brow lift cost: the forehead lift line by line',
  intro: 'A brow lift raises sagging brows and smooths the forehead; it is cheap on the room line and often paired with the upper eyelids.',
  resume: `A brow lift, also called a forehead lift, comes to a room and anesthesia benchmark of ${K.usd(a.total)} at national rates in 2026, before the surgeon's fee. The room is priced from CPT 67900, repair of brow ptosis, which Medicare pays a surgery center only ${K.usd(a.facilityAmount)}, the lowest facility rate of the face procedures priced here, and a hospital outpatient department ${K.usd(hp.facilityAmount)}. Anesthesia comes to ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records. The surgeon's fee is set by each practice and no public file publishes it, so it enters the calculator only from your own quote. MedlinePlus adds that the operation may be done with eyelid surgery; in one session the room and anesthesia for a brow lift with upper eyelid surgery come to ${K.usd(withUp.combined.total)}, the eyelid room being paid at half rate and the anesthesia billed only once.`,
  body: (h) => `
<h2>What the code describes</h2>
<p>The ${h.src('medlineplus_brow', 'MedlinePlus page on forehead lift')} describes an operation to correct sagging of the forehead skin, the eyebrows and the upper eyelids, done through an incision at the hairline or through several small cuts with an endoscope, usually without an overnight stay and often under local anesthesia with medicine to relax. The site prices it with CPT 67900. Its Medicare surgery center rate, ${K.usd(K.R.cpt['67900'].asc.rate)}, is lower than for eyelid surgery, though CMS records a longer operation, ${Math.round(a.minutes)} minutes against ${Math.round(K.min('eyelid_upper'))}.</p>
${h.table(['Line', 'Brow lift', 'Brow lift with upper eyelids'], [
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(withUp.combined.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(withUp.combined.facilityAmount)],
    ['Room and anesthesia', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(withUp.combined.total)}</strong>`],
    ["Surgeon's fee", 'your quote', 'your quote'],
  ], 'National Medicare rates. Combined: the lower-rated code at half rate, one anesthesia session.', ['l', 'r', 'r'])}

<h2>Brow lift or injections</h2>
<p>Some people weigh a brow lift against regular injections of a neuromodulator in the forehead and between the brows. The two are different treatments with different effects, a choice for a surgeon or dermatologist. On the product alone, the FDA label puts the forehead and frown lines together at ${fh.units} units, which cost ${K.usd(toxForehead)} at the October 2026 Medicare payment limit; the injector's fee comes on top and is set by each practice. The ${h.a('botox-cost', 'Botox page')} prices the toxin by area and units and compares it with the price per unit you are quoted.</p>
${h.mini('botox', { t: 'The cost of forehead injections', p: ['ar', 'pu'], d: { ar: 'forehead' } })}

<h2>Coverage and metro areas</h2>
<p>When drooping brows block vision, a health plan may treat the repair as medically necessary, in the same way as for upper eyelids, after an eye examination and prior approval. Done for appearance it is cosmetic and excluded. The room and anesthesia come to ${K.usd(orl.total)} in Orlando and ${K.usd(mpls.total)} in Minneapolis.</p>
`,
  faqs: [
    { q: 'How much does a brow lift cost in 2026?', a: `The room and anesthesia come to about ${K.usd(a.total)} at national rates: anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 67900. The hospital outpatient rate for the same room is ${K.usd(hp.facilityAmount)}. The surgeon's fee comes on top, from your quote.` },
    { q: 'Is a brow lift cheaper with eyelid surgery at the same time?', a: `Cheaper than two separate operations, yes. In one session the eyelid code is paid at half rate in a surgery center and anesthesia is billed once, so the room and anesthesia for the pair come to ${K.usd(withUp.combined.total)} against ${K.usd(a.total + K.est('eyelid_upper').total)} separately at national rates. The surgeon's own combined fee is the part that varies most.` },
    { q: 'How does a brow lift compare with Botox on cost?', a: `The toxin for the forehead and frown lines, ${fh.units} units on the FDA label, costs ${K.usd(toxForehead)} at the 2026 Medicare payment limit, before the injector's fee. A brow lift's room and anesthesia alone come to ${K.usd(a.total)}. They are different treatments with different effects and durations, a choice for a surgeon or dermatologist rather than price.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'brow_lift' },
  related: ['eyelid-surgery-cost', 'botox-cost', 'facelift-cost', 'cosmetic-surgery-insurance'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'medlineplus_brow'],
});
