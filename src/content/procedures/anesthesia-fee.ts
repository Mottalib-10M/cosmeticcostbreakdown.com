import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const cf = K.R.anesNationalCf;
const ms = K.METROS.slice().sort((a, b) => b.anesCf - a.anesCf);
const hiM = ms[0], loM = ms[ms.length - 1];
const fl = K.anes('facelift');
const tt = K.anes('tummy_tuck');
const rows = K.PROC_IDS.map((id) => {
  const p = K.PR(id), x = K.anes(id);
  return [p.short, p.asa ?? '', String(x.baseUnits), String(Math.round(K.min(id))), K.dec(x.timeUnits, 1), K.usd(x.total)];
});

export default defineGuide({
  id: 'anesthesia-fee',
  group: 'bill',
  order: 17,
  slug: 'plastic-surgery-anesthesia-fee',
  nav: 'Anesthesia fee',
  card: 'Base units, time units and the local conversion factor: how an anesthesia bill is built.',
  title: 'Plastic Surgery Anesthesia Fee 2026: Units, Time and Rates',
  description: 'Plastic surgery anesthesia fee in 2026: base units, 15-minute time units and the 2026 Medicare conversion factor of your locality, for each cosmetic procedure.',
  h1: 'The anesthesia fee: base units, time and a local factor',
  intro: 'Anesthesia is the only line of a surgery bill built from a public formula; pick a procedure and a time to see it.',
  resume: `An anesthesia bill follows a formula that Medicare publishes: a fixed number of base units for the type of operation, plus one time unit for every fifteen minutes of anesthesia, the sum multiplied by a dollar conversion factor. For 2026 the national factor is ${K.cents(cf)} and each Medicare locality has its own, from ${K.cents(loM.anesCf)} in the locality of ${loM.name} to ${K.cents(hiM.anesCf)} in that of ${hiM.name} among the metro areas priced here. A tummy tuck carries ${tt.baseUnits} base units; at the ${Math.round(K.min('tummy_tuck'))} minutes CMS records for it, that makes ${K.dec(tt.baseUnits + tt.timeUnits, 1)} units and ${K.usd(tt.total)} at the national factor. A facelift of ${Math.round(K.min('facelift'))} minutes comes to ${K.usd(fl.total)}. Private anesthesia groups bill their own conversion factor, usually higher than Medicare's, on the same units.`,
  body: (h) => `
<h2>Base units</h2>
<p>Each anesthesia code describes a region and type of operation and carries a number of base units that reflects its difficulty. The CMS base unit file lists them; its latest edition on the CMS site is that of ${K.P.rules.baseUnitsEdition}. Cosmetic operations use few codes: ${K.R.asa['00400']} base units for skin procedures on the limbs and front of the trunk, ${K.R.asa['00402']} for breast reconstruction or augmentation, ${K.R.asa['00802']} for the lower abdominal wall, ${K.R.asa['00300']} for the skin of the head and neck, ${K.R.asa['00160']} for the nose. When several procedures share a session, only the highest base units count.</p>
${h.table(['Procedure', 'Anesthesia code', 'Base units', 'Default minutes', 'Time units', 'At the national factor'], rows, `2026 national conversion factor ${K.cents(cf)}. Minutes: CMS median intra-service time, or a published series where CMS records none.`, ['l', 'l', 'r', 'r', 'r', 'r'])}

<h2>Time units</h2>
<p>Anesthesia time runs from when the anesthesia provider starts preparing the patient to when the patient is safely handed over after the operation, which is longer than the surgical time. Medicare divides it by fifteen and keeps one decimal. The defaults of this site are surgical times recorded by CMS or measured in published series, so real anesthesia time, and the real bill, are higher. Typing the minutes on your estimate gives a better figure.</p>
${h.mini('anesthesia', { t: 'Your anesthesia time', p: ['pr', 'am'], d: { pr: 'tummy_tuck', am: 180 } })}

<h2>The conversion factor and who bills it</h2>
<p>The ${h.src('cms_anes', 'CMS conversion factors')} for 2026 differ by locality to reflect local costs, and the site uses the column for providers outside advanced payment models. An anesthesiologist, a nurse anesthetist or a team of both can give the anesthesia. A team splits the payment, the total staying the same under Medicare. In private cosmetic practice, the anesthesia group sets its own conversion factor and may bill separately from the surgeon and the facility, sometimes after the operation: asking for its rate and the expected time beforehand avoids the surprise.</p>
<p>MedlinePlus explains that some operations, such as eyelid surgery or small liposuctions, can be done with local anesthesia given by the surgeon, sometimes with medicine to relax. In that case there may be no anesthesia line at all, and the calculator's anesthesia quote field can be set to the amount you were given. The ${h.a('surgery-center-vs-hospital', 'facility page')} covers the operating room line.</p>
`,
  faqs: [
    { q: 'How is the anesthesia fee for plastic surgery calculated?', a: `As base units for the type of operation plus one time unit per fifteen minutes, multiplied by a conversion factor. Medicare's 2026 national factor is ${K.cents(cf)}. A tummy tuck with ${tt.baseUnits} base units and two hours of time makes about ${K.dec(tt.baseUnits + tt.timeUnits, 1)} units, ${K.usd(tt.total)} at that factor. Private groups apply their own factor.` },
    { q: 'How much does each extra hour of anesthesia cost?', a: `Four time units. At Medicare's 2026 national factor of ${K.cents(cf)}, that is ${K.usd(cf * 4)} an hour, and between ${K.usd(loM.anesCf * 4)} and ${K.usd(hiM.anesCf * 4)} in the metro areas priced here. A private anesthesia group's hourly amount is its own conversion factor times four, which it can state before the operation.` },
    { q: 'Why did I get a separate anesthesia bill?', a: 'Because anesthesia is usually provided by a separate group, which bills its own services. The surgeon’s quote may or may not include it. Before scheduling, ask the practice whether the quote includes anesthesia and, if not, the name of the group, its rate and the expected time, so the bill can be checked against the formula.' },
  ],
  tool: 'anesthesia',
  toolArg: { pr: 'facelift' },
  related: ['surgery-center-vs-hospital', 'plastic-surgery-quote', 'facelift-cost', 'combined-procedures'],
  sources: ['cms_anes', 'cms_rvu26d', 'cms_pfs_2026', 'study_facelift', 'study_lipo', 'medlineplus_eyelid'],
});
