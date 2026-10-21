import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnatomyPage from "@/components/columns/AnatomyPage";
import { BONES } from "@/content/muscles/bones";
import { BONE_COLUMNS } from "@/content/muscles/columnsBones";
import { CHECKED_ON, SOURCES_BONE } from "@/content/muscles/checked";
import { findAnatomy } from "@/lib/muscleMatch";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return BONES.filter((b) => BONE_COLUMNS[b.name]).map((b) => ({ name: b.name }));
}

type Props = { params: Promise<{ name: string }> };

const find = (name: string) => BONES.find((b) => b.name === decodeURIComponent(name));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = find((await params).name);
  const c = b && BONE_COLUMNS[b.name];
  if (!b || !c) return {};
  const title = `${b.name}（${c.en}）の特徴・関節・付着する筋`;
  const url = `/columns/bones/${encodeURIComponent(b.name)}`;
  return {
    title,
    description: c.lead,
    alternates: { canonical: url },
    openGraph: { title: `${title}｜${SITE_NAME}`, description: c.lead, url, images: ["/opengraph-image"] },
  };
}

export default async function BonePage({ params }: Props) {
  const b = find((await params).name);
  const c = b && BONE_COLUMNS[b.name];
  if (!b || !c) notFound();

  const hit = findAnatomy(`${b.joints}\n${b.muscles}`);
  const near = BONES.filter((x) => x.region === b.region && x.id !== b.id && BONE_COLUMNS[x.name]);
  const j = near.findIndex((x) => x.id > b.id);
  const around = near.slice(Math.max(0, (j < 0 ? near.length : j) - 2), (j < 0 ? near.length : j) + 2);
  const related = [
    ...hit.muscles.slice(0, 8).map((m) => ({ href: `/columns/muscles/${encodeURIComponent(m.name)}`, label: `${m.name}（筋）` })),
    ...hit.bones.filter((x) => x.id !== b.id).slice(0, 4).map((x) => ({ href: `/columns/bones/${encodeURIComponent(x.name)}`, label: x.name })),
    ...around.map((x) => ({ href: `/columns/bones/${encodeURIComponent(x.name)}`, label: x.name })),
    { href: "/columns/bones", label: "骨の一覧" },
  ];
  const seen = new Set<string>();
  const uniq = related.filter((r) => (seen.has(r.href) ? false : (seen.add(r.href), true)));

  return (
    <AnatomyPage
      kind="bones"
      id={b.id}
      name={b.name}
      en={c.en}
      region={b.region}
      lead={c.lead}
      rows={[
        ["特徴", b.features],
        ["連結・関節", b.joints],
        ["付着する主な筋", b.muscles],
        ["ポイント", b.notes],
      ]}
      points={c.points}
      clinical={c.clinical}
      exam={c.exam}
      relatedLabel="付着する筋・近くの骨"
      related={uniq}
      checkedOn={CHECKED_ON}
      sources={SOURCES_BONE}
    />
  );
}
