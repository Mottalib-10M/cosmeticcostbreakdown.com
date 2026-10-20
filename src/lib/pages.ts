/** Registry: every file of src/content/{procedures,metros} is loaded here. */
import type { GuideDef, MetroDef } from './page-types';
import { METROS } from './data';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: GuideDef }>(['../content/procedures/*.ts', '!../content/procedures/_*.ts'], { eager: true });
export const GUIDES: GuideDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const guideById = (id: string) => GUIDES.find((p) => p.id === id);

const s = import.meta.glob<{ default: MetroDef }>(['../content/metros/*.ts', '!../content/metros/_*.ts'], { eager: true });
export const METRO_PAGES: MetroDef[] = Object.entries(s).map(([f, m]) => {
  if (m.default.slug !== base(f)) throw new Error(`${f}: slug "${m.default.slug}" differs from the file name`);
  if (!METROS.some((x) => x.slug === m.default.slug)) throw new Error(`${f}: unknown metro`);
  return m.default;
}).sort((a, b) => a.slug.localeCompare(b.slug));
export const metroId = (slug: string) => `metro:${slug}`;
export const metroPageById = (id: string) => METRO_PAGES.find((p) => metroId(p.slug) === id);
/** First guide that carries a calculator: the target of a mini-simulator's link. */
export const pageOfTool = (kind: string) => GUIDES.find((p) => p.tool === kind)?.id;
