import { supabase } from "@/lib/supabase";

// 学生ホームのウィジェット。先生はクラスごとに表示するものを選べ、学生も自分のホームから個別に非表示にできる
// （スマホのウィジェットのように、消したり戻したりできる）

export type HomeWidgetKey = "study_calendar" | "ranking" | "exam_countdown" | "graduation_countdown";

export const HOME_WIDGET_LABELS: Record<HomeWidgetKey, string> = {
  study_calendar: "今日の学習・カレンダー",
  ranking: "校内ランキング",
  exam_countdown: "国試まで何日",
  graduation_countdown: "卒業まで何日",
};

export type HomeWidgetVisibility = Record<HomeWidgetKey, boolean>;

const ALL_VISIBLE: HomeWidgetVisibility = { study_calendar: true, ranking: true, exam_countdown: true, graduation_countdown: true };
const NONE_LOCKED: Record<HomeWidgetKey, boolean> = { study_calendar: false, ranking: false, exam_countdown: false, graduation_countdown: false };

type WidgetRow = { widget: HomeWidgetKey; visible: boolean; locked_by_class: boolean };

// 学生が、自分のホームで実際に見られるもの（自分の設定と、参加しているクラスの先生の設定を両方とも尊重する）
export async function getHomeWidgetVisibility(): Promise<HomeWidgetVisibility> {
  const { data } = await supabase.rpc("get_home_widget_visibility");
  const rows = (data ?? []) as WidgetRow[];
  if (rows.length === 0) return ALL_VISIBLE;
  const out = { ...ALL_VISIBLE };
  for (const r of rows) out[r.widget] = r.visible;
  return out;
}

// 設定画面用: 見えるかどうかに加えて、先生がクラスで外していて学生側では選べないものも返す
export async function getHomeWidgetState(): Promise<{ visible: HomeWidgetVisibility; lockedByClass: Record<HomeWidgetKey, boolean> }> {
  const { data } = await supabase.rpc("get_home_widget_visibility");
  const rows = (data ?? []) as WidgetRow[];
  const visible = { ...ALL_VISIBLE };
  const lockedByClass = { ...NONE_LOCKED };
  for (const r of rows) {
    visible[r.widget] = r.visible;
    lockedByClass[r.widget] = r.locked_by_class;
  }
  return { visible, lockedByClass };
}

export async function setStudentWidgetHidden(widget: HomeWidgetKey, hidden: boolean): Promise<boolean> {
  const { error } = await supabase.rpc("set_student_widget_hidden", { p_widget: widget, p_hidden: hidden });
  return !error;
}

// 先生用: クラスで表示するウィジェットを選ぶ
export async function getClassHiddenWidgets(classId: string): Promise<HomeWidgetKey[]> {
  const { data } = await supabase.rpc("quiz_class_widgets", { p_class: classId });
  return (data ?? []) as HomeWidgetKey[];
}

export async function setClassHiddenWidgets(classId: string, hidden: HomeWidgetKey[]): Promise<boolean> {
  const { error } = await supabase.rpc("quiz_set_class_widgets", { p_class: classId, p_hidden: hidden });
  return !error;
}
