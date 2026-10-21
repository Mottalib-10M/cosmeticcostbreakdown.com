import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('lipo');
const hp = K.est('lipo', 'us', 'hopd');
const short = K.anes('lipo', 90).total;
const long = K.anes('lipo', 300).total;
const withTT = K.combine(['lipo', 'tummy_tuck']);
const la = K.est('lipo', 'los-angeles');
const hou = K.est('lipo', 'houston');

export default defineGuide({
  id: 'liposuction-cost',
  group: 'body',
  order: 2,
  slug: 'liposuction-cost',
  nav: 'Liposuction cost',
  card: 'Liposuction of the abdomen and flanks: anesthesia by the hour, operating room, and your surgeon quote.',
  title: 'Liposuction Cost 2026: Anesthesia and OR Fees by US City',
  description: 'Liposuction cost in 2026 for the abdomen and flanks: anesthesia time and operating room at 2026 Medicare rates in 26 US metros, plus your surgeon quote.',
  h1: 'Liposuction cost: what one area of the trunk adds up to',
  intro: 'Liposuction of the abdomen and flanks, the most common request, priced line by line; anesthesia time is the line that moves most with the number of areas.',
  resume: `The operating room and the anesthesia of a liposuction of the trunk come to a benchmark of ${K.usd(a.total)} at national rates in 2026. The room is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center for code 15877, suction lipectomy of the trunk, and ${K.usd(hp.facilityAmount)} to a hospital outpatient department. Anesthesia is ${K.usd(a.anesthesiaAmount)}: ${a.anesthesia.baseUnits} base units for an operation on the body wall plus ${K.dec(a.anesthesia.timeUnits, 1)} time units, because CMS records no time for this code and the site uses the ${Math.round(a.minutes)} minutes measured in a published series. The surgeon's fee is set by each practice and published in no public file, so it enters the total only from your own quote. Treating more areas lengthens the session, so the anesthesia line rises with each area, while the room stays one payment per code.`,
  body: (h) => `
<h2>One code per body region</h2>
<p>Liposuction is billed by region, not by area treated. CPT 15877 covers the trunk, the abdomen and the flanks; other codes cover the head and neck (15876), the upper arms (15878) and the legs (15879). Practices, on the other hand, usually quote per area, so the same code can hide one area or four. The ${h.src('medlineplus_lipo', 'MedlinePlus page on liposuction')} lists the parts of the body it can contour and warns that it is a surgical procedure with risks, including rare fatal complications, a reminder that the price is only one part of the decision.</p>
${h.table(['Line', 'National benchmark', 'Basis'], [
    ["Surgeon's fee", 'your quote', 'Set by the practice; no public file'],
    ['Anesthesia', K.usd(a.anesthesiaAmount), `${a.anesthesia.baseUnits} + ${K.dec(a.anesthesia.timeUnits, 1)} units at ${K.cents(a.anesthesia.cf)}`],
    ['Room, surgery center', K.usd(a.facilityAmount), 'CPT 15877, Addendum AA'],
    ['Room, hospital department', K.usd(hp.facilityAmount), `CPT 15877, APC ${K.R.cpt['15877'].opps.apc}, status ${K.R.cpt['15877'].opps.status}`],
  ], 'Medicare 2026 national rates; the surgeon line is left to your quote.', ['l', 'r', 'l'])}

<h2>Time drives the anesthesia line</h2>
<p>The CMS physician time file leaves CPT 15877 blank, so the default of ${Math.round(a.minutes)} minutes is the mean operating time of a ${h.src('study_lipo', 'published series of abdominal liposuction')}. Real sessions vary widely with the volume removed and the number of regions. At the national anesthesia factor, a 90-minute session costs ${K.usd(short)} in anesthesia and a five-hour session ${K.usd(long)}. Tumescent liposuction, the most common technique according to MedlinePlus, injects a solution containing a local anesthetic, and some small procedures are done with that alone: the anesthesia line then shrinks or disappears, which the calculator lets you show by typing your own quote.</p>
${h.mini('anesthesia', { t: 'Anesthesia for your liposuction time', p: ['am', 'mx'], d: { pr: 'lipo', am: 240 } })}

<h2>Liposuction added to another operation</h2>
<p>Surgeons often add liposuction to a tummy tuck or a breast operation. In a surgery center, the second code is paid at half its rate under the multiple procedure rule, and anesthesia is billed once for the whole session. With a tummy tuck, the combined room and anesthesia benchmark is ${K.usd(withTT.combined.total)}, ${K.usd(withTT.facilitySaved + withTT.anesthesiaSaved)} below two separate operations. The surgeon's fee for the added liposuction is the surgeon's own decision, often below the stand-alone price; the ${h.a('combined-procedures', 'page on combined procedures')} explains the rule.</p>

<h2>By metro area</h2>
<p>The room and anesthesia benchmark is ${K.usd(la.total)} in Los Angeles and ${K.usd(hou.total)} in Houston, a gap of ${K.usd(la.total - hou.total)} that comes from wages in the room and the anesthesia factor. Liposuction is heavily advertised in large cities, with package prices that may or may not include anesthesia and the facility; asking for the lines separately is the way to compare them. The ${h.a('bbl-cost', 'Brazilian butt lift page')} prices the operation that adds fat grafting to liposuction.</p>
`,
  faqs: [
    { q: 'How much does liposuction cost in 2026?', a: `For the abdomen and flanks, the room and anesthesia come to a benchmark of ${K.usd(a.total)} at national rates: anesthesia of ${K.usd(a.anesthesiaAmount)} for about ${Math.round(a.minutes / 60 * 10) / 10} hours and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate. The surgeon's fee comes on top, from your quote. More regions or a longer session raise the anesthesia line.` },
    { q: 'Is liposuction priced per area?', a: 'Practices usually price it per area treated, such as the abdomen, the flanks or the inner thighs, but the billing codes group areas by region of the body. A quote listing several areas should say whether they are treated in one session, which changes the anesthesia time and the facility charge, and whether each area adds to the surgeon fee.' },
    { q: 'Does liposuction need general anesthesia?', a: 'Not always. MedlinePlus explains that in tumescent liposuction the injected solution contains lidocaine, a local anesthetic, which may be the only anesthesia needed. Larger procedures are often done under sedation or general anesthesia. The choice belongs to the surgeon and the anesthesia team, and it decides whether an anesthesia line appears on the bill at all.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'lipo' },
  related: ['bbl-cost', 'tummy-tuck-cost', 'anesthesia-fee', 'combined-procedures'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'study_lipo', 'medlineplus_lipo'],
});
