import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const B = K.P.botox;
const A = B.areas;
const lim = K.R.asp.J0585.limit;
const avg = B.asps2023;
const yr = K.P.surgeonFee.year;
const prod = (u: number) => u * lim;
const perUnit = avg / A.glabellar.units;
const rows = Object.values(A).map((a) => [a.label, String(a.units), K.usd(prod(a.units))]);
const yearly = (n: number) => n * avg;

export default defineGuide({
  id: 'botox-cost',
  group: 'face',
  order: 16,
  slug: 'botox-cost',
  nav: 'Botox cost',
  card: 'Units per area from the FDA label, the toxin at the Medicare payment limit, and the survey average per session.',
  title: 'Botox Cost 2026: Price per Unit, Units per Area, per Session',
  description: 'Botox cost in 2026: units per area from the FDA label, the toxin price per unit at the Medicare payment limit, the average fee per session and the yearly cost.',
  h1: 'Botox cost: units, price per unit and the fee per session',
  intro: 'Choose the area and, if you have one, the price per unit you were quoted: the units come from the FDA label, the toxin cost from the Medicare file.',
  resume: `A session of botulinum toxin injections cost ${K.usd(avg)} on average in ${yr}, according to the survey of the American Society of Plastic Surgeons, which groups Botox and the other brands under one figure. Behind that average are units. The FDA label of Botox Cosmetic, onabotulinumtoxinA, sets the dose for each approved area: ${A.glabellar.units} units for the frown lines between the brows, ${A.crows.units} for crow's feet on both sides, ${A.forehead.units} for forehead lines treated together with the frown lines, ${A.upper3.units} for the three areas at once. Medicare's payment limit for the drug itself, code J0585, is ${K.cents(lim)} a unit in the October 2026 file, so the toxin for the frown lines costs about ${K.usd(prod(A.glabellar.units))} at that price. Practices usually quote a price per unit that includes the injector's time and their margin, which is why a quote per unit is several times the Medicare limit.`,
  body: (h) => `
<h2>Units per area, from the label</h2>
<p>The ${h.src('fda_botox_label', 'FDA-approved label')} of onabotulinumtoxinA for cosmetic use, revised ${K.day(B.labelDate)}, gives a fixed dose for each indication. It is the only official reference for how many units an area takes; injectors adjust doses to each patient, and areas outside the label are treated off label at doses the label does not set. The table multiplies each labeled dose by the Medicare payment limit for the drug, which is the closest public price of the toxin itself.</p>
${h.table(['Area on the label', 'Units', 'Toxin at the Medicare limit'], rows, `Payment limit for J0585, ${K.cents(lim)} per unit, CMS ASP file of October 2026. The fee for the injection is not included.`, ['l', 'r', 'r'])}

<h2>Price per unit and price per area</h2>
<p>Practices price neuromodulators in two ways: per unit, or per area. Per unit makes quotes comparable, as long as the brand is the same. The survey average of ${K.usd(avg)} per session, divided by the ${A.glabellar.units} units of the most common area, would mean ${K.cents(perUnit)} a unit; a session treating more units would bring the average per unit down. Typing the price per unit you were quoted into the calculator shows the amount for the area and how far it sits above the toxin's own Medicare price.</p>
${h.mini('botox', { t: 'Your quote for crow’s feet', p: ['pu'], d: { ar: 'crows', pu: 15 } })}

<h2>Other brands are not interchangeable</h2>
<p>The CMS file gives a limit for each toxin, but their units are not equivalent. Abobotulinumtoxin A is priced per 5 units at ${K.cents(K.R.asp.J0586.limit)}, incobotulinumtoxin A at ${K.cents(K.R.asp.J0588.limit)} a unit and daxibotulinumtoxin A at ${K.cents(K.R.asp.J0589.limit)} a unit, and each label sets its own doses. A price per unit therefore compares only within one brand. The survey's average covers all brands together.</p>

<h2>The cost over a year</h2>
<p>The effect of a session wears off, so the cost that matters is yearly. The label of Botox Cosmetic states that dosing more often than every three months has not been clinically evaluated, so three or four sessions a year is the usual range of the arithmetic. At the survey average, three sessions a year cost ${K.usd(yearly(3))} and four cost ${K.usd(yearly(4))}. Health plans and Medicare do not pay for cosmetic injections; the same molecule, sold as Botox for medical uses such as chronic migraine, can be covered for those uses. The ${h.a('brow-lift-cost', 'brow lift page')} compares the yearly cost of injections with a one-time operation, without comparing the treatments themselves.</p>
`,
  faqs: [
    { q: 'How much does Botox cost per unit in 2026?', a: `Practices set their own price per unit. As a public reference, Medicare's payment limit for the drug itself, code J0585, is ${K.cents(lim)} a unit in October 2026, without the injection. The survey average of ${K.usd(avg)} per session in ${yr}, divided by the ${A.glabellar.units} units of the frown lines, works out at ${K.cents(perUnit)} a unit.` },
    { q: 'How many units of Botox for the forehead?', a: `The FDA label of Botox Cosmetic sets ${A.forehead.units} units for forehead lines treated together with the frown lines between the brows, ${A.glabellar.units} for the frown lines alone and ${A.crows.units} for crow's feet. Treating all three areas at once is ${A.upper3.units} units. An injector may use fewer or more for a given patient.` },
    { q: 'How often is Botox repeated, and what does a year cost?', a: `The label states that dosing more often than every three months has not been clinically evaluated. At the ${yr} survey average of ${K.usd(avg)} per session, three sessions a year cost ${K.usd(yearly(3))} and four cost ${K.usd(yearly(4))}. Fewer units or a lower price per unit lower that figure in proportion.` },
  ],
  tool: 'botox',
  related: ['brow-lift-cost', 'eyelid-surgery-cost', 'plastic-surgery-quote', 'cosmetic-surgery-insurance'],
  sources: ['fda_botox_label', 'cms_asp', 'asps_botulinum_toxin', 'cfr_411_15'],
});
