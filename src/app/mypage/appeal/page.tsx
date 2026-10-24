"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalUser } from "@/lib/authUser";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { chipClass } from "@/lib/ui";
import { LoadingScreen } from "@/components/states";
import { AppealSummary, WorkPrefsCard } from "@/components/AppealSummary";
import {
  APPEAL_STEPS,
  AREAS_MAX,
  EMPLOYMENT_OPTIONS,
  EMPTY_PREFS,
  LEARNING_MAX,
  NOTE_MAX,
  ONE_LINER_EXAMPLES,
  ONE_LINER_MAX,
  PREF3_LABEL,
  SEEK_TAGS,
  START_TIMING_LABEL,
  TAG_MAX,
  VALUE_TAGS,
  WHY_MAX,
  WHY_STARTERS,
  type Pref3,
  type StartTiming,
  type WorkPrefs,
  appealProgress,
  getWorkPrefs,
  saveWorkPrefs,
} from "@/lib/ptAppeal";

const TEXTAREA_CLASS =
  "w-full resize-none rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm leading-7 text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900";

function Card({
  no,
  title,
  why,
  done,
  children,
}: {
  no: number;
  title: string;
  why: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-6">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            done ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          {done ? "✓" : no}
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-gray-500">{why}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Counter({ n, max }: { n: number; max: number }) {
  return (
    <span className={`shrink-0 whitespace-nowrap text-xs ${n > max ? "text-red-600" : "text-gray-400"}`} aria-live="polite">
      {n} / {max}
    </span>
  );
}

// 選択の切り替え。上限を超えるときは、選ばずに知らせる（notify は state の更新の中では呼ばない）
function pick(list: string[], v: string, max: number, set: (next: string[]) => void) {
  if (list.includes(v)) set(list.filter((x) => x !== v));
  else if (list.length >= max) notify(`選べるのは${max}つまでです。ほかを外してから選んでください`);
  else set([...list, v]);
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | null;
  options: { v: T; label: string }[];
  onChange: (v: T | null) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-900">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.v}
            type="button"
            aria-pressed={value === o.v}
            onClick={() => onChange(value === o.v ? null : o.v)}
            className={chipClass(value === o.v)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AppealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState("");
  const [hasProfile, setHasProfile] = useState(true);

  const [oneLiner, setOneLiner] = useState("");
  const [whyPt, setWhyPt] = useState("");
  const [values, setValues] = useState<string[]>([]);
  const [learning, setLearning] = useState("");
  const [acceptScouts, setAcceptScouts] = useState(false);
  const [prefs, setPrefs] = useState<WorkPrefs>(EMPTY_PREFS);
  // プレビューに、経験・専門を出すため
  const [facts, setFacts] = useState<{ experience_years: number | null; specialty: string | null }>({
    experience_years: null,
    specialty: null,
  });

  const whyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await getLocalUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      const type = await getMyAccountType(user.id);
      if (type !== "pt") {
        router.replace("/mypage");
        return;
      }
      setUserId(user.id);

      const { data } = await supabase
        .from("pt_profiles")
        .select("one_liner, values_tags, why_pt, learning_now, accept_scouts, experience_years, specialty")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!data) {
        setHasProfile(false);
      } else {
        setOneLiner(data.one_liner || "");
        setWhyPt(data.why_pt || "");
        setValues(data.values_tags || []);
        setLearning(data.learning_now || "");
        setAcceptScouts(!!data.accept_scouts);
        setFacts({ experience_years: data.experience_years, specialty: data.specialty });
      }
      setPrefs((await getWorkPrefs(user.id)) ?? EMPTY_PREFS);
      setLoading(false);
    })();
  }, [router]);

  const steps = useMemo(
    () => appealProgress({ one_liner: oneLiner, why_pt: whyPt, values_tags: values, learning_now: learning }, prefs),
    [oneLiner, whyPt, values, learning, prefs]
  );
  const doneCount = steps.filter(Boolean).length;

  function addStarter(s: string) {
    const base = whyPt.trim() ? `${whyPt.trimEnd()}\n` : "";
    setWhyPt(`${base}${s}`.slice(0, WHY_MAX));
    requestAnimationFrame(() => whyRef.current?.focus());
  }

  async function save() {
    if (oneLiner.length > ONE_LINER_MAX || learning.length > LEARNING_MAX || whyPt.length > WHY_MAX || (prefs.note?.length ?? 0) > NOTE_MAX) {
      notify("文字数が多すぎる項目があります。赤い数字を確認してください");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("pt_profiles")
      .update({
        one_liner: oneLiner.trim() || null,
        values_tags: values.slice(0, TAG_MAX),
        learning_now: learning.trim() || null,
        why_pt: whyPt.trim() || null,
        accept_scouts: acceptScouts,
      })
      .eq("user_id", userId);
    if (error) {
      notify(error.message);
      setSaving(false);
      return;
    }
    const { error: prefError } = await saveWorkPrefs(userId, prefs);
    setSaving(false);
    if (prefError) {
      notify(prefError.message);
      return;
    }
    notify("保存しました");
  }

  if (loading) return <LoadingScreen />;

  if (!hasProfile) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto max-w-xl">
          <p className="text-base text-gray-900">先に、基本のプロフィールを登録してください。</p>
          <Link href="/mypage/edit" className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
            プロフィールを登録する
          </Link>
        </div>
      </main>
    );
  }

  const previewPt = {
    one_liner: oneLiner,
    values_tags: values,
    why_pt: whyPt,
    learning_now: learning,
    experience_years: facts.experience_years,
    specialty: facts.specialty,
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-52 pt-8 sm:px-6">
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <Link href="/mypage" className="text-sm text-gray-500">
            ‹ マイページ
          </Link>
          <h1 className="mt-3 text-2xl font-semibold text-gray-900">採用担当に伝える</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            人柄ややる気は、肩書きだけでは伝わりません。短くて大丈夫です。書いた分だけ、あなたに合う職場に見つけてもらいやすくなります。すべて任意で、あとから直せます。
          </p>
        </div>

        {/* 進み具合 */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]" aria-label="書けた項目の数">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-900">
              5つのうち {doneCount}つ 書けました
            </span>
            <span className="text-xs text-gray-500">
              {doneCount === 5 ? "ばっちりです" : "どれからでも大丈夫"}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5" aria-hidden="true">
            {steps.map((ok, i) => (
              <div key={APPEAL_STEPS[i]} className={`h-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-gray-200"}`} />
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">{APPEAL_STEPS.join(" ／ ")}</p>
        </div>

        <Card
          no={1}
          title="ひとこと"
          why="採用担当が、いちばん最初に読む一文です。肩書きではなく、あなたらしさを。"
          done={steps[0]}
        >
          <label htmlFor="one-liner" className="sr-only">
            ひとこと
          </label>
          <input
            id="one-liner"
            value={oneLiner}
            onChange={(e) => setOneLiner(e.target.value)}
            maxLength={ONE_LINER_MAX + 20}
            placeholder="例：患者さんの「できた」を一緒に喜びたい"
            className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900"
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">迷ったら、例をタップ</p>
            <Counter n={oneLiner.length} max={ONE_LINER_MAX} />
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {ONE_LINER_EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setOneLiner(ex)}
                className="rounded-2xl border border-dashed border-gray-300 px-4 py-2 text-left text-xs leading-5 text-gray-600 hover:bg-gray-50"
              >
                {ex}
              </button>
            ))}
          </div>
        </Card>

        <Card
          no={2}
          title="PTになった理由"
          why="動機は、続ける力のいちばんの手がかりです。1〜3文で十分です。"
          done={steps[1]}
        >
          <label htmlFor="why-pt" className="sr-only">
            PTになった理由
          </label>
          <textarea
            id="why-pt"
            ref={whyRef}
            value={whyPt}
            onChange={(e) => setWhyPt(e.target.value)}
            rows={5}
            placeholder="例：スポーツで大きなけがをして、リハビリに支えられた経験から、目指しました。"
            className={TEXTAREA_CLASS}
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">書き出しに迷ったら</p>
            <Counter n={whyPt.length} max={WHY_MAX} />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {WHY_STARTERS.map((s) => (
              <button key={s} type="button" onClick={() => addStarter(s)} className={chipClass(false)}>
                ＋ {s}
              </button>
            ))}
          </div>
        </Card>

        <Card
          no={3}
          title="大切にしていること"
          why={`仕事で譲れない価値観が合う職場だと、長く続きます。${TAG_MAX}つまで選べます。`}
          done={steps[2]}
        >
          <div className="flex flex-wrap gap-2" role="group" aria-label="大切にしていること">
            {VALUE_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={values.includes(t)}
                onClick={() => pick(values, t, TAG_MAX, setValues)}
                className={chipClass(values.includes(t))}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500" aria-live="polite">
            {values.length} / {TAG_MAX} つ選択中
          </p>
        </Card>

        <Card
          no={4}
          title="今、学んでいること"
          why="やる気は、いま実際にやっていることで伝わります。勉強会・資格・論文・実習の指導など、小さなことでも。"
          done={steps[3]}
        >
          <label htmlFor="learning" className="sr-only">
            今、学んでいること
          </label>
          <textarea
            id="learning"
            value={learning}
            onChange={(e) => setLearning(e.target.value)}
            rows={3}
            placeholder="例：呼吸リハの勉強会に月1回参加しています。脳卒中の歩行分析の本を読んでいます。"
            className={TEXTAREA_CLASS}
          />
          <div className="mt-2 text-right">
            <Counter n={learning.length} max={LEARNING_MAX} />
          </div>
        </Card>

        <Card
          no={5}
          title="働き方の希望"
          why="条件のすれ違いを、会う前に減らせます。ここは、承認された組織にだけ見えます。"
          done={steps[4]}
        >
          <div className="rounded-2xl bg-gray-50 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={acceptScouts}
                onChange={(e) => setAcceptScouts(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <b>スカウトを受け付ける</b>
                <span className="mt-1 block text-xs leading-5 text-gray-600">
                  オンにすると、運営が承認した組織（病院・施設など）に、この希望が見えて、メッセージが届くようになります。住所・電話・メールアドレスは渡りません。いつでもオフにできます。
                </span>
              </span>
            </label>
            <p className={`mt-3 text-xs leading-5 ${acceptScouts ? "text-emerald-700" : "text-gray-500"}`}>
              {acceptScouts
                ? "いま：承認された組織に見えます。勤務先が承認済みの組織で、同じ画面を見られる場合は、見える可能性があります。"
                : "いま：オフです。下の希望は、あなたにしか見えません（保存だけされます）。"}
            </p>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-900">
                職場に求めること <span className="text-xs font-normal text-gray-500">（{TAG_MAX}つまで）</span>
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="職場に求めること">
                {SEEK_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={prefs.seek_tags.includes(t)}
                    onClick={() => pick(prefs.seek_tags, t, TAG_MAX, (next) => setPrefs((p) => ({ ...p, seek_tags: next })))}
                    className={chipClass(prefs.seek_tags.includes(t))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="areas" className="mb-2 block text-sm font-medium text-gray-900">
                希望する勤務地
              </label>
              <input
                id="areas"
                value={prefs.areas ?? ""}
                onChange={(e) => setPrefs((p) => ({ ...p, areas: e.target.value }))}
                maxLength={AREAS_MAX}
                placeholder="例：神奈川県内、横浜市周辺（通勤45分まで）"
                className="w-full rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-900">働き方</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="働き方">
                {EMPLOYMENT_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={prefs.employment.includes(t)}
                    onClick={() => pick(prefs.employment, t, 4, (next) => setPrefs((p) => ({ ...p, employment: next })))}
                    className={chipClass(prefs.employment.includes(t))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Segmented<Pref3>
              label="夜勤・オンコール"
              value={prefs.shift_pref}
              options={(Object.keys(PREF3_LABEL) as Pref3[]).map((v) => ({ v, label: PREF3_LABEL[v] }))}
              onChange={(v) => setPrefs((p) => ({ ...p, shift_pref: v }))}
            />
            <Segmented<Pref3>
              label="訪問（訪問リハなど）"
              value={prefs.visit_pref}
              options={(Object.keys(PREF3_LABEL) as Pref3[]).map((v) => ({ v, label: PREF3_LABEL[v] }))}
              onChange={(v) => setPrefs((p) => ({ ...p, visit_pref: v }))}
            />
            <Segmented<StartTiming>
              label="働き始められる時期"
              value={prefs.start_timing}
              options={(Object.keys(START_TIMING_LABEL) as StartTiming[]).map((v) => ({ v, label: START_TIMING_LABEL[v] }))}
              onChange={(v) => setPrefs((p) => ({ ...p, start_timing: v }))}
            />

            <div>
              <label htmlFor="pref-note" className="mb-2 block text-sm font-medium text-gray-900">
                組織に伝えたいこと <span className="text-xs font-normal text-gray-500">（任意）</span>
              </label>
              <textarea
                id="pref-note"
                value={prefs.note ?? ""}
                onChange={(e) => setPrefs((p) => ({ ...p, note: e.target.value }))}
                rows={3}
                placeholder="例：まずは見学させていただけると嬉しいです。"
                className={TEXTAREA_CLASS}
              />
              <div className="mt-2 text-right">
                <Counter n={(prefs.note ?? "").length} max={NOTE_MAX} />
              </div>
            </div>

            <p className="rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
              家族構成・結婚や出産の予定・出身地・健康状態などは、書かなくて大丈夫です。採用の判断に使うべきではない情報だからです。
            </p>
          </div>
        </Card>

        {/* プレビュー */}
        <div className="space-y-4">
          <AppealSummary pt={previewPt} preview />
          <WorkPrefsCard prefs={prefs} self active={acceptScouts} />
        </div>
      </div>

      {/* 保存バー */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-30 px-3">
        <div className="pointer-events-auto mx-auto flex max-w-xl items-center gap-3 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur">
          <p className="min-w-0 flex-1 text-xs leading-5 text-gray-600">
            {doneCount === 5 ? "5つ書けました" : `あと${5 - doneCount}つ、書けます`}
            <span className="block text-gray-400">途中でも保存できます</span>
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="shrink-0 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "保存中…" : "保存する"}
          </button>
        </div>
      </div>
    </main>
  );
}
