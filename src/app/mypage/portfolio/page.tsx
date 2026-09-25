"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  listMyAchievements,
} from "@/lib/achievements";
import {
  CAREER_GOAL_STATUS_LABEL,
  CAREER_GOAL_TYPE_LABEL,
  CAREER_GOAL_TYPES,
  CareerGoal,
  CareerGoalStatus,
  CareerGoalType,
  Certification,
  EducationHistory,
  HOSPITAL_ACTIVITY_TYPE_LABEL,
  HOSPITAL_ACTIVITY_TYPES,
  HospitalActivity,
  HospitalActivityType,
  LanguageSkill,
  Skill,
  TEACHING_EXPERIENCE_TYPE_LABEL,
  TEACHING_EXPERIENCE_TYPES,
  TeachingExperience,
  TeachingExperienceType,
  WorkHistory,
  addCareerGoal,
  addCertification,
  addEducationHistory,
  addHospitalActivity,
  addLanguageSkill,
  addSkill,
  addTeachingExperience,
  addWorkHistory,
  deleteCareerGoal,
  deleteCertification,
  deleteEducationHistory,
  deleteHospitalActivity,
  deleteLanguageSkill,
  deleteSkill,
  deleteTeachingExperience,
  deleteWorkHistory,
  updateCareerGoalStatus,
  listCareerGoals,
  listCertifications,
  listEducationHistory,
  listHospitalActivities,
  listLanguageSkills,
  listSkills,
  listTeachingExperiences,
  listWorkHistory,
} from "@/lib/portfolio";
import {
  reconcileProfileAndPortfolio,
  syncPortfolioToProfile,
} from "@/lib/profileSync";
import { notify } from "@/lib/notify";

type FieldType = "text" | "date" | "number" | "textarea" | "select" | "checkbox";

type FieldConfig = {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
};

type FormValues = Record<string, string | boolean>;

export default function PortfolioPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [ptProfileId, setPtProfileId] = useState("");
  const [loading, setLoading] = useState(true);

  const [education, setEducation] = useState<EducationHistory[]>([]);
  const [work, setWork] = useState<WorkHistory[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [teaching, setTeaching] = useState<TeachingExperience[]>([]);
  const [activities, setActivities] = useState<HospitalActivity[]>([]);
  const [languages, setLanguages] = useState<LanguageSkill[]>([]);
  const [goals, setGoals] = useState<CareerGoal[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const [experienceYears, setExperienceYears] = useState<number | null>(null);
  const [caseCount, setCaseCount] = useState(0);
  const [cpdPoints, setCpdPoints] = useState(0);

  // 検索・フィルター
  const [keyword, setKeyword] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    load(true);
  }, []);

  // initial=true: プロフィール側の入力内容も取り込んで双方を揃える
  // それ以外: 履歴の変更内容をプロフィールへ反映する
  async function load(initial = false) {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setUserId(user.id);

    if (initial) {
      await reconcileProfileAndPortfolio(user.id);
    } else {
      await syncPortfolioToProfile(user.id);
    }

    const { data: profileData } = await supabase
      .from("pt_profiles")
      .select("id, experience_years")
      .eq("user_id", user.id)
      .maybeSingle();

    setPtProfileId(profileData?.id || "");

    const [
      edu,
      wk,
      certs,
      teach,
      acts,
      langs,
      gls,
      skls,
      ach,
    ] = await Promise.all([
      listEducationHistory(user.id),
      listWorkHistory(user.id),
      listCertifications(user.id),
      listTeachingExperiences(user.id),
      listHospitalActivities(user.id),
      listLanguageSkills(user.id),
      listCareerGoals(user.id),
      listSkills(user.id),
      listMyAchievements(user.id),
    ]);

    setEducation(edu);
    setWork(wk);
    setCertifications(certs);
    setTeaching(teach);
    setActivities(acts);
    setLanguages(langs);
    setGoals(gls);
    setSkills(skls);
    setAchievements(ach);

    // PT経験年数（職歴の最古の入職日から算出、なければプロフィールの入力値）
    const joinedDates = wk
      .map((w) => w.joined_on)
      .filter((d): d is string => !!d)
      .sort();

    if (joinedDates.length > 0) {
      const years =
        (Date.now() - new Date(joinedDates[0]).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);

      setExperienceYears(Math.floor(years));
    } else {
      setExperienceYears(
        profileData?.experience_years !== undefined &&
          profileData?.experience_years !== null
          ? profileData.experience_years
          : null
      );
    }

    // 症例経験数（症例報告＋院内症例発表）
    const { count } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .in("post_type", ["case", "case_presentation"]);

    setCaseCount(count || 0);

    // CPDポイント合計（研修・学会発表の詳細情報から）
    const { data: cpdPosts } = await supabase
      .from("posts")
      .select("details")
      .eq("user_id", user.id)
      .in("post_type", ["training", "conference"]);

    const cpdTotal = (cpdPosts || []).reduce((sum, p) => {
      const value = Number(
        (p as { details?: Record<string, unknown> }).details?.cpd_points
      );
      return sum + (Number.isFinite(value) ? value : 0);
    }, 0);

    setCpdPoints(cpdTotal);

    setLoading(false);
  }

  function matches(...values: (string | null | undefined)[]) {
    const text = values.filter(Boolean).join(" ").toLowerCase();
    const keywordOk = !keyword.trim() || text.includes(keyword.trim().toLowerCase());

    if (!yearFilter) return keywordOk;

    const years = values
      .filter((v): v is string => !!v && /^\d{4}-\d{2}-\d{2}$/.test(v))
      .map((v) => v.slice(0, 4));

    return keywordOk && years.includes(yearFilter);
  }

  const yearOptions = useMemo(() => {
    const years = new Set<string>();

    const collect = (d: string | null | undefined) => {
      if (d) years.add(d.slice(0, 4));
    };

    education.forEach((e) => {
      collect(e.enrolled_on);
      collect(e.graduated_on);
    });
    work.forEach((w) => {
      collect(w.joined_on);
      collect(w.left_on);
    });
    certifications.forEach((c) => collect(c.acquired_on));
    teaching.forEach((t) => collect(t.occurred_on));
    activities.forEach((a) => collect(a.started_on));
    achievements.forEach((a) => collect(a.achieved_on));

    return Array.from(years).sort().reverse();
  }, [education, work, certifications, teaching, activities, achievements]);

  const certificationsNearingExpiry = certifications.filter((c) => {
    if (!c.expires_on) return false;
    const days =
      (new Date(c.expires_on).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 90;
  });

  const recentItems = [
    ...achievements.map((a) => ({
      label: `${ACHIEVEMENT_CATEGORY_LABEL[a.category]}${
        a.title ? "・" + a.title : ""
      }`,
      date: a.achieved_on,
    })),
    ...certifications.map((c) => ({
      label: `資格取得・${c.name}`,
      date: c.acquired_on || c.created_at,
    })),
  ]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 5);

  const achievedGoalCount = goals.filter((g) => g.status === "achieved").length;

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/mypage" className="text-sm text-gray-400">
            ← マイページ
          </Link>

          {ptProfileId && (
            <Link
              href={`/pts/${ptProfileId}/portfolio`}
              className="rounded-full bg-relight-gradient px-4 py-2 text-sm font-medium text-white"
            >
              ポートフォリオを見る・PDF保存
            </Link>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          ポートフォリオ
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          学歴・職歴・資格・研修・学会発表・論文などをまとめて管理できます。公開設定した内容は「ポートフォリオを見る」から確認・PDF保存できます。
        </p>

        {/* =========================
            ダッシュボード
        ========================= */}
        <section className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold">ダッシュボード</h2>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            <DashboardTile
              label="PT経験年数"
              value={experienceYears !== null ? `${experienceYears}年` : "未設定"}
            />
            <DashboardTile label="保有資格数" value={`${certifications.length}件`} />
            <DashboardTile
              label="研修受講数"
              value={`${achievements.filter((a) => a.category === "training").length}件`}
            />
            <DashboardTile label="CPDポイント" value={`${cpdPoints}pt`} />
            <DashboardTile
              label="学会発表数"
              value={`${achievements.filter((a) => a.category === "conference").length}件`}
            />
            <DashboardTile
              label="論文数"
              value={`${achievements.filter((a) => a.category === "paper").length}件`}
            />
            <DashboardTile label="症例経験数" value={`${caseCount}件`} />
            <DashboardTile label="スキル習得数" value={`${skills.length}件`} />
            <DashboardTile
              label="キャリア目標の進捗"
              value={
                goals.length > 0
                  ? `${achievedGoalCount}/${goals.length}達成`
                  : "未設定"
              }
            />
          </div>

          {(recentItems.length > 0 || certificationsNearingExpiry.length > 0) && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {recentItems.length > 0 && (
                <div className="rounded-2xl border border-gray-100 p-4">
                  <p className="text-sm font-semibold">最近追加した実績</p>

                  <ul className="mt-2 space-y-1.5 text-xs text-gray-500">
                    {recentItems.map((item, i) => (
                      <li key={i}>
                        {item.label}
                        {item.date && (
                          <span className="text-gray-400">
                            　{item.date.slice(0, 10)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {certificationsNearingExpiry.length > 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-700">
                    更新期限が近い資格
                  </p>

                  <ul className="mt-2 space-y-1.5 text-xs text-amber-700">
                    {certificationsNearingExpiry.map((c) => (
                      <li key={c.id}>
                        {c.name}　期限: {c.expires_on}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* =========================
            検索・フィルター
        ========================= */}
        <section className="mt-8 border-t pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="キーワードで検索（学校名・勤務先・資格名など）"
              className="w-full rounded-xl border px-4 py-2.5 text-sm"
             aria-label="キーワードで検索（学校名・勤務先・資格名など）"/>

            <select
              value={yearFilter}
              aria-label="年で絞り込み"
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 text-sm bg-white sm:w-40"
            >
              <option value="">年を指定しない</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}年
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* =========================
            学歴
        ========================= */}
        <PortfolioSection
          title="学歴"
          addLabel="+ 学歴を追加"
          fields={[
            { key: "school_name", label: "学校名", required: true },
            { key: "faculty", label: "学部・学科" },
            { key: "enrolled_on", label: "入学年月", type: "date" },
            { key: "graduated_on", label: "卒業年月", type: "date" },
            { key: "major", label: "専攻" },
            { key: "thesis_title", label: "卒業研究テーマ" },
            { key: "thesis_summary", label: "卒業研究概要", type: "textarea" },
            { key: "advisor_name", label: "指導教員" },
          ]}
          defaultValues={{ is_public: true }}
          onSubmit={async (values) => {
            const error = await addEducationHistory(userId, {
              school_name: (values.school_name as string) || "",
              faculty: (values.faculty as string) || null,
              enrolled_on: (values.enrolled_on as string) || null,
              graduated_on: (values.graduated_on as string) || null,
              major: (values.major as string) || null,
              thesis_title: (values.thesis_title as string) || null,
              thesis_summary: (values.thesis_summary as string) || null,
              advisor_name: (values.advisor_name as string) || null,
              is_public: true,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {education
            .filter((e) =>
              matches(
                e.school_name,
                e.faculty,
                e.major,
                e.thesis_title,
                e.enrolled_on,
                e.graduated_on
              )
            )
            .map((e) => (
              <EntryCard
                key={e.id}
                title={e.school_name}
                subtitle={[e.faculty, e.major].filter(Boolean).join("・")}
                meta={`${e.enrolled_on || "?"} 〜 ${e.graduated_on || "在学中"}`}
                description={e.thesis_title ? `卒業研究: ${e.thesis_title}` : ""}
                isPublic={e.is_public}
                onDelete={async () => {
                  await deleteEducationHistory(e.id);
                  load();
                }}
              />
            ))}

          {education.length === 0 && <EmptyNote text="まだ学歴が登録されていません。" />}
        </PortfolioSection>

        {/* =========================
            職歴
        ========================= */}
        <PortfolioSection
          title="職歴"
          addLabel="+ 職歴を追加"
          fields={[
            { key: "workplace", label: "勤務先", required: true },
            { key: "facility_type", label: "施設種別", placeholder: "例：急性期病院" },
            { key: "joined_on", label: "入職年月", type: "date" },
            { key: "left_on", label: "退職年月", type: "date" },
            { key: "department", label: "所属部署" },
            { key: "position", label: "職位" },
            { key: "employment_type", label: "雇用形態", placeholder: "例：正社員" },
            { key: "clinical_area", label: "臨床領域" },
          ]}
          onSubmit={async (values) => {
            const error = await addWorkHistory(userId, {
              workplace: (values.workplace as string) || "",
              facility_type: (values.facility_type as string) || null,
              joined_on: (values.joined_on as string) || null,
              left_on: (values.left_on as string) || null,
              department: (values.department as string) || null,
              position: (values.position as string) || null,
              employment_type: (values.employment_type as string) || null,
              clinical_area: (values.clinical_area as string) || null,
              is_public: false,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {work
            .filter((w) =>
              matches(
                w.workplace,
                w.department,
                w.clinical_area,
                w.joined_on,
                w.left_on
              )
            )
            .map((w) => (
              <EntryCard
                key={w.id}
                title={w.workplace}
                subtitle={[w.department, w.position].filter(Boolean).join("・")}
                meta={`${w.joined_on || "?"} 〜 ${w.left_on || "現在"}`}
                description={w.clinical_area ? `臨床領域: ${w.clinical_area}` : ""}
                isPublic={w.is_public}
                onDelete={async () => {
                  await deleteWorkHistory(w.id);
                  load();
                }}
              />
            ))}

          {work.length === 0 && <EmptyNote text="まだ職歴が登録されていません。" />}
        </PortfolioSection>

        {/* =========================
            資格・認定
        ========================= */}
        <PortfolioSection
          title="資格・認定"
          addLabel="+ 資格を追加"
          fields={[
            { key: "name", label: "資格名", required: true },
            { key: "issuing_body", label: "認定団体" },
            { key: "acquired_on", label: "取得日", type: "date" },
            { key: "renewed_on", label: "更新日", type: "date" },
            { key: "expires_on", label: "有効期限", type: "date" },
          ]}
          defaultValues={{ is_public: true }}
          onSubmit={async (values) => {
            const error = await addCertification(userId, {
              name: (values.name as string) || "",
              issuing_body: (values.issuing_body as string) || null,
              acquired_on: (values.acquired_on as string) || null,
              renewed_on: (values.renewed_on as string) || null,
              expires_on: (values.expires_on as string) || null,
              is_public: true,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {certifications
            .filter((c) => matches(c.name, c.issuing_body, c.acquired_on))
            .map((c) => (
              <EntryCard
                key={c.id}
                title={c.name}
                subtitle={c.issuing_body || ""}
                meta={[
                  c.acquired_on ? `取得: ${c.acquired_on}` : "",
                  c.expires_on ? `期限: ${c.expires_on}` : "",
                ]
                  .filter(Boolean)
                  .join("　")}
                isPublic={c.is_public}
                onDelete={async () => {
                  await deleteCertification(c.id);
                  load();
                }}
              />
            ))}

          {certifications.length === 0 && (
            <EmptyNote text="まだ資格が登録されていません。" />
          )}
        </PortfolioSection>

        {/* =========================
            教育・指導経験
        ========================= */}
        <PortfolioSection
          title="教育・指導経験"
          addLabel="+ 経験を追加"
          fields={[
            {
              key: "type",
              label: "種別",
              type: "select",
              options: TEACHING_EXPERIENCE_TYPES.map((t) => ({
                value: t,
                label: TEACHING_EXPERIENCE_TYPE_LABEL[t],
              })),
            },
            { key: "title", label: "タイトル" },
            { key: "description", label: "内容", type: "textarea" },
            { key: "occurred_on", label: "実施日", type: "date" },
          ]}
          defaultValues={{ type: "junior_mentoring", is_public: true }}
          onSubmit={async (values) => {
            const error = await addTeachingExperience(userId, {
              type: (values.type as TeachingExperienceType) || "junior_mentoring",
              title: (values.title as string) || null,
              description: (values.description as string) || null,
              occurred_on: (values.occurred_on as string) || null,
              is_public: true,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {teaching
            .filter((t) => matches(t.title, t.description, t.occurred_on))
            .map((t) => (
              <EntryCard
                key={t.id}
                title={`${TEACHING_EXPERIENCE_TYPE_LABEL[t.type]}${
                  t.title ? "・" + t.title : ""
                }`}
                meta={t.occurred_on || ""}
                description={t.description || ""}
                isPublic={t.is_public}
                onDelete={async () => {
                  await deleteTeachingExperience(t.id);
                  load();
                }}
              />
            ))}

          {teaching.length === 0 && (
            <EmptyNote text="まだ教育・指導経験が登録されていません。" />
          )}
        </PortfolioSection>

        {/* =========================
            院内活動・プロジェクト
        ========================= */}
        <PortfolioSection
          title="院内活動・プロジェクト"
          addLabel="+ 活動を追加"
          fields={[
            {
              key: "type",
              label: "種別",
              type: "select",
              options: HOSPITAL_ACTIVITY_TYPES.map((t) => ({
                value: t,
                label: HOSPITAL_ACTIVITY_TYPE_LABEL[t],
              })),
            },
            { key: "title", label: "タイトル" },
            { key: "description", label: "内容", type: "textarea" },
            { key: "started_on", label: "開始日", type: "date" },
            { key: "ended_on", label: "終了日", type: "date" },
          ]}
          defaultValues={{ type: "committee", is_public: true }}
          onSubmit={async (values) => {
            const error = await addHospitalActivity(userId, {
              type: (values.type as HospitalActivityType) || "committee",
              title: (values.title as string) || null,
              description: (values.description as string) || null,
              started_on: (values.started_on as string) || null,
              ended_on: (values.ended_on as string) || null,
              is_public: true,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {activities
            .filter((a) => matches(a.title, a.description, a.started_on))
            .map((a) => (
              <EntryCard
                key={a.id}
                title={`${HOSPITAL_ACTIVITY_TYPE_LABEL[a.type]}${
                  a.title ? "・" + a.title : ""
                }`}
                meta={`${a.started_on || "?"} 〜 ${a.ended_on || "継続中"}`}
                description={a.description || ""}
                isPublic={a.is_public}
                onDelete={async () => {
                  await deleteHospitalActivity(a.id);
                  load();
                }}
              />
            ))}

          {activities.length === 0 && (
            <EmptyNote text="まだ院内活動が登録されていません。" />
          )}
        </PortfolioSection>

        {/* =========================
            語学
        ========================= */}
        <PortfolioSection
          title="語学"
          addLabel="+ 語学を追加"
          fields={[
            { key: "language", label: "言語", required: true, placeholder: "例：英語" },
            { key: "certification_name", label: "資格（TOEIC等）" },
            { key: "score", label: "スコア" },
            { key: "acquired_on", label: "取得日", type: "date" },
            {
              key: "english_available",
              label: "",
              type: "checkbox",
              placeholder: "英語対応可能",
            },
          ]}
          defaultValues={{ is_public: true }}
          onSubmit={async (values) => {
            const error = await addLanguageSkill(userId, {
              language: (values.language as string) || "",
              certification_name: (values.certification_name as string) || null,
              score: (values.score as string) || null,
              acquired_on: (values.acquired_on as string) || null,
              english_available: !!values.english_available,
              is_public: true,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {languages
            .filter((l) => matches(l.language, l.certification_name))
            .map((l) => (
              <EntryCard
                key={l.id}
                title={l.language}
                subtitle={[l.certification_name, l.score]
                  .filter(Boolean)
                  .join(" ")}
                meta={l.english_available ? "英語対応可能" : ""}
                isPublic={l.is_public}
                onDelete={async () => {
                  await deleteLanguageSkill(l.id);
                  load();
                }}
              />
            ))}

          {languages.length === 0 && (
            <EmptyNote text="まだ語学が登録されていません。" />
          )}
        </PortfolioSection>

        {/* =========================
            キャリア目標
        ========================= */}
        <PortfolioSection
          title="キャリア目標"
          addLabel="+ 目標を追加"
          fields={[
            {
              key: "goal_type",
              label: "種別",
              type: "select",
              options: CAREER_GOAL_TYPES.map((t) => ({
                value: t,
                label: CAREER_GOAL_TYPE_LABEL[t],
              })),
            },
            { key: "title", label: "目標", required: true },
            { key: "description", label: "詳細", type: "textarea" },
            { key: "target_date", label: "達成目標日", type: "date" },
          ]}
          defaultValues={{ goal_type: "short_term" }}
          onSubmit={async (values) => {
            const error = await addCareerGoal(userId, {
              goal_type: (values.goal_type as CareerGoalType) || "short_term",
              title: (values.title as string) || "",
              description: (values.description as string) || null,
              target_date: (values.target_date as string) || null,
              status: "not_started",
              is_public: false,
            });

            if (error) return error;
            await load();
            return null;
          }}
        >
          {goals
            .filter((g) => matches(g.title, g.description))
            .map((g) => (
              <div
                key={g.id}
                className="flex items-start justify-between rounded-2xl border border-gray-100 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {CAREER_GOAL_TYPE_LABEL[g.goal_type]}・{g.title}
                    {!g.is_public && (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                        非公開
                      </span>
                    )}
                  </p>

                  {g.description && (
                    <p className="mt-1 text-xs text-gray-500 whitespace-pre-wrap">
                      {g.description}
                    </p>
                  )}

                  <select
                    value={g.status}
                    aria-label={`${g.title}の進捗`}
                    onChange={async (e) => {
                      await updateCareerGoalStatus(
                        g.id,
                        e.target.value as CareerGoalStatus
                      );
                      load();
                    }}
                    className="mt-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs"
                  >
                    {Object.entries(CAREER_GOAL_STATUS_LABEL).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button
                  onClick={async () => {
                    if (!window.confirm("この目標を削除しますか？")) return;
                    await deleteCareerGoal(g.id);
                    load();
                  }}
                  aria-label="この目標を削除"
                  className="shrink-0 px-2 py-1 text-gray-300 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
            ))}

          {goals.length === 0 && (
            <EmptyNote text="まだキャリア目標が登録されていません。" />
          )}
        </PortfolioSection>

        {/* =========================
            スキル
        ========================= */}
        <PortfolioSection
          title="スキル"
          addLabel="+ スキルを追加"
          fields={[
            { key: "name", label: "スキル名", required: true },
            { key: "category", label: "カテゴリ", placeholder: "例：徒手療法" },
          ]}
          onSubmit={async (values) => {
            const error = await addSkill(
              userId,
              (values.name as string) || "",
              (values.category as string) || undefined
            );

            if (error) return error;
            await load();
            return null;
          }}
        >
          <div className="flex flex-wrap gap-2">
            {skills
              .filter((s) => matches(s.name, s.category))
              .map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                >
                  {s.name}
                  {s.category && (
                    <span className="text-gray-400">（{s.category}）</span>
                  )}
                  <button
                    onClick={async () => {
                      if (!window.confirm("このスキルを削除しますか？")) return;
                      await deleteSkill(s.id);
                      load();
                    }}
                    aria-label={`${s.name}を削除`}
                    className="ml-1 px-1.5 text-gray-300 hover:text-gray-500"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>

          {skills.length === 0 && (
            <EmptyNote text="まだスキルが登録されていません。" />
          )}
        </PortfolioSection>
      </div>
    </main>
  );
}

function DashboardTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 py-4 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function EmptyNote({ text }: { text: string }) {
  return <p className="text-sm text-gray-400">{text}</p>;
}

function EntryCard({
  title,
  subtitle,
  meta,
  description,
  isPublic,
  onDelete,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
  isPublic: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-gray-100 px-4 py-3">
      <div>
        <p className="text-sm font-medium">
          {title}
          {!isPublic && (
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
              非公開
            </span>
          )}
        </p>

        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        {meta && <p className="mt-1 text-xs text-gray-400">{meta}</p>}
        {description && (
          <p className="mt-1 text-xs text-gray-500 whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => {
          if (window.confirm("この項目を削除しますか？")) onDelete();
        }}
        className="shrink-0 px-2 py-1 text-gray-300 hover:text-gray-500"
        aria-label="この項目を削除">
        ×
      </button>
    </div>
  );
}

function PortfolioSection({
  title,
  addLabel,
  fields,
  defaultValues,
  onSubmit,
  children,
}: {
  title: string;
  addLabel: string;
  fields: FieldConfig[];
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => Promise<string | null>;
  children: React.ReactNode;
}) {
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState<FormValues>(defaultValues || {});
  const [saving, setSaving] = useState(false);

  function updateField(key: string, value: string | boolean) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const error = await onSubmit(values);

    setSaving(false);

    if (error) {
      notify(error);
      return;
    }

    setValues(defaultValues || {});
    setShowForm(false);
  }

  return (
    <section className="mt-8 border-t pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-sm text-relight-blue"
        >
          {showForm ? "閉じる" : addLabel}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 rounded-2xl border border-gray-100 p-4"
        >
          {fields.map((f) => (
            <div key={f.key}>
              {f.type !== "checkbox" && (
                <label htmlFor={`pf-${f.key}`} className="text-xs text-gray-500">
                  {f.label}
                  {f.required && " *"}
                </label>
              )}

              {f.type === "textarea" ? (
                <textarea
                  id={`pf-${f.key}`}
                  value={(values[f.key] as string) || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={3}
                  required={f.required}
                  className="mt-1 w-full resize-none rounded-xl border px-4 py-2.5 text-sm"
                />
              ) : f.type === "select" ? (
                <select
                  id={`pf-${f.key}`}
                  value={(values[f.key] as string) || f.options?.[0]?.value || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border bg-white px-4 py-2.5 text-sm"
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "checkbox" ? (
                <label className="mt-1 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!values[f.key]}
                    onChange={(e) => updateField(f.key, e.target.checked)}
                    className="h-4 w-4"
                  />
                  {f.placeholder}
                </label>
              ) : (
                <input
                  id={`pf-${f.key}`}
                  type={f.type || "text"}
                  value={(values[f.key] as string) || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "保存中..." : "追加する"}
          </button>
        </form>
      )}

      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}
