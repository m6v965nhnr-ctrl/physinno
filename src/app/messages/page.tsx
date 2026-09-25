"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { AuthUser } from "@/lib/types";

type Conversation = {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
};

type Profile = {
  user_id: string;
  full_name: string | null;
  profile_image: string | null;
};

export default function MessagesPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadConversations() {

    setLoading(true);
    setErrorMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();


    if (userError) {
      setErrorMessage(userError.message);
      setLoading(false);
      return;
    }

    if (!user) {
      setErrorMessage("ログインしていません");
      setLoading(false);
      return;
    }

    setUser(user);


    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .order("created_at", {
        ascending: false,
      });


    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setConversations([]);
      setLoading(false);
      return;
    }

    setConversations(data);

    const otherIds = data.map((conversation) =>
      conversation.user1_id === user.id
        ? conversation.user2_id
        : conversation.user1_id
    );


    if (otherIds.length > 0) {
      const { data: profileData, error: profileError } =
        await supabase
          .from("pt_profiles")
          .select("user_id, full_name, profile_image")
          .in("user_id", otherIds);


      if (profileError) {
        setErrorMessage(profileError.message);
        setLoading(false);
        return;
      }

      if (profileData) {
        const profileMap: Record<string, Profile> = {};

        profileData.forEach((profile) => {
          profileMap[profile.user_id] = profile;
        });

        setProfiles(profileMap);
      }
    }


    setLoading(false);
  }

  useEffect(() => {
    loadConversations();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center pb-24">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            読み込み中...
          </p>
          <p className="mt-2 text-xs text-gray-400">
            メッセージを読み込んでいます
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#fafafa] pb-24">
        <header className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-2xl px-5 py-5">
            <h1 className="text-lg font-semibold text-gray-900">
              メッセージ
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-5 py-10">
          <div className="rounded-2xl border border-red-100 bg-white p-5">
            <p className="text-sm font-semibold text-red-600">
              読み込みエラー
            </p>

            <p className="mt-2 break-all text-sm text-gray-600">
              {errorMessage}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-5 py-5">
          <h1 className="text-lg font-semibold text-gray-900">
            メッセージ
          </h1>

          <p className="mt-1 text-xs text-gray-400">
            PTとのメッセージ
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-4">
        {conversations.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-sm text-gray-400">
              まだメッセージはありません
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {conversations.map((conversation) => {
              const otherId =
                conversation.user1_id === user?.id
                  ? conversation.user2_id
                  : conversation.user1_id;

              const profile = profiles[otherId];

              return (
                <Link
                  key={conversation.id}
                  href={`/messages/${otherId}`}
                  className="flex items-center gap-3 border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 last:border-b-0"
                >
                  {profile?.profile_image ? (
                    <img loading="lazy" decoding="async"
                      src={profile.profile_image}
                      alt={profile.full_name || "PT"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-400">
                      PT
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {profile?.full_name || "PTユーザー"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      メッセージを見る
                    </p>
                  </div>

                  <span className="text-gray-300">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}