import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ id: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { id } = await params;

  const { data: hospital } = await supabasePublic
    .from("hospitals")
    .select("name, prefecture, city")
    .eq("id", id)
    .maybeSingle();

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

export default function HospitalLayout({ children }: Pick<Props, "children">) {
  return children;
}
