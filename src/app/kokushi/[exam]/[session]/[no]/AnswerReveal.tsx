"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 登録していなくても、解説はこの数まで読める（端末ごとに数える）
const FREE_EXPLANATIONS = 3;
const STORAGE_KEY = "relight:kokushi-free-explanations";

function readViewed(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function saveViewed(list: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // 保存できない環境（プライベートモードなど）では数えない
  }
}

type Explanation =
  | { state: "idle" | "loading" }
  | { state: "shown"; text: string | null; source: string | null; freeLeft: number | null }
  | { state: "locked" };

type Props = {
  examNo: number;
  session: "am" | "pm";
  no: number;
  choices: string[];
  choicesInImage: boolean;
  answers: number[][];
  need: number;
  excluded: boolean;
};

// 選択肢を選んで「答え合わせ」→ 正答を表示する（正答は厚生労働省の発表）
export default function AnswerReveal({ examNo, session, no, choices, choicesInImage, answers, need, excluded }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [explanation, setExplanation] = useState<Explanation>({ state: "idle" });

  // 答え合わせのあとに解説を出す。ログイン中は何問でも、未登録は3問まで
  async function loadExplanation() {
    setExplanation({ state: "loading" });

    const key = `${examNo}-${session}-${no}`;
    const {
      data: { session: authSession },
    } = await supabase.auth.getSession();

    let freeLeft: number | null = null;

    if (!authSession) {
      const viewed = readViewed();
      if (!viewed.includes(key)) {
        if (viewed.length >= FREE_EXPLANATIONS) {
          setExplanation({ state: "locked" });
          return;
        }
        viewed.push(key);
        saveViewed(viewed);
      }
      freeLeft = Math.max(0, FREE_EXPLANATIONS - viewed.length);
    }

    const { data } = await supabase.rpc("quiz_public_explanation", {
      p_exam: examNo,
      p_session: session,
      p_no: no,
    });
    const row = (data ?? [])[0] as { explanation: string | null; explanation_source: string | null } | undefined;
    setExplanation({
      state: "shown",
      text: row?.explanation ?? null,
      source: row?.explanation_source ?? null,
      freeLeft,
    });
  }

  function reveal() {
    setRevealed(true);
    void loadExplanation();
  }

  const correctSet = new Set(answers.flat());
  const isCorrect =
    answers.some((a) => a.length === selected.length && a.every((n) => selected.includes(n)));

  const count = choicesInImage ? 5 : choices.length;
  const labels = Array.from({ length: count }, (_, i) => i + 1);

  function toggle(n: number) {
    if (revealed) return;
    setSelected((prev) => {
      if (prev.includes(n)) return prev.filter((x) => x !== n);
      if (need === 1) return [n];
      return prev.length >= need ? prev : [...prev, n];
    });
  }

  return (
    <div>
      {need > 1 && <p className="mb-3 text-sm font-semibold text-gray-800">{need}つ選んでください</p>}
      <ol className="space-y-2">
        {labels.map((n) => {
          const chosen = selected.includes(n);
          const right = revealed && correctSet.has(n);
          const wrong = revealed && chosen && !correctSet.has(n);
          return (
            <li key={n}>
              <button
                type="button"
                onClick={() => toggle(n)}
                aria-pressed={chosen}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-base transition ${
                  right
                    ? "border-emerald-500 bg-emerald-50"
                    : wrong
                      ? "border-red-400 bg-red-50"
                      : chosen
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-400"
                }`}
              >
                <span className="font-semibold text-gray-900">{n}.</span>
                <span className="text-gray-800">{choicesInImage ? `（図の${n}）` : choices[n - 1]}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {!revealed ? (
        <button
          type="button"
          onClick={reveal}
          className="mt-5 w-full rounded-full bg-black px-6 py-3.5 text-base font-semibold text-white disabled:opacity-40"
        >
          {selected.length === 0 ? "正答を見る" : "答え合わせ"}
        </button>
      ) : (
        <div className="mt-5 rounded-2xl bg-white p-5" aria-live="polite">
          {selected.length > 0 && (
            <p className={`text-lg font-bold ${isCorrect ? "text-emerald-700" : "text-red-600"}`}>
              {isCorrect ? "正解！" : "不正解"}
            </p>
          )}
          <p className="mt-1 text-base text-gray-900">
            正答：{answers.map((a) => a.join("・")).join(" または ")}
          </p>
          {excluded && (
            <p className="mt-2 text-sm text-gray-600">この問題は、厚生労働省の発表で採点から除外されています。</p>
          )}

          <div className="mt-4 border-t border-gray-100 pt-4">
            {explanation.state === "loading" && <p className="text-sm text-gray-500">解説を読み込み中…</p>}

            {explanation.state === "shown" && (
              <>
                <p className="text-sm font-semibold text-gray-900">
                  解説{explanation.source === "ai" && <span className="ml-1 text-xs font-normal text-gray-500">（AIが作成。誤りがある場合があります）</span>}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-base leading-8 text-gray-800">
                  {explanation.text || "この問題の解説は準備中です。"}
                </p>
                {explanation.freeLeft !== null && (
                  <p className="mt-3 rounded-xl bg-cyan-50 px-4 py-3 text-sm leading-6 text-gray-800">
                    {explanation.freeLeft > 0
                      ? `登録なしで読める解説は、あと${explanation.freeLeft}問です。`
                      : "登録なしで読める解説は、これで最後です。"}
                    <Link href="/register?type=student" className="ml-1 font-semibold underline">
                      無料登録で全1,000問の解説が読めます
                    </Link>
                  </p>
                )}
              </>
            )}

            {explanation.state === "locked" && (
              <div className="rounded-2xl bg-relight-gradient px-5 py-4 text-white">
                <p className="text-base font-semibold">続きの解説は、無料登録で読めます</p>
                <p className="mt-1 text-sm leading-6 text-white/95">
                  登録なしで読める解説は{FREE_EXPLANATIONS}問までです。登録は無料・1分で、全1,000問の解説、間違えた問題の復習、模擬試験が使えます。
                </p>
                <Link
                  href="/register?type=student"
                  className="mt-3 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
                >
                  無料で登録して解説を読む
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
