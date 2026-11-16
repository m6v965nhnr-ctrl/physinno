"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalUser } from "@/lib/authUser";
import { getMyAccountType, type AccountType } from "@/lib/account";
import { listHospitalReviews, listReviewTopics, REVIEW_AXES, REVIEW_AXIS_LABEL, REVIEW_TOPICS, REVIEW_TOPIC_OTHER, type HospitalReview, type ReviewTopic } from "@/lib/hospitals";
import { KUCHIKOMI_REGISTER, KUCHIKOMI_REGISTER_GENERAL } from "@/lib/kuchikomi";
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
}: {
  hospitalId: string;
  hospitalName: string;
  totalCount: number;
  initialReviews: HospitalReview[];
  initialTopics: ReviewTopic[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [topics, setTopics] = useState(initialTopics);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await getLocalUser();
      const uid = data.user?.id ?? null;
      if (!alive) return;
      setUserId(uid);
      if (uid) {
        const [r, t, type] = await Promise.all([listHospitalReviews(hospitalId), listReviewTopics(hospitalId), getMyAccountType(uid)]);
        if (!alive) return;
        setReviews(r);
        setTopics(t);
        setAccountType(type);
      }
      setChecked(true);
    })();
    return () => {
      alive = false;
    };
  }, [hospitalId]);

  const here = `/kuchikomi/${hospitalId}`;
  const hidden = Math.max(totalCount - reviews.length, 0);
  const isPt = accountType === "pt";
  const mine = reviews.some((r) => r.is_mine);
  const topicCats = [...REVIEW_TOPICS.map((t) => t.key), REVIEW_TOPIC_OTHER];
  const byCat = (k: string) => topics.filter((t) => t.category === k);

  return (
    <section aria-label="口コミ" className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">口コミ{totalCount > 0 ? `（${totalCount}件）` : ""}</h2>
        {checked && isPt && (
          <Link href={`/hospitals/${hospitalId}?tab=reviews&write=1`} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">
            {mine ? "自分の口コミを編集する" : "口コミを書く"}
          </Link>
        )}
      </div>

      {checked && userId && !isPt && (
        <p className="mt-2 rounded-2xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-600">
          現在、口コミを書けるのは、理学療法士（PTアカウント）です。作業療法士・言語聴覚士の方の投稿は、今後の対応を検討しています。{accountType === "student" ? "学生の方は、実習先での経験を「実習生の声」に書けます（職場ページの口コミタブの下）。" : ""}
        </p>
      )}

      {reviews.length === 0 && (
        <div className="mt-3 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-8 text-center">
          <p className="text-sm font-semibold text-gray-800">まだ口コミがありません</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">{hospitalName}で働いたことのある理学療法士の方は、最初の口コミを書いてみませんか。教育体制・残業・給与など、6項目の評価と、分類ごとのコメントを書けます（匿名にもできます）。</p>
          {checked && !userId && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href={`${KUCHIKOMI_REGISTER}&next=${encodeURIComponent(here)}`} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">理学療法士として登録して書く</Link>
              <Link href={withReturnTo("/login", here)} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">ログイン</Link>
            </div>
          )}
        </div>
      )}

      {topics.length > 0 && (
        <div className="mt-4 space-y-4">
          {topicCats.filter((k) => byCat(k).length > 0).map((k) => (
            <div key={k} className="rounded-2xl border border-gray-100 bg-white p-4">
              <h3 className="text-sm font-bold text-gray-900">{k}</h3>
              <ul className="mt-2 space-y-2">
                {byCat(k).map((t) => (
                  <li key={t.id} className="whitespace-pre-wrap text-sm leading-6 text-gray-700">{t.body}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">総合 {r.overall_score} / 10</p>
              <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">{r.is_anonymous ? "匿名" : "理学療法士"}</span>
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
            <Link href={`${KUCHIKOMI_REGISTER}&next=${encodeURIComponent(here)}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900">理学療法士として登録</Link>
            <Link href={`${KUCHIKOMI_REGISTER_GENERAL}&next=${encodeURIComponent(here)}`} className="rounded-full border border-gray-900/30 px-5 py-2.5 text-sm font-semibold text-gray-900">OT・STの方は「一般」で登録</Link>
            <Link href={withReturnTo("/login", here)} className="rounded-full border border-gray-900/30 px-5 py-2.5 text-sm font-semibold text-gray-900">ログイン</Link>
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <p className="mt-4 text-[11px] leading-5 text-gray-500">
          理学療法士による、個人の感想です。事実と異なる口コミや、権利を侵害する口コミは、ログイン後の各口コミの「通報」から運営へ連絡できます。病院の関係者の方は<Link href="/contact" className="underline">運営へのメッセージ</Link>から、削除・訂正を申し出られます。
        </p>
      )}
    </section>
  );
}
