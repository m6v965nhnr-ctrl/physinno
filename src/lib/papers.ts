import { supabase } from "@/lib/supabase";

export type PaperResult = {
  source: "pubmed" | "jstage";
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

export const PAPER_SOURCE_LABEL: Record<PaperResult["source"], string> = {
  pubmed: "PubMed",
  jstage: "J-STAGE",
};

// APIで直接検索できないサイトは、検索語を埋め込んだリンクを一発で開けるようにする
export const PAPER_LINK_SOURCES = [
  {
    key: "cinii",
    label: "CiNii Research",
    note: "日本の論文・研究成果",
    build: (q: string) => `https://cir.nii.ac.jp/all?q=${encodeURIComponent(q)}`,
  },
  {
    key: "scholar",
    label: "Google Scholar",
    note: "分野横断",
    build: (q: string) =>
      `https://scholar.google.com/scholar?hl=ja&q=${encodeURIComponent(q)}`,
  },
  {
    key: "pedro",
    label: "PEDro",
    note: "理学療法のRCT・システマティックレビューに強い",
    build: (q: string) =>
      `https://search.pedro.org.au/search-results?calc_text=${encodeURIComponent(q)}&-find=Search`,
  },
  {
    key: "ichushi",
    label: "医中誌Web",
    note: "日本語の医学・理学療法系論文（要ログイン）",
    build: () => "https://search.jamas.or.jp/",
  },
] as const;

export async function searchPapers(
  query: string
): Promise<{ results: PaperResult[]; error: string | null }> {
  try {
    const res = await fetch(`/api/papers/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!res.ok) {
      return { results: [], error: data.error || "検索に失敗しました" };
    }

    return { results: data.results ?? [], error: null };
  } catch {
    return { results: [], error: "検索に失敗しました" };
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
