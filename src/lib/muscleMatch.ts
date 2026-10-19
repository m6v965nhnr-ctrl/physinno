import { MUSCLES, type Muscle } from "../content/muscles/data.ts";

// 問題文・選択肢・解説の中に出てくる筋を探す。名前（と別名・総称）が、そのまま書かれているものだけ
type Hit = { start: number; end: number; muscle: Muscle };

const TERMS: { term: string; muscle: Muscle }[] = MUSCLES.flatMap((mu) => [mu.name, ...mu.aliases].map((term) => ({ term, muscle: mu })))
  .sort((a, b) => b.term.length - a.term.length);

export function findMuscles(text: string): Muscle[] {
  const hits: Hit[] = [];
  for (const { term, muscle } of TERMS) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(term, from);
      if (at < 0) break;
      hits.push({ start: at, end: at + term.length, muscle });
      from = at + term.length;
    }
  }
  // 「前斜角筋」の中の「斜角筋」のように、より長い語に含まれるものは、別の筋として数えない
  const kept = hits.filter(
    (h) => !hits.some((o) => o !== h && o.start <= h.start && o.end >= h.end && o.end - o.start > h.end - h.start),
  );
  const seen = new Set<string>();
  return kept
    .sort((a, b) => a.start - b.start)
    .map((h) => h.muscle)
    .filter((mu) => (seen.has(mu.id) ? false : (seen.add(mu.id), true)));
}
