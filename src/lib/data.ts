/**
 * The data asset: CMS rates of every code used (rates.json) and the local factors of each metro area
 * (metros.json), both written by scripts/build-data.py; the site's own choices in params-2026.json.
 * This file ships to the browser through tool-specs.ts.
 */
import P from '../data/params-2026.json';
import RATES_RAW from '../data/rates.json';
import METROS_RAW from '../data/metros.json';
import { cost, defaultMinutes, type Place, type Proc, type Rates, type Rules, type Setting } from './engine/cost';

export interface Procedure extends Proc { id: string; label: string; short: string; unit: string; aspsSource: string; minutesSource: string; kind: string }
export interface Metro extends Place { slug: string; name: string; cbsa: string; state: string; mac: string; locality: string; area: string; localityName: string }

export const RATES = RATES_RAW as unknown as Rates & { asp: Record<string, { label: string; dosage: string; limit: number }> };
export const RULES: Rules = P.rules;
export const PROCS: Record<string, Procedure> = Object.fromEntries(
  Object.entries(P.procedures).map(([id, p]) => [id, { id, ...(p as Omit<Procedure, 'id'>) }]),
);
export const PROC_IDS = Object.keys(PROCS);
export const METROS = (METROS_RAW as unknown as Metro[]).slice().sort((a, b) => a.name.localeCompare(b.name));

export const proc = (id: string): Procedure => { const p = PROCS[id]; if (!p) throw new Error(`Unknown procedure ${id}`); return p; };
export const metro = (slug: string): Metro => { const m = METROS.find((x) => x.slug === slug); if (!m) throw new Error(`Unknown metro ${slug}`); return m; };
/** "us" = national rates, no local adjustment. */
export const placeOf = (slug: string): Metro | null => (slug === 'us' ? null : metro(slug));
export const placeName = (slug: string) => (slug === 'us' ? 'the United States (national rates)' : metro(slug).name);
export const minutesOf = (id: string) => defaultMinutes(proc(id), RATES);

/** Benchmark cost of one procedure (no quote, no recovery). */
export const estimate = (id: string, slug = 'us', setting: Setting = 'asc') => cost({ procs: [proc(id)], setting, place: placeOf(slug) }, RATES, RULES);

/** One procedure in every metro, sorted from the highest total down. */
export function acrossMetros(id: string, setting: Setting = 'asc') {
  return METROS.map((m) => ({ m, c: estimate(id, m.slug, setting) })).sort((a, b) => b.c.total - a.c.total);
}
