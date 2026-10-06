#!/usr/bin/env python3
"""第N回の問題PDF一式から quiz_N.json と図の画像を作る。

  python build.py <回> <tpコード> <保存先フォルダ> <PDFフォルダ>
  例) python build.py 60 tp250428 ./build ./pdf

PDFは厚労省のページからダウンロードしておく(問題 08a_01, 別冊 08a_02, 午後 08b_01/08b_02, 正答 08seitou)。
出典: 厚生労働省ホームページ（公共データ利用規約 PDL1.0）
"""
import json, os, re, sys
import fitz
sys.path.insert(0, os.path.dirname(__file__))
import extract as e

exam_no, code, out, pdfdir = int(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4]
img_dir = os.path.join(out, "img", str(exam_no))
os.makedirs(img_dir, exist_ok=True)

def load_ocr(path):
    """文字化けするPDF用: OCR結果(JSON行)を {a|b: {ページ: [...]}} にする"""
    out = {"a": {}, "b": {}}
    if not path or not os.path.exists(path):
        return out
    for line in open(path):
        o = json.loads(line)
        name = os.path.basename(o["f"])  # a_006.png
        x, pg = name[0], int(name[2:5])
        out[x].setdefault(pg, []).append(o)
    return out


ocr_all = load_ocr(os.environ.get("QUIZ_OCR"))
answers = e.read_answers(os.path.join(pdfdir, f"{code}-08seitou.pdf"))
rows = []
for sess, x in (("am", "a"), ("pm", "b")):
    q = os.path.join(pdfdir, f"{code}-08{x}_01.pdf")
    b = os.path.join(pdfdir, f"{code}-08{x}_02.pdf")
    ocr = ocr_all[x] or None
    fm = e.learn_fontmap(fitz.open(q), ocr) if (ocr and os.environ.get('QUIZ_OCR_MODE') == 'fontmap') else None
    if fm:
        print("フォント対応を", len(fm), "文字ぶん学習しました", file=sys.stderr)
    qs, missing = e.build(exam_no, sess, q, b, None, img_dir, ocr, fm)
    assert not missing, (sess, missing)
    saved_q, saved_b = e.render_figures(exam_no, sess, q, b, qs, img_dir)
    for r in qs:
        sets = answers[(sess, r["no"])]
        need = int(m.group(1)) if (m := re.search(r"([2-4])\s*つ選べ", r["stem"])) else 1
        if any(len(s) != need for s in sets):
            print("WARN 選択数が合わない", exam_no, sess, r["no"], sets, need)
        rows.append({
            "exam_no": exam_no,
            "session": sess,
            "no": r["no"],
            "intro": r["intro"],
            "stem": r["stem"],
            "choices": r["choices"],
            "answers": sets,
            "excluded": not sets,
            "need": need,
            "image": f"{exam_no}/{saved_q[r['no']]}" if r["no"] in saved_q else None,
            "book_images": [f"{exam_no}/{saved_b[n]}" for n in r["book"] if n in saved_b],
            "choices_in_image": any(c == "" for c in r["choices"]),
        })
        miss_b = [n for n in r["book"] if n not in saved_b]
        if miss_b:
            print("WARN 別冊の画像が見つからない", exam_no, sess, r["no"], miss_b)
with open(os.path.join(out, f"quiz_{exam_no}.json"), "w") as f:
    json.dump(rows, f, ensure_ascii=False, indent=1)
print(exam_no, len(rows), "問", sum(1 for r in rows if r["excluded"]), "問が採点除外")
