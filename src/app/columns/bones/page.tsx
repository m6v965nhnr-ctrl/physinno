import type { Metadata } from "next";
import Link from "next/link";
import BoneTable from "@/components/columns/BoneTable";
import { BONES } from "@/content/muscles/bones";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "骨の特徴・関節・付着する筋の一覧",
  description: `理学療法士国家試験・臨床でよく出る${BONES.length}の骨について、特徴・連結する関節・付着する主な筋・臨床のポイントをまとめた一覧です。部位・名前で絞り込めます。`,
  alternates: { canonical: "/columns/bones" },
};

export default function BonesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/columns" className="text-sm text-gray-400 hover:text-gray-700">
          ← コラム一覧
        </Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900">骨の特徴・関節・付着する筋の一覧</h1>
        <p className="mt-2 text-xs text-gray-400">{SITE_NAME}編集部 ・ 2026-10-20</p>
        <p className="mt-4 text-sm leading-7 text-gray-600">
          国家試験・臨床でよく出る骨（{BONES.length}項目）を、部位ごとにまとめました。骨には起始・停止がないので、ランドマーク・関節・付着する主な筋・臨床のポイントを載せています。筋は
          <Link href="/columns/muscles" className="text-blue-600 underline">
            筋の一覧
          </Link>
          を見てください。
        </p>
        <p className="mt-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          学習用の要約です。付着する筋は主なものだけで、すべてではありません。試験や臨床では、使っている教科書・解剖学書で確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。
        </p>
        <div className="mt-6">
          <BoneTable />
        </div>
      </div>
    </main>
  );
}
