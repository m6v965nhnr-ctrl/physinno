import type { Metadata } from "next";
import Link from "next/link";
import MuscleTable from "@/components/columns/MuscleTable";
import { MUSCLES } from "@/content/muscles/data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "筋の起始・停止・支配神経・作用の一覧",
  description: `理学療法士国家試験・臨床でよく出る${MUSCLES.length}の筋について、起始・停止・支配神経・作用をまとめた一覧です。部位・名前・神経で絞り込めます。`,
  alternates: { canonical: "/columns/muscles" },
};

export default function MusclesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/columns" className="text-sm text-gray-400 hover:text-gray-700">
          ← コラム一覧
        </Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900">筋の起始・停止・支配神経・作用の一覧</h1>
        <p className="mt-2 text-xs text-gray-400">{SITE_NAME}編集部 ・ 2026-10-20</p>
        <p className="mt-4 text-sm leading-7 text-gray-600">
          国家試験・臨床でよく出る{MUSCLES.length}の筋を、部位ごとにまとめました。一問一答の解説からも、出てきた筋・骨をタップして確かめられます。骨は
          <Link href="/columns/bones" className="text-blue-600 underline">
            骨の一覧
          </Link>
          を見てください。
        </p>
        <p className="mt-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          学習用の要約です。脊髄の髄節（C5-6など）は、教科書により書き方に差があります。試験や臨床では、使っている教科書・解剖学書で確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。
        </p>
        <div className="mt-6">
          <MuscleTable />
        </div>
      </div>
    </main>
  );
}
