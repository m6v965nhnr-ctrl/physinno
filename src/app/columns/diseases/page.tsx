import type { Metadata } from "next";
import Link from "next/link";
import { DISEASES } from "@/content/diseases/generated";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "疾患の一覧｜国試で問われる周辺知識",
  description: "理学療法士国家試験の過去問に出てくる疾患を、症状・診断・治療・理学療法・国試で問われる点にまとめた一覧です。出典つき。",
  alternates: { canonical: "/columns/diseases" },
};

export default function DiseaseIndex() {
  const systems = [...new Set(DISEASES.map((d) => d.system))];
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/columns" className="text-sm text-gray-400 hover:text-gray-700">← コラム</Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">疾患の一覧</h1>
        <p className="mt-2 text-sm leading-7 text-gray-600">
          理学療法士国家試験（第52〜61回）の過去問に出てきた疾患を、国試を解くのに必要な周辺知識（症状・診断・治療・理学療法・問われる点）にまとめました。{SITE_NAME}の一問一答では、問題に出てきた疾患をタップすると、ここの要約をすぐに読めます。
        </p>
        {systems.map((s) => (
          <section key={s} className="mt-8">
            <h2 className="text-base font-bold text-gray-900">{s}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {DISEASES.filter((d) => d.system === s).map((d) => (
                <li key={d.slug}>
                  <Link href={`/columns/diseases/${d.slug}`} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                    {d.name.replace(/\(.*?\)/g, "")}
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
