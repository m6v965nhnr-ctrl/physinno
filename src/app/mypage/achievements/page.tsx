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
  deleteAchievement,
  listMyAchievements,
  listQualificationTargets,
} from "@/lib/achievements";
import QualificationTargets from "@/components/QualificationTargets";

export default function AchievementsPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);


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

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">読み込み中…</p>
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
          <QualificationTargets
            userId={userId}
            targets={targets}
            achievements={achievements}
            onChanged={load}
          />
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
                    className="shrink-0 text-gray-400 hover:text-gray-700"
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
