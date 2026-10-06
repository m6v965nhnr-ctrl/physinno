"use client";

import {
  LEVELS,
  LEVEL_LABEL,
  TargetLevel,
  VISIBILITY_HINT,
  VISIBILITY_LABEL,
  Visibility,
} from "@/lib/posts";

export type Audience = {
  visibility: Visibility;
  titlePublic: boolean;
  anonymous: boolean;
  level: TargetLevel;
};

export const DEFAULT_AUDIENCE: Audience = {
  visibility: "public",
  titlePublic: false,
  anonymous: false,
  level: "all",
};

// 投稿に保存する列に直す
export function audiencePayload(a: Audience, hasTitle: boolean) {
  return {
    visibility: a.visibility,
    is_public: a.visibility === "public",
    title_public: a.visibility !== "public" && hasTitle ? a.titlePublic : false,
    is_anonymous: a.visibility === "public" ? a.anonymous : false,
    target_level: a.level,
  };
}

const VISIBILITIES = Object.keys(VISIBILITY_LABEL) as Visibility[];

// 投稿の「誰に見せるか」「匿名にするか」「題名だけ公開するか」「どのレベル向けか」
export default function PostAudienceFields({
  value,
  onChange,
  hasTitle,
  allowAnonymous = true,
}: {
  value: Audience;
  onChange: (next: Audience) => void;
  hasTitle: boolean;
  allowAnonymous?: boolean;
}) {
  const set = (patch: Partial<Audience>) => onChange({ ...value, ...patch });

  return (
    <fieldset className="mt-6 space-y-5 border-t border-gray-100 pt-5">
      <legend className="sr-only">公開の設定</legend>

      <div>
        <p className="text-sm font-semibold text-gray-900">誰に見せますか？</p>
        <div className="mt-2 space-y-2">
          {VISIBILITIES.map((v) => (
            <label
              key={v}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 ${
                value.visibility === v ? "border-gray-900 bg-gray-50" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="post-visibility"
                checked={value.visibility === v}
                onChange={() => set({ visibility: v, anonymous: v === "public" ? value.anonymous : false })}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-medium text-gray-900">{VISIBILITY_LABEL[v]}</span>
                <span className="block text-xs text-gray-500">{VISIBILITY_HINT[v]}</span>
              </span>
            </label>
          ))}
        </div>

        {value.visibility !== "public" && hasTitle && (
          <label className="mt-3 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={value.titlePublic}
              onChange={(e) => set({ titlePublic: e.target.checked })}
              className="mt-1 h-4 w-4"
            />
            <span>
              <span className="block text-sm font-medium text-gray-900">題名だけは、全員に見せる</span>
              <span className="block text-xs text-gray-500">
                本文や添付は、上で選んだ人にだけ見えます。題名だけ、ほかの人にも表示されます。
              </span>
            </span>
          </label>
        )}
      </div>

      {allowAnonymous && (
        <label
          className={`flex items-start gap-3 ${value.visibility === "public" ? "cursor-pointer" : "opacity-50"}`}
        >
          <input
            type="checkbox"
            checked={value.anonymous && value.visibility === "public"}
            disabled={value.visibility !== "public"}
            onChange={(e) => set({ anonymous: e.target.checked })}
            className="mt-1 h-4 w-4"
          />
          <span>
            <span className="block text-sm font-medium text-gray-900">匿名で投稿する</span>
            <span className="block text-xs leading-5 text-gray-500">
              ほかの人には、あなたの名前もプロフィールも表示されません（サーバーからも返しません）。
              自分のポートフォリオには載ります。「全員に公開」のときだけ選べます。
              勤務先や患者さんが特定される内容は、書かないでください。
            </span>
          </span>
        </label>
      )}

      <div>
        <label className="text-sm font-semibold text-gray-900" htmlFor="post-level">
          どのレベルの人向けですか？
        </label>
        <select
          id="post-level"
          value={value.level}
          onChange={(e) => set({ level: e.target.value as TargetLevel })}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {LEVEL_LABEL[l]}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          読む人が、自分の年次に合う投稿を絞り込めます。迷ったら「どのレベルでも」で大丈夫です。
        </p>
      </div>
    </fieldset>
  );
}
