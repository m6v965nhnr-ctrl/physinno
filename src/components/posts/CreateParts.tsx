"use client";

import { DISEASE_CATEGORIES } from "@/lib/diseaseCategories";

// カテゴリ別の詳細項目（任意）用の共通ラベル付き入力欄
export function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-900" htmlFor="field-6">{label}</label>

      <input id="field-6"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
      />
    </div>
  );
}

// 疾患分類・写真動画資料の添付・参考URL（通常投稿・実績投稿どちらでも使う共通項目）
export function AttachmentFields({
  diseaseCategory,
  setDiseaseCategory,
  mediaFile,
  previewUrl,
  onMediaChange,
  referenceUrl,
  setReferenceUrl,
}: {
  diseaseCategory: string;
  setDiseaseCategory: (value: string) => void;
  mediaFile: File | null;
  previewUrl: string | null;
  onMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  referenceUrl: string;
  setReferenceUrl: (value: string) => void;
}) {
  return (
    <>
      {/* 疾患分類（投稿検索の「疾患分類」と同じ選択肢） */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <p className="text-sm font-semibold text-gray-900">疾患分類（任意）</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["", ...DISEASE_CATEGORIES].map((category) => {
            const active = diseaseCategory === category;
            return (
              <button
                key={category || "none"}
                type="button"
                aria-pressed={active}
                onClick={() => setDiseaseCategory(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  active ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category || "指定しない"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 添付資料 */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-4 transition hover:bg-gray-50">
          <span className="text-2xl">📎</span>

          <div>
            <p className="text-sm font-medium text-gray-900">
              写真・動画・資料を追加
            </p>

            <p className="mt-1 text-xs text-gray-400">
              写真・動画・PDFなどを1つ選択できます
            </p>
          </div>

          <input
            type="file"
            accept="image/*,video/*,.pdf"
            onChange={onMediaChange}
            className="hidden"
          />
        </label>

        {previewUrl && mediaFile && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100">
            {mediaFile.type === "application/pdf" ? (
              <div className="flex items-center gap-3 bg-gray-50 p-5">
                <span className="text-3xl">📄</span>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {mediaFile.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">PDF資料</p>
                </div>
              </div>
            ) : mediaFile.type.startsWith("video/") ? (
              <video
                src={previewUrl}
                controls
                className="max-h-[500px] w-full object-contain"
              />
            ) : (
              <img loading="lazy" decoding="async"
                src={previewUrl}
                alt="資料プレビュー"
                className="max-h-[500px] w-full object-contain"
              />
            )}
          </div>
        )}
      </div>

      {/* 参考URL */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <label className="text-sm font-semibold text-gray-900" htmlFor="field-8">
          参考URL（任意）
        </label>

        <input id="field-8"
          type="url"
          value={referenceUrl}
          onChange={(event) => setReferenceUrl(event.target.value)}
          placeholder="https://example.com"
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
        />

        <p className="mt-2 text-xs text-gray-400">
          関連する論文・資料・WebページなどのURLを入力できます
        </p>
      </div>
    </>
  );
}
