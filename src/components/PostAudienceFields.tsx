"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { listMyGroups } from "@/lib/groups";
import {
  LEVELS,
  LEVEL_SHORT,
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
  // visibility が "group" のとき、公開するグループ
  groupId: string | null;
};

export const DEFAULT_AUDIENCE: Audience = {
  visibility: "public",
  titlePublic: false,
  anonymous: false,
  level: "all",
  groupId: null,
};

// 投稿に保存する列に直す
export function audiencePayload(a: Audience, hasTitle: boolean) {
  const isGroup = a.visibility === "group" && !!a.groupId;
  const visibility = a.visibility === "group" && !a.groupId ? "private" : a.visibility;
  return {
    visibility,
    is_public: visibility === "public",
    // グループ向けの投稿は、題名もメンバーにしか見せない
    title_public: visibility !== "public" && !isGroup && hasTitle ? a.titlePublic : false,
    is_anonymous: visibility === "public" ? a.anonymous : false,
    target_level: a.level,
    group_id: isGroup ? a.groupId : null,
  };
}

const VISIBILITIES = Object.keys(VISIBILITY_LABEL) as Visibility[];

type MyGroup = { id: string; name: string };

// 自分が参加しているグループ（投稿をグループのメンバーだけに公開するときに使う）
function useMyGroups() {
  const [groups, setGroups] = useState<MyGroup[]>([]);
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const rows = await listMyGroups(user.id);
      setGroups(rows.map((g) => ({ id: g.id, name: g.name })));
    });
  }, []);
  return groups;
}

const levelChip = (active: boolean) =>
  `rounded-full px-4 py-1.5 text-sm font-medium transition ${
    active ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
  }`;

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
  const groups = useMyGroups();
  // 参加しているグループがあるときだけ「グループのメンバーだけ」を選べる
  const options = VISIBILITIES.filter((v) => v !== "group" || groups.length > 0 || value.visibility === "group");

  return (
    <fieldset className="mt-6 space-y-5 border-t border-gray-100 pt-5">
      <legend className="sr-only">公開の設定</legend>

      <div>
        <p className="text-sm font-semibold text-gray-900">誰に見せますか？</p>
        <div className="mt-2 space-y-2">
          {options.map((v) => (
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
                onChange={() =>
                  set({
                    visibility: v,
                    anonymous: v === "public" ? value.anonymous : false,
                    groupId: v === "group" ? value.groupId ?? groups[0]?.id ?? null : null,
                  })
                }
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-medium text-gray-900">{VISIBILITY_LABEL[v]}</span>
                <span className="block text-xs text-gray-500">{VISIBILITY_HINT[v]}</span>
              </span>
            </label>
          ))}
        </div>

        {value.visibility === "group" && (
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-500" htmlFor="post-group">
              公開するグループ
            </label>
            <select
              id="post-group"
              value={value.groupId ?? ""}
              onChange={(e) => set({ groupId: e.target.value || null })}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {value.visibility !== "public" && value.visibility !== "group" && hasTitle && (
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
        <p className="text-sm font-semibold text-gray-900">レベル（どのレベルの人向けですか？）</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={value.level === l}
              onClick={() => set({ level: l })}
              className={levelChip(value.level === l)}
            >
              {l === "all" ? "どのレベルでも" : LEVEL_SHORT[l]}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          「投稿検索」のレベルで絞り込んだときに出ます。迷ったら「どのレベルでも」で大丈夫です。
        </p>
      </div>
    </fieldset>
  );
}
