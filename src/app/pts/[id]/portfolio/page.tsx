"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  QualificationTarget,
  computeQualificationProgress,
  listPublicAchievements,
  listQualificationTargets,
} from "@/lib/achievements";
import {
  CAREER_GOAL_TYPE_LABEL,
  Certification,
  EducationHistory,
  HOSPITAL_ACTIVITY_TYPE_LABEL,
  HospitalActivity,
  LanguageSkill,
  Skill,
  TEACHING_EXPERIENCE_TYPE_LABEL,
  TeachingExperience,
  WorkHistory,
} from "@/lib/portfolio";
import type { CareerGoal } from "@/lib/portfolio";

type CaseReport = {
  id: string;
  title: string | null;
  disease_category: string | null;
  created_at: string;
};

export default function PortfolioViewPage() {
  const params = useParams();
  const id = params.id as string;

  const [pt, setPt] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [targets, setTargets] = useState<QualificationTarget[]>([]);
  const [caseReports, setCaseReports] = useState<CaseReport[]>([]);
  const [education, setEducation] = useState<EducationHistory[]>([]);
  const [work, setWork] = useState<WorkHistory[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [teaching, setTeaching] = useState<TeachingExperience[]>([]);
  const [activities, setActivities] = useState<HospitalActivity[]>([]);
  const [languages, setLanguages] = useState<LanguageSkill[]>([]);
  const [goals, setGoals] = useState<CareerGoal[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  async function load() {
    setErrorMessage("");

    const { data: ptList, error: ptError } = await supabase
      .from("pt_profiles")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (ptError) {
      setErrorMessage("プロフィールの読み込みに失敗しました");
      return;
    }

    const ptData = ptList?.[0];

    if (!ptData) {
      setErrorMessage("このPTプロフィールは見つかりませんでした");
      return;
    }

    setPt(ptData);

    const userId = ptData.user_id;

    const { data: caseData } = await supabase
      .from("posts")
      .select("id, title, disease_category, created_at")
      .eq("user_id", userId)
      .eq("post_type", "case")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    setCaseReports(caseData || []);
    setAchievements(await listPublicAchievements(userId));
    setTargets(await listQualificationTargets(userId));

    const [
      { data: eduData },
      { data: workData },
      { data: certData },
      { data: teachData },
      { data: actData },
      { data: langData },
      { data: goalData },
      { data: skillData },
    ] = await Promise.all([
      supabase
        .from("education_history")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true)
        .order("enrolled_on", { ascending: false }),
      supabase
        .from("work_history")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true)
        .order("joined_on", { ascending: false }),
      supabase
        .from("certifications")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true)
        .order("acquired_on", { ascending: false }),
      supabase
        .from("teaching_experiences")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true)
        .order("occurred_on", { ascending: false }),
      supabase
        .from("hospital_activities")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true)
        .order("started_on", { ascending: false }),
      supabase
        .from("language_skills")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true),
      supabase
        .from("career_goals")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true),
      supabase
        .from("skills")
        .select("*")
        .eq("user_id", userId)
        .eq("is_public", true),
    ]);

    setEducation((eduData || []) as EducationHistory[]);
    setWork((workData || []) as WorkHistory[]);
    setCertifications((certData || []) as Certification[]);
    setTeaching((teachData || []) as TeachingExperience[]);
    setActivities((actData || []) as HospitalActivity[]);
    setLanguages((langData || []) as LanguageSkill[]);
    setGoals((goalData || []) as CareerGoal[]);
    setSkills((skillData || []) as Skill[]);
  }

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <p className="text-sm text-gray-500">{errorMessage}</p>
      </main>
    );
  }

  if (!pt) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-sm text-gray-400">読み込み中...</p>
      </main>
    );
  }

  const caseCount =
    caseReports.length +
    achievements.filter((a) => a.category === "case_presentation").length;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24 print:bg-white print:pb-0">
      {/* ヘッダー（印刷時は非表示） */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link
            href={`/pts/${pt.id}`}
            className="text-sm text-gray-400 hover:text-gray-700"
          >
            ← プロフィール
          </Link>

          <button
            onClick={() => window.print()}
            className="rounded-full bg-relight-gradient px-5 py-2 text-sm font-medium text-white"
          >
            PDFとして保存
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
        {/* =========================
            基本情報
        ========================= */}
        <section className="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:flex-row print:rounded-none print:border-0 print:p-0 print:shadow-none">
          {/* 証明写真 */}
          <div className="mx-auto h-40 w-32 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:mx-0">
            {pt.id_photo ? (
              <img
                src={pt.id_photo}
                alt="証明写真"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-xs text-gray-300">
                証明写真
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {pt.full_name || "PTユーザー"}
            </h1>

            <p className="mt-1 text-base text-gray-600">
              {pt.qualification || "理学療法士"}
            </p>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-gray-600 sm:grid-cols-2">
              {pt.workplace && <p>勤務先: {pt.workplace}</p>}
              {pt.department && <p>所属部署: {pt.department}</p>}
              {pt.specialty && <p>専門: {pt.specialty}</p>}
              {pt.experience_years !== null &&
                pt.experience_years !== undefined && (
                  <p>経験年数: {pt.experience_years}年</p>
                )}
            </div>

            {pt.biography && (
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {pt.biography}
              </p>
            )}

            {(pt.strengths || pt.interests) && (
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                {pt.strengths && (
                  <p>
                    <span className="font-semibold">自分の強み: </span>
                    {pt.strengths}
                  </p>
                )}
                {pt.interests && (
                  <p>
                    <span className="font-semibold">興味のある分野: </span>
                    {pt.interests}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* =========================
            サマリー
        ========================= */}
        <section className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 print:mt-6">
          <SummaryTile
            label="学会発表"
            value={achievements.filter((a) => a.category === "conference").length}
          />
          <SummaryTile
            label="論文"
            value={achievements.filter((a) => a.category === "paper").length}
          />
          <SummaryTile
            label="研修受講"
            value={achievements.filter((a) => a.category === "training").length}
          />
          <SummaryTile label="症例経験" value={caseCount} />
        </section>

        {/* 資格更新の目標 */}
        {targets.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 print:mt-4">
            {targets.map((t) => {
              const progress = computeQualificationProgress(t, achievements);
              return (
                <span
                  key={t.id}
                  className="inline-flex items-center rounded-full border border-relight px-3 py-1 text-xs text-gray-600"
                >
                  🏅 {t.name} {progress.count}/{t.required_total}
                </span>
              );
            })}
          </div>
        )}

        <PortfolioBlock title="学歴">
          {education.map((e) => (
            <PrintEntry
              key={e.id}
              title={e.school_name}
              subtitle={[e.faculty, e.major].filter(Boolean).join("・")}
              meta={`${e.enrolled_on || "?"} 〜 ${e.graduated_on || "在学中"}`}
              description={
                e.thesis_title
                  ? `卒業研究: ${e.thesis_title}${
                      e.thesis_summary ? "　" + e.thesis_summary : ""
                    }`
                  : ""
              }
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="職歴">
          {work.map((w) => (
            <PrintEntry
              key={w.id}
              title={w.workplace}
              subtitle={[w.department, w.position].filter(Boolean).join("・")}
              meta={`${w.joined_on || "?"} 〜 ${w.left_on || "現在"}`}
              description={w.clinical_area ? `臨床領域: ${w.clinical_area}` : ""}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="資格・認定">
          {certifications.map((c) => (
            <PrintEntry
              key={c.id}
              title={c.name}
              subtitle={c.issuing_body || ""}
              meta={[
                c.acquired_on ? `取得: ${c.acquired_on}` : "",
                c.expires_on ? `期限: ${c.expires_on}` : "",
              ]
                .filter(Boolean)
                .join("　")}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="学会発表・論文・研修">
          {achievements.map((a) => (
            <PrintEntry
              key={a.id}
              title={`${ACHIEVEMENT_CATEGORY_LABEL[a.category]}${
                a.conference_name ? "・" + a.conference_name : ""
              }${a.title ? "・" + a.title : ""}`}
              meta={a.achieved_on}
              description={a.memo || ""}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="症例報告">
          {caseReports.map((c) => (
            <PrintEntry
              key={c.id}
              title={c.title || "無題の症例報告"}
              meta={`${c.disease_category ? c.disease_category + "・" : ""}${c.created_at?.slice(0, 10)}`}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="教育・指導経験">
          {teaching.map((t) => (
            <PrintEntry
              key={t.id}
              title={`${TEACHING_EXPERIENCE_TYPE_LABEL[t.type]}${
                t.title ? "・" + t.title : ""
              }`}
              meta={t.occurred_on || ""}
              description={t.description || ""}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="院内活動・プロジェクト">
          {activities.map((a) => (
            <PrintEntry
              key={a.id}
              title={`${HOSPITAL_ACTIVITY_TYPE_LABEL[a.type]}${
                a.title ? "・" + a.title : ""
              }`}
              meta={`${a.started_on || "?"} 〜 ${a.ended_on || "継続中"}`}
              description={a.description || ""}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="語学">
          {languages.map((l) => (
            <PrintEntry
              key={l.id}
              title={l.language}
              subtitle={[l.certification_name, l.score]
                .filter(Boolean)
                .join(" ")}
              meta={l.english_available ? "英語対応可能" : ""}
            />
          ))}
        </PortfolioBlock>

        <PortfolioBlock title="キャリア目標">
          {goals.map((g) => (
            <PrintEntry
              key={g.id}
              title={`${CAREER_GOAL_TYPE_LABEL[g.goal_type]}・${g.title}`}
              description={g.description || ""}
            />
          ))}
        </PortfolioBlock>

        {skills.length > 0 && (
          <section className="mt-6 print:mt-4">
            <h2 className="text-lg font-semibold text-gray-900 print:text-base">
              スキル
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                >
                  {s.name}
                  {s.category && (
                    <span className="text-gray-400">（{s.category}）</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white py-3 text-center print:border print:py-2">
      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function PortfolioBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const items = Array.isArray(children)
    ? children.filter(Boolean)
    : children
    ? [children]
    : [];

  if (items.length === 0) return null;

  return (
    <section className="mt-6 print:mt-4 print:break-inside-avoid">
      <h2 className="text-lg font-semibold text-gray-900 print:text-base">
        {title}
      </h2>

      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function PrintEntry({
  title,
  subtitle,
  meta,
  description,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 print:rounded-none print:border-0 print:border-b print:px-0 print:py-2">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      {meta && <p className="mt-1 text-xs text-gray-400">{meta}</p>}
      {description && (
        <p className="mt-1 whitespace-pre-wrap text-xs text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}
