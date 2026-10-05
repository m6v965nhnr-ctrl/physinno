import { supabase } from "@/lib/supabase";

// 先輩に質問(学生が質問し、現役PTが回答する)

export type QuestionCategory = "practicum" | "exam" | "job" | "career" | "other";

export const QUESTION_CATEGORY_LABEL: Record<QuestionCategory, string> = {
  practicum: "実習",
  exam: "国試",
  job: "就活・病院選び",
  career: "進路・キャリア",
  other: "その他",
};

export const QUESTION_CATEGORIES = Object.keys(QUESTION_CATEGORY_LABEL) as QuestionCategory[];

export type QuestionSummary = {
  id: string;
  category: QuestionCategory;
  title: string;
  body_preview: string;
  hospital_id: string | null;
  hospital_name: string | null;
  author_id: string | null;
  author_name: string | null;
  answer_count: number;
  created_at: string;
  is_mine: boolean;
};

export type QuestionDetail = {
  id: string;
  category: QuestionCategory;
  title: string;
  body: string;
  hospital_id: string | null;
  hospital_name: string | null;
  author_id: string | null;
  author_name: string | null;
  created_at: string;
  is_mine: boolean;
};

export type Answer = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  author_name: string | null;
  author_is_pt: boolean;
  is_mine: boolean;
  is_asker: boolean;
};

export async function listQuestions(
  category: QuestionCategory | null,
  offset = 0,
  limit = 30
): Promise<QuestionSummary[]> {
  const { data } = await supabase.rpc("list_student_questions", {
    p_category: category,
    p_limit: limit,
    p_offset: offset,
  });

  return ((data || []) as (Omit<QuestionSummary, "answer_count"> & { answer_count: number | string })[]).map((q) => ({
    ...q,
    answer_count: Number(q.answer_count),
  }));
}

export async function getQuestion(id: string): Promise<QuestionDetail | null> {
  const { data } = await supabase.rpc("get_student_question", { p_id: id });
  const rows = (data || []) as QuestionDetail[];
  return rows[0] ?? null;
}

export async function listAnswers(questionId: string): Promise<Answer[]> {
  const { data } = await supabase.rpc("list_student_answers", { p_question_id: questionId });
  return (data || []) as Answer[];
}

export async function askQuestion(input: {
  category: QuestionCategory;
  title: string;
  body: string;
  isAnonymous: boolean;
}): Promise<string | null> {
  const { error } = await supabase.from("student_questions").insert({
    category: input.category,
    title: input.title.trim(),
    body: input.body.trim(),
    is_anonymous: input.isAnonymous,
  });

  return error ? error.message : null;
}

export async function answerQuestion(questionId: string, body: string): Promise<string | null> {
  const { error } = await supabase
    .from("student_answers")
    .insert({ question_id: questionId, body: body.trim() });

  return error ? error.message : null;
}

export async function deleteQuestion(id: string): Promise<string | null> {
  const { error } = await supabase.from("student_questions").delete().eq("id", id);
  return error ? error.message : null;
}

export async function deleteAnswer(id: string): Promise<string | null> {
  const { error } = await supabase.from("student_answers").delete().eq("id", id);
  return error ? error.message : null;
}

export { findPrivacyRisk } from "@/lib/privacyCheck";
