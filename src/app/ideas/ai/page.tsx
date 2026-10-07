"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { CATEGORIES, getTopic, topicsOf } from "@/content/ideas";
import {
  AGE_BANDS,
  AI_PHASES,
  GOALS,
  MEASURES,
  PROBLEMS,
  SEXES,
  type MeasureKey,
  type SuggestInput,
  type SuggestResult,
} from "@/lib/ideasAi";

export default function IdeasAiPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const params = useSearchParams();
  const first = params.get("topic") ?? "";

  const [topic, setTopic] = useState(getTopic(first) ? first : "");
  const [age, setAge] = useState<SuggestInput["age"] | "">("");
  const [sex, setSex] = useState<SuggestInput["sex"]>("回答しない");
  const [phase, setPhase] = useState<SuggestInput["phase"] | "">("");
  const [problems, setProblems] = useState<Set<string>>(new Set());
  const [measures, setMeasures] = useState<Partial<Record<MeasureKey, string>>>({});
  const [goal, setGoal] = useState<SuggestInput["goal"] | "">("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ data: SuggestResult; topic: string | null; usedPtIdeas: number } | null>(null);

  const toggle = (p: string) =>
    setProblems((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });

  async function submit() {
    if (!age || !phase || !goal) {
      notify("年代・時期・目標を選択してください");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    const nums: Partial<Record<MeasureKey, number>> = {};
    for (const m of MEASURES) {
      const raw = measures[m.key];
      if (raw !== undefined && raw !== "" && Number.isFinite(Number(raw))) nums[m.key] = Number(raw);
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    try {
      const res = await fetch("/api/ideas/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}) },
        body: JSON.stringify({ topic, age, sex, phase, problems: [...problems], measures: nums, goal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "提案を作れませんでした");
      } else {
        setResult({ data: data.result, topic: data.topic, usedPtIdeas: data.usedPtIdeas });
      }
    } catch {
      setError("提案を作れませんでした。時間をおいてお試しください");
    }
    setLoading(false);
  }

  const select = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm";
  const label = "mb-1 block text-sm font-semibold text-gray-900";
  const chip = (on: boolean) =>
    `rounded-full px-3 py-1.5 text-xs transition ${on ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600"}`;

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href={topic ? `/ideas/${topic}` : "/pts?mode=ideas"} className="text-sm text-gray-400 hover:text-gray-700">
          ← 戻る
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">✨ AIに相談</h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          患者さんの状態を選ぶと、臨床で<strong>検討できる選択肢</strong>を提案します。最終的な判断は、PTと医師が行います。
        </p>

        <div className="mt-3 space-y-2 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
          <p>入力は、選択式と数値だけです。氏名・病院名・日付など、個人が特定できる情報は入力できません。</p>
          <p>入力内容は、保存されません。提案を作るため、外部のAI（Google）に送信されます。AIの提案には、誤りが含まれることがあります。</p>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className={label} htmlFor="t">疾患（任意）</label>
            <select id="t" value={topic} onChange={(e) => setTopic(e.target.value)} className={select}>
              <option value="">指定しない</option>
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
            <p className="mt-1 text-xs text-gray-400">選ぶと、編集部のまとめとPTの投稿を、提案の根拠に使います。</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label} htmlFor="a">年代 <span className="text-xs font-normal text-red-500">（必須）</span></label>
              <select id="a" value={age} onChange={(e) => setAge(e.target.value as SuggestInput["age"])} className={select}>
                <option value="">選択</option>
                {AGE_BANDS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="s">性別</label>
              <select id="s" value={sex} onChange={(e) => setSex(e.target.value as SuggestInput["sex"])} className={select}>
                {SEXES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className={label}>時期・場面 <span className="text-xs font-normal text-red-500">（必須）</span></p>
            <div className="flex flex-wrap gap-2">
              {AI_PHASES.map((p) => (
                <button key={p} type="button" aria-pressed={phase === p} onClick={() => setPhase(p)} className={chip(phase === p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={label}>主な問題（複数選べます）</p>
            <div className="flex flex-wrap gap-2">
              {PROBLEMS.map((p) => (
                <button key={p} type="button" aria-pressed={problems.has(p)} onClick={() => toggle(p)} className={chip(problems.has(p))}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={label}>評価値（わかるものだけ）</p>
            <div className="grid grid-cols-2 gap-3">
              {MEASURES.map((m) => (
                <label key={m.key} className="block text-xs text-gray-600">
                  {m.label}
                  <span className="mt-1 flex items-center gap-1.5">
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min={m.min}
                      max={m.max}
                      value={measures[m.key] ?? ""}
                      onChange={(e) => setMeasures((p) => ({ ...p, [m.key]: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                    />
                    <span className="shrink-0 text-gray-500">{m.unit}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={label} htmlFor="g">目標 <span className="text-xs font-normal text-red-500">（必須）</span></label>
            <select id="g" value={goal} onChange={(e) => setGoal(e.target.value as SuggestInput["goal"])} className={select}>
              <option value="">選択</option>
              {GOALS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={submit} disabled={loading} className="mt-8 w-full rounded-full bg-black py-3 text-sm font-medium text-white disabled:opacity-40">
          {loading ? "考えています…（10〜20秒）" : "選択肢を提案してもらう"}
        </button>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {result && (
          <section className="mt-8" aria-live="polite">
            <h2 className="text-lg font-semibold text-gray-900">臨床で検討できる選択肢</h2>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              AIによる提案です。誤りを含むことがあります。実施の可否・方法は、医師の指示と、ご自身の評価で判断してください。
              {result.topic && `（${result.topic}の編集部まとめ${result.usedPtIdeas > 0 ? `と、PTの投稿${result.usedPtIdeas}件` : ""}を参考にしています）`}
            </p>

            {result.data.summary && <p className="mt-3 rounded-2xl bg-white p-4 text-sm leading-6 text-gray-800">{result.data.summary}</p>}

            {result.data.check_first.length > 0 && (
              <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-900">まず確認したいこと</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
                  {result.data.check_first.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3 space-y-3">
              {result.data.options.map((o, i) => (
                <article key={o.title} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    <span className="mr-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-800">{i + 1}</span>
                    {o.title}
                  </h3>
                  {o.why && <p className="mt-2 text-sm leading-6 text-gray-800"><span className="text-[11px] font-semibold text-gray-500">なぜ　</span>{o.why}</p>}
                  {o.how && <p className="mt-1 text-sm leading-6 text-gray-800"><span className="text-[11px] font-semibold text-gray-500">進め方　</span>{o.how}</p>}
                  {o.cautions && <p className="mt-1 text-sm leading-6 text-gray-800"><span className="text-[11px] font-semibold text-gray-500">注意　</span>{o.cautions}</p>}
                  {o.search_query && (
                    <Link
                      href={`/pts?mode=papers&q=${encodeURIComponent(o.search_query)}`}
                      className="mt-3 inline-block rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-medium text-sky-900"
                    >
                      📚 この方法の論文を探す
                    </Link>
                  )}
                </article>
              ))}
            </div>

            {result.data.safety.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 rounded-2xl bg-red-50 py-3 pl-8 pr-4 text-sm leading-6 text-red-900">
                {result.data.safety.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
