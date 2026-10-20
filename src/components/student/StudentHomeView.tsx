"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import QuizSchoolRanking from "@/components/student/QuizSchoolRanking";
import AddToHomeButton from "@/components/AddToHomeButton";
import StudyCalendarCard from "@/components/student/StudyCalendarCard";
import StudentHomePosts from "@/components/student/StudentHomePosts";
import {
  StudentItem,
  StudentProfile,
  StudyLog,
  UpcomingEvent,
  computeCountdown,
  statusLabel,
  upcomingEvents,
} from "@/lib/student";

const LINKS = [
  { href: "/student/tracker", icon: "🗂️", title: "実習・就活トラッカー", body: "実習先・病院見学・応募・提出物を管理" },
  { href: "/student/exam", icon: "⏳", title: "国試カウントダウン", body: "学習ログと、科目ごとの積み上げ" },
  { href: "/student/exams", icon: "📚", title: "先輩からの勉強方法（科目ごと）", body: "科目ごとの出題の傾向・勉強法・過去問を、同じ学校の先輩から" },
  { href: "/student/questions", icon: "🙋", title: "先輩に質問", body: "実習・国試・就活を現役PTに相談" },
  { href: "/student/report-helper", icon: "📝", title: "実習レポート支援", body: "考察の論文探し、構成・誤字脱字チェック（AI）" },
  { href: "/pts?tab=search&mode=hospitals", icon: "🏥", title: "病院・実習先を探す", body: "診療科や実習生の声から比較" },
  { href: "/student/settings", icon: "⚙️", title: "設定", body: "名前・卒業予定年（国試の日は、自動で計算）" },
];

function dayText(days: number) {
  if (days > 0) return `あと${days}日`;
  if (days === 0) return "今日";
  return `${-days}日前`;
}

// 学生ホームの見た目。ログイン中の学生ホームと、ログインなしの「学生として見る」（preview）で同じものを使う。
// preview のときは、ボタンやリンクを押せない（見るだけ）。上の案内（banner）だけ押せる
export default function StudentHomeView({
  name,
  profile,
  items,
  logs,
  onLogout,
  preview = false,
  banner,
}: {
  name: string | null;
  profile: StudentProfile;
  items: StudentItem[];
  logs: StudyLog[];
  onLogout?: () => void;
  preview?: boolean;
  banner?: ReactNode;
}) {
  const countdown = computeCountdown(profile);
  const events: UpcomingEvent[] = upcomingEvents(items);
  // 4月1日のPT切り替えの案内は、約3か月前（1月ごろ）から出す。1か月前からは、目立つ色にする
  const switchSoon = countdown.switchDays <= 92 && countdown.switchDays >= 0;
  const switchVerySoon = countdown.switchDays <= 31;

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
            onClick={onLogout}
            inert={preview}
            className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ログアウト
          </button>
        </div>
      </header>

      {banner && <div className="mx-auto max-w-2xl px-6 pt-5">{banner}</div>}

      <div inert={preview} className="mx-auto max-w-2xl space-y-5 px-6 py-6">
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
          <div
            className={`rounded-2xl p-4 text-sm leading-6 ${
              switchVerySoon ? "bg-amber-50 text-amber-900" : "bg-brand-50 text-gray-800"
            }`}
          >
            <p className="font-semibold">
              {profile.graduation_year}年4月1日（{dayText(countdown.switchDays)}）に、PTのアカウントに自動で切り替わります
            </p>
            <p className="mt-1 text-xs leading-5">
              切り替わると、実習・就活トラッカーや国試カウントダウンなど、学生向けの機能は使えなくなります（記録は残ります）。
              投稿・検索・メッセージなどは、そのまま使えます。切り替わったあとは、勤務先や専門分野などのプロフィールを入力しましょう。
            </p>
            <p className="mt-1 text-xs leading-5">
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
          <div className="rounded-2xl border border-[var(--relight-line)] bg-white px-3.5 py-2.5 shadow-sm">
            <p className="text-xs text-gray-500">国家試験まで</p>
            <p className="text-2xl font-bold leading-tight tracking-tight">
              {countdown.examDays >= 0 ? countdown.examDays : 0}
              <span className="ml-1 text-sm font-medium text-gray-500">日</span>
            </p>
            <p className="whitespace-nowrap text-[11px] text-gray-400">
              {countdown.examDate.getFullYear()}/{countdown.examDate.getMonth() + 1}/{countdown.examDate.getDate()}
              {countdown.examIsEstimate ? "ごろ（目安）" : ""}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--relight-line)] bg-white px-3.5 py-2.5 shadow-sm">
            <p className="text-xs text-gray-500">卒業まで</p>
            <p className="text-2xl font-bold leading-tight tracking-tight">
              {countdown.graduationDays >= 0 ? countdown.graduationDays : 0}
              <span className="ml-1 text-sm font-medium text-gray-500">日</span>
            </p>
            <p className="whitespace-nowrap text-[11px] text-gray-400">{profile.graduation_year}年3月卒業予定</p>
          </div>
        </section>

        {/* ホーム画面に追加（目立つ場所に。追加済みのアプリの中では出ない） */}
        <AddToHomeButton />

        {/* 今日の学習（解いた問題の数・連続日数）と、やった日に色がつくカレンダー */}
        <StudyCalendarCard preview={preview} />

        {/* 学校のランキング */}
        {!preview && <QuizSchoolRanking />}

        {/* 直近の予定 */}
        <section className="rounded-2xl border border-[var(--relight-line)] bg-white p-4 shadow-sm">
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

        {/* PTの最新の投稿 */}
        <StudentHomePosts />

        {/* 各機能 */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-start gap-3 rounded-2xl border border-[var(--relight-line)] bg-white p-4 shadow-sm transition hover:bg-gray-50"
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
