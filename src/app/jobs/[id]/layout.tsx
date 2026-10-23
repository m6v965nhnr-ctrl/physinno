import { cache } from "react";
import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ldJson } from "@/lib/jsonLd";
import type { Job, Org } from "@/lib/recruit";
import { ORG_COLUMNS } from "@/lib/recruit";

type Props = { params: Promise<{ id: string }>; children: React.ReactNode };

// メタ情報と構造化データで同じ求人を使うので、1回のリクエストでは、1度だけ取得する
const getJob = cache(async (id: string) => {
  const { data } = await supabasePublic.from("job_postings").select("*").eq("id", id).maybeSingle();
  if (!data) return null;
  const job = data as Job;
  const { data: o } = await supabasePublic.from("organizations").select(ORG_COLUMNS).eq("id", job.organization_id).maybeSingle();
  return { job, org: (o as Org | null) ?? null };
});

const EMPLOYMENT: Record<string, string> = { 常勤: "FULL_TIME", 非常勤: "PART_TIME", パート: "PART_TIME", 業務委託: "CONTRACTOR", その他: "OTHER" };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { id } = await params;
  const r = await getJob(id);
  if (!r) return { title: "求人", robots: { index: false, follow: true } };
  const place = [r.job.prefecture, r.job.city].filter(Boolean).join("");
  const title = `${r.org?.name ?? ""}の理学療法士求人｜${r.job.title}`;
  const description = `${place ? `${place}・` : ""}${r.org?.name ?? ""}の「${r.job.title}」${r.job.employment_type ? `（${r.job.employment_type}）` : ""}。${(r.job.description ?? "仕事内容・給与・休日などの募集要項を掲載しています。").replace(/\s+/g, " ").slice(0, 90)}`;
  return {
    title,
    description,
    alternates: { canonical: `/jobs/${id}` },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/jobs/${id}`, type: "article" },
    twitter: { card: "summary_large_image", title: `${title}｜${SITE_NAME}`, description },
  };
}

// 検索エンジンに、求人の情報を、構造化データ（JobPosting）として伝える。載せるのは、掲載されている項目だけ
export default async function JobLayout({ params, children }: Props) {
  const { id } = await params;
  const r = await getJob(id);
  if (!r || !r.org) return children;
  const { job, org } = r;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.description, job.requirements && `応募条件：${job.requirements}`, job.benefits && `福利厚生：${job.benefits}`].filter(Boolean).join("\n\n") || job.title,
    datePosted: (job.published_at ?? job.updated_at).slice(0, 10),
    ...(job.employment_type && EMPLOYMENT[job.employment_type] ? { employmentType: EMPLOYMENT[job.employment_type] } : {}),
    hiringOrganization: { "@type": "Organization", name: org.name, ...(org.website ? { sameAs: org.website } : {}) },
    ...(job.prefecture ? { jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "JP", addressRegion: job.prefecture, ...(job.city ? { addressLocality: job.city } : {}) } } } : {}),
    directApply: false,
    url: `${SITE_URL}/jobs/${id}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      {children}
    </>
  );
}
