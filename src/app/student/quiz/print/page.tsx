"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMyAccount } from "@/lib/useMyAccount";
import { PrintQuestion, imageUrl, listPrintQuestions } from "@/lib/quiz";

const SESSION_LABEL = { am: "午前", pm: "午後" } as const;

// 印刷用ページ: 問題・正答・解説を1回分まとめて表示する。ブラウザの「印刷」から、PDFとして保存できる
export default function QuizPrintPage() {
  const { loading } = useMyAccount(["student", "pt"]);

  const [exam, setExam] = useState<number | null>(null);
  const [session, setSession] = useState<"am" | "pm">("am");
  const [rows, setRows] = useState<PrintQuestion[] | null>(null);
  const [withAnswers, setWithAnswers] = useState(true);
  const [withExplain, setWithExplain] = useState(true);

  useEffect(() => {
    if (loading) return;
    const q = new URLSearchParams(window.location.search);
    const e = Number(q.get("exam"));
    const s = q.get("session") === "pm" ? "pm" : "am";
    setExam(e);
    setSession(s);
    listPrintQuestions(e, s).then(setRows);
  }, [loading]);

  if (loading || exam === null || rows === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const title = `第${exam}回 理学療法士国家試験 ${SESSION_LABEL[session]}`;

  return (
    <main className="min-h-screen bg-white pb-16 text-gray-900 print:pb-0">
      <div className="mx-auto max-w-3xl px-6 py-6 print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
          <Link href="/student/quiz" className="text-sm text-gray-400">
            ← 過去問ドリル
          </Link>
          <div className="mt-3 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm">
            <p className="font-semibold">{title}　印刷・PDF保存</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={withAnswers} onChange={(e) => setWithAnswers(e.target.checked)} />
              正答を入れる
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={withExplain}
                disabled={!withAnswers}
                onChange={(e) => setWithExplain(e.target.checked)}
              />
              解説を入れる（AI作成）
            </label>
            <button onClick={() => window.print()} className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
              印刷する／PDFで保存する
            </button>
            <p className="text-xs leading-5 text-gray-500">
              表示された印刷画面で、送信先（プリンター）に「PDFに保存」を選ぶと、PDFにできます。問題だけの版は「正答を入れる」を外してください。
            </p>
          </div>
        </div>

        <h1 className="mt-6 text-lg font-bold print:mt-0">{title}</h1>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          問題・正答の出典: 厚生労働省ホームページ（理学療法士国家試験の問題および正答）。図は、厚生労働省が公開しているものです。
          {withAnswers && withExplain ? "解説はAIが作成したもので、誤りを含むことがあります。" : ""}
          Re:light（https://relight-1wet.vercel.app）で作成。
        </p>

        <div className="mt-4 space-y-5">
          {rows.map((q) => (
            <section key={q.id} className="break-inside-avoid border-t border-gray-200 pt-3">
              <p className="text-sm font-semibold">
                {q.no}
                {q.excluded && <span className="ml-2 text-xs font-normal text-gray-500">（採点から除外された問題）</span>}
              </p>
              {q.intro && <p className="mt-1 text-xs leading-6 text-gray-600">{q.intro}</p>}
              <p className="mt-1 whitespace-pre-wrap text-sm leading-7">{q.stem}</p>

              {q.book_images.map((p) => (
                <img key={p} src={imageUrl(p)} alt="別冊の図" className="mt-2 max-h-72 object-contain" />
              ))}
              {q.image && <img src={imageUrl(q.image)} alt="問題の図" className="mt-2 max-h-80 object-contain" />}

              {!q.choices_in_image && (
                <ol className="mt-2 space-y-0.5 text-sm leading-6">
                  {q.choices.map((c, i) => (
                    <li key={i}>
                      {i + 1}．{c}
                    </li>
                  ))}
                </ol>
              )}

              {withAnswers && (
                <p className="mt-2 text-sm font-semibold">
                  正答:{" "}
                  {q.answers.length === 0
                    ? "（採点の対象から除外）"
                    : q.answers.map((s) => s.join("・")).join(" または ")}
                </p>
              )}
              {withAnswers && withExplain && q.explanation && (
                <p className="mt-1 whitespace-pre-wrap text-xs leading-6 text-gray-700">{q.explanation}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
