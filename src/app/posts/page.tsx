"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DISEASE_CATEGORIES } from "@/lib/diseaseCategories";
import { ptNameWithTitle } from "@/lib/format";
import { ACHIEVEMENT_CATEGORY_LABEL } from "@/lib/achievements";
import {
  FeedPost,
  LEVELS,
  LEVEL_SHORT,
  TargetLevel,
  VISIBILITY_LABEL,
  levelOfReader,
  listPosts,
} from "@/lib/posts";

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  qualification: string | null;
  profile_image: string | null;
};

// 学術の投稿（症例・論文・発表・研修）。読む人のレベルに合う投稿だけに絞れる
const ACADEMIC_TYPES: { key: string; label: string }[] = [
  { key: "case", label: "症例報告" },
  { key: "paper", label: ACHIEVEMENT_CATEGORY_LABEL.paper },
  { key: "case_presentation", label: ACHIEVEMENT_CATEGORY_LABEL.case_presentation },
  { key: "conference", label: ACHIEVEMENT_CATEGORY_LABEL.conference },
  { key: "training", label: ACHIEVEMENT_CATEGORY_LABEL.training },
];

const ALL_ACADEMIC = ACADEMIC_TYPES.map((t) => t.key);

export default function AcademicCommunityPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  // 絞り込むレベル。"" = すべて
  const [level, setLevel] = useState<TargetLevel | "">("");
  const [myLevel, setMyLevel] = useState<TargetLevel | null>(null);
  const [levelReady, setLevelReady] = useState(false);

  // 自分のレベル（経験年数・学生かどうか）を調べて、最初は、自分に合うレベルで絞る
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("pt_profiles")
          .select("experience_years, is_student")
          .eq("user_id", user.id)
          .maybeSingle();

        const mine = levelOfReader(data?.experience_years, data?.is_student ?? false);
        setMyLevel(mine);
        if (mine) setLevel(mine);
      }

      setLevelReady(true);
    })();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);

    const rows = await listPosts({
      types: type ? [type] : ALL_ACADEMIC,
      level: level || null,
      limit: 100,
    });
    setPosts(rows);

    const userIds = [...new Set(rows.map((p) => p.user_id).filter((id): id is string => !!id))];

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
  }, [type, level]);

  useEffect(() => {
    if (!levelReady) return;
    load();
  }, [levelReady, load]);

  const keywordLower = keyword.trim().toLowerCase();

  const filteredPosts = useMemo(
    () =>
      posts.filter((p) => {
        if (category && p.disease_category !== category) return false;
        if (!keywordLower) return true;
        return (
          (p.title || "").toLowerCase().includes(keywordLower) ||
          (p.content || "").toLowerCase().includes(keywordLower)
        );
      }),
    [posts, category, keywordLower]
  );

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts" className="text-sm text-gray-400 hover:text-gray-700">
          ← 戻る
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">学術（症例・論文）</h1>

          <Link
            href="/posts/create"
            className="rounded-full bg-relight-gradient px-4 py-2 text-sm font-medium text-white"
          >
            投稿する
          </Link>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          症例報告・論文・発表を、自分のレベルに合うものから探せます
        </p>

        {/* レベル */}
        <p className="mt-5 text-xs font-semibold text-gray-500">レベル</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => setLevel("")} className={chip(level === "")}>
            すべて
          </button>
          {LEVELS.filter((l) => l !== "all").map((l) => (
            <button key={l} onClick={() => setLevel(l)} className={chip(level === l)}>
              {LEVEL_SHORT[l]}
              {myLevel === l ? "（あなた）" : ""}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-400">
          選んだレベル向けの投稿と、「どのレベルでも」の投稿が出ます。
          {!myLevel && "プロフィールに経験年数を入れると、自分のレベルが自動で選ばれます。"}
        </p>

        {/* 種類 */}
        <p className="mt-4 text-xs font-semibold text-gray-500">種類</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => setType("")} className={chip(type === "")}>
            すべて
          </button>
          {ACADEMIC_TYPES.map((t) => (
            <button key={t.key} onClick={() => setType(t.key)} className={chip(type === t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* 疾患分類フィルタ */}
        <p className="mt-4 text-xs font-semibold text-gray-500">疾患分類</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => setCategory("")} className={chip(category === "")}>
            すべて
          </button>

          {DISEASE_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={chip(category === c)}>
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
          aria-label="キーワード検索"
          className="mt-4 w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
        />

        {/* 一覧 */}
        <div className="mt-6 space-y-3">
          {loading && <p className="text-center text-sm text-gray-400">読み込み中…</p>}

          {!loading && filteredPosts.length === 0 && (
            <p className="mt-10 text-center text-sm text-gray-400">条件に一致する投稿が見つかりませんでした</p>
          )}

          {filteredPosts.map((post) => {
            const profile = post.user_id ? profiles[post.user_id] : undefined;
            const kind =
              post.post_type === "case"
                ? "症例報告"
                : (ACHIEVEMENT_CATEGORY_LABEL as Record<string, string>)[post.post_type] ?? "投稿";

            return (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-200"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{kind}</span>
                  {post.disease_category && (
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-relight-blue">
                      {post.disease_category}
                    </span>
                  )}
                  {post.target_level !== "all" && (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {LEVEL_SHORT[post.target_level]}向け
                    </span>
                  )}
                  {post.restricted && (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      🔒 題名のみ（{VISIBILITY_LABEL[post.visibility]}）
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{post.created_at?.slice(0, 10)}</span>
                </div>

                <p className="mt-2 text-base font-semibold text-gray-900">{post.title || "無題の投稿"}</p>

                {post.content && <p className="mt-1 line-clamp-2 text-sm text-gray-500">{post.content}</p>}

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    {post.is_anonymous && !post.is_mine
                      ? "匿名のPT"
                      : profile
                        ? `${ptNameWithTitle(profile.full_name)}${profile.qualification ? `・${profile.qualification}` : ""}`
                        : "PT"}
                  </p>

                  {!post.restricted && (
                    <p className="text-xs text-gray-400">
                      ♡ {post.like_count || 0}　💬 {post.comment_count || 0}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
