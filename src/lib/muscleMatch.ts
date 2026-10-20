import { MUSCLES, type Muscle } from "../content/muscles/data.ts";
import { BONES, type Bone } from "../content/muscles/bones.ts";

// 問題文・選択肢・解説の中に出てくる筋・骨を探す。名前（と別名・総称）が、そのまま書かれているものだけ
type Hit = { start: number; end: number; muscle?: Muscle; bone?: Bone };

const TERMS: { term: string; muscle?: Muscle; bone?: Bone }[] = [
  ...MUSCLES.flatMap((muscle) => [muscle.name, ...muscle.aliases].map((term) => ({ term, muscle }))),
  ...BONES.flatMap((bone) => [bone.name, ...bone.aliases].map((term) => ({ term, bone }))),
].sort((a, b) => b.term.length - a.term.length);

export function findAnatomy(text: string): { muscles: Muscle[]; bones: Bone[] } {
  const hits: Hit[] = [];
  for (const { term, muscle, bone } of TERMS) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(term, from);
      if (at < 0) break;
      from = at + term.length;
      // 「尺骨神経」「橈骨動脈」は、骨ではなく神経・血管の話
      if (bone && /^(神経|動脈|静脈)/.test(text.slice(from))) continue;
      hits.push({ start: at, end: from, muscle, bone });
    }
  }
  // 「前斜角筋」の中の「斜角筋」、「第7頸椎」の中の「頸椎」のように、より長い語に含まれるものは、別のものとして数えない
  const kept = hits
    .filter((h) => !hits.some((o) => o !== h && o.start <= h.start && o.end >= h.end && o.end - o.start > h.end - h.start))
    .sort((a, b) => a.start - b.start);
  const seen = new Set<string>();
  const once = <T extends { id: string }>(x: T | undefined) => (x && !seen.has(x.id) ? (seen.add(x.id), x) : undefined);
  return {
    muscles: kept.map((h) => once(h.muscle)).filter((x): x is Muscle => !!x),
    bones: kept.map((h) => once(h.bone)).filter((x): x is Bone => !!x),
  };
}

export const findMuscles = (text: string) => findAnatomy(text).muscles;
