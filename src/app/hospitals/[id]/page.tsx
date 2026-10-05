"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import {
  DiseaseRatio,
  Hospital,
  HospitalReview,
  REVIEW_AXES,
  REVIEW_AXIS_LABEL,
  ReviewAxis,
  WORKPLACE_SIZE_LABEL,
  WorkplaceSize,
  canEditHospitalData,
  followHospital,
  getFollowerCount,
  getHospital,
  isFollowingHospital,
  listDiseaseRatios,
  listHospitalReviews,
  listPtsByHospital,
  setDiseaseRatios,
  unfollowHospital,
  updateRecruitmentInfo,
  upsertHospitalReview,
} from "@/lib/hospitals";
import { DISEASE_CATEGORIES } from "@/lib/diseaseCategories";
import DiseaseRatioPieChart from "@/components/DiseaseRatioPieChart";
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
  const [scores, setScores] = useState<Record<ReviewAxis, number>>({
    work_environment: 5,
    education_system: 5,
    salary: 5,
    overtime: 5,
    paid_leave: 5,
    openness: 5,
  });
  const [overallScore, setOverallScore] = useState(5);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [diseaseRatios, setDiseaseRatiosState] = useState<DiseaseRatio[]>([]);
  const [canEditRatios, setCanEditRatios] = useState(false);
  const [editingRatios, setEditingRatios] = useState(false);
  const [ratioInputs, setRatioInputs] = useState<Record<string, string>>({});
  const [savingRatios, setSavingRatios] = useState(false);

  const [editingRecruitment, setEditingRecruitment] = useState(false);
  const [recruitmentInput, setRecruitmentInput] = useState("");
  const [savingRecruitment, setSavingRecruitment] = useState(false);

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

    const [ptList, count, reviewList, ratios] = await Promise.all([
      listPtsByHospital(id),
      getFollowerCount(id),
      listHospitalReviews(id),
      listDiseaseRatios(id),
    ]);

    setPts(ptList);
    setFollowerCount(count);
    setReviews(reviewList);
    setDiseaseRatiosState(ratios);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);
      setIsPt((await getMyAccountType(user.id)) === "pt");
      setFollowing(await isFollowingHospital(id, user.id));
      setCanEditRatios(await canEditHospitalData(id, user.id));

      const mine = reviewList.find((r) => r.is_mine);
      if (mine) {
        setScores({
          work_environment: mine.work_environment,
          education_system: mine.education_system,
          salary: mine.salary,
          overtime: mine.overtime,
          paid_leave: mine.paid_leave,
          openness: mine.openness,
        });
        setOverallScore(mine.overall_score);
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
      scores,
      overallScore,
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

  function openRatioEditor() {
    const current: Record<string, string> = {};
    for (const category of DISEASE_CATEGORIES) {
      const existing = diseaseRatios.find((r) => r.category === category);
      current[category] = existing ? String(existing.percentage) : "0";
    }
    setRatioInputs(current);
    setEditingRatios(true);
  }

  async function handleSaveRatios() {
    if (!userId) return;

    setSavingRatios(true);
    const error = await setDiseaseRatios(
      id,
      userId,
      DISEASE_CATEGORIES.map((category) => ({
        category,
        percentage: Number(ratioInputs[category]) || 0,
      }))
    );
    setSavingRatios(false);

    if (error) {
      notify(error);
      return;
    }

    notify("疾患比率を更新しました");
    setDiseaseRatiosState(await listDiseaseRatios(id));
    setEditingRatios(false);
  }

  function openRecruitmentEditor() {
    setRecruitmentInput(hospital?.recruitment_info ?? "");
    setEditingRecruitment(true);
  }

  async function handleSaveRecruitment() {
    setSavingRecruitment(true);
    const error = await updateRecruitmentInfo(id, recruitmentInput);
    setSavingRecruitment(false);

    if (error) {
      notify(error);
      return;
    }

    notify("採用情報を更新しました");
    setHospital((prev) =>
      prev ? { ...prev, recruitment_info: recruitmentInput.trim() || null } : prev
    );
    setEditingRecruitment(false);
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
      ? reviews.reduce((sum, r) => sum + r.overall_score, 0) / reviews.length
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

          {(hospital.address || hospital.phone || hospital.email) && (
            <p className="mt-1 text-xs text-gray-400">
              {[hospital.address, hospital.phone, hospital.email]
                .filter(Boolean)
                .join(" ・ ")}
            </p>
          )}

          {hospital.website && (
            <a
              href={
                hospital.website.startsWith("http")
                  ? hospital.website
                  : `https://${hospital.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              🌐 公式サイト
            </a>
          )}

          {hospital.data_source === "mhlw_opendata" && (
            <p className="mt-2 text-[11px] text-gray-400">
              {hospital.data_source_note ??
                "出典: 厚生労働省 医療情報ネット オープンデータを加工して作成"}
            </p>
          )}

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>フォロワー {followerCount}人</span>
            {averageRating !== null && (
              <span>
                総合 {averageRating.toFixed(1)}/10（{reviews.length}件）
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
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500">疾患比率</h2>
            {canEditRatios && !editingRatios && (
              <button
                onClick={openRatioEditor}
                className="text-xs text-gray-400 hover:text-gray-700"
              >
                編集する
              </button>
            )}
          </div>

          {editingRatios ? (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-400">
                各疾患カテゴリのおおよその割合（%）を入力してください
              </p>
              {DISEASE_CATEGORIES.map((category) => (
                <div key={category} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-sm text-gray-700">
                    {category}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={ratioInputs[category] ?? "0"}
                    onChange={(e) =>
                      setRatioInputs((prev) => ({
                        ...prev,
                        [category]: e.target.value,
                      }))
                    }
                    className="w-20 rounded-lg border px-2 py-1 text-sm"
                  />
                  <span className="text-xs text-gray-400">%</span>
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditingRatios(false)}
                  className="flex-1 rounded-full border py-2 text-sm text-gray-600"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveRatios}
                  disabled={savingRatios}
                  className="flex-1 rounded-full bg-black py-2 text-sm text-white disabled:opacity-50"
                >
                  {savingRatios ? "保存中…" : "保存する"}
                </button>
              </div>
            </div>
          ) : diseaseRatios.some((r) => r.percentage > 0) ? (
            <div className="mt-4">
              <DiseaseRatioPieChart
                data={diseaseRatios
                  .filter((r) => r.percentage > 0)
                  .map((r) => ({ category: r.category, percentage: r.percentage }))}
              />
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-400">
              まだ登録されていません{canEditRatios && "（在籍PTが入力できます）"}
            </p>
          )}
        </section>

        <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500">採用情報</h2>
            {canEditRatios && !editingRecruitment && (
              <button
                onClick={openRecruitmentEditor}
                className="text-xs text-gray-400 hover:text-gray-700"
              >
                編集する
              </button>
            )}
          </div>

          {editingRecruitment ? (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-400">
                募集職種・待遇・連絡先など、在籍PTが把握している採用情報を入力してください
              </p>
              <textarea
                value={recruitmentInput}
                onChange={(e) => setRecruitmentInput(e.target.value)}
                rows={5}
                placeholder="例：理学療法士 若干名募集中。詳細は病院HPまたは採用担当まで。"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              />

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditingRecruitment(false)}
                  className="flex-1 rounded-full border py-2 text-sm text-gray-600"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveRecruitment}
                  disabled={savingRecruitment}
                  className="flex-1 rounded-full bg-black py-2 text-sm text-white disabled:opacity-50"
                >
                  {savingRecruitment ? "保存中…" : "保存する"}
                </button>
              </div>
            </div>
          ) : hospital.recruitment_info ? (
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {hospital.recruitment_info}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-400">
              まだ登録されていません{canEditRatios && "（在籍PTが入力できます）"}
            </p>
          )}
        </section>

        <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-500">
            職場環境の口コミ（PTのみ投稿できます）
          </h2>

          {isPt && (
            <div className="mt-4 space-y-4 rounded-2xl bg-gray-50 p-4">
              {REVIEW_AXES.map((axis) => (
                <div key={axis}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{REVIEW_AXIS_LABEL[axis]}</span>
                    <span className="font-semibold text-gray-900">{scores[axis]} / 10</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={scores[axis]}
                    onChange={(e) =>
                      setScores((prev) => ({ ...prev, [axis]: Number(e.target.value) }))
                    }
                    className="mt-1 w-full"
                    aria-label={REVIEW_AXIS_LABEL[axis]}
                  />
                </div>
              ))}

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-900">総合点</span>
                  <span className="font-semibold text-gray-900">{overallScore} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={overallScore}
                  onChange={(e) => setOverallScore(Number(e.target.value))}
                  className="mt-1 w-full"
                  aria-label="総合点"
                />
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
                  <p className="text-sm font-semibold text-gray-900">
                    総合 {r.overall_score} / 10
                  </p>
                  {r.is_anonymous && (
                    <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">
                      匿名
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                  {REVIEW_AXES.map((axis) => (
                    <span key={axis}>
                      {REVIEW_AXIS_LABEL[axis]} {r[axis]}
                    </span>
                  ))}
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
