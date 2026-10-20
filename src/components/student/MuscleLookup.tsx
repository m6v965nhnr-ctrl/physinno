"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { findAnatomy } from "@/lib/muscleMatch";

// 問題・解説に出てくる筋・骨を、1タップで確かめる（筋: 起始・停止・支配神経・作用／骨: 特徴・連結・付着する筋）
export default function MuscleLookup({ text }: { text: string }) {
  const { muscles, bones } = useMemo(() => findAnatomy(text), [text]);
  const [openId, setOpenId] = useState<string | null>(null);
  if (muscles.length + bones.length === 0) return null;

  const muscle = muscles.find((m) => m.id === openId);
  const bone = bones.find((x) => x.id === openId);
  const rows: [string, string][] = muscle
    ? [
        ["起始", muscle.origin],
        ["停止", muscle.insertion],
        ["支配神経", muscle.nerve],
        ["作用", muscle.action],
      ]
    : bone
      ? [
          ["特徴", bone.features],
          ["連結・関節", bone.joints],
          ["付着する主な筋", bone.muscles],
          ["ポイント", bone.notes],
        ]
      : [];
  const chips = [...muscles.slice(0, 12).map((m) => ({ id: m.id, name: m.name, bone: false })), ...bones.slice(0, 8).map((x) => ({ id: x.id, name: x.name, bone: true }))];

  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      <p className="text-xs font-semibold text-gray-700">出てきた{muscles.length ? "筋" : ""}{muscles.length && bones.length ? "・" : ""}{bones.length ? "骨" : ""}を確かめる</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={openId === c.id}
            onClick={() => setOpenId(openId === c.id ? null : c.id)}
            className={`rounded-full border px-3 py-1 text-xs ${
              openId === c.id
                ? c.bone ? "border-sky-500 bg-sky-50 text-sky-800" : "border-emerald-500 bg-emerald-50 text-emerald-800"
                : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      {(muscle || bone) && (
        <dl className="mt-3 space-y-2 rounded-lg bg-white p-3 text-xs leading-5 text-gray-700">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt className="font-semibold text-gray-500">{k}</dt>
              <dd className="text-sm leading-6 text-gray-900">{v}</dd>
            </div>
          ))}
          <p className="text-[11px] leading-4 text-gray-400">
            編集部がまとめた要約です。髄節などは教科書で確認してください。
            <Link href={`/columns/${muscle ? "muscles" : "bones"}#${openId}`} className="ml-1 text-blue-600 underline">
              {muscle ? "筋" : "骨"}の一覧を見る
            </Link>
          </p>
        </dl>
      )}
    </div>
  );
}
