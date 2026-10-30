"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Job, Org, ORG_COLUMNS, fmtDate } from "@/lib/recruit";
import { EmptyState, ErrorState, LoadingScreen } from "@/components/states";
import { OrgIcon } from "@/components/OrgIcon";
import HospitalSearch from "@/components/HospitalSearch";

type JobRow = Job & { org: Org | null };

type WorkplaceTab = "reviews" | "hiring";
const TABS: [WorkplaceTab, string][] = [
  ["reviews", "口コミ"],
  ["hiring", "採用"],
];

// PTのボトムナビ「職場」。以前は検索タブの中にあった職場口コミを、ここへ移した
export default function WorkplacePage() {
  return (
    <Suspense
      fallback={<main className="mx-auto max-w-2xl px-5 py-10" />}
    >
      <WorkplacePageInner />
    </Suspense>
  );
}

function WorkplacePageInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<WorkplaceTab>(
    () => (searchParams.get("tab") as WorkplaceTab) || "reviews"
  );
  const [jobs, setJobs] = useState<JobRow[] | null>(null);
  const [jobsError, setJobsError] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("job_postings").select("*").eq("status", "open").order("published_at", { ascending: false }).limit(60);
      if (error) return setJobsError(true);
      const rows = (data ?? []) as Job[];
      const ids = [...new Set(rows.map((j) => j.organization_id))];
      const { data: orgs } = ids.length ? await supabase.from("organizations").select(ORG_COLUMNS).in("id", ids) : { data: [] };
      const map = new Map(((orgs ?? []) as Org[]).map((o) => [o.id, o]));
      setJobs(rows.map((j) => ({ ...j, org: map.get(j.organization_id) ?? null })));
    })();
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-8 pb-24">
      <div className="max-w-3xl mx-auto">
        <div
          role="tablist"
          aria-label="職場の種類"
          className="mb-5 grid grid-cols-2 rounded-full border border-gray-200 p-1 text-sm font-medium"
        >
          {TABS.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => {
                setTab(key);
                const params = new URLSearchParams(searchParams.toString());
                params.set("tab", key);
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
              }}
              className={`rounded-full py-2 transition ${
                tab === key ? "bg-gray-900 text-white" : "text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "reviews" ? (
          <>
            <h1 className="text-3xl font-semibold mb-3">職場口コミ</h1>
            <HospitalSearch />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-3">採用</h1>
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <Link href="/jobs" className="rounded-full border border-gray-300 bg-white px-4 py-1.5 font-medium">求人を探す</Link>
              <Link href="/scouts" className="rounded-full border border-gray-300 bg-white px-4 py-1.5 font-medium">スカウト</Link>
            </div>
            {jobsError ? (
              <ErrorState message="求人を読み込めませんでした。時間をおいて、もう一度お試しください" onRetry={() => location.reload()} />
            ) : jobs === null ? (
              <LoadingScreen />
            ) : jobs.length === 0 ? (
              <EmptyState title="いま公開されている求人はありません" description="条件を変えると、見つかることがあります" />
            ) : (
              <ul className="space-y-3">
                {jobs.map((j) => (
                  <li key={j.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <OrgIcon org={j.org} fallbackHref={`/jobs/${j.id}`} />
                    <Link href={`/jobs/${j.id}`} className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">{j.org?.name ?? "組織"}・{j.org?.facility_type ?? j.org?.facility_category}</p>
                      <p className="mt-1 text-base font-semibold">{j.title}</p>
                      <p className="mt-1 text-xs text-gray-600">{[j.prefecture, j.city].filter(Boolean).join(" ") || "所在地：未掲載"}　{j.employment_type ?? "雇用形態：未掲載"}　{j.salary_text ?? "給与：未掲載"}</p>
                      <p className="mt-1 text-[11px] text-gray-400">掲載日 {fmtDate(j.published_at)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
