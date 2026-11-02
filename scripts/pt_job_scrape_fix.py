#!/usr/bin/env python3
"""pt_job_scrape.pyのjob-medley抽出を、住所を1行まるごと取る形に直した版。
使い方: python3 pt_job_scrape_fix.py <pref_param> <pref_name_jp> <out_csv>
"""
import sys
import re
import time
sys.path.insert(0, "scripts")
from pt_job_scrape import TextExtractor, fetch


def extract_jobmedley(html, pref_name):
    p = TextExtractor()
    p.feed(html)
    text = p.text()
    rows = []
    for m in re.finditer(r"(.+?)の理学療法士求人(?:（[^）]*）)?\n", text):
        name = m.group(1).strip()
        if not name or len(name) > 80:
            continue
        tail = text[m.end(): m.end() + 800]
        am = re.search(r"住所\n([^\n]+)", tail)
        addr = am.group(1).strip() if am else ""
        rows.append(("job-medley.com", pref_name, name, addr))
    return rows


def main():
    pref_param, pref_name, out_csv = sys.argv[1:4]
    counts = {}
    addrs = {}
    prev_names = None
    seen_empty = 0
    page = 1
    while True:
        url = f"https://job-medley.com/pt/{pref_param}/?page={page}"
        try:
            html = fetch(url)
        except Exception as e:
            print(f"page {page}: fetch error {e}", file=sys.stderr)
            break
        rows = extract_jobmedley(html, pref_name)
        names_here = tuple(r[2] for r in rows)
        if names_here and names_here == prev_names:
            print(f"stop at page {page} (same as previous page)", file=sys.stderr)
            break
        prev_names = names_here
        if not rows:
            seen_empty += 1
            if seen_empty >= 2:
                print(f"stop at page {page} (empty)", file=sys.stderr)
                break
        else:
            seen_empty = 0
            for _, pref, name, addr in rows:
                counts[name] = counts.get(name, 0) + 1
                if addr:
                    addrs[name] = addr
        page += 1
        time.sleep(0.4)
    with open(out_csv, "w", encoding="utf-8") as f:
        for name, n in counts.items():
            name_q = name.replace('"', '""')
            f.write(f'job-medley.com,{pref_name},"{name_q}",{addrs.get(name, "")},{n}\n')
    print(f"done: {len(counts)} unique facilities, {page - 1} pages, written to {out_csv}")


if __name__ == "__main__":
    main()
