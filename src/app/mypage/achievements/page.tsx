"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORIES_WITH_DETAILS,
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  AchievementCategory,
  QualificationTarget,
  addAchievement,
  addQualificationTarget,
  computeQualificationProgress,
  deleteAchievement,
  deleteQualificationTarget,
  listAchievements,
  listQualificationTargets,
} from "@/lib/achievements";

export default function AchievementsPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);

  // 実績登録フォーム
  const [category, setCategory] = useState<AchievementCategory>("conference");
  const [title, setTitle] = useState("");
  const [conferenceName, setConferenceName] = useState("");
  const [summary, setSummary] = useState("");
  const [achievedOn, setAchievedOn] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [saving, setSaving] = useState(false);

  const showDetails = ACHIEVEMENT_CATEGORIES_WITH_DETAILS.includes(category);

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
    setAchievements(await listAchievements(user.id));
    setTargets(await listQualificationTargets(user.id));
    setLoading(false);
  }

  async function handleAddAchievement(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const error = await addAchievement({
      userId,
      category,
      title,
      conferenceName: showDetails ? conferenceName : undefined,
      memo: showDetails ? summary : undefined,
      achievedOn,
    });

    setSaving(false);

    if (error) {
      alert(error);
      return;
    }

    setTitle("");
    setConferenceName("");
    setSummary("");
    load();
  }

  async function handleDeleteAchievement(id: string) {
    if (!confirm("この実績を削除しますか？")) return;
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
      alert(error);
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

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          実績・資格更新
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          学会発表や院内症例発表などを登録すると、資格更新までの進捗が自動で計算されます。
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
              />

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
            実績登録
        ========================= */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold">実績を登録</h2>

          <form onSubmit={handleAddAchievement} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {ACHIEVEMENT_CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    category === c
                      ? "border-relight bg-relight-gradient text-white"
                      : "border-gray-200"
                  }`}
                >
                  {ACHIEVEMENT_CATEGORY_LABEL[c]}
                </button>
              ))}
            </div>

            {showDetails && category === "conference" && (
              <input
                value={conferenceName}
                onChange={(e) => setConferenceName(e.target.value)}
                placeholder="学会名（例: 日本理学療法学術大会）"
                className="w-full rounded-xl border px-4 py-2.5 text-sm"
              />
            )}

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                showDetails
                  ? "発表題名"
                  : "タイトル（任意・例: 日本理学療法学術大会）"
              }
              className="w-full rounded-xl border px-4 py-2.5 text-sm"
            />

            {showDetails && (
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="概要"
                rows={4}
                className="w-full rounded-xl border px-4 py-2.5 text-sm"
              />
            )}

            <input
              type="date"
              value={achievedOn}
              onChange={(e) => setAchievedOn(e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 text-sm"
              required
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {saving ? "登録中..." : "登録する"}
            </button>
          </form>
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
              <p className="text-sm text-gray-400">まだ実績がありません。</p>
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
