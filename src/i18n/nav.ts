import { route, type Locale } from './routes';
import { GUIDES, guideById, metroPageById, METRO_PAGES, metroId } from '../lib/pages';
import { METROS } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Cost breakdown calculator', method: 'Where each line comes from', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'body', label: 'Body and breast' },
  { id: 'face', label: 'Face and injectables' },
  { id: 'bill', label: 'Reading the bill' },
];
const mName = (slug: string) => METROS.find((s) => s.slug === slug)?.name ?? slug;
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const g = guideById(id); if (g) return g.nav;
  const s = metroPageById(id); if (s) return `Cosmetic surgery costs in ${mName(s.slug)}`;
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every metro page from the footer: one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => METRO_PAGES.map((s) => ({ href: route(metroId(s.slug), lang), label: mName(s.slug) }));
