"use client";

import { useState } from "react";
import Link from "next/link";
import ReportButton from "@/components/ReportButton";
import { notify } from "@/lib/notify";
import { ptNameWithTitle } from "@/lib/format";
import { PHASE_LABEL, PtIdea, REACTION_LABEL, ReactionKind, deleteIdea, toggleReaction } from "@/lib/ideas";

// PTが投稿したアイデア1件。いいね・保存・実践した、通報、（自分の投稿は）削除
export default function PtIdeaCard({
  idea,
  onChanged,
  searchHint,
}: {
  idea: PtIdea;
  onChanged: () => void;
  // 論文検索に渡す語（疾患名）
  searchHint: string;
}) {
  const [state, setState] = useState(idea);
  const [busy, setBusy] = useState<ReactionKind | null>(null);

  async function react(kind: ReactionKind) {
    if (busy) return;
    setBusy(kind);
    const on = await toggleReaction(state.id, kind);
    setBusy(null);
    if (on === null) {
      notify("操作に失敗しました");
      return;
    }
    const key = kind === "like" ? "like" : kind === "save" ? "save" : "practiced";
    setState((s) => ({
      ...s,
      [`my_${key}`]: on,
      [`${key}_count`]: s[`${key}_count` as const] + (on ? 1 : -1),
    }));
  }

  async function remove() {
    if (!confirm("このアイデアを削除します。元に戻せません。よろしいですか？")) return;
    const ok = await deleteIdea(state.id);
    if (!ok) {
      notify("削除に失敗しました");
      return;
    }
    onChanged();
  }

  const author = state.is_anonymous
    ? "匿名のPT"
    : [state.author_name ? ptNameWithTitle(state.author_name) : "PT", state.author_qualification, state.author_experience ? `${state.author_experience}年目` : null]
        .filter(Boolean)
        .join("・");

  const field = (label: string, value: string | null) =>
    value ? (
      <div className="mt-2">
        <p className="text-[11px] font-semibold text-gray-500">{label}</p>
        <p className="whitespace-pre-wrap text-sm leading-6 text-gray-800">{value}</p>
      </div>
    ) : null;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-800">
          {PHASE_LABEL[state.phase]}
        </span>
        <span className="text-[11px] text-gray-400">{state.created_at.slice(0, 10)}</span>
      </div>

      <h3 className="mt-2 text-base font-semibold text-gray-900">{state.title}</h3>
      {field("目的", state.goal)}
      {field("リハビリの方法", state.method)}
      {field("実施のポイント", state.points)}
      {field("対象の患者さんの特徴", state.patient_traits)}
      {field("やってみて感じたこと", state.impressions)}
      {field("参考文献", state.refs)}

      <p className="mt-3 text-xs text-gray-500">
        {state.author_id && !state.is_anonymous ? (
          <Link href={`/pts/${state.author_id}`} className="underline">
            {author}
          </Link>
        ) : (
          author
        )}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {(["like", "save", "practiced"] as const).map((k) => {
          const on = state[`my_${k}` as const];
          const count = state[`${k}_count` as const];
          return (
            <button
              key={k}
              onClick={() => react(k)}
              disabled={busy !== null}
              aria-pressed={on}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                on ? "border-sky-300 bg-sky-100 text-sky-900" : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {REACTION_LABEL[k].icon} {on ? REACTION_LABEL[k].on : REACTION_LABEL[k].off}
              {count > 0 && <span className="ml-1 font-semibold">{count}</span>}
            </button>
          );
        })}
        <Link
          href={`/pts?mode=papers&q=${encodeURIComponent(`${state.title} ${searchHint}`)}`}
          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
        >
          📚 論文を探す
        </Link>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <ReportButton targetType="clinical_idea" targetId={state.id} />
        {state.is_mine && (
          <button onClick={remove} className="text-xs text-gray-400 underline">
            削除
          </button>
        )}
      </div>
    </article>
  );
}
