import { PREFECTURES } from "@/lib/prefectures";
import { CERT_FIELDS } from "@/content/certifiedFields";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";
import { COLUMNS } from "@/lib/columns";
import { MUSCLES } from "@/content/muscles/data";
import { BONES } from "@/content/muscles/bones";
import { MUSCLE_COLUMNS } from "@/content/muscles/columnsMuscles";
import { BONE_COLUMNS } from "@/content/muscles/columnsBones";
import { PT_UNIVERSITIES } from "@/content/schools/pt-universities";
import { PAPER_TOPICS } from "@/content/paperTopics";
import { QUESTIONS_PER_SESSION, SESSIONS, getPublicExams, questionPath } from "@/lib/kokushi";

// 1時間ごとに再生成する（新しく登録されたPTのプロフィールもそのうち反映される）
export const revalidate = 3600;

const MAX_PROFILES = 5000;
const MAX_HOSPITALS = 20000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pts`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/columns`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/kokushi`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/evidence-levels`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/for-pt`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/for-students`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/for-general`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/teachers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/paper-search`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/paper-search/topics`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...PAPER_TOPICS.map((t) => ({ url: `${SITE_URL}/paper-search/topics/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/certified-pt`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...CERT_FIELDS.map((f) => ({ url: `${SITE_URL}/certified-pt/${f.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/job-hunting`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/hospital-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...PREFECTURES.map((p) => ({ url: `${SITE_URL}/hospital-areas/${encodeURIComponent(p)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${SITE_URL}/feedback`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const columnEntries: MetadataRoute.Sitemap = COLUMNS.map((c) => ({
    url: `${SITE_URL}/columns/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const anatomyEntries: MetadataRoute.Sitemap = [
    ...MUSCLES.filter((m) => MUSCLE_COLUMNS[m.name]).map((m) => ({ url: `${SITE_URL}/columns/muscles/${encodeURIComponent(m.name)}`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.5 })),
    ...BONES.filter((b) => BONE_COLUMNS[b.name]).map((b) => ({ url: `${SITE_URL}/columns/bones/${encodeURIComponent(b.name)}`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];

  const { data: pts } = await supabasePublic
    .from("pt_profiles")
    .select("id, updated_at")
    .order("updated_at", { ascending: false })
    .limit(MAX_PROFILES);

  const ptEntries: MetadataRoute.Sitemap = (pts || []).map((pt) => ({
    url: `${SITE_URL}/pts/${pt.id}`,
    lastModified: pt.updated_at ? new Date(pt.updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 病院ページ（厚労省オープンデータ由来を含む約5,000件）も検索から見つけてもらえるようにする
  // APIの1回あたりの取得上限(1,000件)を超えるため、ページを分けて取得する
  const hospitals: { id: string; created_at: string | null }[] = [];
  for (let from = 0; from < MAX_HOSPITALS; from += 1000) {
    const { data } = await supabasePublic
      .from("hospitals")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .order("id")
      .range(from, from + 999);
    if (!data || data.length === 0) break;
    hospitals.push(...data);
    if (data.length < 1000) break;
  }

  const hospitalEntries: MetadataRoute.Sitemap = hospitals.map((h) => ({
    url: `${SITE_URL}/hospitals/${h.id}`,
    lastModified: h.created_at ? new Date(h.created_at) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // 国家試験の過去問（回ごとの一覧と、1問ずつのページ）
  const exams = await getPublicExams();
  const kokushiEntries: MetadataRoute.Sitemap = exams.flatMap((e) => [
    { url: `${SITE_URL}/kokushi/${e.exam_no}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 },
    ...SESSIONS.flatMap((session) =>
      Array.from({ length: QUESTIONS_PER_SESSION }, (_, i) => ({
        url: `${SITE_URL}${questionPath(e.exam_no, session, i + 1)}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }))
    ),
  ]);

  // 理学療法士養成校（大学）の、国家試験の合格状況
  const schoolEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/schools`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 },
    ...PT_UNIVERSITIES.map((u) => ({
      url: `${SITE_URL}/schools/${encodeURIComponent(u.slug)}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticEntries, ...columnEntries, ...anatomyEntries, ...kokushiEntries, ...schoolEntries, ...ptEntries, ...hospitalEntries];
}
