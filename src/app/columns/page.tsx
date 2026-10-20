import type { Metadata } from "next";
import Link from "next/link";
import { COLUMNS } from "@/lib/columns";
import ColumnList from "@/components/columns/ColumnList";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "コラム",
  description:
    "理学療法士のキャリア・症例発表・資格更新・研修情報など、臨床と働き方に役立つ読み物を集めたRe:lightのコラムです。",
  alternates: { canonical: "/columns" },
};

export default function ColumnsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-gray-900">
          コラム
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          理学療法士のキャリア・臨床・働き方に役立つ読み物です。
        </p>

        <ColumnList columns={COLUMNS} />
      </div>
    </main>
  );
}
