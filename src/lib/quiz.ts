import { supabase } from "@/lib/supabase";

// 過去問ドリル(理学療法士国家試験の一問一答)。
// 問題・正答は厚生労働省が公開している国家試験の問題(出典: 厚生労働省ホームページ)。
// 正答は答え合わせのときにだけサーバーから返る

export type QuizMode = "all" | "unanswered" | "wrong" | "bookmarked";

export const MODE_LABEL: Record<QuizMode, string> = {
  all: "すべて",
  unanswered: "まだ解いていない問題",
  wrong: "前回間違えた問題",
  bookmarked: "ブックマークした問題",
};

export const MODES = Object.keys(MODE_LABEL) as QuizMode[];

export type QuizUnit = {
  id: string;
  name: string;
  field: string;
  sort: number;
  total: number;
  answered: number;
  correct: number;
};

export type QuizExam = { exam_no: number; total: number; answered: number; correct: number };

export type QuizModeCounts = { all_count: number; unanswered: number; wrong: number; bookmarked: number };

export type QuizQuestion = {
  id: string;
  exam_no: number;
  session: "am" | "pm";
  no: number;
  unit: string;
  intro: string;
  stem: string;
  choices: string[];
  need: number;
  image: string | null;
  book_images: string[];
  choices_in_image: boolean;
  bookmarked: boolean;
  last_correct: boolean | null;
};

export type QuizReveal = {
  correct?: boolean;
  answers: number[][];
  explanation: string | null;
  explanation_source: "ai" | "official" | null;
};

export const SESSION_LABEL = { am: "午前", pm: "午後" } as const;

export function questionLabel(q: Pick<QuizQuestion, "exam_no" | "session" | "no">) {
  return `第${q.exam_no}回 ${SESSION_LABEL[q.session]}${q.no}`;
}

export function imageUrl(path: string) {
  return `/quiz/${path}`;
}

export async function listQuizUnits(): Promise<QuizUnit[]> {
  const { data } = await supabase.rpc("quiz_list_units");
  return (data ?? []) as QuizUnit[];
}

export async function listQuizExams(): Promise<QuizExam[]> {
  const { data } = await supabase.rpc("quiz_list_exams");
  return (data ?? []) as QuizExam[];
}

export async function getModeCounts(unit: string | null, exam: number | null): Promise<QuizModeCounts> {
  const { data } = await supabase.rpc("quiz_mode_counts", { p_unit: unit, p_exam: exam });
  const row = (data ?? [])[0] as QuizModeCounts | undefined;
  return row ?? { all_count: 0, unanswered: 0, wrong: 0, bookmarked: 0 };
}

export async function listQuizQuestions(params: {
  unit: string | null;
  exam: number | null;
  mode: QuizMode;
  limit: number | null;
  shuffle: boolean;
}): Promise<QuizQuestion[]> {
  const { data } = await supabase.rpc("quiz_list_questions", {
    p_unit: params.unit,
    p_exam: params.exam,
    p_mode: params.mode,
    p_limit: params.limit,
    p_shuffle: params.shuffle,
  });
  return (data ?? []) as QuizQuestion[];
}

export async function answerQuestion(questionId: string, choice: number[]): Promise<QuizReveal | null> {
  const { data, error } = await supabase.rpc("quiz_answer", { p_question: questionId, p_choice: choice });
  if (error || !data) return null;
  return data as QuizReveal;
}

export async function revealQuestion(questionId: string): Promise<QuizReveal | null> {
  const { data, error } = await supabase.rpc("quiz_reveal", { p_question: questionId });
  if (error || !data) return null;
  return data as QuizReveal;
}

export async function toggleBookmark(questionId: string): Promise<boolean | null> {
  const { data, error } = await supabase.rpc("quiz_toggle_bookmark", { p_question: questionId });
  if (error) return null;
  return Boolean(data);
}

export function percent(correct: number, total: number) {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
