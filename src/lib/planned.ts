/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being
 *  written; the "all planned pages exist" test fails until each has its file. */
export const PLANNED_GUIDES = [
  'tummy-tuck-cost', 'liposuction-cost', 'bbl-cost', 'breast-augmentation-cost', 'breast-lift-cost', 'mommy-makeover-cost',
  'arm-lift-cost', 'thigh-lift-cost', 'gynecomastia-surgery-cost',
  'rhinoplasty-cost', 'facelift-cost', 'eyelid-surgery-cost', 'brow-lift-cost', 'chin-implant-cost', 'otoplasty-cost', 'botox-cost',
  'anesthesia-fee', 'surgery-center-vs-hospital', 'combined-procedures', 'plastic-surgery-quote', 'plastic-surgery-financing',
  'cosmetic-surgery-insurance', 'recovery-time-off', 'cosmetic-surgery-cost-by-city',
];
export const PLANNED_METROS = ['new-york', 'los-angeles', 'miami', 'houston', 'dallas', 'atlanta', 'chicago', 'phoenix', 'las-vegas', 'san-diego', 'washington-dc', 'boston'];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...PLANNED_METROS.map((s) => `metro:${s}`)]);
