import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('facelift');
const hp = K.est('facelift', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const surgShare = a.surgeon / a.total;
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
  card: 'One of the highest surgeon fees of the survey, a modest room, and the eyelids or brow often added.',
  title: 'Facelift Cost 2026: Surgeon Fee, Anesthesia, Operating Room',
  description: 'Facelift cost in 2026: the surgeon fee average, anesthesia and operating room at 2026 Medicare rates, alone or with eyelid or brow surgery, in 26 US metros.',
  h1: 'Facelift cost: the surgeon is most of the bill',
  intro: 'A facelift of the cheeks, jaw and neck, priced line by line; the surgeon line outweighs the other two by far.',
  resume: `A facelift comes to a benchmark of ${K.usd(a.total)} at national rates in 2026, and ${K.pct(surgShare, 0)} of that is the surgeon: an average fee of ${K.usd(a.surgeon)} in ${yr}, among the highest the surgeons' society reports, and a figure it says excludes anesthesia and facilities. The room is priced from CPT 15828, a rhytidectomy of the cheek, chin and neck, which Medicare pays a surgery center ${K.usd(a.facilityAmount)} and a hospital outpatient department ${K.usd(hp.facilityAmount)}. CMS records no operating time for this code, so the anesthesia default is the mean of ${Math.round(a.minutes)} minutes reported in a published series of facelifts, which gives ${K.usd(a.anesthesiaAmount)} at the 2026 national factor. Facelifts are often combined with eyelid or brow surgery; adding both eyelids brings the benchmark to ${K.usd(withEyes.combined.total)}.`,
  body: (h) => `
<h2>What a facelift is billed as</h2>
<p>The ${h.src('medlineplus_facelift', 'MedlinePlus page on facelift')} describes incisions from the temples to behind the ear and the lower scalp, lifting of the deeper layer called the SMAS, removal of loose skin and sometimes liposuction of the neck and jowls. Several codes describe facelifts by region; CPT 15828 covers the cheek, chin and neck, the common full operation, and Medicare pays it at the same surgery center rate as liposuction of the trunk, ${K.usd(K.R.cpt['15828'].asc.rate)}. A neck lift alone has a code of its own, but CMS records no time for it and the site does not price it.</p>
${h.table(['Line', 'Amount', 'Share of the benchmark'], [
    ["Surgeon's fee", K.usd(a.surgeon), K.pct(a.surgeon / a.total, 0)],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.pct(a.anesthesiaAmount / a.total, 0)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.pct(a.facilityAmount / a.total, 0)],
  ], `National rates. Anesthesia for ${Math.round(a.minutes)} minutes (${h.src('study_facelift', 'published series')}).`, ['l', 'r', 'r'])}

<h2>Anesthesia time</h2>
<p>MedlinePlus explains that a facelift is done under conscious sedation or general anesthesia. The time default comes from a ${h.src('study_facelift', 'series published in Aesthetic Surgery Journal Open Forum')}; operations with neck work or combined procedures run longer. Four hours of anesthesia would cost ${K.usd(four)} at the national factor, still small next to the surgeon.</p>
${h.mini('combo', { t: 'Facelift with eyelids or brow', p: ['b', 'c'], d: { a: 'facelift', b: 'eyelid_upper', c: 'eyelid_lower' } })}

<h2>Combined with the eyelids or the brow</h2>
<p>MedlinePlus notes that a facelift can be done with nose reshaping, a forehead lift or eyelid surgery. In a surgery center the added codes are paid at half rate and anesthesia is billed once: a facelift with both eyelids comes to ${K.usd(withEyes.combined.total)}, a facelift with a brow lift to ${K.usd(withBrow.combined.total)}. The surgeon's line in those figures adds full survey averages, which a surgeon rarely charges for work done in the same session.</p>

<h2>Metro areas</h2>
<p>Atlanta comes to ${K.usd(atl.total)} and San Francisco to ${K.usd(sf.total)}. Whatever separates two real quotes beyond that gap sits in the surgeon's line, which no public file gives by city.</p>
`,
  faqs: [
    { q: 'How much does a facelift cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} for about ${Math.round(a.minutes)} minutes and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 15828. Private quotes in large cities are usually higher on the surgeon's line.` },
    { q: 'Why is a facelift so expensive?', a: `Mostly because of the surgeon's fee, ${K.usd(a.surgeon)} on average in ${yr}, one of the highest of the survey. The room and anesthesia together come to ${K.usd(a.facilityAmount + a.anesthesiaAmount)} at Medicare rates, which is modest: Medicare pays the facility for a facelift the same rate as for liposuction of the trunk.` },
    { q: 'How much does a facelift with eyelid surgery cost?', a: `A facelift with upper and lower eyelid surgery in one session comes to a benchmark of ${K.usd(withEyes.combined.total)} at national rates, adding the three survey averages for the surgeon, one anesthesia session and the room with the added codes at half rate. A surgeon's combined fee is usually below the sum of the separate averages.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'facelift' },
  related: ['eyelid-surgery-cost', 'brow-lift-cost', 'combined-procedures', 'anesthesia-fee'],
  sources: ['asps_facelift', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'study_facelift', 'medlineplus_facelift'],
});
