"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  user_id: string;
  title?: string | null;
  content: string;
  created_at: string;
  like_count?: number | null;
};

type Profile = {
  user_id: string;
  full_name?: string | null;
  qualification?: string | null;
  profile_image?: string | null;
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      loadPage();
    }
  }, [id]);

  async function loadPage() {
    setLoading(true);
    setNotFound(false);

    const {
      data: { user: userData },
    } = await supabase.auth.getUser();

    setUser(userData);

    const { data: postData, error: postError } =
      await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    console.log("POST DATA", postData);
    console.log("POST ERROR", postError);

    if (postError || !postData) {
      setPost(null);
      setNotFound(true);
      setLoading(false);
      return;
    }

    setPost(postData);

    const { data: profileData, error: profileError } =
      await supabase
        .from("pt_profiles")
        .select(`
          user_id,
          full_name,
          qualification,
          profile_image
        `)
        .eq("user_id", postData.user_id)
        .maybeSingle();

    console.log("POST PROFILE", profileData);
    console.log("PROFILE ERROR", profileError);

    if (profileData) {
      setProfile(profileData);
    }

    if (userData) {
      const { data: likeData } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", id)
        .eq("user_id", userData.id);

      setLiked(!!likeData && likeData.length > 0);
    }

    const { data: allLikes, error: likesError } =
      await supabase
        .from("likes")
        .select("id")
        .eq("post_id", id);

    console.log("LIKES DATA", allLikes);
    console.log("LIKES ERROR", likesError);

    if (!likesError) {
      setPost((prev) =>
        prev
          ? {
              ...prev,
              like_count: allLikes?.length || 0,
            }
          : prev
      );
    }

    const {
      data: commentData,
      error: commentError,
    } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", {
        ascending: false,
      });

    console.log("COMMENT DATA", commentData);
    console.log("COMMENT ERROR", commentError);

    if (!commentError) {
      setComments(commentData || []);
    }

    setLoading(false);
  }

  async function toggleLike() {
    if (!user) {
      alert("ログインしてください");
      return;
    }

    if (!post) {
      return;
    }

    if (liked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", id)
        .eq("user_id", user.id);

      console.log("DELETE LIKE ERROR", error);

      if (error) {
        alert(error.message);
        return;
      }

      setLiked(false);

      setPost((prev) => ({
        ...prev!,
        like_count: Math.max(
          0,
          (prev?.like_count || 0) - 1
        ),
      }));
    } else {
      const { error } = await supabase
        .from("likes")
        .insert({
          user_id: user.id,
          post_id: id,
        });

      console.log("INSERT LIKE ERROR", error);

      if (error) {
        alert(error.message);
        return;
      }

      setLiked(true);

      setPost((prev) => ({
        ...prev!,
        like_count: (prev?.like_count || 0) + 1,
      }));
    }
  }

  async function addComment() {
    if (!user) {
      alert("ログインしてください");
      return;
    }

    const text = commentText.trim();

    if (!text) {
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        user_id: user.id,
        post_id: id,
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
      setComments((prev) => [data, ...prev]);
    }

    setCommentText("");
  }

  async function deleteComment(commentId: string) {
    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", user.id);

    console.log("DELETE COMMENT ERROR", error);

    if (error) {
      alert(error.message);
      return;
    }

    setComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
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

  if (notFound) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">

          <h1 className="text-xl font-semibold">
            この投稿は存在しません
          </h1>

          <p className="mt-3 text-gray-500">
            投稿が削除された可能性があります。
          </p>

          <button
            onClick={() => router.push("/home")}
            className="
              mt-6
              bg-black
              text-white
              rounded-full
              px-6
              py-3
              active:scale-95
              transition
            "
          >
            HOMEへ戻る
          </button>

        </div>
      </main>
    );
  }

  if (!post) {
    return null;
  }

  const isOwner = user?.id === post.user_id;

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">

      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6">

          <Link
            href="/home"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← HOMEへ戻る
          </Link>

          {isOwner && (
            <Link
              href={`/posts/${id}/edit`}
              className="
                text-sm
                border
                rounded-full
                px-4
                py-2
                hover:bg-gray-50
              "
            >
              編集
            </Link>
          )}

        </div>

        <h1 className="text-3xl font-semibold mb-8">
          投稿詳細
        </h1>

        <div className="border rounded-2xl overflow-hidden">

          {/* 投稿者 */}
          {profile ? (
            <Link
              href={`/pts/${profile.user_id}`}
              className="
                flex
                items-center
                gap-3
                px-6
                py-5
                border-b
                hover:bg-gray-50
              "
            >
              {profile.profile_image ? (
                <img
                  src={profile.profile_image}
                  alt={profile.full_name || "プロフィール"}
                  className="
                    w-12
                    h-12
                    rounded-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-gray-400
                  "
                >
                  PT
                </div>
              )}

              <div>

                <p className="font-semibold">
                  {profile.full_name || "PTユーザー"} PT
                </p>

                <p className="text-sm text-gray-500">
                  {profile.qualification || "理学療法士"}
                </p>

              </div>

            </Link>
          ) : null}

          {/* 投稿本文 */}
          <div className="p-6">

            {post.title && (
              <h2 className="text-2xl font-semibold">
                {post.title}
              </h2>
            )}

            <p className="mt-5 whitespace-pre-wrap leading-7">
              {post.content}
            </p>

            {/* いいね */}
            <button
              onClick={toggleLike}
              className="
                mt-8
                border
                rounded-full
                px-6
                py-2
                transition
                active:scale-95
              "
            >
              {liked ? "❤️" : "♡"}{" "}
              {post.like_count || 0}
            </button>

            {/* コメント */}
            <div className="mt-10">

              <h3 className="text-xl font-semibold mb-4">
                コメント
              </h3>

              <div className="flex gap-3">

                <input
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment();
                    }
                  }}
                  placeholder="コメントを書く"
                  className="
                    flex-1
                    border
                    rounded-full
                    px-5
                    py-2
                    outline-none
                    focus:ring-2
                    focus:ring-gray-200
                  "
                />

                <button
                  onClick={addComment}
                  className="
                    bg-black
                    text-white
                    rounded-full
                    px-5
                    transition
                    active:scale-95
                  "
                >
                  送信
                </button>

              </div>

            </div>

            {/* コメント一覧 */}
            <div className="mt-8 space-y-4">

              {comments.length === 0 ? (
                <p className="text-gray-500">
                  まだコメントはありません
                </p>
              ) : (
                comments.map((item) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    currentUserId={user?.id || ""}
                    onDelete={deleteComment}
                  />
                ))
              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

function CommentItem({
  comment,
  currentUserId,
  onDelete,
}: {
  comment: Comment;
  currentUserId: string;
  onDelete: (commentId: string) => void;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadProfile();
  }, [comment.user_id]);

  async function loadProfile() {
    const { data } = await supabase
      .from("pt_profiles")
      .select(`
        user_id,
        full_name,
        profile_image
      `)
      .eq("user_id", comment.user_id)
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
  }

  return (
    <div className="border rounded-xl p-4">

      <div className="flex items-start gap-3">

        <Link href={`/pts/${comment.user_id}`}>

          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt=""
              className="
                w-9
                h-9
                rounded-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-9
                h-9
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
                text-xs
                text-gray-400
              "
            >
              PT
            </div>
          )}

        </Link>

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <Link
              href={`/pts/${comment.user_id}`}
              className="font-semibold hover:underline"
            >
              {profile?.full_name || "ユーザー"}
            </Link>

            {comment.user_id === currentUserId && (
              <button
                onClick={() => onDelete(comment.id)}
                className="
                  text-xs
                  text-gray-400
                  hover:text-red-500
                "
              >
                削除
              </button>
            )}

          </div>

          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {comment.content}
          </p>

        </div>

      </div>

    </div>
  );
}