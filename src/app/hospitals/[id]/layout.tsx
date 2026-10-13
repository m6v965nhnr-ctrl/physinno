import { cache } from "react";
import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ id: string }>; children: React.ReactNode };

// メタ情報と構造化データで同じ病院を使うので、1回のリクエストの中では、1度だけ取得する
const getHospital = cache(async (id: string) => {
  const { data } = await supabasePublic
    .from("hospitals")
    .select("name, prefecture, city, address, phone, website")
    .eq("id", id)
    .maybeSingle();
  return data;
});

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { id } = await params;

  const hospital = await getHospital(id);

  if (!hospital) {
    return { title: "病院ページ", robots: { index: false, follow: true } };
  }

  const place = [hospital.prefecture, hospital.city].filter(Boolean).join("");
  const title = `${hospital.name}の基本情報と職場環境の口コミ`;
  const description = `${place ? `${place}の` : ""}${hospital.name}の基本情報、疾患比率、採用情報、理学療法士による職場環境の口コミ（6項目の評価）を確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: `/hospitals/${id}` },
    openGraph: {
      title: `${title}｜${SITE_NAME}`,
      description,
      url: `/hospitals/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜${SITE_NAME}`,
      description,
    },
  };
}

// 検索エンジンに、病院の基本情報（公開されている施設情報）を、構造化データとして伝える
export default async function HospitalLayout({ params, children }: Props) {
  const { id } = await params;
  const hospital = await getHospital(id);

  if (!hospital) return children;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: hospital.name,
    url: `${SITE_URL}/hospitals/${id}`,
    ...(hospital.website ? { sameAs: [hospital.website] } : {}),
    ...(hospital.phone ? { telephone: hospital.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      ...(hospital.prefecture ? { addressRegion: hospital.prefecture } : {}),
      ...(hospital.city ? { addressLocality: hospital.city } : {}),
      ...(hospital.address ? { streetAddress: hospital.address } : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" をエスケープして、文字列から <script> を抜け出せないようにする
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}
