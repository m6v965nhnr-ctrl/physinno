import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import WriteFlow from "@/components/kuchikomi/WriteFlow";

const TITLE = "職場の口コミを書く｜理学療法士・作業療法士・言語聴覚士";
const DESCRIPTION = "あなたの職場（以前の職場でも）の口コミを、匿名で書けます。教育体制・残業・給与・人間関係などの6項目の評価と、分類ごとのコメント。これから職場を選ぶ後輩の力になります。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kuchikomi/write" },
  robots: { index: false, follow: true }, // 操作のページ。検索には出さない
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/kuchikomi/write" },
};

export default function KuchikomiWritePage() {
  return (
    <KuchikomiFrame>
      <div className="mx-auto max-w-3xl px-5 py-8">
        <h1 className="text-2xl font-bold leading-snug text-gray-900">職場の口コミを書く</h1>
        <p className="mt-2 text-sm leading-7 text-gray-700">
          働いたことのある職場の口コミを、1分ほどで書けます。匿名にもできます。あなたの声が、これから職場を選ぶ理学療法士・作業療法士・言語聴覚士の力になります。
        </p>
        <ul className="mt-3 space-y-1 text-xs leading-6 text-gray-600">
          <li>・ 患者さんが特定される情報、個人情報は、書かないでください。</li>
          <li>・ 事実にもとづいて、個人への誹謗中傷にならないよう書いてください。</li>
        </ul>
        <div className="mt-6"><WriteFlow /></div>
      </div>
    </KuchikomiFrame>
  );
}
