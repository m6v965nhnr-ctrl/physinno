// 論文横断検索: PubMed・J-STAGEは公式APIで一括検索して結果を直接表示する。
// CiNii Research・Google Scholar・PEDro・医中誌Webは公開APIがない（または
// 登録・購読が必要な）ため、クライアント側でその場サイトへのリンクを作る。

export const dynamic = "force-dynamic";
export const maxDuration = 20;

type PaperResult = {
  source: "pubmed" | "jstage";
  title: string;
  authors: string | null;
  journal: string | null;
  year: string | null;
  url: string;
};

type PubMedSummaryItem = {
  uid: string;
  title?: string;
  authors?: { name: string }[];
  fulljournalname?: string;
  source?: string;
  pubdate?: string;
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return Response.json(
      { error: "検索キーワードを入力してください" },
      { status: 400 }
    );
  }

  const [pubmed, jstage] = await Promise.allSettled([
    searchPubMed(q),
    searchJStage(q),
  ]);

  const results: PaperResult[] = [
    ...(pubmed.status === "fulfilled" ? pubmed.value : []),
    ...(jstage.status === "fulfilled" ? jstage.value : []),
  ];

  const failedSources = [
    pubmed.status === "rejected" ? "pubmed" : null,
    jstage.status === "rejected" ? "jstage" : null,
  ].filter((s): s is string => Boolean(s));

  return Response.json({ results, failedSources });
}
