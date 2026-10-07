"use client";

import ProfileLink from "@/components/ProfileLink";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Group,
  GroupMember,
  GroupMessage,
  getGroup,
  isGroupMember,
  joinGroup,
  leaveGroup,
  listGroupMembers,
  listGroupMessages,
  sendGroupMessage,
} from "@/lib/groups";
import { notify } from "@/lib/notify";
import { ptName } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import ReportButton from "@/components/ReportButton";

type Profile = {
  user_id: string;
  full_name: string | null;
  profile_image: string | null;
};

export default function GroupDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [userId, setUserId] = useState<string | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [member, setMember] = useState(false);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function load() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const g = await getGroup(id);
    if (!g) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setGroup(g);

    const isMember = await isGroupMember(id, user.id);
    setMember(isMember);

    if (isMember) {
      const [memberRows, messageRows] = await Promise.all([
        listGroupMembers(id),
        listGroupMessages(id),
      ]);

      setMembers(memberRows);
      setMessages(messageRows);

      const userIds = [...new Set(memberRows.map((m) => m.user_id))];
      if (userIds.length > 0) {
        const { data: profileData } = await supabase
          .from("pt_profiles")
          .select("user_id, full_name, profile_image")
          .in("user_id", userIds);

        const map: Record<string, Profile> = {};
        (profileData || []).forEach((p) => {
          map[p.user_id] = p;
        });
        setProfiles(map);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!member || !id) return;

    const channel = supabase
      .channel(`group-messages-${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "group_messages",
          filter: `group_id=eq.${id}`,
        },
        (payload) => {
          const newMessage = payload.new as GroupMessage;
          setMessages((prev) =>
            prev.some((m) => m.id === newMessage.id)
              ? prev
              : [...prev, newMessage]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [member, id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function handleJoin() {
    if (!userId) return;
    setJoining(true);
    const error = await joinGroup(id, userId);
    setJoining(false);

    if (error) {
      notify(error);
      return;
    }

    await load();
  }

  async function handleLeave() {
    if (!userId || !group) return;
    if (group.owner_id === userId) {
      notify("作成者はグループを退出できません");
      return;
    }

    const error = await leaveGroup(id, userId);
    if (error) {
      notify(error);
      return;
    }

    setMember(false);
  }

  async function handleSend() {
    if (!userId || !content.trim()) return;

    const text = content.trim();
    setContent("");

    const { data, error } = await sendGroupMessage(id, userId, text);
    if (error) {
      notify(error);
      return;
    }

    // リアルタイム配信を待たず、自分の画面には即座に反映する
    if (data) {
      setMessages((prev) =>
        prev.some((m) => m.id === data.id) ? prev : [...prev, data]
      );
    }
  }

  async function handleShare() {
    const link = `${SITE_URL}/groups/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: group?.name, url: link });
        return;
      } catch {
        // キャンセル時はコピーにフォールバック
      }
    }

    try {
      await navigator.clipboard.writeText(link);
      notify("招待リンクをコピーしました");
    } catch {
      notify("コピーに失敗しました");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  if (notFound || !group) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <p className="text-sm text-gray-500">
          このグループは見つかりませんでした
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#fafafa] pb-24">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/groups" className="text-sm text-gray-400 hover:text-gray-700">
            ← グループ一覧
          </Link>

          <button
            onClick={handleShare}
            className="text-sm text-gray-400 hover:text-gray-700"
          >
            招待リンクを共有
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 px-5 py-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-900">{group.name}</h1>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
            {group.is_private ? "非公開" : "公開"}
          </span>
        </div>

        {group.description && (
          <p className="mt-1 text-sm text-gray-500">{group.description}</p>
        )}

        {member && (
          <p className="mt-2 text-xs text-gray-400">
            メンバー {members.length}人
            {group.owner_id !== userId && (
              <button
                onClick={handleLeave}
                className="ml-3 text-red-500 hover:underline"
              >
                退出する
              </button>
            )}
          </p>
        )}

        {!member && (
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <p className="text-sm text-gray-600">
              このグループのメッセージを見るには参加が必要です
            </p>
            <button
              onClick={handleJoin}
              disabled={joining}
              className="mt-4 rounded-full bg-relight-gradient px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {joining ? "参加中…" : "参加する"}
            </button>
          </div>
        )}

        {member && (
          <>
            <div className="mt-6">
              {messages.length === 0 && (
                <p className="text-center text-sm text-gray-400">
                  まだメッセージがありません。最初の投稿をしてみましょう
                </p>
              )}

              {messages.map((m, index) => {
                const isMe = m.user_id === userId;
                const profile = profiles[m.user_id];
                const name = ptName(profile?.full_name ?? null);
                // インスタのように、同じ人が続けて送ったときはアイコンと名前を最初だけ出す
                const previous = index > 0 ? messages[index - 1] : null;
                const firstOfRun = !previous || previous.user_id !== m.user_id;

                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2 ${isMe ? "justify-end" : "justify-start"} ${
                      firstOfRun ? "mt-3" : "mt-0.5"
                    }`}
                  >
                    {!isMe && (
                      <div className="w-8 shrink-0">
                        {firstOfRun && (
                          <ProfileLink userId={m.user_id} name={name}>
                            {profile?.profile_image ? (
                              <img
                                loading="lazy"
                                decoding="async"
                                src={profile.profile_image}
                                alt={name}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-[9px] text-gray-500">
                                PT
                              </div>
                            )}
                          </ProfileLink>
                        )}
                      </div>
                    )}

                    <div className={`flex max-w-[80%] flex-col ${isMe ? "items-end" : "items-start"}`}>
                      {!isMe && firstOfRun && (
                        <p className="flex items-center gap-2 text-[11px] text-gray-400">
                          <ProfileLink userId={m.user_id} name={name}>
                            {name}
                          </ProfileLink>
                        </p>
                      )}
                      <div
                        className={`mt-0.5 whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                          isMe
                            ? "bg-relight-gradient text-white"
                            : "border border-gray-100 bg-white text-gray-900"
                        }`}
                      >
                        {m.content}
                      </div>
                      {!isMe && (
                        <ReportButton
                          targetType="group_message"
                          targetId={m.id}
                          className="mt-0.5 px-1 text-[10px]"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div className="sticky bottom-16 mt-4 flex gap-2 rounded-full border border-gray-200 bg-white p-1.5">
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="メッセージを入力…"
                className="flex-1 rounded-full px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!content.trim()}
                className="shrink-0 rounded-full bg-relight-gradient px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
              >
                送信
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
