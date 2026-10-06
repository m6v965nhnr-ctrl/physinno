"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { findPrivacyRisk } from "@/lib/privacyCheck";
import { useMyAccount } from "@/lib/useMyAccount";

type Mode = "structure" | "sources";

type StructureResult = {
  summary?: string;
  strengths?: string[];
  improvements?: string[];
  missing?: string[];
  questions?: string[];
  typos?: { original?: string; suggestion?: string; reason?: string }[];
};

type SourcesResult = {
  pico?: { p?: string; i?: string; c?: string; o?: string };
  queries?: { label?: string; ja?: string; en?: string }[];
  tips?: string[];
};

const MODE_INFO: Record<Mode, { title: string; hint: string; placeholder: string; limit: number }> = {
  structure: {
    title: "構成・誤字脱字チェック",
    hint: "レポートの一部（考察など）を貼ると、構成や抜けに加えて、誤字脱字・表記のゆれ・文末の不統一も点検して、考えを深める問いを返します。書き直しや代筆はしません。",
    placeholder: "例: 【考察】本症例では、…（患者さんの氏名・年齢・日付など、個人が特定できる情報は書かないでください）",
    limit: 6000,
  },
  sources: {
    title: "考察に使う論文を探す",
    hint: "調べたい臨床疑問を書くと、PICOで整理して、論文検索に使う検索語を提案します。",
    placeholder: "例: 脳卒中後の片麻痺患者に対して、課題指向型練習は歩行速度の改善に有効か",
    limit: 1500,
  },
};

function List({ title, items, tone = "gray" }: { title: string; items?: string[]; tone?: "gray" | "amber" | "emerald" }) {
  if (!items || items.length === 0) return null;

  const tones = {
    gray: "bg-gray-50 text-gray-700",
    amber: "bg-amber-50 text-amber-900",
    emerald: "bg-emerald-50 text-emerald-900",
  };

  return (
    <div className={`rounded-2xl p-4 ${tones[tone]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ReportHelperPage() {
  const { loading } = useMyAccount(["student", "pt"]);

  const [mode, setMode] = useState<Mode>("structure");
  const [text, setText] = useState("");
  const [running, setRunning] = useState(false);
  const [structure, setStructure] = useState<StructureResult | null>(null);
  const [sources, setSources] = useState<SourcesResult | null>(null);

  const info = MODE_INFO[mode];
  const risk = text ? findPrivacyRisk(text) : null;

  async function handleRun() {
    if (!text.trim() || running) return;

    setRunning(true);
    setStructure(null);
    setSources(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    try {
      const res = await fetch("/api/student/report-helper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({ mode, text }),
      });

      const data = await res.json();

      if (!res.ok) {
        notify(data.error || "うまくいきませんでした。時間をおいてもう一度お試しください");
        return;
      }

      if (mode === "structure") setStructure(data.result as StructureResult);
      else setSources(data.result as SourcesResult);
    } catch {
      notify("通信に失敗しました。もう一度お試しください");
    } finally {
      setRunning(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student" className="text-sm text-gray-400">
            ← 学生ホーム
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">実習レポート支援（AI）</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            自分で書くための手助けをします。レポートの代筆や、模範解答の作成はしません。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-sm" role="tablist">
          {(Object.keys(MODE_INFO) as Mode[]).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setStructure(null);
                setSources(null);
              }}
              className={`flex-1 rounded-full px-2 py-2 ${
                mode === m ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {MODE_INFO[m].title}
            </button>
          ))}
        </div>

        <p className="text-xs leading-5 text-gray-500">{info.hint}</p>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={info.limit}
            rows={mode === "structure" ? 10 : 4}
            placeholder={info.placeholder}
            aria-label={info.title}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm leading-6 text-gray-900"
          />
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400">
            <span>
              {text.length}/{info.limit}文字
            </span>
          </div>

          {risk && (
            <p className="mt-2 rounded-xl bg-red-50 p-3 text-xs leading-5 text-red-700">
              {risk}が含まれているようです。患者さんや個人が特定できる情報を取り除いてください（取り除くまで、AIには送れません）。
            </p>
          )}

          <p className="mt-2 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
            入力した文章は、AIサービス（Google）に送信されます。氏名・年齢・日付・病院名など、患者さんや実習先が特定できる情報は入れないでください。
            AIの返答には誤りが含まれることがあります。必ず教科書・論文・指導者の指導で確認してください。
          </p>

          <button
            onClick={handleRun}
            disabled={running || !text.trim() || !!risk}
            className="mt-3 w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            {running ? "考え中…" : mode === "structure" ? "構成・誤字脱字をチェックする" : "検索語を提案してもらう"}
          </button>
        </div>

        {structure && (
          <section className="space-y-3">
            {structure.summary && (
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">全体の印象</p>
                <p className="mt-2 text-sm leading-7 text-gray-700">{structure.summary}</p>
              </div>
            )}
            <List title="良い点" items={structure.strengths} tone="emerald" />
            <List title="改善できる点" items={structure.improvements} tone="amber" />
            <List title="抜けている・弱い要素" items={structure.missing} />
            <List title="考えを深める問い" items={structure.questions} />

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">誤字脱字・表記のチェック</p>
              {structure.typos && structure.typos.length > 0 ? (
                <ul className="mt-3 space-y-3">
                  {structure.typos.map((t, i) => (
                    <li key={i} className="rounded-xl bg-gray-50 p-3 text-sm leading-6">
                      <p className="text-gray-500 line-through decoration-red-300">{t.original}</p>
                      <p className="mt-0.5 font-medium text-gray-900">→ {t.suggestion}</p>
                      {t.reason && <p className="mt-0.5 text-xs text-gray-500">{t.reason}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-gray-500">大きな誤字脱字や表記のゆれは見つかりませんでした。</p>
              )}
              <p className="mt-3 text-[11px] leading-5 text-gray-400">
                AIの指摘は完全ではありません。見落としや、誤った指摘もあります。最後は、必ず自分の目で読み直してください。
              </p>
            </div>
            <p className="text-center text-[11px] text-gray-400">
              考察で使う論文は、「考察に使う論文を探す」のタブでも探せます。
            </p>
          </section>
        )}

        {sources && (
          <section className="space-y-3">
            {sources.pico && (
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">臨床疑問の整理（PICO）</p>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
                  {(
                    [
                      ["P", "対象", sources.pico.p],
                      ["I", "介入", sources.pico.i],
                      ["C", "比較", sources.pico.c],
                      ["O", "アウトカム", sources.pico.o],
                    ] as const
                  ).map(([key, label, value]) => (
                    <div key={key} className="contents">
                      <dt className="text-gray-500">
                        {key}（{label}）
                      </dt>
                      <dd className="text-gray-800">{value || "—"}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {sources.queries && sources.queries.length > 0 && (
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">この検索語で論文を探す</p>
                <ul className="mt-3 space-y-3">
                  {sources.queries.map((q, i) => (
                    <li key={i} className="text-sm">
                      <p className="text-xs text-gray-500">{q.label}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {q.ja && (
                          <Link
                            href={`/pts?tab=search&mode=papers&q=${encodeURIComponent(q.ja)}`}
                            className="rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50"
                          >
                            🔍 {q.ja}
                          </Link>
                        )}
                        {q.en && (
                          <Link
                            href={`/pts?tab=search&mode=papers&q=${encodeURIComponent(q.en)}`}
                            className="rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50"
                          >
                            🔍 {q.en}
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <List title="探し方のコツ" items={sources.tips} />
          </section>
        )}
      </div>
    </main>
  );
}
