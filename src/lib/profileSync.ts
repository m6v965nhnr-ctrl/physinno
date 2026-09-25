import { supabase } from "@/lib/supabase";
import {
  listCertifications,
  listEducationHistory,
  listLanguageSkills,
  listWorkHistory,
} from "@/lib/portfolio";

// プロフィール編集（pt_profiles）とポートフォリオ（各履歴テーブル）で
// 重複する項目を相互に反映させる。
//   学歴     : pt_profiles.education    ⇔ education_history.school_name
//   勤務先   : pt_profiles.workplace / department ⇔ work_history.workplace / department
//   資格     : pt_profiles.qualification ⇔ certifications.name（区切り文字で複数）
//   語学     : pt_profiles.languages     ⇔ language_skills.language（区切り文字で複数）

export type SyncFields = {
  education: string;
  workplace: string;
  department: string;
  qualification: string;
  languages: string;
};

const SEPARATOR = /[、,，／/・\n]+/;

export function splitList(text: string) {
  return Array.from(
    new Set(
      text
        .split(SEPARATOR)
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

function joinList(items: string[]) {
  return items.join("、");
}

// ========================================
// プロフィール → ポートフォリオ
// prev（保存前の値）と next（保存後の値）の差分を履歴側に反映する。
// prev === next のときは「履歴側に存在しなければ追加」のみ行う。
// ========================================
export async function syncProfileToPortfolio(
  userId: string,
  prev: SyncFields,
  next: SyncFields
) {
  const [edu, work, certs, langs] = await Promise.all([
    listEducationHistory(userId),
    listWorkHistory(userId),
    listCertifications(userId),
    listLanguageSkills(userId),
  ]);

  // ---- 学歴（単一値）----
  const nextEdu = next.education.trim();
  const prevEdu = prev.education.trim();
  const prevEduRow = prevEdu ? edu.find((e) => e.school_name === prevEdu) : null;
  const nextEduRow = nextEdu ? edu.find((e) => e.school_name === nextEdu) : null;

  if (nextEdu !== prevEdu && prevEduRow) {
    if (!nextEdu) {
      await supabase.from("education_history").delete().eq("id", prevEduRow.id);
    } else if (!nextEduRow) {
      await supabase
        .from("education_history")
        .update({ school_name: nextEdu })
        .eq("id", prevEduRow.id);
    }
  } else if (nextEdu && !nextEduRow) {
    await supabase
      .from("education_history")
      .insert({ user_id: userId, school_name: nextEdu });
  }

  // ---- 職歴（勤務先＋診療科）----
  const nextWp = next.workplace.trim();
  const prevWp = prev.workplace.trim();
  const nextDept = next.department.trim();
  const prevWpRow = prevWp ? work.find((w) => w.workplace === prevWp) : null;
  const nextWpRow = nextWp ? work.find((w) => w.workplace === nextWp) : null;

  if (nextWp !== prevWp && prevWpRow) {
    if (!nextWp) {
      await supabase.from("work_history").delete().eq("id", prevWpRow.id);
    } else if (!nextWpRow) {
      await supabase
        .from("work_history")
        .update({ workplace: nextWp, department: nextDept || null })
        .eq("id", prevWpRow.id);
    }
  } else if (nextWp && !nextWpRow) {
    await supabase.from("work_history").insert({
      user_id: userId,
      workplace: nextWp,
      department: nextDept || null,
    });
  } else if (nextWpRow && nextDept && nextWpRow.department !== nextDept) {
    await supabase
      .from("work_history")
      .update({ department: nextDept })
      .eq("id", nextWpRow.id);
  }

  // ---- 資格（複数値）----
  const nextCerts = splitList(next.qualification);
  const prevCerts = splitList(prev.qualification);

  for (const name of prevCerts.filter((n) => !nextCerts.includes(n))) {
    const ids = certs.filter((c) => c.name === name).map((c) => c.id);
    if (ids.length > 0) {
      await supabase.from("certifications").delete().in("id", ids);
    }
  }
  for (const name of nextCerts) {
    if (!certs.some((c) => c.name === name)) {
      await supabase.from("certifications").insert({ user_id: userId, name });
    }
  }

  // ---- 語学（複数値）----
  const nextLangs = splitList(next.languages);
  const prevLangs = splitList(prev.languages);

  for (const name of prevLangs.filter((n) => !nextLangs.includes(n))) {
    const ids = langs.filter((l) => l.language === name).map((l) => l.id);
    if (ids.length > 0) {
      await supabase.from("language_skills").delete().in("id", ids);
    }
  }
  for (const name of nextLangs) {
    if (!langs.some((l) => l.language === name)) {
      await supabase
        .from("language_skills")
        .insert({ user_id: userId, language: name });
    }
  }
}

// ========================================
// ポートフォリオ → プロフィール
// 履歴の内容からプロフィールの該当項目を更新する。
// ========================================
export async function syncPortfolioToProfile(userId: string) {
  const { data: profile } = await supabase
    .from("pt_profiles")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  // PTプロフィールがまだ無い場合は何もしない
  if (!profile) return;

  const [edu, work, certs, langs] = await Promise.all([
    listEducationHistory(userId),
    listWorkHistory(userId),
    listCertifications(userId),
    listLanguageSkills(userId),
  ]);

  // 学歴: 入学日が最も新しいもの（日付なしは最後）
  const latestEdu = [...edu].sort((a, b) =>
    (b.enrolled_on || b.graduated_on || "").localeCompare(
      a.enrolled_on || a.graduated_on || ""
    )
  )[0];

  // 勤務先: 在職中（退職日なし）のうち入職日が最新のもの、なければ入職日が最新のもの
  const byJoined = [...work].sort((a, b) =>
    (b.joined_on || "").localeCompare(a.joined_on || "")
  );
  const currentWork = byJoined.find((w) => !w.left_on) || byJoined[0];

  const update: Record<string, string> = {
    education: latestEdu?.school_name || "",
    qualification: joinList(certs.map((c) => c.name)),
    languages: joinList(langs.map((l) => l.language)),
  };

  if (currentWork) {
    update.workplace = currentWork.workplace;
    update.department = currentWork.department || "";
  }

  await supabase.from("pt_profiles").update(update).eq("id", profile.id);
}

// ========================================
// 初回など：双方の内容を突き合わせて揃える
// （プロフィール側にだけある値を履歴に追加 → 履歴の全体をプロフィールへ）
// ========================================
export async function reconcileProfileAndPortfolio(userId: string) {
  const { data: profile } = await supabase
    .from("pt_profiles")
    .select("education, workplace, department, qualification, languages")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profile) return;

  const fields: SyncFields = {
    education: profile.education || "",
    workplace: profile.workplace || "",
    department: profile.department || "",
    qualification: profile.qualification || "",
    languages: profile.languages || "",
  };

  await syncProfileToPortfolio(userId, fields, fields);
  await syncPortfolioToProfile(userId);
}
