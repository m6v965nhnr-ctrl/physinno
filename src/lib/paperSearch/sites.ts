// サイトごとの検索条件の変換（アダプター）。PubMed用の式を、そのまま他サイトへ送らない。
// 対応は、2026-10-22に各サイトの検索APIで動作を確かめたものだけ。確かめられていない条件は「未対応」と表示し、送らない。
import { parseQuery, toBooleanPlain, positiveTerms, type PaperFilters, type QNode, type SortKey } from "./query.ts";

export type SiteKey = "pubmed" | "jstage" | "cinii" | "semanticscholar" | "europepmc" | "openalex" | "clinicaltrials" | "doaj";

export type SiteReport = {
  sent: string; // このサイトに送った検索語
  applied: string[]; // 適用した条件
  unsupported: string[]; // このサイトでは未対応の条件
  note?: string;
};

export type SitePlan = { query: string; params: Record<string, string>; report: SiteReport };

// 機能対応表（画面にも出す）
export const SITE_CAPS: Record<SiteKey, { label: string; boolean: boolean; fields: string; filters: string[]; sort: boolean; note: string }> = {
  pubmed: { label: "PubMed", boolean: true, fields: "フィールドタグ・MeSH・近接・ワイルドカード", filters: ["発表年", "論文タイプ", "全文", "言語", "ヒト", "雑誌", "著者", "臨床疑問"], sort: true, note: "NCBI E-utilities（公式API）" },
  europepmc: { label: "Europe PMC", boolean: true, fields: "雑誌・著者を指定可（式はPubMedと異なる）", filters: ["発表年", "無料全文", "言語（英・日）", "雑誌", "著者"], sort: true, note: "公式REST API" },
  openalex: { label: "OpenAlex", boolean: true, fields: "—", filters: ["発表年", "無料全文（OA）", "言語（英・日）"], sort: true, note: "公式API" },
  clinicaltrials: { label: "ClinicalTrials.gov", boolean: true, fields: "—", filters: [], sort: false, note: "臨床試験の登録データ（論文ではない）" },
  semanticscholar: { label: "Semantic Scholar", boolean: false, fields: "—", filters: ["発表年"], sort: false, note: "キーワード検索のみ。ORの同義語は使えない" },
  jstage: { label: "J-STAGE", boolean: false, fields: "—", filters: ["発表年"], sort: false, note: "キーワード検索のみ" },
  cinii: { label: "CiNii Research", boolean: false, fields: "—", filters: ["発表年"], sort: false, note: "キーワード検索のみ" },
  doaj: { label: "DOAJ", boolean: false, fields: "—", filters: [], sort: false, note: "キーワード検索のみ。絞り込みは未対応" },
};

// ブール演算子が使えないサイト用: ANDで結ばれた概念ごとに、ORの先頭の語だけを使う（NOTは使わない）
export function corePlain(n: QNode): { text: string; dropped: boolean } {
  let dropped = false;
  const concepts: string[] = [];
  const walk = (c: QNode) => {
    if (c.k === "op" && c.op === "AND") { walk(c.a); walk(c.b); return; }
    if (c.k === "op" && c.op === "NOT") { dropped = true; walk(c.a); return; }
    if (c.k === "op" && c.op === "OR") { dropped = true; walk(c.a); return; }
    concepts.push(positiveTerms(c).terms[0]?.text ?? "");
  };
  walk(n);
  return { text: concepts.filter(Boolean).join(" "), dropped };
}

const LANG2: Record<string, { epmc: string; oa: string }> = { english: { epmc: "eng", oa: "en" }, japanese: { epmc: "jpn", oa: "ja" } };
const yr = (f: PaperFilters) => ({ from: f.from && f.from >= 1800 ? Math.floor(f.from) : undefined, to: f.to && f.to <= 2100 ? Math.floor(f.to) : undefined });

// ast があれば検索式として、なければ（自然文など）plain をそのまま使う
export function planFor(site: Exclude<SiteKey, "pubmed">, ast: QNode | null, plain: string, f: PaperFilters, sort: SortKey): SitePlan {
  const { from, to } = yr(f);
  const asked: string[] = [];
  if (from || to) asked.push("発表年");
  if (f.types?.length) asked.push("論文タイプ");
  if (f.ft) asked.push("全文");
  if (f.lang?.length) asked.push("言語");
  if (f.humans) asked.push("ヒトを対象");
  if (f.journal) asked.push("雑誌名");
  if (f.author) asked.push("著者");
  if (f.cq) asked.push("臨床疑問");
  if (sort !== "relevance") asked.push("並び替え");
  const applied: string[] = [];
  const params: Record<string, string> = {};
  let query = ast ? toBooleanPlain(ast) : plain;
  let note: string | undefined;

  if (site === "europepmc") {
    const parts = [`(${query})`];
    if (from || to) { parts.push(`PUB_YEAR:[${from ?? 1800} TO ${to ?? 2100}]`); applied.push("発表年"); }
    if (f.ft === "free") { parts.push("OPEN_ACCESS:y"); applied.push("全文（無料）"); }
    const langs = (f.lang ?? []).map((l) => LANG2[l]?.epmc).filter(Boolean);
    if (langs.length) { parts.push(`(${langs.map((l) => `LANG:${l}`).join(" OR ")})`); applied.push("言語"); }
    if (f.journal) { parts.push(`JOURNAL:"${f.journal.replace(/["()]/g, " ").trim()}"`); applied.push("雑誌名"); }
    if (f.author) { parts.push(`AUTH:"${f.author.replace(/["()]/g, " ").trim()}"`); applied.push("著者"); }
    if (sort !== "relevance") { params.sort = "P_PDATE_D desc"; applied.push("並び替え（新しい順）"); }
    query = parts.length > 1 ? parts.join(" AND ") : query;
  } else if (site === "openalex") {
    const filt: string[] = [];
    if (from || to) { filt.push(`from_publication_date:${from ?? 1800}-01-01`, `to_publication_date:${to ?? 2100}-12-31`); applied.push("発表年"); }
    if (f.ft === "free") { filt.push("open_access.is_oa:true"); applied.push("全文（OA）"); }
    const langs = (f.lang ?? []).map((l) => LANG2[l]?.oa).filter(Boolean);
    if (langs.length) { filt.push(`language:${langs.join("|")}`); applied.push("言語"); }
    if (filt.length) params.filter = filt.join(",");
    if (sort !== "relevance") { params.sort = "publication_date:desc"; applied.push("並び替え（新しい順）"); }
  } else if (site === "clinicaltrials") {
    note = "臨床試験の登録データのため、発表年などの絞り込みはありません";
  } else {
    // ブール演算子が使えないサイト
    if (ast) {
      const c = corePlain(ast);
      query = c.text;
      if (c.dropped) note = "このサイトはOR・NOTが使えないため、各概念の最初の語だけで検索しました";
    }
    if (site === "jstage" && (from || to)) { if (from) params.pubyearfrom = String(from); if (to) params.pubyearto = String(to); applied.push("発表年"); }
    if (site === "cinii" && (from || to)) { if (from) params.from = String(from); if (to) params.until = String(to); applied.push("発表年"); }
    if (site === "semanticscholar" && (from || to)) { params.year = from && to ? (from === to ? `${from}` : `${from}-${to}`) : from ? `${from}-` : `-${to}`; applied.push("発表年"); }
  }
  const unsupported = asked.filter((a) => !applied.some((p) => p.startsWith(a.replace("全文", "全文"))));
  return { query, params, report: { sent: query.slice(0, 300), applied, unsupported, note } };
}

// 検索式（または自然文）を解析する。式の記号（引用符・括弧・大文字のAND/OR/NOT・[タグ]）があれば検索式として扱う
export function looksLikeExpression(s: string): boolean {
  return /[\[\]()"“”]|\b(AND|OR|NOT)\b|\w\*/.test(s);
}
export function parseIfExpression(s: string) {
  return looksLikeExpression(s) ? parseQuery(s) : { node: null as QNode | null, issues: [] };
}
