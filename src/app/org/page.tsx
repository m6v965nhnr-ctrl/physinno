"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { useMyAccount } from "@/lib/useMyAccount";
import { Job, JOB_STATUS_LABEL, ORG_STATUS_LABEL, Org, fmtDate, myOrganization } from "@/lib/recruit";
import { FACILITY_CATEGORIES, typesOf } from "@/lib/facilityTypes";
import { PREFECTURES } from "@/lib/prefectures";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from "@/lib/ui";
import { LoadingScreen } from "@/components/states";
import OrgPostCard from "@/components/OrgPostCard";
import { OrgPost, removeOrgMedia } from "@/lib/orgPosts";
import { searchHospitals } from "@/lib/hospitals";

const AREA = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900";

// 組織（病院・施設・企業など）の登録と、求人の管理。承認されるまで、求人の公開・スカウトはできない
export default function OrgPage() {
  const { loading, userId } = useMyAccount(["pt", "general", "teacher", "org"], "/pts");
  const [org, setOrg] = useState<Org | null | undefined>(undefined);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [posts, setPosts] = useState<OrgPost[]>([]);
  const [linked, setLinked] = useState<{ id: string; name: string } | null>(null);
  const [hq, setHq] = useState("");
  const [hresults, setHresults] = useState<{ id: string; name: string; prefecture: string | null; city: string | null }[]>([]);
  const [f, setF] = useState({ name: "", facility_category: "病院・医療機関", facility_type: "", prefecture: "", city: "", website: "", description: "" });
  const [busy, setBusy] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    const o = await myOrganization();
    setOrg(o);
    if (o) {
      setF({ name: o.name, facility_category: o.facility_category, facility_type: o.facility_type ?? "", prefecture: o.prefecture ?? "", city: o.city ?? "", website: o.website ?? "", description: o.description ?? "" });
      const { data } = await supabase.from("job_postings").select("*").eq("organization_id", o.id).order("updated_at", { ascending: false });
      setJobs((data ?? []) as Job[]);
      const { data: ps } = await supabase.from("org_posts").select("id, kind, body, media, job_id, created_at, organization_id").eq("organization_id", o.id).order("created_at", { ascending: false }).limit(20);
      setPosts(((ps ?? []) as { organization_id: string }[]).map((p) => ({ ...p, org_id: o.id, org_name: o.name, org_category: o.facility_category, org_logo: o.logo_url, hospital_id: o.hospital_id ?? null })) as unknown as OrgPost[]);
      if (o.hospital_id) {
        const { data: h } = await supabase.from("hospitals").select("id, name").eq("id", o.hospital_id).maybeSingle();
        setLinked(h ?? null);
      } else setLinked(null);
    }
  }, []);
  useEffect(() => {
    if (!loading) load();
  }, [loading, load]);

  if (loading || org === undefined) return <LoadingScreen />;

  async function save() {
    if (busy) return;
    if (!f.name.trim()) return notify("組織名を入力してください");
    if (f.website.trim() && !/^https?:\/\//i.test(f.website.trim())) return notify("公式サイトは、https:// から書いてください");
    setBusy(true);
    let logoUrl: string | undefined;
    if (logoFile && org) {
      if (!logoFile.type.startsWith("image/") || logoFile.size > 5 * 1024 * 1024) {
        setBusy(false);
        return notify("ロゴは5MBまでの画像にしてください");
      }
      const path = `${org.id}/logo-${Date.now()}.${logoFile.name.split(".").pop() || "png"}`;
      const up = await supabase.storage.from("org-media").upload(path, logoFile, { upsert: true, contentType: logoFile.type });
      if (up.error) {
        setBusy(false);
        return notify("ロゴをアップロードできませんでした（承認後に設定できます）");
      }
      logoUrl = supabase.storage.from("org-media").getPublicUrl(path).data.publicUrl;
    }
    const body = { name: f.name.trim(), facility_category: f.facility_category, facility_type: f.facility_type || null, prefecture: f.prefecture || null, city: f.city.trim() || null, website: f.website.trim() || null, description: f.description.trim() || null, ...(logoUrl ? { logo_url: logoUrl } : {}) };
    const { error } = org ? await supabase.from("organizations").update(body).eq("id", org.id) : await supabase.from("organizations").insert({ ...body, owner_id: userId });
    setBusy(false);
    if (error) return notify("保存できませんでした。入力内容を確かめてください");
    notify(org ? "保存しました" : "登録しました。運営が確認します");
    setEditing(false);
    load();
  }

  async function setStatus(j: Job, status: Job["status"]) {
    if (status === "closed" && !(await askConfirm("この求人の募集を終了します。よろしいですか？"))) return;
    const { error } = await supabase.from("job_postings").update({ status }).eq("id", j.id);
    if (error) return notify(status === "open" ? "公開できませんでした（組織が承認されている必要があります）" : "変更できませんでした");
    load();
  }

  async function remove(j: Job) {
    if (!(await askConfirm(`「${j.title}」を削除します。元に戻せません。よろしいですか？`))) return;
    const { error } = await supabase.from("job_postings").delete().eq("id", j.id);
    if (error) return notify("削除できませんでした");
    load();
  }

  async function searchH() {
    if (hq.trim().length < 2) return notify("2文字以上で、施設の名前を入れてください");
    const list = await searchHospitals({ keyword: hq.trim() });
    setHresults(list.slice(0, 8).map((h) => ({ id: h.id, name: h.name, prefecture: h.prefecture, city: h.city })));
    if (list.length === 0) notify("見つかりませんでした");
  }

  async function linkHospital(hospitalId: string | null) {
    if (!org) return;
    if (org.status === "approved" && !(await askConfirm("ひもづけを変更すると、運営の確認がもう一度必要になり、確認が済むまで投稿が公開されません。よろしいですか？"))) return;
    const { error } = await supabase.from("organizations").update({ hospital_id: hospitalId }).eq("id", org.id);
    if (error) return notify("変更できませんでした");
    setHresults([]); setHq("");
    notify("変更しました");
    load();
  }

  async function removePost(p: OrgPost) {
    if (!(await askConfirm("この投稿を削除します。元に戻せません。よろしいですか？"))) return;
    const { error } = await supabase.from("org_posts").delete().eq("id", p.id);
    if (error) return notify("削除できませんでした");
    await removeOrgMedia(p.media);
    load();
  }

  const form = (
    <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
      <input aria-label="組織名" placeholder="組織名（病院・施設・会社の名前）" value={f.name} maxLength={100} onChange={(e) => setF({ ...f, name: e.target.value })} className={INPUT_CLASS} />
      <select aria-label="施設の大分類" value={f.facility_category} onChange={(e) => setF({ ...f, facility_category: e.target.value, facility_type: "" })} className={INPUT_CLASS}>{FACILITY_CATEGORIES.map((c) => <option key={c.category}>{c.category}</option>)}</select>
      <select aria-label="施設の種類" value={f.facility_type} onChange={(e) => setF({ ...f, facility_type: e.target.value })} className={INPUT_CLASS}><option value="">種類：未選択</option>{typesOf(f.facility_category).map((t) => <option key={t}>{t}</option>)}</select>
      <div className="grid grid-cols-2 gap-2">
        <select aria-label="都道府県" value={f.prefecture} onChange={(e) => setF({ ...f, prefecture: e.target.value })} className={INPUT_CLASS}><option value="">都道府県</option>{PREFECTURES.map((p) => <option key={p}>{p}</option>)}</select>
        <input aria-label="市区町村" placeholder="市区町村" value={f.city} maxLength={50} onChange={(e) => setF({ ...f, city: e.target.value })} className={INPUT_CLASS} />
      </div>
      <input aria-label="公式サイト" type="url" placeholder="公式サイトのURL（https://…）" value={f.website} maxLength={300} onChange={(e) => setF({ ...f, website: e.target.value })} className={INPUT_CLASS} />
      {org && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="org-logo">ロゴ画像（任意・5MBまで。投稿やマイページに表示されます）</label>
          <div className="flex items-center gap-3">
            {org.logo_url && !logoFile && <img src={org.logo_url} alt="" className="h-10 w-10 rounded-full object-cover" />}
            <input id="org-logo" type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} className="block w-full text-sm" />
          </div>
        </div>
      )}
      <textarea aria-label="組織の紹介" rows={4} placeholder="組織の紹介（2,000文字まで）" value={f.description} maxLength={2000} onChange={(e) => setF({ ...f, description: e.target.value })} className={AREA} />
      <p className="text-[11px] leading-5 text-gray-500">登録したあと、運営が内容を確認します。承認されると、求人の公開と、スカウトが使えます。承認後に、組織名・公式サイトを変えると、もう一度、確認になります。</p>
      <button type="button" onClick={save} disabled={busy} className={PRIMARY_BUTTON_CLASS}>{busy ? "保存中…" : org ? "保存する" : "この内容で登録する"}</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-4">
        <Link href="/jobs" className="text-sm text-gray-400">← 求人一覧</Link>
        <h1 className="text-2xl font-semibold">{org ? "ホーム" : "組織・求人の管理"}</h1>
        {!org ? (
          <>
            <p className="text-xs leading-5 text-gray-500">病院・クリニック・介護施設・訪問看護・医療系企業など、理学療法士を採用する組織の方は、ここで登録します。理学療法士へのスカウトも、できます。</p>
            {form}
          </>
        ) : (
          <>
            <section className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">{org.name}</p>
              <p className="mt-1 text-xs text-gray-500">{org.facility_category}{org.facility_type ? `・${org.facility_type}` : ""}</p>
              <p className={`mt-2 rounded-xl px-3 py-2 text-xs ${org.status === "approved" ? "bg-teal-50 text-teal-900" : "bg-amber-50 text-amber-900"}`}>{ORG_STATUS_LABEL[org.status]}{org.review_note ? `（運営より：${org.review_note}）` : ""}</p>
              <button type="button" onClick={() => setEditing(!editing)} className="mt-2 text-xs text-gray-500 underline">{editing ? "閉じる" : "組織の情報を編集する"}</button>
            </section>
            {editing && form}
            <div className="space-y-2">
              <Link href="/org/posts/new" className="flex items-center justify-between gap-3 rounded-2xl bg-relight-gradient px-4 py-3 text-white">
                <div>
                  <p className="text-sm font-semibold">＋ 投稿する</p>
                  <p className="mt-0.5 text-xs text-white/90">職場の雰囲気や取り組みを、お知らせのように発信します</p>
                </div>
                <span className="text-lg">›</span>
              </Link>
              <Link href="/org/jobs/new" className="flex items-center justify-between gap-3 rounded-2xl bg-black px-4 py-3 text-white">
                <div>
                  <p className="text-sm font-semibold">＋ 求人をつくる</p>
                  <p className="mt-0.5 text-xs text-white/80">募集中の仕事（給与・勤務時間など）を公開します</p>
                </div>
                <span className="text-lg">›</span>
              </Link>
              <Link href="/scouts" className="flex items-center justify-between gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">スカウト</p>
                  <p className="mt-0.5 text-xs text-gray-500">気になる理学療法士に、直接メッセージを送ります</p>
                </div>
                <span className="text-lg text-gray-400">›</span>
              </Link>
            </div>
            <section className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold">職場ページ（職場口コミ）と繋げる（任意）</h2>
              <p className="mt-1 text-[11px] leading-5 text-gray-500">繋げなくても、求人の掲載やスカウトはできます。繋げたい場合は、下から職場の名前を探してください。繋げると、投稿がその職場の口コミページにも表示されます（運営の確認後）。</p>
              {linked ? (
                <p className="mt-2 text-sm">ひもづけ中：<Link href={`/hospitals/${linked.id}`} className="underline">{linked.name}</Link>　<button type="button" onClick={() => linkHospital(null)} className="text-xs text-gray-500 underline">はずす</button></p>
              ) : <p className="mt-2 text-xs text-gray-500">まだ、ひもづけていません</p>}
              <div className="mt-2 flex gap-2">
                <input aria-label="職場ページを探す" placeholder="施設の名前で探す" value={hq} onChange={(e) => setHq(e.target.value)} className={INPUT_CLASS} />
                <button type="button" onClick={searchH} className="shrink-0 rounded-full border border-gray-300 px-4 text-sm">探す</button>
              </div>
              {hresults.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {hresults.map((h) => (
                    <li key={h.id}><button type="button" onClick={() => linkHospital(h.id)} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-left text-xs">{h.name}<span className="ml-2 text-gray-400">{h.prefecture}{h.city}</span></button></li>
                  ))}
                </ul>
              )}
            </section>
            <h2 className="text-sm font-semibold">自分の組織の投稿</h2>
            {posts.length === 0 ? <p className="text-sm text-gray-500">まだ投稿はありません</p> : (
              <div className="space-y-3">
                {posts.map((p) => (
                  <div key={p.id}>
                    <OrgPostCard post={p} showOrg={false} />
                    <button type="button" onClick={() => removePost(p)} className="mt-1 text-xs text-red-700 underline">この投稿を削除</button>
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-sm font-semibold">自分の組織の求人</h2>
            {jobs.length === 0 ? <p className="text-sm text-gray-500">まだ求人はありません</p> : (
              <ul className="space-y-2">
                {jobs.map((j) => (
                  <li key={j.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{j.title}</p>
                      <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px]">{JOB_STATUS_LABEL[j.status]}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-gray-400">更新日 {fmtDate(j.updated_at)}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <Link href={`/org/jobs/${j.id}`} className="rounded-full border border-gray-300 px-3 py-1">編集</Link>
                      {j.status !== "open" && <button type="button" onClick={() => setStatus(j, "open")} className="rounded-full border border-gray-300 px-3 py-1">公開する</button>}
                      {j.status === "open" && <button type="button" onClick={() => setStatus(j, "draft")} className="rounded-full border border-gray-300 px-3 py-1">非公開（下書き）に戻す</button>}
                      {j.status === "open" && <button type="button" onClick={() => setStatus(j, "closed")} className="rounded-full border border-gray-300 px-3 py-1">募集を終了</button>}
                      <button type="button" onClick={() => remove(j)} className="rounded-full border border-red-200 px-3 py-1 text-red-700">削除</button>
                    </div>
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
