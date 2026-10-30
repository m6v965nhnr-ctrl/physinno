"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Job, Org, ORG_COLUMNS, fmtDate } from "@/lib/recruit";
import ReportButton from "@/components/ReportButton";
import { ErrorState, LoadingScreen } from "@/components/states";
import { OrgIcon } from "@/components/OrgIcon";

const row = (label: string, v: string | null) => (
  <div className="border-b border-gray-100 py-3 last:border-0">
    <p className="text-xs font-medium text-gray-400">{label}</p>
    <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{v?.trim() ? v : "未掲載"}</p>
  </div>
);

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [org, setOrg] = useState<Org | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("job_postings").select("*").eq("id", id).maybeSingle();
      setJob((data as Job | null) ?? null);
      if (data) {
        const { data: o } = await supabase.from("organizations").select(ORG_COLUMNS).eq("id", (data as Job).organization_id).maybeSingle();
        setOrg((o as Org | null) ?? null);
      }
    })();
  }, [id]);

  if (job === undefined) return <LoadingScreen />;
  if (!job) return <ErrorState message="この求人は、見つからないか、募集が終わっています" />;

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-4">
        <Link href="/jobs" className="text-sm text-gray-400">← 求人一覧</Link>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <OrgIcon org={org} size={24} />
            <p className="text-xs text-gray-500">{org?.name}・{org?.facility_type ?? org?.facility_category}</p>
          </div>
          <h1 className="mt-2 text-xl font-semibold">{job.title}</h1>
          <p className="mt-1 text-[11px] text-gray-400">掲載日 {fmtDate(job.published_at)}　更新日 {fmtDate(job.updated_at)}</p>
          <div className="mt-3">
            {row("所在地", [job.prefecture, job.city].filter(Boolean).join(" "))}
            {row("雇用形態", job.employment_type)}
            {row("給与・年収", job.salary_text)}
            {row("勤務時間", job.work_hours)}
            {row("休日", job.holidays)}
            {row("仕事内容", job.description)}
            {row("応募条件", job.requirements)}
            {row("福利厚生", job.benefits)}
          </div>
        </div>
        {org && (
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold">掲載している組織</h2>
            <div className="mt-2 flex items-center gap-3">
              <OrgIcon org={org} size={48} />
              <div className="min-w-0">
                <p className="text-sm font-medium">{org.name}</p>
                <p className="text-xs text-gray-500">{org.facility_category}{org.facility_type ? `・${org.facility_type}` : ""}　{[org.prefecture, org.city].filter(Boolean).join(" ")}</p>
              </div>
            </div>
            {org.description && <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{org.description}</p>}
            {org.website ? (
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">公式サイトで、応募・問い合わせ</a>
            ) : (
              <p className="mt-3 text-xs text-gray-500">公式サイトは未掲載です。応募・問い合わせの方法は、組織にご確認ください。</p>
            )}
            <p className="mt-3 text-[11px] leading-5 text-gray-500">Re:lightは、求人の内容を保証しません。応募の前に、条件を、直接ご確認ください。</p>
          </section>
        )}
        <div className="text-right"><ReportButton targetType="job_posting" targetId={job.id} /></div>
      </div>
    </main>
  );
}
