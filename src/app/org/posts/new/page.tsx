"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { Job, Org, myOrganization } from "@/lib/recruit";
import { MAX_MEDIA, MEDIA_ACCEPT, ORG_POST_KIND_LABEL, checkFile, removeOrgMedia, uploadOrgMedia, type OrgPost } from "@/lib/orgPosts";
import { PRIMARY_BUTTON_CLASS } from "@/lib/ui";
import { LoadingScreen } from "@/components/states";

const AREA = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900";

// 施設の投稿をつくる。お知らせ・採用情報、写真・動画（あわせて4つまで）。投稿は、職場ページの「投稿」タブと、PT・学生のホームに流れる
export default function NewOrgPostPage() {
  const { loading, userId } = useMyAccount(["pt", "general", "teacher"], "/pts");
  const router = useRouter();
  const [org, setOrg] = useState<Org | null | undefined>(undefined);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [kind, setKind] = useState<OrgPost["kind"]>("info");
  const [body, setBody] = useState("");
  const [jobId, setJobId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const previews = useMemo(() => files.map((f) => ({ f, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  useEffect(() => {
    if (loading) return;
    myOrganization().then(async (o) => {
      setOrg(o);
      if (o) {
        const { data } = await supabase.from("job_postings").select("id, title, status").eq("organization_id", o.id).eq("status", "open");
        setJobs((data ?? []) as Job[]);
      }
    });
  }, [loading]);

  if (loading || org === undefined) return <LoadingScreen />;
  if (!org) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28"><div className="mx-auto max-w-2xl space-y-3">
        <p className="text-sm text-gray-600">投稿するには、先に組織（施設）の登録が必要です。</p>
        <Link href="/org" className="text-sm underline">組織を登録する</Link>
      </div></main>
    );
  }
  if (org.status !== "approved") {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28"><div className="mx-auto max-w-2xl space-y-3">
        <p className="text-sm text-gray-600">運営の確認が済むと、投稿できるようになります。いまの状態：{org.status === "pending" ? "確認待ち" : org.status === "rejected" ? "承認されませんでした" : "停止中"}</p>
        <Link href="/org" className="text-sm underline">← 戻る</Link>
      </div></main>
    );
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      const err = checkFile(f);
      if (err) { notify(`${f.name}：${err}`); continue; }
      if (next.length >= MAX_MEDIA) { notify(`写真・動画は、あわせて${MAX_MEDIA}つまでです`); break; }
      next.push(f);
    }
    setFiles(next);
  }

  async function submit() {
    if (busy || !org) return;
    if (!body.trim()) return notify("本文を書いてください");
    setBusy(true);
    const up = await uploadOrgMedia(org.id, files);
    if (up.error) { setBusy(false); return notify(up.error); }
    const { error } = await supabase.from("org_posts").insert({ organization_id: org.id, kind, body: body.trim(), media: up.media, job_id: kind === "recruit" && jobId ? jobId : null });
    if (error) {
      await removeOrgMedia(up.media);
      setBusy(false);
      return notify("投稿できませんでした。内容を確かめて、もう一度お試しください");
    }
    notify("投稿しました");
    router.push("/org");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-4">
        <Link href="/org" className="text-sm text-gray-400">← ホームに戻る</Link>
        <h1 className="text-2xl font-semibold">投稿する</h1>
        <p className="text-xs leading-5 text-gray-500">
          {org.name} の投稿として、{org.hospital_id ? "職場ページの「投稿」タブと、" : ""}理学療法士・学生のホームに表示されます。患者さんや職員の個人が特定される写真・情報は、載せないでください。
        </p>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="投稿の種類">
          {(Object.keys(ORG_POST_KIND_LABEL) as OrgPost["kind"][]).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={kind === k} onClick={() => setKind(k)} className={`rounded-full border py-2 text-sm font-semibold ${kind === k ? "border-transparent bg-relight-gradient text-white" : "border-gray-300 bg-white text-gray-700"}`}>{ORG_POST_KIND_LABEL[k]}</button>
          ))}
        </div>
        <textarea aria-label="本文" rows={7} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder={kind === "recruit" ? "募集のこと（職種・働き方・見学の受け入れなど）" : "お知らせ・職場の様子など、なんでも"} className={AREA} />
        {kind === "recruit" && jobs.length > 0 && (
          <select aria-label="関連する求人" value={jobId} onChange={(e) => setJobId(e.target.value)} className={AREA}>
            <option value="">求人はひもづけない</option>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        )}
        <div>
          <label className="block rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-600">
            写真・動画を追加（{files.length}/{MAX_MEDIA}）
            <span className="mt-1 block text-[11px] text-gray-400">画像：JPEG・PNG・WebP（10MBまで）／動画：MP4・MOV（30MBまで）</span>
            <input type="file" multiple accept={MEDIA_ACCEPT} className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </label>
          {previews.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {previews.map(({ f, url }, i) => (
                <div key={url} className="relative">
                  {f.type.startsWith("video/") ? <video src={url} className="aspect-[4/3] w-full rounded-xl bg-black object-contain" muted playsInline /> : /* eslint-disable-next-line @next/next/no-img-element */ <img src={url} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />}
                  <button type="button" aria-label="この写真・動画を外す" onClick={() => setFiles(files.filter((_, k) => k !== i))} className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">×</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="button" onClick={submit} disabled={busy} className={PRIMARY_BUTTON_CLASS}>{busy ? "投稿中…（動画は時間がかかります）" : "投稿する"}</button>
      </div>
    </main>
  );
}
