import { supabasePublic } from "@/lib/supabasePublic";

// 理学療法士国家試験の過去問（公開ページ /kokushi 用）。
// 問題・選択肢・正答は厚生労働省が公開しているもの。AI解説は登録者向けなのでここでは扱わない。

export type PublicExam = { exam_no: number; total: number };

export type PublicListItem = {
  session: "am" | "pm";
  no: number;
  unit_name: string | null;
  field: string | null;
  stem: string;
  excluded: boolean;
};

export type PublicQuestion = {
  exam_no: number;
  session: "am" | "pm";
  no: number;
  unit_name: string | null;
  field: string | null;
  intro: string;
  stem: string;
  choices: string[];
  answers: number[][];
  need: number;
  image: string | null;
  book_images: string[];
  choices_in_image: boolean;
  excluded: boolean;
};

export const SESSION_LABEL = { am: "午前", pm: "午後" } as const;
export const SESSIONS = ["am", "pm"] as const;
export const QUESTIONS_PER_SESSION = 100;

// 第N回の試験が行われた年（第59回=2024年2月）
export function examYear(examNo: number) {
  return examNo + 1965;
}

export function isSession(value: string): value is "am" | "pm" {
  return value === "am" || value === "pm";
}

export async function getPublicExams(): Promise<PublicExam[]> {
  const { data } = await supabasePublic.rpc("quiz_public_exams");
  return ((data ?? []) as PublicExam[]).map((e) => ({ exam_no: Number(e.exam_no), total: Number(e.total) }));
}

export async function getPublicList(examNo: number): Promise<PublicListItem[]> {
  const { data } = await supabasePublic.rpc("quiz_public_list", { p_exam: examNo });
  return (data ?? []) as PublicListItem[];
}

export async function getPublicQuestion(
  examNo: number,
  session: "am" | "pm",
  no: number
): Promise<PublicQuestion | null> {
  const { data } = await supabasePublic.rpc("quiz_public_question", {
    p_exam: examNo,
    p_session: session,
    p_no: no,
  });
  const row = (data ?? [])[0] as PublicQuestion | undefined;
  return row ?? null;
}

export function questionPath(examNo: number, session: "am" | "pm", no: number) {
  return `/kokushi/${examNo}/${session}/${no}`;
}

export function questionTitle(q: { exam_no: number; session: "am" | "pm"; no: number }) {
  return `第${q.exam_no}回 理学療法士国家試験 ${SESSION_LABEL[q.session]}${q.no}`;
}
