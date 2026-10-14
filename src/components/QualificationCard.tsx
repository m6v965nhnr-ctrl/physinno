"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Achievement,
  QualificationTarget,
  computeQualificationProgress,
  setQualificationChecklist,
} from "@/lib/achievements";
import {
  KIND_LABEL,
  MODE_LABEL,
  POINT_GUIDE,
  RequirementStatus,
  evaluateRequirements,
  requirementsFor,
} from "@/lib/qualificationCatalog";
import { notify } from "@/lib/notify";

// 登録・認定・専門理学療法士の目標。協会の条件を並べて、済んだもの・あと何をすればよいかを見せる。
// 条件の一覧は、閉じておける（マイページが長くならないように）。1つずつも、開いて詳しく見られる
export default function QualificationCard({
  target: t,
  achievements,
  onEdit,
  onDelete,
  onChanged,
}: {
  target: QualificationTarget;
  achievements: Achievement[];
  onEdit: () => void;
  onDelete: () => void;
  onChanged: () => void;
}) {
  const [listOpen, setListOpen] = useState(false);
  const [openKey, setOpenKey] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [busyKey, setBusyKey] = useState("");

  if (!t.kind || !t.mode) return null;

  const kind = t.kind;
  const mode = t.mode;
  const ev = evaluateRequirements({ ...t, kind, mode }, achievements);
  const set = requirementsFor(kind, mode, t.field);
  const progress = computeQualificationProgress(t, achievements);
  const left = ev.total - ev.doneCount;
  const next = ev.statuses.find((s) => !s.done);

  const years = Math.floor(progress.monthsRemaining / 12);
  const months = progress.monthsRemaining % 12;

  async function save(key: string, value: boolean | number) {
    setBusyKey(key);
    const error = await setQualificationChecklist(t.id, { ...(t.checklist || {}), [key]: value });
    setBusyKey("");
    if (error) {
      notify(`保存できませんでした: ${error}`);
      return;
    }
    onChanged();
  }

  function row(s: RequirementStatus) {
    const open = openKey === s.req.key;
    const p = s.progress;
    const counted = !!s.req.count;
    const manualCheck = !s.req.auto && !counted;

    return (
      <li key={s.req.key} className="py-2">
        <div className="flex items-start gap-2.5">
          {manualCheck ? (
            <input
              type="checkbox"
              checked={s.done}
              disabled={busyKey === s.req.key}
              onChange={(e) => save(s.req.key, e.target.checked)}
              aria-label={`${s.req.label}を完了にする`}
              className="mt-0.5 h-5 w-5 shrink-0 accent-black"
            />
          ) : (
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[11px] ${
                s.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-gray-300 text-transparent"
              }`}
            >
              ✓
            </span>
          )}

          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setOpenKey(open ? "" : s.req.key)}
              aria-expanded={open}
              className="flex w-full items-start justify-between gap-2 text-left"
            >
              <span className={`text-sm font-medium ${s.done ? "text-gray-400 line-through" : "text-gray-900"}`}>{s.req.label}</span>
              <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs text-gray-500">
                {p && (
                  <span className="font-semibold text-gray-700">
                    {Math.round(p.value * 10) / 10}/{p.need}
                    {p.unit}
                  </span>
                )}
                <span aria-hidden="true" className="text-[10px] text-gray-400">
                  {open ? "▲" : "▼"}
                </span>
              </span>
            </button>

            {p && (
              <div
                className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={p.need}
                aria-valuenow={Math.min(p.value, p.need)}
                aria-label={`${s.req.label}の進み具合`}
              >
                <div
                  className="h-full rounded-full bg-relight-gradient"
                  style={{ width: `${Math.min(100, Math.round((p.value / p.need) * 100))}%` }}
                />
              </div>
            )}

            {open && (
              <div className="mt-2 space-y-2">
                {s.req.detail && <p className="text-xs leading-5 text-gray-500 [text-wrap:wrap] [word-break:normal]">{s.req.detail}</p>}

                {counted && s.req.count && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => save(s.req.key, Math.max(0, (s.progress?.value ?? 0) - 1))}
                      disabled={busyKey === s.req.key || (s.progress?.value ?? 0) <= 0}
                      aria-label={`${s.req.count.unit}を1つ減らす`}
                      className="h-9 w-9 rounded-full border border-gray-300 text-lg leading-none text-gray-700 disabled:opacity-40"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={s.req.count.total}
                      value={s.progress?.value ?? 0}
                      onChange={(e) => {
                        const n = Math.max(0, Math.min(s.req.count!.total, Math.round(Number(e.target.value) || 0)));
                        if (n !== (s.progress?.value ?? 0)) save(s.req.key, n);
                      }}
                      aria-label={`済んだ${s.req.count.unit}の数`}
                      className="h-9 w-16 rounded-xl border border-gray-300 text-center text-sm"
                    />
                    <span className="text-xs text-gray-500">
                      / {s.req.count.total}
                      {s.req.count.unit}
                    </span>
                    <button
                      type="button"
                      onClick={() => save(s.req.key, Math.min(s.req.count!.total, (s.progress?.value ?? 0) + 1))}
                      disabled={busyKey === s.req.key || (s.progress?.value ?? 0) >= s.req.count.total}
                      aria-label={`${s.req.count.unit}を1つ増やす`}
                      className="h-9 w-9 rounded-full border border-gray-300 text-lg leading-none text-gray-700 disabled:opacity-40"
                    >
                      ＋
                    </button>
                  </div>
                )}

                {s.req.auto && (
                  <p className="text-xs leading-5 text-gray-700 [text-wrap:wrap] [word-break:normal]">
                    {!s.done && <span>{s.next}</span>}
                    {s.req.auto.type === "count" && (
                      <span className="mt-0.5 block text-[11px] text-gray-400">{s.req.auto.note}</span>
                    )}
                  </p>
                )}

                {s.req.url && (
                  <a
                    href={s.req.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-relight-blue underline"
                  >
                    協会のページで確認する ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="rounded-2xl border border-relight p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            🏅 {KIND_LABEL[kind]}
            {t.field ? `（${t.field}）` : ""}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">{MODE_LABEL[mode]}</p>
        </div>
        <div className="flex shrink-0 gap-3 text-xs text-gray-400">
          <button onClick={onEdit} className="hover:text-gray-600">
            編集
          </button>
          <button onClick={onDelete} className="hover:text-gray-600">
            削除
          </button>
        </div>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={ev.total}
        aria-valuenow={ev.doneCount}
        aria-label="条件の達成状況"
      >
        <div className="h-full rounded-full bg-relight-gradient" style={{ width: `${Math.round((ev.doneCount / ev.total) * 100)}%` }} />
      </div>

      <p className="mt-2 text-sm text-gray-700">
        <span className="font-semibold text-gray-900">
          {ev.doneCount}/{ev.total}
        </span>
        項目が完了
        {left === 0 ? (
          <span className="ml-2 font-semibold text-emerald-600">🎉 すべてそろいました！</span>
        ) : (
          <span className="ml-2">
            あと<span className="mx-0.5 text-base font-semibold text-gray-900">{left}</span>項目
          </span>
        )}
      </p>

      {next && (
        <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 [text-wrap:wrap] [word-break:normal]">
          <span className="font-semibold">次にやること：</span>
          {next.req.label}
          {next.progress && (
            <span>
              （いま {Math.round(next.progress.value * 10) / 10}／{next.progress.need}
              {next.progress.unit}）
            </span>
          )}
        </p>
      )}

      {mode === "renew" && (
        <p className="mt-2 text-xs text-gray-500">
          {progress.expired
            ? "更新の期限を過ぎています。サイクルの開始日を見直してください"
            : `更新の期限は${progress.deadline.getFullYear()}年${progress.deadline.getMonth() + 1}月まで（あと${
                years > 0 ? `${years}年` : ""
              }${months}ヶ月）`}
        </p>
      )}

      <button
        type="button"
        onClick={() => setListOpen((v) => !v)}
        aria-expanded={listOpen}
        className="mt-3 flex w-full items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800"
      >
        <span>条件の一覧（{ev.total}項目）</span>
        <span aria-hidden="true" className="text-[10px] text-gray-400">
          {listOpen ? "▲ 閉じる" : "▼ 開く"}
        </span>
      </button>

      {listOpen && (
        <div className="mt-1">
          <ul className="divide-y divide-gray-100">{ev.statuses.map(row)}</ul>

          {set.notes.length > 0 && (
            <ul className="mt-2 space-y-1 text-[11px] leading-5 text-gray-500">
              {set.notes.map((n) => (
                <li key={n} className="[text-wrap:wrap] [word-break:normal]">
                  ※ {n}
                </li>
              ))}
            </ul>
          )}

          {set.points !== null && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowGuide((v) => !v)}
                aria-expanded={showGuide}
                className="text-xs text-relight-blue underline"
              >
                {showGuide ? "点数の目安を閉じる" : "点数の目安を見る（何をすると、何点？）"}
              </button>
              {showGuide && (
                <div className="mt-2 rounded-xl bg-gray-50 p-3">
                  <ul className="space-y-1.5 text-xs leading-5 text-gray-700">
                    {POINT_GUIDE.map((g) => (
                      <li key={g.label} className="flex justify-between gap-3">
                        <span className="[text-wrap:wrap] [word-break:normal]">{g.label}</span>
                        <span className="shrink-0 font-semibold text-gray-900">{g.points}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11px] leading-5 text-gray-400 [text-wrap:wrap] [word-break:normal]">
                    認定・専門の更新の点数基準（協会・2026年4月更新）。登録理学療法士の更新ポイントは別の数え方（30分＝0.5ポイントなど）です。
                    記録するとき、「CPD単位・ポイント」に点数を入れると、ここに自動で反映されます。
                  </p>
                </div>
              )}
            </div>
          )}

          <p className="mt-3 text-[11px] leading-5 text-gray-400 [text-wrap:wrap] [word-break:normal]">
            協会の公式ページの内容（2026年10月確認）をもとにした目安です。制度は変わることがあるので、申請の前に、協会の最新の案内を確認してください。
          </p>
        </div>
      )}

      <div className="mt-3">
        <Link
          href="/posts/create?type=training"
          className="inline-block rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
        >
          + 研修・実績を記録する
        </Link>
      </div>
    </div>
  );
}
