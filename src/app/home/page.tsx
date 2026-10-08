"use client";

import { safeHttpUrl } from "@/lib/url";
import ProfileLink from "@/components/ProfileLink";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  AchievementCategory,
} from "@/lib/achievements";
import { notify } from "@/lib/notify";
import { ptNameWithTitle } from "@/lib/format";
import ProfileNameNudge from "@/components/ProfileNameNudge";
import HospitalReviewNudge from "@/components/HospitalReviewNudge";
import HomeAudienceCard from "@/components/HomeAudienceCard";
import GuestBanner from "@/components/GuestBanner";
import HomeQuestionsStrip from "@/components/HomeQuestionsStrip";
import { getGuestRole } from "@/lib/guestRole";
import {
  FeedComment,
  FeedPost,
  LEVEL_SHORT,
  VISIBILITY_LABEL,
  listComments,
  listPosts,
  notifyPostAuthor,
} from "@/lib/posts";

type Post = FeedPost;

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

type Comment = FeedComment;

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
  // ログインしていない訪問者（見るだけ。いいね・コメント・フォローなどは、登録を案内する）
  const [guest, setGuest] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 名前・アイコンを取得して state に足す（匿名などで user_id が無いものは飛ばす）
  async function loadProfiles(ids: (string | null)[]) {
    const userIds = [...new Set(ids.filter((id): id is string => !!id))];
    if (userIds.length === 0) return;

    const { data } = await supabase
      .from("pt_profiles")
      .select("id, user_id, full_name, qualification, profile_image")
      .in("user_id", userIds);

    setProfiles((prev) => {
      const next = { ...prev };
      (data || []).forEach((profile) => {
        next[profile.user_id] = profile;
      });
      return next;
    });
  }

  // 投稿に紐づくプロフィール・いいね・コメントを並列で取得して state に統合する
  async function hydrate(postData: Post[]) {
    if (postData.length === 0) return;

    const postIds = postData.map((post) => post.id);

    // 本文を読める投稿のコメントだけ(匿名の投稿では、作者のコメントから user_id が外れて返る)
    const [commentList, likeRes] = await Promise.all([
      listComments(postData.filter((post) => !post.restricted).map((post) => post.id)),
      supabase.from("likes").select("id, post_id, user_id").in("post_id", postIds),
    ]);

    await loadProfiles([
      ...postData.map((post) => post.user_id),
      ...commentList.map((comment) => comment.user_id),
    ]);

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

    commentList.forEach((comment) => {
      commentMap[comment.post_id]?.push(comment);
      commentCountMap[comment.post_id] += 1;
    });

    setLikes((prev) => ({ ...prev, ...likeMap }));
    setComments((prev) => ({ ...prev, ...commentMap }));
    setCommentCounts((prev) => ({ ...prev, ...commentCountMap }));
  }

  // 投稿を PAGE_SIZE 件ずつ新しい順に取得する（before: これより古い投稿だけ）
  async function fetchPostPage(before?: string) {
    return listPosts({ before: before ?? null, limit: PAGE_SIZE });
  }

  async function loadHome() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // ゲストは、先に「PTか、学生か」を選んでもらう
      if (!getGuestRole()) {
        window.location.replace("/guest");
        return;
      }
      setGuest(true);
    } else {
      setUserId(user.id);

      const { count } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      setUnreadCount(count || 0);
    }

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

  function askRegister() {
    notify("この操作は、無料登録（またはログイン）後に使えます");
  }

  async function toggleLike(postId: string) {
    if (!userId) {
      askRegister();
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

    // いいね通知（投稿者への通知は、匿名の投稿でも、サーバー側が宛先を決める。自分の投稿には送られない）
    await notifyPostAuthor(postId, "like");
  }

  async function loadComments(postId: string) {
    const data = await listComments([postId]);

    await loadProfiles(data.map((comment) => comment.user_id));

    setComments((prev) => ({
      ...prev,
      [postId]: data,
    }));

    setCommentCounts((prev) => ({
      ...prev,
      [postId]: data.length,
    }));
  }

  async function addComment(postId: string) {
    const text = commentText[postId]?.trim();

    if (!userId) {
      askRegister();
      return;
    }

    if (!text) {
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
        [postId]: [
          ...(prev[postId] || []),
          { ...data, by_author: false, is_mine: true } as Comment,
        ],
      }));

      setCommentCounts((prev) => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1,
      }));
    }
    // コメント通知（宛先は、サーバー側が決める。自分の投稿には送られない）
    await notifyPostAuthor(postId, "comment");

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

  function getProfile(profileUserId: string | null) {
    if (!profileUserId) {
      return { user_id: "", full_name: "", qualification: "", profile_image: null } as Profile;
    }

    return (
      profiles[profileUserId] || {
        user_id: profileUserId,
        full_name: "",
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
        <p className="text-gray-500">読み込み中…</p>
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

        {/* 通知・投稿検索・グループ・PT検索（常にヘッダーの下に固定表示） */}
        <div className="flex gap-1.5 bg-white px-5 pt-4">
          {!guest && (
          <Link
            href="/notifications"
            className="relative inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <span aria-hidden="true">🔔</span>
            通知
            {unreadCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          )}

          <Link
            href="/posts"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <span aria-hidden="true">🔍</span>
            投稿検索
          </Link>

          {!guest && (
          <Link
            href="/groups"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <span aria-hidden="true">👥</span>
            グループ
          </Link>
          )}

          <Link
            href="/home/pt-search"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <span aria-hidden="true">🧑‍⚕️</span>
            PT検索
          </Link>
        </div>

        {guest && (
          <div className="bg-white px-5 pt-4">
            <GuestBanner text="ログインなしで、アプリの中を見られます。投稿・いいね・コメント・保存・メッセージは、無料登録後に使えます。" />
          </div>
        )}

        {!guest && <ProfileNameNudge userId={userId} />}
        {!guest && <HospitalReviewNudge userId={userId} />}
        {!guest && <HomeAudienceCard userId={userId} />}
        {!guest && <HomeQuestionsStrip userId={userId} />}

        {/* 投稿一覧 */}
        <div className="space-y-4 py-4">
          {posts.length === 0 ? (
            <div className="bg-white px-5 py-12 text-center">
              <p className="text-gray-400">まだ投稿がありません</p>
            </div>
          ) : (
            posts.map((post) => {
              const profile = getProfile(post.user_id);
              const hidden = post.is_anonymous && !post.is_mine;
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
                    <AvatarLink profile={hidden ? { user_id: "" } : profile}>
                      {hidden ? (
                        <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center text-xl text-white">
                          🕶
                        </div>
                      ) : profile.profile_image ? (
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
                        {hidden ? "匿名のPT" : ptNameWithTitle(profile.full_name)}
                      </p>

                      <p className="text-xs text-gray-500">
                        {hidden ? "投稿者は表示されません" : profile.qualification || "理学療法士"}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400">
                        {formatDate(post.created_at)}
                      </p>
                    </div>

                    {/* 自分の投稿だけ削除 */}
                    {post.is_mine && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-xs text-gray-400 hover:text-red-500!"
                      >
                        削除
                      </button>
                    )}
                  </div>

                  {/* 公開範囲・対象レベルの表示 */}
                  {(post.visibility !== "public" ||
                    post.target_level !== "all" ||
                    (post.is_anonymous && post.is_mine)) && (
                    <div className="flex flex-wrap gap-1.5 px-5 pb-2">
                      {post.visibility !== "public" && (
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
                          {post.visibility === "group" && post.group_name
                            ? `👥 ${post.group_name}のメンバーだけ`
                            : `🔒 ${VISIBILITY_LABEL[post.visibility]}`}
                        </span>
                      )}
                      {post.is_anonymous && post.is_mine && (
                        <span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-[11px] font-medium text-white">
                          匿名で投稿中（他の人には、あなたの名前が見えません）
                        </span>
                      )}
                      {post.target_level !== "all" && (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700">
                          {LEVEL_SHORT[post.target_level]}向け
                        </span>
                      )}
                    </div>
                  )}

                  {/* 題名だけ公開されている投稿（本文は、公開範囲の人だけが読めます） */}
                  {post.restricted && (
                    <div className="px-5 pb-5">
                      {post.title && <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>}
                      <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                        🔒 本文は、
                        {post.visibility === "followers"
                          ? "投稿者をフォローしている人だけが読めます。"
                          : "投稿者だけが読めます。"}
                        {post.visibility === "followers" && post.user_id && (
                          <Link href={`/pts/${profile.id ?? ""}`} className="ml-1 text-blue-600 underline">
                            プロフィールを見る
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 投稿内容 */}
                  {!post.restricted && (
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

                        {post.reference_url && !safeHttpUrl(post.reference_url) && (
                          <p className="text-xs leading-5 text-gray-600">参考：{post.reference_url}</p>
                        )}

                        {safeHttpUrl(post.reference_url) && (
                          <a
                            href={safeHttpUrl(post.reference_url) ?? undefined}
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

                  )}

                  {/* アクション */}
                  {!post.restricted && (
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
                            const authorOfAnon = comment.user_id === null && comment.by_author;

                            return (
                              <div
                                key={comment.id}
                                className="flex items-start gap-3"
                              >
                                <ProfileLink userId={authorOfAnon ? null : comment.user_id} name={commentProfile.full_name} className="shrink-0">
                                  {commentProfile.profile_image ? (
                                    <img loading="lazy" decoding="async"
                                      src={commentProfile.profile_image}
                                      alt=""
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                      {authorOfAnon ? "🕶" : "👤"}
                                    </div>
                                  )}
                                </ProfileLink>

                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">
                                      {authorOfAnon
                                        ? "投稿者（匿名）"
                                        : ptNameWithTitle(commentProfile.full_name)}
                                    </span>

                                    {comment.is_mine && (
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
                            placeholder="コメントを入力…"
                            className="flex-1 border rounded-full px-4 py-2 text-sm"
                           aria-label="コメントを入力…"/>

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
                  )}
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
                {loadingMore ? "読み込み中…" : "もっと見る"}
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