#!/usr/bin/env python3
"""厚労省の理学療法士国家試験PDF(問題・別冊・正答)を、1問ずつのJSONと図の画像に変換する。

使い方: python extract.py <回> <問題PDF午前> <別冊PDF午前> <問題PDF午後> <別冊PDF午後> <正答PDF> <出力先>
出典: 厚生労働省ホームページ（公共データ利用規約 PDL1.0）
"""
import json, re, sys, os, unicodedata
import fitz

FIG_WORDS = re.compile(r"図|写真|別冊|グラフ|波形|心電図|エックス線|MRI|CT|超音波|表に示|表を|模式")


def norm(s):
    s = s.replace("　", " ")
    s = re.sub(r"(?<=[0-9A-Za-z%）\)])\s+(?=[぀-ヿ一-鿿（])", "", s)
    s = re.sub(r"(?<=[぀-ヿ一-鿿（])\s+(?=[0-9A-Za-z（])", "", s)
    s = re.sub(r"(?<=[0-9])\s+(?=[0-9])", "", s) if False else s
    cjk = "぀-ヿ㐀-鿿Α-ω"
    s = re.sub(rf"(?<=[{cjk}]) +(?=[{cjk}])", "", s)
    s = re.sub(rf"(?<=[A-Za-z0-9Α-ω]) +(?=[{cjk}])", "", s)
    s = re.sub(r"[ \t]+", " ", s).strip()
    return s


GARBLE = re.compile(r"[\x00-\x08\x0b-\x1f\u00dd-\u00ff\u5eb5]")


def repair(layer, ocr):
    """文字化けした文字(埋め込みフォントの対応表がない)だけを、OCRの文字で置き換える。それ以外はPDFの文字をそのまま使う"""
    import difflib
    a = re.sub(r"\s+", "", layer)
    b = re.sub(r"\s+", "", ocr)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    if sm.ratio() < 0.5:
        return b
    out = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        seg = a[i1:i2]
        if tag == "equal":
            out.append(seg)
        elif tag == "replace":
            out.append(b[j1:j2] if GARBLE.search(seg) else seg)
        elif tag == "delete":
            out.append(GARBLE.sub("", seg))
        # insert: OCRだけにある文字は使わない
    t = "".join(out)
    # 「2つ選べ」の数字が落ちている場合はOCRから補う
    if re.search(r"(?<![0-9２３４])つ選べ", t):
        m = re.search(r"([2-4２-４])\s*つ選べ", ocr)
        if m:
            t = re.sub(r"(?<![0-9２３４])つ選べ", m.group(1) + "つ選べ", t, count=1)
    return t


def learn_fontmap(doc, ocr, first_page=3):
    """埋め込みフォントの文字コードが壊れているPDF用。
    (フォント, 文字)→本当の文字 の対応を、OCR結果との突き合わせ(多数決)で学習する"""
    import difflib, collections
    votes = collections.defaultdict(collections.Counter)
    for pi in range(first_page, len(doc)):
        page = doc[pi]
        pw, ph = page.rect.width, page.rect.height
        items = ocr.get(pi, [])
        if not items:
            continue
        for b in page.get_text("dict")["blocks"]:
            if b["type"] != 0:
                continue
            for l in b["lines"]:
                chars = [(sp["font"], ch) for sp in l["spans"] for ch in sp["text"] if not ch.isspace()]
                if not chars:
                    continue
                x0, y0, x1, y1 = l["bbox"]
                hit = [
                    it for it in items
                    if y0 / ph - 0.004 <= it["y"] + it["h"] / 2 <= y1 / ph + 0.004
                    and (x0 / pw - 0.01) <= it["x"] + it["w"] / 2 <= (x1 / pw + 0.01)
                ]
                if not hit:
                    continue
                hit.sort(key=lambda it: it["x"])
                o = re.sub(r"\s+", "", "".join(it["t"] for it in hit))
                a = "".join(ch for _, ch in chars)
                sm = difflib.SequenceMatcher(None, a, o, autojunk=False)
                if sm.ratio() < 0.6:
                    continue
                for tag, i1, i2, j1, j2 in sm.get_opcodes():
                    if tag == "equal":
                        for k in range(i1, i2):
                            votes[chars[k]][a[k]] += 1
                    elif tag == "replace" and (i2 - i1) == (j2 - j1):
                        for k in range(i2 - i1):
                            votes[chars[i1 + k]][o[j1 + k]] += 1
    fm = {}
    for key, c in votes.items():
        best, n = c.most_common(1)[0]
        total = sum(c.values())
        if best != key[1] and n >= 2 and n / total >= 0.6:
            fm[key] = best
    return fm


def lines_of(doc, first_page, ocr=None, fontmap=None):
    """ocr: {ページ番号: [{t, x, y, w, h}...]}（正規化座標）。文字化けしたPDF用に、行の位置に重なるOCR結果で文字を置き換える"""
    out = []
    for pi in range(first_page, len(doc)):
        page = doc[pi]
        pw, ph = page.rect.width, page.rect.height
        d = page.get_text("dict")
        items = (ocr or {}).get(pi, [])
        for b in d["blocks"]:
            if b["type"] != 0:
                continue
            for l in b["lines"]:
                if fontmap:
                    t = "".join(fontmap.get((sp["font"], ch), ch) for sp in l["spans"] for ch in sp["text"])
                else:
                    t = "".join(s["text"] for s in l["spans"])
                if not t.strip():
                    continue
                x0, y0, x1, y1 = l["bbox"]
                if items and not re.fullmatch(r"\s*\d{1,3}\s*", t):
                    hit = [
                        it for it in items
                        if y0 / ph - 0.004 <= it["y"] + it["h"] / 2 <= y1 / ph + 0.004
                        and (x0 / pw - 0.01) <= it["x"] + it["w"] / 2 <= (x1 / pw + 0.01)
                    ]
                    if hit:
                        hit.sort(key=lambda it: it["x"])
                        hit = [it for it in hit if not (re.fullmatch(r"\d{1,3}", it["t"].strip()) and it["x"] < 0.12)] or hit
                        o = " ".join(it["t"] for it in hit)
                        if os.environ.get("QUIZ_OCR_MODE") == "primary":
                            t = o
                        elif GARBLE.search(t) or re.search(r"(?<![0-9２３４])つ選べ", t):
                            t = repair(t, o)
                out.append({"page": pi, "x0": x0, "y0": y0, "y1": y1, "text": t})
    return out


def lines_of_page(doc, pi):
    return [l for l in lines_of(doc, pi) if l["page"] == pi]


def parse(doc, session, bookdoc, outdir, exam_no, ocr=None, fontmap=None):
    ls = [l for l in lines_of(doc, 3, ocr, fontmap) if not re.match(r"^\s*DKIX", l["text"]) and not re.match(r"^\s*[—\-–― ]*\d+[—\-–― ]*$", l["text"].strip()) or re.match(r"^\s*\d{1,3}\s*$", l["text"])]
    # 問題番号の位置を順に探す
    starts = {}
    expect = 1
    for idx, l in enumerate(ls):
        t = l["text"].strip()
        m = re.match(rf"^{expect}(\s+\S.*|\s*)$", t)
        # 100問目は先頭の「1」が欠けて「00」と読み取られる版がある
        if not m and expect == 100:
            m = re.match(r"^0?0[\s\u3000]+\S", t)
        if m and l["x0"] < 120:
            starts[expect] = idx
            expect += 1
            if expect > 100:
                break
    missing = [n for n in range(1, 101) if n not in starts]
    qs = []
    for n in range(1, 101):
        if n not in starts:
            continue
        a = starts[n]
        b = starts[n + 1] if (n + 1) in starts else len(ls)
        seg = ls[a:b]
        qs.append((n, seg))
    return qs, missing, ls, starts


def build(exam_no, session, qpdf, bpdf, answers, outdir, ocr=None, fontmap=None):
    doc = fitz.open(qpdf)
    book = fitz.open(bpdf)
    qs, missing, ls, starts = parse(doc, session, book, outdir, exam_no, ocr, fontmap)
    res = []
    intros = {}  # 問題番号 -> 導入文
    for n, seg in qs:
        body_lines = []
        for l in seg:
            t = l["text"].strip()
            if re.fullmatch(r"\d{1,3}", t) and body_lines and l["x0"] > 120:
                continue  # ページ番号
            if re.search(r"別\s*冊\s*$|^No\.\s*\d+\s*$|^別\s*冊\s*No", t):
                continue
            body_lines.append(l)
        # 次の問題へ続く導入文を切り出す
        cut = None
        for i, l in enumerate(body_lines):
            if re.match(r"^\s*次の(文|症例|図|表)", l["text"]):
                cut = i
                break
        intro_here = ""
        if cut is not None:
            tail = body_lines[cut:]
            body_lines = body_lines[:cut]
            intro_text = "".join(x["text"].strip() for x in tail)
            head = re.split(r"。", intro_text, 1)[0]
            targets = [int(x) for x in re.findall(r"\d+", head)] or [n + 1]
            for t in targets:
                intros[t] = intro_text
        seg = body_lines
        body = "\n".join(l["text"] for l in seg)
        choices = {}
        stem_parts = []
        cur = None
        for l in seg:
            t = l["text"].strip()
            m = re.match(r"^([1-5])\s*[．.]\s*(.*)$", t)
            if m and (cur is None or int(m.group(1)) == cur + 1):
                cur = int(m.group(1))
                choices[cur] = m.group(2)
            elif cur is None:
                if l["text"].startswith("\u3000") and stem_parts:
                    stem_parts.append("\n")
                stem_parts.append(t)
            else:
                choices[cur] += t
        stem = "".join(stem_parts)
        stem = re.sub(rf"^{n}\s*", "", stem, count=1)
        res.append({
            "no": n,
            "session": session,
            "intro": intros.get(n, ""),
            "stem": norm(stem),
            "choices": [norm(choices.get(i, "")) for i in range(1, 6)],
            "pages": sorted({l["page"] for l in seg}),
            "y": [seg[0]["y0"], seg[-1]["y1"]] if seg else [0, 0],
            "book": sorted({int(x) for x in re.findall(r"別冊No\.(\d+)", re.sub(r"\s+", "", body + intros.get(n, "")))}),
            "figure": bool(FIG_WORDS.search(re.sub(r"\s+", "", body))),
        })
    return res, missing


if __name__ == "__main__":
    pass


def read_answers(path):
    """正答PDFから {('am'|'pm', 問題番号): [正答の組, ...]} を作る。

    各欄が「正解として認める選択肢の組」。2つ選べの問題は '35' のように1つの欄に2桁入る。
    複数の欄が埋まっていれば、どれを選んでも正解(採点上の取り扱い)。空欄は採点対象外。
    """
    doc = fitz.open(path)
    words = doc[0].get_text("words")
    codes = [w for w in words if re.fullmatch(r"(?:[AB]\d{3}|(?:AM|PM)\d{1,3})", w[4])]
    ans = {}
    for c in codes:
        cells = [
            w for w in words
            if abs((w[1] + w[3]) / 2 - (c[1] + c[3]) / 2) < 4 and c[2] < w[0] < c[0] + 140 and re.fullmatch(r"[1-5]+", w[4])
        ]
        cells.sort(key=lambda w: w[0])
        sets = [sorted({int(ch) for ch in w[4]}) for w in cells]
        code = c[4]
        sess = "am" if code[0] == "A" else "pm"
        num = int(re.sub(r"\D", "", code))
        ans[(sess, num)] = sets
    return ans


# ---- 画像 ----
def trim_save(pix, path, quality=72, rotate=0):
    from PIL import Image, ImageChops, ImageFilter
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    if rotate:
        img = img.rotate(rotate, expand=True, fillcolor=(255, 255, 255))
    bg = Image.new("RGB", img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg).convert("L").point(lambda v: 255 if v > 18 else 0).filter(ImageFilter.MedianFilter(5))
    box = diff.getbbox()
    if not box:
        return False
    pad = 10
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(img.width, box[2] + pad), min(img.height, box[3] + pad))
    img.crop(box).save(path, "WEBP", quality=quality)
    return True


def render_figures(exam_no, session, qpdf, bpdf, qs, outdir):
    """図つきの問題は、問題の範囲を画像で保存する。別冊は番号ごとに保存する"""
    os.makedirs(outdir, exist_ok=True)
    doc = fitz.open(qpdf)
    book = fitz.open(bpdf)
    saved_q = {}
    for i, q in enumerate(qs):
        need = q["figure"] or any(c == "" for c in q["choices"])
        if not need or not q["pages"]:
            continue
        page_i = q["pages"][0]
        y0 = max(0, q["y"][0] - 4)
        nxt = qs[i + 1] if i + 1 < len(qs) else None
        foot = [l["y0"] for l in lines_of_page(doc, page_i) if re.match(r"^\s*DKIX", l["text"])]
        y1 = (min(foot) - 2) if foot else 790
        if nxt and nxt["pages"] and nxt["pages"][0] == page_i:
            y1 = nxt["y"][0] - 2
        clip = fitz.Rect(0, y0, doc[page_i].rect.width, y1)
        pix = doc[page_i].get_pixmap(dpi=120, clip=clip)
        name = f"{session}-q{q['no']}.webp"
        if trim_save(pix, os.path.join(outdir, name)):
            saved_q[q["no"]] = name
    saved_b = {}
    for pi, page in enumerate(book):
        t = unicodedata.normalize("NFKC", page.get_text())
        m = re.search(r"No\.\s*(\d+)", t)
        if not m or pi == 0:
            continue
        clip = fitz.Rect(0, 30, page.rect.width, 790)
        pix = page.get_pixmap(dpi=110, clip=clip)
        name = f"{session}-b{m.group(1)}.webp"
        # 横向きの図(心電図など)は、「No.」の文字の向きを見て縦に直す
        rot = 0
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                if "No." in unicodedata.normalize("NFKC", "".join(sp["text"] for sp in l["spans"])):
                    if abs(l["dir"][1]) > 0.9:
                        rot = -90 if l["dir"][1] < 0 else 90
        if trim_save(pix, os.path.join(outdir, name), rotate=rot):
            saved_b[int(m.group(1))] = name
    return saved_q, saved_b
