"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { AuthUser } from "@/lib/types";
import { notify } from "@/lib/notify";
import { ptNameWithTitle } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import ReportButton from "@/components/ReportButton";
import {
  FeedComment,
  FeedPost,
  LEVEL_SHORT,
  VISIBILITY_LABEL,
  getPost,
  listComments,
  notifyPostAuthor,
} from "@/lib/posts";

type Post = FeedPost;

type Profile = {
  id: string;
  user_id: string;
  full_name?: string | null;
  qualification?: string | null;
  profile_image?: string | null;
};

type Comment = FeedComment;

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const incomingRef = searchParams.get("ref");

  const [post, setPost] = useState<Post | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  async function loadPage() {
    setLoading(true);
    setNotFound(false);

    const {
      data: { user: userData },
    } = await supabase.auth.getUser();

    setUser(userData);

    // 公開範囲の外の人には、題名だけ(または何も)返ってくる。匿名の投稿には、作者の情報が付かない
    const postData = await getPost(id);

    if (!postData) {
      setPost(null);
      setNotFound(true);
      setLoading(false);
      return;
    }

    setPost(postData);

    if (postData.user_id) {
      const { data: profileData } = await supabase
        .from("pt_profiles")
        .select(`
          id,
          user_id,
          full_name,
          qualification,
          profile_image
        `)
        .eq("user_id", postData.user_id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }
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

    if (!postData.restricted) {
      const commentData = await listComments([id]);
      setComments([...commentData].reverse());
    }

    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      loadPage();
    }
  }, [id]);

  async function toggleLike() {
    if (!user) {
      notify("ログインしてください");
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

      if (error) {
        notify(error.message);
        return;
      }

      setLiked(false);

      setPost((prev) =>
        prev
          ? {
              ...prev,
              like_count: Math.max(
                0,
                (prev.like_count || 0) - 1
              ),
            }
          : prev
      );

      return;
    }

    const { error } = await supabase
      .from("likes")
      .insert({
        user_id: user.id,
        post_id: id,
      });

    if (error) {
      notify(error.message);
      return;
    }

    setLiked(true);

    // 投稿者への通知（宛先は、サーバー側が決める）
    notifyPostAuthor(id, "like");

    setPost((prev) =>
      prev
        ? {
            ...prev,
            like_count: (prev.like_count || 0) + 1,
          }
        : prev
    );
  }

  async function addComment() {
    if (!user) {
      notify("ログインしてください");
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

    if (error) {
      notify(error.message);
      return;
    }

    if (data) {
      setComments((prev) => [{ ...data, by_author: false, is_mine: true } as Comment, ...prev]);
      notifyPostAuthor(id, "comment");
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

    if (error) {
      notify(error.message);
      return;
    }

    setComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
    );
  }

  async function handleShare() {
    const link = user
      ? `${SITE_URL}/posts/${id}?ref=${user.id}`
      : `${SITE_URL}/posts/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || "Re:lightの投稿",
          text: "Re:lightでこの投稿を見つけました",
          url: link,
        });
        return;
      } catch {
        // ユーザーがキャンセルした場合等はコピーにフォールバック
      }
    }

    try {
      await navigator.clipboard.writeText(link);
      notify("リンクをコピーしました");
    } catch {
      notify("コピーに失敗しました。手動でリンクを選択してください");
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">読み込み中…</p>
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

          <button
            onClick={() => router.push("/home")}
            className="mt-6 bg-black text-white rounded-full px-6 py-3"
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

  const isOwner = post.is_mine;
  const isCase = post.post_type === "case";
  const hiddenAuthor = post.is_anonymous && !post.is_mine;

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <Link
            href={user ? "/home" : "/"}
            className="text-sm text-gray-500 hover:text-black"
          >
            {user ? "← HOMEへ戻る" : "← Re:light"}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="text-sm border rounded-full px-4 py-2 hover:bg-gray-50"
            >
              共有
            </button>

            {user && !isOwner && (
              <ReportButton targetType="post" targetId={post.id} className="px-2 py-2 text-sm" />
            )}

            {isOwner && (
              <Link
                href={`/posts/${id}/edit`}
                className="text-sm border rounded-full px-4 py-2 hover:bg-gray-50"
              >
                編集
              </Link>
            )}

            {!user && (
              <Link
                href={
                  incomingRef
                    ? `/register?type=pt&ref=${incomingRef}`
                    : "/register?type=pt"
                }
                className="shrink-0 rounded-full bg-relight-gradient px-4 py-2 text-sm font-semibold text-white"
              >
                無料登録
              </Link>
            )}
          </div>
        </div>

        <div className="border rounded-2xl overflow-hidden">

          {/* 投稿者（匿名の投稿は、本人以外には表示しない） */}
          {hiddenAuthor && (
            <div className="flex items-center gap-3 px-6 py-5 border-b">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl text-white">
                🕶
              </div>
              <div>
                <p className="font-semibold">匿名のPT</p>
                <p className="text-sm text-gray-500">投稿者は表示されません</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(post.created_at)}</p>
              </div>
            </div>
          )}

          {!hiddenAuthor && profile && (
            <Link
              href={`/pts/${profile.id}`}
              className="flex items-center gap-3 px-6 py-5 border-b hover:bg-gray-50"
            >
              {profile.profile_image ? (
                <img loading="lazy" decoding="async"
                  src={profile.profile_image}
                  alt={profile.full_name || "プロフィール"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  PT
                </div>
              )}

              <div>
                <p className="font-semibold">
                  {ptNameWithTitle(profile.full_name)}
                </p>

                <p className="text-sm text-gray-500">
                  {profile.qualification || "理学療法士"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(post.created_at)}
                </p>
              </div>
            </Link>
          )}

         {/* 本文 */}
<div className="p-6">

  {/* 公開範囲・対象レベル */}
  {(post.visibility !== "public" || post.target_level !== "all" || (post.is_anonymous && post.is_mine)) && (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {post.visibility !== "public" && (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          🔒 {VISIBILITY_LABEL[post.visibility]}
        </span>
      )}
      {post.is_anonymous && post.is_mine && (
        <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-white">
          匿名で投稿中（他の人には、あなたの名前が見えません）
        </span>
      )}
      {post.target_level !== "all" && (
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          {LEVEL_SHORT[post.target_level]}向け
        </span>
      )}
    </div>
  )}

  {/* 症例報告 */}
  {isCase && (
    <div className="mb-2 -ml-2 flex items-center gap-2">
      <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        症例報告
      </span>

      {post.disease_category && (
        <span className="inline-block rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
          {post.disease_category}
        </span>
      )}
    </div>
  )}

  {post.title && (
    <h1 className="text-2xl font-semibold">
      {post.title}
    </h1>
  )}

  {post.restricted ? (
    <div className="mt-6 rounded-xl bg-gray-50 p-5 text-sm leading-7 text-gray-600">
      🔒 この投稿は、題名だけが公開されています。本文は、
      {post.visibility === "followers" ? "投稿者をフォローしている人だけが読めます。" : "投稿者だけが読めます。"}
      {post.visibility === "followers" && profile && (
        <Link href={`/pts/${profile.id}`} className="ml-1 text-blue-600 underline">
          投稿者のプロフィールを見る
        </Link>
      )}
    </div>
  ) : (
  <>
            <p className="mt-5 whitespace-pre-wrap leading-7">
              {post.content}
            </p>

          {/* 添付資料 */}
{post.image_url && (
  <div className="mt-6">
    <a
      href={post.image_url}
      target="_blank"
      rel="noopener noreferrer"
     className="inline-block rounded-lg border bg-gray-50 px-3 py-2 text-sm"
    >
      📄 添付した資料を開く
    </a>

    <img loading="lazy" decoding="async"
      src={post.image_url}
      alt="添付資料"
      className="mt-4 w-full max-h-[700px] rounded-xl object-contain"
    />
  </div>
)}

            {/* 動画 */}
            {post.video_url && (
              <video
                src={post.video_url}
                controls
                playsInline
                className="mt-6 w-full max-h-[700px] rounded-xl"
              />
            )}

            {/* いいね */}
            <button
              onClick={toggleLike}
              className="mt-8 border rounded-full px-6 py-2 transition active:scale-95"
            >
              {liked ? "❤️" : "♡"} {post.like_count || 0}
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
                  className="flex-1 border rounded-full px-5 py-2 outline-none"
                />

                <button
                  onClick={addComment}
                  className="bg-black text-white rounded-full px-5"
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
  </>
  )}

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
  const [profile, setProfile] = useState<Omit<Profile, "id"> | null>(null);

  async function loadProfile() {
    if (!comment.user_id) return;

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

  useEffect(() => {
    loadProfile();
  }, [comment.user_id]);

  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-start gap-3">

        <Link href={comment.user_id ? `/pts/${comment.user_id}` : "#"} aria-disabled={!comment.user_id}>
          {profile?.profile_image ? (
            <img loading="lazy" decoding="async"
              src={profile.profile_image}
              alt=""
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
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
              {comment.user_id ? profile?.full_name || "ユーザー" : "投稿者（匿名）"}
            </Link>

            {comment.is_mine && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-xs text-gray-400 hover:text-red-500!"
              >
                削除
              </button>
            )}

            {currentUserId && !comment.is_mine && (
              <ReportButton targetType="comment" targetId={comment.id} />
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