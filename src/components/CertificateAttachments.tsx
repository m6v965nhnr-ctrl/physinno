"use client";

import { useEffect, useRef, useState } from "react";
import {
  Attachment,
  deleteAttachment,
  listAttachments,
  uploadAttachment,
} from "@/lib/portfolio";
import { notify } from "@/lib/notify";

// 実績投稿ごとに証明書・受講証明PDFなどを複数保存できる領域。
// 汎用のattachmentsテーブル(entity_type="post")を再利用し、更新時の
// 書類探しをなくす「デジタル保管庫」として使えるようにする。
export default function CertificateAttachments({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    setAttachments(await listAttachments("post", postId));
    setLoading(false);
  }

  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);

    const error = await uploadAttachment({
      userId,
      entityType: "post",
      entityId: postId,
      file,
      isPublic: false,
    });

    setUploading(false);

    if (error) {
      notify(error);
      return;
    }

    await load();
  }

  async function handleDelete(id: string) {
    const error = await deleteAttachment(id);
    if (error) {
      notify(error);
      return;
    }
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        📎 証明書・資料{open ? " ▲" : " ▼"}
      </button>

      {open && (
        <div className="mt-2 space-y-2 rounded-xl bg-gray-50 p-3">
          {loading && (
            <p className="text-xs text-gray-400">読み込み中…</p>
          )}

          {!loading && attachments.length === 0 && (
            <p className="text-xs text-gray-400">
              まだ添付されていません
            </p>
          )}

          {attachments.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2"
            >
              <a
                href={a.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 truncate text-xs text-gray-700 hover:underline"
              >
                📄 {a.file_name || "ファイル"}
              </a>

              <button
                onClick={() => handleDelete(a.id)}
                className="shrink-0 text-gray-300 hover:text-gray-500"
                aria-label="削除"
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full rounded-full border border-gray-200 bg-white py-2 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? "アップロード中…" : "＋ 証明書を追加（非公開）"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileSelected}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
