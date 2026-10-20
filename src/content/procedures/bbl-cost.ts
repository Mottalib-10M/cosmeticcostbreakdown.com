import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('bbl');
const hp = K.est('bbl', 'us', 'hopd');
const lipo = K.est('lipo');
const yr = K.P.surgeonFee.year;
const all = K.across('bbl');
const hi = all[0], lo = all[all.length - 1];
const mia = K.est('bbl', 'miami');
const r15771 = K.R.cpt['15771'].asc.rate, r15877 = K.R.cpt['15877'].asc.rate;
const loan = K.loan(a.total, K.P.credit.cardAssessedInterest, 24);

export default defineGuide({
  id: 'bbl-cost',
  group: 'body',
  order: 3,
  slug: 'bbl-cost',
  nav: 'BBL cost',
  card: 'Brazilian butt lift: the fat harvest and the transfer billed as two codes, and what each line costs.',
  title: 'BBL Cost 2026: Brazilian Butt Lift Surgeon, Anesthesia, OR',
  description: 'BBL cost in 2026: the Brazilian butt lift surgeon fee average, anesthesia and operating room for liposuction plus fat transfer, from 2026 Medicare files.',
  h1: 'BBL cost: liposuction and fat transfer, priced as two codes',
  intro: 'A Brazilian butt lift takes fat by liposuction and grafts it to the buttocks; the bill follows that split, and so does this calculator.',
  resume: `A Brazilian butt lift comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee for buttock augmentation with fat grafting was ${K.usd(a.surgeon)} in ${yr}, according to the surgeons' society, which adds that anesthesia and the operating room are not included. The operating room is priced from two codes, because the operation has two parts: liposuction of the trunk to harvest the fat (CPT 15877) and fat grafting (CPT 15771). In a surgery center the first code is paid in full and the second at half rate, ${K.usd(a.facilityAmount)} together at Medicare's 2026 rates, against ${K.usd(hp.facilityAmount)} in a hospital outpatient department. Anesthesia comes to ${K.usd(a.anesthesiaAmount)} for ${Math.round(a.minutes)} minutes. Grafting volumes and session lengths vary, so the anesthesia and surgeon lines vary most between quotes.`,
  body: (h) => `
<h2>Two codes, one session</h2>
<p>No billing code describes a BBL as such. A surgeon who bills it under procedure codes uses the liposuction code of the region where fat is taken and the fat grafting code, CPT 15771, whose CMS descriptor reads "${K.R.cpt['15771'].asc.label}", followed by an add-on code, 15772, for each further 50 cc. The site prices one unit of 15771 alongside the trunk liposuction code, which is the minimum and keeps the room line conservative: Medicare's surgery center rates are ${K.usd(r15877)} for the liposuction code and ${K.usd(r15771)} for the grafting code, and the second is cut to half under the multiple procedure rule. Larger grafts add the add-on code and its cost.</p>
${h.table(['Line', 'Amount', 'How it is computed'], [
    ["Surgeon's fee", K.usd(a.surgeon), `Survey average for buttock augmentation with fat grafting, ${yr}`],
    ['Anesthesia', K.usd(a.anesthesiaAmount), `${a.anesthesia.baseUnits} base units + ${K.dec(a.anesthesia.timeUnits, 1)} time units`],
    ['Room, surgery center', K.usd(a.facilityAmount), `${K.usd(r15877)} + 50 % of ${K.usd(r15771)}`],
    ['Room, hospital department', K.usd(hp.facilityAmount), 'Both codes status T: 100 % + 50 %'],
  ], 'National Medicare rates, October 2026; no local adjustment.', ['l', 'r', 'l'])}

<h2>BBL against liposuction alone</h2>
<p>Liposuction of the trunk alone comes to ${K.usd(lipo.total)} at the same rates. The difference with the BBL, ${K.usd(a.total - lipo.total)}, is mostly the surgeon's fee, which is ${K.usd(a.surgeon - lipo.surgeon)} higher on average, plus the half-rate grafting code. The two operations share the time default of ${Math.round(a.minutes)} minutes taken from a published series, because CMS records no time for either code; real sessions for a BBL are often longer, and anesthesia then rises by about ${K.usd(a.anesthesia.cf * 2)} per extra half hour. MedlinePlus reminds readers that liposuction can have serious and, rarely, fatal complications, and whether fat grafting to the buttocks is safe for a given patient is a discussion for a board-certified surgeon, not for a price page.</p>
${h.mini('metros', { t: 'A BBL in each metro area', p: ['st'], d: { pr: 'bbl' } })}

<h2>Where the BBL costs most</h2>
<p>Across the ${K.METROS.length} metro areas priced here, the benchmark runs from ${K.usd(lo.c.total)} in ${lo.m.name} to ${K.usd(hi.c.total)} in ${hi.m.name}; Miami, a city where BBL clinics advertise heavily, stands at ${K.usd(mia.total)}. Those figures move only the room and anesthesia lines. Advertised BBL packages in some markets sit below the survey average for the surgeon alone, which usually means a different structure: high volume, or fees that reappear as separate items for garments, drains or follow-up. Asking for each line in writing is the way to compare.</p>

<h2>Paying for it</h2>
<p>Spread over 24 months on a card at the Federal Reserve's average rate for accounts charged interest, ${K.pct(K.P.credit.cardAssessedInterest / 100, 2)}, the benchmark would cost ${K.usd(loan.monthly)} a month and ${K.usd(loan.totalInterest)} in interest. The ${h.a('plastic-surgery-financing', 'financing page')} compares a personal loan and a deferred-interest medical card, and the ${h.a('recovery-time-off', 'recovery page')} prices the time away from work.</p>
`,
  faqs: [
    { q: 'How much does a BBL cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)} for buttock augmentation with fat grafting, anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at 2026 Medicare rates for liposuction plus fat grafting. Larger grafts and longer sessions raise the bill.` },
    { q: 'Why is a BBL more expensive than liposuction?', a: `Because it is liposuction plus a second procedure. The surgeon's average fee is ${K.usd(a.surgeon - lipo.surgeon)} higher, the facility bills the fat grafting code on top of the liposuction code, and sessions tend to be longer, which raises anesthesia. At the rates used here the BBL benchmark is ${K.usd(a.total - lipo.total)} above trunk liposuction alone.` },
    { q: 'Is a cheap BBL package a good sign?', a: 'A package far below the surgeon average alone deserves questions, not conclusions. Ask whether anesthesia, the facility, garments and follow-up are included, who gives the anesthesia, where the operation takes place and whether the surgeon is board certified. Safety questions are for the surgeon; this site only shows what each part of the bill usually costs.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'bbl' },
  related: ['liposuction-cost', 'combined-procedures', 'plastic-surgery-quote', 'plastic-surgery-financing'],
  sources: ['asps_buttock_enhancement', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cfr_416_172', 'study_lipo', 'medlineplus_lipo', 'fed_g19'],
});
