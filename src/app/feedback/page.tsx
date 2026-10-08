"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

const CATEGORIES = [
  { key: "request", label: "こんな機能がほしい" },
  { key: "problem", label: "困っていること・使いにくい所" },
  { key: "question", label: "質問" },
  { key: "other", label: "その他" },
] as const;

const ROLES = [
  { key: "pt", label: "理学療法士" },
  { key: "student", label: "学生" },
  { key: "researcher", label: "研究者" },
  { key: "general", label: "一般の方" },
  { key: "other", label: "その他" },
] as const;

// 意見箱: ログインなし・匿名で、意見や困りごとを送れる。ログイン中でも、アカウントとはひも付けない
export default function FeedbackPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["key"]>("request");
  const [role, setRole] = useState<string>("");
  const [body, setBody] = useState("");
  const [contact, setContact] = useState("");
  // 自動投稿を避けるための、人には見えない欄（入っていたら、送らない）
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    if (trap) return;
    if (body.trim().length < 3) {
      notify("内容を入力してください");
      return;
    }
    setSending(true);
    const { error } = await supabase.rpc("submit_feedback", {
      p_body: body,
      p_category: category,
      p_role: role || null,
      p_contact: contact || null,
    });
    setSending(false);

    if (error) {
      notify(error.message.includes("混み合って") ? "ただいま混み合っています。しばらくしてからお試しください" : "送信に失敗しました。時間をおいてお試しください");
      return;
    }
    setDone(true);
  }

  const input = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm";
  const label = "mb-1 block text-sm font-semibold text-gray-900";
  const chip = (on: boolean) =>
    `rounded-full px-4 py-2 text-sm transition ${on ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-700"}`;

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← Re:light
        </Link>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">意見箱</h1>
        <p className="mt-2 text-sm leading-7 text-gray-700">
          みんなで、このアプリを作っていきたいと思っています。今、困っていること、こんな機能がほしい、使いにくい所など、なんでも教えてください。
        </p>
        <p className="mt-2 rounded-xl bg-white p-3 text-xs leading-6 text-gray-600">
          <strong className="text-gray-900">匿名で送れます。</strong>
          ログインは、いりません。ログイン中でも、あなたのアカウントとは、ひも付けません。返信がほしいときだけ、連絡先を書いてください（任意）。患者さんが特定される情報は、書かないでください。
        </p>

        {done ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="text-lg font-bold text-emerald-900">送ってくれて、ありがとうございます。</p>
            <p className="mt-2 text-sm leading-6 text-emerald-900">いただいた意見は、大切に読んで、アプリの改善に生かします。</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setBody("");
                  setContact("");
                  setDone(false);
                }}
                className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-medium text-emerald-900"
              >
                もう1件、送る
              </button>
              <Link href="/" className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
                トップへ戻る
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div>
              <p className={label}>どんなことですか？</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button key={c.key} type="button" aria-pressed={category === c.key} onClick={() => setCategory(c.key)} className={chip(category === c.key)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="fb-body" className={label}>
                内容 <span className="text-xs font-normal text-red-600">（必須）</span>
              </label>
              <textarea
                id="fb-body"
                value={body}
                rows={7}
                maxLength={2000}
                onChange={(e) => setBody(e.target.value)}
                placeholder="例：実習のとき、こんな情報があったら助かる／この画面が分かりにくい／こんな機能がほしい"
                className={input}
              />
              <p className="mt-1 text-right text-xs text-gray-500">{body.length} / 2000</p>
            </div>

            <div>
              <p className={label}>あなたは？（任意）</p>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button key={r.key} type="button" aria-pressed={role === r.key} onClick={() => setRole(role === r.key ? "" : r.key)} className={chip(role === r.key)}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="fb-contact" className={label}>
                返信がほしいときの連絡先（任意）
              </label>
              <input id="fb-contact" value={contact} maxLength={200} onChange={(e) => setContact(e.target.value)} placeholder="メールアドレス、またはInstagramのユーザー名" className={input} />
            </div>

            {/* 人には見えない欄 */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                空のままにしてください
                <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </label>
            </div>

            <button onClick={submit} disabled={sending} className="w-full rounded-full bg-black py-3 text-sm font-medium text-white disabled:opacity-40">
              {sending ? "送信しています…" : "匿名で、送る"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
