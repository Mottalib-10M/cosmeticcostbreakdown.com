/** Text of the home page (the pillar). Every figure comes from the kit. */
import { KIT as K } from '../lib/kit';
import type { FAQ, Helpers } from '../lib/page-types';

const tt = K.est('tummy_tuck');
const tth = K.est('tummy_tuck', 'us', 'hopd');
const lipo = K.est('lipo');
const ba = K.est('breast_aug');
const fl = K.est('facelift');
const rh = K.est('rhinoplasty');
const across = K.across('tummy_tuck');
const hi = across[0], lo = across[across.length - 1];
const anesShare = tt.anesthesiaAmount / tt.total;
const mm = K.combine(['tummy_tuck', 'breast_lift', 'lipo']);
const apart = mm.separate.reduce((t, c) => t + c.total, 0);

/** The value sentence (RECETTE §2.4), shown on the home page and the About page. */
export const VALUE = `The cost pages that rank first give one figure or one undated range with nothing to separate it, and end on a consultation or a credit form; this site splits each bill into the surgeon's fee, the anesthesia and the operating room, prices the last two from Medicare's 2026 rate files adjusted to your metro area, lets you add the surgeon from your own quote, names and dates every figure, and asks you for nothing.`;

export const HOME = {
  title: 'Plastic Surgery Cost 2026: Surgeon, Anesthesia, OR Fees',
  description: 'Plastic surgery cost in 2026, split into surgeon, anesthesia and operating room: tummy tuck, liposuction, BBL, breast and face procedures in 26 US metros.',
  h1: 'Plastic surgery cost, split into the four lines of the bill',
  intro: 'Choose a procedure and a metro area: the surgeon, the anesthesia and the operating room appear as separate lines, each with the file it comes from.',
  resume: `A cosmetic surgery quote is the sum of at least three bills that are priced by different people: the surgeon, the anesthesia team and the facility. For a tummy tuck the anesthesia comes to ${K.usd(tt.anesthesiaAmount)} at the 2026 Medicare rate for the time the operation usually takes, and a surgery center's operating room to ${K.usd(tt.facilityAmount)} at the 2026 Medicare rate for the same code, or ${K.usd(tth.facilityAmount)} in a hospital outpatient department. Those two lines make a benchmark of ${K.usd(tt.total)} before the surgeon, any garment, medicine or day off work; the anesthesia is ${K.pct(anesShare, 0)} of it. The surgeon's fee is the one line no public file publishes: each practice sets it, so the calculator adds it only when you type the figure of your quote. Private practices also set the price of the room and the anesthesia, usually above Medicare rates, so the benchmark is a floor to hold a quote against, not a quote.`,
  why: (h: Helpers) => `
<h2>Why the price of a procedure is never one number</h2>
<p>When a practice quotes a cosmetic operation it usually gives one figure, sometimes called all inclusive. Behind it sit three people or businesses who each charge for their part. The surgeon charges for the operation and the follow-up visits. An anesthesiologist or a nurse anesthetist charges for keeping you asleep or sedated, by the quarter hour. The facility, a surgery center or a hospital, charges for the operating room, the staff and the supplies of the day. A fourth line arrives later and never appears on the quote: the garments, the medicines and the days you do not work.</p>
<p>A figure that circulates online often describes one of these lines without saying which. A reader who compares an all-inclusive quote with a figure that covers only the surgeon, or only the room, is comparing a whole bill with one of its parts. This site keeps the lines apart and prices the two that public files cover; the surgeon's line stays yours to fill from the quote.</p>

<h2>Where the operating room and anesthesia figures come from</h2>
<p>Medicare does not pay for cosmetic surgery: the rule is written in ${h.src('cfr_411_15', '42 CFR 411.15(h)')}. But the same procedure codes are billed when the work is reconstructive or medically necessary, and for those Medicare publishes what it pays every year, line by line. The ${h.src('cms_asc_addenda', 'surgery center rate file (Addendum AA)')} gives the facility payment for each code in an ambulatory surgery center, the ${h.src('cms_opps_b', 'hospital outpatient file (Addendum B)')} gives it for a hospital department, and the ${h.src('cms_anes', 'anesthesia conversion factors')} turn the anesthesia units of each operation into dollars for every Medicare locality.</p>
<p>These are the public prices nearest to the cosmetic bill. A cosmetic patient pays a private price, which a practice sets as it likes and which is usually higher. The Medicare figure is therefore a benchmark that a quote can be held against: an operating room quoted at three times the Medicare rate is not unusual, one quoted below it deserves a question about what is left out.</p>
${h.mini('facility', { t: 'Surgery center or hospital, for the same code', p: ['pr', 'mx'], d: { pr: 'breast_aug' } })}

<h2>How the metro area moves the bill</h2>
<p>Medicare adjusts the operating room payment with the wage index of the place: half of the surgery center rate, and sixty percent of the hospital rate, rise or fall with local wages, as the ${h.src('fr_opps_asc_2026', 'final rule for 2026')} sets out. Anesthesia has its own conversion factor for each Medicare locality. That is why the gap between metros is narrow here: for a tummy tuck, the room and anesthesia reach ${K.usd(hi.c.total)} in ${hi.m.name} and ${K.usd(lo.c.total)} in ${lo.m.name}. Surgeons' fees may differ much more from one city to another, but no public file measures them, so the calculator leaves that line to your quote.</p>
<p>The ${h.a('cosmetic-surgery-cost-by-city', 'comparison of metro areas')} shows every procedure in the ${K.METROS.length} metros priced here, and each city page explains what is particular about its rates.</p>

<h2>Several procedures in one session</h2>
<p>Combining operations lowers two of the lines. Medicare pays the highest rated code of a session in full and every other eligible code at half its rate (${h.src('cfr_416_172', '42 CFR 416.172')}), and anesthesia is billed once, with the base units of the most demanding procedure and the time of the whole session. A tummy tuck, a breast lift and liposuction in one session make a room and anesthesia benchmark of ${K.usd(mm.combined.total)}, against ${K.usd(apart)} for three separate operations. The ${h.a('mommy-makeover-cost', 'mommy makeover page')} and the ${h.a('combined-procedures', 'page on combined procedures')} detail the arithmetic.</p>

<h2>What these figures are not</h2>
<p>They are not a price offered by anyone, and they say nothing about whether an operation is right for you, safe for you or worth doing. Those are questions for a board-certified surgeon who has examined you. The site uses medical vocabulary only to name the codes behind a bill, links to the ${h.src('medlineplus_abdominal', 'MedlinePlus')} pages of the National Library of Medicine for what each procedure involves, and never ranks surgeons, clinics or lenders. The ${h.a('method', 'method page')} gives every formula and its limits.</p>
`,
  faqs: [
    { q: 'How much does plastic surgery cost in 2026?', a: `It depends on the procedure, and on whose fee you count. At 2026 Medicare rates for a surgery center and anesthesia, the room and anesthesia of a tummy tuck come to about ${K.usd(tt.total)}, liposuction of the trunk ${K.usd(lipo.total)}, a breast augmentation ${K.usd(ba.total)} and a facelift ${K.usd(fl.total)}. The surgeon's fee comes on top, and private facilities usually charge more than Medicare.` },
    { q: 'Why is the surgeon not priced on this site?', a: 'Because no public file publishes what surgeons charge for cosmetic work. Medicare does not cover it, so its physician fee schedule gives no cosmetic fee, and each practice sets its own price. The calculator therefore prices the operating room and the anesthesia from public files and adds the surgeon only when you type the figure of your quote.' },
    { q: 'Why are Medicare rates used for cosmetic surgery?', a: 'Because they are the only public prices for the same codes. Medicare excludes cosmetic surgery from coverage, but it pays for these operations when they are reconstructive, and it publishes the facility and anesthesia payment for every code each year. A cosmetic patient pays a private price set by the practice, usually higher, so the Medicare figure works as a floor to compare a quote with.' },
    { q: 'Is a surgery center cheaper than a hospital?', a: `At Medicare rates, usually yes. For a tummy tuck the 2026 surgery center payment is ${K.usd(tt.facilityAmount)} at national rates and the hospital outpatient payment ${K.usd(tth.facilityAmount)}. Private prices follow the same direction in many markets, but a surgeon may operate only in one place, and the choice also depends on your health, which the surgeon and anesthesia team assess.` },
    { q: 'Does the city change the price of plastic surgery?', a: `It changes all three lines, but the public files only measure two of them. Medicare's wage index and anesthesia factors move the room and the anesthesia by a few hundred dollars between metros; a rhinoplasty room and anesthesia benchmark ranges from ${K.usd(K.across('rhinoplasty')[K.METROS.length - 1].c.total)} to ${K.usd(K.across('rhinoplasty')[0].c.total)}. Surgeons' own fees may differ more between cities, but no public file measures them by metro.` },
    { q: 'What costs come after the surgery?', a: `Compression garments, prescriptions, follow-up visits beyond those included in the fee, help at home and, above all, unpaid days off work. At the US median of ${K.usd(K.P.earnings.medianWeekly)} a week for full-time workers, ten unpaid working days cost about ${K.usd(K.DAILY_PAY * 10)}. The calculator adds those days and items as a fourth line of the bill.` },
    { q: 'Does health insurance pay for cosmetic surgery?', a: `Not for work done to change appearance. Plans and Medicare exclude it, and Medicare writes that exclusion into federal regulation. Some of the same operations are covered when they are reconstructive, such as a breast reconstruction after cancer or a rhinoplasty that restores breathing; the insurance page of this site sets out how a plan decides, which always needs the plan's own written approval.` },
  ] as FAQ[],
  sources: ['cms_asc_addenda', 'cms_opps_b', 'cms_anes', 'cms_wage_index', 'fr_opps_asc_2026', 'cfr_411_15', 'cfr_416_172', 'bls_earnings'],
};
