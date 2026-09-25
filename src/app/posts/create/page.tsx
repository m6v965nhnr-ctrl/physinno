"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  ACHIEVEMENT_FIELD_CONFIG,
  AchievementCategory,
} from "@/lib/achievements";
import { notify } from "@/lib/notify";

const diseaseCategories = [
  "脳血管",
  "整形外科",
  "呼吸器",
  "循環器",
  "神経筋",
  "内部障害",
  "スポーツ",
  "その他",
];

type PostType = "normal" | AchievementCategory;

function isAchievementCategory(
  value: PostType | null
): value is AchievementCategory {
  return !!value && (ACHIEVEMENT_CATEGORIES as string[]).includes(value);
}

export default function CreatePostPage() {
  const [type, setType] = useState<PostType | null>(null);

  const [title, setTitle] = useState("");
  const [diseaseCategory, setDiseaseCategory] = useState("");
  const [content, setContent] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const [conferenceName, setConferenceName] = useState("");
  const [achievedOn, setAchievedOn] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [isPublic, setIsPublic] = useState(true);

  // 詳細情報（任意・カテゴリごとにポートフォリオ集計で使う）
  const [showDetails, setShowDetails] = useState(false);
  const [presenters, setPresenters] = useState("");
  const [coAuthors, setCoAuthors] = useState("");
  const [presentationFormat, setPresentationFormat] = useState("");
  const [award, setAward] = useState("");
  const [cpdPoints, setCpdPoints] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [instructor, setInstructor] = useState("");
  const [authors, setAuthors] = useState("");
  const [journalName, setJournalName] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [doi, setDoi] = useState("");
  const [pmid, setPmid] = useState("");
  const [readDate, setReadDate] = useState("");

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [posting, setPosting] = useState(false);

  function handleMediaChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMediaFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  async function uploadMedia(userId: string) {
    if (!mediaFile) {
      return null;
    }

    const extension =
      mediaFile.name.split(".").pop() || "file";

    const fileName =
      `${userId}/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("post-media")
      .upload(fileName, mediaFile);

    if (uploadError) {
      console.error("MEDIA UPLOAD ERROR", uploadError);
      notify("資料のアップロードに失敗しました");
      return null;
    }

    const { data } = supabase.storage
      .from("post-media")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleNormalPost() {
    if (!content.trim() && !mediaFile) {
      notify("本文または写真・動画・資料を入力してください");
      return;
    }

    setPosting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        notify("ログインしてください");
        return;
      }

      const mediaUrl = await uploadMedia(user.id);

      if (mediaFile && !mediaUrl) {
        return;
      }

      const { error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          title: null,
          content: content.trim(),
          image_url: mediaUrl,
          post_type: "normal",
          disease_category: diseaseCategory || null,
          reference_url: referenceUrl.trim() || null,
        });

      if (error) {
        console.error("NORMAL POST ERROR", error);
        notify("投稿に失敗しました");
        return;
      }

      notify("投稿しました");
      window.location.href = "/home";
    } finally {
      setPosting(false);
    }
  }

  async function handleAchievementPost() {
    if (!isAchievementCategory(type)) {
      return;
    }

    if (!title.trim()) {
      notify("タイトルを入力してください");
      return;
    }

    setPosting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        notify("ログインしてください");
        return;
      }

      const mediaUrl = await uploadMedia(user.id);

      if (mediaFile && !mediaUrl) {
        return;
      }

      const fieldConfig = ACHIEVEMENT_FIELD_CONFIG[type];

      let details: Record<string, string> = {};

      if (type === "conference") {
        details = {
          ...(presenters.trim() && { presenters: presenters.trim() }),
          ...(coAuthors.trim() && { co_authors: coAuthors.trim() }),
          ...(presentationFormat.trim() && {
            presentation_format: presentationFormat.trim(),
          }),
          ...(award.trim() && { award: award.trim() }),
          ...(cpdPoints.trim() && { cpd_points: cpdPoints.trim() }),
        };
      } else if (type === "training") {
        details = {
          ...(organizer.trim() && { organizer: organizer.trim() }),
          ...(instructor.trim() && { instructor: instructor.trim() }),
          ...(cpdPoints.trim() && { cpd_points: cpdPoints.trim() }),
        };
      } else if (type === "paper") {
        details = {
          ...(authors.trim() && { authors: authors.trim() }),
          ...(journalName.trim() && { journal_name: journalName.trim() }),
          ...(publishedYear.trim() && {
            published_year: publishedYear.trim(),
          }),
          ...(doi.trim() && { doi: doi.trim() }),
          ...(pmid.trim() && { pmid: pmid.trim() }),
          ...(readDate && { read_date: readDate }),
        };
      }

      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
        image_url: mediaUrl,
        post_type: type,
        conference_name: fieldConfig.showConferenceName
          ? conferenceName.trim() || null
          : null,
        achieved_on: achievedOn,
        is_public: isPublic,
        disease_category: diseaseCategory || null,
        reference_url: referenceUrl.trim() || null,
        details,
      });

      if (error) {
        console.error("ACHIEVEMENT POST ERROR", error);
        notify("実績の投稿に失敗しました");
        return;
      }

      notify("実績を投稿しました");
      window.location.href = isPublic ? "/home" : "/mypage/achievements";
    } finally {
      setPosting(false);
    }
  }

  /*
   * 投稿種類選択画面
   */
  if (!type) {
    return (
      <main className="min-h-screen bg-[#fafafa] pb-24">
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center px-5 py-4">
            <Link
              href="/home"
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100"
            >
              ←
            </Link>

            <h1 className="ml-3 text-lg font-semibold text-gray-900">
              投稿を作成
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-5 py-10">
          <h2 className="text-center text-xl font-semibold text-gray-900">
            何を投稿しますか？
          </h2>

          <p className="mt-2 text-center text-sm text-gray-400">
            投稿する内容を選択してください
          </p>

          <div className="mt-8 space-y-4">
            {/* 通常投稿 */}
            <button
              onClick={() => setType("normal")}
              className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-gray-400 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  📝
                </div>

                <div>
                  <p className="text-base font-semibold text-gray-900">
                    通常投稿
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    写真や動画、日々の気づきなどを投稿
                  </p>
                </div>
              </div>
            </button>

            {/* 実績（学会発表・院内症例発表・研修受講・論文・その他） */}
            {ACHIEVEMENT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setType(c)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-gray-400 hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                    🏅
                  </div>

                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {ACHIEVEMENT_CATEGORY_LABEL[c]}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {ACHIEVEMENT_CATEGORY_LABEL[c]}の実績を投稿
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  /*
   * 実績：詳細入力
   */
  if (isAchievementCategory(type)) {
    const fieldConfig = ACHIEVEMENT_FIELD_CONFIG[type];

    return (
      <main className="min-h-screen bg-[#fafafa] pb-24">
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
            <button
              onClick={() => setType(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100"
            >
              ←
            </button>

            <h1 className="text-lg font-semibold text-gray-900">
              {ACHIEVEMENT_CATEGORY_LABEL[type]}
            </h1>

            <button
              onClick={handleAchievementPost}
              disabled={posting}
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {posting ? "投稿中..." : "投稿"}
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-5 py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-5">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                {ACHIEVEMENT_CATEGORY_LABEL[type]}
              </span>
            </div>

            {fieldConfig.showConferenceName && (
              <div>
                <label className="text-sm font-semibold text-gray-900" htmlFor="field-1">
                  学会名
                </label>

                <input id="field-1"
                  value={conferenceName}
                  onChange={(event) =>
                    setConferenceName(event.target.value)
                  }
                  placeholder="例：日本理学療法学術大会"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </div>
            )}

            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-900" htmlFor="field-2">
                {fieldConfig.titlePlaceholder.split("（")[0]}
              </label>

              <input id="field-2"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={fieldConfig.titlePlaceholder}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-900" htmlFor="field-3">
                {fieldConfig.memoLabel}
              </label>

              <textarea id="field-3"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={fieldConfig.memoLabel}
                rows={5}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-900" htmlFor="field-4">
                実施日
              </label>

              <input id="field-4"
                type="date"
                value={achievedOn}
                onChange={(event) => setAchievedOn(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            {(type === "conference" ||
              type === "training" ||
              type === "paper") && (
              <div className="mt-6 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowDetails((v) => !v)}
                  className="text-sm text-relight-blue"
                >
                  {showDetails ? "詳細情報を閉じる" : "+ 詳細情報を追加（任意）"}
                </button>

                {showDetails && (
                  <div className="mt-4 space-y-3">
                    {type === "conference" && (
                      <>
                        <LabeledInput
                          label="発表者"
                          value={presenters}
                          onChange={setPresenters}
                          placeholder="例：山田太郎"
                        />
                        <LabeledInput
                          label="共著者"
                          value={coAuthors}
                          onChange={setCoAuthors}
                          placeholder="例：鈴木花子、佐藤次郎"
                        />
                        <LabeledInput
                          label="発表形式"
                          value={presentationFormat}
                          onChange={setPresentationFormat}
                          placeholder="例：口述発表、ポスター発表"
                        />
                        <LabeledInput
                          label="受賞歴"
                          value={award}
                          onChange={setAward}
                          placeholder="例：優秀演題賞"
                        />
                        <LabeledInput
                          label="CPDポイント"
                          value={cpdPoints}
                          onChange={setCpdPoints}
                          placeholder="例：5"
                          type="number"
                        />
                      </>
                    )}

                    {type === "training" && (
                      <>
                        <LabeledInput
                          label="主催団体"
                          value={organizer}
                          onChange={setOrganizer}
                          placeholder="例：日本理学療法士協会"
                        />
                        <LabeledInput
                          label="講師"
                          value={instructor}
                          onChange={setInstructor}
                          placeholder="例：山田太郎"
                        />
                        <LabeledInput
                          label="CPD単位・ポイント"
                          value={cpdPoints}
                          onChange={setCpdPoints}
                          placeholder="例：3"
                          type="number"
                        />
                      </>
                    )}

                    {type === "paper" && (
                      <>
                        <LabeledInput
                          label="著者"
                          value={authors}
                          onChange={setAuthors}
                          placeholder="例：山田太郎、鈴木花子"
                        />
                        <LabeledInput
                          label="雑誌名"
                          value={journalName}
                          onChange={setJournalName}
                          placeholder="例：理学療法学"
                        />
                        <LabeledInput
                          label="発表年"
                          value={publishedYear}
                          onChange={setPublishedYear}
                          placeholder="例：2026"
                          type="number"
                        />
                        <LabeledInput
                          label="DOI"
                          value={doi}
                          onChange={setDoi}
                          placeholder="例：10.1234/example"
                        />
                        <LabeledInput
                          label="PMID"
                          value={pmid}
                          onChange={setPmid}
                          placeholder="例：12345678"
                        />

                        <div>
                          <label className="text-sm font-semibold text-gray-900" htmlFor="field-5">
                            読了日
                          </label>

                          <input id="field-5"
                            type="date"
                            value={readDate}
                            onChange={(event) =>
                              setReadDate(event.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            <AttachmentFields
              diseaseCategory={diseaseCategory}
              setDiseaseCategory={setDiseaseCategory}
              mediaFile={mediaFile}
              previewUrl={previewUrl}
              onMediaChange={handleMediaChange}
              referenceUrl={referenceUrl}
              setReferenceUrl={setReferenceUrl}
            />

            <div className="mt-6 border-t border-gray-100 pt-5">
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ホームのフィードに公開する
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    オフにすると自分のマイページ集計にのみ反映されます
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(event) =>
                    setIsPublic(event.target.checked)
                  }
                  className="h-5 w-5"
                />
              </label>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * 通常投稿
   */
  return (
    <main className="min-h-screen bg-[#fafafa] pb-24">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <button
            onClick={() => setType(null)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100"
          >
            ←
          </button>

          <h1 className="text-lg font-semibold text-gray-900">
            通常投稿
          </h1>

          <button
            onClick={handleNormalPost}
            disabled={posting}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {posting ? "投稿中..." : "投稿"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            placeholder="今なにを共有しますか？"
            className="min-h-[180px] w-full resize-none text-sm text-gray-900 outline-none placeholder:text-gray-400"
           aria-label="今なにを共有しますか？"/>

          <AttachmentFields
            diseaseCategory={diseaseCategory}
            setDiseaseCategory={setDiseaseCategory}
            mediaFile={mediaFile}
            previewUrl={previewUrl}
            onMediaChange={handleMediaChange}
            referenceUrl={referenceUrl}
            setReferenceUrl={setReferenceUrl}
          />
        </div>
      </div>
    </main>
  );
}

// カテゴリ別の詳細項目（任意）用の共通ラベル付き入力欄
function LabeledInput({
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
function AttachmentFields({
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
      {/* 疾患分類 */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <label className="text-sm font-semibold text-gray-900" htmlFor="field-7">
          疾患分類（任意）
        </label>

        <select id="field-7"
          value={diseaseCategory}
          onChange={(event) => setDiseaseCategory(event.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
        >
          <option value="">指定しない</option>

          {diseaseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
