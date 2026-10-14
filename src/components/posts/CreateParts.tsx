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

import MediaPicker from "@/components/posts/MediaPicker";

// 疾患分類・写真動画資料の添付・参考URL（通常投稿・実績投稿どちらでも使う共通項目）
export function AttachmentFields({
  diseaseCategory,
  setDiseaseCategory,
  mediaFiles,
  setMediaFiles,
  referenceUrl,
  setReferenceUrl,
}: {
  diseaseCategory: string;
  setDiseaseCategory: (value: string) => void;
  mediaFiles: File[];
  setMediaFiles: (files: File[]) => void;
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
        <MediaPicker files={mediaFiles} onChange={setMediaFiles} />
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
