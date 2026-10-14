#!/usr/bin/env python3
"""第56回のPDFは、第57回と同じく埋め込みフォントの文字コードが壊れている(OCRとの突き合わせでも直らなかった分)。
文字化けとして確認できたものを置き換える。  python fix56.py <quiz_56.json>"""
import json, re, sys

REPL = [
    # 全角の丸括弧が a / d になっている(「別冊No. 1」「(基準による)」など)
    (r"(?<![A-Za-z])a(?=[^\x00-\x7f])(?!に対するb)", "（"), (r"(?<=[0-9぀-鿿])d(?![a-z])", "）"),
    (r"(?<=No\. \d)d", "）"), (r"(?<=[0-9Torr%])a(?=基準)", "（"),
    ("\xad", "＞"), ("Ò", "＜"), ("Ó", "＞"),
    ("腱Å炎", "腱鞘炎"), ("末\x89", "末梢"),
    (r"(?<=HCO3)安", "⁻ "), ("安(?=[0-9])", "−"),
    (r"4\[を別に", "4）を別に"),
    # 午後は括弧が c f / h m になっている
    (r"(?<![a-z])c(?=[^\x00-\x7f])", "（"), (r"(?<=[0-9\u3040-\u9fff])f(?![A-Za-z])", "）"),
    (r"(?<=[\u3040-\u9fff])h(?=[A-Za-z])", "＜"), (r"(?<=[A-LO-Z])m(?=[^\x00-\x7f])", "＞"),
    ("Na袷", "Na⁺"), ("H袷", "H⁺"), ("亠", "÷"), (r"エディプス.藤", "エディプス葛藤"), ("5平上皮", "扁平上皮"), (r"B.hler", "Böhler"),
    ("示指安耳朶", "示指－耳朶"), ("CTY別冊", "CT（別冊"),
    ("理学療法土", "理学療法士"), ("作業療法土", "作業療法士"),
    ("Havershハバースm管", "Havers＜ハバース＞管"), ("くhuffing）", "＜huffing＞"), ("modifiedAshworthscale）", "modified Ashworth scale＞"), ("末L神経", "末梢神経"),
    (r"a% FVCd", "（%FVC）"), (r"cmH2Oa", "cmH2O（"), (r"(?<=0\.30)）?$", "）"),
]

# PDFの文字コードもOCRも読み違える数字・文字を、ページの画像を見て直したもの: (区分, 番号): [(直す前, 直した後), ...]（stem・intro・選択肢のどこでも）
FIX = {
    ("am", 8): [("86歳", "6歳"), ("筋力は1、", "筋力は5、")],
    ("am", 14): [("1日ごとに1°", "1日ごとに5°")],
    ("am", 31): [("0～4の1段階", "0～4の5段階")],
    ("am", 54): [("第1〜第3腰椎", "第1〜第2腰椎"), ("第2〜第1腰椎", "第3〜第4腰椎")],
    ("am", 75): [("第2度房室ブロックではP波", "第3度房室ブロックではP波")],
    ("am", 92): [("1歳 か月", "1歳6か月")],
    ("pm", 2): [("GCSE4V5M6", "GCS E4V5M6"), ("GCSE2V2M5", "GCS E2V2M5")],
    ("pm", 9): [("W/cm2", "W/cm²"), ("＜BNR）6", "＜BNR＞6")],
    ("pm", 15): [("手指\n、", "手指3、")],
    ("pm", 22): [("連続変数の\n群間", "連続変数の3群間")],
    ("pm", 42): [("術後\n日経過", "術後3日経過")],
    ("pm", 64): [("約6msec", "約5msec")],
    ("pm", 67): [("約2万個", "約1万個")],
    ("pm", 71): [("第1～6指", "第2〜5指")],
    ("pm", 10): [("108歳", "8歳")], ("pm", 16): [("168歳", "8歳")], ("pm", 26): [("268つ", "8つ")],  # 先頭に問題番号が混ざったもの
    ("pm", 12): [("<contract-relax）", "＜contract-relax＞"), ("<repeatedcontraction）", "＜repeated contraction＞")],
    ("pm", 20): [("<Karnofskyperformancescale）", "＜Karnofsky performance scale＞")],
    ("pm", 25): [("CRPSく複合性局所疼痛症候群）", "CRPS＜複合性局所疼痛症候群＞"), ("typeIに", "typeⅠに")],
    ("pm", 50): [("＜standardprecautions）", "＜standard precautions＞")],
    ("pm", 47): [("くhuffing）", "＜huffing＞")],
    ("pm", 88): [("hPMLm", "＜PML＞")],
    ("pm", 79): [("6つの過程", "5つの過程"), ("1番目", "2番目")],
}
# 選択肢の切れ目が壊れている問題は、選択肢ごと書き直す
CHOICES = {
    ("pm", 11): ["8 METs", "7 METs", "6 METs", "5 METs", "4 METs"],
    ("pm", 14): ["臥床時には股関節を内転位に保つ。", "靴下の着脱は股関節外旋位で行う。", "術後1週から大腿四頭筋セッティングを開始する。", "術後2週から中殿筋の筋力トレーニングを開始する。", "術後3か月は免荷とする。"],
    ("pm", 41): ["第3頸髄節自発呼吸", "第5頸髄節プッシュアップ動作", "第3胸髄節自動車への移乗", "第10胸髄節両長下肢装具を用いての歩行", "第12胸髄節両短下肢装具を用いての歩行"],
}
# 図のないページ全体が画像になってしまった問題(「図」「MRI」などの語に反応したもの)は、画像を付けない
NO_IMAGE = {("am", 75), ("am", 76), ("am", 79), ("am", 89), ("pm", 9), ("pm", 10), ("pm", 11), ("pm", 38), ("pm", 92)}
STEM_CUT = {("pm", 11): "18METs", ("pm", 41): "1．第\n頸髄節自発呼吸"}


def fx(s):
    for a, b in REPL:
        s = re.sub(a, b, s)
    return s


if __name__ == "__main__":
    path = sys.argv[1]
    rows = json.load(open(path))
    for r in rows:
        k = (r["session"], r["no"])
        if k in STEM_CUT:
            r["stem"] = r["stem"].replace(STEM_CUT[k], "")
        for a, b in FIX.get(k, []):
            for f in ("stem", "intro"):
                r[f] = r[f].replace(a, b)
            r["choices"] = [c.replace(a, b) for c in r["choices"]]
        r["stem"], r["intro"] = fx(r["stem"]), fx(r["intro"])
        r["choices"] = [fx(c) for c in r["choices"]]
        if k in NO_IMAGE:
            r["image"] = None
        if k in CHOICES:
            r["choices"] = CHOICES[k]
            r["choices_in_image"] = False
        r["choices"] = [re.sub(r"別冊$", "", c) for c in r["choices"]]  # 「別冊 No.」の枠が選択肢の末尾に混ざる
    json.dump(rows, open(path, "w"), ensure_ascii=False, indent=1)
