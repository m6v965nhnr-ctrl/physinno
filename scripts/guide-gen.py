#!/usr/bin/env python3
# テーマごとに NotebookLM で資料を探して読み、ガイドのJSONを作る。使い方: python3 scripts/guide-gen.py [slug ...]（なければ全部）
import json, re, subprocess, sys, datetime, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA, DRAFT = f"{ROOT}/src/content/guides/data", f"{ROOT}/src/content/guides/drafts"
LOG = os.environ.get("GUIDE_LOG", "/tmp/guide-gen.log")
os.makedirs(DATA, exist_ok=True); os.makedirs(DRAFT, exist_ok=True)
TODAY = datetime.date.today().isoformat()

def sh(args, timeout=900):
    r = subprocess.run(args, capture_output=True, text=True, timeout=timeout)
    return r.stdout + r.stderr

import time
def nq(nb, text, timeout=400):
    # 回数制限（usage limit）のときは、待って再試行する
    for i in range(6):
        raw = sh(["nlm", "notebook", "query", nb, text], timeout)
        if "usage limit" in raw or "temporarily rejected" in raw:
            time.sleep(150 * (i + 1)); continue
        time.sleep(8)
        return raw
    return raw

def log(m):
    open(LOG, "a").write(m + "\n")

PROMPT = """「{theme}」について、理学療法士・学生向けの解説ページを、次のJSONだけで出力してください。説明文・コードフェンス・引用番号（[1]など）は書かないこと。
形式: {{"title":"検索されやすい題名（例: ○○の方法・基準値・使い方）","description":"120字以内の要約","blocks":[{{"t":"p","x":"…"}},{{"t":"h2","x":"…"}},{{"t":"ul","items":["…"]}},{{"t":"table","head":["…"],"rows":[["…"]]}},{{"t":"note","x":"…"}}]}}
条件: blocksは8〜14個。最初はp（概要）。表を1つ以上。数値・基準値・診断基準は、資料に書かれているものだけを書き、資料によって違う場合は併記する。評価用紙や基準の全文は書き写さず、自分の言葉で要約する。資料に書かれていないことは書かない。最後に、注意のnote（目安であること、最新の公式資料で確認すること）を1つ。"""

def run(slug, cat, theme, dom):
    if os.path.exists(f"{DATA}/{slug}.json") or os.path.exists(f"{DRAFT}/{slug}.json"):
        return "skip"
    t = f"gg_{slug}"
    q = theme + " 公式 ガイドライン 基準 方法" if dom else theme + " 方法 基準値 カットオフ"
    sh(["nlm", "research", "start", q, "--title", t, "--mode", "fast", "--auto-import"], 700)
    nbs = json.loads(sh(["nlm", "notebook", "list"]) or "[]") if False else None
    out = sh(["nlm", "notebook", "list"])
    m = re.search(r'"id":\s*"([0-9a-f-]{36})",\s*"title":\s*"%s"' % re.escape(t), out)
    if not m: return "no-notebook"
    nb = m.group(1)
    ans = ""; raw = ""
    try:
        srcs = {s["id"]: s for s in json.loads(sh(["nlm", "source", "list", nb, "--json"]))}
        raw = nq(nb, PROMPT.format(theme=theme))
        res = json.loads(raw)
        ans = res.get("answer", "")
        used = [srcs[i] for i in res.get("sources_used", []) if i in srcs] or list(srcs.values())[:10]
        j = ans[ans.find("{"): ans.rfind("}") + 1]
        j = re.sub(r"\s?\[\d+(?:\s*[-,、]\s*\d+)*\]", "", j)
        g = json.loads(j)
        reasons = []
        blocks = [b for b in g.get("blocks", []) if b.get("t") in ("h2", "h3", "p", "ul", "table", "note")]
        for b in blocks:
            if b["t"] == "table" and (not b.get("head") or any(len(r) != len(b["head"]) for r in b.get("rows", []))): reasons.append("表の列数")
        if len(blocks) < 5: reasons.append("本文が短い")
        if not any(b["t"] == "table" for b in blocks): reasons.append("表なし")
        srcl = [{"name": (s.get("title") or s["url"])[:90], "url": s["url"]} for s in used if str(s.get("url", "")).startswith("http")]
        if len(srcl) < 2: reasons.append("出典が2件未満")
        if dom and not any(dom in s["url"] for s in srcl): reasons.append(f"{dom}の資料なし")
        guide = {"slug": slug, "title": g.get("title") or theme, "description": (g.get("description") or "")[:200], "category": cat,
                 "publishedAt": TODAY, "updatedAt": TODAY, "checkedOn": TODAY, "sources": srcl, "blocks": blocks}
        if not reasons:
            VQ = "次のページ原稿の、数値・基準値・固有名詞・用語のうち、資料に根拠がない、または資料と食い違うものだけを箇条書きにしてください。問題がなければ「問題なし」とだけ答えてください。\n"
            def check(bl):
                v = json.loads(nq(nb, VQ + json.dumps(bl, ensure_ascii=False))).get("answer", "")
                return v.strip().startswith("問題なし") and len(v.strip()) < 40, v.strip()
            ok, v = check(blocks)
            if not ok:
                r2 = json.loads(nq(nb, "次の指摘をふまえ、資料に根拠のある内容だけに直して、blocks配列のJSONだけを出力してください（説明・引用番号は不要）。\n指摘:\n" + v + "\n原稿:\n" + json.dumps(blocks, ensure_ascii=False))).get("answer", "")
                try:
                    j2 = re.sub(r"\s?\[\d+(?:\s*[-,、]\s*\d+)*\]", "", r2[r2.find("["): r2.rfind("]") + 1])
                    b2 = [b for b in json.loads(j2) if b.get("t") in ("h2", "h3", "p", "ul", "table", "note")]
                    ok2, v2 = check(b2) if len(b2) >= 5 else (False, "修正後が短い")
                    if ok2: blocks = b2; guide["blocks"] = b2; ok = True
                    else: v = v2
                except Exception:
                    pass
            if not ok:
                reasons.append("検証:" + v.replace("\n", " ")[:300])
        dest = DRAFT if reasons else DATA
        json.dump(guide, open(f"{dest}/{slug}.json", "w"), ensure_ascii=False, indent=1)
        return "draft: " + " / ".join(reasons) if reasons else "ok"
    except Exception as e:
        import traceback; log("TRACE " + slug + " raw=" + raw[:300].replace("\n"," "))
        return f"error: {type(e).__name__} {str(e)[:120]}"
    finally:
        sh(["nlm", "notebook", "delete", nb, "--confirm"])

rows = [l.rstrip("\n").split("\t") for l in open(f"{ROOT}/scripts/guide-topics.tsv") if l.strip()]
want = set(sys.argv[1:])
for r in rows:
    slug, cat, theme = r[0], r[1], r[2]
    dom = r[3] if len(r) > 3 else ""
    if want and slug not in want: continue
    try: s = run(slug, cat, theme, dom)
    except Exception as e: s = f"error: {type(e).__name__} {str(e)[:120]}"
    log(f"{slug}\t{s}")
