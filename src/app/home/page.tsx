
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

type Post = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    id: string;
    full_name: string | null;
    qualification: string | null;
    profile_image: string | null;
  } | null;
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    full_name: string | null;
  } | null;
};

type Like = {
  post_id: string;
  user_id: string;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [comments, setComments] = useState<{
    [key: string]: Comment[];
  }>({});

  const [commentText, setCommentText] = useState<{
    [key: string]: string;
  }>({});

  const [commentsOpen, setCommentsOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const [likes, setLikes] = useState<{
    [key: string]: boolean;
  }>({});

  const [likeCounts, setLikeCounts] = useState<{
    [key: string]: number;
  }>({});

  const [userId, setUserId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHome();
  }, []);

  async function loadHome() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data: followData } = await supabase
      .from("follows")
      .select("followed_user")
      .eq("following_user", user.id);

    const followingIds =
      followData?.map(
        (follow) => follow.followed_user
      ) ?? [];

    const ids = [user.id, ...followingIds];

    const {
      data: postData,
      error: postError,
    } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        created_at,
        user_id
      `)
      .in("user_id", ids)
      .order("created_at", {
        ascending: false,
      });

    console.log("HOME POSTS", postData);
    console.log("HOME ERROR", postError);

    if (!postData) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const postsWithProfiles: Post[] =
      await Promise.all(
        postData.map(async (post) => {
          const { data: profile } =
            await supabase
              .from("pt_profiles")
              .select(`
                id,
                full_name,
                qualification,
                profile_image
              `)
              .eq("user_id", post.user_id)
              .maybeSingle();

          return {
            ...post,
            profiles: profile,
          };
        })
      );

    setPosts(postsWithProfiles);

    const postIds =
      postsWithProfiles.map(
        (post) => post.id
      );

    if (postIds.length > 0) {
      const {
        data: likeData,
        error: likeError,
      } = await supabase
        .from("likes")
        .select("post_id, user_id")
        .in("post_id", postIds);

      console.log("ALL LIKES", likeData);
      console.log("ALL LIKE ERROR", likeError);

      if (!likeError && likeData) {
        const counts: {
          [key: string]: number;
        } = {};

        const myLikes: {
          [key: string]: boolean;
        } = {};

        postIds.forEach((postId) => {
          counts[postId] = 0;
          myLikes[postId] = false;
        });

        likeData.forEach(
          (like: Like) => {
            counts[like.post_id] =
              (counts[like.post_id] ?? 0) + 1;

            if (
              like.user_id === user.id
            ) {
              myLikes[
                like.post_id
              ] = true;
            }
          }
        );

        setLikeCounts(counts);
        setLikes(myLikes);
      }
    }

    for (
      const post of postsWithProfiles
    ) {
      await loadComments(post.id);
    }

    setLoading(false);
  }

  async function toggleLike(
    postId: string
  ) {
    if (!userId) {
      return;
    }

    const liked =
      likes[postId] ?? false;

    if (liked) {
      const { error } =
        await supabase
          .from("likes")
          .delete()
          .eq(
            "post_id",
            postId
          )
          .eq(
            "user_id",
            userId
          );

      console.log(
        "LIKE DELETE ERROR",
        error
      );

      if (error) {
        return;
      }

      setLikes((prev) => ({
        ...prev,
        [postId]: false,
      }));

      setLikeCounts((prev) => ({
        ...prev,
        [postId]: Math.max(
          0,
          (prev[postId] ?? 0) - 1
        ),
      }));
    } else {
      const { error } =
        await supabase
          .from("likes")
          .insert({
            post_id: postId,
            user_id: userId,
          });

      console.log(
        "LIKE INSERT ERROR",
        error
      );

      if (error) {
        return;
      }

      setLikes((prev) => ({
        ...prev,
        [postId]: true,
      }));

      setLikeCounts((prev) => ({
        ...prev,
        [postId]:
          (prev[postId] ?? 0) + 1,
      }));
    }
  }

  async function loadComments(
    postId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("comments")
      .select("*")
      .eq(
        "post_id",
        postId
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

    console.log("COMMENTS", data);
    console.log("COMMENT ERROR", error);

    if (!data) {
      setComments((prev) => ({
        ...prev,
        [postId]: [],
      }));

      return;
    }

    const commentsWithProfiles: Comment[] =
      await Promise.all(
        data.map(
          async (comment) => {
            const {
              data: profile,
            } = await supabase
              .from("pt_profiles")
              .select("full_name")
              .eq(
                "user_id",
                comment.user_id
              )
              .maybeSingle();

            return {
              ...comment,
              profiles: profile,
            };
          }
        )
      );

    setComments((prev) => ({
      ...prev,
      [postId]:
        commentsWithProfiles,
    }));
  }

  async function addComment(
    postId: string
  ) {
    if (!userId) {
      return;
    }

    const text =
      commentText[postId] ?? "";

    if (
      text.trim() === ""
    ) {
      return;
    }

    const { error } =
      await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: userId,
          content:
            text.trim(),
        });

    console.log(
      "ADD COMMENT ERROR",
      error
    );

    if (error) {
      return;
    }

    setCommentText(
      (prev) => ({
        ...prev,
        [postId]: "",
      })
    );

    await loadComments(
      postId
    );
  }

  function toggleComments(
    postId: string
  ) {
    setCommentsOpen(
      (prev) => ({
        ...prev,
        [postId]:
          !(prev[postId] ?? false),
      })
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-sm text-gray-400">
          読み込み中...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24">

      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">

        <div className="max-w-xl mx-auto px-5 py-4 flex items-center justify-between">

          <h1 className="text-xl font-semibold tracking-tight">
            Physinno
          </h1>

          <span className="text-xs text-gray-400">
            PT community
          </span>

        </div>

      </header>

      {/* フィード */}
      <div className="max-w-xl mx-auto px-3 sm:px-4 py-5">

        {posts.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl px-6 py-12 text-center shadow-sm">

            <p className="text-sm text-gray-400">
              投稿がありません
            </p>

            <Link
              href="/posts/create"
              className="inline-block mt-4 text-sm font-medium underline underline-offset-4"
            >
              最初の投稿をする
            </Link>

          </div>
        )}

        <div className="space-y-4">

          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            >

              {/* 投稿者 */}
              <Link
                href={`/pts/${post.user_id}`}
                className="flex items-center gap-3 px-4 py-4 transition hover:bg-gray-50"
              >

                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">

                  {post.profiles?.profile_image ? (
                    <img
                      src={
                        post.profiles
                          .profile_image
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-400">
                      PT
                    </span>
                  )}

                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-gray-900">
                    {post.profiles?.full_name ??
                      "PTユーザー"}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {post.profiles?.qualification ??
                      "理学療法士"}
                  </p>

                </div>

              </Link>

              {/* 投稿本文 */}
              <Link
                href={`/posts/${post.id}`}
                className="block px-4 pb-5"
              >

                <p className="whitespace-pre-wrap text-[15px] leading-7 text-gray-800">
                  {post.content}
                </p>

              </Link>

              {/* アクション */}
              <div className="border-t border-gray-100 px-4 py-3">

                <div className="flex items-center gap-5">

                  <button
                    onClick={() =>
                      toggleLike(
                        post.id
                      )
                    }
                    className="flex items-center gap-1.5 text-sm transition active:scale-90"
                    aria-label="いいね"
                  >

                    <span className="text-xl leading-none">
                      {likes[
                        post.id
                      ]
                        ? "❤️"
                        : "♡"}
                    </span>

                    <span className="text-gray-500">
                      {likeCounts[
                        post.id
                      ] ?? 0}
                    </span>

                  </button>

                  <button
                    onClick={() =>
                      toggleComments(
                        post.id
                      )
                    }
                    className="flex items-center gap-1.5 text-sm text-gray-500 transition active:scale-95"
                    aria-label="コメント"
                  >

                    <span className="text-base">
                      💬
                    </span>

                    <span>
                      {comments[
                        post.id
                      ]?.length ?? 0}
                    </span>

                  </button>

                  <Link
                    href={`/posts/${post.id}`}
                    className="ml-auto text-xs text-gray-400"
                  >
                    詳細を見る →
                  </Link>

                </div>

              </div>

              {/* コメント */}
              {commentsOpen[
                post.id
              ] && (
                <div className="border-t border-gray-100 bg-[#fafafa]">

                  <div className="px-4 pt-3">

                    {(
                      comments[
                        post.id
                      ]?.length ?? 0
                    ) === 0 ? (
                      <p className="py-2 text-sm text-gray-400">
                        まだコメントはありません
                      </p>
                    ) : (
                      comments[
                        post.id
                      ]?.map(
                        (comment) => (
                          <div
                            key={
                              comment.id
                            }
                            className="border-b border-gray-100 py-2.5 last:border-0"
                          >

                            <Link
                              href={`/pts/${comment.user_id}`}
                              className="mr-2 text-sm font-semibold text-gray-800"
                            >
                              {comment.profiles?.full_name ??
                                "ユーザー"}
                            </Link>

                            <span className="break-words text-sm text-gray-600">
                              {
                                comment.content
                              }
                            </span>

                          </div>
                        )
                      )
                    )}

                  </div>

                  {/* コメント入力 */}
                  <div className="border-t border-gray-100 bg-white px-4 py-3">

                    <div className="flex gap-2">

                      <input
                        value={
                          commentText[
                            post.id
                          ] ?? ""
                        }
                        onChange={(e) =>
                          setCommentText(
                            (prev) => ({
                              ...prev,
                              [post.id]:
                                e.target
                                  .value,
                            })
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key ===
                            "Enter"
                          ) {
                            e.preventDefault();

                            addComment(
                              post.id
                            );
                          }
                        }}
                        placeholder="コメントを書く..."
                        className="
                          min-w-0
                          flex-1
                          rounded-full
                          border
                          border-gray-200
                          bg-gray-50
                          px-4
                          py-2.5
                          text-sm
                          outline-none
                          transition
                          focus:border-gray-300
                          focus:bg-white
                        "
                      />

                      <button
                        onClick={() =>
                          addComment(
                            post.id
                          )
                        }
                        className="
                          shrink-0
                          rounded-full
                          bg-black
                          px-4
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-gray-800
                          active:scale-95
                        "
                      >
                        送信
                      </button>

                    </div>

                  </div>

                </div>
              )}

            </article>
          ))}

        </div>

      </div>

      <BottomNav />

    </main>
  );
}