import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PREFECTURES } from "@/lib/prefectures";
import { FACILITY_AREA_TYPES, type FacilityAreaSlug } from "@/lib/hospitalAreas";
import { SITE_NAME } from "@/lib/site";

export const revalidate = 86400;

type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const label = FACILITY_AREA_TYPES[type as FacilityAreaSlug];
  if (!label) return {};
  const title = `${label}を都道府県から探す`;
  const description = `全国の${label}を、都道府県ごとに一覧できます。各施設のページで、理学療法士の職場環境の口コミ・採用情報を見られます。`;
  return { title, description, alternates: { canonical: `/facility-areas/${type}` }, openGraph: { title: `${title}｜${SITE_NAME}`, description } };
}

export default async function FacilityTypePage({ params }: Props) {
  const { type } = await params;
  const label = FACILITY_AREA_TYPES[type as FacilityAreaSlug];
  if (!label) notFound();

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/facility-areas" className="text-sm text-gray-500 hover:text-gray-800">← 施設の種類の一覧</Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">{label}を都道府県から探す</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">都道府県を選ぶと、{label}の一覧が見られます。</p>
        <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PREFECTURES.map((p) => (
            <li key={p}>
              <Link href={`/facility-areas/${type}/${encodeURIComponent(p)}`} className="block rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 hover:border-gray-400">
                {p}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
