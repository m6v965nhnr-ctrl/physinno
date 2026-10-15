"use client";

import { REFERENCE_URL_ERROR, safeHttpUrl } from "@/lib/url";
import PostAudienceFields, { Audience, DEFAULT_AUDIENCE, audiencePayload } from "@/components/PostAudienceFields";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  ACHIEVEMENT_FIELD_CONFIG,
  AchievementCategory,
} from "@/lib/achievements";
import { notify } from "@/lib/notify";
import { uploadPostMedia } from "@/lib/postMedia";
import { AttachmentFields, LabeledInput } from "@/components/posts/CreateParts";

// 症例報告（投稿検索の「症例報告」で探せる）
type PostType = "normal" | "case" | AchievementCategory;
type FormType = "case" | AchievementCategory;

// 題名つきで入力する投稿（症例報告と実績）
function isAchievementCategory(
  value: PostType | null
): value is FormType {
  return !!value && (value === "case" || (ACHIEVEMENT_CATEGORIES as string[]).includes(value));
}

const FORM_LABEL: Record<FormType, string> = {
  case: "症例報告",
  ...ACHIEVEMENT_CATEGORY_LABEL,
};

const FORM_FIELD_CONFIG: Record<
  FormType,
  { titlePlaceholder: string; memoLabel: string; showConferenceName: boolean }
> = {
  case: {
    titlePlaceholder: "症例のタイトル（例: 脳梗塞後の右片麻痺、歩行自立までの経過）",
    memoLabel: "症例の概要（患者さんが特定される情報は書かないでください）",
    showConferenceName: false,
  },
  ...ACHIEVEMENT_FIELD_CONFIG,
};

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
  const [audience, setAudience] = useState<Audience>(DEFAULT_AUDIENCE);

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

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const [posting, setPosting] = useState(false);

  // 研修情報の「参加した」から来たときは、種類・題名・日付・主催を最初から入れておく
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presetType = params.get("type");

    if (presetType && (ACHIEVEMENT_CATEGORIES as string[]).includes(presetType)) {
      setType(presetType as AchievementCategory);
    }

    const presetTitle = params.get("title");
    if (presetTitle) setTitle(presetTitle.slice(0, 200));

    const presetDate = params.get("date");
    if (presetDate && /^\d{4}-\d{2}-\d{2}$/.test(presetDate)) setAchievedOn(presetDate);

    const presetOrganizer = params.get("organizer");
    if (presetOrganizer) {
      setOrganizer(presetOrganizer.slice(0, 100));
      setShowDetails(true);
    }
  }, []);

  async function handleNormalPost() {
    if (!content.trim() && mediaFiles.length === 0) {
      notify("本文または写真・動画・資料を入力してください");
      return;
    }

    if (referenceUrl.trim() && !safeHttpUrl(referenceUrl)) {
      notify(REFERENCE_URL_ERROR);
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

      const mediaUrls = await uploadPostMedia(user.id, mediaFiles);

      if (!mediaUrls) {
        return;
      }

      const { error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          title: null,
          content: content.trim(),
          image_url: mediaUrls[0] ?? null,
          media_urls: mediaUrls,
          post_type: "normal",
          disease_category: diseaseCategory || null,
          reference_url: safeHttpUrl(referenceUrl),
          ...audiencePayload(audience, false),
        });

      if (error) {
        console.error("NORMAL POST ERROR", error);
        notify("投稿に失敗しました");
        return;
      }

      notify("投稿しました");
      window.location.href =
        audience.visibility === "group" && audience.groupId
          ? `/groups/${audience.groupId}`
          : audience.visibility === "private" ? "/mypage" : "/home";
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

    if (referenceUrl.trim() && !safeHttpUrl(referenceUrl)) {
      notify(REFERENCE_URL_ERROR);
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

      const mediaUrls = await uploadPostMedia(user.id, mediaFiles);

      if (!mediaUrls) {
        return;
      }

      const fieldConfig = FORM_FIELD_CONFIG[type];

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
        image_url: mediaUrls[0] ?? null,
          media_urls: mediaUrls,
        post_type: type,
        conference_name: fieldConfig.showConferenceName
          ? conferenceName.trim() || null
          : null,
        achieved_on: achievedOn,
        ...audiencePayload(audience, title.trim() !== ""),
        disease_category: diseaseCategory || null,
        reference_url: safeHttpUrl(referenceUrl),
        details,
      });

      if (error) {
        console.error("ACHIEVEMENT POST ERROR", error);
        notify("投稿に失敗しました");
        return;
      }

      notify(type === "case" ? "症例を投稿しました" : "実績を投稿しました");
      window.location.href =
        audience.visibility === "group" && audience.groupId
          ? `/groups/${audience.groupId}`
          : audience.visibility === "private" ? "/mypage/achievements" : "/home";
    } finally {
      setPosting(false);
    }
  }

  /*
   * 投稿種類選択画面
   */
  if (!type) {
    return (
      <main className="flex min-h-dvh flex-col bg-[#fafafa] pb-24">
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


        {/* スマホでは、いちばん下のカードの下辺が、下のメニューの上にちょうど来るよう、残りの高さを均等に使う */}
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-3">
          <div className="flex flex-1 flex-col gap-2">
            {(
              [
                { key: "normal", icon: "📝", title: "通常投稿", desc: "写真や動画、日々の気づきなどを投稿" },
                { key: "case", icon: "🩺", title: "症例報告", desc: "担当した症例を共有・相談" },
                ...ACHIEVEMENT_CATEGORIES.map((c) => ({
                  key: c as string,
                  icon: "🏅",
                  title: ACHIEVEMENT_CATEGORY_LABEL[c],
                  desc: `${ACHIEVEMENT_CATEGORY_LABEL[c]}の実績を投稿`,
                })),
              ] as { key: string; icon: string; title: string; desc: string }[]
            ).map((item) => (
              <button
                key={item.key}
                onClick={() => setType(item.key as PostType)}
                className="flex w-full flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-left transition hover:border-gray-400 hover:shadow-sm sm:flex-none"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg">
                  {item.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-900">{item.title}</span>
                  <span className="block truncate text-xs text-gray-500">{item.desc}</span>
                </span>
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
    const fieldConfig = FORM_FIELD_CONFIG[type];

    return (
      <main className="min-h-screen bg-[#fafafa] pb-24">
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
            <button
              aria-label="投稿の種類の選択に戻る"
              onClick={() => setType(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100"
            >
              ←
            </button>

            <h1 className="text-lg font-semibold text-gray-900">
              {FORM_LABEL[type]}
            </h1>

            <button
              onClick={handleAchievementPost}
              disabled={posting}
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {posting ? "投稿中…" : "投稿"}
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-5 py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-5">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                {FORM_LABEL[type]}
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
                className="mt-2 block w-full min-w-0 max-w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
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
                            className="mt-2 block w-full min-w-0 max-w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
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
              mediaFiles={mediaFiles}
              setMediaFiles={setMediaFiles}
              referenceUrl={referenceUrl}
              setReferenceUrl={setReferenceUrl}
            />

            <PostAudienceFields value={audience} onChange={setAudience} hasTitle={title.trim() !== ""} />
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
            aria-label="投稿の種類の選択に戻る"
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
            {posting ? "投稿中…" : "投稿"}
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
            mediaFiles={mediaFiles}
            setMediaFiles={setMediaFiles}
            referenceUrl={referenceUrl}
            setReferenceUrl={setReferenceUrl}
          />

          <PostAudienceFields value={audience} onChange={setAudience} hasTitle={false} />
        </div>
      </div>
    </main>
  );
}
