import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const C = K.P.credit;
const tt = K.est('tummy_tuck');
const amt = Math.round(tt.total / 500) * 500;
const card = K.loan(amt, C.cardAssessedInterest, 24);
const pl = K.loan(amt, C.personalLoan24, 24);
const d = K.deferred(amt, C.cardAssessedInterest, 12, 600);
const d2 = K.deferred(amt, C.cardAssessedInterest, 12, Math.ceil(amt / 12));
const period = K.month(C.period);

export default defineGuide({
  id: 'plastic-surgery-financing',
  group: 'bill',
  order: 21,
  slug: 'plastic-surgery-financing',
  nav: 'Paying over time',
  card: 'Personal loan, credit card or deferred-interest medical card: what spreading the bill really costs.',
  title: 'Plastic Surgery Financing 2026: Loan, Card or Deferred Plan',
  description: 'Plastic surgery financing in 2026: monthly payment and interest for a personal loan, a credit card and a deferred-interest card, at Federal Reserve averages.',
  h1: 'Paying for cosmetic surgery over time: what each option costs',
  intro: 'No lender is named here. Enter the amount and a rate: the calculator shows the monthly payment, the interest, and what a deferred-interest promotion charges back.',
  resume: `Spreading a ${K.usd(amt)} cosmetic surgery bill, about a tummy tuck benchmark, over 24 months costs very different amounts depending on the credit used. On a credit card at ${K.pct(C.cardAssessedInterest / 100, 2)}, the Federal Reserve's average rate in ${period} for accounts charged interest, the payment is ${K.usd(card.monthly)} a month and the interest ${K.usd(card.totalInterest)}. With a 24-month personal loan at the average rate of ${K.pct(C.personalLoan24 / 100, 2)} from commercial banks, the payment is ${K.usd(pl.monthly)} and the interest ${K.usd(pl.totalInterest)}. Medical credit cards often offer deferred interest: no interest if the balance is paid in full within the promotion, but all the interest of the period charged back if any balance remains. Paying ${K.usd(600)} a month on a twelve-month promotion would leave a balance and trigger ${K.usd(d.backInterest)} of back interest.`,
  body: (h) => `
<h2>Three ways to spread the bill</h2>
<p>A personal loan has a fixed rate, a fixed payment and a fixed end; its cost is known on the first day. A general credit card has a variable rate and a minimum payment that can stretch the debt over years. A medical credit card, offered at some practices, usually works as a deferred-interest card: interest accrues from the first day at the card's rate but is waived if the whole balance is paid before the promotion ends. The rates used here are averages from the Federal Reserve's ${h.src('fed_g19', 'G.19 release')}, not offers; your own rate depends on your credit.</p>
${h.table(['Option', 'Rate', 'Monthly payment', 'Total interest'], [
    ['Personal loan, 24 months', K.pct(C.personalLoan24 / 100, 2), K.usd(pl.monthly), K.usd(pl.totalInterest)],
    ['Credit card, repaid in 24 months', K.pct(C.cardAssessedInterest / 100, 2), K.usd(card.monthly), K.usd(card.totalInterest)],
    ['Deferred interest, 12 months, paid in full in time', '0 % if cleared', K.usd(d2.payoffMonthly), K.usd(0)],
    [`Deferred interest, 12 months, ${K.usd(600)} a month`, K.pct(C.cardAssessedInterest / 100, 2), K.usd(600), `${K.usd(d.backInterest)} charged back`],
  ], `Amount ${K.usd(amt)}. Rates: Federal Reserve G.19, ${period}.`, ['l', 'r', 'r', 'r'])}

<h2>The deferred-interest trap</h2>
<p>Under ${h.src('cfr_1026_16', 'Regulation Z, 12 CFR 1026.16(h)')}, a deferred-interest offer must say clearly that interest will be charged from the purchase date if the balance is not paid in full within the period. The arithmetic is unforgiving: on ${K.usd(amt)}, the payment that clears a twelve-month promotion is ${K.usd(d2.payoffMonthly)}; a smaller payment leaves a balance on the last day and brings back the interest of all twelve months. The calculator's detailed fields show the payment that avoids it and the amount charged otherwise.</p>
${h.mini('finance', { t: 'Your amount and rate', p: ['a', 'apr', 'm'], d: { a: amt } })}

<h2>Deposits and when the money is due</h2>
<p>A practice may ask for a deposit when the date is booked and the balance some time before the operation, and the facility and anesthesia group may be paid separately. Financing can therefore start before surgery, and interest runs from the day the loan is drawn or the card charged. A refund policy for a cancelled date, written in the agreement, matters as much as the rate: a deposit lost on a card at ${K.pct(C.cardAssessedInterest / 100, 2)} keeps costing interest until it is repaid. Asking for the payment schedule in writing, line by line, lets you time the loan to the bills rather than to the booking.</p>
<p>Spreading a smaller part of the bill costs proportionally less. Saving for part of it and borrowing only the rest over twelve months instead of twenty-four halves the interest period. The calculator above lets you change the amount, the rate and the number of months to compare those choices.</p>
<h2>What cannot pay for it</h2>
<p>Health savings accounts and flexible spending arrangements pay only for medical care as the tax rules define it. The ${h.src('irs_p502', 'IRS Publication 502')} states that amounts paid for cosmetic surgery generally cannot be included in medical expenses, naming face lifts, hair transplants and liposuction, unless the surgery corrects a deformity from a congenital abnormality, an injury or a disfiguring disease. The ${h.a('cosmetic-surgery-insurance', 'insurance page')} explains the same line for health plans, and the ${h.a('plastic-surgery-quote', 'quote page')} how to know what you are financing.</p>
`,
  faqs: [
    { q: 'What is the cheapest way to finance plastic surgery?', a: `Among the averages published by the Federal Reserve, a 24-month personal loan at ${K.pct(C.personalLoan24 / 100, 2)} costs less than a credit card at ${K.pct(C.cardAssessedInterest / 100, 2)}. A deferred-interest card costs nothing in interest only if the whole balance is paid within the promotion. Paying from savings costs no interest at all. Your own rates depend on your credit.` },
    { q: 'How does a deferred-interest medical card work?', a: 'Interest is calculated from the purchase date at the card’s rate but waived if the balance is paid in full before the promotion ends. If any balance remains on that date, all the interest of the period is charged at once. Regulation Z requires the offer to say so clearly. Dividing the amount by the number of months gives the payment that avoids it.' },
    { q: 'Can I use an HSA or FSA for cosmetic surgery?', a: 'Generally not. IRS Publication 502 excludes cosmetic surgery from medical expenses, naming face lifts, hair transplants and liposuction, unless it corrects a deformity from a congenital abnormality, an accident or trauma, or a disfiguring disease. Reconstructive surgery that meets that definition can qualify. Ask your plan administrator before paying with the account.' },
  ],
  tool: 'finance',
  toolArg: { a: amt },
  related: ['plastic-surgery-quote', 'cosmetic-surgery-insurance', 'mommy-makeover-cost', 'recovery-time-off'],
  sources: ['fed_g19', 'cfr_1026_16', 'irs_p502'],
});
