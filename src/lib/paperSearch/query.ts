// 論文検索式の解析・検証・変換（純粋な関数。画面・サーバーの両方から使う）
// PubMed の仕様（2026-10-22 公式ヘルプで確認）: ブール演算子は大文字、左から順に処理、括弧で入れ子。
// ワイルドカード * は、最初の * の前に4文字以上。近接検索は "語句"[ti:~N] [tiab:~N] [ad:~N] のみ。

export type QNode =
  | { k: "term"; text: string; phrase: boolean; field?: string; prox?: number }
  | { k: "op"; op: "AND" | "OR" | "NOT"; a: QNode; b: QNode };

export type QIssue = { level: "error" | "warn"; message: string };

// PubMed のフィールドタグ（[tag]）と、日本語の説明
export const FIELD_TAGS: Record<string, { label: string; note: string }> = {
  tiab: { label: "タイトル・抄録", note: "タイトルと抄録の語を検索します（フレーズ・近接検索に対応）" },
  ti: { label: "タイトル", note: "タイトルだけを検索します" },
  au: { label: "著者", note: "著者名（例: Smith J[au]）" },
  "1au": { label: "筆頭著者", note: "最初の著者だけ" },
  lastau: { label: "最終著者", note: "最後の著者だけ" },
  mh: { label: "MeSH用語", note: "統制語（MeSH）で索引された論文。下位の用語も含めて検索します" },
  majr: { label: "主要MeSH用語", note: "論文の主題として重視されているMeSH用語" },
  sh: { label: "MeSH副標目", note: "MeSHの副標目（例: therapy）" },
  tw: { label: "テキストワード", note: "タイトル・抄録・MeSH用語・キーワードなど、論文のテキスト全般の語を検索します" },
  ta: { label: "雑誌名", note: "雑誌名（略称または正式名）" },
  dp: { label: "発表日", note: "発表日（例: 2020:2024[dp]）" },
  la: { label: "言語", note: "論文の言語（例: english[la]、japanese[la]）" },
  pt: { label: "論文タイプ", note: "出版タイプ（例: randomized controlled trial[pt]）" },
  sb: { label: "サブセット", note: "サブセット（例: free full text[sb]、systematic[sb]）" },
  ad: { label: "所属", note: "著者の所属機関" },
  all: { label: "すべてのフィールド", note: "すべての項目から検索します" },
};
const PROX_TAGS = new Set(["ti", "tiab", "ad"]);
const MAX_LEN = 2000;

type Tok = { t: "(" | ")" | "op" | "term"; v?: string; phrase?: boolean; field?: string; prox?: number };

export function tokenize(src: string, issues: QIssue[]): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  const s = src;
  const readTag = (): { field?: string; prox?: number } => {
    if (s[i] !== "[") return {};
    const j = s.indexOf("]", i);
    if (j < 0) { issues.push({ level: "error", message: "「[」が閉じられていません" }); i = s.length; return {}; }
    const raw = s.slice(i + 1, j).trim().toLowerCase();
    i = j + 1;
    const m = raw.match(/^([a-z0-9]+)(?::~(\d+))?$/);
    if (!m) { issues.push({ level: "error", message: `フィールドタグ [${raw}] を解釈できません` }); return {}; }
    if (!FIELD_TAGS[m[1]]) issues.push({ level: "error", message: `フィールドタグ [${m[1]}] には対応していません` });
    return { field: m[1], prox: m[2] !== undefined ? Number(m[2]) : undefined };
  };
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === "(" || c === ")") { out.push({ t: c }); i++; continue; }
    if (c === '"' || c === "“" || c === "”") {
      const j = s.slice(i + 1).search(/["“”]/);
      if (j < 0) { issues.push({ level: "error", message: "引用符「\"」が閉じられていません" }); break; }
      const text = s.slice(i + 1, i + 1 + j).trim();
      i = i + j + 2;
      const tag = readTag();
      if (text) out.push({ t: "term", v: text, phrase: true, ...tag });
      continue;
    }
    let j = i;
    while (j < s.length && !/[\s()"“”\[]/.test(s[j])) j++;
    const word = s.slice(i, j);
    i = j;
    if (word === "AND" || word === "OR" || word === "NOT") { out.push({ t: "op", v: word }); continue; }
    const tag = readTag();
    if (word) out.push({ t: "term", v: word, phrase: false, ...tag });
  }
  return out;
}

// 左から順に処理する（PubMedと同じ）。演算子のない隣り合う語は AND
export function parseQuery(src: string): { node: QNode | null; issues: QIssue[] } {
  const issues: QIssue[] = [];
  const text = src.normalize("NFKC").trim();
  if (!text) return { node: null, issues: [{ level: "error", message: "検索式が空です" }] };
  if (text.length > MAX_LEN) return { node: null, issues: [{ level: "error", message: `検索式が長すぎます（${MAX_LEN}文字まで）` }] };
  const toks = tokenize(text, issues);
  let p = 0;
  let mixed = false;

  const primary = (): QNode | null => {
    const t = toks[p];
    if (!t) return null;
    if (t.t === "(") {
      p++;
      const e = expr();
      if (toks[p]?.t === ")") p++;
      else issues.push({ level: "error", message: "括弧「(」が閉じられていません" });
      if (!e) issues.push({ level: "error", message: "空の括弧があります" });
      return e;
    }
    if (t.t === "term") {
      p++;
      return { k: "term", text: t.v!, phrase: !!t.phrase, field: t.field, prox: t.prox };
    }
    return null;
  };

  const expr = (): QNode | null => {
    let left = primary();
    if (!left) {
      const t = toks[p];
      if (t?.t === "op") issues.push({ level: "error", message: `先頭または括弧の直後に ${t.v} は置けません` });
      return null;
    }
    const seen = new Set<string>();
    while (p < toks.length && toks[p].t !== ")") {
      let op: "AND" | "OR" | "NOT" = "AND";
      if (toks[p].t === "op") { op = toks[p].v as typeof op; p++; }
      const right = primary();
      if (!right) { issues.push({ level: "error", message: `${op} の後ろに検索語がありません` }); break; }
      seen.add(op);
      left = { k: "op", op, a: left, b: right };
    }
    if (seen.size > 1) mixed = true;
    return left;
  };

  const node = expr();
  if (p < toks.length) issues.push({ level: "error", message: toks[p].t === ")" ? "閉じ括弧「)」が多すぎます" : "検索式を最後まで解釈できません" });
  if (mixed) issues.push({ level: "warn", message: "AND・OR・NOTが括弧なしで混ざっています。PubMedは左から順に処理するため、その順に括弧を補って検索します" });
  if (node) validate(node, issues);
  return { node, issues };
}

function validate(n: QNode, issues: QIssue[]) {
  if (n.k === "op") { validate(n.a, issues); validate(n.b, issues); return; }
  const w = n.text;
  const star = w.indexOf("*");
  if (star >= 0 && star < 4) issues.push({ level: "error", message: `ワイルドカードは、最初の * の前に4文字以上が必要です（${w}）` });
  if (n.prox !== undefined) {
    if (!n.phrase || !/\s/.test(w)) issues.push({ level: "error", message: `近接検索は、引用符で囲んだ複数の語に使います（例: "hip pain"[tiab:~3]）` });
    if (!n.field || !PROX_TAGS.has(n.field)) issues.push({ level: "error", message: "近接検索が使えるのは [ti]・[tiab]・[ad] だけです" });
    if (n.prox > 1000) issues.push({ level: "error", message: "近接検索の距離は1000以下にしてください" });
  }
}

const clean = (s: string) => s.replace(/[\[\]()"]/g, " ").replace(/\s+/g, " ").trim();

export function termToPubMed(n: Extract<QNode, { k: "term" }>): string {
  const t = clean(n.text);
  const body = n.phrase || /\s/.test(t) ? `"${t}"` : t;
  if (!n.field) return body;
  return n.prox !== undefined ? `${body}[${n.field}:~${n.prox}]` : `${body}[${n.field}]`;
}

function flatten(n: QNode, op: "AND" | "OR"): QNode[] {
  return n.k === "op" && n.op === op ? [...flatten(n.a, op), ...flatten(n.b, op)] : [n];
}

// PubMed に送る検索式。混在するときは、左から順に処理された結果が分かるように括弧を補う
export function toPubMed(n: QNode): string {
  if (n.k === "term") return termToPubMed(n);
  const wrap = (c: QNode) => (c.k === "op" ? `(${toPubMed(c)})` : toPubMed(c));
  if (n.op === "NOT") return `${wrap(n.a)} NOT ${wrap(n.b)}`;
  return flatten(n, n.op).map(wrap).join(` ${n.op} `);
}

// 否定（NOT）のない他サイト向け: 肯定の語だけを取り出す
export function positiveTerms(n: QNode): { terms: { text: string; phrase: boolean }[]; hasNot: boolean } {
  if (n.k === "term") return { terms: [{ text: clean(n.text).replace(/\*/g, ""), phrase: n.phrase || /\s/.test(n.text) }], hasNot: false };
  const a = positiveTerms(n.a);
  if (n.op === "NOT") return { terms: a.terms, hasNot: true };
  const b = positiveTerms(n.b);
  return { terms: [...a.terms, ...b.terms], hasNot: a.hasNot || b.hasNot };
}

// ブール演算子に対応するサイト用の汎用変換（AND/OR/NOT・括弧・引用符。フィールドタグは付けない）
export function toBooleanPlain(n: QNode, fmt: { and: string; or: string; not: string } = { and: "AND", or: "OR", not: "NOT" }): string {
  const termS = (t: Extract<QNode, { k: "term" }>) => {
    const x = clean(t.text);
    return t.phrase || /\s/.test(x) ? `"${x.replace(/\*/g, "")}"` : x;
  };
  const go = (c: QNode): string => {
    if (c.k === "term") return termS(c);
    const wrap = (d: QNode) => (d.k === "op" ? `(${go(d)})` : go(d));
    if (c.op === "NOT") return `${wrap(c.a)} ${fmt.not} ${wrap(c.b)}`;
    return flatten(c, c.op).map(wrap).join(` ${c.op === "AND" ? fmt.and : fmt.or} `);
  };
  return go(n);
}

// ---------------------------------------------------------------------------
// フィルター（PubMedの式へ）。式は PubMed 公式ヘルプ（2026-10-22確認）による
// ---------------------------------------------------------------------------

export type PaperFilters = {
  from?: number; // 発表年（開始）
  to?: number; // 発表年（終了）
  types?: string[]; // 論文タイプのキー
  ft?: "free" | "pmc" | ""; // 全文
  lang?: string[]; // english / japanese ...
  humans?: boolean;
  journal?: string; // 雑誌名
  author?: string; // 著者
  cq?: string; // Clinical Queries のキー（例: therapy-broad）
};

export const ARTICLE_TYPES: Record<string, { label: string; term: string; note?: string }> = {
  sr: { label: "システマティックレビュー", term: "systematic[sb]", note: "PubMed公式のシステマティックレビュー用フィルター" },
  ma: { label: "メタ解析", term: "meta-analysis[pt]" },
  rct: { label: "ランダム化比較試験（RCT）", term: "randomized controlled trial[pt]" },
  ct: { label: "臨床試験", term: "clinical trial[pt]" },
  obs: { label: "観察研究", term: "observational study[pt]" },
  cohort: { label: "コホート研究", term: "cohort studies[mh]", note: "論文タイプではなく、MeSH用語での絞り込みです" },
  cc: { label: "症例対照研究", term: "case-control studies[mh]", note: "MeSH用語での絞り込みです" },
  cs: { label: "横断研究", term: "cross-sectional studies[mh]", note: "MeSH用語での絞り込みです" },
  cr: { label: "症例報告", term: "case reports[pt]" },
  review: { label: "レビュー", term: "review[pt]" },
  guideline: { label: "ガイドライン", term: "guideline[pt]" },
};

export const CLINICAL_QUERIES: Record<string, { label: string; scope: string; term: string }> = {
  "therapy-broad": { label: "治療", scope: "広く（感度重視）", term: "((clinical[Title/Abstract] AND trial[Title/Abstract]) OR clinical trials as topic[MeSH Terms] OR clinical trial[Publication Type] OR random*[Title/Abstract] OR random allocation[MeSH Terms] OR therapeutic use[MeSH Subheading])" },
  "therapy-narrow": { label: "治療", scope: "絞って（特異度重視）", term: "(randomized controlled trial[Publication Type] OR (randomized[Title/Abstract] AND controlled[Title/Abstract] AND trial[Title/Abstract]))" },
  "diagnosis-broad": { label: "診断", scope: "広く（感度重視）", term: "(sensitiv*[Title/Abstract] OR sensitivity and specificity[MeSH Terms] OR diagnose[Title/Abstract] OR diagnosed[Title/Abstract] OR diagnoses[Title/Abstract] OR diagnosing[Title/Abstract] OR diagnosis[Title/Abstract] OR diagnostic[Title/Abstract] OR diagnosis[MeSH:noexp] OR (diagnostic equipment[MeSH:noexp] OR diagnostic errors[MeSH:noexp] OR diagnostic imaging[MeSH:noexp] OR diagnostic services[MeSH:noexp]) OR diagnosis, differential[MeSH:noexp] OR diagnosis[Subheading:noexp])" },
  "diagnosis-narrow": { label: "診断", scope: "絞って（特異度重視）", term: "(specificity[Title/Abstract])" },
  "etiology-broad": { label: "原因・病因", scope: "広く（感度重視）", term: "(risk*[Title/Abstract] OR risk*[MeSH:noexp] OR (risk adjustment[MeSH:noexp] OR risk assessment[MeSH:noexp] OR risk factors[MeSH:noexp] OR risk management[MeSH:noexp] OR risk taking[MeSH:noexp]) OR cohort studies[MeSH Terms] OR group[Text Word] OR groups[Text Word] OR grouped [Text Word])" },
  "etiology-narrow": { label: "原因・病因", scope: "絞って（特異度重視）", term: "((relative[Title/Abstract] AND risk*[Title/Abstract]) OR (relative risk[Text Word]) OR risks[Text Word] OR cohort studies[MeSH:noexp] OR (cohort[Title/Abstract] AND study[Title/Abstract]) OR (cohort[Title/Abstract] AND studies[Title/Abstract]))" },
  "prognosis-broad": { label: "予後", scope: "広く（感度重視）", term: "(incidence[MeSH:noexp] OR mortality[MeSH Terms] OR follow up studies[MeSH:noexp] OR prognos*[Text Word] OR predict*[Text Word] OR course*[Text Word])" },
  "prognosis-narrow": { label: "予後", scope: "絞って（特異度重視）", term: "(prognos*[Title/Abstract] OR (first[Title/Abstract] AND episode[Title/Abstract]) OR cohort[Title/Abstract])" },
  "cpg-broad": { label: "臨床予測ルール", scope: "広く（感度重視）", term: "(predict*[Title/Abstract] OR predictive value of tests[MeSH Terms] OR score[Title/Abstract] OR scores[Title/Abstract] OR scoring system[Title/Abstract] OR scoring systems[Title/Abstract] OR observ*[Title/Abstract] OR observer variation[MeSH Terms])" },
  "cpg-narrow": { label: "臨床予測ルール", scope: "絞って（特異度重視）", term: "(validation[Title/Abstract] OR validate[Title/Abstract])" },
};

const safeWord = (s: string) => clean(s).slice(0, 100);

// フィルターを、PubMed の AND 条件の配列にする
export function filterClauses(f: PaperFilters): string[] {
  const c: string[] = [];
  const cy = new Date().getFullYear();
  const y = (v?: number) => (v && v >= 1800 && v <= cy + 1 ? Math.floor(v) : undefined);
  const from = y(f.from), to = y(f.to);
  if (from || to) c.push(`${from ?? 1800}:${to ?? cy + 1}[dp]`);
  const types = (f.types ?? []).filter((k) => ARTICLE_TYPES[k]).map((k) => ARTICLE_TYPES[k].term);
  if (types.length) c.push(types.length === 1 ? types[0] : `(${types.join(" OR ")})`);
  if (f.ft === "free") c.push("free full text[sb]");
  if (f.ft === "pmc") c.push("pubmed pmc[sb]");
  const langs = (f.lang ?? []).filter((l) => /^[a-z]{3,20}$/.test(l)).map((l) => `${l}[la]`);
  if (langs.length) c.push(langs.length === 1 ? langs[0] : `(${langs.join(" OR ")})`);
  if (f.humans) c.push("humans[mh]");
  if (f.journal && safeWord(f.journal)) c.push(`"${safeWord(f.journal)}"[ta]`);
  if (f.author && safeWord(f.author)) c.push(`"${safeWord(f.author)}"[au]`);
  if (f.cq && CLINICAL_QUERIES[f.cq]) c.push(CLINICAL_QUERIES[f.cq].term);
  return c;
}

export function withFilters(expr: string, f: PaperFilters): string {
  const c = filterClauses(f);
  return c.length ? [`(${expr})`, ...c].join(" AND ") : expr;
}

export const SORTS = {
  relevance: { label: "関連度順（Best Match）", note: "機械学習による関連度。論文の質を表すものではありません" },
  date: { label: "追加日の新しい順（Most Recent）", note: "PubMedに追加された日の新しい順" },
  pubdate: { label: "発表日の新しい順", note: "発表日の新しい順" },
} as const;
export type SortKey = keyof typeof SORTS;
export const isSortKey = (v: string | null): v is SortKey => !!v && v in SORTS;
