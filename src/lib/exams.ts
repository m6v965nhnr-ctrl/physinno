import { supabase } from "@/lib/supabase";

// 学校ごとの試験情報(科目 → 試験メモ・過去問ファイル)。同じ学校の学生・卒業生だけが読み書きできる

export type ExamTerm = "first" | "second" | "full";

export const TERM_LABEL: Record<ExamTerm, string> = {
  first: "前期",
  second: "後期",
  full: "通年",
};

export const TERMS = Object.keys(TERM_LABEL) as ExamTerm[];

export const GRADES = [1, 2, 3, 4, 5, 6];

export type ExamType = "written" | "practical" | "oral" | "retake" | "osce" | "other";

export const EXAM_TYPE_LABEL: Record<ExamType, string> = {
  written: "筆記試験",
  practical: "実技試験",
  oral: "口頭試問",
  retake: "再試験",
  osce: "OSCE（客観的臨床能力試験）",
  other: "その他",
};

export const EXAM_TYPES = Object.keys(EXAM_TYPE_LABEL) as ExamType[];

export const DIFFICULTY_LABEL = ["", "かんたん", "やさしめ", "ふつう", "むずかしめ", "とてもむずかしい"];

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

// ---------------------------------------------------------
// 学校
// ---------------------------------------------------------

export type School = { id: string; name: string };

export async function searchSchools(query: string): Promise<School[]> {
  const q = query.trim();
  if (q.length < 1) return [];

  const { data } = await supabase
    .from("schools")
    .select("id, name")
    .ilike("name", `%${q}%`)
    .order("name")
    .limit(8);

  return (data || []) as School[];
}

// 学校名を設定(まだない学校は新しく登録される)。空文字で解除
export async function setMySchool(name: string): Promise<string | null> {
  const { error } = await supabase.rpc("set_my_school", { p_name: name });
  return error ? error.message : null;
}

export async function getMySchool(userId: string): Promise<School | null> {
  const { data } = await supabase
    .from("student_profiles")
    .select("school_id, school_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (!data?.school_id) return null;
  return { id: data.school_id, name: data.school_name ?? "" };
}

// ---------------------------------------------------------
// 科目
// ---------------------------------------------------------

export type ExamSubject = {
  id: string;
  name: string;
  grade: number;
  term: ExamTerm;
  note_count: number;
  latest_year: number | null;
};

export async function listExamSubjects(grade: number | null, term: ExamTerm | null): Promise<ExamSubject[]> {
  const { data } = await supabase.rpc("list_exam_subjects", { p_grade: grade, p_term: term });
  return ((data || []) as (Omit<ExamSubject, "note_count"> & { note_count: number | string })[]).map((s) => ({
    ...s,
    note_count: Number(s.note_count),
  }));
}

export async function addExamSubject(name: string, grade: number, term: ExamTerm): Promise<{ id: string | null; error: string | null }> {
  const { data, error } = await supabase.rpc("add_exam_subject", { p_name: name, p_grade: grade, p_term: term });
  return { id: (data as string | null) ?? null, error: error ? error.message : null };
}

export type ExamSubjectDetail = {
  id: string;
  name: string;
  grade: number;
  term: ExamTerm;
  school_id: string;
  school_name: string;
};

export async function getExamSubject(id: string): Promise<ExamSubjectDetail | null> {
  const { data } = await supabase.rpc("get_exam_subject", { p_id: id });
  const rows = (data || []) as ExamSubjectDetail[];
  return rows[0] ?? null;
}

// ---------------------------------------------------------
// 試験メモ
// ---------------------------------------------------------

export type ExamNote = {
  id: string;
  academic_year: number;
  exam_type: ExamType;
  difficulty: number | null;
  tendency: string | null;
  recalled: string | null;
  file_path: string | null;
  file_name: string | null;
  created_at: string;
  is_mine: boolean;
};

export async function listExamNotes(subjectId: string): Promise<ExamNote[]> {
  const { data } = await supabase.rpc("list_exam_notes", { p_subject: subjectId });
  return (data || []) as ExamNote[];
}

export function validateExamFile(file: File): string | null {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return "PDF・PNG・JPEG・WebPのファイルを選んでください";
  if (file.size > MAX_FILE_BYTES) return "ファイルは10MB以下にしてください";
  return null;
}

export async function uploadExamFile(schoolId: string, userId: string, file: File): Promise<{ path: string | null; error: string | null }> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "bin";
  const path = `${schoolId}/${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("exam-files").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  return { path: error ? null : path, error: error ? error.message : null };
}

export async function postExamNote(input: {
  subject_id: string;
  academic_year: number;
  exam_type: ExamType;
  difficulty: number | null;
  tendency: string;
  recalled: string;
  file_path: string | null;
  file_name: string | null;
}): Promise<string | null> {
  const { error } = await supabase.from("exam_notes").insert({
    subject_id: input.subject_id,
    academic_year: input.academic_year,
    exam_type: input.exam_type,
    difficulty: input.difficulty,
    tendency: input.tendency.trim() || null,
    recalled: input.recalled.trim() || null,
    file_path: input.file_path,
    file_name: input.file_name,
  });

  return error ? error.message : null;
}

// 自分のメモを削除(添付ファイルも一緒に消す)
export async function deleteExamNote(note: ExamNote): Promise<string | null> {
  if (note.file_path) {
    await supabase.storage.from("exam-files").remove([note.file_path]);
  }

  const { error } = await supabase.from("exam_notes").delete().eq("id", note.id);
  return error ? error.message : null;
}

// 添付ファイルを開くための、短時間だけ有効なURL
export async function getExamFileUrl(path: string): Promise<string | null> {
  const { data } = await supabase.storage.from("exam-files").createSignedUrl(path, 60);
  return data?.signedUrl ?? null;
}

// 運営: 通報された試験メモの添付ファイルを、本体ごと削除する(メモの削除より先に行う)
export async function adminRemoveExamNoteFile(noteId: string): Promise<void> {
  const { data: path } = await supabase.rpc("admin_exam_note_file", { p_note: noteId });
  if (typeof path === "string" && path) {
    await supabase.storage.from("exam-files").remove([path]);
  }
}
