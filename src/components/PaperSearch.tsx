"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import {
  PAPER_LINK_SOURCES,
  PAPER_SOURCE_LABEL,
  PaperResult,
  SavedPaper,
  deleteSavedPaper,
  listSavedPapers,
  savePaper,
  searchPapers,
} from "@/lib/papers";

// PTがいつも論文を探すときに何サイトも回っている手間を減らすための横断検索。
// PubMed・J-STAGEは公式APIで直接結果を表示し、それ以外は検索語入りの
// リンクを一発で開けるようにする（公開APIがない、または購読が必要なため）。
export default function PaperSearch() {
  const [userId, setUserId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<PaperResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const [savedOpen, setSavedOpen] = useState(false);
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);
  const [savedLoading, setSavedLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
    });
  }, []);

  async function handleSearch() {
    const q = query.trim();
    if (!q) return;

    setSearching(true);
    setSearched(true);

    const { results, error } = await searchPapers(q);
    setResults(results);
    setSearching(false);

    if (error) notify(error);
  }

  async function handleSave(paper: PaperResult) {
    if (!userId) {
      notify("ログインしてください");
      return;
    }

    const error = await savePaper(userId, paper);
    if (error) {
      notify(error);
      return;
    }

    setSavedIds((prev) => new Set(prev).add(paper.url));
    notify("保存しました");
  }

  async function loadSaved() {
    if (!userId) return;
    setSavedLoading(true);
    setSavedPapers(await listSavedPapers(userId));
    setSavedLoading(false);
  }

  async function handleToggleSaved() {
    const next = !savedOpen;
    setSavedOpen(next);
    if (next) await loadSaved();
  }

  async function handleDeleteSaved(id: string) {
    const error = await deleteSavedPaper(id);
    if (error) {
      notify(error);
      return;
    }
    setSavedPapers((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="キーワード（例：変形性膝関節症 運動療法）"
          className="w-full rounded-full border px-5 py-3"
          aria-label="論文検索キーワード"
        />
        <button
          onClick={handleSearch}
          disabled={searching || !query.trim()}
          className="shrink-0 rounded-full bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {searching ? "検索中…" : "🔍 検索"}
        </button>
      </div>

      {/* PubMed / J-STAGE を横断した結果 */}
      {searched && (
        <div className="mt-6 space-y-3">
          {searching && (
            <p className="text-sm text-gray-400">検索しています…</p>
          )}

          {!searching && results.length === 0 && (
            <p className="text-sm text-gray-400">
              PubMed / J-STAGEでは見つかりませんでした。下のリンクから他のサイトも確認してみてください
            </p>
          )}

          {results.map((r, i) => (
            <div
              key={`${r.source}-${i}`}
              className="rounded-2xl border border-gray-100 p-4"
            >
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                {PAPER_SOURCE_LABEL[r.source]}
              </span>

              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-semibold text-gray-900 hover:underline"
              >
                {r.title}
              </a>

              <p className="mt-1 text-xs text-gray-500">
                {[r.journal, r.year].filter(Boolean).join(" ・ ")}
              </p>
              {r.authors && (
                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {r.authors}
                </p>
              )}

              <button
                onClick={() => handleSave(r)}
                disabled={savedIds.has(r.url)}
                className="mt-2 rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                {savedIds.has(r.url) ? "保存済み" : "＋ 保存"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* APIがないサイトは検索語入りのリンクをその場で開けるようにする */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-500">他のサイトでも探す</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {PAPER_LINK_SOURCES.map((s) => (
            <a
              key={s.key}
              href={s.build(query.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-100 p-3 hover:border-gray-300"
            >
              <p className="text-sm font-medium text-gray-900">{s.label}</p>
              <p className="mt-0.5 text-[11px] text-gray-400">{s.note}</p>
            </a>
          ))}
        </div>
      </div>

      {/* 保存した論文 */}
      {userId && (
        <div className="mt-8">
          <button
            onClick={handleToggleSaved}
            className="text-sm font-semibold text-gray-500"
          >
            保存した論文 {savedOpen ? "▲" : "▼"}
          </button>

          {savedOpen && (
            <div className="mt-3 space-y-2">
              {savedLoading && (
                <p className="text-sm text-gray-400">読み込み中…</p>
              )}

              {!savedLoading && savedPapers.length === 0 && (
                <p className="text-sm text-gray-400">まだ保存した論文はありません</p>
              )}

              {savedPapers.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-2 rounded-2xl border border-gray-100 p-4"
                >
                  <div className="min-w-0">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                      {p.source}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-sm font-semibold text-gray-900 hover:underline"
                    >
                      {p.title}
                    </a>
                    <p className="mt-1 text-xs text-gray-500">
                      {[p.journal, p.year].filter(Boolean).join(" ・ ")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteSaved(p.id)}
                    className="shrink-0 text-gray-300 hover:text-gray-500"
                    aria-label="削除"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
