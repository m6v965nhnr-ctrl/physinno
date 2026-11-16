"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalUser } from "@/lib/authUser";
import { canPostWorkplaceReview, clearProfessionCache, getMyAccountType, getMyProfession, type AccountType, type Profession } from "@/lib/account";
import { KUCHIKOMI_REGISTER } from "@/lib/kuchikomi";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { withReturnTo } from "@/lib/returnTo";
import FacilitySearch from "@/components/kuchikomi/FacilitySearch";

const HERE = "/kuchikomi/write";

// 「口コミを書く」の入口。登録・職種の選択・施設の検索を、1つの流れにする
export default function WriteFlow() {
  const [state, setState] = useState<"loading" | "guest" | "ready">("loading");
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [profession, setProfession] = useState<Profession | null>(null);
  const [workplace, setWorkplace] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await getLocalUser();
      const uid = data.user?.id ?? null;
      if (!uid) {
        if (alive) setState("guest");
        return;
      }
      const [type, prof] = await Promise.all([getMyAccountType(uid), getMyProfession(uid)]);
      if (!alive) return;
      setAccountType(type);
      setProfession(prof);
      setState("ready");
      if (canPostWorkplaceReview(type, prof)) {
        const { data: p } = await supabase.from("pt_profiles").select("hospital_id").eq("user_id", uid).maybeSingle();
        const hid = (p as { hospital_id: string | null } | null)?.hospital_id;
        if (!hid) return;
        const { data: h } = await supabase.from("hospitals").select("id, name").eq("id", hid).maybeSingle();
        if (alive && h) setWorkplace(h as { id: string; name: string });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function chooseProfession(p: "ot" | "st") {
    const { error } = await supabase.rpc("set_my_profession", { p_profession: p });
    if (error) {
      notify("職種を保存できませんでした。もう一度お試しください");
      return;
    }
    clearProfessionCache();
    setProfession(p);
  }

  if (state === "loading") return <p className="text-sm text-gray-500" role="status">読み込み中…</p>;

  if (state === "guest") {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-bold text-gray-900">まず、無料登録（1分）</h2>
        <p className="mt-2 text-sm leading-7 text-gray-700">登録のとき、職種（理学療法士・作業療法士・言語聴覚士）を選びます。口コミは匿名で投稿できます。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`${KUCHIKOMI_REGISTER}&next=${encodeURIComponent(HERE)}`} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">無料で登録する</Link>
          <Link href={withReturnTo("/login", HERE)} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">ログイン</Link>
        </div>
      </div>
    );
  }

  if (accountType === "general" && !profession) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-bold text-gray-900">職種を選んでください（自己申告）</h2>
        <p className="mt-2 text-sm leading-7 text-gray-700">口コミを書けるのは、理学療法士・作業療法士・言語聴覚士です。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => chooseProfession("ot")} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-500">作業療法士</button>
          <button type="button" onClick={() => chooseProfession("st")} className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-500">言語聴覚士</button>
        </div>
      </div>
    );
  }

  if (!canPostWorkplaceReview(accountType, profession)) {
    return (
      <p className="rounded-2xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700">
        口コミを書けるのは、現役の理学療法士・作業療法士・言語聴覚士です。{accountType === "student" ? "学生の方は、実習先での経験を、病院ページの「実習生の声」に書けます。" : ""}
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {workplace && (
        <div className="rounded-3xl bg-relight-gradient p-5">
          <p className="text-xs font-bold text-gray-900/70">プロフィールの勤務先</p>
          <p className="mt-1 text-base font-black text-gray-900">{workplace.name}</p>
          <Link href={`/hospitals/${workplace.id}?tab=reviews&review=1`} className="mt-3 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900">この職場の口コミを書く（1分）</Link>
        </div>
      )}
      <div>
        <h2 className="text-base font-bold text-gray-900">{workplace ? "ほかの職場（以前の職場など）を探す" : "口コミを書く職場を探す"}</h2>
        <div className="mt-3"><FacilitySearch mode="write" /></div>
      </div>
    </div>
  );
}
