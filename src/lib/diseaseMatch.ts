import { DISEASES } from "../content/diseases/generated.ts";
import type { Disease } from "../content/diseases/types.ts";

// 問題文・選択肢・解説の中に出てくる疾患を探す。名前（かっこ内の略称と別表記を含む）が、そのまま書かれているものだけ
const words = (d: Disease) => {
  const base = d.name.replace(/\(.*?\)|（.*?）/g, "").trim();
  const inner = [...d.name.matchAll(/[(（](.+?)[)）]/g)].map((m) => m[1]);
  return [...new Set([base, ...inner, ...d.aliases])].filter(Boolean);
};

const TERMS = DISEASES.flatMap((d) => words(d).map((term) => ({ term, d }))).sort((a, b) => b.term.length - a.term.length);
const isAscii = (s: string) => /^[\x20-\x7e]+$/.test(s);
const ALNUM = /[A-Za-z0-9]/;

export function findDiseases(text: string): Disease[] {
  const hits: { start: number; end: number; d: Disease }[] = [];
  for (const { term, d } of TERMS) {
    if (term.length < 2) continue;
    let from = 0;
    for (;;) {
      const at = text.indexOf(term, from);
      if (at < 0) break;
      from = at + term.length;
      // 「MS」が別の英単語の一部のときは数えない
      if (isAscii(term) && (ALNUM.test(text[at - 1] ?? "") || ALNUM.test(text[from] ?? ""))) continue;
      hits.push({ start: at, end: from, d });
    }
  }
  // 「糖尿病性腎症」の中の「糖尿病」のように、より長い語に含まれるものは、別のものとして数えない
  const kept = hits
    .filter((h) => !hits.some((o) => o !== h && o.start <= h.start && o.end >= h.end && o.end - o.start > h.end - h.start))
    .sort((a, b) => a.start - b.start);
  const seen = new Set<string>();
  return kept.map((h) => h.d).filter((d) => (seen.has(d.slug) ? false : (seen.add(d.slug), true)));
}
