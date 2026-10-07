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
import {
  EvidenceBasis,
  EvidenceLevel,
  europePmcLevelFilter,
  judgeEvidence,
  isEvidenceLevel,
  pubmedLevelFilter,
} from "@/lib/evidence";

export const dynamic = "force-dynamic";
export const maxDuration = 25;

type PaperSource =
  | "pubmed"
  | "jstage"
  | "cinii"
  | "pedro"
  | "semanticscholar"
  | "europepmc"
  | "openalex"
  | "clinicaltrials"
  | "doaj";

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
  // エビデンスレベル（出版タイプ・題名・要約から判定。分からないときは入らない）
  evidenceLevel?: EvidenceLevel | null;
  // "type" = 出版タイプ・登録情報などから確実に判定 / "text" = 題名・要約の文面からの推定
  evidenceBasis?: EvidenceBasis | null;
  // 他の論文に引用された数（取得できないサイトは入らない）
  citationCount?: number | null;
};

// 判定結果を、検索結果に入れる形にする
function judged(input: Parameters<typeof judgeEvidence>[0]): Pick<PaperResult, "evidenceLevel" | "evidenceBasis"> {
  const j = judgeEvidence(input);
  return { evidenceLevel: j?.level ?? null, evidenceBasis: j?.basis ?? null };
}

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

async function pubmedEsearch(term: string, retmax: number): Promise<string[]> {
  const res = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=${retmax}&term=${encodeURIComponent(term)}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { esearchresult?: { idlist?: string[] } };
  return data.esearchresult?.idlist ?? [];
}

async function searchPubMed(query: string, levels: EvidenceLevel[] = []): Promise<PaperResult[]> {
  const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

  // エビデンスレベルの指定があるときは、出版タイプ・MeSHで、PubMed側で絞り込む。
  // 複数のレベルを選んだときは、レベルごとに検索して（PubMedは1秒に3回までなので、少し間をあけて）、
  // どのレベルの論文も出るようにする
  let ids: string[] = [];

  if (levels.length <= 1) {
    const filter = pubmedLevelFilter(levels);
    ids = await pubmedEsearch(filter ? `(${query}) AND ${filter}` : query, 15);
  } else {
    const per = Math.max(4, Math.ceil(15 / levels.length));
    for (const [i, level] of levels.entries()) {
      if (i > 0) await new Promise((r) => setTimeout(r, 400));
      ids.push(...(await pubmedEsearch(`(${query}) AND ${pubmedLevelFilter([level])}`, per).catch(() => [])));
    }
    ids = [...new Set(ids)];
  }

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

  // esummaryにはアブストラクトが含まれないため、efetchで別途取得する（失敗しても検索結果は返す）
  const details = await fetchPubMedDetails(ids).catch(
    () => ({}) as Record<string, PubMedDetail>
  );

  // 引用された数は、NIHのiCiteから取得する（失敗しても検索結果は返す）
  const citations = await fetchPubMedCitations(ids).catch(() => ({}) as Record<string, number>);

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
      abstract: details[item.uid]?.abstract ?? null,
      evidenceLevel: details[item.uid]?.judgement?.level ?? null,
      evidenceBasis: details[item.uid]?.judgement?.basis ?? null,
      citationCount: citations[item.uid] ?? null,
    }));
}

// PubMedの論文が引用された数（NIH iCite。公式API・キー不要）
async function fetchPubMedCitations(ids: string[]): Promise<Record<string, number>> {
  const res = await fetch(
    `https://icite.od.nih.gov/api/pubs?pmids=${ids.join(",")}&fl=pmid,citation_count`,
    { signal: AbortSignal.timeout(6000) }
  );
  if (!res.ok) return {};
  const data = (await res.json()) as { data?: { pmid: number; citation_count: number | null }[] };
  const out: Record<string, number> = {};
  for (const d of data.data ?? []) {
    if (typeof d.citation_count === "number") out[String(d.pmid)] = d.citation_count;
  }
  return out;
}

type PubMedDetail = { abstract: string | null; judgement: ReturnType<typeof judgeEvidence> };

async function fetchPubMedDetails(ids: string[]): Promise<Record<string, PubMedDetail>> {
  const res = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=${ids.join(",")}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return {};

  const xml = await res.text();
  const out: Record<string, PubMedDetail> = {};

  for (const article of xml.split("<PubmedArticle>").slice(1)) {
    const pmid = article.match(/<PMID[^>]*>(\d+)<\/PMID>/)?.[1];
    if (!pmid) continue;

    // 構造化アブストラクト（BACKGROUND / METHODS など）はラベル付きで連結する
    const parts = [...article.matchAll(/<AbstractText([^>]*)>([\s\S]*?)<\/AbstractText>/g)]
      .map((m) => {
        const label = m[1].match(/Label="([^"]+)"/)?.[1];
        const text = decodeEntities(m[2]);
        return text ? (label ? `${label}: ${text}` : text) : "";
      })
      .filter(Boolean);

    // 出版タイプ（Randomized Controlled Trial など）とMeSH（Cohort Studies など）から、レベルを判定する
    const types = [...article.matchAll(/<PublicationType[^>]*>([^<]+)<\/PublicationType>/g)].map((m) => m[1]);
    const mesh = [...article.matchAll(/<DescriptorName[^>]*>([^<]+)<\/DescriptorName>/g)].map((m) => m[1]);
    const title = article.match(/<ArticleTitle[^>]*>([\s\S]*?)<\/ArticleTitle>/)?.[1] ?? "";

    out[pmid] = {
      abstract: parts.length > 0 ? parts.join(" ") : null,
      judgement: judgeEvidence({
        types: [...types, ...mesh.filter((m) => /cohort|case-control|cross-sectional|prospective|retrospective|longitudinal/i.test(m))],
        title: decodeEntities(title),
        abstract: parts.join(" "),
      }),
    };
  }

  return out;
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
      // PEDroは、ランダム化比較試験（準ランダム化を含む）・システマティックレビュー・ガイドラインだけを載せるデータベース
      ...judged({
        types: [
          /systematic review/i.test(method)
            ? "systematic review"
            : /practice guideline/i.test(method)
              ? "practice guideline"
              : /clinical trial/i.test(method)
                ? "randomized controlled trial"
                : "",
        ].filter(Boolean),
        title,
      }),
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
  publicationTypes?: string[] | null;
  citationCount?: number | null;
};

async function searchSemanticScholar(query: string): Promise<PaperResult[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
    query
  )}&limit=15&fields=title,abstract,tldr,authors,venue,year,url,externalIds,publicationTypes,citationCount`;

  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0 (compatible; RelightBot/1.0)",
  };
  // APIキーを取得したら環境変数で設定する（サーバー側のみ。クライアントには出さない）
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
    headers["x-api-key"] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  }

  // 429（レート制限）のときは指数バックオフで最大2回までリトライする
  let res: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    res = await fetch(url, { signal: AbortSignal.timeout(5000), headers });
    if (res.status !== 429) break;
    if (attempt < 2) await new Promise((r) => setTimeout(r, 800 * 2 ** attempt));
  }
  if (!res || !res.ok) return [];

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
      citationCount: typeof item.citationCount === "number" ? item.citationCount : null,
      ...judged({
        types: (item.publicationTypes ?? []).map((t) =>
          t === "MetaAnalysis" ? "meta-analysis" : t === "CaseReport" ? "case report" : t === "Editorial" ? "editorial" : t
        ),
        title: item.title,
        abstract: item.abstract,
      }),
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
  pubTypeList?: { pubType?: string[] };
  citedByCount?: number;
};

async function searchEuropePmc(
  query: string,
  levels: EvidenceLevel[] = [],
  pageSize = 15
): Promise<PaperResult[]> {
  if (levels.length > 1) {
    const per = Math.max(4, Math.ceil(15 / levels.length));
    const lists = await Promise.all(levels.map((l) => searchEuropePmc(query, [l], per).catch(() => [])));
    return lists.flat();
  }

  const filter = europePmcLevelFilter(levels);
  const term = filter ? `(${query}) AND ${filter}` : query;

  const res = await fetch(
    `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
      term
    )}&format=json&pageSize=${pageSize}&resultType=core`,
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
      citationCount: typeof item.citedByCount === "number" ? item.citedByCount : null,
      ...judged({
        types: item.pubTypeList?.pubType ?? [],
        title: item.title,
        abstract: item.abstractText,
      }),
    }))
    .filter((r) => r.url);
}

// --- OpenAlex（公式API, キー不要・世界最大級の完全オープンな学術データベース）---

type OpenAlexItem = {
  title?: string;
  abstract_inverted_index?: Record<string, number[]> | null;
  authorships?: { author?: { display_name?: string } }[];
  primary_location?: { source?: { display_name?: string } | null } | null;
  publication_year?: number;
  doi?: string;
  ids?: { openalex?: string };
  cited_by_count?: number;
};

// アブストラクトは単語→出現位置のインデックス形式で返るため、文章に復元する
function reconstructAbstract(
  invertedIndex: Record<string, number[]> | null | undefined
): string | null {
  if (!invertedIndex) return null;

  const positions = Object.values(invertedIndex).flat();
  if (positions.length === 0) return null;

  const words: string[] = new Array(Math.max(...positions) + 1).fill("");
  for (const [word, wordPositions] of Object.entries(invertedIndex)) {
    for (const pos of wordPositions) words[pos] = word;
  }

  return words.join(" ").trim() || null;
}

async function searchOpenAlex(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://api.openalex.org/works?search=${encodeURIComponent(
      query
    )}&per-page=15&select=title,abstract_inverted_index,authorships,primary_location,publication_year,doi,ids,cited_by_count`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { results?: OpenAlexItem[] };
  const items = data.results ?? [];

  return items
    .filter((item): item is OpenAlexItem & { title: string } => Boolean(item.title))
    .map((item) => ({
      source: "openalex" as const,
      title: item.title,
      authors:
        (item.authorships ?? [])
          .map((a) => a.author?.display_name)
          .filter((n): n is string => Boolean(n))
          .join("、") || null,
      journal: item.primary_location?.source?.display_name ?? null,
      year: item.publication_year ? String(item.publication_year) : null,
      url: item.doi || item.ids?.openalex || "",
      abstract: reconstructAbstract(item.abstract_inverted_index),
      citationCount: typeof item.cited_by_count === "number" ? item.cited_by_count : null,
    }))
    .filter((r) => r.url);
}

// --- ClinicalTrials.gov（米国NIH公式API v2, キー不要）---
// 論文ではなく臨床試験の登録情報だが、EBMでは一次情報として重要なため含める

type CtGovStudy = {
  protocolSection?: {
    identificationModule?: {
      nctId?: string;
      briefTitle?: string;
      officialTitle?: string;
    };
    descriptionModule?: { briefSummary?: string };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    statusModule?: { startDateStruct?: { date?: string } };
    designModule?: {
      studyType?: string;
      designInfo?: { allocation?: string; observationalModel?: string; timePerspective?: string };
    };
  };
};

// 登録された試験計画の割り付け方法・観察研究の型から、研究デザインを決める
function ctGovDesignTypes(d: NonNullable<CtGovStudy["protocolSection"]>["designModule"]): string[] {
  const info = d?.designInfo;
  if (d?.studyType === "INTERVENTIONAL") {
    if (info?.allocation === "RANDOMIZED") return ["randomized controlled trial"];
    if (info?.allocation === "NON_RANDOMIZED") return ["non-randomized controlled trial"];
    return [];
  }
  if (d?.studyType === "OBSERVATIONAL") {
    if (info?.observationalModel === "COHORT") return ["cohort study"];
    if (info?.observationalModel === "CASE_CONTROL") return ["case-control study"];
    if (info?.observationalModel === "CASE_ONLY") return ["case report"];
    if (info?.timePerspective === "CROSS_SECTIONAL") return ["cross-sectional study"];
  }
  return [];
}

async function searchClinicalTrials(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(
      query
    )}&pageSize=15&format=json`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { studies?: CtGovStudy[] };
  const items = data.studies ?? [];

  return items
    .map((s) => s.protocolSection)
    .filter(
      (p): p is NonNullable<CtGovStudy["protocolSection"]> =>
        Boolean(p?.identificationModule?.nctId)
    )
    .map((p) => {
      const nctId = p.identificationModule!.nctId!;
      return {
        source: "clinicaltrials" as const,
        title:
          p.identificationModule!.briefTitle ||
          p.identificationModule!.officialTitle ||
          "(no title)",
        authors: null,
        journal: p.sponsorCollaboratorsModule?.leadSponsor?.name || "ClinicalTrials.gov",
        year: p.statusModule?.startDateStruct?.date?.slice(0, 4) || null,
        url: `https://clinicaltrials.gov/study/${nctId}`,
        abstract: p.descriptionModule?.briefSummary || null,
        ...judged({ types: ctGovDesignTypes(p.designModule) }),
      };
    });
}

// --- DOAJ（Directory of Open Access Journals公式API, キー不要）---

type DoajItem = {
  bibjson?: {
    title?: string;
    author?: { name?: string }[];
    journal?: { title?: string };
    year?: string;
    link?: { type?: string; url?: string }[];
    abstract?: string;
  };
};

async function searchDoaj(query: string): Promise<PaperResult[]> {
  const res = await fetch(
    `https://doaj.org/api/search/articles/${encodeURIComponent(query)}?pageSize=15`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { results?: DoajItem[] };
  const items = data.results ?? [];

  return items
    .filter((item): item is DoajItem & { bibjson: NonNullable<DoajItem["bibjson"]> & { title: string } } =>
      Boolean(item.bibjson?.title)
    )
    .map((item) => {
      const b = item.bibjson;
      const link = b.link?.find((l) => l.type === "fulltext")?.url || b.link?.[0]?.url || "";

      return {
        source: "doaj" as const,
        title: b.title,
        authors:
          (b.author ?? []).map((a) => a.name).filter((n): n is string => Boolean(n)).join("、") ||
          null,
        journal: b.journal?.title || null,
        year: b.year || null,
        url: link,
        abstract: b.abstract || null,
      };
    })
    .filter((r) => r.url);
}

const SOURCE_SEARCHERS: Record<PaperSource, (q: string, levels?: EvidenceLevel[]) => Promise<PaperResult[]>> = {
  pubmed: searchPubMed,
  jstage: searchJStage,
  cinii: searchCinii,
  pedro: searchPedro,
  semanticscholar: searchSemanticScholar,
  europepmc: searchEuropePmc,
  openalex: searchOpenAlex,
  clinicaltrials: searchClinicalTrials,
  doaj: searchDoaj,
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
      : [
          "pubmed",
          "jstage",
          "cinii",
          "pedro",
          "semanticscholar",
          "europepmc",
          "openalex",
          "clinicaltrials",
          "doaj",
        ]
  );

  // エビデンスレベルの絞り込み（例: levels=I,II）。空なら絞り込まない
  const levels = (searchParams.get("levels") ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(isEvidenceLevel);

  // strict=1: 出版タイプ・登録情報で確実に判定できたものだけに絞る（文面からの推定は除く）
  const strict = searchParams.get("strict") === "1";

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
      Promise.all(queries.map((query) => searcher(query, levels))).then((lists) => dedupe(lists.flat()))
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

  // どのサイトの論文にも、題名・要約からレベルを付ける（出版タイプで付いているものは、そのまま）
  for (const r of results) {
    if (!r.evidenceLevel) Object.assign(r, judged({ title: r.title, abstract: r.abstract }));
  }

  // 絞り込み:
  //  - PubMed は、検索の段階で出版タイプ・MeSHで絞り込み済み
  //  - それ以外のサイトは、判定したレベルが選んだレベルに入るものだけ（判定できなかったものは出さない）
  //  - strict のときは、さらに、文面からの推定は除く
  const filtered = results.filter((r) => {
    if (strict && r.evidenceBasis !== "type") return false;
    if (levels.length === 0) return true;
    if (r.source === "pubmed") return true;
    return !!r.evidenceLevel && levels.includes(r.evidenceLevel);
  });

  const merged = dedupe(filtered).sort((a, b) => {
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
