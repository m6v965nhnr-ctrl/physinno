"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { POSITIONS, PURPOSES, REGIONS, TrainingInput, createTrainingMethod, getRegion } from "@/lib/training";
import { LoadingScreen } from "@/components/states";

export default function NewTrainingPage() {
  return (
    <Suspense fallback={null}>
      <NewTrainingInner />
    </Suspense>
  );
}

// PTが「こういう訓練があるよ」を登録する
function NewTrainingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialRegion = getRegion(params.get("region"))?.key ?? "";
  const initialMuscle = params.get("muscle") ?? "";

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [v, setV] = useState<TrainingInput>({
    region: initialRegion,
    muscle: initialRegion && getRegion(initialRegion)?.muscles.includes(initialMuscle) ? initialMuscle : "",
    title: "",
    purpose: "",
    body_position: "",
    equipment: "",
    method: "",
    points: "",
    is_anonymous: false,
  });

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

  const set = (patch: Partial<TrainingInput>) => setV((p) => ({ ...p, ...patch }));
  const region = getRegion(v.region);

  async function submit() {
    if (!userId) return;
    if (!v.region) return notify("部位を選択してください");
    if (v.title.trim().length < 2) return notify("訓練の名前を入力してください");
    if (v.method.trim().length < 5) return notify("やり方を入力してください");

    setSaving(true);
    const ok = await createTrainingMethod(userId, v);
    setSaving(false);
    if (!ok) {
      notify("登録に失敗しました。時間をおいてお試しください");
      return;
    }
    notify("訓練を登録しました");
    const q = new URLSearchParams({ region: v.region });
    if (v.muscle) q.set("muscle", v.muscle);
    router.push(`/training?${q.toString()}`);
  }

  const input = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm";
  const label = "mb-1 block text-sm font-semibold text-gray-900";
  const chip = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-sm transition ${
      active ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
    }`;

  if (allowed === null) {
    return (
      <LoadingScreen />
    );
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-8">
        <div className="mx-auto max-w-2xl text-sm leading-6 text-gray-700">
          <p>訓練の登録は、理学療法士（PT）のアカウントで使えます。</p>
          <Link href="/training" className="mt-4 inline-block text-sky-700 underline">
            訓練のレパートリーを見る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href={`/training${v.region ? `?region=${v.region}` : ""}`} className="text-sm text-gray-400 hover:text-gray-700">
          ← 筋肉・部位別の訓練
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">訓練を登録する</h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          「この筋肉には、こういうやり方もあるよ」を共有しましょう。患者さんが特定できる情報は書かないでください。
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <span className={label}>部位 *</span>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button key={r.key} type="button" onClick={() => set({ region: r.key, muscle: "" })} className={chip(v.region === r.key)}>
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {region && (
            <div>
              <span className={label}>筋肉</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => set({ muscle: "" })} className={chip(!v.muscle)}>
                  特定しない
                </button>
                {region.muscles.map((m) => (
                  <button key={m} type="button" onClick={() => set({ muscle: m })} className={chip(v.muscle === m)}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          <label className="block">
            <span className={label}>訓練の名前 *</span>
            <input
              value={v.title}
              onChange={(e) => set({ title: e.target.value })}
              maxLength={60}
              placeholder="例: 側臥位でのクラムシェル（骨盤後傾を抑えて）"
              className={input}
            />
          </label>

          <div>
            <span className={label}>目的</span>
            <div className="flex flex-wrap gap-2">
              {PURPOSES.map((p) => (
                <button key={p} type="button" onClick={() => set({ purpose: v.purpose === p ? "" : p })} className={chip(v.purpose === p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className={label}>肢位</span>
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set({ body_position: v.body_position === p ? "" : p })}
                  className={chip(v.body_position === p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className={label}>道具</span>
            <input
              value={v.equipment}
              onChange={(e) => set({ equipment: e.target.value })}
              maxLength={60}
              placeholder="例: セラバンド、タオル、なし"
              className={input}
            />
          </label>

          <label className="block">
            <span className={label}>やり方 *</span>
            <textarea
              value={v.method}
              onChange={(e) => set({ method: e.target.value })}
              rows={5}
              maxLength={1500}
              placeholder="開始肢位、動かし方、回数・セットなど"
              className={input}
            />
          </label>

          <label className="block">
            <span className={label}>コツ・注意（反応がよくないときの工夫など）</span>
            <textarea
              value={v.points}
              onChange={(e) => set({ points: e.target.value })}
              rows={4}
              maxLength={1000}
              placeholder="例: 代償で骨盤が後ろに倒れやすいので、壁に背中をつけると収縮が入りやすい"
              className={input}
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={v.is_anonymous} onChange={(e) => set({ is_anonymous: e.target.checked })} />
            匿名で登録する（名前を出さない）
          </label>

          <button
            onClick={submit}
            disabled={saving}
            className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "登録中…" : "登録する"}
          </button>
        </div>
      </div>
    </main>
  );
}
