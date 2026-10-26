# 介護施設データの定期更新（年2回: 1月・7月ごろに新CSVが出る）
# 使い方:
#  1. curl -s https://www.mhlw.go.jp/stf/kaigo-kouhyou_opendata.html -o op.html （このスクリプトと同じ場所に）
#  2. python3 scripts/update-facilities.py → public/_tmp/kaigo_*.json ができる
#  3. commit & push → デプロイ後、pg_net で取り込み（docs/ARCHITECTURE.md「施設データの取り込み」の手順）
#     ※ insertのnot existsガードで、既存施設は重複しない（新規だけ追加される。閉鎖の反映はしない）
# 介護サービス情報公表システムのオープンデータCSV → hospitals取り込み用JSONチャンク
import csv, json, re, sys, urllib.request, io, os

OP = open('op.html', encoding='utf-8', errors='ignore').read()
# サービス種類コード → (facility_category, facility_type)。並び順＝重複時の優先順位
SERVICES = [
    ("520", "介護・高齢者福祉施設", "介護老人保健施設（老健）"),
    ("550", "介護・高齢者福祉施設", "介護医療院"),
    ("510", "介護・高齢者福祉施設", "特別養護老人ホーム（特養）"),
    ("540", "介護・高齢者福祉施設", "特別養護老人ホーム（特養）"),
    ("160", "介護・高齢者福祉施設", "デイケア"),
    ("140", "訪問・在宅分野", "訪問リハビリテーション事業所"),
    ("331", "介護・高齢者福祉施設", "有料老人ホーム"),
    ("361", "介護・高齢者福祉施設", "有料老人ホーム"),
    ("130", "訪問・在宅分野", "訪問看護ステーション"),
    ("720", "介護・高齢者福祉施設", "デイサービス"),
    ("150", "介護・高齢者福祉施設", "デイサービス"),
    ("780", "介護・高齢者福祉施設", "デイサービス"),
]
NOTE = "出典：厚生労働省「介護サービス情報公表システム」オープンデータ（2026年6月末時点、CC BY）を加工して作成"

def norm(s):
    return re.sub(r'\s+', '', (s or '')).replace('　', '')

seen = set()
records = []
for code, cat, typ in SERVICES:
    m = re.search(r'href="(/content/12300000/jigyosho_%s_all_2026[^"]*\.csv)"' % code, OP)
    assert m, code
    url = "https://www.mhlw.go.jp" + m.group(1)
    raw = urllib.request.urlopen(url, timeout=120).read()
    text = raw.decode('utf-8-sig', errors='replace')
    rows = list(csv.reader(io.StringIO(text)))
    h = rows[0]
    ix = {name: i for i, name in enumerate(h)}
    need = ['都道府県名', '市区町村名', '事業所名', '住所', '電話番号', 'URL']
    assert all(k in ix for k in need), (code, h[:10])
    added = 0
    for r in rows[1:]:
        if len(r) < len(h): continue
        name = (r[ix['事業所名']] or '').strip()
        pref = (r[ix['都道府県名']] or '').strip()
        city = (r[ix['市区町村名']] or '').strip()
        addr = (r[ix['住所']] or '').strip()
        if not name or not pref: continue
        key = (norm(name), pref, city)
        if key in seen: continue
        seen.add(key)
        phone = (r[ix['電話番号']] or '').strip()[:20] or None
        web = (r[ix['URL']] or '').strip()
        web = web if re.match(r'^https?://', web) else None
        records.append({
            "name": name[:120], "prefecture": pref, "city": city or None,
            "address": addr[:200] or None, "phone": phone,
            "website": (web or '')[:300] or None,
            "cat": cat, "typ": typ,
        })
        added += 1
    print(code, typ, added)

# 自己チェック: 件数・重複なし・必須列
assert len(records) > 80000, len(records)
assert len(seen) == len(records)
assert all(r["name"] and r["prefecture"] and r["cat"] for r in records)

out_dir = "/Users/akimotokazane/Projects/physinno/public/_tmp"
os.makedirs(out_dir, exist_ok=True)
CH = 5000
for i in range(0, len(records), CH):
    with open(f"{out_dir}/kaigo_{i//CH:02d}.json", "w", encoding="utf-8") as f:
        json.dump(records[i:i+CH], f, ensure_ascii=False)
print("total", len(records), "chunks", (len(records)+CH-1)//CH)
