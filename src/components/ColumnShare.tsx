"use client";

import LineShareButton from "@/components/LineShareButton";
import { notify } from "@/lib/notify";

// 記事の共有（X・LINE・リンクのコピー）。読者が広めやすいように、記事の下に置く
export default function ColumnShare({ title, path }: { title: string; path: string }) {
  const url = `https://relight-1wet.vercel.app${path}`;
  const text = `${title}｜Re:light`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      notify("リンクをコピーしました");
    } catch {
      notify("コピーできませんでした");
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4">
      <p className="text-xs font-semibold text-gray-600">この記事を、同期や後輩に共有する</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-full bg-black py-2.5 text-sm font-semibold text-white"
        >
          𝕏 ポスト
        </a>
        <LineShareButton text={text} url={url} label="LINE" />
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700"
        >
          🔗 コピー
        </button>
      </div>
    </div>
  );
}
