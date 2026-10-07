"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { CATEGORIES, TOPICS, getTopic, topicsOf } from "@/content/ideas";
import { IdeaInput, PHASES, PHASE_LABEL, createIdea } from "@/lib/ideas";

export default function NewIdeaPage() {
  return (
    <Suspense fallback={null}>
      <NewIdeaInner />
    </Suspense>
  );
}

const EMPTY: Omit<IdeaInput, "topic_slug"> = {
  title: "",
  goal: "",
  phase: "any",
  method: "",
  points: "",
  patient_traits: "",
  impressions: "",
  refs: "",
  is_anonymous: false,
};

function NewIdeaInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("topic") ?? "";

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [slug, setSlug] = useState(getTopic(initial) ? initial : "");
  const [v, setV] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setAllowed(false);
        return;
      }
      setUserId(user.id);
      setAllowed((await getMyAccountType(user.id)) === "pt");
    });
  }, []);

  const set = (patch: Partial<typeof v>) => setV((p) => ({ ...p, ...patch }));

  async function submit() {
    if (!userId) return;
    if (!slug) return notify("疾患を選択してください");
    if (v.title.trim().length < 2) return notify("アイデアの名前を入力してください");
    if (v.method.trim().length < 5) return notify("リハビリの方法を入力してください");

    setSaving(true);
    const res = await createIdea(userId, { ...v, topic_slug: slug });
    setSaving(false);
    if (!res.ok) {
      notify(res.message?.includes("20件") ? res.message : "登録に失敗しました。時間をおいてお試しください");
      return;
    }
    notify("アイデアを登録しました");
    router.push(`/ideas/${slug}`);
  }

  const input = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm";
  const label = "mb-1 block text-sm font-semibold text-gray-900";

  if (allowed === false) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-8">
        <div className="mx-auto max-w-2xl text-sm leading-6 text-gray-700">
          アイデアの登録は、PTのアカウントで使えます。
          <Link href="/ideas" className="ml-1 underline">
            アイデアを読む
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href={slug ? `/ideas/${slug}` : "/ideas"} className="text-sm text-gray-400 hover:text-gray-700">
          ← 戻る
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">リハビリのアイデアを登録</h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          「先輩に聞かないと分からなかった、臨床の引き出し」を、みんなで蓄積します。PTと学生が読めます。
        </p>

        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
          患者さんの氏名・年齢の詳細・日付・病院名など、個人が特定できる情報は書かないでください。「70代」「回復期」のように、特徴だけを書きます。
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <label className={label} htmlFor="topic">疾患 <span className="text-xs font-normal text-red-500">（必須）</span></label>
            <select id="topic" value={slug} onChange={(e) => setSlug(e.target.value)} className={input}>
              <option value="">選択してください</option>
              {CATEGORIES.filter((c) => !c.comingSoon).map((c) => (
                <optgroup key={c.key} label={c.name}>
                  {topicsOf(c.key).map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {TOPICS.length > 0 && (
              <p className="mt-1 text-xs text-gray-400">ほかの疾患は、順次追加します。</p>
            )}
          </div>

          <div>
            <label className={label} htmlFor="title">アイデアの名前 <span className="text-xs font-normal text-red-500">（必須）</span></label>
            <input id="title" value={v.title} maxLength={80} onChange={(e) => set({ title: e.target.value })} placeholder="例：立ち上がり反復で麻痺側の荷重を引き出す" className={input} />
          </div>

          <div>
            <label className={label} htmlFor="goal">目的</label>
            <input id="goal" value={v.goal} maxLength={200} onChange={(e) => set({ goal: e.target.value })} placeholder="例：立位バランスの改善" className={input} />
          </div>

          <div>
            <p className={label}>時期・場面</p>
            <div className="flex flex-wrap gap-2">
              {PHASES.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={v.phase === p}
                  onClick={() => set({ phase: p })}
                  className={`rounded-full px-4 py-1.5 text-sm ${v.phase === p ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600"}`}
                >
                  {PHASE_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={label} htmlFor="method">リハビリの方法 <span className="text-xs font-normal text-red-500">（必須）</span></label>
            <textarea id="method" value={v.method} maxLength={2000} rows={5} onChange={(e) => set({ method: e.target.value })} placeholder="どんな手順で、どのくらいの頻度・回数で行うか" className={input} />
          </div>

          <div>
            <label className={label} htmlFor="points">実施のポイント・注意</label>
            <textarea id="points" value={v.points} maxLength={1000} rows={3} onChange={(e) => set({ points: e.target.value })} placeholder="意識していること、やってはいけないこと、中止の目安" className={input} />
          </div>

          <div>
            <label className={label} htmlFor="traits">対象の患者さんの特徴</label>
            <textarea id="traits" value={v.patient_traits} maxLength={500} rows={2} onChange={(e) => set({ patient_traits: e.target.value })} placeholder="例：70代、回復期、麻痺は軽度、注意の低下あり（個人が特定できる情報は書かない）" className={input} />
          </div>

          <div>
            <label className={label} htmlFor="impressions">やってみて感じたこと</label>
            <textarea id="impressions" value={v.impressions} maxLength={1000} rows={3} onChange={(e) => set({ impressions: e.target.value })} placeholder="うまくいった点、うまくいかなかった点" className={input} />
          </div>

          <div>
            <label className={label} htmlFor="refs">参考文献</label>
            <textarea id="refs" value={v.refs} maxLength={800} rows={2} onChange={(e) => set({ refs: e.target.value })} placeholder="あれば。論文名・ガイドライン名・URLなど" className={input} />
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={v.is_anonymous} onChange={(e) => set({ is_anonymous: e.target.checked })} className="mt-1 h-4 w-4" />
            <span>
              <span className="block text-sm font-medium text-gray-900">匿名で登録する</span>
              <span className="block text-xs leading-5 text-gray-500">名前・資格・経験を、ほかの人には表示しません（サーバーからも返しません）。</span>
            </span>
          </label>
        </div>

        <button
          onClick={submit}
          disabled={saving || allowed === null}
          className="mt-8 w-full rounded-full bg-black py-3 text-sm font-medium text-white disabled:opacity-40"
        >
          {saving ? "登録しています…" : "登録する"}
        </button>
      </div>
    </main>
  );
}
