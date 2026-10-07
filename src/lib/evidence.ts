// 論文のエビデンスレベル（Minds診療ガイドライン作成の手引き 2007 の分類）。
// 検索結果の絞り込みと、各論文のバッジ表示に使う（サーバー・画面の両方から使う）
//
// 判定は2段階。
//  1. 出版タイプ・MeSH・サイトが付けた種別（PubMed・Europe PMC・PEDro・Semantic Scholar・OpenAlex・ClinicalTrials.gov）→ basis = "type"（確実）
//  2. 題名・要約の文面（出版タイプが取れないとき）→ basis = "text"（推定。誤りがありうる）
// 文面からの判定は、研究デザインを「自分で言っている」文だけを根拠にする（背景に出てくる「過去のメタアナリシスでは…」などは使わない）

export type EvidenceLevel = "I" | "II" | "III" | "IVa" | "IVb" | "V" | "VI";
export type EvidenceBasis = "type" | "text";

export type EvidenceJudgement = { level: EvidenceLevel; basis: EvidenceBasis };

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

// ---------------------------------------------------------------
// 1. 出版タイプ・MeSH・サイトの種別から（確実）
// ---------------------------------------------------------------
const hasWord = (t: string[], ...words: string[]) => t.some((x) => words.some((w) => x.includes(w)));

export function levelFromTypes(types: string[], context?: { title?: string | null; abstract?: string | null }): EvidenceLevel | null {
  const t = types.map((x) => x.toLowerCase());
  if (t.length === 0) return null;

  // 試験計画（プロトコル）は、結果のある研究ではない
  if (hasWord(t, "protocol")) return null;

  if (hasWord(t, "meta-analysis", "metaanalysis", "meta analysis", "systematic review")) return "I";
  if (hasWord(t, "randomized controlled trial", "randomised controlled trial")) return "II";
  if (hasWord(t, "non-randomized", "nonrandomized", "controlled clinical trial")) return "III";

  // 「Clinical Trial」だけのとき: 文面でランダム化と書いてあれば II、そうでなければ非ランダム化（III）
  if (hasWord(t, "clinical trial")) {
    const text = `${context?.title ?? ""} ${context?.abstract ?? ""}`;
    return /random/i.test(text) && !/non-?random|quasi-?random/i.test(text) ? "II" : "III";
  }

  if (hasWord(t, "cohort stud", "prospective stud", "retrospective stud", "longitudinal stud", "follow-up stud")) return "IVa";
  if (hasWord(t, "case-control", "cross-sectional")) return "IVb";
  if (hasWord(t, "case report")) return "V";
  if (hasWord(t, "editorial", "practice guideline", "guideline", "consensus development", "comment")) return "VI";
  return null;
}

// ---------------------------------------------------------------
// 2. 文面から（推定）
// ---------------------------------------------------------------
// 題名に「protocol」とあっても、「Protocolized」や「in the Absence of a Protocol: A Case Series」は、試験計画ではない
const PROTOCOL_TITLE =
  /(?:study|trial|research|review|clinical)\s+protocol|protocol\s+(?:for|of)\s|(?:[:：]|\()\s*(?:a\s+)?(?:\w+\s+){0,4}protocol\b|\bprotocol\s*\)?\.?\s*$|study design and rationale|trial registration|プロトコル|研究計画|試験計画/i;
const PROTOCOL_ABSTRACT = /^\s*(?:background[:：]?\s*)?(?:this|the)\s+(?:study\s+)?protocol|\bwill be (?:randomi[sz]ed|conducted|recruited|enrolled)\b|\bis planned\b|\bwill recruit\b/i;

// 題名にあれば、強い根拠になる語
const TITLE_RULES: [EvidenceLevel, RegExp][] = [
  ["I", /systematic review|meta-?analys[ie]s|umbrella review|システマティックレビュー|メタアナリシス|メタ解析|系統的(?:レビュー|文献)|network meta/i],
  ["II", /(?<!non[- ]?)(?<!quasi[- ]?)randomi[sz]ed|\bRCTs?\b|ランダム化|無作為化|無作為比較|ランダム割付|無作為割付/i],
  ["III", /non-?randomi[sz]ed|quasi-?experimental|controlled before|非ランダム化|非無作為|準実験|historical control/i],
  ["IVa", /\bcohort\b|longitudinal (?:study|analysis)|(?:prospective|retrospective) (?:\w+ ){0,2}(?:study|analysis|observational)|コホート|縦断研究|前向き研究|後ろ向き研究|後方視的|前方視的/i],
  ["IVb", /case[- ]control|cross[- ]sectional|症例対照|ケースコントロール|横断研究|横断調査|横断的/i],
  ["V", /case report|case series|\ba case of\b|症例報告|[0-9０-９一二三四五六七八九十]例の?(?:検討|報告)|の[0-9０-９一二三四五六七八九十]例|症例集積|ケーススタディ|事例報告/i],
  ["VI", /editorial|commentary|viewpoint|position statement|consensus statement|clinical practice guideline|practice guideline|expert (?:consensus|recommendations?)|ガイドライン|コンセンサス|提言|声明|見解|guideline|consensus/i],
];

// 要約に「この研究は〇〇です」と書いてある文だけを根拠にする（背景に出てくる過去の研究への言及は拾わない）
const DESIGN_TERMS =
  "(systematic review|meta-?analys[ie]s|randomi[sz]ed(?: controlled| clinical)? trial|randomi[sz]ed|cohort study|case-control(?: study)?|cross-sectional(?: study| survey| analysis)?|case report|case series|non-?randomi[sz]ed|quasi-?experimental)";
const ABSTRACT_CUES: RegExp[] = [
  new RegExp(`\\b(?:we|authors?|investigators?)\\s+(?:\\w+\\s+){0,3}?(?:conducted|performed|carried out|undertook|report(?:ed)?|present(?:ed)?|describe[d]?)\\s+(?:a|an|the)?\\s*(?:\\w+[- ]){0,4}?${DESIGN_TERMS}`, "i"),
  new RegExp(`\\b(?:this|the present|the current|our)\\s+(?:\\w+[- ]){0,4}?${DESIGN_TERMS}`, "i"),
  new RegExp(`(?:^|[.:;]\\s*)(?:study )?design\\s*[:：]\\s*(?:an?\\s+)?(?:\\w+[- ,]){0,6}?${DESIGN_TERMS}`, "i"),
  new RegExp(`\\b(?:methods?)\\s*[:：]\\s*(?:\\w+[- ,]){0,8}?${DESIGN_TERMS}`, "i"),
  /(?:方法|対象と方法|研究デザイン)[:：]?.{0,50}?(ランダム化比較試験|無作為化比較試験|コホート研究|症例対照研究|横断研究|症例報告|メタアナリシス|システマティックレビュー)/,
  // 「参加者を無作為に割り付けた」「ランダムに〜群に分けた」
  /(?:\b(?:were|was)\s+(?:then\s+|subsequently\s+|equally\s+)?(?:(randomly)\s+(?:assigned|allocated|divided|distributed)|(randomi[sz]ed)\b)|\b(random(?:ly)?)\s+(?:assignment|allocation)\b)/i,
  /(?:無作為に|ランダムに)(?:割り付け|割付け|割り当て|分け|振り分け)|無作為(?:割付|割り付け)/,
  // 「この論説は…」
  /\b(?:this|the present)\s+(?:\w+\s+){0,2}((?:editorial|commentary|viewpoint|position statement|consensus statement))\b/i,
  // 「症例を報告する」
  /\b(?:we|authors?)\s+(?:\w+\s+){0,2}(?:report|present|describe)\s+(?:a|an|the|one|two|three|\d+)\s+(?:\w+[- ]){0,3}?(case)s?\b(?![- ]control)/i,
  /(症例報告|症例を報告|症例を経験)/,
  // 「前向き・後ろ向き・縦断の観察研究／コホート」と自分で述べている
  /\b(?:this|the present|our|was an?|is an?)\s+(?:\w+[- ]){0,3}?((?:prospective|retrospective|longitudinal)(?:[- ]\w+){0,3}?\s+(?:cohort|observational|study|analysis|design))/i,
];

function levelFromDesignTerm(term: string): EvidenceLevel | null {
  const t = term.toLowerCase();
  if (/systematic review|meta-?analys|システマティック|メタアナリシス/.test(t)) return "I";
  if (/non-?randomi|quasi-?experimental/.test(t)) return "III";
  if (/random|ランダム|無作為/.test(t)) return "II";
  if (/^case$|^cases$|症例/.test(t)) return "V";
  if (/editorial|commentary|viewpoint|position statement|consensus statement/.test(t)) return "VI";
  if (/prospective|retrospective|longitudinal|cohort|コホート/.test(t)) return "IVa";
  if (/case-?control|cross-?sectional|症例対照|横断/.test(t)) return "IVb";
  if (/case report|case series|症例報告/.test(t)) return "V";
  return null;
}

// 1人の患者についての報告（「61歳の男性」だけを対象にした文）。複数の対象者・人数の記述があれば使わない
const SINGLE_CASE = /\b(?:a|an)\s+\d{1,3}[- ]year[- ]old\s+(?:\w+\s+){0,2}(?:man|woman|male|female|patient|boy|girl|athlete|child|infant)\b/i;
const MANY_SUBJECTS = /\b(?:patients|participants|subjects|women|men|children|adults|individuals|athletes)\s+(?:were|was|who)\b|\bn\s*=\s*\d{2,}|\b(?:[2-9]\d|\d{3,})\s+(?:patients|participants|subjects|women|men|children)\b|\bcohort\b|\brandom/i;

export function levelFromText(input: { title?: string | null; abstract?: string | null }): EvidenceLevel | null {
  const title = input.title ?? "";
  const abstract = input.abstract ?? "";

  if (PROTOCOL_TITLE.test(title) || PROTOCOL_ABSTRACT.test(abstract.slice(0, 400))) return null;

  // 題名（強い根拠）。
  //  - システマティックレビュー／メタアナリシスと書いてあれば I
  //  - 「横断研究」「症例報告」などは、試験・コホートの一部を使った二次解析でも題名に元の研究名が入るので、こちらを優先する
  //  - それ以外は、上のレベルから順に
  const titleHits = TITLE_RULES.filter(([, re]) => re.test(title)).map(([level]) => level);
  const guidelineOnlyVI = (level: EvidenceLevel) =>
    level === "VI" &&
    !/editorial|commentary|viewpoint|position statement|consensus statement|practice guideline|expert (?:consensus|recommendations?)|ガイドライン|提言|声明/i.test(
      title.replace(/guideline[- ]?(?:based|adherence|concordant)/gi, "")
    );
  // 「ガイドライン」「コンセンサス」だけが題名にあるときは、実際は別の研究（質問紙調査・ガイドライン遵守の調査など）のことがあるので、
  // 要約に調査・研究の記述があれば避ける（「Clinical Practice Guideline」「editorial」などはそのまま採用）
  const researchLike = /survey|questionnaire|we (?:conducted|performed|evaluated|assessed|examined)|randomi|cohort|participants (?:were|completed)|アンケート|調査/i.test(
    abstract
  );
  const candidates = titleHits.filter((l) => !(guidelineOnlyVI(l) && researchLike));
  if (candidates.includes("I")) return "I";
  // 「scoping review」「narrative review」などは、システマティックレビューではなく、研究デザインのレベルを付けられない
  if (/\breview\b|overview|レビュー|総説|概説/i.test(title)) return null;
  const descriptive = candidates.find((l) => l === "IVb" || l === "V");
  if (descriptive) return descriptive;
  if (candidates.length > 0) return candidates[0];

  // 要約（デザインを自分で述べている文だけ）。複数のデザインが出たら、最も上のレベルではなく、最初に出てきたもの
  let best: { index: number; level: EvidenceLevel } | null = null;
  for (const cue of ABSTRACT_CUES) {
    const m = cue.exec(abstract);
    if (!m) continue;
    const term = m[m.length - 1] ?? m[0];
    const level = levelFromDesignTerm(term);
    if (level && (best === null || m.index < best.index)) best = { index: m.index, level };
  }
  if (best) return best.level;

  // 「61歳の男性が…」のように、1人の患者の経過を述べている
  if (SINGLE_CASE.test(abstract) && !MANY_SUBJECTS.test(abstract)) return "V";
  return null;
}

// ---------------------------------------------------------------
// 3. まとめ
// ---------------------------------------------------------------
export function judgeEvidence(input: {
  types?: string[];
  title?: string | null;
  abstract?: string | null;
}): EvidenceJudgement | null {
  const byType = levelFromTypes(input.types ?? [], input);
  // 題名が試験計画（プロトコル）なら、結果のある研究ではない
  if (byType && !(PROTOCOL_TITLE.test(input.title ?? "") && ["II", "III", "IVa", "IVb"].includes(byType))) {
    return { level: byType, basis: "type" };
  }

  const byText = levelFromText(input);
  return byText ? { level: byText, basis: "text" } : null;
}
