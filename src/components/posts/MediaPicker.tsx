"use client";

import { useEffect, useMemo } from "react";
import { MAX_MEDIA_BYTES, mediaKind } from "@/lib/postMedia";
import { notify } from "@/lib/notify";

// 写真・動画・PDFを何枚でも選べる。すでに付いているもの（existing）は、編集のときだけ渡す
export default function MediaPicker({
  files,
  onChange,
  existing = [],
  onRemoveExisting,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  existing?: string[];
  onRemoveExisting?: (url: string) => void;
}) {
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  function add(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = ""; // 同じファイルをもう一度選べるように
    const ok = picked.filter((f) => f.size <= MAX_MEDIA_BYTES);
    if (ok.length < picked.length) notify("50MBを超えるファイルは追加できません");
    if (ok.length > 0) onChange([...files, ...ok]);
  }

  const total = existing.length + files.length;

  function tile(key: string, kind: ReturnType<typeof mediaKind>, src: string, name: string, onRemove: () => void) {
    return (
      <div key={key} className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        {kind === "image" ? (
          <img loading="lazy" decoding="async" src={src} alt="" className="h-full w-full object-cover" />
        ) : kind === "video" ? (
          <video src={src} muted playsInline className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
            <span className="text-3xl">📄</span>
            <span className="line-clamp-2 break-all text-[10px] text-gray-600">{name}</span>
          </div>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="この添付を外す"
          className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-4 transition hover:bg-gray-50">
        <span className="text-2xl">📎</span>
        <div>
          <p className="text-sm font-medium text-gray-900">
            写真・動画・資料を追加{total > 0 ? `（${total}件）` : ""}
          </p>
          <p className="mt-1 text-xs text-gray-400">写真・動画・PDFを、何枚でも選べます（1つ50MBまで）</p>
        </div>
        <input type="file" multiple accept="image/*,video/*,.pdf" onChange={add} className="hidden" />
      </label>

      {total > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {existing.map((u) => tile(u, mediaKind(u), u, decodeURIComponent(u.split("/").pop() ?? ""), () => onRemoveExisting?.(u)))}
          {files.map((f, i) =>
            tile(
              `${f.name}-${i}`,
              f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf") ? "pdf" : f.type.startsWith("video/") ? "video" : "image",
              previews[i],
              f.name,
              () => onChange(files.filter((_, j) => j !== i))
            )
          )}
        </div>
      )}
    </div>
  );
}
