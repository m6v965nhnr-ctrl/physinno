import { supabase } from "@/lib/supabase";

export type PaperSource = "pubmed" | "jstage" | "cinii" | "pedro";

export type PaperResult = {
  source: PaperSource;
  title: string;
  authors: string | null;
  journal: string | null;
  year: string | null;
  url: string;
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
};

// PubMedは常に検索対象。それ以外は絞り込み用のチェックボックスで on/off する
export const OPTIONAL_PAPER_SOURCES: { key: Exclude<PaperSource, "pubmed">; label: string }[] = [
  { key: "jstage", label: "J-STAGE" },
  { key: "cinii", label: "CiNii Research" },
  { key: "pedro", label: "PEDro" },
];

// 公開APIがない（Google Scholar: スクレイピングは規約違反のリスク／
// 医中誌Web: 購読・ログイン必須）ため、検索語を埋め込んだリンクを開く形にとどめる
export const PAPER_LINK_SOURCES = [
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
  sources: Exclude<PaperSource, "pubmed">[]
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
): Promise<string | null> {
  const { error } = await supabase.from("saved_papers").insert({
    user_id: userId,
    source: paper.source,
    title: paper.title,
    authors: paper.authors,
    journal: paper.journal,
    year: paper.year,
    url: paper.url,
  });

  return error ? error.message : null;
}

export async function deleteSavedPaper(id: string): Promise<string | null> {
  const { error } = await supabase.from("saved_papers").delete().eq("id", id);
  return error ? error.message : null;
}
