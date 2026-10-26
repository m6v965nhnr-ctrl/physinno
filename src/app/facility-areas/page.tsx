import type { Metadata } from "next";
import Link from "next/link";
import { FACILITY_AREA_TYPES } from "@/lib/hospitalAreas";

const TITLE = "リハビリ関連施設を種類と都道府県から探す（老健・デイサービス・訪問看護など）";
const DESCRIPTION = "介護老人保健施設（老健）・特別養護老人ホーム・デイケア・デイサービス・訪問リハビリ・訪問看護ステーション・リハビリテーション科のあるクリニックなどを、種類と都道府県から一覧で探せます。理学療法士の職場探し・実習・転職の下調べに。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/facility-areas" },
};

export default function FacilityAreasPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">施設の種類から探す</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          理学療法士が働く施設を、種類ごとに都道府県から探せます。各施設のページでは、職場環境の口コミ・質問・採用情報を見られます。病院は<Link href="/hospital-areas" className="underline">病院を都道府県から探す</Link>へ。
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {Object.entries(FACILITY_AREA_TYPES).map(([slug, label]) => (
            <li key={slug}>
              <Link href={`/facility-areas/${slug}`} className="block rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:border-gray-400">
                {label} <span aria-hidden="true" className="text-gray-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
