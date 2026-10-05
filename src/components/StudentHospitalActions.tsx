"use client";

import { useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { addHospitalToTracker } from "@/lib/student";

// 病院ページの「見学したい」「実習先に追加」(学生用)。実習・就活トラッカーに追加する
export default function StudentHospitalActions({
  hospitalId,
  hospitalName,
}: {
  hospitalId: string;
  hospitalName: string;
}) {
  const [added, setAdded] = useState<"job" | "practicum" | null>(null);
  const [busy, setBusy] = useState(false);

  async function add(kind: "job" | "practicum") {
    setBusy(true);
    const error = await addHospitalToTracker({ hospitalId, hospitalName, kind });
    setBusy(false);

    if (error) {
      notify("トラッカーに追加できませんでした");
      return;
    }

    setAdded(kind);
    notify(kind === "job" ? "「気になる」としてトラッカーに追加しました" : "実習先としてトラッカーに追加しました");
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button
        onClick={() => add("job")}
        disabled={busy || added === "job"}
        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 disabled:opacity-60"
      >
        {added === "job" ? "追加しました" : "＋ 見学したい（就活）"}
      </button>
      <button
        onClick={() => add("practicum")}
        disabled={busy || added === "practicum"}
        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 disabled:opacity-60"
      >
        {added === "practicum" ? "追加しました" : "＋ 実習先に追加"}
      </button>
      {added && (
        <Link href="/student/tracker" className="text-xs text-gray-500 underline">
          トラッカーを開く
        </Link>
      )}
    </div>
  );
}
