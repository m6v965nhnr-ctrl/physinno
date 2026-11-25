import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OrganPage from "@/components/columns/OrganPage";
import { ORGANS } from "@/content/organs/generated";
import { DISEASES } from "@/content/diseases/generated";
import { TESTS } from "@/content/tests/generated";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ORGANS.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => ORGANS.find((d) => d.slug === decodeURIComponent(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = find((await params).slug);
  if (!d) return {};
  const name = d.name.replace(/\(.*?\)|（.*?）/g, "");
  const title = `${name}の場所・構造・働き（図つき）と国試で問われる点`;
  const description = `${name}の場所・構造・働きと、理学療法士国家試験で問われる点を、図つきで、出典を確認してまとめました。`;
  const url = `/columns/organs/${d.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url, images: ["/opengraph-image"] },
  };
}

export default async function OrganRoute({ params }: Props) {
  const d = find((await params).slug);
  if (!d) notFound();
  const pick = <T extends { slug: string; name: string }>(all: T[], slugs: string[]) =>
    slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is T => !!x).map((x) => ({ slug: x.slug, name: x.name }));
  return (
    <OrganPage
      d={d}
      links={{ diseases: pick(DISEASES, d.diseases), tests: pick(TESTS, d.tests), organs: pick(ORGANS, d.related) }}
    />
  );
}
