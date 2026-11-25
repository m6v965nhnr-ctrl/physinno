import type { Metadata } from "next";
import Link from "next/link";
import { ORGANS } from "@/content/organs/generated";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "臓器・仕組みの一覧｜国試に出る解剖・生理（図つき）",
  description: "理学療法士国家試験に出る臓器の場所・構造・働きと、体の仕組みを、図つきで、出典を確認してまとめた一覧です。",
  alternates: { canonical: "/columns/organs" },
};

export default function OrganIndex() {
  const systems = [...new Set(ORGANS.map((d) => d.system))];
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/columns" className="text-sm text-gray-400 hover:text-gray-700">← コラム</Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">臓器・仕組みの一覧</h1>
        <p className="mt-2 text-sm leading-7 text-gray-600">
          理学療法士国家試験に出る臓器の場所・構造・働きと、体の仕組みを、図つきでまとめました。{SITE_NAME}の一問一答では、問題に出てきた臓器や部位をタップすると、ここの要約と図をすぐに見られます。
        </p>
        {systems.map((s) => (
          <section key={s} className="mt-8">
            <h2 className="text-base font-bold text-gray-900">{s}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ORGANS.filter((d) => d.system === s).map((d) => (
                <li key={d.slug}>
                  <Link href={`/columns/organs/${d.slug}`} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
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
