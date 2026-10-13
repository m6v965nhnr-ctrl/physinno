"use client";

import { useEffect } from "react";
import { FORMAT_LABEL, Seminar, dateRangeJa } from "@/lib/seminars";

export function FormatBadge({ format }: { format: Seminar["format"] }) {
  if (!format) return null;

  // 塗りつぶしの色で、開催形式がひと目で分かるようにする
  const style =
    format === "online"
      ? "bg-blue-600 text-white"
      : format === "offline"
        ? "bg-emerald-600 text-white"
        : "bg-purple-600 text-white";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {FORMAT_LABEL[format]}
    </span>
  );
}

export function SaveButton({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={saved ? "保存を解除" : "保存する"}
      aria-pressed={saved}
      className={`min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition active:scale-95 ${
        saved ? "border-transparent bg-relight-gradient text-white" : "border-sky-200 bg-sky-100 text-sky-800"
      }`}
    >
      {saved ? "🔖 保存済み" : "🔖 保存"}
    </button>
  );
}

export function SeminarList({
  items,
  onSelect,
  savedIds,
  onToggleSaved,
}: {
  items: Seminar[];
  onSelect: (s: Seminar) => void;
  savedIds: string[];
  onToggleSaved: (id: string) => void;
}) {
  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-gray-400">該当する研修・学会はありません</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div
          key={s.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(s)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(s);
            }
          }}
          className="relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-5 pl-6 text-left shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 transition active:scale-[0.99]"
        >
          {/* 左の太い帯: 無料は緑、有料は青緑 */}
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 left-0 w-2 ${s.is_free ? "bg-emerald-500" : "bg-relight-gradient"}`}
          />

          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-bold text-relight-blue">{dateRangeJa(s)}</p>
            <SaveButton saved={savedIds.includes(s.id)} onClick={() => onToggleSaved(s.id)} />
          </div>

          <p className="mt-2 line-clamp-2 text-lg font-bold leading-7 text-gray-900">{s.title}</p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">{s.kind}</span>
            <FormatBadge format={s.format} />
            {s.prefecture && (
              <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
                {s.prefecture}
              </span>
            )}
            {s.is_free ? (
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">無料</span>
            ) : (
              s.fee_yen !== null && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  {s.fee_yen.toLocaleString()}円〜
                </span>
              )
            )}
          </div>

          {s.organizer && <p className="mt-3 text-sm text-gray-600">{s.organizer}</p>}
        </div>
      ))}
    </div>
  );
}

export function SeminarDetail({
  seminar: s,
  saved,
  onToggleSaved,
  onClose,
}: {
  seminar: Seminar;
  saved: boolean;
  onToggleSaved: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={s.title}
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-3xl bg-white p-6 sm:rounded-3xl"
        style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {s.kind}
            </span>
            <FormatBadge format={s.format} />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="-mr-2 -mt-2 px-3 py-2 text-2xl leading-none text-gray-400"
          >
            ×
          </button>
        </div>

        <h2 className="mt-4 text-lg font-semibold leading-7">{s.title}</h2>

        <dl className="mt-5 space-y-3 text-sm">
          <Row label="開催日" value={dateRangeJa(s)} />
          {s.date_text && s.date_text !== dateRangeJa(s) && <Row label="日時" value={s.date_text} />}
          <Row label="主催" value={s.organizer} />
          <Row label="開催地" value={s.prefecture} />
          <Row
            label="参加費"
            value={s.fee_text ?? (s.is_free ? "無料" : s.fee_yen !== null ? `${s.fee_yen.toLocaleString()}円〜` : null)}
          />
          <Row label="分野" value={s.fields.join("・")} />
          <Row label="情報元" value={s.source_label} />
        </dl>

        {s.summary && (
          <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-gray-50 p-4 text-xs leading-6 text-gray-600">
            {s.summary}
          </p>
        )}

        <button
          type="button"
          onClick={onToggleSaved}
          className={`mt-6 block w-full rounded-full border py-3 text-center text-sm font-medium ${
            saved ? "border-black bg-gray-50" : "border-gray-300 bg-white"
          }`}
        >
          {saved ? "🔖 保存済み（タップで解除）" : "🔖 保存する"}
        </button>

        <a
          href={`/posts/create?${new URLSearchParams({
            type: s.kind === "学術大会・学会" ? "conference" : "training",
            title: s.title,
            date: s.start_date.slice(0, 10),
            ...(s.organizer ? { organizer: s.organizer } : {}),
          }).toString()}`}
          className="mt-3 block w-full rounded-full border border-gray-300 bg-white py-3 text-center text-sm font-medium"
        >
          ✅ 参加した（学習履歴に記録する）
        </a>

        <a
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full rounded-full bg-relight-gradient py-3 text-center text-sm font-medium text-white"
        >
          詳細・申込ページを開く ↗
        </a>

        <p className="mt-3 break-all text-center text-xs text-gray-400">{s.url}</p>
      </div>
    </div>
  );
}

export function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;

  return (
    <div className="flex gap-3">
      <dt className="w-16 shrink-0 text-gray-400">{label}</dt>
      <dd className="min-w-0 whitespace-pre-wrap break-words text-gray-800">{value}</dd>
    </div>
  );
}
