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

export default function FollowingPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFollowing();
  }, []);

  async function loadFollowing() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    const { data: followData, error: followError } =
      await supabase
        .from("follows")
        .select("followed_user")
        .eq("following_user", user.id);

    console.log("FOLLOWING DATA", followData);
    console.log("FOLLOWING ERROR", followError);

    if (
      followError ||
      !followData ||
      followData.length === 0
    ) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    const userIds = followData.map(
      (follow) => follow.followed_user
    );

    const {
      data: profileData,
      error: profileError,
    } = await supabase
      .from("pt_profiles")
      .select(
        "id, user_id, full_name, qualification, profile_image"
      )
      .in("user_id", userIds);

    console.log(
      "FOLLOWING PROFILES",
      profileData
    );

    console.log(
      "FOLLOWING PROFILE ERROR",
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
          フォロー中
        </h1>

        {profiles.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center">
            <p className="text-gray-500">
              まだフォローしているPTはいません
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {profiles.map((profile) => (
              <Link
                key={profile.user_id}
                href={`/pts/${profile.user_id}`}
                className="block"
              >
                <div className="bg-white border rounded-2xl p-4 flex items-center gap-4">

                  {profile.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt={
                        profile.full_name || ""
                      }
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      PT
                    </div>
                  )}

                  <div>
                    <p className="font-semibold">
                      {profile.full_name ||
                        "PTユーザー"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {profile.qualification ||
                        "理学療法士"}
                    </p>
                  </div>

                </div>
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}