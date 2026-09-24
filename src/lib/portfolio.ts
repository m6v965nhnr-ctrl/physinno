import { supabase } from "@/lib/supabase";

// ========================================
// 学歴
// ========================================
export type EducationHistory = {
  id: string;
  user_id: string;
  school_name: string;
  faculty: string | null;
  enrolled_on: string | null;
  graduated_on: string | null;
  major: string | null;
  thesis_title: string | null;
  thesis_summary: string | null;
  advisor_name: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listEducationHistory(userId: string) {
  const { data } = await supabase
    .from("education_history")
    .select("*")
    .eq("user_id", userId)
    .order("enrolled_on", { ascending: false });

  return (data || []) as EducationHistory[];
}

export async function addEducationHistory(
  userId: string,
  fields: Partial<Omit<EducationHistory, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("education_history")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function deleteEducationHistory(id: string) {
  const { error } = await supabase
    .from("education_history")
    .delete()
    .eq("id", id);

  return error ? error.message : null;
}

// ========================================
// 職歴
// ========================================
export type WorkHistory = {
  id: string;
  user_id: string;
  workplace: string;
  facility_type: string | null;
  joined_on: string | null;
  left_on: string | null;
  department: string | null;
  position: string | null;
  employment_type: string | null;
  clinical_area: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listWorkHistory(userId: string) {
  const { data } = await supabase
    .from("work_history")
    .select("*")
    .eq("user_id", userId)
    .order("joined_on", { ascending: false });

  return (data || []) as WorkHistory[];
}

export async function addWorkHistory(
  userId: string,
  fields: Partial<Omit<WorkHistory, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("work_history")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function deleteWorkHistory(id: string) {
  const { error } = await supabase.from("work_history").delete().eq("id", id);
  return error ? error.message : null;
}

// ========================================
// 資格・認定
// ========================================
export type Certification = {
  id: string;
  user_id: string;
  name: string;
  issuing_body: string | null;
  acquired_on: string | null;
  renewed_on: string | null;
  expires_on: string | null;
  license_number: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listCertifications(userId: string) {
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("user_id", userId)
    .order("acquired_on", { ascending: false });

  return (data || []) as Certification[];
}

export async function addCertification(
  userId: string,
  fields: Partial<Omit<Certification, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("certifications")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function deleteCertification(id: string) {
  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id);

  return error ? error.message : null;
}

// ========================================
// 教育・指導経験
// ========================================
export type TeachingExperienceType =
  | "junior_mentoring"
  | "student_guidance"
  | "new_staff_training"
  | "in_house_study"
  | "external_lecture"
  | "seminar_instructor"
  | "case_conference";

export const TEACHING_EXPERIENCE_TYPE_LABEL: Record<
  TeachingExperienceType,
  string
> = {
  junior_mentoring: "後輩指導",
  student_guidance: "学生指導",
  new_staff_training: "新人教育",
  in_house_study: "院内勉強会",
  external_lecture: "院外講義",
  seminar_instructor: "セミナー講師",
  case_conference: "症例検討会",
};

export const TEACHING_EXPERIENCE_TYPES = Object.keys(
  TEACHING_EXPERIENCE_TYPE_LABEL
) as TeachingExperienceType[];

export type TeachingExperience = {
  id: string;
  user_id: string;
  type: TeachingExperienceType;
  title: string | null;
  description: string | null;
  occurred_on: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listTeachingExperiences(userId: string) {
  const { data } = await supabase
    .from("teaching_experiences")
    .select("*")
    .eq("user_id", userId)
    .order("occurred_on", { ascending: false });

  return (data || []) as TeachingExperience[];
}

export async function addTeachingExperience(
  userId: string,
  fields: Partial<Omit<TeachingExperience, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("teaching_experiences")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function deleteTeachingExperience(id: string) {
  const { error } = await supabase
    .from("teaching_experiences")
    .delete()
    .eq("id", id);

  return error ? error.message : null;
}

// ========================================
// 院内活動・プロジェクト
// ========================================
export type HospitalActivityType =
  | "committee"
  | "team"
  | "safety"
  | "infection_control"
  | "risk_management"
  | "process_improvement"
  | "interprofessional"
  | "other";

export const HOSPITAL_ACTIVITY_TYPE_LABEL: Record<
  HospitalActivityType,
  string
> = {
  committee: "委員会",
  team: "チーム活動",
  safety: "医療安全",
  infection_control: "感染対策",
  risk_management: "リスク管理",
  process_improvement: "業務改善",
  interprofessional: "多職種連携",
  other: "その他プロジェクト",
};

export const HOSPITAL_ACTIVITY_TYPES = Object.keys(
  HOSPITAL_ACTIVITY_TYPE_LABEL
) as HospitalActivityType[];

export type HospitalActivity = {
  id: string;
  user_id: string;
  type: HospitalActivityType;
  title: string | null;
  description: string | null;
  started_on: string | null;
  ended_on: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listHospitalActivities(userId: string) {
  const { data } = await supabase
    .from("hospital_activities")
    .select("*")
    .eq("user_id", userId)
    .order("started_on", { ascending: false });

  return (data || []) as HospitalActivity[];
}

export async function addHospitalActivity(
  userId: string,
  fields: Partial<Omit<HospitalActivity, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("hospital_activities")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function deleteHospitalActivity(id: string) {
  const { error } = await supabase
    .from("hospital_activities")
    .delete()
    .eq("id", id);

  return error ? error.message : null;
}

// ========================================
// 語学
// ========================================
export type LanguageSkill = {
  id: string;
  user_id: string;
  language: string;
  certification_name: string | null;
  score: string | null;
  acquired_on: string | null;
  english_available: boolean;
  is_public: boolean;
  created_at: string;
};

export async function listLanguageSkills(userId: string) {
  const { data } = await supabase
    .from("language_skills")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data || []) as LanguageSkill[];
}

export async function addLanguageSkill(
  userId: string,
  fields: Partial<Omit<LanguageSkill, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("language_skills")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function deleteLanguageSkill(id: string) {
  const { error } = await supabase
    .from("language_skills")
    .delete()
    .eq("id", id);

  return error ? error.message : null;
}

// ========================================
// キャリア目標
// ========================================
export type CareerGoalType =
  | "short_term"
  | "mid_term"
  | "long_term"
  | "certification"
  | "training"
  | "skill"
  | "presentation"
  | "research";

export const CAREER_GOAL_TYPE_LABEL: Record<CareerGoalType, string> = {
  short_term: "短期目標",
  mid_term: "中期目標",
  long_term: "長期目標",
  certification: "取得したい資格",
  training: "受けたい研修",
  skill: "習得したいスキル",
  presentation: "学会発表目標",
  research: "研究目標",
};

export const CAREER_GOAL_TYPES = Object.keys(
  CAREER_GOAL_TYPE_LABEL
) as CareerGoalType[];

export type CareerGoalStatus = "not_started" | "in_progress" | "achieved";

export const CAREER_GOAL_STATUS_LABEL: Record<CareerGoalStatus, string> = {
  not_started: "未着手",
  in_progress: "進行中",
  achieved: "達成",
};

export type CareerGoal = {
  id: string;
  user_id: string;
  goal_type: CareerGoalType;
  title: string;
  description: string | null;
  status: CareerGoalStatus;
  target_date: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listCareerGoals(userId: string) {
  const { data } = await supabase
    .from("career_goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data || []) as CareerGoal[];
}

export async function addCareerGoal(
  userId: string,
  fields: Partial<Omit<CareerGoal, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("career_goals")
    .insert({ user_id: userId, ...fields });

  return error ? error.message : null;
}

export async function updateCareerGoalStatus(
  id: string,
  status: CareerGoalStatus
) {
  const { error } = await supabase
    .from("career_goals")
    .update({ status })
    .eq("id", id);

  return error ? error.message : null;
}

export async function deleteCareerGoal(id: string) {
  const { error } = await supabase.from("career_goals").delete().eq("id", id);
  return error ? error.message : null;
}

// ========================================
// スキル
// ========================================
export type Skill = {
  id: string;
  user_id: string;
  name: string;
  category: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listSkills(userId: string) {
  const { data } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data || []) as Skill[];
}

export async function addSkill(userId: string, name: string, category?: string) {
  const { error } = await supabase
    .from("skills")
    .insert({ user_id: userId, name, category: category || null });

  return error ? error.message : null;
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from("skills").delete().eq("id", id);
  return error ? error.message : null;
}

// ========================================
// 添付ファイル（汎用）
// ========================================
export type Attachment = {
  id: string;
  user_id: string;
  entity_type: string;
  entity_id: string;
  file_url: string;
  file_name: string | null;
  label: string | null;
  is_public: boolean;
  created_at: string;
};

export async function listAttachments(entityType: string, entityId: string) {
  const { data } = await supabase
    .from("attachments")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false });

  return (data || []) as Attachment[];
}

export async function uploadAttachment(params: {
  userId: string;
  entityType: string;
  entityId: string;
  file: File;
  label?: string;
  isPublic?: boolean;
}) {
  const extension = params.file.name.split(".").pop() || "file";
  const filePath = `${params.userId}/${params.entityType}/${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-files")
    .upload(filePath, params.file);

  if (uploadError) {
    return uploadError.message;
  }

  const { data } = supabase.storage
    .from("portfolio-files")
    .getPublicUrl(filePath);

  const { error } = await supabase.from("attachments").insert({
    user_id: params.userId,
    entity_type: params.entityType,
    entity_id: params.entityId,
    file_url: data.publicUrl,
    file_name: params.file.name,
    label: params.label || null,
    is_public: params.isPublic ?? false,
  });

  return error ? error.message : null;
}

export async function deleteAttachment(id: string) {
  const { error } = await supabase.from("attachments").delete().eq("id", id);
  return error ? error.message : null;
}
