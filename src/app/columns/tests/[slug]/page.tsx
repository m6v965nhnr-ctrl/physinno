import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TestPage from "@/components/columns/TestPage";
import { TESTS } from "@/content/tests/generated";
import { DISEASES } from "@/content/diseases/generated";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return TESTS.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => TESTS.find((d) => d.slug === decodeURIComponent(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = find((await params).slug);
  if (!d) return {};
  const name = d.name.replace(/\(.*?\)/g, "");
  const title = `${name}の基準値と国試で問われる点`;
  const description = `${name}の基準値・区分と、理学療法士国家試験での問われ方を、公式資料で確認してまとめました。`;
  const url = `/columns/tests/${d.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url, images: ["/opengraph-image"] },
  };
}

export default async function TestRoute({ params }: Props) {
  const d = find((await params).slug);
  if (!d) notFound();
  const diseases = DISEASES.filter((x) => (x.tests ?? []).includes(d.slug)).map((x) => ({ slug: x.slug, name: x.name }));
  return <TestPage d={d} diseases={diseases} />;
}
