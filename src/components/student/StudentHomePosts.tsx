"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ACHIEVEMENT_CATEGORY_LABEL } from "@/lib/achievements";
import { FeedPost, listPosts } from "@/lib/posts";
import { ptNameWithTitle } from "@/lib/format";

// 学生ホームに、PTの最新の投稿（公開されているもの）を出す。学生も、PTの投稿を読める
export default function StudentHomePosts() {
  const [posts, setPosts] = useState<FeedPost[] | null>(null);
  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    listPosts({ limit: 3 }).then(async (rows) => {
      const visible = rows.filter((p) => !p.restricted);
      setPosts(visible);
      const ids = [...new Set(visible.map((p) => p.user_id).filter((id): id is string => !!id))];
      if (ids.length > 0) {
        const { data } = await supabase.from("pt_profiles").select("user_id, full_name").in("user_id", ids);
        setNames(Object.fromEntries((data ?? []).map((p) => [p.user_id, p.full_name ?? ""])));
      }
    });
  }, []);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">PTの最新の投稿</p>
        <Link href="/home" className="text-xs text-gray-500">
          ホームですべて見る →
        </Link>
      </div>

      {posts === null ? (
        <p className="mt-3 text-sm text-gray-500">読み込み中…</p>
      ) : posts.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">まだ、投稿はありません。</p>
      ) : (
        <ul className="mt-3 divide-y divide-gray-100">
          {posts.map((p) => {
            const kind = p.post_type === "case" ? "症例報告" : (ACHIEVEMENT_CATEGORY_LABEL as Record<string, string>)[p.post_type] ?? "投稿";
            return (
              <li key={p.id}>
                <Link href={`/posts/${p.id}`} className="block py-2.5">
                  <p className="text-[11px] text-gray-500">
                    <span className="mr-1.5 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">{kind}</span>
                    {p.is_anonymous ? "匿名のPT" : p.user_id && names[p.user_id] ? ptNameWithTitle(names[p.user_id]) : "PT"}
                    ・{p.created_at?.slice(0, 10)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-900">{p.title || p.content || "投稿"}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
