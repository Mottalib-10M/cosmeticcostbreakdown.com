import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('breast_aug');
const hp = K.est('breast_aug', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const sf = K.est('breast_aug', 'san-francisco');
const sa = K.est('breast_aug', 'san-antonio');
const withLift = K.combine(['breast_aug', 'breast_lift']);
const fat = (K.P.procedures.breast_aug as { aspsFatGrafting: number }).aspsFatGrafting;

export default defineGuide({
  id: 'breast-augmentation-cost',
  group: 'body',
  order: 4,
  slug: 'breast-augmentation-cost',
  nav: 'Breast augmentation cost',
  card: 'Implants, surgeon, anesthesia and the operating room, with the hospital rate that is far above the center.',
  title: 'Breast Augmentation Cost 2026: Surgeon, Implants, OR Fees',
  description: 'Breast augmentation cost in 2026: surgeon fee, anesthesia and an operating room with the implant packaged, at 2026 Medicare center and hospital rates by metro.',
  h1: 'Breast augmentation cost: where the implants sit on the bill',
  intro: 'Breast augmentation with implants, priced line by line; the facility line is where the implants themselves are usually charged.',
  resume: `A breast augmentation with implants comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr}, as reported by the surgeons' society, which states that anesthesia, the operating room and related expenses are not included. The operating room is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center for CPT 19325, a rate into which Medicare packages the implant, and ${K.usd(hp.facilityAmount)} to a hospital outpatient department, the largest gap between the two settings of any procedure priced here. Anesthesia comes to ${K.usd(a.anesthesiaAmount)} for the ${Math.round(a.minutes)} minutes CMS records. A private quote often lists the implants separately, so the room line of a quote and of this benchmark may not hold the same things.`,
  body: (h) => `
<h2>The implants and the room line</h2>
<p>The breast implant has its own supply code, L8600. In Medicare's surgery center files it carries indicator N1, packaged: no separate payment is made, so the rate of CPT 19325 is meant to cover it. In the hospital file the implant is packaged too, and CPT 19325 has status J1, a comprehensive payment for the whole day. The benchmark room line therefore includes the device. Private practices more often quote the implants as their own item, priced by type, saline or silicone, and by manufacturer. The ${h.src('medlineplus_breast_aug', 'MedlinePlus page on breast augmentation')} describes both kinds of implant and the different ways of placing them.</p>
${h.table(['Line', 'Surgery center', 'Hospital department'], [
    ["Surgeon's fee, survey average", K.usd(a.surgeon), K.usd(hp.surgeon)],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(hp.anesthesiaAmount)],
    ['Operating room, implant included', K.usd(a.facilityAmount), K.usd(hp.facilityAmount)],
    ['Benchmark total', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(hp.total)}</strong>`],
  ], `Medicare 2026 national rates. Surgeon: ${yr} survey average for breast augmentation with implants.`, ['l', 'r', 'r'])}

<h2>Fat grafting instead of implants</h2>
<p>The same survey gives a separate average for breast augmentation with fat grafting, ${K.usd(fat)} in ${yr}, higher than the implant figure. That operation takes fat by liposuction and grafts it to the breasts, so its room line is closer to the ${h.a('bbl-cost', 'BBL page')}, with a liposuction code and a fat grafting code. The calculator on this page prices the implant operation only.</p>
${h.mini('quote', { t: 'What a breast augmentation quote leaves for the surgeon', p: ['q', 'st'], d: { pr: 'breast_aug', q: 9500 } })}

<h2>Implants with a lift</h2>
<p>When the breasts also sag, surgeons may combine the augmentation with a lift. In a hospital both codes are comprehensive, so only the higher one is paid; in a surgery center the lift is paid at half rate. Together, at national rates in a surgery center, the benchmark is ${K.usd(withLift.combined.total)}, with ${K.usd(withLift.facilitySaved)} saved on the room against two operations. The ${h.a('breast-lift-cost', 'breast lift page')} details the lift alone.</p>

<h2>The metro areas</h2>
<p>Because the room line is large, the metro matters more here than for most procedures: ${K.usd(sf.total)} in San Francisco against ${K.usd(sa.total)} in San Antonio. A later operation to replace or remove an implant is a new bill with its own three lines, and the surgeon is the person to ask how often it happens with the implant proposed. The weeks off work after the first operation are priced on the ${h.a('recovery-time-off', 'recovery page')}.</p>
`,
  faqs: [
    { q: 'How much does a breast augmentation cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate, which includes the implant. In a hospital outpatient department the room alone is ${K.usd(hp.facilityAmount)}.` },
    { q: 'Are implants included in the breast augmentation price?', a: 'In the Medicare rate used for the room line, yes: the implant code is packaged into the payment for the operation and never paid separately. In private quotes, practices often list the implants as a separate item whose price depends on the type and the manufacturer. Ask whether the quote includes them before comparing totals.' },
    { q: 'Why is a hospital so much more expensive for breast augmentation?', a: `Medicare pays the hospital a comprehensive rate of ${K.usd(hp.facilityAmount)} for the code, against ${K.usd(a.facilityAmount)} for a surgery center, at national rates. The hospital rate packages the whole day, the implant included, and reflects hospital costs. Most cosmetic breast augmentations take place in surgery centers or office operating rooms.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'breast_aug' },
  related: ['breast-lift-cost', 'surgery-center-vs-hospital', 'mommy-makeover-cost', 'plastic-surgery-quote'],
  sources: ['asps_breast_augmentation', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026', 'medlineplus_breast_aug'],
});
