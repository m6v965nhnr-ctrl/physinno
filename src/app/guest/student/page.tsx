"use client";

import Link from "next/link";
import GuestBanner from "@/components/GuestBanner";
import { setGuestRole } from "@/lib/guestRole";
import { useEffect } from "react";

const TRY = [
  { href: "/kokushi", icon: "📝", title: "国試の過去問を解く", body: "第57〜61回の全1,000問。ログインなしで、1問ずつ解いて正答を確認できます。" },
  { href: "/pts?mode=hospitals", icon: "🏥", title: "実習先・就職先の病院を探す", body: "リハビリ科のある全国約5,000病院。疾患の比率や、PTの職場口コミも見られます。" },
  { href: "/columns/pt-kokushi-study-plan", icon: "📖", title: "国試の勉強法を読む", body: "過去問を軸にした進め方と、最終学年1年間のスケジュール例。" },
  { href: "/columns/pt-kokushi-pass-rate", icon: "📊", title: "国試の合格率と合格基準", body: "第61回の合格率と、過去5年の推移（厚生労働省の発表）。" },
];

const AFTER_REGISTER = [
  { icon: "💡", title: "全問の解説・間違えた問題の復習", body: "解説は、登録なしでは3問まで。登録すると、全問の解説と、間違いだけの復習、科目ごとの正答率が使えます。" },
  { icon: "⏱", title: "時間を計る模擬試験・国試カウントダウン", body: "本番と同じ160分で解く模擬試験。試験日までの日数と、学習ログ（連続記録）も。" },
  { icon: "🗂", title: "実習・就活トラッカー", body: "実習先、病院見学、応募、提出物の期限を、ひとつにまとめて管理します。" },
  { icon: "🙋", title: "先輩PTへの匿名の質問", body: "実習・国試・就活の疑問を、現役のPTに、匿名で聞けます。" },
  { icon: "✍️", title: "実習レポート支援", body: "文献探しと、構成・誤字脱字のチェック（AI。代筆はしません）。" },
];

// 学生として、ログインなしで見るときの入口
export default function GuestStudentPage() {
  useEffect(() => {
    setGuestRole("student");
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">学生として見る</h1>
          <Link href="/guest" className="text-xs text-gray-500 underline">
            立場を切り替える
          </Link>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-600">国試・実習・就活の準備に使える機能を、まずは、登録なしで試せます。</p>

        <div className="mt-4">
          <GuestBanner text="いまは、ゲストとして見ています。無料登録（学生）すると、下の「登録すると使える機能」がすべて使えます。" />
        </div>

        <h2 className="mt-6 text-lg font-bold text-gray-900">いますぐ、試せる</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {TRY.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="block h-full rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-gray-400">
                <span aria-hidden="true" className="text-2xl">{t.icon}</span>
                <span className="mt-1 block text-base font-semibold text-gray-900">{t.title} →</span>
                <span className="mt-1 block text-sm leading-6 text-gray-600">{t.body}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-lg font-bold text-gray-900">登録すると使える機能</h2>
        <ul className="mt-3 space-y-3">
          {AFTER_REGISTER.map((a) => (
            <li key={a.title} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4">
              <span aria-hidden="true" className="text-2xl">{a.icon}</span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">{a.title}</span>
                <span className="mt-0.5 block text-sm leading-6 text-gray-600">{a.body}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl bg-relight-gradient p-5 text-center">
          <p className="text-base font-bold">登録は無料。メールアドレスだけで1分です。</p>
          <p className="mt-1 text-xs">卒業したら、そのままPTのアカウントに切り替わります。</p>
          <Link href="/register?type=student" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900">
            学生として無料ではじめる
          </Link>
        </div>
      </div>
    </main>
  );
}
