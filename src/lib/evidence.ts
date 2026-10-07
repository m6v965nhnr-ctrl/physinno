// 論文のエビデンスレベル（Minds診療ガイドライン作成の手引き 2007 の分類）。
// 検索結果の絞り込みと、各論文のバッジ表示に使う（サーバー・画面の両方から使う）

export type EvidenceLevel = "I" | "II" | "III" | "IVa" | "IVb" | "V" | "VI";

export const EVIDENCE_LEVELS: { key: EvidenceLevel; short: string; label: string }[] = [
  { key: "I", short: "SR・メタ解析", label: "システマティックレビュー／ランダム化比較試験のメタアナリシス" },
  { key: "II", short: "RCT", label: "1つ以上のランダム化比較試験" },
  { key: "III", short: "非ランダム化試験", label: "非ランダム化比較試験" },
  { key: "IVa", short: "コホート", label: "分析疫学的研究（コホート研究）" },
  { key: "IVb", short: "症例対照・横断", label: "分析疫学的研究（症例対照研究、横断研究）" },
  { key: "V", short: "症例報告", label: "記述研究（症例報告・ケーススタディ）" },
  { key: "VI", short: "専門家の意見", label: "患者データに基づかない、専門委員会や専門家個人の意見" },
];

export const EVIDENCE_KEYS = EVIDENCE_LEVELS.map((l) => l.key);

export function isEvidenceLevel(v: string): v is EvidenceLevel {
  return (EVIDENCE_KEYS as string[]).includes(v);
}

// PubMed の検索式（出版タイプ [pt] と MeSH [mh] で、サーバー側で絞り込む）
const PUBMED_FILTER: Record<EvidenceLevel, string> = {
  I: "(systematic review[pt] OR meta-analysis[pt])",
  II: "(randomized controlled trial[pt])",
  III: "(controlled clinical trial[pt] OR non-randomized controlled trials as topic[mh])",
  IVa: "(cohort studies[mh] OR prospective studies[mh] OR retrospective studies[mh] OR longitudinal studies[mh])",
  IVb: "(case-control studies[mh] OR cross-sectional studies[mh])",
  V: "(case reports[pt])",
  VI: "(editorial[pt] OR practice guideline[pt] OR guideline[pt] OR consensus development conference[pt] OR comment[pt])",
};

export function pubmedLevelFilter(levels: EvidenceLevel[]): string {
  return levels.length === 0 ? "" : `(${levels.map((l) => PUBMED_FILTER[l]).join(" OR ")})`;
}

// Europe PMC の検索式
const EUROPEPMC_FILTER: Record<EvidenceLevel, string> = {
  I: '(PUB_TYPE:"Systematic Review" OR PUB_TYPE:"Meta-Analysis")',
  II: '(PUB_TYPE:"Randomized Controlled Trial")',
  III: '(PUB_TYPE:"Controlled Clinical Trial" OR "non-randomized" OR "nonrandomized")',
  IVa: '("cohort study" OR "cohort studies" OR "longitudinal study" OR "prospective study")',
  IVb: '("case-control" OR "cross-sectional")',
  V: '(PUB_TYPE:"Case Reports")',
  VI: '(PUB_TYPE:"Editorial" OR PUB_TYPE:"Practice Guideline" OR PUB_TYPE:"Consensus Development Conference" OR PUB_TYPE:"Comment")',
};

export function europePmcLevelFilter(levels: EvidenceLevel[]): string {
  return levels.length === 0 ? "" : `(${levels.map((l) => EUROPEPMC_FILTER[l]).join(" OR ")})`;
}

// 出版タイプ（PubMed など）→ レベル。上のレベルが当てはまれば、そちらを優先する
function fromTypes(types: string[]): EvidenceLevel | null {
  const t = types.map((x) => x.toLowerCase());
  const has = (...words: string[]) => t.some((x) => words.some((w) => x.includes(w)));

  if (has("meta-analysis", "metaanalysis", "systematic review")) return "I";
  if (has("randomized controlled trial", "randomised controlled trial")) return "II";
  if (has("controlled clinical trial", "non-randomized", "nonrandomized")) return "III";
  if (has("cohort", "prospective stud", "retrospective stud", "longitudinal stud")) return "IVa";
  if (has("case-control", "cross-sectional")) return "IVb";
  if (has("case report")) return "V";
  if (has("editorial", "practice guideline", "guideline", "consensus development", "comment", "letter")) return "VI";
  return null;
}

// 題名・要約の文面から推定する（出版タイプが取れないサイト用）。試験計画（プロトコル）は除く
const TEXT_RULES: [EvidenceLevel, RegExp][] = [
  ["I", /systematic review|meta-?analys|システマティックレビュー|メタアナリシス|メタ解析|系統的レビュー|系統的文献/i],
  ["II", /randomi[sz]ed (controlled|clinical)? ?trial|randomi[sz]ed trial|\bRCTs?\b|ランダム化比較試験|無作為化比較試験|ランダム化試験|無作為化試験|無作為比較/i],
  ["III", /non-?randomi[sz]ed|quasi-?experimental|controlled clinical trial|非ランダム化|非無作為|準実験/i],
  ["IVa", /cohort|longitudinal stud|prospective stud|retrospective stud|コホート|縦断研究|前向き研究|後ろ向き研究/i],
  ["IVb", /case-?control|cross-?sectional|症例対照|ケースコントロール|横断研究|横断調査/i],
  ["V", /case report|case study|case series|症例報告|ケーススタディ|事例報告|症例検討|症例集積/i],
  ["VI", /guideline|consensus statement|expert opinion|editorial|ガイドライン|専門家の意見|コンセンサス|提言/i],
];

const PROTOCOL = /protocol|study design and rationale|trial registration|プロトコル|研究計画/i;

export function classifyEvidence(input: {
  types?: string[];
  title?: string | null;
  abstract?: string | null;
}): EvidenceLevel | null {
  const byType = input.types && input.types.length > 0 ? fromTypes(input.types) : null;
  if (byType) return byType;

  const title = input.title ?? "";
  const text = `${title} ${(input.abstract ?? "").slice(0, 700)}`;

  // 試験計画や、題名に「protocol」とあるものは、結果のある研究ではないので、判定しない
  if (PROTOCOL.test(title)) return null;

  for (const [level, re] of TEXT_RULES) {
    if (re.test(level === "I" || level === "II" ? text : title + " " + (input.abstract ?? "").slice(0, 300))) {
      return level;
    }
  }
  return null;
}
