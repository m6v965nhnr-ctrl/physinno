"use client";

import { PAPER_LINK_SOURCES } from "@/lib/papers";

// 検索した後に結果の上へ出す、APIのないサイトへのリンク（名前だけのボタン）
export function OtherSiteButtons({ query }: { query: string }) {
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

// 検索結果の操作ボタン。翻訳・要約・保存リスト（保存している数）を、1列に並べる
export function ResultToolbar({
  onTranslate,
  autoTranslate,
  translating,
  showSummaries,
  onToggleSummaries,
  savedCount,
  onOpenSaved,
}: {
  onTranslate: () => void;
  autoTranslate: boolean;
  translating: boolean;
  showSummaries?: boolean;
  onToggleSummaries?: () => void;
  savedCount: number | null;
  onOpenSaved: () => void;
}) {
  const base =
    "flex items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2 py-2 text-xs hover:bg-gray-50";

  return (
    <div className="flex gap-2">
      {/* 日本語タイトルの自動翻訳のオン・オフ */}
      <button
        onClick={onTranslate}
        aria-pressed={autoTranslate}
        className={`${base} flex-1 ${
          autoTranslate ? "border-sky-200 bg-sky-50 text-sky-800" : "border-gray-200 text-gray-600"
        }`}
      >
        {translating ? "翻訳中…" : autoTranslate ? "🌐 日本語タイトル ON" : "🌐 日本語タイトル OFF"}
      </button>

      {onToggleSummaries && (
        <button
          onClick={onToggleSummaries}
          aria-pressed={showSummaries}
          className={`${base} flex-1 ${
            showSummaries ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"
          }`}
        >
          {showSummaries ? "📄 要約を閉じる" : "📄 要約表示"}
        </button>
      )}

      {savedCount !== null && (
        <button onClick={onOpenSaved} className={`${base} flex-1 border-gray-200 text-gray-600`}>
          📑 保存リスト
          <span className="rounded-full bg-gray-900 px-1.5 text-[10px] font-semibold text-white">{savedCount}</span>
        </button>
      )}
    </div>
  );
}
