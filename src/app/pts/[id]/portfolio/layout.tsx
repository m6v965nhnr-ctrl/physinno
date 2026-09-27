import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME } from "@/lib/site";
import { ptName } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data: pt } = await supabasePublic
    .from("pt_profiles")
    .select("full_name, qualification, specialty")
    .eq("id", id)
    .maybeSingle();

  if (!pt) {
    return { title: "ポートフォリオ", robots: { index: false, follow: true } };
  }

  const name = ptName(pt.full_name);
  const title = `${name}のポートフォリオ`;
  const description = `${name}（${pt.specialty || pt.qualification || "理学療法士"}）の学歴・職歴・資格・研修受講歴などをまとめたポートフォリオです。`;

  return {
    title,
    description,
    alternates: { canonical: `/pts/${id}/portfolio` },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/pts/${id}/portfolio` },
  };
}

export default function PtPortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
