import { ORGANS } from "../content/organs/generated.ts";
import type { OrganCard } from "../content/organs/types.ts";

// 問題文・選択肢・解説の中に出てくる臓器・部位を探す。名前（かっこ内の語と別表記・部位名を含む）が、そのまま書かれているものだけ
const words = (d: OrganCard) => {
  const base = d.name.replace(/\(.*?\)|（.*?）/g, "").trim();
  const inner = [...d.name.matchAll(/[(（](.+?)[)）]/g)].flatMap((m) => m[1].split(/[・、]/));
  return [...new Set([base, ...inner, ...d.aliases])].map((s) => s.trim()).filter(Boolean);
};

const TERMS = ORGANS.flatMap((d) => words(d).map((term) => ({ term, d }))).sort((a, b) => b.term.length - a.term.length);
const isAscii = (s: string) => /^[\x20-\x7e]+$/.test(s);
const ALNUM = /[A-Za-z0-9-]/;
const HAN = /\p{Script=Han}/u;
// その臓器の語を含むが、別のものを指す熟語（例: 前大脳動脈は血管、大脳基底核は別の構造）。この範囲の一致は数えない
const NOT_THIS: Record<string, RegExp> = {
  cerebrum: /[前中後]大脳動脈|大脳基底核|大脳脚|大脳鎌/g,
  pons: /橋本|橋静脈|橋渡し|架橋|ブリッジ/g,
};

export function findOrgans(text: string): OrganCard[] {
  const hits: { start: number; end: number; d: OrganCard }[] = [];
  const masked = (slug: string, at: number, end: number) =>
    NOT_THIS[slug] ? [...text.matchAll(NOT_THIS[slug])].some((m) => m.index! <= at && m.index! + m[0].length >= end) : false;
  for (const { term, d } of TERMS) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(term, from);
      if (at < 0) break;
      from = at + term.length;
      if (isAscii(term) && (ALNUM.test(text[at - 1] ?? "") || ALNUM.test(text[from] ?? ""))) continue;
      // 「胃」「肺」のような1文字の語は、別の熟語の一部（例: 前胃部）を除く。直前が漢字なら、右・左・両だけ認める
      if (term.length === 1) {
        const prev = text[at - 1] ?? "";
        if (HAN.test(prev) && !"右左両".includes(prev)) continue;
      }
      if (masked(d.slug, at, from)) continue;
      hits.push({ start: at, end: from, d });
    }
  }
  const kept = hits
    .filter((h) => !hits.some((o) => o !== h && o.start <= h.start && o.end >= h.end && o.end - o.start > h.end - h.start))
    .sort((a, b) => a.start - b.start);
  const seen = new Set<string>();
  return kept.map((h) => h.d).filter((d) => (seen.has(d.slug) ? false : (seen.add(d.slug), true)));
}
