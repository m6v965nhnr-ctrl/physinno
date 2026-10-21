import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnatomyPage from "@/components/columns/AnatomyPage";
import { MUSCLES } from "@/content/muscles/data";
import { BONES } from "@/content/muscles/bones";
import { MUSCLE_COLUMNS } from "@/content/muscles/columnsMuscles";
import { CHECKED_ON, SOURCES_MUSCLE } from "@/content/muscles/checked";
import { findAnatomy } from "@/lib/muscleMatch";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return MUSCLES.filter((m) => MUSCLE_COLUMNS[m.name]).map((m) => ({ name: m.name }));
}

type Props = { params: Promise<{ name: string }> };

const find = (name: string) => MUSCLES.find((m) => m.name === decodeURIComponent(name));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = find((await params).name);
  const c = m && MUSCLE_COLUMNS[m.name];
  if (!m || !c) return {};
  const title = `${m.name}（${c.en}）の起始・停止・支配神経・作用`;
  const url = `/columns/muscles/${encodeURIComponent(m.name)}`;
  return {
    title,
    description: c.lead,
    alternates: { canonical: url },
    openGraph: { title: `${title}｜${SITE_NAME}`, description: c.lead, url, images: ["/opengraph-image"] },
  };
}

export default async function MusclePage({ params }: Props) {
  const m = find((await params).name);
  const c = m && MUSCLE_COLUMNS[m.name];
  if (!m || !c) notFound();

  const hit = findAnatomy(`${m.origin}\n${m.insertion}`);
  const sameRegion = MUSCLES.filter((x) => x.region === m.region && x.id !== m.id && MUSCLE_COLUMNS[x.name]);
  const i = sameRegion.findIndex((x) => x.id > m.id);
  const around = sameRegion.slice(Math.max(0, (i < 0 ? sameRegion.length : i) - 2), (i < 0 ? sameRegion.length : i) + 2);
  const related = [
    ...hit.bones.map((b) => ({ href: `/columns/bones/${encodeURIComponent(b.name)}`, label: `${b.name}（骨）` })),
    ...around.map((x) => ({ href: `/columns/muscles/${encodeURIComponent(x.name)}`, label: x.name })),
    { href: "/columns/muscles", label: "筋の一覧" },
  ];
  void BONES;

  return (
    <AnatomyPage
      kind="muscles"
      id={m.id}
      name={m.name}
      en={c.en}
      region={m.region}
      lead={c.lead}
      rows={[
        ["起始", m.origin],
        ["停止", m.insertion],
        ["支配神経", m.nerve],
        ["作用", m.action],
      ]}
      points={c.points}
      clinical={c.clinical}
      exam={c.exam}
      relatedLabel="関連する骨・近くの筋"
      related={related}
      checkedOn={CHECKED_ON}
      sources={SOURCES_MUSCLE}
    />
  );
}
