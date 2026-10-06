#!/usr/bin/env python3
"""第57回のPDFは、埋め込みフォントの文字コードが壊れていて、括弧や一部の漢字が別の文字になる。
文字化けとして確認できたものを置き換える(読みながら足していく)。"""
import json, re, sys

REPL = [
    # 括弧が別の文字になっている(b・s・^・`・=・@)
    (r"(?<![A-Za-z])b(?![a-z])", "（"),
    (r"(?<=[0-9ＡＢ期限数Ⅱ])s(?=[\u3040-\u9fff])", "）"),
    (r"(?<=m/s（)", ""),
    (r"\^", "（"), ("`", "）"),
    (r"=(?=日本|重炭酸)", "（"), ("@", "）"),
    (r"(大|下|距)[/!](?=[部関切骨直二後])", r"\1腿"),
    ("»", "腿"),
    ("¹い", "這い"),
    ("末N血管", "末梢血管"), ("神経Y腫", "神経鞘腫"),
    ("°暗", "°≒"),
    ("Ca2袷", "Ca²⁺"), ("H袷", "H⁺"), ("K袷", "K⁺"), ("Na袷", "Na⁺"),
    ("思者", "患者"),
    ("或", "→"),
]


def fx(s):
    for a, b in REPL:
        s = re.sub(a, b, s)
    return s


def strip_no(r):
    """先頭に問題番号が混ざったもの(例: 156歳 → 6歳)を直す"""
    for k in ("stem",):
        t = r[k]
        no = str(r["no"])
        if t.startswith(no) and (t[len(no):len(no) + 1] and not t[len(no)].isdigit() or r["no"] == 15 and r["session"] == "pm"):
            r[k] = t[len(no):]


if __name__ == "__main__":
    path = sys.argv[1]
    rows = json.load(open(path))
    for r in rows:
        r["stem"] = fx(r["stem"])
        r["intro"] = fx(r["intro"])
        if (r["session"], r["no"]) in (("pm", 15), ("pm", 35)):
            strip_no(r)
        r["choices"] = [fx(c) for c in r["choices"]]
    json.dump(rows, open(path, "w"), ensure_ascii=False, indent=1)
