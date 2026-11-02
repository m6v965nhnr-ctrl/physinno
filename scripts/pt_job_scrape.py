#!/usr/bin/env python3
"""PT求人サイト(job-medley.com / co-medical.com)の求人ページを巡回し、
施設名・都道府県・市区町村をCSVに追記する。リサーチ用の一時スクリプト。
使い方: python3 pt_job_scrape.py <site: jobmedley|comedical> <pref_param> <pref_name_jp> <out_csv> [max_pages]
"""
import sys
import re
import time
import http.cookiejar
import urllib.request
from html.parser import HTMLParser

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

# co-medical.comはページ送りがセッション(クッキー)依存なので、同じオープナーを使い回す
_cookiejar = http.cookiejar.CookieJar()
_opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(_cookiejar))


class TextExtractor(HTMLParser):
    # <script>/<style>の中身(巨大なJSONやJSが1行になっていることがある)は
    # 正規表現検索を異常に遅くするうえ内容と無関係なので読み飛ばす
    SKIP_TAGS = {"script", "style"}

    def __init__(self):
        super().__init__()
        self.parts = []
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP_TAGS:
            self._skip_depth += 1

    def handle_endtag(self, tag):
        if tag in self.SKIP_TAGS and self._skip_depth > 0:
            self._skip_depth -= 1

    def handle_data(self, data):
        if self._skip_depth:
            return
        d = data.strip()
        if d:
            self.parts.append(d)

    def text(self):
        return "\n".join(self.parts)


def fetch(url, _redirects=0):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with _opener.open(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="ignore")
    except urllib.error.HTTPError as e:
        # Python 3.9のurllibは308(Permanent Redirect)を自動で追わない
        if e.code == 308 and e.headers.get("Location") and _redirects < 5:
            return fetch(urllib.request.urljoin(url, e.headers["Location"]), _redirects + 1)
        raise


def extract_jobmedley(html, pref_name):
    p = TextExtractor()
    p.feed(html)
    text = p.text()
    # 「XXXの理学療法士求人」の直後に、給与/仕事内容/応募要件/住所... の並びがある
    rows = []
    for m in re.finditer(r"(.+?)の理学療法士求人(?:（[^）]*）)?\n", text):
        name = m.group(1).strip()
        if not name or len(name) > 80:
            continue
        tail = text[m.end(): m.end() + 800]
        am = re.search(r"住所\n(.{2,6}[都道府県])(.{1,10}[市区町村郡])", tail)
        city = am.group(2) if am else ""
        rows.append(("job-medley", pref_name, name, city))
    return rows


def extract_comedical(html, pref_name):
    p = TextExtractor()
    p.feed(html)
    text = p.text()
    rows = []
    # 施設名(改行)の理学療法士求人(施設種別) という並び
    for m in re.finditer(r"([^\n]{2,80})\n(?:の理学療法士求人|\S{0,10}の理学療法士求人)(?:（[^）]*）)?", text):
        name = m.group(1).strip()
        if not name or name in ("新着更新", "スピード返信"):
            continue
        tail = text[m.end(): m.end() + 300]
        am = re.search(r"(.{2,6}[都道府県])(.{1,10}[市区町村郡])", tail)
        city = am.group(2) if am else ""
        rows.append(("co-medical", pref_name, name, city))
    return rows


def main():
    site, pref_param, pref_name, out_csv, *rest = sys.argv[1:]
    max_pages = int(rest[0]) if rest else 999

    if site == "jobmedley":
        url_tpl = f"https://job-medley.com/pt/{pref_param}/?page={{}}"
        extractor = extract_jobmedley
    elif site == "comedical":
        # ?page=N は無視され常に1ページ目が返る。実際のページ送りは /page/N/ 形式
        url_tpl = f"https://www.co-medical.com/pt/{pref_param}/page/{{}}/"
        extractor = extract_comedical
    else:
        print("unknown site", file=sys.stderr)
        sys.exit(1)

    seen_empty = 0
    total_rows = 0
    prev_names = None
    with open(out_csv, "a", encoding="utf-8") as f:
        for page in range(1, max_pages + 1):
            url = url_tpl.format(page)
            try:
                html = fetch(url)
            except Exception as e:
                print(f"page {page}: fetch error {e}", file=sys.stderr)
                break
            rows = extractor(html, pref_name)
            names_here = tuple(r[2] for r in rows)
            if names_here and names_here == prev_names:
                # ページ送りが効いていない(同じ内容を繰り返している)兆候。安全のため止める
                print(f"stop at page {page} (same as previous page; pagination likely not working)", file=sys.stderr)
                break
            prev_names = names_here
            if not rows:
                seen_empty += 1
                if seen_empty >= 2:
                    print(f"stop at page {page} (empty)", file=sys.stderr)
                    break
            else:
                seen_empty = 0
                for site_name, pref, name, city in rows:
                    name_q = name.replace('"', '""')
                    f.write(f'{site_name},{pref},"{name_q}",{city}\n')
                total_rows += len(rows)
            time.sleep(0.4)
    print(f"done: {total_rows} rows written for {pref_name} ({site})")


if __name__ == "__main__":
    main()
