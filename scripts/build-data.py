#!/usr/bin/env python3
"""Builds src/data/rates.json and src/data/metros.json from the public CMS files (CONTRIBUTING-PAGES.md).

Raw files live in .cache/raw/ (outside git). Each one is downloaded from the address in RAW below; rerun the
script after a new quarterly release and compare the diff of the two JSON files.

    python3 scripts/build-data.py            # reads .cache/raw/, downloads what is missing
    python3 scripts/build-data.py --check    # fails if the JSON files on disk differ from a fresh build

What it extracts, and nothing else:
  - ASC national payment rate, payment indicator and multiple-procedure flag of every CPT code used by a
    procedure (Addendum AA, October 2026);
  - OPPS status indicator and national payment rate of the same codes (Addendum B, October 2026);
  - anesthesia base units of the anesthesia codes used (CMS base unit file, latest edition posted: CY 2022);
  - median intra-service minutes of each CPT code (CY 2026 PFS physician work time file);
  - payment limit per unit of the botulinum toxin codes (ASP file, October 2026);
  - for each metro area: FY 2026 wage index of its CBSA (pre-floor, pre-reclassification value for the ASC
    adjustment, final value for the hospital outpatient adjustment) and the CY 2026 anesthesia conversion factor
    of its Medicare locality (non-qualifying APM column).
"""
import csv, io, json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
RAW_DIR = os.path.join(SITE, '.cache', 'raw')
PARAMS = json.load(open(os.path.join(SITE, 'src/data/params-2026.json')))

# Published file (inside the CMS zip) -> local name. The zips are on the pages cited in params-2026.json > sources.
RAW = {
    'asc-aa-oct-2026.csv': 'https://www.cms.gov/files/zip/october-2026-asc-approved-hcpcs-code-payment-rates.zip :: 508-Version-Oct-2026-ASC-AA.csv',
    'opps-b-oct-2026.txt': 'https://www.cms.gov/files/zip/October-2026-OPPS-Addendum-B.zip :: 508-compliant-version-2026_October_Web_Addendum_B.10.14.26.txt',
    'anes-cf-2026.csv': 'https://www.cms.gov/files/zip/rvu26d-updated-08-26-2026.zip :: ANES2026.csv',
    'anes-base-units-2022.txt': 'https://www.cms.gov/files/zip/2022-anesthesia-base-units-cpt-code.zip :: Section 508 compliant version of CY_2022_Anesthesia_Base_Units_110921.txt',
    'wage-index-fy2026-table3.txt': 'https://www.cms.gov/files/zip/fy2026-ipps-fr-tables-2-3-4a-4b.zip :: CMS-1833-F Tables 3.txt',
    'pfs-work-time-2026.csv': 'https://www.cms.gov/files/zip/cy-2026-pfs-final-rule-physician-work-time-updated-01-08-2026.zip :: CY 2026 Efficiency Adjusted Work Times.csv',
    'asp-oct-2026.csv': 'https://www.cms.gov/files/zip/october-2026-medicare-part-b-payment-limit-files-final.zip :: section 508 version of October 2026 Medicare Part B Payment Limit File 091626.csv',
}


def fetch(name):
    path = os.path.join(RAW_DIR, name)
    if os.path.exists(path):
        return path
    import zipfile
    url, inner = [x.strip() for x in RAW[name].split('::')]
    os.makedirs(RAW_DIR, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req, timeout=120).read()
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        open(path, 'wb').write(z.read(inner))
    return path


def text(name):
    return open(fetch(name), 'rb').read().decode('latin-1')


def money(s):
    s = s.replace('$', '').replace(',', '').replace('"', '').strip()
    return float(s) if s and s not in ('.',) else None


def codes_used():
    cpt, asa = set(), set()
    for p in PARAMS['procedures'].values():
        for line in p.get('codes', []):
            cpt.add(line['cpt'])
        if p.get('asa'):
            asa.add(p['asa'])
    return sorted(cpt), sorted(asa)


def asc_rates(cpts):
    out = {}
    rows = list(csv.reader(io.StringIO(text('asc-aa-oct-2026.csv'))))
    for r in rows:
        if r and r[0].strip() in cpts:
            out[r[0].strip()] = {'indicator': r[4].strip(), 'multiple': r[3].strip() == 'Y', 'rate': money(r[6]), 'label': r[2].strip()}
    return out


def opps_rates(cpts):
    out = {}
    for line in text('opps-b-oct-2026.txt').splitlines():
        f = line.split('\t')
        if f and f[0].strip() in cpts:
            out[f[0].strip()] = {'status': f[2].strip(), 'apc': f[3].strip(), 'rate': money(f[5]) if len(f) > 5 else None}
    return out


def base_units(asas):
    out = {}
    for line in text('anes-base-units-2022.txt').splitlines():
        f = line.split('\t')
        if len(f) >= 2 and f[0].strip() in asas:
            out[f[0].strip()] = int(f[1])
    return out


def work_time(cpts):
    out = {}
    for r in csv.DictReader(io.StringIO(text('pfs-work-time-2026.csv'))):
        if r['cpt_code'] in cpts:
            out[r['cpt_code']] = float(r['Median_Intra_Service_Time'])
    return out


def asp_limits():
    out = {}
    for r in csv.reader(io.StringIO(text('asp-oct-2026.csv'))):
        if r and r[0] in ('J0585', 'J0586', 'J0588', 'J0589'):
            out[r[0]] = {'label': r[1], 'dosage': r[2], 'limit': float(r[3])}
    return out


def anes_cf():
    out, national = {}, None
    for r in csv.reader(io.StringIO(text('anes-cf-2026.csv'))):
        if not r:
            continue
        if r[0].startswith('Contractor'):
            # Header gives the national factors: "... Non-Qualifying APM National Anes CF (...) of 20.49754"
            m = re.search(r'Non-Qualifying APM National Anes CF.*? of ([0-9.]+)', ','.join(r))
            national = float(m.group(1))
            continue
        if re.match(r'^\d{5}', r[0].strip()):
            out[(r[0].strip(), r[1].strip())] = {'name': r[2].strip(), 'cf': float(r[4])}
    return out, national


def wage_index():
    out = {}
    for line in text('wage-index-fy2026-table3.txt').splitlines():
        f = line.split('\t')
        if len(f) > 6 and re.match(r'^\d{5}$', f[0].strip()):
            wi = f[6].strip()
            pre = f[14].strip() if len(f) > 14 else ''
            if not wi:
                continue
            out[(f[0].strip(), f[2].strip())] = {'area': f[1].strip().strip('"'), 'final': float(wi), 'preFloor': float(pre) if pre else float(wi)}
    return out


def build():
    cpts, asas = codes_used()
    asc, opps, bu, tm = asc_rates(cpts), opps_rates(cpts), base_units(asas), work_time(cpts)
    miss = [c for c in cpts if c not in asc] + [c for c in cpts if c not in opps] + [a for a in asas if a not in bu]
    if miss:
        sys.exit(f'Missing codes in the CMS files: {miss}')
    cf, national_cf = anes_cf()
    wi = wage_index()
    rates = {'cpt': {c: {'asc': asc[c], 'opps': opps[c], 'intraMinutes': tm.get(c)} for c in cpts},
             'asa': bu, 'anesNationalCf': national_cf, 'asp': asp_limits()}
    metros = []
    for m in PARAMS['metros']:
        w = wi.get((m['cbsa'], m['state']))
        loc = cf.get((m['mac'], m['locality']))
        if not w or not loc:
            sys.exit(f"Metro {m['slug']}: CBSA {m['cbsa']}/{m['state']} or locality {m['mac']}/{m['locality']} not found")
        metros.append({**m, 'area': w['area'], 'wiAsc': w['preFloor'], 'wiHospital': w['final'], 'localityName': loc['name'], 'anesCf': loc['cf']})
    return rates, metros


def dump(obj):
    return json.dumps(obj, indent=1, ensure_ascii=False, sort_keys=True) + '\n'


if __name__ == '__main__':
    rates, metros = build()
    files = {'src/data/rates.json': dump(rates), 'src/data/metros.json': dump(metros)}
    if '--check' in sys.argv:
        bad = [f for f, s in files.items() if open(os.path.join(SITE, f)).read() != s]
        sys.exit(f'Out of date: {bad}' if bad else 0)
    for f, s in files.items():
        open(os.path.join(SITE, f), 'w').write(s)
        print('wrote', f)
