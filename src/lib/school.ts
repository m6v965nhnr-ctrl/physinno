import { supabase } from "@/lib/supabase";

// 一問一答の、学校単位の利用（学校コード）。制限は、運営が、オン・オフする（既定はオフ）

export type AccessState = {
  required: boolean;
  has_access: boolean;
  school: { id: string; name: string; role: "student" | "teacher"; active: boolean; valid_until: string | null } | null;
};

export async function getAccessState(): Promise<AccessState | null> {
  const { data, error } = await supabase.rpc("quiz_access_state");
  if (error || !data) return null;
  return data as AccessState;
}

export type JoinSchoolResult =
  | { ok: true; name: string; role: "student" | "teacher" }
  | { ok: false; reason: "not_found" | "inactive" | "already_member" | "full" | "throttled" | "failed" };

export async function joinSchool(code: string): Promise<JoinSchoolResult> {
  const { data, error } = await supabase.rpc("school_join", { p_code: code });
  if (error) return { ok: false, reason: /too many/i.test(error.message) ? "throttled" : "failed" };
  const d = data as { error?: string; name?: string; role?: "student" | "teacher" } | null;
  if (!d) return { ok: false, reason: "failed" };
  if (d.error) return { ok: false, reason: d.error as "not_found" | "inactive" | "already_member" | "full" };
  return { ok: true, name: d.name ?? "", role: d.role ?? "student" };
}

export async function leaveSchool(): Promise<boolean> {
  const { error } = await supabase.rpc("school_leave");
  return !error;
}

// ---- 運営 ----

export type AdminSchool = {
  id: string;
  name: string;
  code: string;
  status: "active" | "suspended";
  active: boolean;
  valid_from: string | null;
  valid_until: string | null;
  seat_limit: number | null;
  plan: string;
  note: string | null;
  teacher_count: number;
  student_count: number;
  created_at: string;
};

export type SchoolMember = { user_id: string; name: string | null; email: string | null; role: "student" | "teacher"; joined_at: string };

export async function adminGetRequiresSchool(): Promise<boolean | null> {
  const { data, error } = await supabase.rpc("admin_quiz_settings");
  if (error || !data) return null;
  return Boolean((data as { requires_school?: boolean }).requires_school);
}

export async function adminSetRequiresSchool(on: boolean): Promise<boolean> {
  const { error } = await supabase.rpc("admin_set_quiz_requires_school", { p_on: on });
  return !error;
}

export async function adminListSchools(): Promise<AdminSchool[]> {
  const { data } = await supabase.rpc("admin_list_schools");
  return (data ?? []) as AdminSchool[];
}

export async function adminSaveSchool(p: {
  id: string | null;
  name: string;
  validFrom: string | null;
  validUntil: string | null;
  seatLimit: number | null;
  plan: string;
  note: string;
}): Promise<boolean> {
  const { error } = await supabase.rpc("admin_save_school", {
    p_id: p.id,
    p_name: p.name,
    p_valid_from: p.validFrom,
    p_valid_until: p.validUntil,
    p_seat_limit: p.seatLimit,
    p_plan: p.plan,
    p_note: p.note,
  });
  return !error;
}

export async function adminRotateSchoolCode(id: string): Promise<string | null> {
  const { data, error } = await supabase.rpc("admin_rotate_school_code", { p_id: id });
  return error ? null : (data as string);
}

export async function adminSetSchoolStatus(id: string, status: "active" | "suspended"): Promise<boolean> {
  const { error } = await supabase.rpc("admin_set_school_status", { p_id: id, p_status: status });
  return !error;
}

export async function adminListSchoolMembers(schoolId: string): Promise<SchoolMember[]> {
  const { data } = await supabase.rpc("admin_list_school_members", { p_school: schoolId });
  return (data ?? []) as SchoolMember[];
}

export async function adminRemoveSchoolMember(userId: string): Promise<boolean> {
  const { error } = await supabase.rpc("admin_remove_school_member", { p_user: userId });
  return !error;
}
