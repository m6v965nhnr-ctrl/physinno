"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import GuestBanner, { useIsGuest } from "@/components/GuestBanner";
import ReportButton from "@/components/ReportButton";
import { ptNameWithTitle } from "@/lib/format";
import {
  REGIONS,
  TrainingMethod,
  deleteTrainingMethod,
  getRegion,
  listTrainingMethods,
  toggleTrainingReaction,
  trainingCounts,
} from "@/lib/training";
import { askConfirm } from "@/lib/confirm";

export default function TrainingPage() {
  return (
    <Suspense fallback={null}>
      <TrainingInner />
    </Suspense>
  );
}

const chip = (active: boolean) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
    active ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
  }`;

// 筋肉・部位別の訓練のレパートリー。部位 → 筋肉 を選ぶと、PTが登録した訓練が並ぶ
function TrainingInner() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const guest = useIsGuest();

  const region = getRegion(params.get("region"))?.key ?? "";
  const muscle = params.get("muscle") ?? "";
  const [sort, setSort] = useState<"new" | "popular">("new");
  const [items, setItems] = useState<TrainingMethod[] | null>(null);
  const [counts, setCounts] = useState<{ byRegion: Record<string, number>; byMuscle: Record<string, number> }>({
    byRegion: {},
    byMuscle: {},
  });
  const [canPost, setCanPost] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    trainingCounts().then(setCounts);
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) setCanPost((await getMyAccountType(user.id)) === "pt");
    });
  }, []);

  const load = useCallback(async () => {
    setItems(null);
    setItems(await listTrainingMethods({ region: region || null, muscle: muscle || null, sort }));
  }, [region, muscle, sort]);

  useEffect(() => {
    load();
  }, [load]);

  function choose(nextRegion: string, nextMuscle = "") {
    const q = new URLSearchParams();
    if (nextRegion) q.set("region", nextRegion);
    if (nextMuscle) q.set("muscle", nextMuscle);
    router.replace(`${pathname}${q.toString() ? `?${q.toString()}` : ""}`, { scroll: false });
  }

  async function react(item: TrainingMethod, kind: "like" | "save") {
    if (guest) {
      notify("いいね・保存は、無料登録（PT・学生）後に使えます");
      return;
    }
    setBusy(item.id);
    const on = await toggleTrainingReaction(item.id, kind);
    setBusy(null);
    if (on === null) {
      notify("うまくいきませんでした。時間をおいてお試しください");
      return;
    }
    setItems((prev) =>
      (prev ?? []).map((x) =>
        x.id !== item.id
          ? x
          : kind === "like"
            ? { ...x, my_like: on, like_count: Math.max(0, x.like_count + (on ? 1 : -1)) }
            : { ...x, my_save: on, save_count: Math.max(0, x.save_count + (on ? 1 : -1)) }
      )
    );
  }

  async function remove(item: TrainingMethod) {
    if (!await askConfirm("この訓練を削除しますか？")) return;
    if (await deleteTrainingMethod(item.id)) {
      notify("削除しました");
      load();
      trainingCounts().then(setCounts);
    } else {
      notify("削除できませんでした");
    }
  }

  const current = getRegion(region);

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts?mode=ideas" className="text-sm text-gray-400 hover:text-gray-700">
          ← 臨床アイデア
        </Link>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">💪 筋肉・部位別の訓練</h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          「この筋肉を鍛えたいけど、いつものやり方では反応がよくない」ときに。PTが登録した訓練のレパートリーを、部位・筋肉から探せます。
        </p>

        {guest && (
          <div className="mt-4">
            <GuestBanner text="訓練のレパートリーは、ログインなしで見られます。登録・いいね・保存は、無料登録後に使えます。" />
          </div>
        )}

        {canPost && (
          <Link
            href={`/training/new${region ? `?region=${region}${muscle ? `&muscle=${encodeURIComponent(muscle)}` : ""}` : ""}`}
            className="mt-4 block rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-center text-sm font-semibold text-sky-900"
          >
            ＋ 訓練を登録する
          </Link>
        )}

        {/* 部位 */}
        <p className="mt-6 text-xs font-semibold text-gray-500">部位</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => choose("")} className={chip(!region)}>
            すべて
          </button>
          {REGIONS.map((r) => (
            <button key={r.key} onClick={() => choose(r.key)} className={chip(region === r.key)}>
              {r.name}
              {(counts.byRegion[r.key] ?? 0) > 0 && (
                <span className="ml-1 text-[11px] opacity-70">{counts.byRegion[r.key]}</span>
              )}
            </button>
          ))}
        </div>

        {/* 筋肉 */}
        {current && (
          <>
            <p className="mt-4 text-xs font-semibold text-gray-500">筋肉</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={() => choose(current.key)} className={chip(!muscle)}>
                {current.name}のすべて
              </button>
              {current.muscles.map((m) => (
                <button key={m} onClick={() => choose(current.key, m)} className={chip(muscle === m)}>
                  {m}
                  {(counts.byMuscle[`${current.key}:${m}`] ?? 0) > 0 && (
                    <span className="ml-1 text-[11px] opacity-70">{counts.byMuscle[`${current.key}:${m}`]}</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">
            {current ? `${current.name}${muscle ? `・${muscle}` : ""}` : "すべての部位"}の訓練
          </p>
          <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-xs">
            {(["new", "popular"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                className={`rounded-full px-3 py-1 ${sort === k ? "bg-white font-semibold shadow-sm" : "text-gray-500"}`}
              >
                {k === "new" ? "新しい順" : "いいね順"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {items === null && <p className="text-sm text-gray-400">読み込み中…</p>}
          {items !== null && items.length === 0 && (
            <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm leading-6 text-gray-500">
              まだ登録がありません。
              {canPost ? "いつも使っている訓練を、最初に登録してみませんか？" : ""}
            </p>
          )}

          {(items ?? []).map((t) => {
            const r = getRegion(t.region);
            return (
              <article key={t.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                    {r?.name ?? t.region}
                    {t.muscle ? `・${t.muscle}` : ""}
                  </span>
                  {t.purpose && <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-cyan-800">{t.purpose}</span>}
                  {t.body_position && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">{t.body_position}</span>}
                </div>

                <h2 className="mt-2 text-base font-semibold text-gray-900">{t.title}</h2>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">{t.method}</p>
                {t.points && (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    <span className="text-[11px] font-semibold text-gray-500">コツ・注意　</span>
                    {t.points}
                  </p>
                )}
                {t.equipment && (
                  <p className="mt-1 text-xs text-gray-500">道具: {t.equipment}</p>
                )}

                <p className="mt-2 text-xs text-gray-400">
                  {t.author_id ? (
                    <>
                      {ptNameWithTitle(t.author_name)}
                      {t.author_experience !== null ? `（経験${t.author_experience}年）` : ""}
                    </>
                  ) : (
                    "匿名のPT"
                  )}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {(["like", "save"] as const).map((k) => {
                    const on = k === "like" ? t.my_like : t.my_save;
                    const count = k === "like" ? t.like_count : t.save_count;
                    return (
                      <button
                        key={k}
                        onClick={() => react(t, k)}
                        disabled={busy !== null}
                        aria-pressed={on}
                        className={`rounded-full border px-3 py-1.5 text-xs transition ${
                          on ? "border-sky-300 bg-sky-100 text-sky-900" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {k === "like" ? `👍 ${on ? "いいね済み" : "いいね"}` : `🔖 ${on ? "保存済み" : "保存"}`}
                        {(k === "like" || count > 0) && <span className="ml-1 font-semibold">{count}</span>}
                      </button>
                    );
                  })}
                  <Link
                    href={`/pts?mode=papers&q=${encodeURIComponent(`${t.muscle ?? r?.name ?? ""} ${t.title}`)}`}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                  >
                    📚 論文を探す
                  </Link>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <ReportButton targetType="training_method" targetId={t.id} />
                  {t.is_mine && (
                    <button onClick={() => remove(t)} className="text-xs text-gray-400 underline">
                      削除
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-xs leading-5 text-gray-400">
          PTが登録した、臨床での工夫の共有です。個々の患者さんへの適用は、医師の指示・院内のプロトコル・ご自身の評価に従ってください。
        </p>
      </div>
    </main>
  );
}
