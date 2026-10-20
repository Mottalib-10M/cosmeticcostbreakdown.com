/** llms.txt (RECETTE §21), generated from the page registry. */
import { GUIDES, METRO_PAGES, metroId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS, label } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> What a cosmetic procedure costs in the United States, split into the lines of the bill: the surgeon's fee (national survey average, with its year), the anesthesia (CMS base units and 2026 locality conversion factor) and the operating room (CMS October 2026 surgery center and hospital outpatient rates adjusted with the FY 2026 wage index), for 26 metro areas. Tummy tuck, liposuction, Brazilian butt lift, breast augmentation and lift, rhinoplasty, facelift, eyelid and brow surgery, chin implant, otoplasty, arm and thigh lift, gynecomastia surgery, Botox. Independent site published by Radif Partners; general information, not a quote and not medical advice. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## Cosmetic surgery costs by city', ...METRO_PAGES.map((s) => `- [${label(metroId(s.slug))}](${SITE_URL}${route(metroId(s.slug), 'en')}): ${s.intro}`), '',
    '## About', `- [Where each line comes from](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
