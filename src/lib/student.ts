import { supabase } from "@/lib/supabase";

// 学生アカウント(理学療法士をめざす学生)向けの共通処理

// ---------------------------------------------------------
// 卒業予定・国家試験
// ---------------------------------------------------------

export type StudentProfile = {
  user_id: string;
  school_name: string | null;
  graduation_year: number;
  national_exam_date: string | null;
  graduated_at: string | null;
};

export async function getMyStudentProfile(userId: string): Promise<StudentProfile | null> {
  const { data } = await supabase
    .from("student_profiles")
    .select("user_id, school_name, graduation_year, national_exam_date, graduated_at")
    .eq("user_id", userId)
    .maybeSingle();

  return (data as StudentProfile | null) ?? null;
}

export async function updateMyStudentProfile(
  userId: string,
  fields: { school_name: string | null; graduation_year: number; national_exam_date: string | null }
): Promise<string | null> {
  const { error } = await supabase
    .from("student_profiles")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  return error ? error.message : null;
}

// 卒業予定年として選べる年(3月卒業の年)。1〜3月は今年の3月卒業もまだ先、4月以降は来年から
export function graduationYearOptions(now: Date = new Date()): number[] {
  const first = now.getFullYear() + (now.getMonth() + 1 <= 3 ? 0 : 1);
  return Array.from({ length: 7 }, (_, i) => first + i);
}

// 理学療法士国家試験は例年2月の第3日曜(日程は厚生労働省の公表を確認すること)。目安として使う
export function estimatedExamDate(graduationYear: number): Date {
  const feb1 = new Date(graduationYear, 1, 1);
  const firstSunday = 1 + ((7 - feb1.getDay()) % 7);
  return new Date(graduationYear, 1, firstSunday + 14);
}

export function toDateInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysUntil(dateStr: string | Date, now: Date = new Date()): number {
  const target = typeof dateStr === "string" ? new Date(`${dateStr}T00:00:00`) : dateStr;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((t.getTime() - today.getTime()) / 86400000);
}

export type StudentCountdown = {
  examDate: Date;
  examIsEstimate: boolean;
  examDays: number;
  graduationDate: Date;
  graduationDays: number;
  switchDate: Date;
  switchDays: number;
};

export function computeCountdown(profile: StudentProfile, now: Date = new Date()): StudentCountdown {
  const examIsEstimate = !profile.national_exam_date;
  const examDate = profile.national_exam_date
    ? new Date(`${profile.national_exam_date}T00:00:00`)
    : estimatedExamDate(profile.graduation_year);

  const graduationDate = new Date(profile.graduation_year, 2, 31);
  const switchDate = new Date(profile.graduation_year, 3, 1);

  return {
    examDate,
    examIsEstimate,
    examDays: daysUntil(examDate, now),
    graduationDate,
    graduationDays: daysUntil(graduationDate, now),
    switchDate,
    switchDays: daysUntil(switchDate, now),
  };
}

// ---------------------------------------------------------
// 実習・就活トラッカー
// ---------------------------------------------------------

export type ItemKind = "practicum" | "job" | "task";

export const KIND_LABEL: Record<ItemKind, string> = {
  practicum: "実習",
  job: "就活・病院見学",
  task: "提出物・やること",
};

export const KIND_STATUSES: Record<ItemKind, { value: string; label: string }[]> = {
  practicum: [
    { value: "planned", label: "予定" },
    { value: "ongoing", label: "実習中" },
    { value: "done", label: "終了" },
  ],
  job: [
    { value: "interested", label: "気になる" },
    { value: "visit_booked", label: "見学予約" },
    { value: "visited", label: "見学済み" },
    { value: "applied", label: "応募" },
    { value: "interview", label: "面接" },
    { value: "offer", label: "内定" },
    { value: "declined", label: "見送り" },
  ],
  task: [
    { value: "todo", label: "未提出" },
    { value: "done", label: "提出済み" },
  ],
};

export const DEFAULT_STATUS: Record<ItemKind, string> = {
  practicum: "planned",
  job: "interested",
  task: "todo",
};

export function statusLabel(kind: ItemKind, status: string): string {
  return KIND_STATUSES[kind].find((s) => s.value === status)?.label ?? status;
}

// 完了・終了扱い(期限の一覧には出さない)
export function isClosedStatus(kind: ItemKind, status: string): boolean {
  if (kind === "practicum") return status === "done";
  if (kind === "task") return status === "done";
  return status === "offer" || status === "declined";
}

export type PracticumType = "observation" | "evaluation" | "comprehensive" | "other";

export const PRACTICUM_TYPE_LABEL: Record<PracticumType, string> = {
  observation: "見学実習",
  evaluation: "評価実習",
  comprehensive: "総合臨床実習",
  other: "その他",
};

export const PRACTICUM_TYPES = Object.keys(PRACTICUM_TYPE_LABEL) as PracticumType[];

export type StudentItem = {
  id: string;
  kind: ItemKind;
  status: string;
  title: string;
  hospital_id: string | null;
  practicum_type: PracticumType | null;
  starts_on: string | null;
  ends_on: string | null;
  due_on: string | null;
  memo: string | null;
  created_at: string;
};

const ITEM_COLUMNS =
  "id, kind, status, title, hospital_id, practicum_type, starts_on, ends_on, due_on, memo, created_at";

export async function listStudentItems(userId: string): Promise<StudentItem[]> {
  const { data } = await supabase
    .from("student_items")
    .select(ITEM_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data || []) as StudentItem[];
}

export type StudentItemInput = {
  kind: ItemKind;
  status: string;
  title: string;
  hospital_id?: string | null;
  practicum_type?: PracticumType | null;
  starts_on?: string | null;
  ends_on?: string | null;
  due_on?: string | null;
  memo?: string | null;
};

export async function addStudentItem(input: StudentItemInput): Promise<string | null> {
  const { error } = await supabase.from("student_items").insert({
    kind: input.kind,
    status: input.status,
    title: input.title.trim(),
    hospital_id: input.hospital_id ?? null,
    practicum_type: input.kind === "practicum" ? (input.practicum_type ?? "other") : null,
    starts_on: input.starts_on || null,
    ends_on: input.ends_on || null,
    due_on: input.due_on || null,
    memo: input.memo?.trim() || null,
  });

  return error ? error.message : null;
}

export async function updateStudentItem(
  id: string,
  fields: Partial<Pick<StudentItemInput, "status" | "title" | "starts_on" | "ends_on" | "due_on" | "memo" | "practicum_type">>
): Promise<string | null> {
  const { error } = await supabase
    .from("student_items")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);

  return error ? error.message : null;
}

export async function deleteStudentItem(id: string): Promise<string | null> {
  const { error } = await supabase.from("student_items").delete().eq("id", id);
  return error ? error.message : null;
}

// 病院ページの「見学したい」「実習先に追加」から呼ぶ
export async function addHospitalToTracker(params: {
  hospitalId: string;
  hospitalName: string;
  kind: "job" | "practicum";
}): Promise<string | null> {
  return addStudentItem({
    kind: params.kind,
    status: DEFAULT_STATUS[params.kind],
    title: params.hospitalName,
    hospital_id: params.hospitalId,
  });
}

// 直近の予定: 期限・開始日が近い順に並べる(終わったものは除く)
export type UpcomingEvent = {
  item: StudentItem;
  date: string;
  label: string;
  days: number;
};

export function upcomingEvents(items: StudentItem[], now: Date = new Date(), limit = 5): UpcomingEvent[] {
  const events: UpcomingEvent[] = [];

  for (const item of items) {
    if (isClosedStatus(item.kind, item.status)) continue;

    if (item.kind === "practicum") {
      if (item.starts_on) events.push({ item, date: item.starts_on, label: "実習開始", days: daysUntil(item.starts_on, now) });
      if (item.ends_on) events.push({ item, date: item.ends_on, label: "実習終了", days: daysUntil(item.ends_on, now) });
    }
    if (item.due_on) {
      events.push({ item, date: item.due_on, label: item.kind === "task" ? "提出期限" : "期日", days: daysUntil(item.due_on, now) });
    }
  }

  return events
    .filter((e) => e.days >= -1)
    .sort((a, b) => a.days - b.days)
    .slice(0, limit);
}

// ---------------------------------------------------------
// 国試の学習ログ
// ---------------------------------------------------------

export const EXAM_SUBJECTS = [
  "解剖学",
  "生理学",
  "運動学",
  "病理学・臨床心理学",
  "リハビリテーション医学",
  "内科学",
  "整形外科学",
  "神経内科学",
  "精神医学・小児科学",
  "理学療法評価学",
  "運動療法学",
  "物理療法学",
  "日常生活活動(ADL)",
  "義肢装具学",
  "神経系の理学療法",
  "運動器の理学療法",
  "内部障害の理学療法",
  "地域理学療法",
  "関係法規・公衆衛生",
  "実技・臨床実習",
  "その他",
];

export type StudyLog = {
  id: string;
  studied_on: string;
  subject: string;
  minutes: number;
  confidence: number | null;
  memo: string | null;
};

export async function listStudyLogs(userId: string, sinceDays = 400): Promise<StudyLog[]> {
  const since = new Date();
  since.setDate(since.getDate() - sinceDays);

  const { data } = await supabase
    .from("study_logs")
    .select("id, studied_on, subject, minutes, confidence, memo")
    .eq("user_id", userId)
    .gte("studied_on", toDateInput(since))
    .order("studied_on", { ascending: false })
    .order("created_at", { ascending: false });

  return (data || []) as StudyLog[];
}

export async function addStudyLog(input: {
  studied_on: string;
  subject: string;
  minutes: number;
  confidence: number | null;
  memo: string;
}): Promise<string | null> {
  const { error } = await supabase.from("study_logs").insert({
    studied_on: input.studied_on,
    subject: input.subject,
    minutes: Math.round(input.minutes),
    confidence: input.confidence,
    memo: input.memo.trim() || null,
  });

  return error ? error.message : null;
}

export async function deleteStudyLog(id: string): Promise<string | null> {
  const { error } = await supabase.from("study_logs").delete().eq("id", id);
  return error ? error.message : null;
}

export type StudyStats = {
  totalMinutes: number;
  weekMinutes: number;
  streakDays: number;
  studiedToday: boolean;
  bySubject: { subject: string; minutes: number; avgConfidence: number | null }[];
  weakSubjects: string[];
};

export function computeStudyStats(logs: StudyLog[], now: Date = new Date()): StudyStats {
  const today = toDateInput(now);
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekStart = toDateInput(weekAgo);

  const totalMinutes = logs.reduce((s, l) => s + l.minutes, 0);
  const weekMinutes = logs.filter((l) => l.studied_on >= weekStart).reduce((s, l) => s + l.minutes, 0);

  // 連続日数: 今日(まだなら昨日)から、毎日1件以上の記録がある日数
  const days = new Set(logs.map((l) => l.studied_on));
  const studiedToday = days.has(today);
  const cursor = new Date(now);
  if (!studiedToday) cursor.setDate(cursor.getDate() - 1);
  let streakDays = 0;
  while (days.has(toDateInput(cursor))) {
    streakDays += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const map = new Map<string, { minutes: number; conf: number[] }>();
  for (const l of logs) {
    const entry = map.get(l.subject) ?? { minutes: 0, conf: [] };
    entry.minutes += l.minutes;
    if (l.confidence) entry.conf.push(l.confidence);
    map.set(l.subject, entry);
  }

  const bySubject = [...map.entries()]
    .map(([subject, v]) => ({
      subject,
      minutes: v.minutes,
      avgConfidence: v.conf.length ? v.conf.reduce((a, b) => a + b, 0) / v.conf.length : null,
    }))
    .sort((a, b) => b.minutes - a.minutes);

  // 理解度の自己評価が低い科目(平均3未満)を「復習したい科目」として出す
  const weakSubjects = bySubject
    .filter((s) => s.avgConfidence !== null && s.avgConfidence < 3)
    .sort((a, b) => (a.avgConfidence ?? 5) - (b.avgConfidence ?? 5))
    .slice(0, 3)
    .map((s) => s.subject);

  return { totalMinutes, weekMinutes, streakDays, studiedToday, bySubject, weakSubjects };
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}分`;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}
