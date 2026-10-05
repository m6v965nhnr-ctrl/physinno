"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  EXAM_SUBJECTS,
  StudentProfile,
  StudyLog,
  addStudyLog,
  computeCountdown,
  computeStudyStats,
  deleteStudyLog,
  formatMinutes,
  getMyStudentProfile,
  listStudyLogs,
  toDateInput,
} from "@/lib/student";

const CONFIDENCE_LABEL = ["", "まだ不安", "やや不安", "ふつう", "だいたい大丈夫", "自信あり"];

export default function ExamPage() {
  const { loading, userId } = useMyAccount(["student"]);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [logs, setLogs] = useState<StudyLog[]>([]);

  const [subject, setSubject] = useState(EXAM_SUBJECTS[0]);
  const [minutes, setMinutes] = useState("60");
  const [studiedOn, setStudiedOn] = useState(toDateInput(new Date()));
  const [confidence, setConfidence] = useState<number | null>(null);
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    const [p, l] = await Promise.all([getMyStudentProfile(userId), listStudyLogs(userId)]);
    setProfile(p);
    setLogs(l);
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const m = Number(minutes);
    if (!Number.isFinite(m) || m < 1 || m > 1440) {
      notify("勉強した時間（分）は1〜1440で入力してください");
      return;
    }

    setSaving(true);
    const error = await addStudyLog({
      studied_on: studiedOn,
      subject,
      minutes: m,
      confidence,
      memo,
    });
    setSaving(false);

    if (error) {
      notify(`保存できませんでした: ${error}`);
      return;
    }

    setMemo("");
    setConfidence(null);
    notify("記録しました");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("この記録を削除しますか？")) return;
    const error = await deleteStudyLog(id);
    if (error) {
      notify("削除できませんでした");
      return;
    }
    load();
  }

  if (loading || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const countdown = computeCountdown(profile);
  const stats = computeStudyStats(logs);
  const maxMinutes = Math.max(1, ...stats.bySubject.map((s) => s.minutes));
  const examPassed = countdown.examDays < 0;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student" className="text-sm text-gray-400">
            ← 学生ホーム
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">国試カウントダウン・学習ログ</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-5 px-6 py-6">
        <section className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <p className="text-xs text-gray-500">{examPassed ? "国家試験は終了しました" : "国家試験まであと"}</p>
          <p className="mt-1 text-5xl font-bold tracking-tight">
            {examPassed ? 0 : countdown.examDays}
            <span className="ml-1 text-base font-medium text-gray-500">日</span>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {countdown.examDate.getFullYear()}年{countdown.examDate.getMonth() + 1}月{countdown.examDate.getDate()}日
            {countdown.examIsEstimate ? "ごろ（例年の目安。" : "（"}
            <Link href="/student/settings" className="underline">
              {countdown.examIsEstimate ? "日程を入力" : "変更する"}
            </Link>
            ）
          </p>
        </section>

        <section className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold">{formatMinutes(stats.weekMinutes)}</p>
            <p className="mt-0.5 text-[11px] text-gray-500">今週（7日間）</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold">{stats.streakDays}日</p>
            <p className="mt-0.5 text-[11px] text-gray-500">連続で記録</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold">{formatMinutes(stats.totalMinutes)}</p>
            <p className="mt-0.5 text-[11px] text-gray-500">これまでの合計</p>
          </div>
        </section>

        <form onSubmit={handleAdd} className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">今日の勉強を記録する</h2>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-gray-500">
              科目
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              >
                {EXAM_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs text-gray-500">
              時間（分）
              <input
                type="number"
                min={1}
                max={1440}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>
          </div>

          <label className="block text-xs text-gray-500">
            日付
            <input
              type="date"
              value={studiedOn}
              max={toDateInput(new Date())}
              onChange={(e) => setStudiedOn(e.target.value)}
              className="mt-1 block w-full min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
            />
          </label>

          <fieldset>
            <legend className="text-xs text-gray-500">理解度（任意。低い科目は「復習したい科目」に出ます）</legend>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={confidence === n}
                  onClick={() => setConfidence(confidence === n ? null : n)}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    confidence === n ? "border-black bg-black text-white" : "border-gray-200 text-gray-600"
                  }`}
                >
                  {n} {CONFIDENCE_LABEL[n]}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block text-xs text-gray-500">
            メモ（任意）
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={500}
              placeholder="例: 筋の起始停止、脳血管の支配領域"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "保存中…" : "記録する"}
          </button>
        </form>

        {stats.weakSubjects.length > 0 && (
          <section className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">復習したい科目</p>
            <p className="mt-1">{stats.weakSubjects.join("・")}</p>
            <p className="mt-1 text-xs text-amber-800">理解度の自己評価が低めの科目です。</p>
          </section>
        )}

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">科目ごとの勉強時間</h2>
          {stats.bySubject.length === 0 ? (
            <p className="mt-3 text-sm text-gray-400">まだ記録がありません。</p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {stats.bySubject.map((s) => (
                <li key={s.subject}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">{s.subject}</span>
                    <span className="text-gray-500">
                      {formatMinutes(s.minutes)}
                      {s.avgConfidence !== null ? `・理解度 ${s.avgConfidence.toFixed(1)}` : ""}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-relight-gradient"
                      style={{ width: `${Math.max(3, Math.round((s.minutes / maxMinutes) * 100))}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">最近の記録</h2>
          {logs.length === 0 ? (
            <p className="mt-3 text-sm text-gray-400">記録するとここに表示されます。</p>
          ) : (
            <ul className="mt-3 divide-y divide-gray-100">
              {logs.slice(0, 15).map((l) => (
                <li key={l.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="text-gray-900">
                      {l.subject}
                      <span className="ml-2 text-xs text-gray-500">{formatMinutes(l.minutes)}</span>
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {l.studied_on}
                      {l.confidence ? `・理解度 ${l.confidence}` : ""}
                      {l.memo ? `・${l.memo}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(l.id)}
                    aria-label="この記録を削除"
                    className="shrink-0 text-gray-300 hover:text-gray-500"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
