"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  StudentItem,
  StudentProfile,
  StudyLog,
  UpcomingEvent,
  computeCountdown,
  computeStudyStats,
  formatMinutes,
  getMyStudentProfile,
  listStudentItems,
  listStudyLogs,
  statusLabel,
  upcomingEvents,
} from "@/lib/student";

const LINKS = [
  { href: "/student/tracker", icon: "🗂️", title: "実習・就活トラッカー", body: "実習先・病院見学・応募・提出物を管理" },
  { href: "/student/exam", icon: "⏳", title: "国試カウントダウン", body: "学習ログと、科目ごとの積み上げ" },
  { href: "/student/exams", icon: "📚", title: "試験情報（学校の科目ごと）", body: "出題の傾向・勉強法・過去問を、同じ学校で共有" },
  { href: "/student/questions", icon: "🙋", title: "先輩に質問", body: "実習・国試・就活を現役PTに相談" },
  { href: "/student/report-helper", icon: "📝", title: "実習レポート支援", body: "考察の論文探し、構成・誤字脱字チェック（AI）" },
  { href: "/pts?tab=search&mode=hospitals", icon: "🏥", title: "病院・実習先を探す", body: "診療科や実習生の声から比較" },
  { href: "/student/settings", icon: "⚙️", title: "設定", body: "名前・卒業予定年・国試日" },
];

function dayText(days: number) {
  if (days > 0) return `あと${days}日`;
  if (days === 0) return "今日";
  return `${-days}日前`;
}

// 学生のホーム: 卒業・国試までの日数、直近の予定、今週の学習、各機能への入口
export default function StudentHomePage() {
  const router = useRouter();
  const { loading, userId } = useMyAccount(["student"]);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [items, setItems] = useState<StudentItem[]>([]);
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [name, setName] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const [p, i, l, { data: pt }] = await Promise.all([
        getMyStudentProfile(userId),
        listStudentItems(userId),
        listStudyLogs(userId, 120),
        supabase.from("pt_profiles").select("full_name").eq("user_id", userId).maybeSingle(),
      ]);

      setProfile(p);
      setItems(i);
      setLogs(l);
      setName(pt?.full_name?.trim() || null);
    })();
  }, [userId]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading || name === undefined || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const countdown = computeCountdown(profile);
  const events: UpcomingEvent[] = upcomingEvents(items);
  const stats = computeStudyStats(logs);
  const switchSoon = countdown.switchDays <= 31 && countdown.switchDays >= 0;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-2xl items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-emerald-600">学生</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">
              {name ? `${name}さんの学生ホーム` : "学生ホーム"}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ログアウト
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-5 px-6 py-6">
        {!name && (
          <Link
            href="/student/settings?welcome=1"
            className="block rounded-2xl bg-emerald-50 p-4 transition hover:bg-emerald-100"
          >
            <p className="text-sm font-semibold text-emerald-800">名前を入力しましょう</p>
            <p className="mt-1 text-xs leading-5 text-emerald-700">
              コメントやメッセージで表示されます。養成校や卒業予定も設定できます →
            </p>
          </Link>
        )}

        {switchSoon && (
          <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            <p className="font-semibold">
              {profile.graduation_year}年4月1日（{dayText(countdown.switchDays)}）に、PTのアカウントに自動で切り替わります
            </p>
            <p className="mt-1 text-xs">
              国試に合格できなかった場合などは、
              <Link href="/student/settings" className="underline">
                設定
              </Link>
              で卒業予定年を変更してください。
            </p>
          </div>
        )}

        {/* カウントダウン */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">国家試験まで</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">
              {countdown.examDays >= 0 ? countdown.examDays : 0}
              <span className="ml-1 text-sm font-medium text-gray-500">日</span>
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              {countdown.examDate.getFullYear()}年{countdown.examDate.getMonth() + 1}月
              {countdown.examDate.getDate()}日{countdown.examIsEstimate ? "ごろ（目安）" : ""}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">卒業まで</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">
              {countdown.graduationDays >= 0 ? countdown.graduationDays : 0}
              <span className="ml-1 text-sm font-medium text-gray-500">日</span>
            </p>
            <p className="mt-1 text-[11px] text-gray-400">{profile.graduation_year}年3月卒業予定</p>
          </div>
        </section>

        {/* 今週の学習 */}
        <Link href="/student/exam" className="block rounded-2xl bg-white p-4 shadow-sm transition hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">今週の学習</p>
            <span className="text-xs text-gray-400">記録する →</span>
          </div>
          <div className="mt-2 flex gap-6 text-sm">
            <p>
              <span className="text-xl font-bold">{formatMinutes(stats.weekMinutes)}</span>
              <span className="ml-1 text-xs text-gray-500">/ 7日間</span>
            </p>
            <p>
              <span className="text-xl font-bold">{stats.streakDays}</span>
              <span className="ml-1 text-xs text-gray-500">日連続</span>
            </p>
          </div>
          {!stats.studiedToday && (
            <p className="mt-2 text-xs text-gray-400">今日はまだ記録がありません</p>
          )}
        </Link>

        {/* 直近の予定 */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">直近の予定</p>
            <Link href="/student/tracker" className="text-xs text-gray-400">
              トラッカーを開く →
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="mt-3 text-sm text-gray-400">
              予定はまだありません。実習先や提出期限をトラッカーに追加すると、ここに表示されます。
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {events.map((e, i) => (
                <li key={`${e.item.id}-${i}`} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate">
                    <span
                      className={`mr-2 rounded-full px-2 py-0.5 text-[10px] ${
                        e.days <= 3 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {e.label}
                    </span>
                    {e.item.title}
                    <span className="ml-1 text-[11px] text-gray-400">
                      （{statusLabel(e.item.kind, e.item.status)}）
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-gray-500">{dayText(e.days)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 各機能 */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:bg-gray-50"
            >
              <span className="text-2xl" aria-hidden="true">
                {l.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold">{l.title}</span>
                <span className="mt-0.5 block text-xs leading-5 text-gray-500">{l.body}</span>
              </span>
            </Link>
          ))}
        </section>

        <p className="text-center text-xs text-gray-400">
          ホーム・メッセージ・検索は、下のメニューからPTと同じように使えます。
        </p>
      </div>
    </main>
  );
}
