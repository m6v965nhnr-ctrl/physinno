"use client";

import ProfileLink from "@/components/ProfileLink";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { AuthUser } from "@/lib/types";
import { ptName } from "@/lib/format";
import { listMyGroups } from "@/lib/groups";

type GroupRow = {
  id: string;
  name: string;
  lastAt: string | null;
  lastText: string | null;
};

type Conversation = {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  user1_last_read_at: string | null;
  user2_last_read_at: string | null;
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
  const [unreadIds, setUnreadIds] = useState<Set<string>>(new Set());
  // 会話ごとの最新メッセージの時刻（グループと混ぜて新しい順に並べる）
  const [lastAtByConversation, setLastAtByConversation] = useState<Record<string, string>>({});
  // 作った・参加したグループ（メッセージ一覧にグループ名で表示して、そこからチャットできる）
  const [groups, setGroups] = useState<GroupRow[]>([]);
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

    // 参加しているグループと、それぞれの最新メッセージ
    const myGroups = await listMyGroups(user.id);
    if (myGroups.length > 0) {
      const { data: groupMessages } = await supabase
        .from("group_messages")
        .select("group_id, content, created_at")
        .in("group_id", myGroups.map((g) => g.id))
        .order("created_at", { ascending: false })
        .limit(500);

      const latestByGroup: Record<string, { content: string; created_at: string }> = {};
      (groupMessages || []).forEach((m) => {
        if (!latestByGroup[m.group_id]) latestByGroup[m.group_id] = m;
      });

      setGroups(
        myGroups.map((g) => ({
          id: g.id,
          name: g.name,
          lastAt: latestByGroup[g.id]?.created_at ?? g.created_at,
          lastText: latestByGroup[g.id]?.content ?? null,
        }))
      );
    } else {
      setGroups([]);
    }


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

    // 会話ごとの最新メッセージと自分の既読時刻を比べて未読を判定する
    const conversationIds = data.map((c) => c.id);

    if (conversationIds.length > 0) {
      const { data: latestMessages } = await supabase
        .from("messages")
        .select("conversation_id, sender_id, created_at")
        .in("conversation_id", conversationIds)
        .order("created_at", { ascending: false });

      const latestByConversation: Record<
        string,
        { sender_id: string; created_at: string }
      > = {};

      (latestMessages || []).forEach((m) => {
        if (!latestByConversation[m.conversation_id]) {
          latestByConversation[m.conversation_id] = m;
        }
      });

      const unread = new Set<string>();

      data.forEach((c) => {
        const latest = latestByConversation[c.id];
        if (!latest || latest.sender_id === user.id) return;

        const myLastReadAt =
          c.user1_id === user.id
            ? c.user1_last_read_at
            : c.user2_last_read_at;

        if (!myLastReadAt || latest.created_at > myLastReadAt) {
          unread.add(c.id);
        }
      });

      setUnreadIds(unread);

      const lastAt: Record<string, string> = {};
      Object.entries(latestByConversation).forEach(([id, m]) => {
        lastAt[id] = m.created_at;
      });
      setLastAtByConversation(lastAt);
    }


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
            読み込み中…
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
            PTとのメッセージ・参加しているグループ
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-4">
        {conversations.length === 0 && groups.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-sm text-gray-400">
              まだメッセージはありません
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {[
              ...groups.map((g) => ({
                key: `g-${g.id}`,
                at: g.lastAt ?? "",
                node: (
                  <Link
                    key={`g-${g.id}`}
                    href={`/groups/${g.id}`}
                    className="flex items-center gap-3 border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 last:border-b-0"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-relight-gradient text-xl text-white">
                      👥
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">{g.name}</p>
                      <p className="mt-1 truncate text-xs text-gray-400">
                        {g.lastText ?? "グループのチャットを開く"}
                      </p>
                    </div>
                    <span className="text-gray-300">→</span>
                  </Link>
                ),
              })),
              ...conversations.map((conversation) => {
                const otherId =
                  conversation.user1_id === user?.id
                    ? conversation.user2_id
                    : conversation.user1_id;

                const profile = profiles[otherId];
                const unread = unreadIds.has(conversation.id);

                return {
                  key: `c-${conversation.id}`,
                  at: lastAtByConversation[conversation.id] ?? conversation.created_at,
                  node: (
                    <Link
                      key={`c-${conversation.id}`}
                      href={`/messages/${otherId}`}
                      className={`flex items-center gap-3 border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 last:border-b-0 ${
                        unread ? "bg-cyan-50/60" : ""
                      }`}
                    >
                      <ProfileLink userId={otherId} name={profile?.full_name} nested className="shrink-0">
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
                      </ProfileLink>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm text-gray-900 ${
                            unread ? "font-bold" : "font-semibold"
                          }`}
                        >
                          {ptName(profile?.full_name)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          メッセージを見る
                        </p>
                      </div>

                      {unread && (
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                      )}

                      <span className="text-gray-300">
                        →
                      </span>
                    </Link>
                  ),
                };
              }),
            ]
              .sort((x, y) => (y.at > x.at ? 1 : y.at < x.at ? -1 : 0))
              .map((item) => item.node)}
          </div>
        )}
      </div>
    </main>
  );
}