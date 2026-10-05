"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const DISMISS_KEY = "relight:review-nudge-dismissed";

// 勤務先の病院が登録されていて、まだ口コミを書いていないPTに投稿を促す
export default function HospitalReviewNudge({ userId }: { userId: string }) {
  const [target, setTarget] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!userId) return;

    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // 保存できない環境でも案内自体は出す
    }

    (async () => {
      const { data: pt } = await supabase
        .from("pt_profiles")
        .select("hospital_id")
        .eq("user_id", userId)
        .maybeSingle();
      if (!pt?.hospital_id) return;

      const [{ data: hospital }, { count }] = await Promise.all([
        supabase.from("hospitals").select("id, name").eq("id", pt.hospital_id).maybeSingle(),
        supabase
          .from("hospital_reviews")
          .select("id", { count: "exact", head: true })
          .eq("hospital_id", pt.hospital_id)
          .eq("user_id", userId),
      ]);

      if (hospital && !count) setTarget({ id: hospital.id, name: hospital.name });
    })();
  }, [userId]);

  if (!target) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // 無視
    }
    setTarget(null);
  }

  return (
    <div className="mx-5 mt-4 rounded-2xl bg-emerald-50 p-4">
      <Link href={`/hospitals/${target.id}?review=1`} className="block">
        <p className="text-sm font-semibold text-emerald-800">
          {target.name}の口コミを書きませんか？
        </p>
        <p className="mt-1 text-xs leading-5 text-emerald-700">
          職場環境・教育体制・給与など6項目の点数だけでOK。匿名でも投稿できます →
        </p>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className="mt-2 text-xs text-emerald-700 underline"
      >
        今後は表示しない
      </button>
    </div>
  );
}
