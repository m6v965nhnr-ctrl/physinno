
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PTProfile() {
  const params = useParams();
  const id = params.id as string;

  const [pt, setPt] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [following, setFollowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
      getPT();
    }
  }, [id]);

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

    console.log("PT DATA", ptList);
    console.log("PT ERROR", ptError);

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
    const {
      data: reviewData,
      error: reviewError,
    } = await supabase
      .from("reviews")
      .select("*")
      .eq("pt_id", ptData.id)
      .order("created_at", {
        ascending: false,
      });

    console.log("REVIEWS DATA", reviewData);
    console.log("REVIEWS ERROR", reviewError);

    if (reviewData) {
      setReviews(reviewData);
    }

    // フォロー状態取得
    if (user) {
      const {
        data: followData,
        error: followError,
      } = await supabase
        .from("follows")
        .select("*")
        .eq("following_user", user.id)
        .eq("followed_user", ptData.user_id);

      console.log("FOLLOW DATA", followData);
      console.log("FOLLOW ERROR", followError);

      if (followData && followData.length > 0) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
  }

  async function toggleFollow() {
    if (!user) {
      alert("ログインしてください");
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

      console.log("UNFOLLOW ERROR", error);

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

      console.log("FOLLOW ERROR", error);

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
              ← PT検索
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
              PT検索に戻る
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
            ← PT検索
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* プロフィールヘッダー */}
        <section className="rounded-3xl border border-gray-100 bg-white px-6 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">

          <div className="flex flex-col items-center text-center">

            {pt.profile_image ? (
              <img
                src={pt.profile_image}
                alt={pt.full_name || "プロフィール"}
                className="h-28 w-28 rounded-full object-cover ring-1 ring-gray-100"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-400">
                PT
              </div>
            )}

            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900">
              {pt.full_name || "PTユーザー"} PT
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              理学療法士
            </p>

            <div className="mt-4 flex items-center gap-2">
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

            {/* フォロー */}
            <button
              onClick={toggleFollow}
              className={`
                mt-6
                w-full
                max-w-xs
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

            {/* メッセージ */}
            <Link
              href={`/messages/${pt.user_id}`}
              className="mt-3 block w-full max-w-xs"
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

          </div>
        </section>

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

          </div>
        </section>

        {/* レビューを書く */}
        <Link
          href={`/pts/${pt.id}/review`}
          className="block"
        >
          <div
            className="
              mt-5
              w-full
              rounded-full
              bg-black
              py-3
              text-center
              text-sm
              font-medium
              text-white
              transition
              hover:bg-gray-800
              active:scale-[0.98]
            "
          >
            レビューを書く
          </div>
        </Link>

        {/* レビュー */}
        <section className="mt-8">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-gray-900">
              レビュー
            </h2>

            <span className="text-sm text-gray-400">
              {reviews.length}件
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

                  <div className="flex items-center justify-between">

                    <p className="text-sm tracking-wide">
                      {"⭐".repeat(
                        Number(review.rating) || 0
                      )}
                    </p>

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