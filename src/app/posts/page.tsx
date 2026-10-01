"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DISEASE_CATEGORIES } from "@/lib/diseaseCategories";
import { ptNameWithTitle } from "@/lib/format";

type CasePost = {
  id: string;
  user_id: string;
  title: string | null;
  content: string | null;
  disease_category: string | null;
  created_at: string;
  like_count: number | null;
  comment_count: number | null;
};

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  qualification: string | null;
  profile_image: string | null;
};

export default function CaseSearchPage() {
  const [posts, setPosts] = useState<CasePost[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  async function load() {
    setLoading(true);

    let query = supabase
      .from("posts")
      .select(
        "id, user_id, title, content, disease_category, created_at, like_count, comment_count"
      )
      .eq("post_type", "case")
      .order("created_at", { ascending: false })
      .limit(100);

    if (category) {
      query = query.eq("disease_category", category);
    }

    const { data } = await query;
    const rows = (data || []) as CasePost[];
    setPosts(rows);

    const userIds = [...new Set(rows.map((p) => p.user_id))];

    if (userIds.length > 0) {
      const { data: profileData } = await supabase
        .from("pt_profiles")
        .select("id, user_id, full_name, qualification, profile_image")
        .in("user_id", userIds);

      const map: Record<string, Profile> = {};
      (profileData || []).forEach((p) => {
        map[p.user_id] = p;
      });
      setProfiles(map);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const keywordLower = keyword.trim().toLowerCase();
  const filteredPosts = keywordLower
    ? posts.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(keywordLower) ||
          (p.content || "").toLowerCase().includes(keywordLower)
      )
    : posts;

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts" className="text-sm text-gray-400 hover:text-gray-700">
          ← 戻る
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            症例を検索
          </h1>

          <Link
            href="/posts/create"
            className="rounded-full bg-relight-gradient px-4 py-2 text-sm font-medium text-white"
          >
            投稿する
          </Link>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          疾患分類やキーワードから、蓄積された症例報告を探せます
        </p>

        {/* 疾患分類フィルタ */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === ""
                ? "bg-black text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            すべて
          </button>

          {DISEASE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "bg-black text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* キーワード検索 */}
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="タイトル・本文をキーワード検索"
          className="mt-4 w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
        />

        {/* 一覧 */}
        <div className="mt-6 space-y-3">
          {loading && (
            <p className="text-center text-sm text-gray-400">読み込み中…</p>
          )}

          {!loading && filteredPosts.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-400">
              条件に一致する症例が見つかりませんでした
            </p>
          )}

          {filteredPosts.map((post) => {
            const profile = profiles[post.user_id];

            return (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-200"
              >
                <div className="flex items-center gap-2">
                  {post.disease_category && (
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-relight-blue">
                      {post.disease_category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {post.created_at?.slice(0, 10)}
                  </span>
                </div>

                <p className="mt-2 text-base font-semibold text-gray-900">
                  {post.title || "無題の症例報告"}
                </p>

                {post.content && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {post.content}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    {profile ? ptNameWithTitle(profile.full_name) : "PT"}
                    {profile?.qualification ? `・${profile.qualification}` : ""}
                  </p>

                  <p className="text-xs text-gray-400">
                    ♡ {post.like_count || 0}　💬 {post.comment_count || 0}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
