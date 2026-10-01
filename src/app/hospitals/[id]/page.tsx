"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import {
  Hospital,
  HospitalReview,
  WORKPLACE_SIZE_LABEL,
  WorkplaceSize,
  followHospital,
  getFollowerCount,
  getHospital,
  isFollowingHospital,
  listHospitalReviews,
  listPtsByHospital,
  unfollowHospital,
  upsertHospitalReview,
} from "@/lib/hospitals";
import type { PtProfile } from "@/lib/types";
import { ptNameWithTitle } from "@/lib/format";
import { notify } from "@/lib/notify";

// 病院は「アカウント」ではなく、PTが作成・フォロー・口コミできる施設ページ。
// 病院側が自分で運営することは想定していない（PTが自分の勤務先として
// 登録し、他のPTがフォロー・職場環境の口コミを書ける場）。
export default function HospitalDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [userId, setUserId] = useState<string | null>(null);
  const [isPt, setIsPt] = useState(false);

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [pts, setPts] = useState<PtProfile[]>([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [following, setFollowing] = useState(false);
  const [followBusy, setFollowBusy] = useState(false);

  const [reviews, setReviews] = useState<HospitalReview[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const h = await getHospital(id);
    if (!h) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setHospital(h);

    const [ptList, count, reviewList] = await Promise.all([
      listPtsByHospital(id),
      getFollowerCount(id),
      listHospitalReviews(id),
    ]);

    setPts(ptList);
    setFollowerCount(count);
    setReviews(reviewList);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);
      setIsPt((await getMyAccountType(user.id)) === "pt");
      setFollowing(await isFollowingHospital(id, user.id));

      const mine = reviewList.find((r) => r.user_id === user.id);
      if (mine) {
        setRating(mine.rating);
        setComment(mine.comment ?? "");
        setIsAnonymous(mine.is_anonymous);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleToggleFollow() {
    if (!userId) {
      notify("ログインしてください");
      return;
    }

    setFollowBusy(true);
    const error = following
      ? await unfollowHospital(id, userId)
      : await followHospital(id, userId);
    setFollowBusy(false);

    if (error) {
      notify(error);
      return;
    }

    setFollowing(!following);
    setFollowerCount((prev) => prev + (following ? -1 : 1));
  }

  async function handleSubmitReview() {
    if (!userId) {
      notify("ログインしてください");
      return;
    }

    setSubmitting(true);
    const error = await upsertHospitalReview({
      hospitalId: id,
      userId,
      rating,
      comment,
      isAnonymous,
    });
    setSubmitting(false);

    if (error) {
      notify(error);
      return;
    }

    notify("口コミを投稿しました");
    setReviews(await listHospitalReviews(id));
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  if (notFound || !hospital) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <p className="text-sm text-gray-500">この病院は見つかりませんでした</p>
      </main>
    );
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts" className="text-sm text-gray-400 hover:text-gray-700">
          ← 探すに戻る
        </Link>

        <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {hospital.name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {[hospital.prefecture, hospital.city].filter(Boolean).join(" ") ||
              "地域未設定"}
            {hospital.size && (
              <>
                {" ・ "}
                {WORKPLACE_SIZE_LABEL[hospital.size as WorkplaceSize] ?? hospital.size}
              </>
            )}
          </p>

          {(hospital.address || hospital.phone) && (
            <p className="mt-1 text-xs text-gray-400">
              {[hospital.address, hospital.phone].filter(Boolean).join(" ・ ")}
            </p>
          )}

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>フォロワー {followerCount}人</span>
            {averageRating !== null && (
              <span>
                ⭐ {averageRating.toFixed(1)}（{reviews.length}件）
              </span>
            )}
          </div>

          <button
            onClick={handleToggleFollow}
            disabled={followBusy}
            className={`mt-4 rounded-full px-6 py-2.5 text-sm font-medium transition disabled:opacity-50 ${
              following
                ? "border border-gray-300 bg-white text-gray-700"
                : "bg-relight-gradient text-white"
            }`}
          >
            {following ? "フォロー中" : "＋ フォローする"}
          </button>
        </div>

        {pts.length > 0 && (
          <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-500">在籍PT</h2>
            <div className="mt-3 space-y-2">
              {pts.map((pt) => (
                <Link
                  key={pt.id}
                  href={`/pts/${pt.id}`}
                  className="block rounded-2xl border border-gray-100 p-3 hover:border-gray-300"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {ptNameWithTitle(pt.full_name)}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    ⭐ {pt.rating || 0}（{pt.review_count || 0}件） ・ {pt.specialty}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-500">
            職場環境の口コミ（PTのみ投稿できます）
          </h2>

          {isPt && (
            <div className="mt-4 space-y-3 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    className={`text-xl ${n <= rating ? "" : "opacity-30"}`}
                    aria-label={`${n}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="職場環境・雰囲気・教育体制など（任意）"
                rows={3}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              />

              <label className="flex items-center gap-2 px-1 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                匿名で投稿する
              </label>

              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                className="w-full rounded-full bg-relight-gradient py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {submitting ? "投稿中…" : "口コミを投稿する"}
              </button>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {reviews.length === 0 && (
              <p className="text-sm text-gray-400">まだ口コミはありません</p>
            )}

            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{"⭐".repeat(r.rating)}</p>
                  {r.is_anonymous && (
                    <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">
                      匿名
                    </span>
                  )}
                </div>
                {r.comment && (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    {r.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
