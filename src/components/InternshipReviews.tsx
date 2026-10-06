"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import ReportButton from "@/components/ReportButton";
import ReviewRadarChart from "@/components/ReviewRadarChart";
import { AccountType } from "@/lib/account";
import {
  INTERNSHIP_AXES,
  INTERNSHIP_AXIS_LABEL,
  InternshipAxis,
  InternshipReview,
  averageScores,
  deleteInternshipReview,
  listInternshipReviews,
  saveInternshipReview,
} from "@/lib/internship";
import { notify } from "@/lib/notify";
import { PRACTICUM_TYPES, PRACTICUM_TYPE_LABEL, PracticumType } from "@/lib/student";

const defaultScores = (): Record<InternshipAxis, number> => ({
  guidance: 5,
  workload: 5,
  sleep: 5,
  access: 5,
  learning: 5,
  atmosphere: 5,
});

// 病院ページの「実習生の声」。学生が実習先について投稿し、PT・学生が読める(投稿者は表示しない)
export default function InternshipReviews({
  hospitalId,
  accountType,
  loggedIn,
}: {
  hospitalId: string;
  accountType: AccountType | null;
  loggedIn: boolean;
}) {
  const titleId = useId();
  const canRead = accountType === "pt" || accountType === "student";
  const isStudent = accountType === "student";

  const [reviews, setReviews] = useState<InternshipReview[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [type, setType] = useState<PracticumType>("evaluation");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [scores, setScores] = useState(defaultScores());
  const [comment, setComment] = useState("");

  const mine = reviews.find((r) => r.is_mine) ?? null;

  const load = useCallback(async () => {
    if (!canRead) {
      setLoaded(true);
      return;
    }
    setReviews(await listInternshipReviews(hospitalId));
    setLoaded(true);
  }, [canRead, hospitalId]);

  useEffect(() => {
    load();
  }, [load]);

  // トラッカーの「実習生の声を書く」から来たときは、投稿画面を最初から開く
  useEffect(() => {
    if (!loaded || !isStudent) return;
    if (new URLSearchParams(window.location.search).get("internship") === "1") {
      openForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, isStudent]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openForm() {
    if (mine) {
      setType(mine.practicum_type);
      setYear(mine.practicum_year ? String(mine.practicum_year) : "");
      setScores({
        guidance: mine.guidance,
        workload: mine.workload,
        sleep: mine.sleep,
        access: mine.access,
        learning: mine.learning,
        atmosphere: mine.atmosphere,
      });
      setComment(mine.comment ?? "");
    } else {
      setScores(defaultScores());
      setComment("");
    }
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const error = await saveInternshipReview(hospitalId, mine?.id ?? null, {
      practicum_type: type,
      practicum_year: year ? Number(year) : null,
      scores,
      comment,
    });

    setSaving(false);

    if (error) {
      notify("投稿できませんでした。もう一度お試しください");
      return;
    }

    notify(mine ? "更新しました" : "投稿しました。ありがとうございます");
    setOpen(false);
    load();
  }

  async function handleDelete() {
    if (!mine || !confirm("あなたの投稿を削除しますか？")) return;
    await deleteInternshipReview(mine.id);
    setOpen(false);
    load();
  }

  const averages = averageScores(reviews);

  return (
    <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-500">実習生の声（実習先として）</h2>

        {isStudent && (
          <button
            onClick={openForm}
            className="shrink-0 rounded-full bg-relight-gradient px-4 py-2 text-xs font-medium text-white"
          >
            {mine ? "投稿を編集する" : "実習生の声を投稿する"}
          </button>
        )}
      </div>

      {!canRead ? (
        <p className="mt-3 text-sm leading-6 text-gray-500">
          {loggedIn ? (
            "実習生の声は、PTまたは学生のアカウントで見られます。"
          ) : (
            <>
              実習生の声は、PTまたは学生のアカウントでログインすると見られます。{" "}
              <Link href="/register?type=student" className="underline">
                学生として登録する
              </Link>
            </>
          )}
        </p>
      ) : !loaded ? (
        <p className="mt-3 text-sm text-gray-400">読み込み中…</p>
      ) : reviews.length === 0 ? (
        <p className="mt-3 text-sm leading-6 text-gray-400">
          まだ投稿はありません。{isStudent ? "この病院で実習した方は、後輩のために投稿してみませんか？" : ""}
        </p>
      ) : (
        <>
          <div className="mt-4">
            <ReviewRadarChart items={averages} />
            <p className="mt-1 text-center text-xs text-gray-500">{reviews.length}件の平均（10点満点・高いほど良い）</p>
          </div>

          <div className="mt-4 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-white">
                    {PRACTICUM_TYPE_LABEL[r.practicum_type]}
                    {r.practicum_year ? `（${r.practicum_year}年）` : ""}
                  </span>
                  <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">
                    {r.is_mine ? "あなたの投稿" : "匿名"}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                  {INTERNSHIP_AXES.map((axis) => (
                    <span key={axis}>
                      {INTERNSHIP_AXIS_LABEL[axis]} {r[axis]}
                    </span>
                  ))}
                </div>

                {r.comment && (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">{r.comment}</p>
                )}

                {!r.is_mine && (
                  <div className="mt-2 text-right">
                    <ReportButton targetType="internship_review" targetId={r.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {canRead && (
        <p className="mt-4 text-[11px] leading-5 text-gray-400">
          個人の感想です。指導者の個人名や患者さんの情報は書かないルールです。事実と異なる内容や、権利を侵害する内容は、各投稿の「通報」から運営へ連絡できます。病院の関係者の方は{" "}
          <Link href="/contact" className="underline">
            運営へのメッセージ
          </Link>
          から削除・訂正を申し出られます。
        </p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
          >
            <div className="flex items-start justify-between">
              <h3 id={titleId} className="text-base font-semibold text-gray-900">
                実習生の声を投稿する
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="閉じる"
                className="text-xl leading-none text-gray-400"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-gray-500">
                実習の種類
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PracticumType)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                >
                  {PRACTICUM_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {PRACTICUM_TYPE_LABEL[t]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs text-gray-500">
                実習した年
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                />
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-500">1〜10点（高いほど良い）</p>
              {INTERNSHIP_AXES.map((axis) => (
                <label key={axis} className="block text-sm text-gray-800">
                  <span className="flex items-center justify-between">
                    {INTERNSHIP_AXIS_LABEL[axis]}
                    <span className="font-semibold">{scores[axis]}</span>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={scores[axis]}
                    onChange={(e) => setScores({ ...scores, [axis]: Number(e.target.value) })}
                    className="mt-1 w-full"
                  />
                </label>
              ))}
            </div>

            <label className="block text-xs text-gray-500">
              コメント（任意）
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={2000}
                rows={4}
                placeholder="学べたこと、1日の流れ、課題の量、持ち物・服装など"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <p className="rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
              ルール: 指導者など個人の名前は書かない／患者さんの情報（氏名・年齢・日付・病名の組み合わせなど）は書かない／事実にもとづいて書く。投稿者は表示されません（匿名）。
            </p>

            <div className="flex gap-2">
              {mine && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-full border border-red-200 px-4 py-2.5 text-sm text-red-600"
                >
                  削除
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {saving ? "送信中…" : mine ? "更新する" : "投稿する"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
