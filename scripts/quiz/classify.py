#!/usr/bin/env python3
"""問題を単元に振り分ける（Gemini）。出力: quiz_N.json の unit を埋める。
  GEMINI_API_KEY=... python classify.py <quiz_N.json> ...
"""
import json, os, sys, time, urllib.request, re

units = json.load(open(os.path.join(os.path.dirname(__file__), "units.json")))
ids = [u["id"] for u in units]
catalog = "\n".join(f'- {u["id"]}: {u["name"]}（{u["field"]}）' for u in units)
KEY = os.environ["GEMINI_API_KEY"]


def call(prompt):
    body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0, "maxOutputTokens": 8192, "responseMimeType": "application/json"},
    }
    for model in ("gemini-flash-latest", "gemini-flash-lite-latest"):
        for attempt in range(4):
            try:
                req = urllib.request.Request(
                    f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                    data=json.dumps(body).encode(),
                    headers={"Content-Type": "application/json", "x-goog-api-key": KEY},
                )
                r = json.load(urllib.request.urlopen(req, timeout=120))
                return json.loads(r["candidates"][0]["content"]["parts"][0]["text"])
            except Exception as e:  # 混雑・一時エラー
                print("retry", model, attempt, str(e)[:80], file=sys.stderr)
                time.sleep(5 * (attempt + 1))
    raise RuntimeError("Gemini failed")


def short(r):
    t = (r["intro"] + " " + r["stem"]).strip()
    ch = " / ".join(c for c in r["choices"] if c)
    return f'{r["session"]}{r["no"]}: {t[:260]} 【選択肢】{ch[:200]}'


for path in sys.argv[1:]:
    rows = json.load(open(path))
    todo = [r for r in rows if not r.get("unit")]
    for i in range(0, len(todo), 40):
        batch = todo[i : i + 40]
        prompt = (
            "理学療法士国家試験の問題を、次の単元一覧から最も合う1つに分類してください。\n"
            f"単元一覧:\n{catalog}\n\n"
            "図や選択肢が省略されている問題は、問題文の内容から推測してください。\n"
            'JSONの配列で、各問題について {"k":"am12","unit":"単元id"} の形で、全問分を返してください。\n\n'
            + "\n".join(short(r) for r in batch)
        )
        res = call(prompt)
        m = {x["k"]: x["unit"] for x in res if x.get("unit") in ids}
        for r in batch:
            r["unit"] = m.get(f'{r["session"]}{r["no"]}')
        json.dump(rows, open(path, "w"), ensure_ascii=False, indent=1)
        print(path, i + len(batch), "/", len(todo), flush=True)
    miss = [r for r in rows if not r.get("unit")]
    print(path, "未分類", len(miss))
