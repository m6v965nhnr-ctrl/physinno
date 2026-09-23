"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AccountTypeCard from "@/components/AccountTypeCard";
import { AccountType, getMyAccountType } from "@/lib/account";

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

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [followCount, setFollowCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [email, setEmail] = useState("");
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);

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

    setLoading(false);
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
      alert(error.message);
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
        ========================= */}
        <div className="text-center">

          {/* プロフィール画像 */}
          <div className="mx-auto w-32 h-32">

            {profile?.profile_image ? (
              <img
                src={profile.profile_image}
                alt={profile.full_name || "プロフィール画像"}
                className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  border
                  border-gray-200
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
                  border
                  border-gray-200
                "
              >
                👤
              </div>
            )}

          </div>

          {/* 名前 */}
          <h1 className="text-3xl font-semibold mt-6">
            {profile?.full_name || "PTユーザー"} PT
          </h1>

          {/* 資格 */}
          <p className="text-gray-500 mt-2">
            {profile?.qualification || "理学療法士"}
          </p>

          {/* 評価 */}
          <p className="text-xl mt-5">
            ⭐ {profile?.rating || 0}{" "}
            ({profile?.review_count || 0}件)
          </p>

          {/* =========================
              投稿・フォロー・フォロワー
          ========================= */}
          <div className="flex justify-center gap-8 mt-8">

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

          {/* プロフィール編集 */}
          <Link href="/mypage/edit">
            <button
              className="
                mt-6
                border
                px-6
                py-2
                rounded-full
              "
            >
              プロフィール編集
            </button>
          </Link>

        </div>

        {/* =========================
            プロフィール情報
        ========================= */}
        <div className="mt-10 border-t pt-8 space-y-6">

          <h2 className="text-xl font-semibold">
            プロフィール
          </h2>

          <ProfileItem
            title="勤務先"
            value={profile?.workplace}
          />

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

          {/* アカウントの種類 */}
          <AccountTypeCard
            accountType={accountType}
            onChanged={handleAccountTypeChanged}
          />

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
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="block"
                >
                  <div className="border rounded-2xl p-5">

                    {post.title && (
                      <h3 className="font-semibold">
                        {post.title}
                      </h3>
                    )}

                    <p className="mt-2 whitespace-pre-wrap">
                      {post.content}
                    </p>

                  </div>
                </Link>
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
