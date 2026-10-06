"use client";

import { useState } from "react";

type Props = {
  choices: string[];
  choicesInImage: boolean;
  answers: number[][];
  need: number;
  excluded: boolean;
};

// 選択肢を選んで「答え合わせ」→ 正答を表示する（正答は厚生労働省の発表）
export default function AnswerReveal({ choices, choicesInImage, answers, need, excluded }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

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
          onClick={() => setRevealed(true)}
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
        </div>
      )}
    </div>
  );
}
