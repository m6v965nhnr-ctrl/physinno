"use client";

import { EVIDENCE_LEVELS, EvidenceLevel } from "@/lib/evidence";
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
  aiAnswer,
  aiRewriteQuery,
  deleteSavedPaper,
  listSavedPapers,
  savePaper,
  searchPapers,
  translateAbstract,
  translateTitles,
} from "@/lib/papers";

const RECENT_SEARCHES_KEY = "relight:paper-search:recent";
const RECENT_SEARCHES_MAX = 6;

type AiTurn = {
  query: string;
  results: PaperResult[];
  translatedQuery: string | null;
  // 論文を根拠にしたAIの回答。AIが使えない場合はnull
  answer: string | null;
  // resultsの先頭から何件が回答の根拠（[1]〜[n]の引用番号）か
  citedCount: number;
};

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

function ResultCard({
  r,
  mode,
  showSummary,
  titleTranslation,
  isSaved,
  onToggleSave,
  refNumber,
}: {
  r: PaperResult;
  mode: "normal" | "ai";
  showSummary: boolean;
  titleTranslation?: string;
  isSaved: boolean;
  onToggleSave: () => void;
  refNumber?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  // 要約の日本語訳（翻訳ボタンを押したときに取得）
  const [abstractJa, setAbstractJa] = useState<string | null>(null);
  const [showJa, setShowJa] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [translateNote, setTranslateNote] = useState<string | null>(null);
  const summaryVisible = mode === "ai" || showSummary;
  const abstractIsJapanese = /[぀-ヿ㐀-鿿]/.test(r.abstract ?? "");

  async function handleTranslate() {
    if (!r.abstract || translating) return;

    if (abstractJa) {
      setShowJa((v) => !v);
      return;
    }

    setTranslating(true);
    setTranslateNote(null);
    const res = await translateAbstract(r.abstract);
    setTranslating(false);

    if (!res.translation) {
      setTranslateNote(
        res.reason === "unauthorized"
          ? "翻訳はログインが必要です"
          : "翻訳できませんでした。時間をおいてお試しください"
      );
      return;
    }

    setAbstractJa(res.translation);
    setShowJa(true);
    if (res.partial) setTranslateNote("一部だけ翻訳できました。残りは原文でご確認ください");
  }
  const abstractIsLong = (r.abstract?.length ?? 0) > 280;

  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      {refNumber !== undefined && (
        <span className="mr-1.5 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
          [{refNumber}]
        </span>
      )}
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
        {PAPER_SOURCE_LABEL[r.source]}
      </span>
      {r.evidenceLevel && (
        <span
          className={`ml-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            r.evidenceBasis === "text"
              ? "border border-dashed border-sky-300 bg-white text-sky-700"
              : "bg-sky-100 text-sky-800"
          }`}
          title={`${EVIDENCE_LEVELS.find((l) => l.key === r.evidenceLevel)?.label ?? ""}${
            r.evidenceBasis === "text"
              ? "（題名・要約の文面からの推定です。原文で確認してください）"
              : "（出版タイプなどから判定）"
          }`}
        >
          レベル{r.evidenceLevel}・{EVIDENCE_LEVELS.find((l) => l.key === r.evidenceLevel)?.short}
          {r.evidenceBasis === "text" && "（推定）"}
        </span>
      )}

      <a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-sm font-semibold text-gray-900 hover:underline"
      >
        {r.title}
      </a>

      {titleTranslation && (
        <p className="mt-1 text-sm text-gray-600">{titleTranslation}</p>
      )}

      <p className="mt-1 text-xs text-gray-500">
        {[r.journal, r.year].filter(Boolean).join(" ・ ")}
      </p>
      {r.authors && (
        <p className="mt-0.5 truncate text-xs text-gray-400">{r.authors}</p>
      )}

      {summaryVisible && (r.aiSummary || r.abstract) && (
        <div className="mt-2 rounded-xl bg-emerald-50 px-3 py-2">
          {r.aiSummary && (
            <p className="text-xs font-medium text-emerald-700">✨ {r.aiSummary}</p>
          )}
          {r.abstract && (
            <>
              <p
                className={`mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700 ${
                  expanded ? "" : "line-clamp-4"
                }`}
              >
                {abstractJa && showJa ? abstractJa : r.abstract}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                {(abstractIsLong || (abstractJa && showJa)) && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="text-xs text-emerald-700 underline"
                  >
                    {expanded ? "閉じる" : "続きを読む"}
                  </button>
                )}
                {!abstractIsJapanese && (
                  <button
                    type="button"
                    onClick={handleTranslate}
                    disabled={translating}
                    className="rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-medium text-emerald-700 disabled:opacity-50"
                  >
                    {translating
                      ? "翻訳中…"
                      : abstractJa
                        ? showJa
                          ? "原文（英語）に戻す"
                          : "🌐 日本語を表示"
                        : "🌐 日本語に翻訳"}
                  </button>
                )}
              </div>
              {abstractJa && showJa && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  機械翻訳です。数値や結論は、原文でも確認してください。
                </p>
              )}
              {translateNote && <p className="mt-1 text-xs text-red-600">{translateNote}</p>}
            </>
          )}
        </div>
      )}

      {summaryVisible && !r.aiSummary && !r.abstract && (
        <p className="mt-2 text-xs text-gray-400">
          この検索サイトからは要約を取得できませんでした。リンク先で確認できます。
        </p>
      )}

      <button
        onClick={onToggleSave}
        className={`mt-2 rounded-full border px-4 py-1.5 text-xs ${
          isSaved
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-sky-200 bg-sky-100 text-sky-800 hover:bg-sky-200"
        }`}
      >
        {isSaved ? "✓ 保存済み（解除）" : "＋ 保存"}
      </button>
    </div>
  );
}

// PTがいつも論文を探すときに何サイトも回っている手間を減らすための横断検索。
// PubMed・J-STAGE・CiNii Research・PEDro・Semantic Scholar・Europe PMC・
// OpenAlex・ClinicalTrials.gov・DOAJを1つの結果一覧にまとめて表示する。
// サイトはあくまで絞り込みのチェックボックス（すべてデフォルトon）。
// Physiopedia・Cochrane Library・Google Scholar・医中誌Webは公開APIが
// ない（Cloudflareのボット対策／規約違反のリスク／購読・ログイン必須）
// ため、検索語入りのリンクを一発で開けるだけにとどめる。
//
// ノーマルモード：キーワードでの横断検索（従来通り、1回ごとに結果を置き換え）
// AIモード：聞きたいことを文章で入力すると、アブストラクト（一部ソースは
// AI一文要約つき）を結果の下に表示する。質問を重ねるたびに会話のように
// 履歴が積み上がっていく。Consensusのような「全論文を1つの結論に合成する」
// 機能ではなく、まずは要約つきで関連論文を探しやすくする第一段階という位置づけ。
export default function PaperSearch() {
  const [userId, setUserId] = useState<string | null>(null);
  const [view, setView] = useState<"search" | "saved">("search");
  const [mode, setMode] = useState<"normal" | "ai">("normal");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // ノーマルモード：1回ごとに結果を置き換える
  const [results, setResults] = useState<PaperResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [translatedQuery, setTranslatedQuery] = useState<string | null>(null);
  // ノーマルモードで各論文の要約（アブストラクト）を表示するか
  const [showSummaries, setShowSummaries] = useState(false);

  // AIモード：質問を重ねるたびに会話のように積み上がっていく
  const [aiTurns, setAiTurns] = useState<AiTurn[]>([]);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // 保存済み論文のurl→saved_papers.id。保存/保存解除の両方をこのマップで判定する
  const [savedMap, setSavedMap] = useState<Record<string, string>>({});
  const [titleTranslations, setTitleTranslations] = useState<Record<string, string>>({});
  const [translatingTitles, setTranslatingTitles] = useState(false);

  // エビデンスレベルの絞り込み（空 = 絞り込まない）
  const [levels, setLevels] = useState<Set<EvidenceLevel>>(new Set());
  const [showLevels, setShowLevels] = useState(false);
  // 出版タイプなどで確実に判定できた論文だけにする（文面からの推定を除く）
  const [strictLevels, setStrictLevels] = useState(false);

  const [enabledSources, setEnabledSources] = useState<Set<PaperSource>>(
    new Set(PAPER_SOURCES.map((s) => s.key))
  );

  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);
  const [savedLoading, setSavedLoading] = useState(false);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      if (user) loadSaved(user.id);
    });
    setRecentSearches(loadRecentSearches());

    // 実習レポート支援などから「?q=」つきで開かれたときは、そのまま検索する
    const initialQuery = new URLSearchParams(window.location.search).get("q")?.trim().slice(0, 200);
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
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

    setShowRecent(false);
    setSearching(true);
    saveRecentSearch(q);
    setRecentSearches(loadRecentSearches());

    if (mode === "ai") {
      await handleAiTurn(q);
      setSearching(false);
      return;
    }

    const { results: newResults, error, translatedQuery: newTranslatedQuery } =
      await searchPapers(q, [...enabledSources], [...levels], strictLevels);

    setSearching(false);
    setQuery(q);
    setResults(newResults);
    setTranslatedQuery(newTranslatedQuery);
    setSearched(true);

    if (error) notify(error);
  }

  // AIモード1ターン分: 質問の意図 → 検索クエリ → 論文検索 → 論文を根拠にした回答。
  // AI側が使えない場合（キー未設定・未ログイン・失敗）は、従来どおり検索結果だけを返す
  async function handleAiTurn(q: string) {
    const history = aiTurns.map((t) => ({ question: t.query, answer: t.answer }));

    const rewrite = await aiRewriteQuery(q, history);
    const { results: found, error, translatedQuery: foundTranslated } =
      await searchPapers(rewrite.query ?? q, [...enabledSources], [...levels], strictLevels);

    let answer: string | null = null;
    let ordered = found;
    let citedCount = 0;
    let reason = rewrite.reason;

    if (!rewrite.reason) {
      // 要約（アブストラクト）がある論文だけを根拠にする。番号は表示順と一致させる
      const grounded = found.filter((r) => r.abstract).slice(0, 8);

      if (grounded.length > 0) {
        const result = await aiAnswer(q, history, grounded);
        reason = result.reason;
        if (result.answer) {
          answer = result.answer;
          citedCount = grounded.length;
          ordered = [...grounded, ...found.filter((r) => !grounded.includes(r))];
        }
      }
    }

    setAiNotice(
      reason === "not_configured"
        ? "AIの会話回答は現在準備中です。検索結果のみ表示しています。"
        : reason === "unauthorized"
          ? "AIの会話回答はログインすると利用できます。検索結果のみ表示しています。"
          : reason === "failed"
            ? "AI回答の生成に失敗したため、検索結果のみ表示しています。"
            : null
    );

    setAiTurns((prev) => [
      ...prev,
      {
        query: q,
        results: ordered,
        translatedQuery: foundTranslated,
        answer,
        citedCount,
      },
    ]);
    setQuery("");
    setTimeout(() => {
      conversationEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);

    if (error) notify(error);
  }

  async function handleTranslateTitles(targetResults: PaperResult[]) {
    const targets = targetResults.filter((r) => !titleTranslations[r.url]);
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


  // 保存リストは検索画面とは別の専用画面として表示する
  if (view === "saved") {
    return (
      <div>
        <button
          onClick={() => setView("search")}
          className="text-sm text-gray-400 hover:text-gray-700"
        >
          ← 検索に戻る
        </button>

        <h2 className="mt-3 text-xl font-semibold text-gray-900">
          保存した論文（{savedPapers.length}）
        </h2>

        <div className="mt-4 space-y-2">
          {savedLoading && <p className="text-sm text-gray-400">読み込み中…</p>}

          {!savedLoading && savedPapers.length === 0 && (
            <p className="text-sm text-gray-400">まだ保存した論文はありません</p>
          )}

          {savedPapers.map((p) => (
            <div
              key={p.id}
              className="flex items-start justify-between gap-2 rounded-2xl border border-gray-100 p-4"
            >
              <div className="min-w-0">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
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
      </div>
    );
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
        <>
          <p className="mb-1 text-[11px] leading-snug text-gray-500">
            聞きたいことを文章で入力すると、AIが意図を汲み取って論文を探し、見つかった論文の要約を根拠に回答します。続けて質問すると、会話の流れを踏まえて答えます（AI回答はログインが必要です）。
          </p>
          <p className="mb-2 text-[10px] leading-snug text-gray-400">
            ※ 質問は外部のAI事業者（Google）に送信されます。氏名や患者さんなど、個人を特定できる情報は入力しないでください。
            <a href="/privacy" className="ml-1 underline">詳細</a>
          </p>
          {aiNotice && (
            <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
              {aiNotice}
            </p>
          )}
        </>
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
            className="w-full rounded-full border-none bg-gray-100 py-2.5 pl-11 pr-10 text-sm text-gray-900 outline-none ring-0 focus:bg-white focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
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
              <span className="text-xs font-medium text-gray-400">最近の検索</span>
              <button
                type="button"
                onClick={clearRecentSearches}
                className="text-xs text-gray-400 hover:text-gray-600"
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
        className="mt-2 w-full rounded-full bg-black py-2.5 text-white disabled:opacity-50"
      >
        {searching
          ? "検索中…"
          : mode === "ai"
            ? aiTurns.length > 0
              ? "✨ 続けて質問する"
              : "✨ AIで探す"
            : "🔍 検索"}
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

      {/* エビデンスレベルで絞り込む（Minds 2007 の分類） */}
      <div className="mt-3 rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setShowLevels((v) => !v)}
            aria-expanded={showLevels}
            className="flex items-center gap-1.5 text-left text-xs font-semibold text-sky-900"
          >
            <span className="text-[10px] text-sky-700">{showLevels ? "▼" : "▶"}</span>
            エビデンスレベルで絞る
            {levels.size > 0 && (
              <span className="rounded-full bg-sky-600 px-1.5 py-px text-[10px] font-semibold text-white">
                {[...levels].join("・")}
              </span>
            )}
          </button>
          {levels.size > 0 && (
            <button type="button" onClick={() => setLevels(new Set())} className="text-[11px] text-sky-700 underline">
              解除
            </button>
          )}
        </div>

        {showLevels && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1.5">
              {EVIDENCE_LEVELS.map((l) => {
                const on = levels.has(l.key);
                return (
                  <button
                    key={l.key}
                    type="button"
                    aria-pressed={on}
                    title={l.label}
                    onClick={() =>
                      setLevels((prev) => {
                        const next = new Set(prev);
                        if (next.has(l.key)) next.delete(l.key);
                        else next.add(l.key);
                        return next;
                      })
                    }
                    className={`rounded-full border px-2.5 py-1 text-[11px] leading-none transition ${
                      on
                        ? "border-sky-600 bg-sky-600 text-white"
                        : "border-sky-200 bg-white text-sky-900 hover:bg-sky-50"
                    }`}
                  >
                    <span className="font-semibold">{l.key}</span>
                    <span className={`ml-1 ${on ? "text-sky-50" : "text-gray-500"}`}>{l.short}</span>
                  </button>
                );
              })}
            </div>

            <label className="mt-2 flex cursor-pointer items-center gap-1.5 text-[11px] text-gray-700">
              <input
                type="checkbox"
                checked={strictLevels}
                onChange={(e) => setStrictLevels(e.target.checked)}
                className="h-3 w-3"
              />
              確実に判定できたものだけ（出版タイプで分類。文面からの推定は除く）
            </label>

            <p className="mt-1.5 text-[10px] leading-4 text-gray-500">
              複数選べます（どれかに当てはまる論文が出ます）。ボタンに触れると詳しい説明が出ます。
              「推定」の印は、題名・要約の文面からの判定です。レベルは目安なので、原文で確認してください。
            </p>
          </div>
        )}
      </div>

      {/* ノーマルモード：1回ごとに結果を置き換える */}
      {mode === "normal" && (
        <>
          {translatedQuery && (
            <p className="mt-3 text-xs text-gray-400">
              🌐「{translatedQuery}」でも検索しました
            </p>
          )}

          {searched && (
            <div className="mt-6 space-y-3">
              {searching && <p className="text-sm text-gray-400">検索しています…</p>}

              {!searching && results.length === 0 && (
                <p className="text-sm text-gray-400">
                  見つかりませんでした。上のボタンから他のサイトも確認してみてください
                </p>
              )}

              {!searching && (
                <>
                  <OtherSiteButtons query={query} />
                  {results.length > 0 && (
                    <ResultToolbar
                      onTranslate={() => handleTranslateTitles(results)}
                      translating={translatingTitles}
                      showSummaries={showSummaries}
                      onToggleSummaries={() => setShowSummaries((v) => !v)}
                      savedCount={userId ? savedPapers.length : null}
                      onOpenSaved={() => setView("saved")}
                    />
                  )}
                </>
              )}

              {results.map((r, i) => (
                <ResultCard
                  key={`${r.source}-${i}`}
                  r={r}
                  showSummary={showSummaries}
                  mode={mode}
                  titleTranslation={titleTranslations[r.url]}
                  isSaved={Boolean(savedMap[r.url])}
                  onToggleSave={() => handleToggleSave(r)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* AIモード：質問を重ねるたびに会話のように積み上がる */}
      {mode === "ai" && aiTurns.length > 0 && (
        <div className="mt-6 space-y-3">
          <OtherSiteButtons query={query} />
          <ResultToolbar
            onTranslate={() => handleTranslateTitles(aiTurns.flatMap((t) => t.results))}
            translating={translatingTitles}
            savedCount={userId ? savedPapers.length : null}
            onOpenSaved={() => setView("saved")}
          />

          <div className="mt-4 space-y-6">
            {aiTurns.map((turn, ti) => (
              <div key={ti}>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-gray-900 px-4 py-2.5 text-sm text-white">
                  {turn.query}
                </div>
                {turn.translatedQuery && (
                  <p className="mt-1 text-right text-xs text-gray-400">
                    🌐「{turn.translatedQuery}」でも検索しました
                  </p>
                )}

                {turn.answer && (
                  <div className="mt-3 mr-auto max-w-[95%] rounded-2xl rounded-bl-sm bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-semibold text-emerald-700">✨ AIの回答</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">
                      {turn.answer}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      取得できた論文の要約のみを根拠にしています。臨床判断は必ず原典と患者さんの状態に基づいて行ってください。
                    </p>
                  </div>
                )}

                <div className="mt-3 space-y-3">
                  {turn.answer && (
                    <p className="text-xs font-semibold text-gray-500">
                      参考にした論文（[1]〜[{turn.citedCount}]）と、その他の検索結果
                    </p>
                  )}

                  {turn.results.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      見つかりませんでした。上のボタンから他のサイトも確認してみてください
                    </p>
                  ) : (
                    turn.results.map((r, i) => (
                      <ResultCard
                        key={`${ti}-${r.source}-${i}`}
                        r={r}
                        showSummary
                        mode={mode}
                        titleTranslation={titleTranslations[r.url]}
                        isSaved={Boolean(savedMap[r.url])}
                        onToggleSave={() => handleToggleSave(r)}
                        refNumber={i < turn.citedCount ? i + 1 : undefined}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}

            {searching && (
              <p className="text-sm text-gray-400">検索しています…</p>
            )}
          </div>

          <div ref={conversationEndRef} />

          <button
            onClick={() => {
              setAiTurns([]);
              setAiNotice(null);
            }}
            className="mt-4 text-xs text-gray-400 underline hover:text-gray-600"
          >
            新しい会話を始める
          </button>
        </div>
      )}

      {/* APIがないサイトは検索語入りのリンクをその場で開けるようにする（検索した後は、結果の上に名前だけのボタンで出す） */}
      {!((mode === "normal" && searched) || (mode === "ai" && aiTurns.length > 0)) && (
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
              <p className="mt-0.5 text-xs text-gray-400">{s.note}</p>
            </a>
          ))}
        </div>
      </div>
      )}

      {userId && (
        <button
          onClick={() => setView("saved")}
          className="mt-8 text-sm font-semibold text-gray-500 hover:text-gray-700"
        >
          📑 保存した論文（{savedPapers.length}）を見る
        </button>
      )}
    </div>
  );
}

// 検索した後に結果の上へ出す、APIのないサイトへのリンク（名前だけのボタン）
function OtherSiteButtons({ query }: { query: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PAPER_LINK_SOURCES.map((s) => (
        <a
          key={s.key}
          href={s.build(query.trim())}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
        >
          {s.label} ↗
        </a>
      ))}
    </div>
  );
}

// 検索結果の操作ボタン。1行目：翻訳・要約、2行目：保存リスト（保存している数）
function ResultToolbar({
  onTranslate,
  translating,
  showSummaries,
  onToggleSummaries,
  savedCount,
  onOpenSaved,
}: {
  onTranslate: () => void;
  translating: boolean;
  showSummaries?: boolean;
  onToggleSummaries?: () => void;
  savedCount: number | null;
  onOpenSaved: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onTranslate}
          disabled={translating}
          className="rounded-full border border-gray-200 px-4 py-1.5 text-left text-xs leading-snug text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          {translating ? (
            "翻訳中…"
          ) : (
            <>
              🌐 タイトルを
              <br />
              日本語に翻訳
            </>
          )}
        </button>

        {onToggleSummaries && (
          <button
            onClick={onToggleSummaries}
            aria-pressed={showSummaries}
            className={`rounded-full border px-4 py-1.5 text-xs hover:bg-gray-50 ${
              showSummaries
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-gray-200 text-gray-600"
            }`}
          >
            {showSummaries ? "📄 要約を閉じる" : "📄 要約を表示"}
          </button>
        )}
      </div>

      {savedCount !== null && (
        <button
          onClick={onOpenSaved}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
        >
          📑 保存リスト
          <span className="rounded-full bg-gray-900 px-1.5 text-[10px] font-semibold text-white">
            {savedCount}
          </span>
        </button>
      )}
    </div>
  );
}
