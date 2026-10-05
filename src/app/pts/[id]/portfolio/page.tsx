"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
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
  countSkillEndorsements,
  endorseSkill,
  listMyEndorsedSkillIds,
  unendorseSkill,
} from "@/lib/portfolio";
import type { CareerGoal } from "@/lib/portfolio";
import type { PtProfile } from "@/lib/types";
import { ptName } from "@/lib/format";
import { notify } from "@/lib/notify";

type CaseReport = {
  id: string;
  title: string | null;
  disease_category: string | null;
  created_at: string;
};

export default function PortfolioViewPage() {
  const params = useParams();
  const id = params.id as string;

  const [pt, setPt] = useState<PtProfile | null>(null);
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

  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [ownIdPhotoUrl, setOwnIdPhotoUrl] = useState<string | null>(null);
  const [endorsementCounts, setEndorsementCounts] = useState<
    Record<string, number>
  >({});
  const [myEndorsedIds, setMyEndorsedIds] = useState<string[]>([]);

  async function toggleEndorse(skillId: string) {
    if (!myUserId) {
      notify("ログインすると推薦できます");
      return;
    }

    const already = myEndorsedIds.includes(skillId);

    const error = already
      ? await unendorseSkill(skillId, myUserId)
      : await endorseSkill(skillId, myUserId);

    if (error) {
      notify(error);
      return;
    }

    setMyEndorsedIds((prev) =>
      already ? prev.filter((s) => s !== skillId) : [...prev, skillId]
    );
    setEndorsementCounts((prev) => ({
      ...prev,
      [skillId]: (prev[skillId] || 0) + (already ? -1 : 1),
    }));

    if (!already && pt && pt.user_id !== myUserId) {
      await supabase.from("notifications").insert({
        user_id: pt.user_id,
        actor_id: myUserId,
        type: "endorsement",
        is_read: false,
      });
    }
  }

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
        .order("started_on", { ascending: false }),
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

    const skillRows = (skillData || []) as Skill[];
    setSkills(skillRows);

    const skillIds = skillRows.map((s) => s.id);
    setEndorsementCounts(await countSkillEndorsements(skillIds));

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setMyUserId(user.id);
      setMyEndorsedIds(await listMyEndorsedSkillIds(skillIds, user.id));

      // 証明写真は非公開。本人が自分のポートフォリオを見ている時だけ表示する
      // （pt_private・id-photosバケットともRLSで本人しか読めない）
      if (user.id === userId) {
        const { data: priv } = await supabase
          .from("pt_private")
          .select("id_photo_path")
          .eq("user_id", user.id)
          .maybeSingle();

        if (priv?.id_photo_path) {
          const { data: signed } = await supabase.storage
            .from("id-photos")
            .createSignedUrl(priv.id_photo_path, 3600);
          setOwnIdPhotoUrl(signed?.signedUrl ?? null);
        }
      }
    }
  }

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

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
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const caseCount =
    caseReports.length +
    achievements.filter((a) => a.category === "case_presentation").length;

  // 臨床実績（症例報告＋院内症例発表）は「臨床実績」として1つにまとめる
  const clinicalItems = [
    ...caseReports.map((c) => ({
      id: `case-${c.id}`,
      title: c.title || "無題の症例報告",
      kind: "症例報告",
      category: c.disease_category || "",
      date: c.created_at?.slice(0, 10) || "",
      description: "",
    })),
    ...achievements
      .filter((a) => a.category === "case_presentation")
      .map((a) => ({
        id: `case-presentation-${a.id}`,
        title: a.title || "無題の症例発表",
        kind: "院内症例発表",
        category: "",
        date: a.achieved_on || "",
        description: a.memo || "",
      })),
  ].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const conferenceItems = achievements.filter((a) => a.category === "conference");
  const paperItems = achievements.filter((a) => a.category === "paper");
  const trainingItems = achievements.filter((a) => a.category === "training");
  const otherItems = achievements.filter((a) => a.category === "other");

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24 print:bg-white print:pb-0">
      {/* A4での印刷・PDF保存に合わせたページ設定（登録した情報は省略せず、必要なだけページが増える想定） */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>

      {/* ヘッダー（印刷時は非表示） */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link
            href={`/pts/${pt.id}`}
            className="text-sm text-gray-400 hover:text-gray-700"
          >
            ← プロフィール
          </Link>

          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => window.print()}
              className="rounded-full bg-relight-gradient px-5 py-2 text-sm font-medium text-white"
            >
              PDFとして保存
            </button>
            <p className="max-w-[220px] text-right text-[11px] leading-snug text-gray-400">
              保存ダイアログの「詳細設定」で
              <br />
              「ヘッダーとフッター」のチェックを外すと
              <br />
              URLや日付が入らずきれいに保存されます
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
        {/* 印刷時のみ表示する書類タイトル（画面では基本情報カードに名前があるため省略） */}
        <div className="mb-4 hidden items-baseline justify-between border-b border-gray-300 pb-3 print:mb-3 print:flex print:pb-2">
          <p className="text-lg font-bold tracking-wide text-gray-900">
            ポートフォリオ
          </p>
          <p className="text-xs text-gray-500">
            作成日: {new Date().toISOString().slice(0, 10)}
          </p>
        </div>

        {/* =========================
            基本情報
        ========================= */}
        <section className="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:flex-row print:gap-4 print:rounded-none print:border-0 print:p-0 print:shadow-none print:break-inside-avoid">
          {/* 証明写真（非公開：本人が見ている時だけ表示。PDF保存は本人の画面から行う） */}
          {myUserId && myUserId === pt.user_id && (
            <div className="mx-auto h-40 w-32 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:mx-0 print:h-28 print:w-24">
              {ownIdPhotoUrl ? (
                <img loading="lazy" decoding="async"
                  src={ownIdPhotoUrl}
                  alt="証明写真"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-center text-xs text-gray-300">
                  証明写真
                </div>
              )}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {ptName(pt.full_name)}
            </h1>

            <p className="mt-1 text-base text-gray-600">
              {pt.qualification || "理学療法士"}
            </p>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-gray-600 sm:grid-cols-2 print:mt-2 print:text-gray-800">
              {pt.workplace && <p>勤務先: {pt.workplace}</p>}
              {pt.department && <p>所属部署: {pt.department}</p>}
              {pt.specialty && <p>専門: {pt.specialty}</p>}
              {pt.experience_years !== null &&
                pt.experience_years !== undefined && (
                  <p>経験年数: {pt.experience_years}年</p>
                )}
            </div>

            {pt.biography && (
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700 print:mt-2 print:leading-snug print:text-gray-800">
                {pt.biography}
              </p>
            )}

            {(pt.strengths || pt.interests) && (
              <div className="mt-4 space-y-2 text-sm text-gray-700 print:mt-2 print:space-y-1 print:text-gray-800">
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
            サマリー（ひと目でわかる概要）
        ========================= */}
        <section className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 print:mt-4 print:break-inside-avoid">
          <SummaryTile label="症例経験" value={caseCount} />
          <SummaryTile label="保有資格" value={certifications.length} />
          <SummaryTile
            label="学会発表・論文"
            value={
              achievements.filter(
                (a) => a.category === "conference" || a.category === "paper"
              ).length
            }
          />
          <SummaryTile
            label="研修受講"
            value={achievements.filter((a) => a.category === "training").length}
          />
        </section>

        {/* =========================
            I. 経歴
        ========================= */}
        {(education.length > 0 || work.length > 0) && (
          <MacroSection number="I" title="経歴">
            <PortfolioBlock title="職歴">
              {work.map((w) => (
                <PrintEntry
                  key={w.id}
                  title={w.workplace}
                  subtitle={[w.department, w.position]
                    .filter(Boolean)
                    .join("・")}
                  meta={`${w.joined_on || "?"} 〜 ${w.left_on || "現在"}`}
                  description={
                    w.clinical_area ? `臨床領域: ${w.clinical_area}` : ""
                  }
                />
              ))}
            </PortfolioBlock>

            <PortfolioBlock title="学歴">
              {education.map((e) => (
                <PrintEntry
                  key={e.id}
                  title={e.school_name}
                  subtitle={[e.faculty, e.major].filter(Boolean).join("・")}
                  meta={`${e.enrolled_on || "?"} 〜 ${
                    e.graduated_on || "在学中"
                  }`}
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
          </MacroSection>
        )}

        {/* =========================
            II. 資格・専門性
        ========================= */}
        {(targets.length > 0 ||
          certifications.length > 0 ||
          languages.length > 0 ||
          skills.length > 0) && (
          <MacroSection number="II" title="資格・専門性">
            {targets.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2 print:break-inside-avoid">
                {targets.map((t) => {
                  const progress = computeQualificationProgress(
                    t,
                    achievements
                  );
                  return (
                    <span
                      key={t.id}
                      className="inline-flex items-center rounded-full border border-relight px-3 py-1 text-xs text-gray-600 print:border-gray-400 print:text-gray-800"
                    >
                      {t.name}（更新目標）{progress.count}/{t.required_total}
                    </span>
                  );
                })}
              </div>
            )}

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

            {skills.length > 0 && (
              <div className="mt-3 print:mt-1.5 print:break-inside-avoid">
                <p className="text-sm font-medium text-gray-900 print:text-sm print:break-after-avoid">
                  スキル
                </p>

                <div className="mt-2 flex flex-wrap gap-2 print:mt-1">
                  {skills.map((s) => {
                    const count = endorsementCounts[s.id] || 0;
                    const endorsed = myEndorsedIds.includes(s.id);
                    const isOwnProfile = myUserId === pt.user_id;

                    return (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                      >
                        {s.name}
                        {s.category && (
                          <span className="text-gray-400">
                            （{s.category}）
                          </span>
                        )}
                        {count > 0 && (
                          <span className="text-gray-400">👍{count}</span>
                        )}
                        {!isOwnProfile && (
                          <button
                            onClick={() => toggleEndorse(s.id)}
                            className={`ml-0.5 rounded-full px-2 py-0.5 text-[11px] print:hidden ${
                              endorsed
                                ? "bg-relight-gradient text-white"
                                : "border border-gray-300 text-gray-500 hover:border-gray-400"
                            }`}
                          >
                            {endorsed ? "推薦済み" : "推薦する"}
                          </button>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </MacroSection>
        )}

        {/* =========================
            III. 臨床実績
        ========================= */}
        {clinicalItems.length > 0 && (
          <MacroSection number="III" title="臨床実績">
            <PortfolioBlock title={`症例経験（${clinicalItems.length}件）`}>
              {clinicalItems.map((item) => (
                <PrintEntry
                  key={item.id}
                  title={item.title}
                  subtitle={item.kind}
                  meta={[item.category, item.date].filter(Boolean).join("・")}
                  description={item.description}
                />
              ))}
            </PortfolioBlock>
          </MacroSection>
        )}

        {/* =========================
            IV. 学術活動
        ========================= */}
        {(conferenceItems.length > 0 ||
          paperItems.length > 0 ||
          trainingItems.length > 0 ||
          otherItems.length > 0) && (
          <MacroSection number="IV" title="学術活動">
            <PortfolioBlock title="学会発表">
              {conferenceItems.map((a) => (
                <PrintEntry
                  key={a.id}
                  title={a.title || "無題"}
                  subtitle={a.conference_name || ""}
                  meta={a.achieved_on}
                  description={a.memo || ""}
                />
              ))}
            </PortfolioBlock>

            <PortfolioBlock title="論文">
              {paperItems.map((a) => (
                <PrintEntry
                  key={a.id}
                  title={a.title || "無題"}
                  meta={a.achieved_on}
                  description={a.memo || ""}
                />
              ))}
            </PortfolioBlock>

            <PortfolioBlock title="研修受講">
              {trainingItems.map((a) => (
                <PrintEntry
                  key={a.id}
                  title={a.title || "無題"}
                  meta={a.achieved_on}
                  description={a.memo || ""}
                />
              ))}
            </PortfolioBlock>

            <PortfolioBlock title="その他の実績">
              {otherItems.map((a) => (
                <PrintEntry
                  key={a.id}
                  title={a.title || "無題"}
                  meta={a.achieved_on}
                  description={a.memo || ""}
                />
              ))}
            </PortfolioBlock>
          </MacroSection>
        )}

        {/* =========================
            V. 教育・組織への貢献
        ========================= */}
        {(teaching.length > 0 || activities.length > 0) && (
          <MacroSection number="V" title="教育・組織への貢献">
            <PortfolioBlock title="教育・指導経験">
              {teaching.map((t) => (
                <PrintEntry
                  key={t.id}
                  title={`${TEACHING_EXPERIENCE_TYPE_LABEL[t.type]}${
                    t.title ? "・" + t.title : ""
                  }`}
                  meta={`${t.started_on || "?"} 〜 ${
                    t.ended_on || "継続中"
                  }`}
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
                  meta={`${a.started_on || "?"} 〜 ${
                    a.ended_on || "継続中"
                  }`}
                  description={a.description || ""}
                />
              ))}
            </PortfolioBlock>
          </MacroSection>
        )}

        {/* =========================
            VI. 今後の目標
        ========================= */}
        {goals.length > 0 && (
          <MacroSection number="VI" title="今後の目標">
            <PortfolioBlock title="キャリア目標">
              {goals.map((g) => (
                <PrintEntry
                  key={g.id}
                  title={`${CAREER_GOAL_TYPE_LABEL[g.goal_type]}・${g.title}`}
                  description={g.description || ""}
                />
              ))}
            </PortfolioBlock>
          </MacroSection>
        )}
      </div>
    </main>
  );
}

// ポートフォリオを大きな流れ（経歴→資格・専門性→臨床実績→学術活動→
// 教育・組織への貢献→今後の目標）で読めるようにする見出しブロック
function MacroSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 print:mt-5 print:break-before-auto">
      <div className="flex items-baseline gap-2 border-b-2 border-relight pb-2 print:pb-1 print:break-after-avoid">
        <span className="text-sm font-semibold text-relight-blue">
          {number}
        </span>
        <h2 className="text-xl font-bold text-gray-900 print:text-base">
          {title}
        </h2>
      </div>

      <div className="mt-4 space-y-6 print:mt-2 print:space-y-3">{children}</div>
    </section>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white py-3 text-center print:rounded-none print:border-gray-300 print:py-1.5">
      <p className="text-lg font-semibold print:text-base">{value}</p>
      <p className="mt-1 text-xs text-gray-500 print:mt-0 print:text-gray-700">
        {label}
      </p>
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
    <section>
      <h3 className="text-base font-semibold text-gray-900 print:text-sm print:break-after-avoid">
        {title}
      </h3>

      <div className="mt-3 space-y-2 print:mt-1.5 print:space-y-1">
        {children}
      </div>
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
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 print:rounded-none print:border-0 print:border-b print:border-gray-200 print:px-0 print:py-1 print:break-inside-avoid">
      <p className="text-sm font-medium text-gray-900 print:leading-snug">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500 print:mt-0.5 print:leading-snug print:text-gray-700">
          {subtitle}
        </p>
      )}
      {meta && (
        <p className="mt-1 text-xs text-gray-400 print:mt-0.5 print:leading-snug print:text-gray-600">
          {meta}
        </p>
      )}
      {description && (
        <p className="mt-1 whitespace-pre-wrap text-xs text-gray-600 print:mt-0.5 print:leading-snug print:text-gray-800">
          {description}
        </p>
      )}
    </div>
  );
}
