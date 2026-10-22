import { ARTICLE_TYPES, CLINICAL_QUERIES, SORTS, type PaperFilters, type SortKey } from "./query";

export type AdvOptions = { pq: string; expert: boolean; filters: PaperFilters; sort: SortKey; page: number };

export const emptyAdv = (): AdvOptions => ({ pq: "", expert: false, filters: {}, sort: "relevance", page: 1 });

export function advParams(a: AdvOptions): Record<string, string> {
  const f = a.filters, p: Record<string, string> = {};
  if (a.expert && a.pq.trim()) p.pq = a.pq.trim();
  if (f.from) p.from = String(f.from);
  if (f.to) p.to = String(f.to);
  if (f.types?.length) p.types = f.types.join(",");
  if (f.ft) p.ft = f.ft;
  if (f.lang?.length) p.lang = f.lang.join(",");
  if (f.humans) p.humans = "1";
  if (f.journal?.trim()) p.journal = f.journal.trim();
  if (f.author?.trim()) p.author = f.author.trim();
  if (f.cq) p.cq = f.cq;
  if (a.sort !== "relevance") p.sort = a.sort;
  if (a.page > 1) p.page = String(a.page);
  return p;
}

// いま選んでいる条件の一覧（画面の「適用中」表示）
export function advChips(a: AdvOptions): { key: string; label: string }[] {
  const f = a.filters, c: { key: string; label: string }[] = [];
  if (f.from || f.to) c.push({ key: "year", label: `発表年 ${f.from ?? "〜"}–${f.to ?? "〜"}` });
  for (const t of f.types ?? []) c.push({ key: `type:${t}`, label: ARTICLE_TYPES[t]?.label ?? t });
  if (f.ft === "free") c.push({ key: "ft", label: "無料全文のリンクあり" });
  if (f.ft === "pmc") c.push({ key: "ft", label: "PMCで全文あり" });
  for (const l of f.lang ?? []) c.push({ key: `lang:${l}`, label: l === "english" ? "英語" : l === "japanese" ? "日本語" : l });
  if (f.humans) c.push({ key: "humans", label: "ヒトを対象" });
  if (f.journal?.trim()) c.push({ key: "journal", label: `雑誌: ${f.journal.trim()}` });
  if (f.author?.trim()) c.push({ key: "author", label: `著者: ${f.author.trim()}` });
  if (f.cq && CLINICAL_QUERIES[f.cq]) c.push({ key: "cq", label: `臨床疑問: ${CLINICAL_QUERIES[f.cq].label}（${CLINICAL_QUERIES[f.cq].scope}）` });
  if (a.sort !== "relevance") c.push({ key: "sort", label: SORTS[a.sort].label });
  if (a.expert && a.pq.trim()) c.push({ key: "pq", label: "検索式を直接指定" });
  return c;
}

export function removeChip(a: AdvOptions, key: string): AdvOptions {
  const f = { ...a.filters };
  if (key === "year") { delete f.from; delete f.to; }
  else if (key.startsWith("type:")) f.types = (f.types ?? []).filter((t) => t !== key.slice(5));
  else if (key === "ft") f.ft = "";
  else if (key.startsWith("lang:")) f.lang = (f.lang ?? []).filter((l) => l !== key.slice(5));
  else if (key === "humans") f.humans = false;
  else if (key === "journal") delete f.journal;
  else if (key === "author") delete f.author;
  else if (key === "cq") delete f.cq;
  else if (key === "sort") return { ...a, sort: "relevance", filters: f, page: 1 };
  else if (key === "pq") return { ...a, expert: false, filters: f, page: 1 };
  return { ...a, filters: f, page: 1 };
}
