import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiseasePage from "@/components/columns/DiseasePage";
import { DISEASES } from "@/content/diseases/generated";
import { GUIDES } from "@/content/guides/generated";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return DISEASES.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => DISEASES.find((d) => d.slug === decodeURIComponent(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = find((await params).slug);
  if (!d) return {};
  const title = `${d.name.replace(/\(.*?\)/g, "")}とは｜症状・治療・理学療法と国試で問われる点`;
  const url = `/columns/diseases/${d.slug}`;
  return {
    title,
    description: d.summary.t,
    alternates: { canonical: url },
    openGraph: { title: `${title}｜${SITE_NAME}`, description: d.summary.t, url, images: ["/opengraph-image"] },
  };
}

export default async function DiseaseRoute({ params }: Props) {
  const d = find((await params).slug);
  if (!d) notFound();
  const related = d.related
    .map((n) => DISEASES.find((x) => x.slug !== d.slug && (x.name === n || x.name.replace(/\(.*?\)/g, "") === n)))
    .filter((x): x is NonNullable<typeof x> => !!x)
    .map((x) => ({ slug: x.slug, name: x.name }));
  const guide = d.guide ? GUIDES.find((g) => g.slug === d.guide) : undefined;
  return <DiseasePage d={d} related={related} guideTitle={guide ? `${guide.title.split("：")[0]}（リハ・評価）` : undefined} />;
}
