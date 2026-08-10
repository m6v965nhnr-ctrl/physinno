"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

type Post = {
  id: string;
  user_id: string;
  title?: string | null;
  content: string;
  created_at: string;
};

type Profile = {
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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [likes, setLikes] = useState<Record<string, Like[]>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadHome();
  }, []);

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

    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("HOME POSTS", postData);
    console.log("HOME POST ERROR", postError);

    if (!postData) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setPosts(postData);

    const userIds = [
      ...new Set(postData.map((post) => post.user_id)),
    ];

    if (userIds.length > 0) {
      const { data: profileData } = await supabase
        .from("pt_profiles")
        .select("user_id, full_name, qualification, profile_image")
        .in("user_id", userIds);

      const profileMap: Record<string, Profile> = {};

      (profileData || []).forEach((profile) => {
        profileMap[profile.user_id] = profile;
      });

      setProfiles(profileMap);
    }

    const postIds = postData.map((post) => post.id);

    if (postIds.length > 0) {
      // =========================
      // いいね取得
      // =========================
      const { data: likeData, error: likeError } = await supabase
        .from("likes")
        .select("*")
        .in("post_id", postIds);

      console.log("HOME LIKES", likeData);
      console.log("HOME LIKE ERROR", likeError);

      const likeMap: Record<string, Like[]> = {};

      postIds.forEach((postId) => {
        likeMap[postId] = [];
      });

      (likeData || []).forEach((like) => {
        if (!likeMap[like.post_id]) {
          likeMap[like.post_id] = [];
        }

        likeMap[like.post_id].push(like);
      });

      setLikes(likeMap);

      // =========================
      // コメント取得
      // =========================
      const { data: commentData, error: commentError } =
        await supabase
          .from("comments")
          .select("*")
          .in("post_id", postIds)
          .order("created_at", {
            ascending: true,
          });

      console.log("HOME COMMENTS", commentData);
      console.log("HOME COMMENT ERROR", commentError);

      const commentMap: Record<string, Comment[]> = {};
      const commentCountMap: Record<string, number> = {};

      postIds.forEach((postId) => {
        commentMap[postId] = [];
        commentCountMap[postId] = 0;
      });

      (commentData || []).forEach((comment) => {
        if (!commentMap[comment.post_id]) {
          commentMap[comment.post_id] = [];
        }

        commentMap[comment.post_id].push(comment);

        commentCountMap[comment.post_id] =
          (commentCountMap[comment.post_id] || 0) + 1;
      });

      setComments(commentMap);
      setCommentCounts(commentCountMap);
    }

    setLoading(false);
  }

  async function toggleLike(postId: string) {
    if (!userId) {
      return;
    }

    const currentLikes = likes[postId] || [];

    const myLike = currentLikes.find(
      (like) => like.user_id === userId
    );

    if (myLike) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", myLike.id);

      if (error) {
        alert(error.message);
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
      alert(error.message);
      return;
    }

    if (data) {
      setLikes((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data],
      }));
    }
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
      console.log("COMMENTS ERROR", error.message);
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

    console.log("COMMENT INSERT DATA", data);
    console.log("COMMENT INSERT ERROR", error);

    if (error) {
      alert(error.message);
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

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));
  }

  async function deleteComment(
    postId: string,
    commentId: string
  ) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", userId);

    if (error) {
      alert(error.message);
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
      [postId]: Math.max(
        0,
        (prev[postId] || 0) - 1
      ),
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
      alert(error.message);
      return;
    }

    setPosts((prev) =>
      prev.filter((post) => post.id !== postId)
    );

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

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">

      <div className="max-w-xl mx-auto">

        {/* ヘッダー */}
        <header className="sticky top-0 z-10 bg-white border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              Physinno
            </h1>

            <p className="text-sm text-gray-500">
              Platform for PT
            </p>
          </div>
        </header>

        {/* 投稿一覧 */}
        <div className="space-y-4 py-4">

          {posts.length === 0 ? (
            <div className="bg-white px-5 py-12 text-center">
              <p className="text-gray-400">
                まだ投稿がありません
              </p>
            </div>
          ) : (
            posts.map((post) => {

              const profile = getProfile(post.user_id);
              const postLikes = likes[post.id] || [];

              const myLike = postLikes.some(
                (like) => like.user_id === userId
              );

              const postComments = comments[post.id] || [];
              const postCommentCount =
                commentCounts[post.id] || 0;

              return (
                <article
                  key={post.id}
                  className="bg-white border-y"
                >

                  {/* 投稿者 */}
                  <div className="flex items-center gap-3 px-5 py-4">

                    <Link href={`/pts/${post.user_id}`}>

                      {profile.profile_image ? (
                        <img
                          src={profile.profile_image}
                          alt={profile.full_name || ""}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                          👤
                        </div>
                      )}

                    </Link>

                    <div className="flex-1">

                      <p className="font-semibold">
                        {profile.full_name || "PTユーザー"} PT
                      </p>

                      <p className="text-xs text-gray-500">
                        {profile.qualification || "理学療法士"}
                      </p>

                    </div>

                    {/* 自分の投稿だけ削除 */}
                    {post.user_id === userId && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >
                        削除
                      </button>
                    )}

                  </div>

                  {/* 投稿内容 */}
                  <Link href={`/posts/${post.id}`}>
                    <div className="px-5 pb-4">

                      {post.title && (
                        <h2 className="font-semibold text-lg mb-2">
                          {post.title}
                        </h2>
                      )}

                      <p className="whitespace-pre-wrap leading-7">
                        {post.content}
                      </p>

                    </div>
                  </Link>

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
                        <span className="text-2xl">
                          💬
                        </span>

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

                            const commentProfile =
                              getProfile(comment.user_id);

                            return (
                              <div
                                key={comment.id}
                                className="flex items-start gap-3"
                              >

                                {commentProfile.profile_image ? (
                                  <img
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
                                      {commentProfile.full_name || "PTユーザー"} PT
                                    </span>

                                    {comment.user_id === userId && (
                                      <button
                                        onClick={() =>
                                          deleteComment(
                                            post.id,
                                            comment.id
                                          )
                                        }
                                        className="text-xs text-gray-400 hover:text-red-500"
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
                            onChange={(e) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            placeholder="コメントを入力..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm"
                          />

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

        </div>

      </div>

      <BottomNav />

    </main>
  );
}