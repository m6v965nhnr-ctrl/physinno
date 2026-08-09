"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  qualification: string | null;
  profile_image: string | null;
};

export default function FollowersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFollowers();
  }, []);

  async function loadFollowers() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    // 自分をフォローしているユーザー
    const {
      data: followerData,
      error: followerError,
    } = await supabase
      .from("follows")
      .select("following_user")
      .eq("followed_user", user.id);

    console.log("FOLLOWERS DATA", followerData);
    console.log("FOLLOWERS ERROR", followerError);

    if (
      followerError ||
      !followerData ||
      followerData.length === 0
    ) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    const followerIds = followerData.map(
      (item) => item.following_user
    );

    // 自分がすでにフォローしている人
    const {
      data: myFollowingData,
      error: myFollowingError,
    } = await supabase
      .from("follows")
      .select("followed_user")
      .eq("following_user", user.id);

    console.log(
      "MY FOLLOWING DATA",
      myFollowingData
    );
    console.log(
      "MY FOLLOWING ERROR",
      myFollowingError
    );

    if (myFollowingData) {
      setFollowingIds(
        myFollowingData.map(
          (item) => item.followed_user
        )
      );
    }

    // フォロワーのプロフィール
    const {
      data: profileData,
      error: profileError,
    } = await supabase
      .from("pt_profiles")
      .select(
        "id, user_id, full_name, qualification, profile_image"
      )
      .in("user_id", followerIds);

    console.log(
      "FOLLOWER PROFILES",
      profileData
    );
    console.log(
      "FOLLOWER PROFILE ERROR",
      profileError
    );

    if (
      profileError ||
      !profileData
    ) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    setProfiles(profileData);
    setLoading(false);
  }

  async function toggleFollow(
    targetUserId: string
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください");
      return;
    }

    const isFollowing =
      followingIds.includes(
        targetUserId
      );

    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq(
          "following_user",
          user.id
        )
        .eq(
          "followed_user",
          targetUserId
        );

      console.log(
        "UNFOLLOW ERROR",
        error
      );

      if (error) {
        alert("フォロー解除に失敗しました");
        return;
      }

      setFollowingIds((prev) =>
        prev.filter(
          (id) =>
            id !== targetUserId
        )
      );
    } else {
      const { error } = await supabase
        .from("follows")
        .insert({
          following_user: user.id,
          followed_user: targetUserId,
        });

      console.log(
        "FOLLOW ERROR",
        error
      );

      if (error) {
        alert("フォローに失敗しました");
        return;
      }

      setFollowingIds((prev) => [
        ...prev,
        targetUserId,
      ]);
    }
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

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 pb-24">
      <div className="max-w-xl mx-auto">

        <Link
          href="/mypage"
          className="text-sm text-gray-500"
        >
          ← マイページ
        </Link>

        <h1 className="text-2xl font-semibold mt-6 mb-6">
          フォロワー
        </h1>

        {profiles.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center">
            <p className="text-gray-500">
              まだフォロワーはいません
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {profiles.map((profile) => {
              const isFollowing =
                followingIds.includes(
                  profile.user_id
                );

              return (
                <div
                  key={profile.user_id}
                  className="bg-white border rounded-2xl p-4 flex items-center gap-4"
                >

                  <Link
                    href={`/pts/${profile.user_id}`}
                    className="flex items-center gap-4 min-w-0 flex-1"
                  >

                    {profile.profile_image ? (
                      <img
                        src={
                          profile.profile_image
                        }
                        alt={
                          profile.full_name ||
                          ""
                        }
                        className="w-14 h-14 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                        PT
                      </div>
                    )}

                    <div className="min-w-0">

                      <p className="font-semibold truncate">
                        {profile.full_name ||
                          "PTユーザー"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {profile.qualification ||
                          "理学療法士"}
                      </p>

                    </div>

                  </Link>

                  <button
                    onClick={() =>
                      toggleFollow(
                        profile.user_id
                      )
                    }
                    className="
                      shrink-0
                      border
                      border-gray-300
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      bg-white
                      hover:bg-gray-50
                      active:scale-95
                      transition
                    "
                  >
                    {isFollowing
                      ? "フォロー中"
                      : "フォローする"}
                  </button>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}