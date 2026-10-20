import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const a = K.est('thigh_lift');
const arm = K.est('arm_lift');
const hp = K.est('thigh_lift', 'us', 'hopd');
const yr = K.P.surgeonFee.year;
const dc = K.est('thigh_lift', 'washington-dc');
const nash = K.est('thigh_lift', 'nashville');
const both = K.combine(['thigh_lift', 'arm_lift']);
const hour = K.anes('thigh_lift', a.minutes + 60).total - a.anesthesiaAmount;

export default defineGuide({
  id: 'thigh-lift-cost',
  group: 'body',
  order: 8,
  slug: 'thigh-lift-cost',
  nav: 'Thigh lift cost',
  card: 'Thighplasty: same room rate as an arm lift, longer anesthesia, a higher surgeon average.',
  title: 'Thigh Lift Cost 2026: Thighplasty Surgeon, Anesthesia and OR',
  description: 'Thigh lift cost in 2026: the thighplasty surgeon fee average, anesthesia time and operating room at 2026 Medicare rates, alone or with an arm lift, by US metro.',
  h1: 'Thigh lift cost: a thighplasty, line by line',
  intro: 'A thigh lift removes loose skin of the thighs; the room is paid at the same Medicare rate as an arm lift, but the operation takes longer.',
  resume: `A thigh lift, or thighplasty, comes to a benchmark of ${K.usd(a.total)} at national rates in 2026. The surgeon's average fee was ${K.usd(a.surgeon)} in ${yr} according to the surgeons' society, which excludes anesthesia and the operating room from that figure. The room for CPT 15832 is paid ${K.usd(a.facilityAmount)} by Medicare to a surgery center and ${K.usd(hp.facilityAmount)} to a hospital outpatient department, exactly the rates of the arm lift, because both codes sit in the same payment group. What differs is time: CMS records a median of ${Math.round(a.minutes)} minutes for the thigh, against ${Math.round(K.min('arm_lift'))} for the arm, so anesthesia comes to ${K.usd(a.anesthesiaAmount)}. The benchmark is ${K.usd(a.total - arm.total)} above an arm lift, mostly in the surgeon's line, and garments and time off come on top of it.`,
  body: (h) => `
<h2>Same group, different bill</h2>
<p>Medicare pays surgery centers by group of procedures judged similar in resources, and CPT 15832, excision of excessive skin of the thigh, shares its group and its rate of ${K.usd(K.R.cpt['15832'].asc.rate)} with the arm lift. A private surgery center is free to price them differently, for instance by operating time, which would make the longer thigh lift more expensive. The benchmark keeps Medicare's logic; the calculator's field for a facility quote lets you replace it with the price you were given.</p>
${h.table(['', 'Thigh lift', 'Arm lift'], [
    ["Surgeon's fee, survey average", K.usd(a.surgeon), K.usd(arm.surgeon)],
    ['Minutes (CMS median)', String(Math.round(a.minutes)), String(Math.round(K.min('arm_lift')))],
    ['Anesthesia', K.usd(a.anesthesiaAmount), K.usd(arm.anesthesiaAmount)],
    ['Room, surgery center', K.usd(a.facilityAmount), K.usd(arm.facilityAmount)],
    ['Benchmark total', `<strong>${K.usd(a.total)}</strong>`, `<strong>${K.usd(arm.total)}</strong>`],
  ], 'National Medicare rates, October 2026.', ['l', 'r', 'r'])}

<h2>Each hour of anesthesia</h2>
<p>A thigh lift that runs an hour longer than the CMS median adds ${K.usd(hour)} at the national anesthesia factor: four time units of fifteen minutes. That is small next to the surgeon's fee, but it is the line that most often surprises patients, because the anesthesia bill can arrive separately, weeks later, from a group the patient never chose. The ${h.a('anesthesia-fee', 'anesthesia page')} explains how the units add up.</p>
${h.mini('anesthesia', { t: 'Anesthesia for a longer thigh lift', p: ['am'], d: { pr: 'thigh_lift', am: 210 } })}

<h2>Thighs and arms together</h2>
<p>Patients who have lost a lot of weight sometimes have both lifts in one session. In a surgery center the second code is paid at half rate and anesthesia is billed once, which brings the pair to ${K.usd(both.combined.total)} against ${K.usd(a.total + arm.total)} for two operations. In a hospital, both codes are comprehensive, so only one is paid. Whether a long combined session is advisable is for the surgeon and the anesthesia team to decide.</p>

<h2>Metro areas</h2>
<p>Washington comes to ${K.usd(dc.total)} and Nashville to ${K.usd(nash.total)}. As for the arm lift, the spread is small because the lines that move with local wages are small. The ${h.a('cosmetic-surgery-cost-by-city', 'comparison of metro areas')} lists every procedure in every metro.</p>
`,
  faqs: [
    { q: 'How much does a thigh lift cost in 2026?', a: `About ${K.usd(a.total)} as a benchmark at national rates: the surgeon's ${yr} survey average of ${K.usd(a.surgeon)}, anesthesia of ${K.usd(a.anesthesiaAmount)} for ${Math.round(a.minutes)} minutes and a surgery center room of ${K.usd(a.facilityAmount)} at the 2026 Medicare rate for CPT 15832. A hospital department is paid ${K.usd(hp.facilityAmount)} for the room.` },
    { q: 'Is a thigh lift more expensive than an arm lift?', a: `Yes, by about ${K.usd(a.total - arm.total)} at the rates used here. The surgeon's survey average is higher and the operation is longer in the CMS time file, so anesthesia costs more. Medicare pays the same room rate for both, though a private surgery center that charges by the hour would bill the longer operation more.` },
    { q: 'Can a thigh lift and an arm lift be done together?', a: `Some surgeons combine them. At Medicare rates in a surgery center the second operation's room is paid at half rate and anesthesia is billed once, so the pair comes to ${K.usd(both.combined.total)}. Whether one long session is safe for a given patient is decided by the surgeon and the anesthesia team.` },
  ],
  tool: 'cost',
  toolArg: { pr: 'thigh_lift' },
  related: ['arm-lift-cost', 'anesthesia-fee', 'combined-procedures', 'liposuction-cost'],
  sources: ['asps_thigh_lift', 'asps_arm_lift', 'cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_pfs_2026'],
});
