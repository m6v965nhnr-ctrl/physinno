import { supabase } from "@/lib/supabase";

// 参考書の進捗機能。本の名前・単元名は先生の自由入力（本の中身は一切扱わない）
// くわしい設計メモ: リサーチ/2026-10-28_参考書進捗機能の著作権リスク.md

export type StudyBook = {
  id: string;
  name: string;
  total_pages: number | null;
  archived: boolean;
  unit_count: number;
  created_at: string;
};

export type StudyUnit = {
  id: string;
  name: string;
  page_start: number;
  page_end: number;
  sort: number;
};

export type StudyLog = {
  id: string;
  page_start: number;
  page_end: number;
  studied_on: string;
  created_at: string;
  understanding: number | null;
};

// 理解度(0.0〜10.0)の、目安のことば
export function understandingLabel(v: number): string {
  if (v < 2.5) return "理解してない";
  if (v < 5) return "まあまあ";
  if (v < 9) return "それなりに";
  if (v < 10) return "ほぼ完璧";
  return "完璧";
}

export type StudyProgress = { furthest_page: number | null; last_studied_on: string | null };

export type StudyStudentProgress = {
  user_id: string;
  name: string;
  furthest_page: number | null;
  last_studied_on: string | null;
  log_count: number;
};

export type MyStudyBook = {
  id: string;
  name: string;
  total_pages: number | null;
  class_id: string;
  class_name: string;
  unit_count: number;
};

export async function listStudyBooks(classId: string): Promise<StudyBook[]> {
  const { data } = await supabase.rpc("study_list_books", { p_class: classId });
  return (data ?? []) as StudyBook[];
}

export async function createStudyBook(classId: string, name: string, totalPages: number | null): Promise<string | null> {
  const { data, error } = await supabase.rpc("study_create_book", { p_class: classId, p_name: name, p_total_pages: totalPages });
  if (error || !data) return null;
  return data as string;
}

export async function updateStudyBook(bookId: string, name: string, totalPages: number | null): Promise<boolean> {
  const { data, error } = await supabase.rpc("study_update_book", { p_book: bookId, p_name: name, p_total_pages: totalPages });
  return !error && data === true;
}

export async function archiveStudyBook(bookId: string, archived: boolean): Promise<boolean> {
  const { error } = await supabase.rpc("study_archive_book", { p_book: bookId, p_archived: archived });
  return !error;
}

export async function listStudyUnits(bookId: string): Promise<StudyUnit[]> {
  const { data } = await supabase.rpc("study_list_units", { p_book: bookId });
  return (data ?? []) as StudyUnit[];
}

export async function addStudyUnit(bookId: string, name: string, pageStart: number, pageEnd: number): Promise<string | null> {
  const { data, error } = await supabase.rpc("study_add_unit", { p_book: bookId, p_name: name, p_page_start: pageStart, p_page_end: pageEnd });
  if (error || !data) return null;
  return data as string;
}

export async function deleteStudyUnit(unitId: string): Promise<boolean> {
  const { error } = await supabase.rpc("study_delete_unit", { p_unit: unitId });
  return !error;
}

export async function updateStudyUnit(unitId: string, name: string, pageStart: number, pageEnd: number): Promise<boolean> {
  const { error } = await supabase.rpc("study_update_unit", { p_unit: unitId, p_name: name, p_page_start: pageStart, p_page_end: pageEnd });
  return !error;
}

export async function addStudyLog(bookId: string, pageStart: number, pageEnd: number, studiedOn: string): Promise<boolean> {
  const { error } = await supabase.rpc("study_add_log", { p_book: bookId, p_page_start: pageStart, p_page_end: pageEnd, p_studied_on: studiedOn });
  return !error;
}

// タップで選んだページ・範囲でまとめて選んだページを、まとめて1回で記録する（連続するページは1件にまとめて保存される）
export async function addStudyLogPages(bookId: string, pages: number[], studiedOn: string, understanding: number | null): Promise<boolean> {
  const { error } = await supabase.rpc("study_add_log_pages", { p_book: bookId, p_pages: pages, p_studied_on: studiedOn, p_understanding: understanding });
  return !error;
}

// 自分が参加している、すべてのクラスの参考書をまとめて見る
export async function listMyBooks(): Promise<MyStudyBook[]> {
  const { data } = await supabase.rpc("study_my_books");
  return (data ?? []) as MyStudyBook[];
}

export async function deleteStudyLog(logId: string): Promise<boolean> {
  const { error } = await supabase.rpc("study_delete_log", { p_log: logId });
  return !error;
}

export async function updateStudyLog(logId: string, pageStart: number, pageEnd: number, studiedOn: string, understanding: number | null): Promise<boolean> {
  const { error } = await supabase.rpc("study_update_log", { p_log: logId, p_page_start: pageStart, p_page_end: pageEnd, p_studied_on: studiedOn, p_understanding: understanding });
  return !error;
}

// numeric列は、精度を保つためPostgRESTから文字列で返ってくるので、数値に直す
function toStudyLog(row: Omit<StudyLog, "understanding"> & { understanding: number | string | null }): StudyLog {
  return { ...row, understanding: row.understanding == null ? null : Number(row.understanding) };
}

export async function listMyStudyLogs(bookId: string, limit = 30): Promise<StudyLog[]> {
  const { data } = await supabase.rpc("study_my_logs", { p_book: bookId, p_limit: limit });
  return ((data ?? []) as Parameters<typeof toStudyLog>[0][]).map(toStudyLog);
}

export async function getMyStudyProgress(bookId: string): Promise<StudyProgress> {
  const { data } = await supabase.rpc("study_my_progress", { p_book: bookId });
  const row = (data ?? [])[0] as StudyProgress | undefined;
  return row ?? { furthest_page: null, last_studied_on: null };
}

export async function getTeacherStudyProgress(bookId: string): Promise<StudyStudentProgress[]> {
  const { data } = await supabase.rpc("study_teacher_progress", { p_book: bookId });
  return (data ?? []) as StudyStudentProgress[];
}

// 先生が、生徒名をタップしたときの、その生徒の記録（ページ範囲・日付）の一覧
export async function getTeacherStudentLogs(bookId: string, userId: string): Promise<StudyLog[]> {
  const { data } = await supabase.rpc("study_teacher_student_logs", { p_book: bookId, p_user: userId });
  return ((data ?? []) as Parameters<typeof toStudyLog>[0][]).map(toStudyLog);
}
