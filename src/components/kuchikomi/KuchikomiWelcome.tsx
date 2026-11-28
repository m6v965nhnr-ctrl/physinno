"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { getLocalUser } from "@/lib/authUser";
import { facilityReturnPath } from "@/lib/kuchikomi";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from "@/lib/ui";

const MAX_YEARS = 30;

// 登録の次の画面。経験年数を聞いて、口コミを書く職場を探す画面へ進む
export default function KuchikomiWelcome() {
  const router = useRouter();
  const [years, setYears] = useState("");
  const [next, setNext] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNext(facilityReturnPath(new URLSearchParams(window.location.search).get("next")));
    getLocalUser().then(({ data }) => {
      if (!data.user) router.replace("/kuchikomi/register");
    });
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!years || saving) return;
    setSaving(true);
    // shortcut: アカウントの情報に保存する（DBを変えない）。集計や表示に使うことになったら、列に移す
    const { error } = await supabase.auth.updateUser({ data: { rehab_experience_years: Number(years) } });
    if (error) {
      setSaving(false);
      notify("保存できませんでした。もう一度お試しください");
      return;
    }
    router.push(next ?? "/kuchikomi/write");
  }

  return (
    <div className="mx-auto max-w-md px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900" role="status">登録できました</h1>
      <p className="mt-2 text-sm leading-7 text-gray-700">あと1つだけ教えてください。</p>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="kw-years" className="mb-1 block text-sm font-bold text-gray-900">リハ職としての経験年数（これまでの職場の合計）</label>
          <p className="mb-2 text-xs leading-5 text-gray-600">例：いまの病院が2年目でも、前の職場と合わせて5年目なら「5年目」</p>
          <select id="kw-years" value={years} onChange={(e) => setYears(e.target.value)} className={INPUT_CLASS}>
            <option value="">選んでください</option>
            {Array.from({ length: MAX_YEARS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n === MAX_YEARS ? `${n}年目以上` : `${n}年目`}</option>
            ))}
          </select>
          <p className="mt-2 text-xs text-gray-500">経験年数は、口コミには表示しません。</p>
        </div>
        <button type="submit" disabled={!years || saving} className={PRIMARY_BUTTON_CLASS}>
          {saving ? "保存中…" : next ? "口コミを書く画面へ" : "口コミを書く病院や施設を探す"}
        </button>
      </form>
    </div>
  );
}
