"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

// 「学生」として設定する小さなフォーム（卒業予定年・学校名）。設定できたら、学生用の画面へ移る
export default function StudentSetupForm() {
  const [gradYear, setGradYear] = useState("");
  const [school, setSchool] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 卒業予定年の選択肢（4月以降は、来年から。サーバー側の決まりと同じ）
  const jst = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const minYear = jst.getFullYear() + (jst.getMonth() + 1 <= 3 ? 0 : 1);
  const years = Array.from({ length: 7 }, (_, i) => minYear + i);

  async function submit() {
    if (!gradYear || saving) {
      setError("卒業予定年を選んでください");
      return;
    }
    setSaving(true);
    setError("");
    const { error: rpcError } = await supabase.rpc("become_student", {
      p_graduation_year: Number(gradYear),
      p_school: school.trim() || null,
    });
    setSaving(false);
    if (rpcError) {
      setError("設定できませんでした。時間をおいて、もう一度お試しください");
      return;
    }
    window.location.href = "/student/settings?welcome=1";
  }

  return (
    <div className="space-y-2 rounded-2xl bg-gray-50 p-3">
      <select
        value={gradYear}
        onChange={(e) => setGradYear(e.target.value)}
        aria-label="卒業予定年"
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
      >
        <option value="">卒業予定年を選ぶ</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}年（{y}年3月卒業予定）
          </option>
        ))}
      </select>
      <input
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        maxLength={80}
        placeholder="学校名（任意）"
        aria-label="学校名"
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
      />
      {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
      <button
        type="button"
        onClick={submit}
        disabled={saving}
        className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "設定しています…" : "学生として設定する"}
      </button>
    </div>
  );
}
