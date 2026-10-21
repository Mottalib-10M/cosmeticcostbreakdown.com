import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('facelift');
const hp = K.est('facelift', 'us', 'hopd');
const withEyes = K.combine(['facelift', 'eyelid_upper', 'eyelid_lower']);
const withBrow = K.combine(['facelift', 'brow_lift']);
const four = K.anes('facelift', 240).total;
const atl = K.est('facelift', 'atlanta');
const sf = K.est('facelift', 'san-francisco');

export default defineGuide({
  id: 'facelift-cost',
  group: 'face',
  order: 11,
  slug: 'facelift-cost',
  nav: 'Facelift cost',
  card: 'A rhytidectomy of the cheek, chin and neck: the room and anesthesia lines, alone or with the eyelids or brow.',
  title: 'Facelift Cost 2026: Anesthesia, Operating Room, Your Quote',
  description: 'Facelift cost in 2026: anesthesia and operating room at 2026 Medicare rates, alone or with eyelid or brow surgery, in 26 US metros, before the surgeon fee.',
  h1: 'Facelift cost: the room, the anesthesia and the surgeon you are quoted',
  intro: 'A facelift of the cheeks, jaw and neck, priced line by line; the two lines public files cover are worked out, the surgeon line comes from your quote.',
  resume: `A facelift comes to a room and anesthesia benchmark of ${K.usd(a.total)} at national rates in 2026, before the surgeon's fee. The room is priced from CPT 15828, a rhytidectomy of the cheek, chin and neck, which Medicare pays a surgery center ${K.usd(a.facilityAmount)} and a hospital outpatient department ${K.usd(hp.facilityAmount)}. CMS records no operating time for this code, so the anesthesia default is the mean of ${Math.round(a.minutes)} minutes reported in a published series of facelifts, which gives ${K.usd(a.anesthesiaAmount)} at the 2026 national factor. The surgeon's fee is set by each practice and no public file publishes it, so the calculator adds it only when you enter the figure from your own quote. Facelifts are often combined with eyelid or brow surgery; adding both eyelids brings the room and anesthesia benchmark to ${K.usd(withEyes.combined.total)}.`,
  body: (h) => `
<h2>What a facelift is billed as</h2>
<p>The ${h.src('medlineplus_facelift', 'MedlinePlus page on facelift')} describes incisions from the temples to behind the ear and the lower scalp, lifting of the deeper layer called the SMAS, removal of loose skin and sometimes liposuction of the neck and jowls. Several codes describe facelifts by region; CPT 15828 covers the cheek, chin and neck, the common full operation, and Medicare pays it at the same surgery center rate as liposuction of the trunk, ${K.usd(K.R.cpt['15828'].asc.rate)}. A neck lift alone has a code of its own, but CMS records no time for it and the site does not price it.</p>
${h.table(['Line', 'Amount', 'What sets it'], [
    ['Anesthesia', K.usd(a.anesthesiaAmount), `${a.anesthesia.baseUnits} base units + ${K.dec(a.anesthesia.timeUnits, 1)} time units`],
    ['Room, surgery center', K.usd(a.facilityAmount), 'Addendum AA, CPT 15828'],
    ['Room, hospital department', K.usd(hp.facilityAmount), 'Addendum B, CPT 15828'],
    ["Surgeon's fee", 'your quote', 'Set by the practice, no public file'],
  ], `National rates. Anesthesia for ${Math.round(a.minutes)} minutes (${h.src('study_facelift', 'published series')}).`, ['l', 'r', 'l'])}

<h2>Anesthesia time</h2>
<p>MedlinePlus explains that a facelift is done under conscious sedation or general anesthesia. The time default comes from a ${h.src('study_facelift', 'series published in Aesthetic Surgery Journal Open Forum')}; operations with neck work or combined procedures run longer. Four hours of anesthesia would cost ${K.usd(four)} at the national factor, so the length of the session is the main thing that moves this line between two quotes.</p>
${h.mini('combo', { t: 'Facelift with eyelids or brow', p: ['b', 'c'], d: { a: 'facelift', b: 'eyelid_upper', c: 'eyelid_lower' } })}

<h2>Combined with the eyelids or the brow</h2>
<p>MedlinePlus notes that a facelift can be done with nose reshaping, a forehead lift or eyelid surgery. In a surgery center the added codes are paid at half rate and anesthesia is billed once: the room and anesthesia for a facelift with both eyelids come to ${K.usd(withEyes.combined.total)}, for a facelift with a brow lift to ${K.usd(withBrow.combined.total)}. The surgeon prices the combined work as he or she sees fit; ask for that fee as one figure for the whole session.</p>

<h2>Metro areas</h2>
<p>The room and anesthesia come to ${K.usd(atl.total)} in Atlanta and ${K.usd(sf.total)} in San Francisco. Whatever separates two real quotes beyond that gap sits in the surgeon's line or in a private facility's own prices, neither of which any public file gives by city.</p>
`,
  faqs: [
    { q: 'How much does a facelift cost in 2026?', a: `The room and anesthesia come to about ${K.usd(a.total)} at national rates: anesthesia of ${K.usd(a.anesthesiaAmount)} for about ${Math.round(a.minutes)} minutes and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 15828. The surgeon's fee comes on top; it is set by each practice, so only your quote gives it.` },
    { q: 'Why is the room for a facelift not more expensive?', a: `Medicare pays a surgery center the same rate for CPT 15828 as for liposuction of the trunk, ${K.usd(a.facilityAmount)} at national rates in 2026. The room and anesthesia together come to ${K.usd(a.facilityAmount + a.anesthesiaAmount)}. Most of what a facelift quote adds above that figure is the surgeon's own fee and the facility's private markup.` },
    { q: 'How much does a facelift with eyelid surgery cost?', a: `For the room and anesthesia, a facelift with upper and lower eyelid surgery in one session comes to ${K.usd(withEyes.combined.total)} at national rates: one anesthesia session and the room with the added codes at half rate. The surgeon's fee for the three operations comes on top and is usually quoted as one figure for the session.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'facelift' },
  related: ['eyelid-surgery-cost', 'brow-lift-cost', 'combined-procedures', 'anesthesia-fee'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'study_facelift', 'medlineplus_facelift'],
});
