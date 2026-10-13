"use client";

import { useState } from "react";
import Link from "next/link";
import { askConfirm } from "@/lib/confirm";
import { deleteMyAccount } from "@/lib/accountDeletion";
import { notify } from "@/lib/notify";

const CONFIRM_WORD = "退会する";

// 退会（アカウントの削除）。取り消せないので、内容を読んで、確認の言葉を入力してもらう
export default function DeleteAccountPage() {
  const [keepPosts, setKeepPosts] = useState(true);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const ready = typed.trim() === CONFIRM_WORD && !busy;

  async function handleDelete() {
    if (!ready) return;

    const ok = await askConfirm(
      "本当に退会しますか？\nアカウントと、あなたの情報を削除します。この操作は、取り消せません。",
      { okLabel: "退会する", danger: true }
    );
    if (!ok) return;

    setBusy(true);
    setError("");

    const result = await deleteMyAccount(keepPosts);
    if (!result.ok) {
      setError(result.message);
      setBusy(false);
      return;
    }

    notify("退会しました。ご利用ありがとうございました");
    window.location.href = "/";
  }

  const optionClass = (on: boolean) =>
    `block cursor-pointer rounded-2xl border-2 p-4 text-sm leading-6 ${
      on ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white"
    }`;

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-28">
      <div className="mx-auto max-w-lg">
        <Link href="/mypage" className="text-sm text-gray-500">
          ← マイページ
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">退会（アカウントの削除）</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          退会すると、アカウントと、あなたの情報が削除されます。<strong>この操作は、取り消せません。</strong>
        </p>

        <section className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-800">
          <p className="font-semibold">削除されるもの</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>プロフィール・非公開の情報（連絡先・誕生日・免許番号など）・アイコンなどの画像</li>
            <li>コメント・いいね・フォロー・メッセージ・通知</li>
            <li>ポートフォリオ・学習の記録・保存した論文や研修・病院の口コミ・実習先の口コミ</li>
            <li>あなたのメールアドレスと、ログイン情報</li>
          </ul>
          <p className="mt-3 text-xs leading-5 text-gray-600">
            バックアップに残る情報は、一定期間のあとに消去されます。病院の基本情報（コミュニティで登録された情報）は残りますが、あなたとの結びつきは外れます。
          </p>
        </section>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-gray-900">あなたの投稿は、どうしますか？</legend>

          <label className={`mt-3 ${optionClass(keepPosts)}`}>
            <input
              type="radio"
              name="keep"
              checked={keepPosts}
              onChange={() => setKeepPosts(true)}
              className="mr-2 align-middle"
            />
            <span className="font-semibold">匿名にして、残す</span>
            <span className="mt-1 block text-xs text-gray-600">
              投稿は、あなたとの結びつきを切って、匿名で残ります。ほかの人が学べる内容を、残したいときに。
              ただし、投稿の文章に、あなたの名前や勤務先などを書いていた場合は、そのまま残ります。
            </span>
          </label>

          <label className={`mt-3 ${optionClass(!keepPosts)}`}>
            <input
              type="radio"
              name="keep"
              checked={!keepPosts}
              onChange={() => setKeepPosts(false)}
              className="mr-2 align-middle"
            />
            <span className="font-semibold">投稿も、削除する</span>
            <span className="mt-1 block text-xs text-gray-600">
              投稿と、その投稿についたコメント・いいねも、すべて削除されます。
            </span>
          </label>
        </fieldset>

        <section className="mt-6 text-sm leading-6 text-gray-700">
          <p>
            運営のアカウントは、この画面から退会できません。退会せずに、通知やメールだけ止めたいときは、
            <Link href="/notifications" className="underline">
              通知の設定
            </Link>
            をご利用ください。
          </p>
        </section>

        <label className="mt-6 block text-sm font-medium" htmlFor="confirm-word">
          確認のため、「{CONFIRM_WORD}」と入力してください
          <input
            id="confirm-word"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoComplete="off"
            className="mt-1 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-normal outline-none focus:border-gray-900"
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleDelete}
          disabled={!ready}
          className="mt-6 w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          {busy ? "削除しています…" : "退会する"}
        </button>

        <Link
          href="/mypage"
          className="mt-3 block w-full rounded-full border border-gray-300 bg-white py-3 text-center text-sm font-medium text-gray-700"
        >
          やめる
        </Link>
      </div>
    </main>
  );
}
