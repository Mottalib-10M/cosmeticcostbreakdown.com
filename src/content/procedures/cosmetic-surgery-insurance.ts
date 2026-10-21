import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const bl = K.est('breast_lift');
const rh = K.est('rhinoplasty');
const up = K.est('eyelid_upper');

export default defineGuide({
  id: 'cosmetic-surgery-insurance',
  group: 'bill',
  order: 22,
  slug: 'does-insurance-cover-cosmetic-surgery',
  nav: 'Insurance and cosmetic surgery',
  card: 'Where plans and Medicare draw the line between cosmetic and reconstructive, and the federal rules behind it.',
  title: 'Cosmetic Surgery Insurance 2026: What Plans Cover, Exclude',
  description: 'Cosmetic surgery insurance in 2026: the Medicare exclusion, breast reconstruction under federal law, the IRS medical expense rule, how plans split mixed cases.',
  h1: 'Does insurance cover cosmetic surgery? Where the line runs',
  intro: 'Health plans pay for operations that restore function or repair a defect, not for those that change appearance; the same code can fall on either side.',
  resume: `Health insurance does not pay for surgery whose purpose is to change appearance, and Medicare writes that exclusion into federal regulation: 42 CFR 411.15(h) excludes cosmetic surgery and related expenses, except for the prompt repair of an accidental injury or to improve the functioning of a malformed body member. Private plans use similar language in their own contracts. The same operations are covered when they are reconstructive. Federal law requires group plans and individual policies that cover a mastectomy to cover reconstruction of the breast, surgery on the other breast for symmetry, and prostheses, under the Women's Health and Cancer Rights Act. A rhinoplasty that restores breathing, an eyelid lift for lids that block vision, a skin removal for a documented medical problem can each be covered after prior approval. When an operation mixes both purposes, the covered part goes to the plan and the cosmetic part to the patient, on separate lines.`,
  body: (h) => `
<h2>The rule in federal regulation</h2>
<p>The Medicare exclusion in ${h.src('cfr_411_15', '42 CFR 411.15(h)')} is short: cosmetic surgery is excluded, except as required for the prompt repair of accidental injury or to improve the functioning of a malformed body member. Because Medicare does not cover cosmetic work, this site uses Medicare's rates only as a benchmark of what the same codes are paid when they are covered. Private plans define the exclusion in their evidence of coverage, often with medical policies for each procedure that list the conditions under which they pay.</p>
<p>Breast reconstruction is the major federal exception. ${h.src('cms_whcra', 'CMS describes the Women’s Health and Cancer Rights Act of 1998')}: a plan that pays for a mastectomy must cover all stages of reconstruction of that breast, surgery and reconstruction of the other breast to produce a symmetrical appearance, and prostheses and treatment of physical complications, including lymphedema. It applies to group health plans and to individual policies.</p>

<h2>Mixed operations</h2>
<p>Some operations serve both purposes. A rhinoplasty can reshape the nose while a septal repair restores breathing; an upper eyelid operation can remove skin that blocks vision; a skin excision after weight loss can treat a documented skin problem. The plan pays for the part that meets its criteria, after prior approval, and the patient pays the rest. That works only if the quote and the claim keep the two parts on separate lines. At the benchmark rates of this site, the room and anesthesia alone come to ${K.usd(rh.total)} for a cosmetic rhinoplasty, ${K.usd(up.total)} for an upper eyelid operation and ${K.usd(bl.total)} for a breast lift; with the surgeon's fee on top, that is the amount at stake when coverage is refused.</p>
${h.mini('cost', { t: 'The bill if the plan says no', p: ['pr', 'mx'], d: { pr: 'eyelid_upper' } })}

<h2>Taxes and health accounts</h2>
<p>The ${h.src('irs_p502', 'IRS Publication 502')} follows the same line for the medical expense deduction and therefore for health savings accounts and flexible spending arrangements: cosmetic surgery is generally not a medical expense, the publication naming face lifts, hair transplants, hair removal and liposuction, unless it is necessary to improve a deformity arising from a congenital abnormality, a personal injury from an accident or trauma, or a disfiguring disease. Breast reconstruction after a mastectomy for cancer is listed as a medical expense.</p>

<h2>Asking a plan</h2>
<p>A plan's answer before the operation is worth more than any general rule. Ask for its medical policy on the procedure, have the surgeon submit a prior authorization with the documentation the policy requires, and keep the written decision. If the plan refuses, it must explain how to appeal. The ${h.a('plastic-surgery-quote', 'quote page')} shows how to split the bill, and the ${h.a('plastic-surgery-financing', 'financing page')} what paying for the cosmetic part over time costs.</p>
`,
  faqs: [
    { q: 'Does health insurance cover cosmetic surgery?', a: 'Not when its purpose is to change appearance. Medicare excludes cosmetic surgery by regulation, and private plans exclude it in their contracts. Plans do cover reconstructive operations, such as breast reconstruction after a mastectomy, repair after an accident or correction of a defect that impairs function, usually after prior approval and according to their written medical policies.' },
    { q: 'Is breast reconstruction after a mastectomy covered?', a: 'Yes, by federal law when the plan covers the mastectomy. The Women’s Health and Cancer Rights Act requires coverage of all stages of reconstruction of the breast, surgery on the other breast for symmetry, prostheses and treatment of complications, including lymphedema. It applies to group health plans and individual policies; deductibles and coinsurance of the plan still apply.' },
    { q: 'Can a nose job be partly covered by insurance?', a: 'Yes, when part of the operation treats a breathing problem or an injury and the plan approves it. The functional part, such as a septal repair, is billed to the plan and the cosmetic reshaping to the patient. The quote, the authorization request and the claim should keep the two parts on separate lines, with separate codes.' },
  ],
  tool: 'cost',
  toolArg: { pr: 'eyelid_upper' },
  related: ['plastic-surgery-financing', 'eyelid-surgery-cost', 'rhinoplasty-cost', 'plastic-surgery-quote'],
  sources: ['cfr_411_15', 'cms_whcra', 'irs_p502'],
});
