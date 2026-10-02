import { supabase } from "@/lib/supabase";

export type PaperSource =
  | "pubmed"
  | "jstage"
  | "cinii"
  | "pedro"
  | "semanticscholar"
  | "europepmc"
  | "openalex"
  | "clinicaltrials"
  | "doaj";

export type PaperResult = {
  source: PaperSource;
  title: string;
  authors: string | null;
  journal: string | null;
  year: string | null;
  url: string;
  // AIモード用。Semantic Scholar・Europe PMCなど要約が取得できたソースのみ入る
  abstract?: string | null;
  aiSummary?: string | null;
};

export type SavedPaper = {
  id: string;
  source: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: string | null;
  url: string;
  created_at: string;
};

export const PAPER_SOURCE_LABEL: Record<PaperSource, string> = {
  pubmed: "PubMed",
  jstage: "J-STAGE",
  cinii: "CiNii Research",
  pedro: "PEDro",
  semanticscholar: "Semantic Scholar",
  europepmc: "Europe PMC",
  openalex: "OpenAlex",
  clinicaltrials: "ClinicalTrials.gov",
  doaj: "DOAJ",
};

// すべて絞り込み用のチェックボックスで on/off する（PubMedもデフォルトonの通常項目）
// アブストラクト（要約）も取得できるソースは、AIモードの要約表示に使われる
export const PAPER_SOURCES: { key: PaperSource; label: string }[] = [
  { key: "pubmed", label: "PubMed" },
  { key: "jstage", label: "J-STAGE" },
  { key: "cinii", label: "CiNii Research" },
  { key: "pedro", label: "PEDro" },
  { key: "semanticscholar", label: "Semantic Scholar" },
  { key: "europepmc", label: "Europe PMC" },
  { key: "openalex", label: "OpenAlex" },
  { key: "clinicaltrials", label: "ClinicalTrials.gov" },
  { key: "doaj", label: "DOAJ" },
];

// 公開APIがない（Google Scholar: スクレイピングは規約違反のリスク／
// 医中誌Web: 購読・ログイン必須／Cochrane Library: 検索APIが公開されていない）
// ため、検索語を埋め込んだリンクを開く形にとどめる
export const PAPER_LINK_SOURCES = [
  {
    key: "cochrane",
    label: "Cochrane Library",
    note: "システマティックレビューの世界標準（APIがないためリンクで開きます）",
    build: (q: string) =>
      `https://www.cochranelibrary.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    key: "scholar",
    label: "Google Scholar",
    note: "分野横断（APIがないためリンクで開きます）",
    build: (q: string) =>
      `https://scholar.google.com/scholar?hl=ja&q=${encodeURIComponent(q)}`,
  },
  {
    key: "ichushi",
    label: "医中誌Web",
    note: "日本語の医学・理学療法系論文（要ログイン）",
    build: () => "https://search.jamas.or.jp/",
  },
] as const;

export async function searchPapers(
  query: string,
  sources: PaperSource[]
): Promise<{ results: PaperResult[]; error: string | null; translatedQuery: string | null }> {
  try {
    const params = new URLSearchParams({ q: query, sources: sources.join(",") });
    const res = await fetch(`/api/papers/search?${params.toString()}`);
    const data = await res.json();

    if (!res.ok) {
      return { results: [], error: data.error || "検索に失敗しました", translatedQuery: null };
    }

    return {
      results: data.results ?? [],
      error: null,
      translatedQuery: data.translatedQuery ?? null,
    };
  } catch {
    return { results: [], error: "検索に失敗しました", translatedQuery: null };
  }
}

// 検索結果のタイトルを日本語にまとめて翻訳する（直訳でよい前提のシンプル機能）
export async function translateTitles(texts: string[]): Promise<(string | null)[]> {
  try {
    const res = await fetch("/api/papers/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts }),
    });
    const data = await res.json();
    return Array.isArray(data.translations) ? data.translations : texts.map(() => null);
  } catch {
    return texts.map(() => null);
  }
}

export async function listSavedPapers(userId: string): Promise<SavedPaper[]> {
  const { data } = await supabase
    .from("saved_papers")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function savePaper(
  userId: string,
  paper: PaperResult
): Promise<{ id: string | null; error: string | null }> {
  const { data, error } = await supabase
    .from("saved_papers")
    .insert({
      user_id: userId,
      source: paper.source,
      title: paper.title,
      authors: paper.authors,
      journal: paper.journal,
      year: paper.year,
      url: paper.url,
    })
    .select("id")
    .single();

  return { id: data?.id ?? null, error: error?.message ?? null };
}

export async function deleteSavedPaper(id: string): Promise<string | null> {
  const { error } = await supabase.from("saved_papers").delete().eq("id", id);
  return error ? error.message : null;
}
