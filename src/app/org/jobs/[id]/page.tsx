"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { EMPLOYMENT_TYPES, Job, Org, myOrganization } from "@/lib/recruit";
import { PREFECTURES } from "@/lib/prefectures";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from "@/lib/ui";
import { LoadingScreen } from "@/components/states";

const AREA = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900";
type F = Record<"title" | "employment_type" | "prefecture" | "city" | "salary_text" | "work_hours" | "holidays" | "description" | "requirements" | "benefits", string>;
const EMPTY: F = { title: "", employment_type: "", prefecture: "", city: "", salary_text: "", work_hours: "", holidays: "", description: "", requirements: "", benefits: "" };

// 求人の作成・編集（id が new のとき新規）。下書き保存と、公開は、分けている
export default function JobFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { loading } = useMyAccount(["pt", "general", "teacher", "org"], "/pts");
  const [org, setOrg] = useState<Org | null | undefined>(undefined);
  const [f, setF] = useState<F>(EMPTY);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading) return;
    (async () => {
      const o = await myOrganization();
      setOrg(o);
      if (o && id !== "new") {
        const { data } = await supabase.from("job_postings").select("*").eq("id", id).eq("organization_id", o.id).maybeSingle();
        if (data) { const j = data as Job; setF({ title: j.title, employment_type: j.employment_type ?? "", prefecture: j.prefecture ?? "", city: j.city ?? "", salary_text: j.salary_text ?? "", work_hours: j.work_hours ?? "", holidays: j.holidays ?? "", description: j.description ?? "", requirements: j.requirements ?? "", benefits: j.benefits ?? "" }); }
      }
    })();
  }, [loading, id]);

  if (loading || org === undefined) return <LoadingScreen />;
  if (!org) return <main className="p-8 text-sm">先に、<Link href="/org" className="underline">組織を登録</Link>してください。</main>;

  async function save(status: "draft" | "open") {
    if (busy) return;
    if (!f.title.trim()) return notify("求人のタイトルを入力してください");
    if (status === "open" && org!.status !== "approved") return notify("組織が運営に承認されるまで、公開できません。下書きで保存しました");
    setBusy(true);
    const body = Object.fromEntries(Object.entries(f).map(([k, v]) => [k, v.trim() || null]));
    const { error } = id === "new"
      ? await supabase.from("job_postings").insert({ ...body, organization_id: org!.id, status: org!.status === "approved" ? status : "draft" })
      : await supabase.from("job_postings").update({ ...body, ...(org!.status === "approved" ? { status } : {}) }).eq("id", id);
    setBusy(false);
    if (error) return notify("保存できませんでした。入力内容を確かめてください");
    notify(status === "open" && org!.status === "approved" ? "公開しました" : "下書きとして保存しました");
    router.push("/org");
  }

  const t = (k: keyof F, label: string, ph: string, max: number, rows = 0) => (
    <label className="block text-xs font-medium text-gray-600">{label}
      {rows ? <textarea rows={rows} maxLength={max} placeholder={ph} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={`mt-1 ${AREA}`} />
        : <input maxLength={max} placeholder={ph} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={`mt-1 ${INPUT_CLASS}`} />}
    </label>
  );

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-3">
        <Link href="/org" className="text-sm text-gray-400">← 管理へ</Link>
        <h1 className="text-xl font-semibold">{id === "new" ? "求人をつくる" : "求人を編集"}</h1>
        {t("title", "タイトル（必須）", "例：回復期リハビリ病棟の理学療法士", 100)}
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs font-medium text-gray-600">雇用形態<select value={f.employment_type} onChange={(e) => setF({ ...f, employment_type: e.target.value })} className={`mt-1 ${INPUT_CLASS}`}><option value="">未設定</option>{EMPLOYMENT_TYPES.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="block text-xs font-medium text-gray-600">都道府県<select value={f.prefecture} onChange={(e) => setF({ ...f, prefecture: e.target.value })} className={`mt-1 ${INPUT_CLASS}`}><option value="">未設定</option>{PREFECTURES.map((x) => <option key={x}>{x}</option>)}</select></label>
        </div>
        {t("city", "市区町村", "例：文京区", 50)}
        {t("salary_text", "給与・年収（書かないと「未掲載」と表示されます）", "例：月給25万円〜30万円（経験による）", 200)}
        {t("work_hours", "勤務時間", "例：8:30〜17:30（実働8時間）", 300)}
        {t("holidays", "休日", "例：週休2日・年間休日120日", 300)}
        {t("description", "仕事内容", "担当する業務、職場の雰囲気など", 4000, 6)}
        {t("requirements", "応募条件", "資格・経験など", 2000, 3)}
        {t("benefits", "福利厚生", "研修・資格取得の支援など", 2000, 3)}
        <p className="text-[11px] leading-5 text-gray-500">実際と違う内容や、応募者の個人情報は書かないでください。公開すると、承認された組織の求人として、一覧に出ます。</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => save("draft")} disabled={busy} className="flex-1 rounded-full border border-gray-300 bg-white py-2.5 text-sm font-semibold disabled:opacity-50">下書き保存</button>
          <button type="button" onClick={() => save("open")} disabled={busy} className={`flex-1 ${PRIMARY_BUTTON_CLASS}`}>{busy ? "保存中…" : "公開する"}</button>
        </div>
      </div>
    </main>
  );
}
