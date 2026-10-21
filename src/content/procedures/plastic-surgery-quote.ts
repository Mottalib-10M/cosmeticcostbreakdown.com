import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const tt = K.est('tummy_tuck');
const q = 14000;
const left = q - tt.facilityAmount - tt.anesthesiaAmount;

export default defineGuide({
  id: 'plastic-surgery-quote',
  group: 'bill',
  order: 20,
  slug: 'plastic-surgery-quote',
  nav: 'Reading a quote',
  card: 'Take an all-inclusive price apart: what the room and anesthesia take at public rates, and what is left for the surgeon.',
  title: 'Plastic Surgery Quote 2026: Check Each Line of the Estimate',
  description: 'Plastic surgery quote check for 2026: split an all-inclusive price into surgeon, anesthesia and operating room, and compare two lines with Medicare rates.',
  h1: 'Reading a plastic surgery quote, line by line',
  intro: 'Type the all-inclusive price you were given: the calculator takes out the room and the anesthesia at Medicare rates and shows what remains for the surgeon.',
  resume: `An all-inclusive quote for a cosmetic operation usually bundles three bills, and comparing two quotes means taking them apart. Take a tummy tuck quoted at ${K.usd(q)}. At 2026 Medicare rates, a surgery center's room for the code costs ${K.usd(tt.facilityAmount)} at national rates and the anesthesia ${K.usd(tt.anesthesiaAmount)}, which leaves ${K.usd(left)} for the surgeon, or ${K.pct(left / q, 0)} of the quote. Because private facilities and anesthesia groups usually charge more than Medicare, the surgeon's true share is lower than that figure. No public file publishes surgeons' fees, so the remainder cannot be held against an official benchmark; it can be held against a second quote taken apart the same way. The useful step is to ask each practice for the three lines in writing, with what each includes, and to check the room and anesthesia against their Medicare benchmarks.`,
  body: (h) => `
<h2>What to ask for</h2>
<p>A quote that can be compared states, line by line, the surgeon's fee, the anesthesia fee with the name of the anesthesia group and the expected time, and the facility fee with the name and type of the facility: an office operating room, an ambulatory surgery center or a hospital. It also says what is included around the operation: the consultation, implants, garments, prescriptions, laboratory tests, follow-up visits and, if a revision is needed, who pays for it. A missing line is not necessarily a hidden cost, but it needs an answer before the date is booked.</p>
${h.table(['Line of the quote', 'Benchmark on this site', 'What to check'], [
    ["Surgeon's fee", 'None: no public file, compare quotes', 'What follow-up visits and revisions it covers'],
    ['Anesthesia', 'Base units + time at the 2026 Medicare factor', 'Who gives it, the group’s rate, the expected time'],
    ['Facility', 'Medicare 2026 center or hospital rate', 'Which facility, whether implants and supplies are included'],
    ['Implants and supplies', 'Packaged in the Medicare facility rate', 'Brand, type, and whether listed separately'],
    ['After the operation', 'Your days off and items', 'Garments, medicines, help at home'],
  ], undefined, ['l', 'l', 'l'])}

<h2>Taking a quote apart</h2>
<p>The calculator on this page subtracts the room and anesthesia at Medicare rates from your total and shows what remains, and its share of the quote. If almost nothing remains, or the remainder is negative, the facility or anesthesia part may be missing from the quote, or the practice may price differently. Two quotes taken apart this way show whether they differ on the surgeon's line or on the room and anesthesia. A large remainder may also include items the benchmark leaves out, such as implants listed separately or garments. None of these readings is a judgment of quality, which a price cannot show.</p>
${h.mini('quote', { t: 'A breast augmentation quote', p: ['q', 'mx'], d: { pr: 'breast_aug' } })}

<h2>The credentials behind the quote</h2>
<p>A price does not say who operates or where. The questions that matter for safety, the surgeon's board certification, the facility's accreditation, who gives the anesthesia and what happens in case of a complication, are answered by the practice and by public licensing boards, not by a price page. This site does not rate or recommend anyone. The ${h.a('surgery-center-vs-hospital', 'facility page')} and the ${h.a('anesthesia-fee', 'anesthesia page')} explain the two lines that are most often left out of a quote, and the ${h.a('plastic-surgery-financing', 'financing page')} what a payment plan adds.</p>
`,
  faqs: [
    { q: 'What should a plastic surgery quote include?', a: 'At least the surgeon’s fee, the anesthesia fee with the provider and expected time, and the facility fee with the name of the facility. It should also say whether implants, garments, prescriptions, tests and follow-up visits are included, and what happens if a revision is needed. Ask for it in writing before paying a deposit.' },
    { q: 'How can I tell if a plastic surgery quote is fair?', a: 'Split it into its lines. On this site, the room and anesthesia are priced at 2026 Medicare rates for your metro; private prices are usually above them, so a line far above deserves a question about what it includes. The surgeon’s fee has no public benchmark: compare it across two or three quotes for the same operation.' },
    { q: 'Why do quotes for the same surgery differ so much?', a: 'Mostly because of the surgeon’s fee, which varies from one surgeon and one city to another, and because quotes include different things. One may count implants, garments and follow-up while another lists them later. The facility chosen also matters: a hospital is paid far more than a surgery center for the same code.' },
  ],
  tool: 'quote',
  toolArg: { pr: 'tummy_tuck', q },
  related: ['anesthesia-fee', 'surgery-center-vs-hospital', 'plastic-surgery-financing', 'tummy-tuck-cost'],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes'],
});
