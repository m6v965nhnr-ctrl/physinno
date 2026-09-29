import type { Metadata } from "next";
import Link from "next/link";
import { COLUMNS } from "@/lib/columns";
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

        <div className="mt-8 space-y-4">
          {COLUMNS.map((c) => (
            <Link
              key={c.slug}
              href={`/columns/${c.slug}`}
              className="block rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-200"
            >
              <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-relight-blue">
                {c.category}
              </span>
              <p className="mt-3 text-base font-semibold text-gray-900">
                {c.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {c.description}
              </p>
              <p className="mt-3 text-xs text-gray-400">{c.publishedAt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
