"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AccountTypeCard from "@/components/AccountTypeCard";
import { AccountType, getMyAccountType } from "@/lib/account";
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
import type { Post, PtProfile } from "@/lib/types";
import { notify } from "@/lib/notify";

type MyReview = {
  id: string;
  pt_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  pt_name: string;
};

export default function MyPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Partial<PtProfile> | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followCount, setFollowCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [email, setEmail] = useState("");
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [userId, setUserId] = useState("");

  // 資格目標フォーム
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [targetName, setTargetName] = useState("");
  const [requiredTotal, setRequiredTotal] = useState("20");
  const [renewalYears, setRenewalYears] = useState("5");
  const [savingTarget, setSavingTarget] = useState(false);

  useEffect(() => {
    loadMyPage();
  }, []);

  async function loadMyPage() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setEmail(user.email || "");
    setUserId(user.id);

    const type = await getMyAccountType(user.id);
    setAccountType(type);

    // 一般ユーザーは自分のレビューとフォロー数だけ読み込む
    if (type === "general") {
      await loadMyReviews(user.id);

      const { data: followingData } = await supabase
        .from("follows")
        .select("id")
        .eq("following_user", user.id);

      setFollowCount(followingData?.length || 0);
      setLoading(false);
      return;
    }

    // =========================
    // プロフィール取得
    // =========================
    const { data: profileData } =
      await supabase
        .from("pt_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (!profileData) {
      setProfile({
        user_id: user.id,
        full_name:
          user.email?.split("@")[0] || "PTユーザー",
        qualification: "理学療法士",
        profile_image: null,
        rating: 0,
        review_count: 0,
      });
    } else {
      setProfile(profileData);
    }

    // =========================
    // 自分の投稿
    // =========================
    const { data: postData } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setPosts(postData || []);

    // =========================
    // フォロー数
    // =========================
    const { data: followingData } = await supabase
      .from("follows")
      .select("id")
      .eq("following_user", user.id);

    setFollowCount(followingData?.length || 0);

    // =========================
    // フォロワー数
    // =========================
    const { data: followerData } = await supabase
      .from("follows")
      .select("id")
      .eq("followed_user", user.id);

    setFollowerCount(followerData?.length || 0);

    // =========================
    // 実績・資格更新の進捗
    // =========================
    setAchievements(await listMyAchievements(user.id));
    setTargets(await listQualificationTargets(user.id));

    setLoading(false);
  }

  // =========================
  // 資格更新の目標を追加
  // =========================
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
    loadMyPage();
  }

  async function handleDeleteTarget(id: string) {
    if (!confirm("この目標を削除しますか？")) return;
    await deleteQualificationTarget(id);
    loadMyPage();
  }

  async function handleDeleteAchievement(id: string) {
    if (!confirm("この実績投稿を削除しますか？")) return;
    await deleteAchievement(id);
    loadMyPage();
  }

  // =========================
  // 自分の投稿を削除
  // =========================
  async function handleDeletePost(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      notify(error.message);
      return;
    }

    loadMyPage();
  }

  // =========================
  // 自分が書いたレビュー（一般ユーザー用）
  // =========================
  async function loadMyReviews(userId: string) {
    const { data: reviewData } = await supabase
      .from("reviews")
      .select("id, pt_id, rating, comment, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const rows = reviewData || [];
    const ptIds = [...new Set(rows.map((r) => r.pt_id))];
    const nameMap: Record<string, string> = {};

    if (ptIds.length > 0) {
      const { data: ptData } = await supabase
        .from("pt_profiles")
        .select("id, full_name")
        .in("id", ptIds);

      (ptData || []).forEach((pt) => {
        nameMap[pt.id] = pt.full_name || "PTユーザー";
      });
    }

    setMyReviews(
      rows.map((r) => ({
        ...r,
        pt_name: nameMap[r.pt_id] || "PTユーザー",
      }))
    );
  }

  // =========================
  // アカウントの種類を変更したとき
  // =========================
  function handleAccountTypeChanged(type: AccountType) {
    setAccountType(type);
    loadMyPage();
  }

  // =========================
  // ログアウト
  // =========================
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      notify(error.message);
      return;
    }

    router.replace("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中...
        </p>
      </main>
    );
  }

  if (accountType === "general") {
    return (
      <GeneralMyPage
        name={email.split("@")[0] || "ユーザー"}
        followCount={followCount}
        reviews={myReviews}
        onAccountTypeChanged={handleAccountTypeChanged}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">
      <div className="max-w-2xl mx-auto">

        {/* =========================
            プロフィール上部
            （カバー写真はアバター〜評価までを背景として覆う）
        ========================= */}
        <div className="relative -mx-6 -mt-12 overflow-hidden">

          {/* カバー写真 */}
          <div className="absolute inset-0">
            {profile?.cover_image ? (
              <img loading="lazy" decoding="async"
                src={profile.cover_image}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-[#55c7dc]/20 via-[#45d0c2]/20 to-[#4ed7a7]/20" />
            )}
          </div>

          <div className="relative px-6 pt-12 pb-6 text-center">

            {/* プロフィール画像 */}
            <div className="mx-auto w-32 h-32">

              {profile?.profile_image ? (
                <img loading="lazy" decoding="async"
                  src={profile.profile_image}
                  alt={profile.full_name || "プロフィール画像"}
                  className="
                    w-32
                    h-32
                    rounded-full
                    object-cover
                    ring-4
                    ring-white
                  "
                />
              ) : (
                <div
                  className="
                    w-32
                    h-32
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-4xl
                    ring-4
                    ring-white
                  "
                >
                  👤
                </div>
              )}

            </div>

            {/* 名前 */}
            <h1 className="text-3xl font-semibold mt-6">
              {profile?.full_name || "PTユーザー"}
            </h1>

            {/* 資格 */}
            <p className="text-lg text-gray-600 mt-2">
              {profile?.qualification || "理学療法士"}
            </p>

            {/* 評価 */}
            <p className="text-xl mt-5">
              ⭐ {profile?.rating || 0}{" "}
              ({profile?.review_count || 0}件)
            </p>

          </div>
        </div>

        {/* =========================
            投稿・フォロー・フォロワー（カバー写真の外＝白背景）
        ========================= */}
        <div className="flex justify-center gap-8 mt-6 text-center">

          <div className="text-center">
            <p className="font-semibold">
              {posts.length}
            </p>

            <p className="text-sm text-gray-500">
              投稿
            </p>
          </div>

          <Link
            href="/mypage/following"
            className="text-center"
          >
            <p className="font-semibold">
              {followCount}
            </p>

            <p className="text-sm text-gray-500">
              フォロー
            </p>
          </Link>

          <Link
            href="/mypage/followers"
            className="text-center"
          >
            <p className="font-semibold">
              {followerCount}
            </p>

            <p className="text-sm text-gray-500">
              フォロワー
            </p>
          </Link>

        </div>

        {/* =========================
            ポートフォリオへの導線
        ========================= */}
        <Link
          href="/mypage/portfolio"
          className="mt-6 flex items-center justify-between rounded-2xl bg-relight-gradient px-5 py-4 text-white"
        >
          <div>
            <p className="text-sm font-semibold">ポートフォリオを作る</p>
            <p className="mt-0.5 text-xs text-white/90">
              学歴・職歴・資格・研修・学会発表・論文をまとめて管理し、PDFで保存できます
            </p>
          </div>
          <span className="text-lg">›</span>
        </Link>

        {/* =========================
            実績・資格更新（クリックしなくても内容が見える。プロフィールをこの分だけ押し下げる）
        ========================= */}
        <div className="mt-10 border-t pt-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              実績・資格更新
            </h2>

            <Link
              href="/posts/create"
              className="rounded-full bg-relight-gradient px-4 py-2 text-sm font-medium text-white"
            >
              + 実績を投稿
            </Link>
          </div>

          {/* 資格更新の目標 */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">資格更新の目標</h3>

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
          </div>

          {/* これまでの実績 */}
          <div>
            <h3 className="text-base font-semibold">これまでの実績</h3>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {ACHIEVEMENT_CATEGORIES.map((c) => {
                const count = achievements.filter(
                  (a) => a.category === c
                ).length;

                return (
                  <div
                    key={c}
                    className="rounded-2xl border border-gray-100 py-4 text-center"
                  >
                    <p className="text-xl font-semibold">{count}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {ACHIEVEMENT_CATEGORY_LABEL[c]}
                    </p>
                  </div>
                );
              })}
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
          </div>

        </div>

        {/* =========================
            プロフィール情報
        ========================= */}
        <div className="mt-10 border-t pt-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              プロフィール
            </h2>

            <Link href="/mypage/edit">
              <button
                className="
                  border
                  px-4
                  py-1.5
                  rounded-full
                  text-sm
                "
              >
                プロフィール編集
              </button>
            </Link>
          </div>

          <ProfileItem
            title="勤務先"
            value={profile?.workplace}
          />

          {profileExpanded && (
            <>
              <ProfileItem
                title="専門"
                value={profile?.specialty}
              />

              <ProfileItem
                title="資格"
                value={profile?.qualification}
              />

              <ProfileItem
                title="経験年数"
                value={
                  profile?.experience_years
                    ? `${profile.experience_years}年`
                    : ""
                }
              />

              <ProfileItem
                title="学歴"
                value={profile?.education}
              />

              <ProfileItem
                title="出身"
                value={profile?.hometown}
              />

              <ProfileItem
                title="生年月日"
                value={profile?.birth_date}
              />

              <ProfileItem
                title="言語"
                value={profile?.languages}
              />

              <ProfileItem
                title="連絡先"
                value={profile?.contact}
              />

              <ProfileItem
                title="自己紹介"
                value={profile?.biography}
              />
            </>
          )}

          <button
            onClick={() => setProfileExpanded((v) => !v)}
            className="w-full rounded-full border border-gray-200 py-2 text-sm text-gray-500 hover:bg-gray-50"
          >
            {profileExpanded ? "閉じる ▲" : "もっと見る ▼"}
          </button>

          {/* ログアウト */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="
                w-full
                rounded-full
                border
                border-gray-300
                bg-white
                py-3
                text-sm
                font-medium
                text-gray-700
                hover:bg-gray-50
                active:scale-[0.98]
              "
            >
              ログアウト
            </button>
          </div>

        </div>

        {/* =========================
            投稿
        ========================= */}
        <div className="mt-10 border-t pt-8">

          <h2 className="text-xl font-semibold mb-5">
            投稿
          </h2>

          <div className="space-y-5">

            {posts.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                まだ投稿がありません
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 border rounded-2xl p-5"
                >
                  <Link
                    href={`/posts/${post.id}`}
                    className="block min-w-0 flex-1"
                  >
                    {post.title && (
                      <h3 className="font-semibold">
                        {post.title}
                      </h3>
                    )}

                    <p className="mt-2 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </Link>

                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="shrink-0 text-xs text-gray-400 hover:text-red-500!"
                  >
                    削除
                  </button>
                </div>
              ))
            )}

          </div>

        </div>

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
    <div>
      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>

      <p className="text-base">
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "未設定"}
      </p>
    </div>
  );
}
function GeneralMyPage({
  name,
  followCount,
  reviews,
  onAccountTypeChanged,
  onLogout,
}: {
  name: string;
  followCount: number;
  reviews: MyReview[];
  onAccountTypeChanged: (type: AccountType) => void;
  onLogout: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-12 pb-28">
      <div className="mx-auto max-w-2xl space-y-5">

        {/* プロフィール */}
        <section className="rounded-3xl border border-gray-100 bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
            👤
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            {name}
          </h1>

          <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            一般
          </span>

          <div className="mt-6 flex justify-center gap-10">
            <div>
              <p className="font-semibold">{reviews.length}</p>
              <p className="text-xs text-gray-500">レビュー</p>
            </div>

            <Link href="/mypage/following">
              <p className="font-semibold">{followCount}</p>
              <p className="text-xs text-gray-500">フォロー中のPT</p>
            </Link>
          </div>

          <Link
            href="/pts"
            className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white"
          >
            PTを探す
          </Link>
        </section>

        {/* 自分のレビュー */}
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-semibold text-gray-900">
            書いたレビュー
          </h2>

          {reviews.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              まだレビューはありません
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {reviews.map((review) => (
                <Link
                  key={review.id}
                  href={`/pts/${review.pt_id}`}
                  className="block rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-900">
                      {review.pt_name} PT
                    </p>
                    <p className="text-sm">
                      {"⭐".repeat(Number(review.rating) || 0)}
                    </p>
                  </div>

                  {review.comment && (
                    <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {review.comment}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* アカウントの種類 */}
        <AccountTypeCard
          accountType="general"
          onChanged={onAccountTypeChanged}
        />

        <button
          onClick={onLogout}
          className="w-full rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
        >
          ログアウト
        </button>
      </div>
    </main>
  );
}
