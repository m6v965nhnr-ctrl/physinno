"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import MyPageMenu from "@/components/MyPageMenu";
import OrgPostCard from "@/components/OrgPostCard";
import ReviewRadarChart from "@/components/ReviewRadarChart";
import { Job, JOB_STATUS_LABEL, ORG_STATUS_LABEL, Org } from "@/lib/recruit";
import { OrgPost } from "@/lib/orgPosts";
import { REVIEW_AXES, REVIEW_AXIS_LABEL, listHospitalReviews } from "@/lib/hospitals";

// 採用（病院・施設・法人）アカウントのマイページ。
// 組織の状態・求人の状況・職場ページの評価（レーダーチャート）・投稿したポストをまとめて見る
export default function OrgMyPage({ org, onLogout }: { org: Org | null; onLogout: () => void }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [posts, setPosts] = useState<OrgPost[]>([]);
  const [hospital, setHospital] = useState<{ id: string; name: string } | null>(null);
  const [axes, setAxes] = useState<{ label: string; value: number }[] | null>(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (!org) return;
    (async () => {
      const { data: js } = await supabase
        .from("job_postings")
        .select("*")
        .eq("organization_id", org.id)
        .order("updated_at", { ascending: false });
      setJobs((js ?? []) as Job[]);

      const { data: ps } = await supabase
        .from("org_posts")
        .select("id, kind, body, media, job_id, created_at, organization_id")
        .eq("organization_id", org.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setPosts(
        ((ps ?? []) as { organization_id: string }[]).map((p) => ({
          ...p,
          org_id: org.id,
          org_name: org.name,
          org_category: org.facility_category,
          org_logo: org.logo_url,
          hospital_id: org.hospital_id ?? null,
        })) as unknown as OrgPost[]
      );

      if (org.hospital_id) {
        const { data: h } = await supabase.from("hospitals").select("id, name").eq("id", org.hospital_id).maybeSingle();
        setHospital(h ?? null);
        const reviews = await listHospitalReviews(org.hospital_id);
        setReviewCount(reviews.length);
        if (reviews.length > 0) {
          setAxes(
            REVIEW_AXES.map((axis) => ({
              label: REVIEW_AXIS_LABEL[axis],
              value: reviews.reduce((sum, r) => sum + r[axis], 0) / reviews.length,
            }))
          );
        }
      }
    })();
  }, [org]);

  const openJobs = jobs.filter((j) => j.status === "open").length;

  return (
    <main className="relative min-h-screen bg-[#fafafa] px-5 py-6 pb-28">
      <MyPageMenu onLogout={onLogout} />
      <div className="mx-auto max-w-2xl space-y-3">

        {/* 組織 */}
        <section className="rounded-3xl border border-gray-100 bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          {org?.logo_url ? (
            <img src={org.logo_url} alt="" className="mx-auto h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">🏢</div>
          )}
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">{org?.name ?? "組織が未登録です"}</h1>
          {org ? (
            <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              {org.facility_category}・{ORG_STATUS_LABEL[org.status]}
            </span>
          ) : (
            <p className="mt-2 text-sm text-gray-500">組織の情報を入れると、運営の確認のあと、求人の掲載やスカウトができます。</p>
          )}
          <Link href="/org" className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white">
            {org ? "組織・求人の管理" : "組織を登録する"}
          </Link>
        </section>

        {org && (
          <>
            {/* 採用状況 */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <h2 className="text-lg font-semibold text-gray-900">採用状況</h2>
              <p className="mt-1 text-sm text-gray-500">公開中の求人：{openJobs}件</p>
              {jobs.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-400">求人はまだありません</p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {jobs.slice(0, 5).map((j) => (
                    <li key={j.id} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                      <span className="truncate text-sm text-gray-900">{j.title}</span>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${j.status === "open" ? "bg-emerald-50 text-emerald-800" : "bg-gray-200 text-gray-600"}`}>
                        {JOB_STATUS_LABEL[j.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* 職場ページの評価（口コミのレーダーチャート） */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <h2 className="text-lg font-semibold text-gray-900">職場ページの評価</h2>
              {!org.hospital_id ? (
                <p className="py-6 text-center text-sm text-gray-400">
                  職場ページ（病院・施設）とひもづけると、口コミの評価がここに出ます。
                  <Link href="/org" className="ml-1 underline">組織の管理でひもづける</Link>
                </p>
              ) : (
                <>
                  {hospital && (
                    <Link href={`/hospitals/${hospital.id}`} className="mt-1 inline-block text-sm text-gray-600 underline underline-offset-4">
                      {hospital.name} の職場ページを見る
                    </Link>
                  )}
                  {axes ? (
                    <>
                      <ReviewRadarChart items={axes} />
                      <p className="text-center text-xs text-gray-500">{reviewCount}件の口コミの平均（10点満点）</p>
                    </>
                  ) : (
                    <p className="py-6 text-center text-sm text-gray-400">まだ口コミはありません</p>
                  )}
                </>
              )}
            </section>

            {/* 投稿したポスト */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">投稿したポスト</h2>
                <Link href="/org/posts/new" className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-medium">＋ 投稿する</Link>
              </div>
              {posts.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-400">まだ投稿はありません</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {posts.map((p) => (
                    <OrgPostCard key={p.id} post={p} showOrg={false} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
