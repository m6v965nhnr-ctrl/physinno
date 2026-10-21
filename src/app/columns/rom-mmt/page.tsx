import type { Metadata } from "next";
import Link from "next/link";
import RomMmtGuide from "@/components/student/RomMmtGuide";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "ROM（関節可動域）とMMT（徒手筋力テスト）の図つき早見表",
  description: "理学療法士国家試験で問われるROM（関節可動域）の参考可動域・基本軸・移動軸・測定肢位と、MMT（徒手筋力テスト）の段階・検査の肢位を、人の形の図つきでまとめました。",
  alternates: { canonical: "/columns/rom-mmt" },
  openGraph: { title: `ROMとMMTの図つき早見表｜${SITE_NAME}`, description: "参考可動域・基本軸・移動軸・測定肢位と、MMTの段階・検査の肢位を、図つきで。", url: "/columns/rom-mmt", images: ["/opengraph-image"] },
};

export default function RomMmtPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/columns" className="text-sm text-gray-400 hover:text-gray-700">← コラム一覧</Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900">ROM（関節可動域）とMMT（徒手筋力テスト）の図つき早見表</h1>
        <p className="mt-2 text-xs text-gray-400">{SITE_NAME}編集部 ・ 2026-10-21</p>
        <p className="mt-4 text-sm leading-7 text-gray-600">
          国家試験・実習でよく問われる、ROMの参考可動域・基本軸・移動軸・測定肢位と、MMTの段階・検査の肢位を、人の形の模式図でまとめました。関節（部位）を選ぶと、運動ごとの図が出ます。一問一答の解説にも、同じ図が出ます。
        </p>
        <RomMmtGuide text="" always />
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          学習用の要約です。実際の測定・検査は、使っている教科書と、日本整形外科学会・日本リハビリテーション医学会の「関節可動域表示ならびに測定法」で確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。
        </p>
      </div>
    </main>
  );
}
