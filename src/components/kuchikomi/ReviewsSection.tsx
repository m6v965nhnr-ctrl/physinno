"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalUser } from "@/lib/authUser";
import { canPostWorkplaceReview, clearProfessionCache, getMyAccountType, getMyProfession, PROFESSION_LABEL, isProfession, type AccountType, type Profession } from "@/lib/account";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { listHospitalReviews, listReviewTopics, REVIEW_AXES, REVIEW_AXIS_LABEL, REVIEW_TOPICS, REVIEW_TOPIC_OTHER, type HospitalReview, type ReviewTopic } from "@/lib/hospitals";
import { KUCHIKOMI_REGISTER } from "@/lib/kuchikomi";
import { withReturnTo } from "@/lib/returnTo";
import ReportButton from "@/components/ReportButton";

// 口コミの一覧。サーバーで、ログインなしで読める分(最大3件)を先に出し、
// ログインしていれば、全件に入れ替える。4件目以降は、登録（ログイン）の案内を出す。
export default function ReviewsSection({
  hospitalId,
  hospitalName,
  totalCount,
  initialReviews,
  initialTopics,
  initialProfessions = {},
}: {
  hospitalId: string;
  hospitalName: string;
  totalCount: number;
  initialReviews: HospitalReview[];
  initialTopics: ReviewTopic[];
  initialProfessions?: Record<string, string | null>;
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [topics, setTopics] = useState(initialTopics);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [profession, setProfession] = useState<Profession | null>(null);
  const [professions, setProfessions] = useState<Record<string, string | null>>(initialProfessions);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await getLocalUser();
      const uid = data.user?.id ?? null;
      if (!alive) return;
      setUserId(uid);
      if (uid) {
        const [r, t, type, prof, pr] = await Promise.all([
          listHospitalReviews(hospitalId),
          listReviewTopics(hospitalId),
          getMyAccountType(uid),
          getMyProfession(uid),
          supabase.rpc("get_hospital_review_professions", { p_hospital: hospitalId }),
        ]);
        if (!alive) return;
        setReviews(r);
        setTopics(t);
        setAccountType(type);
        setProfession(prof);
        setProfessions(Object.fromEntries(((pr.data ?? []) as { review_id: string; profession: string | null }[]).map((x) => [x.review_id, x.profession])));
      }
      setChecked(true);
    })();
    return () => {
      alive = false;
    };
  }, [hospitalId]);

  const here = `/kuchikomi/${hospitalId}`;
  const hidden = Math.max(totalCount - reviews.length, 0);
  const canPost = canPostWorkplaceReview(accountType, profession);
  // 「一般」で登録済みで、職種が未設定の人（あとから職種を選べる）
  const needsProfession = accountType === "general" && !profession;

  async function chooseProfession(p: "ot" | "st") {
    const { error } = await supabase.rpc("set_my_profession", { p_profession: p });
    if (error) {
      notify("職種を保存できませんでした。もう一度お試しください");
      return;
    }
    clearProfessionCache();
    setProfession(p);
    notify("職種を保存しました");
  }
  const mine = reviews.some((r) => r.is_mine);
  const topicCats = [...REVIEW_TOPICS.map((t) => t.key), REVIEW_TOPIC_OTHER];
  // 分類ごとの口コミ（「その他・全体」は、分類なしの従来のコメント）
  const [topicCat, setTopicCat] = useState<string | null>(null);
  const legacy = reviews.filter((r) => r.comment).map((r) => ({ id: r.id, body: r.comment as string, created_at: r.created_at }));
  const count = (k: string) => (k === REVIEW_TOPIC_OTHER ? legacy.length : topics.filter((x) => x.category === k).length);
  const items = topicCat === null ? [] : topicCat === REVIEW_TOPIC_OTHER ? legacy : topics.filter((x) => x.category === topicCat);

  return (
    <section aria-label="口コミ" className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">口コミ{totalCount > 0 ? `（${totalCount}件）` : ""}</h2>
        {checked && canPost && (
          <Link href={`/kuchikomi/${hospitalId}/write`} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">
            {mine ? "自分の口コミを編集する" : "口コミを書く"}
          </Link>
        )}
      </div>

      {checked && userId && needsProfession && (
        <div className="mt-2 rounded-2xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-700">
          <p className="font-semibold text-gray-900">口コミを書くには、職種を選んでください（自己申告）</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => chooseProfession("ot")} className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:border-gray-500">作業療法士</button>
            <button type="button" onClick={() => chooseProfession("st")} className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:border-gray-500">言語聴覚士</button>
          </div>
        </div>
      )}
      {checked && userId && !canPost && !needsProfession && (
        <p className="mt-2 rounded-2xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-600">
          口コミを書けるのは、現役の理学療法士・作業療法士・言語聴覚士です。{accountType === "student" ? "学生の方は、実習先での経験を「実習生の声」に書けます（職場ページの口コミタブの下）。" : ""}
        </p>
      )}

      {reviews.length === 0 && (
        <div className="mt-3 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-8 text-center">
          <p className="text-sm font-semibold text-gray-800">まだ口コミがありません</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">{hospitalName}で働いたことのあるリハビリ職（理学療法士・作業療法士・言語聴覚士）の方は、最初の口コミを書いてみませんか。教育体制・残業・給与など、6項目の評価と、分類ごとのコメントを書けます（匿名にもできます）。</p>
          {checked && !userId && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href={`${KUCHIKOMI_REGISTER}&next=${encodeURIComponent(here)}`} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">無料登録して書く</Link>
              <Link href={withReturnTo("/login", here)} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">ログイン</Link>
            </div>
          )}
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] text-gray-500">知りたい項目を選ぶと、その項目の口コミだけを読めます</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {topicCats.map((k) => (
              <button key={k} type="button" onClick={() => setTopicCat(topicCat === k ? null : k)} aria-pressed={topicCat === k} className={`rounded-lg border px-2 py-3 text-center text-sm font-semibold ${topicCat === k ? "border-transparent bg-relight-gradient" : "border-gray-200 bg-white text-gray-800"}`}>
                {k}
                <span className={`block text-xs font-normal ${topicCat === k ? "text-gray-900/80" : "text-gray-500"}`}>（{count(k)}件）</span>
              </button>
            ))}
          </div>
          {topicCat !== null && (
            <div className="mt-3 space-y-2">
              {items.length === 0 && <p className="text-sm text-gray-400">この項目の口コミは、まだありません</p>}
              {items.map((x) => (
                <div key={x.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-[11px] text-gray-400">{topicCat}　{new Date(x.created_at).toLocaleDateString("ja-JP")}</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">{x.body}</p>
                  {userId && topicCat !== REVIEW_TOPIC_OTHER && !(x as ReviewTopic).is_mine && (
                    <div className="mt-2 text-right"><ReportButton targetType="hospital_review_topic" targetId={x.id} /></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">総合 {r.overall_score} / 10</p>
              <span className="flex items-center gap-1.5">
                {isProfession(professions[r.id]) && <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">{PROFESSION_LABEL[professions[r.id] as Profession]}</span>}
                {r.is_anonymous && <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">匿名</span>}
              </span>
            </div>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
              {REVIEW_AXES.map((a) => (
                <span key={a}>{REVIEW_AXIS_LABEL[a]} {r[a]}</span>
              ))}
            </p>
            {(r.employment_type || r.annual_income || r.monthly_overtime_hours != null || r.annual_holidays || r.women_friendly) && (
              <p className="mt-2 text-xs text-gray-700">
                {[
                  r.employment_type,
                  r.annual_income ? `年収 ${r.annual_income}万円` : null,
                  r.monthly_overtime_hours != null ? `残業 月${r.monthly_overtime_hours}時間` : null,
                  r.annual_holidays ? `年間休日 ${r.annual_holidays}日` : null,
                  r.women_friendly ? `女性の働きやすさ ${r.women_friendly}/10` : null,
                ].filter(Boolean).join(" ・ ")}
              </p>
            )}
            {r.comment && <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">{r.comment}</p>}
            {userId && !r.is_mine && (
              <div className="mt-2 text-right">
                <ReportButton targetType="hospital_review" targetId={r.id} />
              </div>
            )}
          </article>
        ))}
      </div>

      {checked && !userId && hidden > 0 && (
        <div className="mt-4 rounded-3xl bg-relight-gradient p-5 text-center">
          <p className="text-base font-bold text-gray-900">ほかの{hidden}件の口コミは、無料登録で読めます</p>
          <p className="mt-1 text-xs leading-5 text-gray-900/80">リハビリ職（理学療法士・作業療法士・言語聴覚士）と学生のための無料アプリ「Re:light」に登録すると、すべての口コミと分類ごとのコメントを読めます。</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Link href={`${KUCHIKOMI_REGISTER}&next=${encodeURIComponent(here)}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900">無料で登録する（PT・OT・ST）</Link>
            <Link href={withReturnTo("/login", here)} className="rounded-full border border-gray-900/30 px-5 py-2.5 text-sm font-semibold text-gray-900">ログイン</Link>
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <p className="mt-4 text-[11px] leading-5 text-gray-500">
          リハビリ職による、個人の感想です。事実と異なる口コミや、権利を侵害する口コミは、ログイン後の各口コミの「通報」から運営へ連絡できます。病院の関係者の方は<Link href="/contact" className="underline">運営へのメッセージ</Link>から、削除・訂正を申し出られます。
        </p>
      )}
    </section>
  );
}
