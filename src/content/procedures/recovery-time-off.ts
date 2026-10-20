import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.P.earnings;
const day = K.DAILY_PAY;
const per = E.period.replace('-Q', ', quarter ');
const ex = [5, 10, 15, 20].map((d) => [`${d} working days`, K.usd(d * day), K.usd(d * day * 0.6), K.usd(d * day * 1.5)]);
const tt = K.est('tummy_tuck');
const ttWith = K.cost({ procs: [K.PR('tummy_tuck')], setting: 'asc', place: null, daysOff: 15, dailyPay: day, extras: 300 }, K.R, K.RULES);

export default defineGuide({
  id: 'recovery-time-off',
  group: 'bill',
  order: 23,
  slug: 'plastic-surgery-recovery-cost',
  nav: 'Recovery and time off',
  card: 'The fourth line of the bill: unpaid days off work, garments, medicines and help at home.',
  title: 'Plastic Surgery Recovery Cost 2026: Time Off Work and Extras',
  description: 'Plastic surgery recovery cost in 2026: unpaid days off work at your pay or the US median, compression garments, medicines and help at home, added to the bill.',
  h1: 'The cost of recovery: the line no quote shows',
  intro: 'Enter the days off your surgeon expects and your pay: the calculator prices the weeks after the operation, which belong to the bill as much as the room.',
  resume: `A cosmetic operation is followed by days or weeks away from work, and when no paid leave is left, those days are unpaid: federal job-protected leave does not treat plastic surgery as a serious health condition unless complications develop or a hospital stay is needed. At the US median of ${K.usd(E.medianWeekly)} a week for full-time workers in the ${per} release of the Bureau of Labor Statistics, a working day is worth about ${K.usd(day)}, so ten unpaid days cost ${K.usd(10 * day)} and three weeks ${K.usd(15 * day)}. Add the items most practices ask patients to buy, such as compression garments and prescriptions, and help at home for the first days. For a tummy tuck, fifteen unpaid days and ${K.usd(300)} of garments and medicines raise the benchmark from ${K.usd(tt.total)} to ${K.usd(ttWith.total)}. The time off depends on the operation and on you, and the surgeon is the person who sets it.`,
  body: (h) => `
<h2>Days off, at your pay</h2>
<p>The site does not say how long recovery takes: that varies with the procedure, the extent of the work, the person and the job, and only the surgeon can say it. What the site can do is price the days. The default daily pay is the ${h.src('bls_earnings', 'BLS median usual weekly earnings')} divided by five, ${K.usd(day)}; type your own figure for a better one. The table shows four durations at the median, at 60 % of it and at 150 % of it.</p>
${h.table(['Unpaid time off', 'At the median', 'At 60 % of it', 'At 150 % of it'], ex, `Median usual weekly earnings, full-time wage and salary workers, ${per}: ${K.usd(E.medianWeekly)}.`, ['l', 'r', 'r', 'r'])}

<h2>Leave and pay</h2>
<p>Paid time off, if you have it, turns the loss into days of leave used. Short-term disability insurance and state disability programs have their own rules on elective cosmetic surgery, written in the policy or the program. Job-protected leave under the Family and Medical Leave Act requires a serious health condition, and ${h.src('cfr_825_113', '29 CFR 825.113(d)')} states that conditions treated by plastic surgery are not serious health conditions unless inpatient care is required or complications develop. Checking those rules before booking a date is part of pricing the operation.</p>
${h.mini('recovery', { t: 'Your recovery, priced', p: ['do', 'ex'], d: { do: 10, ex: 250 } })}

<h2>Follow-up visits and the unexpected</h2>
<p>A surgeon's fee may include a number of follow-up visits; the quote should say how many and for how long. Visits beyond that, a treatment for a complication or a revision are separate bills, and a health plan may refuse to pay for complications of a cosmetic operation under its exclusions. Those costs cannot be priced in advance, but asking the practice what its fee covers if something goes wrong, and keeping some savings aside, is part of budgeting the operation. Time off can also stretch if healing is slower than expected, which the calculator lets you test by raising the number of days.</p>
<h2>The items after surgery</h2>
<p>Compression garments after body procedures, prescriptions, dressings, a ride home and someone to help for the first days are common costs that a quote may or may not include. MedlinePlus describes, for instance, a firm elastic dressing over the abdomen after a tummy tuck and splints after a rhinoplasty. Asking the practice for the list of what you will need, and what is included, gives the figure to type in the calculator's field. The full calculator on the ${h.a('tummy-tuck-cost', 'tummy tuck page')} and the other procedure pages adds these days and items as a fourth line of the bill.</p>
`,
  faqs: [
    { q: 'How much does time off after plastic surgery cost?', a: `It depends on the days and your pay. At the US median of ${K.usd(E.medianWeekly)} a week for full-time workers, a working day is worth about ${K.usd(day)}, so ten unpaid days cost ${K.usd(10 * day)}. Paid leave changes that into days of leave used. Your surgeon sets the time off for your operation.` },
    { q: 'Is time off for cosmetic surgery protected leave?', a: 'Not under the Family and Medical Leave Act, as a rule. Its regulation, 29 CFR 825.113(d), says conditions treated by plastic surgery are not serious health conditions unless inpatient hospital care is required or complications develop. Short-term disability policies and state programs set their own rules, so read yours before scheduling the operation.' },
    { q: 'What extra items should I budget for after surgery?', a: 'Commonly compression garments after body procedures, prescriptions, dressings, transport on the day and help at home for the first days. Some practices include garments in the quote, others do not. Ask for the list in writing and add the items the quote leaves out to the bill before comparing practices.' },
  ],
  tool: 'recovery',
  toolArg: { do: 10 },
  related: ['tummy-tuck-cost', 'plastic-surgery-financing', 'plastic-surgery-quote', 'mommy-makeover-cost'],
  sources: ['bls_earnings', 'cfr_825_113', 'medlineplus_abdominal', 'medlineplus_rhinoplasty'],
});
