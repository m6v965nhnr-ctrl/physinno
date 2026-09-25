"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  AchievementCategory,
} from "@/lib/achievements";
import { notify } from "@/lib/notify";

type Post = {
  id: string;
  user_id: string;
  title?: string | null;
  content: string;
  created_at: string;
  image_url?: string | null;
  video_url?: string | null;
  post_type?: string | null;
  disease_category?: string | null;
  reference_url?: string | null;
  conference_name?: string | null;
};

function isAchievementPostType(
  postType: string | null | undefined
): postType is AchievementCategory {
  return !!postType && (ACHIEVEMENT_CATEGORIES as string[]).includes(postType);
}

type Profile = {
  id?: string;
  user_id: string;
  full_name?: string | null;
  qualification?: string | null;
  profile_image?: string | null;
};

type Like = {
  id: string;
  post_id: string;
  user_id: string;
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

// 一度に読み込む投稿数（それ以上は「もっと見る」で追加取得）
const PAGE_SIZE = 30;

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [likes, setLikes] = useState<Record<string, Like[]>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>(
    {}
  );
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [userId, setUserId] = useState("");

  // 投稿に紐づくプロフィール・いいね・コメントを並列で取得して state に統合する
  async function hydrate(postData: Post[]) {
    if (postData.length === 0) return;

    const userIds = [...new Set(postData.map((post) => post.user_id))];
    const postIds = postData.map((post) => post.id);

    const [profileRes, likeRes, commentRes] = await Promise.all([
      supabase
        .from("pt_profiles")
        .select("id, user_id, full_name, qualification, profile_image")
        .in("user_id", userIds),
      supabase.from("likes").select("id, post_id, user_id").in("post_id", postIds),
      supabase
        .from("comments")
        .select("*")
        .in("post_id", postIds)
        .order("created_at", { ascending: true }),
    ]);

    setProfiles((prev) => {
      const next = { ...prev };
      (profileRes.data || []).forEach((profile) => {
        next[profile.user_id] = profile;
      });
      return next;
    });

    const likeMap: Record<string, Like[]> = {};
    const commentMap: Record<string, Comment[]> = {};
    const commentCountMap: Record<string, number> = {};

    postIds.forEach((postId) => {
      likeMap[postId] = [];
      commentMap[postId] = [];
      commentCountMap[postId] = 0;
    });

    (likeRes.data || []).forEach((like) => {
      likeMap[like.post_id]?.push(like);
    });

    (commentRes.data || []).forEach((comment) => {
      commentMap[comment.post_id]?.push(comment);
      commentCountMap[comment.post_id] += 1;
    });

    setLikes((prev) => ({ ...prev, ...likeMap }));
    setComments((prev) => ({ ...prev, ...commentMap }));
    setCommentCounts((prev) => ({ ...prev, ...commentCountMap }));
  }

  // 投稿を PAGE_SIZE 件ずつ新しい順に取得する（before: これより古い投稿だけ）
  async function fetchPostPage(before?: string) {
    let query = supabase
      .from("posts")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE);

    if (before) {
      query = query.lt("created_at", before);
    }

    const { data } = await query;
    return (data || []) as Post[];
  }

  async function loadHome() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setUserId(user.id);

    const firstPage = await fetchPostPage();

    setPosts(firstPage);
    setHasMore(firstPage.length === PAGE_SIZE);

    await hydrate(firstPage);

    setLoading(false);
  }

  async function loadMore() {
    const last = posts[posts.length - 1];

    if (!last || loadingMore) return;

    setLoadingMore(true);

    const nextPage = await fetchPostPage(last.created_at);

    setPosts((prev) => [...prev, ...nextPage]);
    setHasMore(nextPage.length === PAGE_SIZE);

    await hydrate(nextPage);

    setLoadingMore(false);
  }

  useEffect(() => {
    loadHome();
  }, []);

  async function toggleLike(postId: string) {
    if (!userId) {
      return;
    }

    const currentLikes = likes[postId] || [];

    const myLike = currentLikes.find((like) => like.user_id === userId);

    if (myLike) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", myLike.id);

      if (error) {
        notify(error.message);
        return;
      }


      setLikes((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(
          (like) => like.id !== myLike.id
        ),
      }));

      return;
    }

    const { data, error } = await supabase
      .from("likes")
      .insert({
        post_id: postId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      notify(error.message);
      return;
    }

    if (!data) {
      return;
    }

    setLikes((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), data],
    }));

    // ========================================
    // いいね通知
    // ========================================

    const targetPost = posts.find((post) => post.id === postId);

    if (!targetPost) {
      return;
    }

    // 自分の投稿には通知しない
    if (targetPost.user_id === userId) {
      return;
    }

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: targetPost.user_id,
        actor_id: userId,
        type: "like",
        post_id: postId,
        is_read: false,
      });
  }

  async function loadComments(postId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      return;
    }

    setComments((prev) => ({
      ...prev,
      [postId]: data || [],
    }));

    setCommentCounts((prev) => ({
      ...prev,
      [postId]: data?.length || 0,
    }));
  }

  async function addComment(postId: string) {
    const text = commentText[postId]?.trim();

    if (!text || !userId) {
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: userId,
        content: text,
      })
      .select()
      .single();


    if (error) {
      notify(error.message);
      return;
    }

    if (data) {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data],
      }));

      setCommentCounts((prev) => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1,
      }));
    }
    // ========================================
// コメント通知
// ========================================

const targetPost = posts.find((post) => post.id === postId);

if (targetPost && targetPost.user_id !== userId) {
  const { error: notificationError } = await supabase
    .from("notifications")
    .insert({
      user_id: targetPost.user_id,
      actor_id: userId,
      type: "comment",
      post_id: postId,
      is_read: false,
    });

}

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));
  }

  async function deleteComment(postId: string, commentId: string) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", userId);

    if (error) {
      notify(error.message);
      return;
    }

    setComments((prev) => ({
      ...prev,
      [postId]: (prev[postId] || []).filter(
        (comment) => comment.id !== commentId
      ),
    }));

    setCommentCounts((prev) => ({
      ...prev,
      [postId]: Math.max(0, (prev[postId] || 0) - 1),
    }));
  }

  async function deletePost(postId: string) {
    if (!userId) {
      return;
    }

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("user_id", userId);

    if (error) {
      notify(error.message);
      return;
    }

    setPosts((prev) => prev.filter((post) => post.id !== postId));

    setLikes((prev) => {
      const next = { ...prev };
      delete next[postId];
      return next;
    });

    setComments((prev) => {
      const next = { ...prev };
      delete next[postId];
      return next;
    });

    setCommentCounts((prev) => {
      const next = { ...prev };
      delete next[postId];
      return next;
    });
  }

  function getProfile(profileUserId: string) {
    return (
      profiles[profileUserId] || {
        user_id: profileUserId,
        full_name: "PTユーザー",
        qualification: "理学療法士",
        profile_image: null,
      }
    );
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-xl mx-auto">
        {/* ヘッダー */}
        <header className="sticky top-0 z-10 bg-white border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Re:light</h1>

            <p className="text-sm text-gray-500">Platform for PT</p>
          </div>
        </header>

        {/* 投稿一覧 */}
        <div className="space-y-4 py-4">
          {posts.length === 0 ? (
            <div className="bg-white px-5 py-12 text-center">
              <p className="text-gray-400">まだ投稿がありません</p>
            </div>
          ) : (
            posts.map((post) => {
              const profile = getProfile(post.user_id);
              const postLikes = likes[post.id] || [];

              const myLike = postLikes.some(
                (like) => like.user_id === userId
              );

              const postComments = comments[post.id] || [];
              const postCommentCount = commentCounts[post.id] || 0;

              return (
                <article
                  key={post.id}
                  className="bg-white border-y"
                >
                  {/* 投稿者 */}
                  <div className="flex items-center gap-3 px-5 py-4">
                    <AvatarLink profile={profile}>
                      {profile.profile_image ? (
                        <img loading="lazy" decoding="async"
                          src={profile.profile_image}
                          alt={profile.full_name || ""}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                          👤
                        </div>
                      )}
                    </AvatarLink>

                    <div className="flex-1">
                      <p className="font-semibold">
                        {profile.full_name || "PTユーザー"} PT
                      </p>

                      <p className="text-xs text-gray-500">
                        {profile.qualification || "理学療法士"}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400">
                        {formatDate(post.created_at)}
                      </p>
                    </div>

                    {/* 自分の投稿だけ削除 */}
                    {post.user_id === userId && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-xs text-gray-400 hover:text-red-500!"
                      >
                        削除
                      </button>
                    )}
                  </div>

                  {/* 投稿内容 */}
                  <div className="px-5 pb-4">
                    <Link
                      href={`/posts/${post.id}`}
                      className="block"
                    >
                      {/* 症例報告 */}
                      {post.post_type === "case" && (
                        <div className="mb-2 flex items-center gap-2 -ml-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                            症例報告
                          </span>

                          {post.disease_category && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                              {post.disease_category}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 実績（学会発表・院内症例発表など） */}
                      {isAchievementPostType(post.post_type) && (
                        <div className="mb-2 flex flex-wrap items-center gap-2 -ml-2">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                            {ACHIEVEMENT_CATEGORY_LABEL[post.post_type]}
                          </span>

                          {post.conference_name && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                              {post.conference_name}
                            </span>
                          )}

                          {post.disease_category && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                              {post.disease_category}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 通常投稿の疾患分類 */}
                      {post.post_type === "normal" &&
                        post.disease_category && (
                          <div className="mb-2 flex items-center gap-2 -ml-2">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                              {post.disease_category}
                            </span>
                          </div>
                        )}

                      {post.title && (
                        <h2 className="font-semibold text-lg mb-2">
                          {post.title}
                        </h2>
                      )}

                      {post.content && (
                        <p className="whitespace-pre-wrap leading-7">
                          {post.content}
                        </p>
                      )}

                      {/* 写真 */}
                      {post.image_url && (
                        <img loading="lazy" decoding="async"
                          src={post.image_url}
                          alt="投稿画像"
                          className="mt-4 w-full max-h-[600px] rounded-xl object-cover"
                        />
                      )}

                      {/* 動画 */}
                      {post.video_url && (
                        <video
                          src={post.video_url}
                          controls
                          playsInline
                          className="mt-4 w-full max-h-[600px] rounded-xl"
                        />
                      )}
                    </Link>

                    {/* 添付資料・参考URL */}
                    {(post.image_url || post.reference_url) && (
                      <div className="mt-3 space-y-2">
                        {post.image_url && (
                          <a
                            href={post.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="block w-fit rounded-lg border bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                          >
                            📄 添付資料を開く
                          </a>
                        )}

                        {post.reference_url && (
                          <a
                            href={post.reference_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="block w-fit rounded-lg border bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                          >
                            🔗 参考URLを開く
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* アクション */}
                  <div className="px-5 py-3 border-t">
                    <div className="flex items-center gap-5">
                      {/* いいね */}
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1 active:scale-95 transition"
                      >
                        <span className="text-2xl">
                          {myLike ? "❤️" : "🤍"}
                        </span>

                        <span className="text-sm">
                          いいね {postLikes.length}
                        </span>
                      </button>

                      {/* コメント */}
                      <button
                        onClick={() => loadComments(post.id)}
                        className="flex items-center gap-1 active:scale-95 transition"
                      >
                        <span className="text-2xl">💬</span>

                        <span className="text-sm">
                          コメント {postCommentCount}
                        </span>
                      </button>
                    </div>

                    {/* コメント */}
                    {comments[post.id] !== undefined && (
                      <div className="mt-4 space-y-3">
                        {postComments.length === 0 ? (
                          <p className="text-sm text-gray-400">
                            まだコメントはありません
                          </p>
                        ) : (
                          postComments.map((comment) => {
                            const commentProfile = getProfile(
                              comment.user_id
                            );

                            return (
                              <div
                                key={comment.id}
                                className="flex items-start gap-3"
                              >
                                {commentProfile.profile_image ? (
                                  <img loading="lazy" decoding="async"
                                    src={commentProfile.profile_image}
                                    alt=""
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                    👤
                                  </div>
                                )}

                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">
                                      {commentProfile.full_name ||
                                        "PTユーザー"}{" "}
                                      PT
                                    </span>

                                    {comment.user_id === userId && (
                                      <button
                                        onClick={() =>
                                          deleteComment(
                                            post.id,
                                            comment.id
                                          )
                                        }
                                        className="text-xs text-gray-400 hover:text-red-500!"
                                      >
                                        削除
                                      </button>
                                    )}
                                  </div>

                                  <p className="text-sm mt-1">
                                    {comment.content}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}

                        {/* コメント入力 */}
                        <div className="flex gap-2">
                          <input
                            value={commentText[post.id] || ""}
                            onChange={(event) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [post.id]: event.target.value,
                              }))
                            }
                            placeholder="コメントを入力..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm"
                           aria-label="コメントを入力..."/>

                          <button
                            onClick={() => addComment(post.id)}
                            className="px-4 py-2 rounded-full bg-black text-white text-sm"
                          >
                            送信
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}

          {hasMore && (
            <div className="px-5 py-2">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="w-full rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {loadingMore ? "読み込み中..." : "もっと見る"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// 投稿者アイコン用のリンク。pt_profiles が見つかっている場合のみ本人ページへ遷移させる
function AvatarLink({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  if (!profile.id) {
    return <>{children}</>;
  }

  return <Link href={`/pts/${profile.id}`}>{children}</Link>;
}