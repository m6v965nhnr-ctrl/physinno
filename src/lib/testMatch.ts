import { TESTS } from "../content/tests/generated.ts";
import type { TestCard } from "../content/tests/types.ts";

// 問題文・選択肢・解説の中に出てくる検査・評価法・基準を探す。名前（かっこ内の略称と別表記を含む）が、そのまま書かれているものだけ
const words = (d: TestCard) => {
  const base = d.name.replace(/\(.*?\)|（.*?）/g, "").trim();
  const inner = [...d.name.matchAll(/[(（](.+?)[)）]/g)].flatMap((m) => m[1].split(/[・、]/));
  return [...new Set([base, ...inner, ...d.aliases])].map((s) => s.trim()).filter(Boolean);
};

const TERMS = TESTS.flatMap((d) => words(d).map((term) => ({ term, d }))).sort((a, b) => b.term.length - a.term.length);
const isAscii = (s: string) => /^[\x20-\x7e]+$/.test(s);
const ALNUM = /[A-Za-z0-9-]/;

export function findTests(text: string): TestCard[] {
  const hits: { start: number; end: number; d: TestCard }[] = [];
  for (const { term, d } of TERMS) {
    if (term.length < 2) continue;
    let from = 0;
    for (;;) {
      const at = text.indexOf(term, from);
      if (at < 0) break;
      from = at + term.length;
      // 「BI」「EF」が別の英単語の一部のときは数えない
      if (isAscii(term) && (ALNUM.test(text[at - 1] ?? "") || ALNUM.test(text[from] ?? ""))) continue;
      hits.push({ start: at, end: from, d });
    }
  }
  // より長い語に含まれるものは、別のものとして数えない
  const kept = hits
    .filter((h) => !hits.some((o) => o !== h && o.start <= h.start && o.end >= h.end && o.end - o.start > h.end - h.start))
    .sort((a, b) => a.start - b.start);
  const seen = new Set<string>();
  return kept.map((h) => h.d).filter((d) => (seen.has(d.slug) ? false : (seen.add(d.slug), true)));
}
