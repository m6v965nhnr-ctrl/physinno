"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import {
  PAPER_LINK_SOURCES,
  PAPER_SOURCE_LABEL,
  PAPER_SOURCES,
  PaperResult,
  PaperSource,
  SavedPaper,
  deleteSavedPaper,
  listSavedPapers,
  savePaper,
  searchPapers,
  translateTitles,
} from "@/lib/papers";

const RECENT_SEARCHES_KEY = "relight:paper-search:recent";
const RECENT_SEARCHES_MAX = 6;

function loadRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  try {
    const next = [query, ...loadRecentSearches().filter((q) => q !== query)].slice(
      0,
      RECENT_SEARCHES_MAX
    );
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  } catch {
    // localStorageが使えない環境では履歴機能だけ無効化する
  }
}

// PTがいつも論文を探すときに何サイトも回っている手間を減らすための横断検索。
// PubMed・J-STAGE・CiNii Research・PEDro・Semantic Scholar・Europe PMCを
// 1つの結果一覧にまとめて表示する。サイトはあくまで絞り込みのチェックボックス
// （すべてデフォルトon）。Google Scholarと医中誌Webは公開APIがない
// （規約違反のリスク／購読・ログイン必須）ため、検索語入りのリンクを
// 一発で開けるだけにとどめる。
//
// ノーマルモード：キーワードでの横断検索（従来通り）
// AIモード：聞きたいことを文章で入力すると、Semantic Scholar・Europe PMCの
// アブストラクト（Semantic Scholarはモデル生成の一文要約tldrつき）を
// 結果の下に表示する。Consensusのような「全論文を1つの結論に合成する」
// 機能ではなく、まずは要約つきで関連論文を探しやすくする第一段階という位置づけ。
export default function PaperSearch() {
  const [userId, setUserId] = useState<string | null>(null);
  const [mode, setMode] = useState<"normal" | "ai">("normal");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<PaperResult[]>([]);
  const [searched, setSearched] = useState(false);
  // 保存済み論文のurl→saved_papers.id。保存/保存解除の両方をこのマップで判定する
  const [savedMap, setSavedMap] = useState<Record<string, string>>({});
  const [translatedQuery, setTranslatedQuery] = useState<string | null>(null);
  const [titleTranslations, setTitleTranslations] = useState<Record<string, string>>({});
  const [translatingTitles, setTranslatingTitles] = useState(false);

  const [enabledSources, setEnabledSources] = useState<Set<PaperSource>>(
    new Set(PAPER_SOURCES.map((s) => s.key))
  );

  const [savedOpen, setSavedOpen] = useState(false);
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const savedSectionRef = useRef<HTMLDivElement>(null);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      if (user) loadSaved(user.id);
    });
    setRecentSearches(loadRecentSearches());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowRecent(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleSource(key: PaperSource) {
    setEnabledSources((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function handleSearch(overrideQuery?: string) {
    const q = (overrideQuery ?? query).trim();
    if (!q || enabledSources.size === 0) return;

    setQuery(q);
    setShowRecent(false);
    setSearching(true);
    setSearched(true);
    setTitleTranslations({});

    const { results, error, translatedQuery } = await searchPapers(q, [...enabledSources]);
    setResults(results);
    setTranslatedQuery(translatedQuery);
    setSearching(false);

    saveRecentSearch(q);
    setRecentSearches(loadRecentSearches());

    if (error) notify(error);
  }

  async function handleTranslateTitles() {
    const targets = results.filter((r) => !titleTranslations[r.url]);
    if (targets.length === 0) return;

    setTranslatingTitles(true);
    const translations = await translateTitles(targets.map((r) => r.title));
    setTranslatingTitles(false);

    setTitleTranslations((prev) => {
      const next = { ...prev };
      targets.forEach((r, i) => {
        const t = translations[i];
        if (t) next[r.url] = t;
      });
      return next;
    });
  }

  // 保存する/もう一度押すと保存解除する、のトグル動作
  async function handleToggleSave(paper: PaperResult) {
    if (!userId) {
      notify("ログインしてください");
      return;
    }

    const existingId = savedMap[paper.url];

    if (existingId) {
      const error = await deleteSavedPaper(existingId);
      if (error) {
        notify(error);
        return;
      }
      setSavedMap((prev) => {
        const next = { ...prev };
        delete next[paper.url];
        return next;
      });
      setSavedPapers((prev) => prev.filter((p) => p.id !== existingId));
      notify("保存を解除しました");
      return;
    }

    const { id, error } = await savePaper(userId, paper);
    if (error || !id) {
      notify(error || "保存に失敗しました");
      return;
    }

    setSavedMap((prev) => ({ ...prev, [paper.url]: id }));
    setSavedPapers((prev) => [
      {
        id,
        source: paper.source,
        title: paper.title,
        authors: paper.authors,
        journal: paper.journal,
        year: paper.year,
        url: paper.url,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
    notify("保存しました");
  }

  async function loadSaved(uid: string) {
    setSavedLoading(true);
    const list = await listSavedPapers(uid);
    setSavedPapers(list);
    setSavedMap(Object.fromEntries(list.map((p) => [p.url, p.id])));
    setSavedLoading(false);
  }

  async function handleToggleSaved() {
    setSavedOpen((v) => !v);
  }

  // タイトル翻訳ボタンの右に置く保存リストへのショートカット。
  // 既存の折りたたみを開いて、保存リストまでスクロールする
  function handleOpenSavedList() {
    setSavedOpen(true);
    setTimeout(() => {
      savedSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function handleDeleteSaved(id: string) {
    const error = await deleteSavedPaper(id);
    if (error) {
      notify(error);
      return;
    }
    setSavedPapers((prev) => prev.filter((p) => p.id !== id));
    setSavedMap((prev) => {
      const next = { ...prev };
      for (const url of Object.keys(next)) {
        if (next[url] === id) delete next[url];
      }
      return next;
    });
  }

  function clearRecentSearches() {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // noop
    }
    setRecentSearches([]);
  }

  return (
    <div>
      {/* ノーマル / AIモード切り替え */}
      <div
        role="tablist"
        aria-label="検索モード"
        className="mb-3 grid grid-cols-2 rounded-full bg-gray-100 p-1 text-sm font-medium"
      >
        {([
          ["normal", "ノーマル"],
          ["ai", "✨ AIモード"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
            className={`rounded-full py-2 transition ${
              mode === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "ai" && (
        <p className="mb-3 text-xs text-gray-500">
          聞きたいことを文章で入力すると、Semantic Scholar・Europe
          PMCの要約（アブストラクト／AI一文要約）つきで関連論文を探せます。
        </p>
      )}

      {/* macOS風の検索フィールド：虫眼鏡アイコン・クリアボタン・最近の検索 */}
      <div ref={searchBoxRef} className="relative">
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-4 text-gray-400">
            🔍
          </span>

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) setShowRecent(false);
            }}
            onFocus={() => setShowRecent(query.trim() === "" && recentSearches.length > 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
              if (e.key === "Escape") setShowRecent(false);
            }}
            placeholder={
              mode === "ai"
                ? "例：膝OAに運動療法は効果があるか"
                : "キーワード（例：変形性膝関節症 運動療法）"
            }
            className="w-full rounded-full border-none bg-gray-100 py-3 pl-11 pr-10 text-sm text-gray-900 outline-none ring-0 focus:bg-white focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
            aria-label={mode === "ai" ? "AIモードで論文を検索" : "論文検索キーワード"}
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setShowRecent(recentSearches.length > 0);
              }}
              aria-label="検索語をクリア"
              className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs text-white hover:bg-gray-400"
            >
              ×
            </button>
          )}
        </div>

        {showRecent && recentSearches.length > 0 && (
          <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
            <div className="flex items-center justify-between px-4 pt-2.5 pb-1">
              <span className="text-[11px] font-medium text-gray-400">最近の検索</span>
              <button
                type="button"
                onClick={clearRecentSearches}
                className="text-[11px] text-gray-400 hover:text-gray-600"
              >
                履歴をクリア
              </button>
            </div>
            {recentSearches.map((q) => (
              <button
                key={q}
                type="button"
                onMouseDown={() => handleSearch(q)}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="text-gray-300">🕐</span>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => handleSearch()}
        disabled={searching || !query.trim()}
        className="mt-2 w-full rounded-full bg-black py-3 text-white disabled:opacity-50"
      >
        {searching ? "検索中…" : mode === "ai" ? "✨ AIで探す" : "🔍 検索"}
      </button>

      {/* 検索対象サイト（すべて絞り込みのチェックボックス） */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
        {PAPER_SOURCES.map((s) => (
          <label key={s.key} className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={enabledSources.has(s.key)}
              onChange={() => toggleSource(s.key)}
            />
            {s.label}
          </label>
        ))}
      </div>

      {translatedQuery && (
        <p className="mt-3 text-xs text-gray-400">
          🌐「{translatedQuery}」でも検索しました
        </p>
      )}

      {searched && (
        <div className="mt-6 space-y-3">
          {searching && (
            <p className="text-sm text-gray-400">検索しています…</p>
          )}

          {!searching && results.length === 0 && (
            <p className="text-sm text-gray-400">
              見つかりませんでした。下のリンクから他のサイトも確認してみてください
            </p>
          )}

          {!searching && results.length > 0 && (
            <div className="flex items-center justify-between">
              {mode === "normal" ? (
                <button
                  onClick={handleTranslateTitles}
                  disabled={translatingTitles}
                  className="rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  {translatingTitles ? "翻訳中…" : "🌐 タイトルを日本語に翻訳"}
                </button>
              ) : (
                <span />
              )}

              {userId && (
                <button
                  onClick={handleOpenSavedList}
                  className="rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                >
                  📑 保存リスト（{savedPapers.length}）
                </button>
              )}
            </div>
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

              {titleTranslations[r.url] && (
                <p className="mt-1 text-sm text-gray-600">
                  {titleTranslations[r.url]}
                </p>
              )}

              <p className="mt-1 text-xs text-gray-500">
                {[r.journal, r.year].filter(Boolean).join(" ・ ")}
              </p>
              {r.authors && (
                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {r.authors}
                </p>
              )}

              {mode === "ai" && (r.aiSummary || r.abstract) && (
                <div className="mt-2 rounded-xl bg-emerald-50 px-3 py-2">
                  {r.aiSummary && (
                    <p className="text-xs font-medium text-emerald-700">
                      ✨ {r.aiSummary}
                    </p>
                  )}
                  {r.abstract && (
                    <p className="mt-1 line-clamp-4 text-xs leading-5 text-gray-600">
                      {r.abstract}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => handleToggleSave(r)}
                className={`mt-2 rounded-full border px-4 py-1.5 text-xs hover:bg-gray-50 ${
                  savedMap[r.url]
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {savedMap[r.url] ? "✓ 保存済み（解除）" : "＋ 保存"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* APIがないサイトは検索語入りのリンクをその場で開けるようにする */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-500">
          他のサイトでも探す（APIがないためリンクで開きます）
        </h2>
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
        <div ref={savedSectionRef} className="mt-8 scroll-mt-4">
          <button
            onClick={handleToggleSaved}
            className="text-sm font-semibold text-gray-500"
          >
            保存した論文（{savedPapers.length}） {savedOpen ? "▲" : "▼"}
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
