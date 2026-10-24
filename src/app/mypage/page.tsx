"use client";

import { getLocalUser } from "@/lib/authUser";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ReferralCard from "@/components/ReferralCard";
import AddToHomeButton from "@/components/AddToHomeButton";
import MyPageMenu from "@/components/MyPageMenu";
import CertificateAttachments from "@/components/CertificateAttachments";
import { AccountType, getMyAccountType } from "@/lib/account";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  QualificationTarget,
  deleteAchievement,
  listMyAchievements,
  listQualificationTargets,
} from "@/lib/achievements";
import type { Post, PtPrivate, PtProfile } from "@/lib/types";
import { notify } from "@/lib/notify";
import QualificationTargets from "@/components/QualificationTargets";
import { DEFAULT_PT_NAME, ptName } from "@/lib/format";
import { askConfirm } from "@/lib/confirm";
import { GeneralMyPage, MyReview, ProfileItem } from "@/components/mypage/GeneralAndItems";
import { appealProgress, getWorkPrefs } from "@/lib/ptAppeal";

export default function MyPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Partial<PtProfile> | null>(null);
  const [privateInfo, setPrivateInfo] = useState<Partial<PtPrivate> | null>(
    null
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [followCount, setFollowCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  // 獲得いいね数（自分の投稿と、登録した臨床アイデアへのいいね）
  const [receivedLikes, setReceivedLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [email, setEmail] = useState("");
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [userId, setUserId] = useState("");
  // 「採用担当に伝える」で書けた項目の数（5つ中）
  const [appealDone, setAppealDone] = useState<number | null>(null);


  useEffect(() => {
    if (accountType !== "pt" || !userId || !profile) return;
    let off = false;
    getWorkPrefs(userId).then((prefs) => {
      if (!off) setAppealDone(appealProgress(profile, prefs).filter(Boolean).length);
    });
    return () => {
      off = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountType, userId, profile?.one_liner, profile?.why_pt, profile?.learning_now, profile?.values_tags]);

  useEffect(() => {
    loadMyPage();
  }, []);

  async function loadMyPage() {
    setLoading(true);

    const {
      data: { user },
    } = await getLocalUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setEmail(user.email || "");
    setUserId(user.id);

    const type = await getMyAccountType(user.id);
    setAccountType(type);

    // 学生は、学生向けのマイページ（実習・就活・国試）へ
    if (type === "student") {
      router.replace("/student");
      return;
    }

    // 一般の方は自分のレビューとフォロー数だけ読み込む
    if (type === "general") {
      await loadMyReviews();

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
          user.email?.split("@")[0] || DEFAULT_PT_NAME,
        qualification: "理学療法士",
        profile_image: null,
        rating: 0,
        review_count: 0,
      });
    } else {
      setProfile(profileData);
    }

    // 出身・生年月日・連絡先は非公開のpt_privateから取得する（本人のみ）
    const { data: privateData } = await supabase
      .from("pt_private")
      .select("hometown, birth_date, contact, hidden_workplace, hidden_department")
      .eq("user_id", user.id)
      .maybeSingle();

    setPrivateInfo(privateData || null);

    // 勤務先を非公開にしているときは、本人にだけ、保管してある値を表示する
    if (profileData?.hide_workplace) {
      setProfile((prev) => ({
        ...(prev ?? {}),
        workplace: privateData?.hidden_workplace ?? null,
        department: privateData?.hidden_department ?? null,
      }));
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
    // 獲得いいね数
    // =========================
    const { data: likeTotal } = await supabase.rpc("my_received_likes");
    setReceivedLikes(typeof likeTotal === "number" ? likeTotal : Number(likeTotal) || 0);

    // =========================
    // 実績・資格更新の進捗
    // =========================
    setAchievements(await listMyAchievements(user.id));
    setTargets(await listQualificationTargets(user.id));

    setLoading(false);
  }

  async function handleDeleteAchievement(id: string) {
    if (!await askConfirm("この実績投稿を削除しますか？")) return;
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
  // 自分が書いたレビュー（一般の方用）
  // =========================
  async function loadMyReviews() {
    const { data: reviewData } = await supabase.rpc("list_my_reviews");

    const rows = (reviewData || []) as { id: string; pt_id: string; rating: number; comment: string | null; created_at: string }[];
    const ptIds = [...new Set(rows.map((r) => r.pt_id))];
    const nameMap: Record<string, string> = {};

    if (ptIds.length > 0) {
      const { data: ptData } = await supabase
        .from("pt_profiles")
        .select("id, full_name")
        .in("id", ptIds);

      (ptData || []).forEach((pt) => {
        nameMap[pt.id] = pt.full_name || "";
      });
    }

    setMyReviews(
      rows.map((r) => ({
        ...r,
        pt_name: nameMap[r.pt_id] || "",
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
          読み込み中…
        </p>
      </main>
    );
  }

  if (accountType === "general") {
    return (
      <GeneralMyPage
        name={email.split("@")[0] || "ユーザー"}
        userId={userId}
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
        <div className="relative -mx-6 -mt-12">
          <MyPageMenu onLogout={handleLogout} />

          {/* カバー写真 */}
          <div className="absolute inset-0 overflow-hidden">
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
              {ptName(profile?.full_name)}
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
        <div className="flex justify-center gap-6 mt-6 text-center">

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

          <div className="text-center">
            <p className="font-semibold">
              {receivedLikes}
            </p>

            <p className="text-sm text-gray-500">
              獲得いいね
            </p>
          </div>

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

        {/* ホーム画面に追加（目立つ場所に。追加済みのアプリの中では出ない） */}
        <AddToHomeButton />

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

        {/* 採用担当に伝える（PTのみ） */}
        {accountType === "pt" && (
          <Link
            href="/mypage/appeal"
            className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-emerald-900">採用担当に伝える</p>
              <p className="mt-0.5 text-xs leading-5 text-emerald-800">
                人柄ややる気を、短く伝えましょう。{appealDone !== null ? `いま、5つのうち${appealDone}つ。` : ""}
              </p>
            </div>
            <span className="shrink-0 text-lg text-emerald-800">›</span>
          </Link>
        )}

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
          <QualificationTargets
            userId={userId}
            targets={targets}
            achievements={achievements}
            onChanged={loadMyPage}
          />

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

                      {userId && (
                        <CertificateAttachments
                          postId={a.id}
                          userId={userId}
                        />
                      )}
                    </div>

                    <button
                      aria-label="この実績投稿を削除"
                      onClick={() => handleDeleteAchievement(a.id)}
                      className="shrink-0 text-gray-400 hover:text-gray-700"
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
            title={profile?.hide_workplace ? "勤務先（非公開）" : "勤務先"}
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
                title="経験"
                value={
                  profile?.experience_years
                    ? `${profile.experience_years}年目`
                    : ""
                }
              />

              <ProfileItem
                title="学歴"
                value={profile?.education}
              />

              <ProfileItem
                title="出身"
                value={privateInfo?.hometown}
              />

              <ProfileItem
                title="生年月日"
                value={privateInfo?.birth_date}
              />

              <ProfileItem
                title="言語"
                value={profile?.languages}
              />

              <ProfileItem
                title="連絡先"
                value={privateInfo?.contact}
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

          <ReferralCard userId={userId} />
          <AddToHomeButton placement="bottom" />
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
