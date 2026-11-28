"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalUser } from "@/lib/authUser";
import { canPostWorkplaceReview, clearProfessionCache, getMyAccountType, getMyProfession, type AccountType, type Profession } from "@/lib/account";
import {
  AGE_BANDS,
  EMPLOYMENT_TYPES,
  EMPTY_REVIEW_EXTRA,
  REVIEW_AXES,
  REVIEW_AXIS_LABEL,
  REVIEW_TOPICS,
  listHospitalReviews,
  listReviewTopics,
  upsertHospitalReview,
  type ReviewAxis,
  type ReviewExtra,
} from "@/lib/hospitals";
import { KUCHIKOMI_REGISTER } from "@/lib/kuchikomi";
import { notify } from "@/lib/notify";
import { shareContent, shareUrl } from "@/lib/share";
import { supabase } from "@/lib/supabase";

// 口コミの投稿画面（職場口コミサイトの中で完結する。×を押すと、口コミサイトの施設ページへ戻る）。
// 入力欄は、アプリの職場ページの投稿画面と同じ（保存は upsertHospitalReview を共用）
export default function ReviewForm({ hospitalId, hospitalName }: { hospitalId: string; hospitalName: string }) {
  const router = useRouter();
  const back = `/kuchikomi/${hospitalId}`;
  const here = `${back}/write`;

  const [state, setState] = useState<"loading" | "guest" | "ready">("loading");
  const [userId, setUserId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [profession, setProfession] = useState<Profession | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [scores, setScores] = useState<Record<ReviewAxis, number>>({ work_environment: 5, education_system: 5, salary: 5, overtime: 5, paid_leave: 5, openness: 5 });
  const [overallScore, setOverallScore] = useState(5);
  const [extra, setExtra] = useState<ReviewExtra>(EMPTY_REVIEW_EXTRA);
  const [extraText, setExtraText] = useState({ annual_income: "", monthly_overtime_hours: "", annual_holidays: "" });
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [topicInputs, setTopicInputs] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await getLocalUser();
      const uid = data.user?.id ?? null;
      if (!uid) {
        if (alive) setState("guest");
        return;
      }
      const [type, prof, reviews, topics] = await Promise.all([getMyAccountType(uid), getMyProfession(uid), listHospitalReviews(hospitalId), listReviewTopics(hospitalId)]);
      if (!alive) return;
      setUserId(uid);
      setAccountType(type);
      setProfession(prof);
      // 自分の口コミがあれば、編集として開く
      const mine = reviews.find((r) => r.is_mine);
      if (mine) {
        setIsEdit(true);
        setScores({ work_environment: mine.work_environment, education_system: mine.education_system, salary: mine.salary, overtime: mine.overtime, paid_leave: mine.paid_leave, openness: mine.openness });
        setOverallScore(mine.overall_score);
        setComment(mine.comment ?? "");
        setIsAnonymous(mine.is_anonymous);
        setExtra({ women_friendly: mine.women_friendly, employment_type: mine.employment_type, annual_income: mine.annual_income, monthly_overtime_hours: mine.monthly_overtime_hours, annual_holidays: mine.annual_holidays, age_band: mine.age_band });
        setExtraText({ annual_income: mine.annual_income?.toString() ?? "", monthly_overtime_hours: mine.monthly_overtime_hours?.toString() ?? "", annual_holidays: mine.annual_holidays?.toString() ?? "" });
      }
      setTopicInputs(Object.fromEntries(topics.filter((t) => t.is_mine).map((t) => [t.category, t.body])));
      setState("ready");
    })();
    return () => {
      alive = false;
    };
  }, [hospitalId]);

  // Escキーで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push(back);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, back]);

  async function chooseProfession(p: "ot" | "st") {
    const { error } = await supabase.rpc("set_my_profession", { p_profession: p });
    if (error) {
      notify("職種を保存できませんでした。もう一度お試しください");
      return;
    }
    clearProfessionCache();
    setProfession(p);
  }

  async function submit() {
    if (!userId) return;
    const ranges = { annual_income: [100, 3000, "年収"], monthly_overtime_hours: [0, 300, "月の残業"], annual_holidays: [50, 200, "年間休日"] } as const;
    const parsed: Record<string, number | null> = {};
    for (const k of Object.keys(ranges) as (keyof typeof ranges)[]) {
      const raw = extraText[k].trim();
      if (raw === "") {
        parsed[k] = null;
        continue;
      }
      const n = Math.round(Number(raw));
      const [lo, hi, label] = ranges[k];
      if (!Number.isFinite(n) || n < lo || n > hi) {
        notify(`${label}は ${lo}〜${hi} の数字で入れてください`);
        return;
      }
      parsed[k] = n;
    }
    setSubmitting(true);
    const error = await upsertHospitalReview({ hospitalId, userId, scores, overallScore, comment, isAnonymous, extra: { ...extra, ...parsed }, topics: topicInputs });
    setSubmitting(false);
    if (error) {
      notify(error);
      return;
    }
    notify("口コミを投稿しました。同じ職場の方にも、教えませんか", "info", {
      label: "共有する",
      onAction: () =>
        shareContent({
          title: `${hospitalName}の口コミ`,
          text: "「リハ職の本音」で、職場の口コミを書きました。働いたことがある方は、ぜひ書いてみてください。",
          url: shareUrl(back, "kuchikomi-after-review", "kuchikomi"),
        }),
    });
    router.push(back);
  }

  const canPost = canPostWorkplaceReview(accountType, profession);
  const needsProfession = accountType === "general" && !profession;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900">{isEdit ? "口コミを編集する" : "口コミを投稿する"}</h1>
          <p className="mt-1 text-sm text-gray-600">{hospitalName}</p>
        </div>
        <Link href={back} aria-label="閉じる（施設のページへ戻る）" className="text-2xl leading-none text-gray-400 hover:text-gray-700">×</Link>
      </div>

      {state === "loading" && <p className="mt-4 text-sm text-gray-500" role="status">読み込み中…</p>}

      {state === "guest" && (
        <div className="mt-4">
          <p className="text-sm leading-7 text-gray-700">口コミは、匿名で書けます。無料・約1分で登録できます（職種・名前・メール・パスワード）。登録のあと、そのまま、この画面に戻って書けます。</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={`${KUCHIKOMI_REGISTER}&next=${encodeURIComponent(here)}`} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">無料で登録する</Link>
            <Link href={`/kuchikomi/login?next=${encodeURIComponent(here)}`} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">ログイン</Link>
          </div>
        </div>
      )}

      {state === "ready" && needsProfession && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-900">職種を選んでください（自己申告）</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => chooseProfession("ot")} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-500">作業療法士</button>
            <button type="button" onClick={() => chooseProfession("st")} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-500">言語聴覚士</button>
          </div>
        </div>
      )}

      {state === "ready" && !needsProfession && !canPost && (
        <p className="mt-4 rounded-2xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700">
          口コミを書けるのは、現役の理学療法士・作業療法士・言語聴覚士です。{accountType === "student" ? "学生の方は、実習先での経験を、アプリの病院ページの「実習生の声」に書けます。" : ""}
        </p>
      )}

      {state === "ready" && canPost && (
        <div className="mt-4 space-y-4">
          {REVIEW_AXES.map((axis) => (
            <div key={axis}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{REVIEW_AXIS_LABEL[axis]}</span>
                <span className="font-semibold text-gray-900">{scores[axis]} / 10</span>
              </div>
              <input type="range" min={1} max={10} value={scores[axis]} onChange={(e) => setScores((prev) => ({ ...prev, [axis]: Number(e.target.value) }))} className="mt-1 w-full" aria-label={REVIEW_AXIS_LABEL[axis]} />
            </div>
          ))}

          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">総合点</span>
              <span className="font-semibold text-gray-900">{overallScore} / 10</span>
            </div>
            <input type="range" min={1} max={10} value={overallScore} onChange={(e) => setOverallScore(Number(e.target.value))} className="mt-1 w-full" aria-label="総合点" />
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-3">
            <p className="text-xs font-semibold text-gray-500">数字で答える（任意。答えた分だけ、平均が出ます）</p>
            <select aria-label="女性の働きやすさ" value={extra.women_friendly ?? ""} onChange={(e) => setExtra((p) => ({ ...p, women_friendly: e.target.value ? Number(e.target.value) : null }))} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm">
              <option value="">女性の働きやすさ：答えない</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>女性の働きやすさ：{n} / 10</option>
              ))}
            </select>
            <select aria-label="年齢" value={extra.age_band ?? ""} onChange={(e) => setExtra((p) => ({ ...p, age_band: e.target.value ? Number(e.target.value) : null }))} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm">
              <option value="">年齢：答えない（年収の推移のグラフに使います）</option>
              {AGE_BANDS.map((b) => (
                <option key={b.value} value={b.value}>年齢：{b.label}</option>
              ))}
            </select>
            <select aria-label="雇用形態" value={extra.employment_type ?? ""} onChange={(e) => setExtra((p) => ({ ...p, employment_type: e.target.value || null }))} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm">
              <option value="">雇用形態：答えない</option>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["annual_income", "年収（万円）", "例：450", 100, 3000],
                  ["monthly_overtime_hours", "月の残業（時間）", "例：10", 0, 300],
                  ["annual_holidays", "年間休日（日）", "例：120", 50, 200],
                ] as const
              ).map(([k, label, ph, lo, hi]) => (
                <input key={k} aria-label={label} inputMode="numeric" placeholder={`${label} ${ph}`} value={extraText[k]} onChange={(e) => setExtraText((p) => ({ ...p, [k]: e.target.value }))} title={`${lo}〜${hi}`} className="min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs" />
              ))}
            </div>
          </div>

          <details className="rounded-2xl bg-gray-50 px-4 py-2.5 text-xs text-gray-600">
            <summary className="cursor-pointer font-medium text-gray-700">書き方の例を見る（運営のサンプル）</summary>
            <p className="mt-2 leading-5"><span className="font-semibold">これは運営が用意した書き方の例で、実際の病院の評価ではありません。</span>点数や件数、平均には入りません。</p>
            <p className="mt-2 rounded-xl bg-white px-3 py-2 leading-5 text-gray-700">「新人の指導係が決まっていて、最初の3か月は先輩と一緒に担当しました。勉強会は月1回で、症例相談もしやすい雰囲気です。残業は少なめで、休みも取りやすいと感じました。」</p>
            <p className="mt-2 leading-5">よかった点・気になった点を、1〜2文だけでも大丈夫です。自由記述は任意で、点数だけの投稿もできます。個人名や患者さんの情報は書かないでください。</p>
          </details>

          <details className="rounded-2xl border border-gray-200 px-4 py-2.5" open={Object.values(topicInputs).some(Boolean)}>
            <summary className="cursor-pointer text-sm font-semibold text-gray-800">項目ごとに書く（書きたい項目だけ・任意）</summary>
            <div className="mt-3 space-y-3">
              {REVIEW_TOPICS.map((t) => (
                <label key={t.key} className="block">
                  <span className="text-xs font-semibold text-gray-700">{t.key}</span>
                  <span className="ml-2 text-[11px] text-gray-400">{t.hint}</span>
                  <textarea aria-label={t.key} rows={2} maxLength={1000} value={topicInputs[t.key] ?? ""} onChange={(e) => setTopicInputs((p) => ({ ...p, [t.key]: e.target.value }))} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </label>
              ))}
            </div>
          </details>

          <textarea aria-label="全体の感想（任意）" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="全体の感想（任意）" rows={3} className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-400" />

          <label className="flex items-center gap-2 px-1 text-xs text-gray-600">
            <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
            匿名で投稿する
          </label>

          <button onClick={submit} disabled={submitting} className="w-full rounded-full bg-relight-gradient py-2.5 text-sm font-medium disabled:opacity-50">
            {submitting ? "投稿中…" : "この内容で投稿する"}
          </button>
        </div>
      )}
    </div>
  );
}
