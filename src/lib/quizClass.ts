import { supabase } from "@/lib/supabase";
import type { QuizQuestion, QuizReveal } from "@/lib/quiz";

// 過去問ドリルの、先生用のクラスと課題。
// 先生は、PTアカウントが申請して、運営が承認する。学生は参加コードでクラスに入る。
// 先生に見えるのは、配った課題の結果(名前・正誤)だけ

export type TeacherStatus = "approved" | "pending" | "rejected" | "none";

export type Difficulty = "any" | "easy" | "normal" | "hard";

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  any: "指定しない",
  easy: "かんたん（正答率80%以上）",
  normal: "ふつう（50〜80%）",
  hard: "むずかしい（50%未満）",
};

export type TeacherClass = {
  id: string;
  name: string;
  join_code: string;
  member_count: number;
  assignment_count: number;
  created_at: string;
};

export type TeacherAssignment = {
  id: string;
  title: string;
  unit: string | null;
  exam_no: number | null;
  difficulty: Difficulty;
  n: number;
  due_at: string | null;
  created_at: string;
  member_count: number;
  finished_count: number;
  answered_total: number;
  correct_total: number;
};

export type PoolCounts = { all_count: number; easy: number; normal: number; hard: number };

export type AssignmentResults = {
  title: string;
  class_name: string;
  total: number;
  due_at: string | null;
  students: { name: string; answered: number; correct: number }[];
  questions: { id: string; label: string; stem: string; answered: number; correct: number }[];
};

export type MyClass = { id: string; name: string; teacher_name: string | null; joined_at: string };

export type MyAssignment = {
  id: string;
  class_id: string;
  class_name: string;
  title: string;
  n: number;
  due_at: string | null;
  created_at: string;
  answered: number;
  correct: number;
};

export type AssignmentQuestion = QuizQuestion & { my_chosen: number[] | null; my_correct: boolean | null };

export type TeacherRequest = {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  school_name: string;
  note: string | null;
  status: "open" | "approved" | "rejected";
  created_at: string;
};

// ---- 先生の申請 ----

export async function getTeacherStatus(): Promise<TeacherStatus> {
  const { data } = await supabase.rpc("quiz_my_teacher_status");
  return (data as TeacherStatus) ?? "none";
}

export async function requestTeacher(school: string, note: string): Promise<boolean> {
  const { error } = await supabase.rpc("quiz_request_teacher", { p_school: school, p_note: note || null });
  return !error;
}

export async function listTeacherRequests(status: "open" | "approved" | "rejected" | "all"): Promise<TeacherRequest[]> {
  const { data } = await supabase.rpc("admin_list_teacher_requests", { p_status: status });
  return (data ?? []) as TeacherRequest[];
}

export async function resolveTeacherRequest(id: string, approve: boolean): Promise<boolean> {
  const { error } = await supabase.rpc("admin_resolve_teacher_request", { p_id: id, p_approve: approve });
  return !error;
}

// ---- 先生: クラスと課題 ----

export async function listMyClasses(): Promise<TeacherClass[]> {
  const { data } = await supabase.rpc("quiz_list_my_classes");
  return (data ?? []) as TeacherClass[];
}

export async function createClass(name: string): Promise<{ id: string; join_code: string } | null> {
  const { data, error } = await supabase.rpc("quiz_create_class", { p_name: name });
  if (error || !data) return null;
  return data as { id: string; join_code: string };
}

export async function archiveClass(id: string): Promise<boolean> {
  const { error } = await supabase.rpc("quiz_archive_class", { p_class: id });
  return !error;
}

export async function getPoolCounts(unit: string | null, exam: number | null): Promise<PoolCounts> {
  const { data } = await supabase.rpc("quiz_teacher_pool_counts", { p_unit: unit, p_exam: exam });
  const row = (data ?? [])[0] as PoolCounts | undefined;
  return row ?? { all_count: 0, easy: 0, normal: 0, hard: 0 };
}

export async function createAssignment(params: {
  classId: string;
  title: string;
  unit: string | null;
  exam: number | null;
  difficulty: Difficulty;
  n: number;
  due: string | null;
}): Promise<string | null> {
  const { data, error } = await supabase.rpc("quiz_create_assignment", {
    p_class: params.classId,
    p_title: params.title,
    p_unit: params.unit,
    p_exam: params.exam,
    p_difficulty: params.difficulty,
    p_n: params.n,
    p_due: params.due,
  });
  if (error || !data) return null;
  return data as string;
}

export async function listAssignments(classId: string): Promise<TeacherAssignment[]> {
  const { data } = await supabase.rpc("quiz_list_assignments", { p_class: classId });
  return (data ?? []) as TeacherAssignment[];
}

export async function getAssignmentResults(id: string): Promise<AssignmentResults | null> {
  const { data, error } = await supabase.rpc("quiz_assignment_results", { p_assignment: id });
  if (error || !data) return null;
  return data as AssignmentResults;
}

// ---- 学生: 参加と課題 ----

export async function joinClass(code: string): Promise<{ id: string; name: string } | null> {
  const { data, error } = await supabase.rpc("quiz_join_class", { p_code: code });
  if (error || !data) return null;
  return data as { id: string; name: string };
}

export async function leaveClass(id: string): Promise<boolean> {
  const { error } = await supabase.rpc("quiz_leave_class", { p_class: id });
  return !error;
}

export async function listMyJoinedClasses(): Promise<MyClass[]> {
  const { data } = await supabase.rpc("quiz_my_classes");
  return (data ?? []) as MyClass[];
}

export async function listMyAssignments(): Promise<MyAssignment[]> {
  const { data } = await supabase.rpc("quiz_my_assignments");
  return (data ?? []) as MyAssignment[];
}

export async function listAssignmentQuestions(id: string): Promise<AssignmentQuestion[]> {
  const { data } = await supabase.rpc("quiz_assignment_questions", { p_assignment: id });
  return (data ?? []) as AssignmentQuestion[];
}

export async function answerAssignmentQuestion(
  assignmentId: string,
  questionId: string,
  choice: number[]
): Promise<QuizReveal | null> {
  const { data, error } = await supabase.rpc("quiz_assignment_answer", {
    p_assignment: assignmentId,
    p_question: questionId,
    p_choice: choice,
  });
  if (error || !data) return null;
  return data as QuizReveal;
}

export function dueText(due: string | null) {
  if (!due) return "期限なし";
  const d = new Date(due);
  return `${d.getMonth() + 1}月${d.getDate()}日 まで`;
}
