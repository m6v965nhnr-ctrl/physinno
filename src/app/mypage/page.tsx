"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export default function MyPage() {
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [followCount, setFollowCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    loadMyPage();
  }, []);

  async function loadMyPage() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data: profileData } = await supabase
      .from("pt_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    const { data: postData } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (postData) {
      setPosts(postData);
    }

    const { data: followingData } = await supabase
      .from("follows")
      .select("id")
      .eq("following_user", user.id);

    setFollowCount(followingData?.length || 0);

    const { data: followerData } = await supabase
      .from("follows")
      .select("id")
      .eq("followed_user", user.id);

    setFollowerCount(followerData?.length || 0);
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">
      <div className="max-w-2xl mx-auto">

        {/* プロフィール上部 */}
        <div className="text-center">

          {profile.profile_image ? (
            <img
              src={profile.profile_image}
              alt={profile.full_name || ""}
              className="
                w-32
                h-32
                rounded-full
                object-cover
                mx-auto
              "
            />
          ) : (
            <div
              className="
                w-32
                h-32
                rounded-full
                bg-gray-200
                flex
                items-center
                justify-center
                mx-auto
                text-4xl
              "
            >
              👤
            </div>
          )}

          <h1 className="text-3xl font-semibold mt-6">
            {profile.full_name} PT
          </h1>

          <p className="text-gray-500 mt-2">
            理学療法士
          </p>

          <p className="text-xl mt-5">
            ⭐ {profile.rating || 0}{" "}
            ({profile.review_count || 0}件)
          </p>

          {/* 投稿・フォロー・フォロワー */}
          <div className="flex justify-center gap-8 mt-8">

            <div className="text-center">
              <p className="font-semibold">
                {posts.length}
              </p>

              <p className="text-sm text-gray-500">
                投稿
              </p>
            </div>

            {/* フォロー */}
            <Link
              href="/mypage/following"
              className="text-center cursor-pointer"
            >
              <p className="font-semibold">
                {followCount}
              </p>

              <p className="text-sm text-gray-500">
                フォロー
              </p>
            </Link>

            {/* フォロワー */}
            <Link
              href="/mypage/followers"
              className="text-center cursor-pointer"
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

        {/* プロフィール情報 */}
        <div className="mt-10 border-t pt-8 space-y-6">

          <h2 className="text-xl font-semibold">
            プロフィール
          </h2>

          <ProfileItem
            title="勤務先"
            value={profile.workplace}
          />

          <ProfileItem
            title="専門"
            value={profile.specialty}
          />

          <ProfileItem
            title="資格"
            value={profile.qualification}
          />

          <ProfileItem
            title="経験年数"
            value={
              profile.experience_years
                ? `${profile.experience_years}年`
                : ""
            }
          />

          <ProfileItem
            title="学歴"
            value={profile.education}
          />

          <ProfileItem
            title="出身"
            value={profile.hometown}
          />

          <ProfileItem
            title="生年月日"
            value={profile.birth_date}
          />

          <ProfileItem
            title="言語"
            value={profile.language}
          />

          <ProfileItem
            title="連絡先"
            value={profile.contact}
          />

          <ProfileItem
            title="自己紹介"
            value={profile.biography}
          />

        </div>
                {/* 投稿 */}
        <div className="mt-10 border-t pt-8">

          <h2 className="text-xl font-semibold mb-5">
            投稿
          </h2>

          <div className="space-y-5">

            {posts.map((post) => (
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
            ))}

          </div>

        </div>

      </div>

      <BottomNav />

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