import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('tummy_tuck');
const hp = K.est('tummy_tuck', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const all = K.across('tummy_tuck');
const hi = all[0], lo = all[all.length - 1];
const ny = K.est('tummy_tuck', 'new-york');
const lipoAdd = K.combine(['tummy_tuck', 'lipo']);
const extra30 = K.anes('tummy_tuck', a.minutes + 30).total - a.anesthesiaAmount;

export default defineGuide({
  id: 'tummy-tuck-cost',
  group: 'body',
  order: 1,
  slug: 'tummy-tuck-cost',
  nav: 'Tummy tuck cost',
  card: 'Surgeon, anesthesia and operating room of a full abdominoplasty, for your metro area.',
  title: 'Tummy Tuck Cost 2026: Surgeon, Anesthesia and Room Fees',
  description: 'Tummy tuck cost in 2026 split into the surgeon fee, anesthesia and operating room, from 2026 Medicare rate files and the latest surgeon survey, by US metro.',
  h1: 'Tummy tuck cost: the three bills behind one abdominoplasty',
  intro: 'A full tummy tuck, priced as a surgeon, an anesthesia team and an operating room each bill it, for the metro area you choose.',
  resume: `A full tummy tuck adds up to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's fee is the largest part: ${K.usd(a.surgeon)}, the average reported for ${yr} by the members of the American Society of Plastic Surgeons, who state that it leaves out anesthesia and the operating room. Anesthesia comes to ${K.usd(a.anesthesiaAmount)}, which is ${a.anesthesia.baseUnits} base units for an operation on the lower abdominal wall plus ${K.dec(a.anesthesia.timeUnits, 1)} time units for the ${Math.round(a.minutes)} minutes CMS records for the procedure, at the 2026 Medicare factor. A surgery center's operating room is paid ${K.usd(a.facilityAmount)} by Medicare for code 15830, and a hospital outpatient department ${K.usd(hp.facilityAmount)}, so the setting alone moves the bill by ${K.usd(hp.facilityAmount - a.facilityAmount)}. Private facilities usually charge more than these Medicare amounts, which makes them a floor rather than a quote.`,
  body: (h) => `
<h2>What the code covers</h2>
<p>A full abdominoplasty removes loose skin and fat below the navel and usually tightens the abdominal muscles, as the ${h.src('medlineplus_abdominal', 'MedlinePlus page on abdominal wall surgery')} describes. Surgeons and facilities bill it under CPT 15830, whose short descriptor in the CMS files reads "${K.R.cpt['15830'].asc.label}". The muscle repair is part of the same operation for billing purposes. A mini tummy tuck, limited to the skin below the navel, has no separate code: practices price it themselves, usually below the full operation.</p>
${h.table(['Line', 'What sets it', 'National benchmark'], [
    ["Surgeon's fee", `Survey average, ${yr}`, K.usd(a.surgeon)],
    ['Anesthesia', `${a.anesthesia.baseUnits} base units (code ${K.PR('tummy_tuck').asa}) + ${K.dec(a.anesthesia.timeUnits, 1)} time units`, K.usd(a.anesthesiaAmount)],
    ['Operating room, surgery center', 'Addendum AA, CPT 15830', K.usd(a.facilityAmount)],
    ['Operating room, hospital department', `Addendum B, comprehensive APC ${K.R.cpt['15830'].opps.apc}`, K.usd(hp.facilityAmount)],
    ['Total with a surgery center', '', `<strong>${K.usd(a.total)}</strong>`],
  ], 'Medicare 2026 rates without local adjustment; surgeon: national average fee.', ['l', 'l', 'r'])}

<h2>Why the hospital line is so much higher</h2>
<p>In a hospital outpatient department, CPT 15830 carries status J1 in Addendum B: it is a comprehensive payment that packages everything done in the session, including supplies, recovery room time and minor procedures on the same day. The national rate for its group is ${K.usd(hp.facilityAmount)}, more than twice what a surgery center receives for the same code. Many cosmetic surgeons operate in an accredited surgery center, sometimes their own, and a quote that names a hospital should be read with that gap in mind. Where the operation happens is a medical decision as well as a financial one: patients with certain health conditions may be safer in a hospital, a point the surgeon and the anesthesia team settle.</p>
${h.mini('facility', { t: 'The room for a tummy tuck, center against hospital', p: ['mx'], d: { pr: 'tummy_tuck' } })}

<h2>Anesthesia time is where quotes differ</h2>
<p>Anesthesia is billed by the quarter hour on top of a fixed number of base units. CMS records a median of ${Math.round(a.minutes)} minutes of skin-to-skin time for this code; real anesthesia time also includes the minutes before the first incision and after the last stitch, so a real anesthesia bill is longer. MedlinePlus puts the whole operation at 2 to 6 hours; billed for four hours, the anesthesia line would be ${K.usd(K.anes('tummy_tuck', 240).total)} at the national factor. Each extra half hour adds ${K.usd(extra30)} at the national factor. Adding liposuction of the flanks, as many surgeons do, lengthens the session: the combined benchmark for the two procedures in one session is ${K.usd(lipoAdd.combined.total)}, with ${K.usd(lipoAdd.facilitySaved)} saved on the room because the second code is paid at half rate.</p>

<h2>The metro area</h2>
<p>Across the ${K.METROS.length} metro areas priced here, the benchmark runs from ${K.usd(lo.c.total)} in ${lo.m.name} to ${K.usd(hi.c.total)} in ${hi.m.name}; New York stands at ${K.usd(ny.total)}. The spread is narrow because only the room and the anesthesia move with local wages. Surgeons set their own fees, and the survey does not publish them by metro, so a quote above the benchmark in a large city usually differs on the surgeon's line.</p>
${h.mini('quote', { t: 'Check what a tummy tuck quote leaves for the surgeon', p: ['q', 'mx'], d: { pr: 'tummy_tuck', q: 14000 } })}

<h2>After the operation</h2>
<p>A tummy tuck is followed by a recovery period at home whose length the surgeon sets, with an elastic dressing over the abdomen and sometimes small drains, which MedlinePlus mentions. Those weeks cost money even when nothing is billed: unpaid days off work are part of the price. The calculator above adds them when you open its detailed fields; the ${h.a('recovery-time-off', 'page on time off work')} explains the figure. A ${h.a('mommy-makeover-cost', 'mommy makeover')} combines this operation with breast surgery, and the ${h.a('plastic-surgery-financing', 'financing page')} shows what spreading the bill over months costs.</p>
`,
  faqs: [
    { q: 'How much does a tummy tuck cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: ${K.usd(a.surgeon)} for the surgeon (survey average of ${yr}), ${K.usd(a.anesthesiaAmount)} for anesthesia and ${K.usd(a.facilityAmount)} for a surgery center's operating room at 2026 Medicare rates. In a hospital the room alone is ${K.usd(hp.facilityAmount)}. Private prices are usually higher.` },
    { q: 'Does the tummy tuck average fee include anesthesia?', a: `No. The survey's average of ${K.usd(a.surgeon)} for ${yr} covers the surgeon only, and the society that publishes it says that anesthesia, operating room facilities and other related expenses are excluded. Anesthesia and the room are separate bills, usually from separate businesses, and together they add ${K.usd(a.anesthesiaAmount + a.facilityAmount)} at Medicare rates.` },
    { q: 'Is a mini tummy tuck cheaper?', a: 'Usually, because it is shorter and limited to the skin below the navel. It has no CPT code of its own, so no public file prices it: the practice sets the fee. Shorter anesthesia lowers that line at about one time unit per quarter hour saved, and a surgeon who removes less tissue often charges less.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'tummy_tuck' },
  related: ['mommy-makeover-cost', 'liposuction-cost', 'surgery-center-vs-hospital', 'recovery-time-off'],
  sources: ['asps_tummy_tuck', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026', 'medlineplus_abdominal'],
});
