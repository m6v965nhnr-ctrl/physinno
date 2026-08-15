"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

type Profile = {
  full_name: string | null;
  profile_image: string | null;
};

export default function MessagePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;
    let cancelled = false;

    async function start() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) {
        setLoading(false);
        return;
      }

      setUser(user);

      const { data: profileData } = await supabase
        .from("pt_profiles")
        .select("full_name, profile_image")
        .eq("user_id", id)
        .maybeSingle();

      if (!cancelled && profileData) {
        setProfile(profileData);
      }

      const { data: conversationData, error: conversationError } =
        await supabase
          .from("conversations")
          .select("*")
          .or(
            `and(user1_id.eq.${user.id},user2_id.eq.${id}),and(user1_id.eq.${id},user2_id.eq.${user.id})`
          )
          .maybeSingle();

      console.log("CONVERSATION:", conversationData);
      console.log("CONVERSATION ERROR:", conversationError);

      let conversation = conversationData;

      if (!conversation) {
        const { data: newConversation, error: createError } =
          await supabase
            .from("conversations")
            .insert({
              user1_id: user.id,
              user2_id: id,
            })
            .select()
            .single();

        console.log("NEW CONVERSATION:", newConversation);
        console.log("NEW CONVERSATION ERROR:", createError);

        if (createError || !newConversation) {
          setLoading(false);
          return;
        }

        conversation = newConversation;
      }

      if (cancelled) return;

      setConversationId(conversation.id);

      const { data: messageData, error: messageError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation.id)
        .order("created_at", {
          ascending: true,
        });

      console.log("MESSAGES:", messageData);
      console.log("MESSAGES ERROR:", messageError);

      if (!cancelled && messageData) {
        setMessages(messageData);
      }

      setLoading(false);

      /*
       * Realtime
       *
       * .on() を先に設定してから .subscribe() する。
       * これが重要。
       */
      channel = supabase
        .channel(`messages-${conversation.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversation.id}`,
          },
          (payload) => {
            const newMessage = payload.new as Message;

            setMessages((current) => {
              if (current.some((message) => message.id === newMessage.id)) {
                return current;
              }

              return [...current, newMessage];
            });
          }
        );

      channel.subscribe((status) => {
        console.log("MESSAGE REALTIME:", status);
      });
    }

    start();

    return () => {
      cancelled = true;

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [id]);

  async function sendMessage() {
    if (!user || !conversationId || !content.trim() || sending) {
      return;
    }

    setSending(true);

    const text = content.trim();

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: text,
      })
      .select()
      .single();

    console.log("SEND MESSAGE:", data);
    console.log("SEND MESSAGE ERROR:", error);

    if (!error && data) {
      setMessages((current) => {
        if (current.some((message) => message.id === data.id)) {
          return current;
        }

        return [...current, data];
      });

      setContent("");
    }

    setSending(false);
  }

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-sm text-gray-400">読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-32">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-5 py-4">
          <Link
            href="/messages"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
          >
            ←
          </Link>

          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt={profile.full_name || "プロフィール"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-400">
              PT
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {profile?.full_name || "PTユーザー"}
            </p>

            <p className="text-xs text-gray-400">メッセージ</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-sm text-gray-400">
              まだメッセージはありません
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => {
              const mine = message.sender_id === user?.id;

              const previousMessage =
                index > 0 ? messages[index - 1] : null;

              const previousMine =
                previousMessage?.sender_id === message.sender_id;

              const showIcon = !previousMessage || !previousMine;

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${
                    mine ? "justify-end" : "justify-start"
                  }`}
                >
                  {!mine && (
                    <div className="w-8 shrink-0">
                      {showIcon &&
                        (profile?.profile_image ? (
                          <img
                            src={profile.profile_image}
                            alt={profile.full_name || "PT"}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-[9px] text-gray-500">
                            PT
                          </div>
                        ))}
                    </div>
                  )}

                  <div
                    className={`flex max-w-[75%] flex-col ${
                      mine ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                        mine
                          ? "rounded-br-md bg-white text-black border border-gray-200"
                          : "rounded-bl-md bg-black text-white"
                      }`}
                    >
                      {message.content}
                    </div>

                    <span className="mt-0.5 px-1 text-[9px] text-gray-400">
                      {formatTime(message.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="メッセージを入力..."
            className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />

          <button
            onClick={sendMessage}
            disabled={sending || !content.trim()}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {sending ? "送信中..." : "送信"}
          </button>
        </div>
      </div>
    </main>
  );
}