"use client";

import { lineShareUrl } from "@/lib/share";

// 「LINEで送る」ボタン。緑のLINEらしい色で、押すとLINEの送り先選択へ
export default function LineShareButton({
  text,
  url,
  label = "LINEで送る",
  className = "",
}: {
  text: string;
  url: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={lineShareUrl(text, url)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-full bg-[#06C755] py-2.5 text-sm font-semibold text-white ${className}`}
    >
      <span aria-hidden="true">💬</span>
      {label}
    </a>
  );
}
