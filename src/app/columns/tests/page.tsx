import type { Metadata } from "next";
import Link from "next/link";
import { TESTS } from "@/content/tests/generated";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "検査・基準値の一覧｜国試に出る評価法・判断基準",
  description: "理学療法士国家試験の過去問に出てきた検査・評価法・基準値を、公式資料で確認してまとめた一覧です。出典つき。",
  alternates: { canonical: "/columns/tests" },
};

const ORDER = ["評価尺度", "臨床検査", "診断基準・分類", "検査法・徴候", "リスク管理", "物理療法"];

export default function TestIndex() {
  const cats = ORDER.filter((c) => TESTS.some((d) => d.category === c));
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/columns" className="text-sm text-gray-400 hover:text-gray-700">← コラム</Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">検査・基準値の一覧</h1>
        <p className="mt-2 text-sm leading-7 text-gray-600">
          理学療法士国家試験（第52〜61回）の過去問に出てきた検査・評価法・基準値のうち、公式資料の本文で値を確かめられたものをまとめました。{SITE_NAME}の一問一答では、問題に出てきた検査をタップすると、ここの要約をすぐに読めます。
        </p>
        {cats.map((c) => (
          <section key={c} className="mt-8">
            <h2 className="text-base font-bold text-gray-900">{c}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TESTS.filter((d) => d.category === c).map((d) => (
                <li key={d.slug}>
                  <Link href={`/columns/tests/${d.slug}`} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
