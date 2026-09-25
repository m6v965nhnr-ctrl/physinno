"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  QualificationTarget,
  addQualificationTarget,
  computeQualificationProgress,
  deleteAchievement,
  deleteQualificationTarget,
  listMyAchievements,
  listQualificationTargets,
} from "@/lib/achievements";
import { notify } from "@/lib/notify";

export default function AchievementsPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);

  // 資格目標フォーム
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [targetName, setTargetName] = useState("");
  const [requiredTotal, setRequiredTotal] = useState("20");
  const [renewalYears, setRenewalYears] = useState("5");
  const [savingTarget, setSavingTarget] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setUserId(user.id);
    setAchievements(await listMyAchievements(user.id));
    setTargets(await listQualificationTargets(user.id));
    setLoading(false);
  }

  async function handleDeleteAchievement(id: string) {
    if (!confirm("この実績投稿を削除しますか？")) return;
    await deleteAchievement(id);
    load();
  }

  async function handleAddTarget(e: React.FormEvent) {
    e.preventDefault();

    if (!targetName.trim()) return;

    setSavingTarget(true);

    const error = await addQualificationTarget({
      userId,
      name: targetName,
      requiredTotal: Number(requiredTotal) || 1,
      renewalYears: Number(renewalYears) || 5,
    });

    setSavingTarget(false);

    if (error) {
      notify(error);
      return;
    }

    setTargetName("");
    setShowTargetForm(false);
    load();
  }

  async function handleDeleteTarget(id: string) {
    if (!confirm("この目標を削除しますか？")) return;
    await deleteQualificationTarget(id);
    load();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </main>
    );
  }

  const categoryCounts = ACHIEVEMENT_CATEGORIES.map((c) => ({
    category: c,
    count: achievements.filter((a) => a.category === c).length,
  }));

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/mypage" className="text-sm text-gray-400">
          ← マイページ
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            実績・資格更新
          </h1>

          <Link
            href="/posts/create"
            className="rounded-full bg-relight-gradient px-4 py-2 text-sm font-medium text-white"
          >
            + 実績を投稿
          </Link>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          「投稿」から学会発表や院内症例発表などを投稿すると、ここに集計され資格更新までの進捗が自動で計算されます。
        </p>

        {/* =========================
            資格更新の目標
        ========================= */}
        <section className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">資格更新の目標</h2>

            <button
              onClick={() => setShowTargetForm((v) => !v)}
              className="text-sm text-relight-blue"
            >
              {showTargetForm ? "閉じる" : "+ 目標を追加"}
            </button>
          </div>

          {showTargetForm && (
            <form
              onSubmit={handleAddTarget}
              className="mt-4 space-y-3 rounded-2xl border border-gray-100 p-4"
            >
              <input
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                placeholder="資格名（例: 認定理学療法士）"
                className="w-full rounded-xl border px-4 py-2.5 text-sm"
                required
               aria-label="資格名（例: 認定理学療法士）"/>

              <div className="flex gap-3">
                <label className="flex-1 text-xs text-gray-500">
                  必要件数
                  <input
                    type="number"
                    min={1}
                    value={requiredTotal}
                    onChange={(e) => setRequiredTotal(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
                  />
                </label>

                <label className="flex-1 text-xs text-gray-500">
                  更新サイクル（年）
                  <input
                    type="number"
                    min={1}
                    value={renewalYears}
                    onChange={(e) => setRenewalYears(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={savingTarget}
                className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {savingTarget ? "保存中..." : "追加する"}
              </button>
            </form>
          )}

          <div className="mt-4 space-y-2">
            {targets.length === 0 ? (
              <p className="text-sm text-gray-400">
                まだ目標が設定されていません。
              </p>
            ) : (
              targets.map((t) => {
                const progress = computeQualificationProgress(
                  t,
                  achievements
                );

                const years = Math.floor(progress.monthsRemaining / 12);
                const months = progress.monthsRemaining % 12;

                return (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-full border border-relight px-4 py-2 text-xs text-gray-600"
                  >
                    <span>
                      🏅 {t.name}
                      <span className="font-semibold text-gray-900">
                        {progress.count}/{t.required_total}
                      </span>
                      　更新まであと{years}年{months}ヶ月
                    </span>

                    <button
                      onClick={() => handleDeleteTarget(t.id)}
                      className="ml-2 shrink-0 text-gray-300 hover:text-gray-500"
                    >
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* =========================
            カテゴリ別の積み上げ
        ========================= */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold">これまでの実績</h2>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {categoryCounts.map(({ category: c, count }) => (
              <div
                key={c}
                className="rounded-2xl border border-gray-100 py-4 text-center"
              >
                <p className="text-xl font-semibold">{count}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {ACHIEVEMENT_CATEGORY_LABEL[c]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            {achievements.length === 0 ? (
              <p className="text-sm text-gray-400">
                まだ実績がありません。「実績を投稿」から登録できます。
              </p>
            ) : (
              achievements.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start justify-between rounded-2xl border border-gray-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {ACHIEVEMENT_CATEGORY_LABEL[a.category]}
                      {a.conference_name ? `・${a.conference_name}` : ""}
                      {a.title ? `・${a.title}` : ""}
                      {!a.is_public && (
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                          非公開
                        </span>
                      )}
                    </p>

                    {a.memo && (
                      <p className="mt-1 text-xs text-gray-500 whitespace-pre-wrap">
                        {a.memo}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-gray-400">
                      {a.achieved_on}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteAchievement(a.id)}
                    className="shrink-0 text-gray-300 hover:text-gray-500"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
