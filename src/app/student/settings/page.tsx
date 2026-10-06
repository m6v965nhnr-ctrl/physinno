"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { School, searchSchools, setMySchool } from "@/lib/exams";
import {
  estimatedExamDate,
  getMyStudentProfile,
  graduationYearOptions,
  toDateInput,
  updateMyStudentProfile,
} from "@/lib/student";

// 学生の設定: 名前・自己紹介(他のユーザーに見える)と、養成校・卒業予定年・国試日(本人だけに表示)
export default function StudentSettingsPage() {
  const router = useRouter();
  const { loading, userId } = useMyAccount(["student"]);

  const [welcome, setWelcome] = useState(false);
  const [fullName, setFullName] = useState("");
  const [biography, setBiography] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [graduationYear, setGraduationYear] = useState(0);
  const [examDate, setExamDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [schoolOptions, setSchoolOptions] = useState<School[]>([]);

  // 学校名の入力に合わせて、すでに登録されている学校を候補に出す(同じ学校が別々に登録されないように)
  useEffect(() => {
    const q = schoolName.trim();
    if (q.length < 1) {
      setSchoolOptions([]);
      return;
    }
    const timer = setTimeout(() => {
      searchSchools(q).then(setSchoolOptions);
    }, 250);
    return () => clearTimeout(timer);
  }, [schoolName]);

  useEffect(() => {
    setWelcome(new URLSearchParams(window.location.search).get("welcome") === "1");
  }, []);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const [{ data: profile }, student] = await Promise.all([
        supabase
          .from("pt_profiles")
          .select("full_name, biography")
          .eq("user_id", userId)
          .maybeSingle(),
        getMyStudentProfile(userId),
      ]);

      setFullName(profile?.full_name ?? "");
      setBiography(profile?.biography ?? "");
      setSchoolName(student?.school_name ?? "");
      setGraduationYear(student?.graduation_year ?? graduationYearOptions()[0]);
      setExamDate(student?.national_exam_date ?? "");
      setLoaded(true);
    })();
  }, [userId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName.trim()) {
      notify("名前を入力してください");
      document.getElementById("field-name")?.focus();
      return;
    }

    setSaving(true);

    // 名前・自己紹介は pt_profiles に保存(コメントやメッセージで他のユーザーに表示される)
    const { data: existing } = await supabase
      .from("pt_profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    const profileFields = { full_name: fullName.trim(), biography: biography.trim() || null };

    const profileResult = existing
      ? await supabase.from("pt_profiles").update(profileFields).eq("id", existing.id)
      : await supabase.from("pt_profiles").insert({ user_id: userId, ...profileFields });

    if (profileResult.error) {
      setSaving(false);
      notify(`保存できませんでした: ${profileResult.error.message}`);
      return;
    }

    const schoolError = await setMySchool(schoolName);

    if (schoolError) {
      setSaving(false);
      notify(`学校名を保存できませんでした: ${schoolError}`);
      return;
    }

    const error = await updateMyStudentProfile(userId, {
      graduation_year: graduationYear,
      national_exam_date: examDate || null,
    });

    setSaving(false);

    if (error) {
      notify(`保存できませんでした: ${error}`);
      return;
    }

    notify("保存しました");
    router.push("/student");
  }

  async function handleBecomePt() {
    if (
      !confirm(
        "PTのアカウントに切り替えますか？\n学生向けの機能（実習・就活トラッカー、国試カウントダウンなど）は使えなくなります。\n（記録したデータは残ります）"
      )
    ) {
      return;
    }

    const error = await setMyAccountType("pt");

    if (error) {
      notify(error);
      return;
    }

    window.location.href = "/mypage/edit?welcome=1";
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading || !loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const years = graduationYearOptions();
  if (graduationYear && !years.includes(graduationYear)) years.unshift(graduationYear);
  const estimated = toDateInput(estimatedExamDate(graduationYear));

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-28">
      <div className="mx-auto max-w-lg">
        <Link href="/student" className="text-sm text-gray-400">
          ← 学生ホーム
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">学生の設定</h1>

        {welcome && (
          <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            登録ありがとうございます！まずは名前を入力してください。名前は、コメントやメッセージで他のユーザーに表示されます。
            養成校名や卒業予定は、あなただけに表示されます。
          </div>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">他のユーザーに表示される情報</h2>

            <label className="block text-sm font-medium" htmlFor="field-name">
              名前（ニックネーム可）
              <input
                id="field-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={40}
                placeholder="例: 山田 花子"
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-normal outline-none focus:border-gray-400"
              />
            </label>

            <label className="block text-sm font-medium">
              自己紹介（任意）
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="興味のある分野や、先輩に聞いてみたいことなど"
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-normal outline-none focus:border-gray-400"
              />
            </label>
          </section>

          <section className="space-y-4 rounded-2xl border border-gray-100 p-4">
            <h2 className="text-sm font-semibold text-gray-900">
              あなただけに表示される情報
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-500">
                非公開
              </span>
            </h2>

            <label className="block text-sm font-medium">
              養成校名（任意）
              <input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                maxLength={100}
                list="school-options"
                placeholder="例: 〇〇リハビリテーション専門学校"
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-normal outline-none focus:border-gray-400"
              />
              <datalist id="school-options">
                {schoolOptions.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
              <span className="mt-1 block text-xs font-normal leading-5 text-gray-400">
                正式名称で入力してください。同じ学校を登録した人だけが、その学校の試験情報を見て、書き込めます（学校は自己申告です）。
                候補に出た学校は、選ぶと同じ学校としてまとまります。
              </span>
            </label>

            <label className="block text-sm font-medium">
              卒業予定（3月卒業の年）
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-normal outline-none focus:border-gray-400"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}年3月卒業予定
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-xs font-normal leading-5 text-gray-400">
                {graduationYear}年4月1日に、自動でPTのアカウントに切り替わります。
                国試に合格できなかった場合などは、4月1日までに卒業予定年を変更してください。
              </span>
            </label>

            <label className="block text-sm font-medium">
              国家試験の日（任意）
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="mt-1 block w-full min-w-0 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-normal outline-none focus:border-gray-400"
              />
              <span className="mt-1 block text-xs font-normal leading-5 text-gray-400">
                未入力のときは、例年の目安（{estimated}ごろ、2月の第3日曜）で数えます。日程は厚生労働省の公表で確認してください。
              </span>
            </label>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "保存中…" : "保存する"}
          </button>
        </form>

        <section className="mt-10 space-y-3 border-t pt-6 text-sm">
          <Link href="/notifications" className="block text-gray-600 underline underline-offset-4">
            通知の設定（メール通知のオン・オフ）
          </Link>
          <button onClick={handleBecomePt} className="block text-left text-gray-600 underline underline-offset-4">
            すでに卒業・免許取得済みなので、PTのアカウントに切り替える
          </button>
          <button onClick={handleLogout} className="block text-left text-gray-400 underline underline-offset-4">
            ログアウト
          </button>
        </section>
      </div>
    </main>
  );
}
