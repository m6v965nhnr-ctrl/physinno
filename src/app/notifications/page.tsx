"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ptName } from "@/lib/format";

type NotificationType = "like" | "comment" | "follow";

type NotificationRow = {
  id: string;
  actor_id: string | null;
  type: string;
  post_id: string | null;
  is_read: boolean;
  created_at: string;
};

type ActorProfile = {
  id: string;
  user_id: string;
  full_name: string | null;
  profile_image: string | null;
};

type PostInfo = {
  id: string;
  title: string | null;
};

const TYPE_LABEL: Record<NotificationType, string> = {
  like: "さんがあなたの投稿にいいねしました",
  comment: "さんがあなたの投稿にコメントしました",
  follow: "さんがあなたをフォローしました",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [actors, setActors] = useState<Record<string, ActorProfile>>({});
  const [posts, setPosts] = useState<Record<string, PostInfo>>({});
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("notifications")
      .select("id, actor_id, type, post_id, is_read, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    const rows = (data || []) as NotificationRow[];
    setNotifications(rows);
    setLoading(false);

    const actorIds = Array.from(
      new Set(rows.map((n) => n.actor_id).filter(Boolean))
    ) as string[];

    if (actorIds.length > 0) {
      const { data: profileData } = await supabase
        .from("pt_profiles")
        .select("id, user_id, full_name, profile_image")
        .in("user_id", actorIds);

      const map: Record<string, ActorProfile> = {};
      (profileData || []).forEach((p) => {
        map[p.user_id] = p;
      });
      setActors(map);
    }

    const postIds = Array.from(
      new Set(rows.map((n) => n.post_id).filter(Boolean))
    ) as string[];

    if (postIds.length > 0) {
      const { data: postData } = await supabase
        .from("posts")
        .select("id, title")
        .in("id", postIds);

      const map: Record<string, PostInfo> = {};
      (postData || []).forEach((p) => {
        map[p.id] = p;
      });
      setPosts(map);
    }

    const unreadIds = rows.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length > 0) {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .in("id", unreadIds);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold text-gray-900">通知</h1>
      </header>

      <div className="mx-auto max-w-xl px-5 py-6">
        {loading && (
          <p className="text-center text-sm text-gray-400">読み込み中…</p>
        )}

        {!loading && notifications.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-400">
            まだ通知はありません
          </p>
        )}

        <div className="space-y-2">
          {notifications.map((n) => {
            const actor = n.actor_id ? actors[n.actor_id] : null;
            const name = ptName(actor?.full_name ?? null);
            const post = n.post_id ? posts[n.post_id] : null;
            const label = TYPE_LABEL[n.type as NotificationType] || "の通知";

            const body = (
              <div
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                  n.is_read
                    ? "border-gray-100 bg-white"
                    : "border-relight bg-cyan-50"
                }`}
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  {actor?.profile_image ? (
                    <img
                      loading="lazy"
                      decoding="async"
                      src={actor.profile_image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-300">
                      👤
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{name}</span>
                    {label}
                  </p>
                  {post?.title && (
                    <p className="mt-0.5 truncate text-xs text-gray-400">
                      {post.title}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-gray-400">
                    {n.created_at?.slice(0, 10)}
                  </p>
                </div>
              </div>
            );

            if (n.type === "follow" && actor) {
              return (
                <Link key={n.id} href={`/pts/${actor.id}`}>
                  {body}
                </Link>
              );
            }

            if (n.post_id) {
              return (
                <Link key={n.id} href={`/posts/${n.post_id}`}>
                  {body}
                </Link>
              );
            }

            return <div key={n.id}>{body}</div>;
          })}
        </div>
      </div>
    </main>
  );
}
