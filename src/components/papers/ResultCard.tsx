"use client";

import { useState } from "react";
import { EVIDENCE_LEVELS } from "@/lib/evidence";
import { PAPER_SOURCE_LABEL, PaperResult, translateAbstract } from "@/lib/papers";

export function ResultCard({
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

      {typeof r.citationCount === "number" && (
        <span className="ml-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600" title="他の論文に引用された数">
          引用 {r.citationCount.toLocaleString()}
        </span>
      )}

      {/* 日本語に翻訳できたときは、日本語を見出しにして、原文のタイトルを下に小さく出す */}
      <a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-sm font-semibold text-gray-900 hover:underline"
      >
        {titleTranslation ?? r.title}
      </a>

      {titleTranslation && (
        <p className="mt-0.5 text-xs leading-5 text-gray-500">{r.title}</p>
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
