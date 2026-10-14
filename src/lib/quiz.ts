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

export type QuizModeCounts = { all_count: number; unanswered: number; wrong: number; bookmarked: number; direct_count?: number };

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
  ref_url?: string | null;
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

// キーワードで絞るとき: keyword が問題文・選択肢にある問題（direct）と、関連語・解説に出てくる問題
export type QuizKeyword = { keyword: string; related: string[] };

export async function getModeCounts(
  unit: string | null,
  exam: number | null,
  kw?: QuizKeyword | null
): Promise<QuizModeCounts & { direct_count?: number }> {
  const { data } = kw
    ? await supabase.rpc("quiz_mode_counts_kw", {
        p_unit: unit,
        p_exam: exam,
        p_keyword: kw.keyword,
        p_related: kw.related,
      })
    : await supabase.rpc("quiz_mode_counts", { p_unit: unit, p_exam: exam });
  const row = (data ?? [])[0] as (QuizModeCounts & { direct_count?: number }) | undefined;
  return row ?? { all_count: 0, unanswered: 0, wrong: 0, bookmarked: 0, direct_count: 0 };
}

// 学習の連続日数(日本時間)。今日まだ解いていなければ、昨日までの連続を返す
export async function getStreak(): Promise<{ streak: number; doneToday: boolean } | null> {
  const { data } = await supabase.rpc("quiz_streak");
  const row = (data ?? [])[0] as { streak: number; done_today: boolean } | undefined;
  return row ? { streak: row.streak, doneToday: row.done_today } : null;
}

// キーワードに関係する言葉を集める（AI。使えないときは、よく使う言いかえだけ）
export async function fetchRelatedTerms(keyword: string): Promise<string[]> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const res = await fetch("/api/quiz/related", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
      },
      body: JSON.stringify({ keyword }),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { terms?: unknown };
    return Array.isArray(json.terms) ? json.terms.filter((t): t is string => typeof t === "string").slice(0, 12) : [];
  } catch {
    return [];
  }
}

export async function listQuizQuestions(params: {
  unit: string | null;
  exam: number | null;
  mode: QuizMode;
  limit: number | null;
  shuffle: boolean;
  keyword?: QuizKeyword | null;
}): Promise<QuizQuestion[]> {
  const base = {
    p_unit: params.unit,
    p_exam: params.exam,
    p_mode: params.mode,
    p_limit: params.limit,
    p_shuffle: params.shuffle,
  };
  // キーワードがあるときは、問題文・選択肢にある問題を先に出す
  const { data } = params.keyword
    ? await supabase.rpc("quiz_list_questions_kw", {
        ...base,
        p_keyword: params.keyword.keyword,
        p_related: params.keyword.related,
      })
    : await supabase.rpc("quiz_list_questions", base);
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

// ---------------------------------------------------------
// 模擬試験(1回分の午前または午後を、通しで解く)
// ---------------------------------------------------------

export const MOCK_MINUTES = 160; // 本番の解答時間(2時間40分)

export type MockQuestion = {
  id: string;
  no: number;
  unit: string;
  intro: string;
  stem: string;
  choices: string[];
  need: number;
  image: string | null;
  book_images: string[];
  choices_in_image: boolean;
};

export type MockGradeItem = {
  id: string;
  no: number;
  unit: string;
  chosen: number[] | null;
  correct: boolean;
  answers: number[][];
};

export type MockGrade = { score: number; total: number; items: MockGradeItem[] };

export type MockSummary = {
  exam_no: number;
  session: "am" | "pm";
  attempts: number;
  last_score: number;
  last_total: number;
  best_score: number;
};

export async function listExamQuestions(exam: number, session: "am" | "pm"): Promise<MockQuestion[]> {
  const { data } = await supabase.rpc("quiz_exam_questions", { p_exam: exam, p_session: session });
  return (data ?? []) as MockQuestion[];
}

export async function gradeExam(
  exam: number,
  session: "am" | "pm",
  answers: Record<string, number[]>,
  seconds: number
): Promise<MockGrade | null> {
  const { data, error } = await supabase.rpc("quiz_grade", {
    p_exam: exam,
    p_session: session,
    p_answers: answers,
    p_seconds: Math.max(0, Math.round(seconds)),
  });
  if (error || !data) return null;
  return data as MockGrade;
}

export async function getMockSummary(): Promise<MockSummary[]> {
  const { data } = await supabase.rpc("quiz_mock_summary");
  return (data ?? []) as MockSummary[];
}

// ---------------------------------------------------------
// 印刷用(問題・正答・解説)
// ---------------------------------------------------------

export type PrintQuestion = MockQuestion & {
  excluded: boolean;
  answers: number[][];
  explanation: string | null;
  explanation_source: "ai" | "official" | null;
};

export async function listPrintQuestions(exam: number, session: "am" | "pm"): Promise<PrintQuestion[]> {
  const { data } = await supabase.rpc("quiz_print_exam", { p_exam: exam, p_session: session });
  return (data ?? []) as PrintQuestion[];
}

// 同じ学校の学生どうしの、一問一答の正解数ランキング（学校名は「〇〇大学」までで、まとめます）
export type SchoolRankRow = { rank: number; correct: number; is_me: boolean; name: string | null };
export type SchoolRanking = {
  school: string | null;
  members?: number;
  my_rank?: number | null;
  my_correct?: number | null;
  my_hidden?: boolean | null;
  top?: SchoolRankRow[];
};

export async function getSchoolRanking(): Promise<SchoolRanking | null> {
  const { data, error } = await supabase.rpc("quiz_school_ranking");
  if (error || !data) return null;
  return data as SchoolRanking;
}

// ランキングで名前を出さない（オン・オフ）
export async function setRankingHidden(hidden: boolean): Promise<boolean> {
  const { error } = await supabase.rpc("set_quiz_ranking_hidden", { p_hidden: hidden });
  return !error;
}
