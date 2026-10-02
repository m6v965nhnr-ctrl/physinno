// 論文横断検索: PubMed・J-STAGE・CiNii Research・PEDroを一括検索し、
// 1つの結果一覧にまとめて返す（サイトは絞り込み条件のひとつという位置づけ）。
// Google Scholarと医中誌Webは公開APIがない（前者はスクレイピング規約違反の
// リスク、後者は購読・ログインが必須）ため、クライアント側で検索語入りの
// 外部リンクを提示するのみとする。
//
// 検索語が日本語の場合は英語に、英語の場合は日本語に自動翻訳し、
// 両方の言語で検索して結果をまとめる（例: 「変形性膝関節症」でも
// "knee osteoarthritis" の論文がヒットするように）。

import { containsJapanese, translateText } from "@/lib/server/mymemory";
import { translateMedicalJapanese } from "@/lib/server/medicalGlossary";

export const dynamic = "force-dynamic";
export const maxDuration = 25;

type PaperSource =
  | "pubmed"
  | "jstage"
  | "cinii"
  | "pedro"
  | "semanticscholar"
  | "europepmc";

type PaperResult = {
  source: PaperSource;
  title: string;
  authors: string | null;
  journal: string | null;
  year: string | null;
  url: string;
  // AIモード用。要約が取得できたソース（Semantic Scholar・Europe PMC）のみ入る
  abstract?: string | null;
  aiSummary?: string | null;
};

function decodeEntities(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function dedupe(list: PaperResult[]): PaperResult[] {
  const seen = new Set<string>();
  return list.filter((r) => {
    // CiNiiなど同一論文が別IDで重複登録されていることがあるため、
    // URLに加えて「掲載誌+タイトル」の正規化キーでも重複を弾く
    const titleKey = `${r.journal ?? ""}::${r.title}`.toLowerCase().replace(/\s+/g, "");
    const key = `${r.source}:${titleKey}`;
    if (seen.has(r.url) || seen.has(key)) return false;
    seen.add(r.url);
    seen.add(key);
    return true;
  });
}

// --- PubMed（公式E-utilities API） ---

type PubMedSummaryItem = {
  uid: string;
  title?: string;
  authors?: { name: string }[];
  fulljournalname?: string;
  source?: string;
  pubdate?: string;
};

async function searchPubMed(query: string): Promise<PaperResult[]> {
  const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

  const esearchRes = await fetch(
    `${base}/esearch.fcgi?db=pubmed&retmode=json&retmax=15&term=${encodeURIComponent(query)}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!esearchRes.ok) return [];

  const esearchData = (await esearchRes.json()) as {
    esearchresult?: { idlist?: string[] };
  };
  const ids = esearchData.esearchresult?.idlist ?? [];
  if (ids.length === 0) return [];

  const esummaryRes = await fetch(
    `${base}/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!esummaryRes.ok) return [];

  const esummaryData = (await esummaryRes.json()) as {
    result?: Record<string, PubMedSummaryItem>;
  };
  const result = esummaryData.result;
  if (!result) return [];

  return ids
    .map((id) => result[id])
    .filter((item): item is PubMedSummaryItem => Boolean(item))
    .map((item) => ({
      source: "pubmed" as const,
      title: item.title ? decodeEntities(item.title) : "(no title)",
      authors:
        (item.authors ?? []).map((a) => a.name).join("、") || null,
      journal: item.fulljournalname || item.source || null,
      year: (item.pubdate ?? "").slice(0, 4) || null,
      url: `https://pubmed.ncbi.nlm.nih.gov/${item.uid}/`,
    }));
}

// --- J-STAGE（公式WebAPI, Atom形式） ---

function between(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  return [...xml.matchAll(re)].map((m) => m[1]);
}

function firstText(xml: string, tag: string): string | null {
  const block = between(xml, tag)[0];
  if (block === undefined) return null;

  const ja = between(block, "ja")[0];
  const en = between(block, "en")[0];
  const text = decodeEntities(ja ?? en ?? block);

  return text || null;
}

async function searchJStage(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://api.jstage.jst.go.jp/searchapi/do?service=3&text=${encodeURIComponent(query)}&count=15`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const xml = await res.text();
  const entries = between(xml, "entry");

  const results: PaperResult[] = [];

  for (const entry of entries) {
    const title = firstText(entry, "article_title");
    if (!title) continue;

    const authors =
      between(entry, "author")
        .map((a) => firstText(a, "name"))
        .filter((n): n is string => Boolean(n))
        .join("、") || null;

    const journal = firstText(entry, "material_title");
    const yearMatch = entry.match(/<pubyear>(\d{4})<\/pubyear>/);

    const linkBlock = between(entry, "article_link")[0] ?? "";
    const hrefMatch = linkBlock.match(/href="([^"]+)"/);
    const url = hrefMatch?.[1] ?? decodeEntities(between(linkBlock, "ja")[0] ?? linkBlock);
    if (!url) continue;

    results.push({
      source: "jstage",
      title,
      authors,
      journal,
      year: yearMatch?.[1] ?? null,
      url,
    });
  }

  return results;
}

// --- CiNii Research（公式OpenSearch API, appid不要で利用可能） ---

type CiniiItem = {
  title?: string;
  "@id"?: string;
  "dc:creator"?: string[];
  "prism:publicationName"?: string;
  "prism:publicationDate"?: string;
};

async function searchCinii(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://cir.nii.ac.jp/opensearch/articles?q=${encodeURIComponent(query)}&count=15&format=json`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { items?: CiniiItem[] };
  const items = data.items ?? [];

  return items
    .filter((item): item is CiniiItem & { title: string; "@id": string } =>
      Boolean(item.title && item["@id"])
    )
    .map((item) => ({
      source: "cinii" as const,
      title: item.title,
      authors: (item["dc:creator"] ?? []).join("、") || null,
      journal: item["prism:publicationName"] ?? null,
      year: (item["prism:publicationDate"] ?? "").slice(0, 4) || null,
      url: item["@id"],
    }));
}

// --- PEDro（公式APIはないが、robots.txtで全許可されている検索結果ページをそのまま読む） ---

async function searchPedro(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://search.pedro.org.au/search-results?calc_text=${encodeURIComponent(query)}&-find=Search`,
    {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RelightBot/1.0)" },
    }
  );
  if (!res.ok) return [];

  const html = await res.text();
  const rowRe =
    /<a href="(https:\/\/search\.pedro\.org\.au\/search-results\/record-detail\/\d+)"[\s\S]*?class="left">([\s\S]*?)<\/a><\/td>\s*<td>([^<]*)<\/td>/g;

  const results: PaperResult[] = [];
  let m: RegExpExecArray | null;

  while ((m = rowRe.exec(html)) !== null && results.length < 15) {
    const url = m[1];
    const title = decodeEntities(m[2]);
    const method = decodeEntities(m[3]);
    if (!title) continue;

    const yearMatch = title.match(/\((\d{4})\)\s*$/);

    results.push({
      source: "pedro",
      title,
      authors: null,
      journal: method || null,
      year: yearMatch?.[1] ?? null,
      url,
    });
  }

  return results;
}

// --- Semantic Scholar（公式Graph API, 低頻度ならappキー不要）---
// abstractに加えて、Semantic Scholar自身がモデルで生成した1文要約
// （tldr）が返るソースがあるため、AIモードの要約表示に利用する

type SemanticScholarItem = {
  title?: string;
  abstract?: string | null;
  tldr?: { text?: string } | null;
  authors?: { name: string }[];
  venue?: string;
  year?: number;
  externalIds?: { DOI?: string };
  url?: string;
};

async function searchSemanticScholar(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
      query
    )}&limit=15&fields=title,abstract,tldr,authors,venue,year,url,externalIds`,
    {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RelightBot/1.0)" },
    }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { data?: SemanticScholarItem[] };
  const items = data.data ?? [];

  return items
    .filter((item): item is SemanticScholarItem & { title: string } => Boolean(item.title))
    .map((item) => ({
      source: "semanticscholar" as const,
      title: item.title,
      authors: (item.authors ?? []).map((a) => a.name).join("、") || null,
      journal: item.venue || null,
      year: item.year ? String(item.year) : null,
      url:
        item.url ||
        (item.externalIds?.DOI ? `https://doi.org/${item.externalIds.DOI}` : ""),
      abstract: item.abstract || null,
      aiSummary: item.tldr?.text || null,
    }))
    .filter((r) => r.url);
}

// --- Europe PMC（公式REST API, キー不要）---

type EuropePmcItem = {
  title?: string;
  authorString?: string;
  journalTitle?: string;
  pubYear?: string;
  doi?: string;
  pmid?: string;
  source?: string;
  id?: string;
  abstractText?: string;
};

async function searchEuropePmc(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
      query
    )}&format=json&pageSize=15&resultType=core`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as {
    resultList?: { result?: EuropePmcItem[] };
  };
  const items = data.resultList?.result ?? [];

  return items
    .filter((item): item is EuropePmcItem & { title: string } => Boolean(item.title))
    .map((item) => ({
      source: "europepmc" as const,
      title: decodeEntities(item.title),
      authors: item.authorString || null,
      journal: item.journalTitle || null,
      year: item.pubYear || null,
      url: item.doi
        ? `https://doi.org/${item.doi}`
        : item.source && item.id
          ? `https://europepmc.org/article/${item.source}/${item.id}`
          : "",
      abstract: item.abstractText ? decodeEntities(item.abstractText) : null,
    }))
    .filter((r) => r.url);
}

const SOURCE_SEARCHERS: Record<PaperSource, (q: string) => Promise<PaperResult[]>> = {
  pubmed: searchPubMed,
  jstage: searchJStage,
  cinii: searchCinii,
  pedro: searchPedro,
  semanticscholar: searchSemanticScholar,
  europepmc: searchEuropePmc,
};

// 検索語が日本語の場合、まず用語集（medicalGlossary）で標準的な英語に
// 変換する。用語集で拾いきれない部分が残る場合だけ機械翻訳で補う
// （機械翻訳単体だと医学用語が不正確になりやすいため）
async function toEnglishQuery(q: string): Promise<string | null> {
  const { result, fullyTranslated } = translateMedicalJapanese(q);
  if (fullyTranslated) return result;

  return (await translateText(result, "ja", "en")) ?? (result !== q ? result : null);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return Response.json(
      { error: "検索キーワードを入力してください" },
      { status: 400 }
    );
  }

  const sourcesParam = searchParams.get("sources");
  const requestedSources = new Set(
    sourcesParam
      ? sourcesParam.split(",")
      : ["pubmed", "jstage", "cinii", "pedro", "semanticscholar", "europepmc"]
  );

  const isJa = containsJapanese(q);
  const [enTranslated, jaTranslated] = await Promise.all([
    isJa ? toEnglishQuery(q) : Promise.resolve(null),
    isJa ? Promise.resolve(null) : translateText(q, "en", "ja"),
  ]);

  const enQuery = isJa ? enTranslated ?? q : q;
  const jaQuery = isJa ? q : jaTranslated ?? q;
  // 日本語検索サイト（J-STAGE・CiNii）は日英どちらの表記の論文もヒットしうるので両方で検索する
  const bilingualQueries = [...new Set([jaQuery, enQuery])];

  const tasks: Promise<PaperResult[]>[] = [];
  const taskLabels: string[] = [];

  (Object.keys(SOURCE_SEARCHERS) as PaperSource[]).forEach((key) => {
    if (!requestedSources.has(key)) return;

    const searcher = SOURCE_SEARCHERS[key];
    const queries = key === "jstage" || key === "cinii" ? bilingualQueries : [enQuery];

    tasks.push(
      Promise.all(queries.map(searcher)).then((lists) => dedupe(lists.flat()))
    );
    taskLabels.push(key);
  });

  const settled = await Promise.allSettled(tasks);

  const results: PaperResult[] = [];
  const failedSources: string[] = [];

  settled.forEach((r, i) => {
    if (r.status === "fulfilled") {
      results.push(...r.value);
    } else {
      failedSources.push(taskLabels[i]);
    }
  });

  const merged = dedupe(results).sort((a, b) => {
    const ay = a.year ? Number(a.year) : -1;
    const by = b.year ? Number(b.year) : -1;
    return by - ay;
  });

  return Response.json({
    results: merged,
    failedSources,
    translatedQuery: isJa ? enTranslated : jaTranslated,
  });
}
