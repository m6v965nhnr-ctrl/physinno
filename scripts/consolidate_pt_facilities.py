#!/usr/bin/env python3
# PT求人サイト調査(リサーチ/2026-11-02_PT求人施設_*.csv + pt-ot-st-net)を1つにまとめ、
# 施設名で重複排除した最終リストを作る(読み取り専門、ワンオフ集計スクリプト)
import csv
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "リサーチ"

# (ファイル名, サイト列名か固定値, 都道府県列名か固定値, 市区町村列名, 求人数列名)
FILES = [
    ("2026-11-02_PT求人施設_中国四国.csv", "サイト", "県", "市区町村", "求人数"),
    ("2026-11-02_PT求人施設_九州沖縄.csv", "サイト", "県", "住所", "求人数"),
    ("2026-11-02_PT求人施設_北海道東北.csv", "サイト", "道県", "市区町村", "求人数"),
    ("2026-11-02_PT求人施設_東京都.csv", "サイト", None, "市区町村", "求人数"),
    ("2026-11-02_PT求人施設_東海.csv", "サイト", "県", "市区町村", "求人数"),
    ("2026-11-02_PT求人施設_甲信越北陸.csv", "サイト", "県", "市区町村", "求人数"),
    ("2026-11-02_PT求人施設_関東その他.csv", "サイト", "都県", "市区町村", "求人数"),
    ("2026-11-02_PT求人施設_関西.csv", "サイト", "府県", "市区町村", None),
    ("2026-11-02_pt-ot-st-net_facilities.csv", None, "都道府県", "市区町村", "求人数"),
]

def norm_name(name: str) -> str:
    # 重複判定用に緩く正規化(全角/半角スペース除去・前後空白・全角カッコの統一は行わない=安全側)
    return re.sub(r"[\s　]+", "", name).strip()

rows = []  # (facility, pref, city, site, jobs)
for fname, site_col, pref_col, city_col, jobs_col in FILES:
    path = ROOT / fname
    with open(path, encoding="utf-8-sig", newline="") as f:
        for r in csv.DictReader(f):
            facility = (r.get("施設名") or "").strip()
            if not facility:
                continue
            site = r.get(site_col).strip() if site_col and r.get(site_col) else "PT-OT-ST.NET"
            pref = r.get(pref_col).strip() if pref_col and r.get(pref_col) else ("東京都" if "東京都" in fname else "")
            city = r.get(city_col).strip() if city_col and r.get(city_col) else ""
            jobs_raw = r.get(jobs_col) if jobs_col else ""
            try:
                jobs = int(jobs_raw)
            except (TypeError, ValueError):
                jobs = 1
            rows.append((facility, pref, city, site, jobs))

print(f"読み込んだ行数(重複排除前・全サイト合算): {len(rows)}")

# 施設名で重複排除(同じ名前なら同一施設とみなす)。都道府県・市区町村・サイトは最初に見つかったものを採用、
# サイトは複数見つかれば集合で持つ。求人数は合計する
merged = {}
for facility, pref, city, site, jobs in rows:
    key = norm_name(facility)
    if key not in merged:
        merged[key] = {"facility": facility, "pref": pref, "city": city, "sites": set(), "jobs": 0}
    m = merged[key]
    m["sites"].add(site)
    m["jobs"] += jobs
    if not m["pref"] and pref:
        m["pref"] = pref
    if not m["city"] and city:
        m["city"] = city

print(f"施設名で重複排除後のユニーク施設数: {len(merged)}")

out_csv = ROOT / "2026-11-02_PT求人施設_全国統合.csv"
with open(out_csv, "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f)
    w.writerow(["施設名", "都道府県", "市区町村", "掲載サイト", "求人数合計(参考)"])
    for m in sorted(merged.values(), key=lambda x: (x["pref"], x["facility"])):
        w.writerow([m["facility"], m["pref"], m["city"], "・".join(sorted(m["sites"])), m["jobs"]])

# 都道府県別の集計
by_pref = defaultdict(int)
for m in merged.values():
    by_pref[m["pref"] or "(不明)"] += 1

print("\n都道府県別 施設数(上位15):")
for pref, n in sorted(by_pref.items(), key=lambda x: -x[1])[:15]:
    print(f"  {pref}: {n}")

print(f"\n保存先: {out_csv}")
