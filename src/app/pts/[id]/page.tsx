
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  QualificationTarget,
  computeQualificationProgress,
  listPublicAchievements,
  listQualificationTargets,
} from "@/lib/achievements";
import type { AuthUser, PtProfile, Review } from "@/lib/types";
import { notify } from "@/lib/notify";

type CaseReport = {
  id: string;
  title: string | null;
  disease_category: string | null;
  created_at: string;
};

export default function PTProfile() {
  const params = useParams();
  const id = params.id as string;

  const [pt, setPt] = useState<PtProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [following, setFollowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [caseReports, setCaseReports] = useState<CaseReport[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [profileExpanded, setProfileExpanded] = useState(false);

  async function getPT() {
    setErrorMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    // PTプロフィールを取得
    // single()を使わず、1件を配列として取得する
    const {
      data: ptList,
      error: ptError,
    } = await supabase
      .from("pt_profiles")
.select("*")
.eq("id", id)
.limit(1);

    if (ptError) {
      setErrorMessage("プロフィールの読み込みに失敗しました");
      return;
    }

    const ptData = ptList?.[0];

    if (!ptData) {
      setErrorMessage("このPTプロフィールは見つかりませんでした");
      return;
    }

    setPt(ptData);

    // レビュー取得
    const { data: reviewData } = await supabase
      .from("reviews")
      .select("*")
      .eq("pt_id", ptData.id)
      .order("created_at", {
        ascending: false,
      });

    if (reviewData) {
      setReviews(reviewData);
    }

    // フォロー状態取得
    if (user) {
      const { data: followData } = await supabase
        .from("follows")
        .select("*")
        .eq("following_user", user.id)
        .eq("followed_user", ptData.user_id);

      if (followData && followData.length > 0) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }

    // =========================
    // ポートフォリオ（症例報告・実績・資格更新目標）
    // =========================
    const { data: caseData } = await supabase
      .from("posts")
      .select("id, title, disease_category, created_at")
      .eq("user_id", ptData.user_id)
      .eq("post_type", "case")
      .order("created_at", { ascending: false });

    setCaseReports(caseData || []);
    setAchievements(await listPublicAchievements(ptData.user_id));
    setTargets(await listQualificationTargets(ptData.user_id));

    // =========================
    // 投稿・フォロー・フォロワー数
    // =========================
    const { count: postsCount } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", ptData.user_id)
      .eq("is_public", true);

    setPostCount(postsCount || 0);

    const { count: followingTotal } = await supabase
      .from("follows")
      .select("id", { count: "exact", head: true })
      .eq("following_user", ptData.user_id);

    setFollowingCount(followingTotal || 0);

    const { count: followerTotal } = await supabase
      .from("follows")
      .select("id", { count: "exact", head: true })
      .eq("followed_user", ptData.user_id);

    setFollowerCount(followerTotal || 0);
  }

  useEffect(() => {
    if (id) {
      getPT();
    }
  }, [id]);

  async function toggleFollow() {
    if (!user) {
      notify("ログインしてください");
      return;
    }

    if (!pt) {
      return;
    }

    if (following) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("following_user", user.id)
        .eq("followed_user", pt.user_id);

      if (!error) {
        setFollowing(false);
      }
    } else {
      const { error } = await supabase
        .from("follows")
        .insert({
          following_user: user.id,
          followed_user: pt.user_id,
        });

      if (!error) {
        setFollowing(true);
      }
    }
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#fafafa] pb-24">
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="max-w-2xl mx-auto px-5 py-4">
            <Link
              href="/pts"
              className="text-sm text-gray-400 hover:text-gray-700"
            >
              ← 検索
            </Link>
          </div>
        </header>

        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {errorMessage}
            </p>

            <Link
              href="/pts"
              className="mt-5 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white"
            >
              検索に戻る
            </Link>
          </div>
        </div>

      </main>
    );
  }

  if (!pt) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-sm text-gray-400">
          読み込み中...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24">

      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <Link
            href="/pts"
            className="text-sm text-gray-400 hover:text-gray-700"
          >
            ← 検索
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* プロフィールヘッダー */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">

          {/* カバー写真（アバター〜評価までを背景として覆う） */}
          <div className="relative">
            <div className="absolute inset-0">
              {pt.cover_image ? (
                <img loading="lazy" decoding="async"
                  src={pt.cover_image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-[#55c7dc]/20 via-[#45d0c2]/20 to-[#4ed7a7]/20" />
              )}
            </div>

            <div className="relative flex flex-col items-center px-6 pt-8 pb-6 text-center">

              {pt.profile_image ? (
                <img loading="lazy" decoding="async"
                  src={pt.profile_image}
                  alt={pt.full_name || "プロフィール"}
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-white"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-400 ring-4 ring-white">
                  PT
                </div>
              )}

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
                {pt.full_name || "PTユーザー"}
              </h1>

              <p className="mt-1 text-base text-gray-600">
                {pt.qualification || "理学療法士"}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg">
                  ⭐
                </span>

                <span className="text-base font-medium">
                  {pt.rating || 0}
                </span>

                <span className="text-sm text-gray-400">
                  ({pt.review_count || 0}件)
                </span>
              </div>

            </div>
          </div>

          <div className="flex flex-col items-center px-6 pb-8 text-center">

            {/* 投稿・フォロー・フォロワー（カバー写真の外＝白背景） */}
            <div className="mt-2 flex justify-center gap-8">
              <div className="text-center">
                <p className="font-semibold">{postCount}</p>
                <p className="text-sm text-gray-500">投稿</p>
              </div>

              <div className="text-center">
                <p className="font-semibold">{followingCount}</p>
                <p className="text-sm text-gray-500">フォロー</p>
              </div>

              <div className="text-center">
                <p className="font-semibold">{followerCount}</p>
                <p className="text-sm text-gray-500">フォロワー</p>
              </div>
            </div>

            {/* フォロー・メッセージ・レビューを書く */}
            <div className="mt-6 flex w-full max-w-sm gap-2">
              <button
                onClick={toggleFollow}
                className={`
                  flex-1
                  rounded-full
                  py-2.5
                  text-sm
                  font-medium
                  transition
                  active:scale-[0.98]
                  ${
                    following
                      ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      : "bg-black text-white hover:bg-gray-800"
                  }
                `}
              >
                {following ? "フォロー中" : "フォローする"}
              </button>

              <Link
                href={`/messages/${pt.user_id}`}
                className="flex-1"
              >
                <div
                  className="
                    w-full
                    rounded-full
                    border
                    border-gray-300
                    bg-white
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-900
                    transition
                    hover:bg-gray-50
                    active:scale-[0.98]
                  "
                >
                  💬 メッセージ
                </div>
              </Link>

              <Link
                href={`/pts/${pt.id}/review`}
                className="flex-1"
              >
                <div
                  className="
                    w-full
                    rounded-full
                    border
                    border-gray-300
                    bg-white
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-900
                    transition
                    hover:bg-gray-50
                    active:scale-[0.98]
                  "
                >
                  レビューを書く
                </div>
              </Link>
            </div>

          </div>
        </section>

        {/* 実績・資格更新の進捗（プロフィールをこの分だけ押し下げる） */}
        {(targets.length > 0 || achievements.length > 0) && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {targets.map((t) => {
              const progress = computeQualificationProgress(
                t,
                achievements
              );

              return (
                <span
                  key={t.id}
                  className="inline-flex items-center gap-1 rounded-full border border-relight px-3 py-1 text-xs text-gray-600"
                >
                  🏅 {t.name} {progress.count}/{t.required_total}・更新まで
                  {Math.floor(progress.monthsRemaining / 12)}年
                  {progress.monthsRemaining % 12}ヶ月
                </span>
              );
            })}

            {ACHIEVEMENT_CATEGORIES.map((c) => {
              const count = achievements.filter(
                (a) => a.category === c
              ).length;

              if (count === 0) return null;

              return (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
                >
                  {ACHIEVEMENT_CATEGORY_LABEL[c]} {count}
                </span>
              );
            })}
          </div>
        )}

        {/* プロフィール */}
        <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">

          <h2 className="text-lg font-semibold text-gray-900">
            プロフィール
          </h2>

          <div className="mt-6 space-y-5">

            <ProfileItem
              title="勤務先"
              value={pt.workplace}
            />

            {profileExpanded && (
              <>
                <ProfileItem
                  title="専門"
                  value={pt.specialty}
                />

                <ProfileItem
                  title="資格"
                  value={pt.qualification}
                />

                <ProfileItem
                  title="経験年数"
                  value={
                    pt.experience_years !== null &&
                    pt.experience_years !== undefined
                      ? `${pt.experience_years}年`
                      : ""
                  }
                />

                <ProfileItem
                  title="学歴"
                  value={pt.education}
                />

                <ProfileItem
                  title="出身"
                  value={pt.hometown}
                />

                <ProfileItem
                  title="生年月日"
                  value={pt.birth_date}
                />

                <ProfileItem
                  title="言語"
                  value={pt.language}
                />

                <ProfileItem
                  title="連絡先"
                  value={pt.contact}
                />

                <ProfileItem
                  title="自己紹介"
                  value={pt.biography}
                />
              </>
            )}

            <button
              onClick={() => setProfileExpanded((v) => !v)}
              className="w-full rounded-full border border-gray-200 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              {profileExpanded ? "閉じる ▲" : "もっと見る ▼"}
            </button>

          </div>
        </section>

        {/* 症例報告 */}
        {caseReports.length > 0 && (
          <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-lg font-semibold text-gray-900">
              症例報告（{caseReports.length}件）
            </h2>

            <div className="mt-4 space-y-2">
              {caseReports.map((c) => (
                <Link
                  key={c.id}
                  href={`/posts/${c.id}`}
                  className="block rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {c.title || "無題の症例報告"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {c.disease_category ? `${c.disease_category}・` : ""}
                    {c.created_at?.slice(0, 10)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* レビュー */}
        <section className="mt-8">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-gray-900">
              レビュー
            </h2>

            <span className="text-sm text-gray-400">
              {reviews.length}件
              {reviews.length > 0 && (
                <>
                  （PT{" "}
                  {reviews.filter((r) => r.reviewer_type === "pt").length}
                  件・一般{" "}
                  {reviews.filter((r) => r.reviewer_type === "general").length}
                  件）
                </>
              )}
            </span>

          </div>

          {reviews.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-8 text-center">

              <p className="text-sm text-gray-400">
                まだレビューはありません
              </p>

            </div>
          ) : (
            <div className="mt-4 space-y-3">

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    p-5
                    shadow-[0_2px_12px_rgba(0,0,0,0.03)]
                  "
                >

                  <div className="flex items-center justify-between gap-3">

                    <p className="text-sm tracking-wide">
                      {"⭐".repeat(
                        Number(review.rating) || 0
                      )}
                    </p>

                    <div className="flex items-center gap-1.5">
                      {review.is_anonymous && (
                        <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
                          匿名
                        </span>
                      )}
                      <ReviewerBadge type={review.reviewer_type} />
                    </div>

                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    {review.comment}
                  </p>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>


    </main>
  );
}

function ProfileItem({
  title,
  value,
}: {
  title: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">

      <p className="text-xs font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1.5 text-sm leading-6 text-gray-800">
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "未設定"}
      </p>

    </div>
  );
}
// レビューを書いた人の種類（PT／一般）
function ReviewerBadge({ type }: { type: string | null | undefined }) {
  if (type === "pt") {
    return (
      <span className="rounded-full bg-black px-2.5 py-0.5 text-[11px] font-medium text-white">
        PTのレビュー
      </span>
    );
  }

  if (type === "general") {
    return (
      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
        一般のレビュー
      </span>
    );
  }

  return null;
}
