"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Job, Org, ORG_COLUMNS, EMPLOYMENT_TYPES, fmtDate } from "@/lib/recruit";
import { FACILITY_CATEGORIES } from "@/lib/facilityTypes";
import { PREFECTURES } from "@/lib/prefectures";
import { INPUT_CLASS } from "@/lib/ui";
import { EmptyState, ErrorState, LoadingScreen } from "@/components/states";
import { OrgIcon } from "@/components/OrgIcon";

type Row = Job & { org: Org | null };

// 理学療法士の求人一覧（運営が承認した組織の、公開中の求人だけ）
export default function JobsPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);
  const [pref, setPref] = useState("");
  const [emp, setEmp] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    (async () => {
      let q = supabase.from("job_postings").select("*").eq("status", "open").order("published_at", { ascending: false }).limit(60);
      if (pref) q = q.eq("prefecture", pref);
      if (emp) q = q.eq("employment_type", emp);
      const { data, error: e } = await q;
      if (e) return setError(true);
      const jobs = (data ?? []) as Job[];
      const ids = [...new Set(jobs.map((j) => j.organization_id))];
      const { data: orgs } = ids.length ? await supabase.from("organizations").select(ORG_COLUMNS).in("id", ids) : { data: [] };
      const map = new Map(((orgs ?? []) as Org[]).map((o) => [o.id, o]));
      setRows(jobs.map((j) => ({ ...j, org: map.get(j.organization_id) ?? null })).filter((r) => !cat || r.org?.facility_category === cat));
    })();
  }, [pref, emp, cat]);

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-4">
        <button type="button" onClick={() => window.history.back()} className="text-sm text-gray-400">← 戻る</button>
        <h1 className="text-2xl font-semibold">求人を探す</h1>
        <p className="text-xs leading-5 text-gray-500">運営が確認した組織の、公開中の求人です。書かれていない項目は「未掲載」と表示します。給与や条件は、応募前に、掲載元に確認してください。</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <select aria-label="都道府県" value={pref} onChange={(e) => setPref(e.target.value)} className={INPUT_CLASS}><option value="">都道府県：すべて</option>{PREFECTURES.map((p) => <option key={p}>{p}</option>)}</select>
          <select aria-label="雇用形態" value={emp} onChange={(e) => setEmp(e.target.value)} className={INPUT_CLASS}><option value="">雇用形態：すべて</option>{EMPLOYMENT_TYPES.map((p) => <option key={p}>{p}</option>)}</select>
          <select aria-label="施設の種類" value={cat} onChange={(e) => setCat(e.target.value)} className={INPUT_CLASS}><option value="">施設の種類：すべて</option>{FACILITY_CATEGORIES.map((c) => <option key={c.category}>{c.category}</option>)}</select>
        </div>
        {error ? <ErrorState message="求人を読み込めませんでした。時間をおいて、もう一度お試しください" onRetry={() => location.reload()} /> : rows === null ? <LoadingScreen /> : rows.length === 0 ? (
          <EmptyState title="いま公開されている求人はありません" description="条件を変えると、見つかることがあります" />
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={r.id} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <OrgIcon org={r.org} fallbackHref={`/jobs/${r.id}`} />
                <Link href={`/jobs/${r.id}`} className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">{r.org?.name ?? "組織"}・{r.org?.facility_type ?? r.org?.facility_category}</p>
                  <p className="mt-1 text-base font-semibold">{r.title}</p>
                  <p className="mt-1 text-xs text-gray-600">{[r.prefecture, r.city].filter(Boolean).join(" ") || "所在地：未掲載"}　{r.employment_type ?? "雇用形態：未掲載"}　{r.salary_text ?? "給与：未掲載"}</p>
                  <p className="mt-1 text-[11px] text-gray-400">掲載日 {fmtDate(r.published_at)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="text-center text-xs text-gray-500">
          採用の担当の方は <Link href="/org" className="underline">組織の登録・求人の管理</Link> へ（アカウントがない方は <Link href="/register?type=org" className="underline">採用担当として登録</Link>）
        </p>
      </div>
    </main>
  );
}
