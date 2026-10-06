import Link from "next/link";

// 過去問ページ共通の登録導線
export default function KokushiCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl bg-relight-gradient px-6 py-5 text-white">
      <p className="text-base font-semibold">
        {compact ? "解説・苦手分析は無料登録で" : "全1,000問を、解説つきで解き続けよう"}
      </p>
      <p className="mt-1 text-sm leading-6 text-white/95">
        無料登録すると、全問の解説、間違えた問題だけの復習、科目ごとの正答率、時間を計る模擬試験、国試までのカウントダウンが使えます。
      </p>
      <Link
        href="/register?type=student"
        className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
      >
        学生として無料ではじめる
      </Link>
    </div>
  );
}
