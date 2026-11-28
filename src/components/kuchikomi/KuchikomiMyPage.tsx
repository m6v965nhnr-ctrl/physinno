"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getLocalUser } from "@/lib/authUser";
import { ErrorState } from "@/components/states";

type Mine = { id: string; hospital_id: string; overall_score: number; created_at: string; hospital: { name: string } | null };

// 「リハ職の本音」のマイページ。自分の口コミ・ログアウト・退会
export default function KuchikomiMyPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Mine[] | null>(null);
  const [email, setEmail] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getLocalUser();
      if (!data.user) {
        router.replace("/kuchikomi/login?next=%2Fkuchikomi%2Fmypage");
        return;
      }
      setEmail(data.user.email ?? "");
      const res = await supabase.from("hospital_reviews").select("id, hospital_id, overall_score, created_at, hospital:hospitals(name)").eq("user_id", data.user.id).order("created_at", { ascending: false });
      if (res.error) setFailed(true);
      else setRows(res.data as unknown as Mine[]);
    })();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/kuchikomi";
  }

  return (
    <div className="mx-auto max-w-md space-y-5 px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900">マイページ</h1>
      <section aria-labelledby="km-reviews">
        <h2 id="km-reviews" className="text-base font-bold text-gray-900">自分の口コミ</h2>
        {failed ? (
          <ErrorState message="口コミを読み込めませんでした。時間をおいて、もう一度お試しください" onRetry={() => location.reload()} />
        ) : rows === null ? (
          <p className="mt-2 text-sm text-gray-500" role="status">読み込み中…</p>
        ) : rows.length === 0 ? (
          <p className="mt-2 text-sm leading-6 text-gray-700">まだ口コミはありません。</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {rows.map((r) => (
              <li key={r.id} className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-sm font-bold text-gray-900">{r.hospital?.name ?? "施設"}</p>
                <p className="mt-0.5 text-xs text-gray-500">総合 {r.overall_score} / 10 ・ {new Date(r.created_at).toLocaleDateString("ja-JP")}</p>
                <div className="mt-2 flex gap-4 text-xs font-semibold">
                  <Link href={`/kuchikomi/${r.hospital_id}`} className="underline">見る</Link>
                  <Link href={`/kuchikomi/${r.hospital_id}/write`} className="underline">直す</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link href="/kuchikomi/write" className="mt-3 inline-block rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">口コミを書く</Link>
      </section>
      <section className="rounded-2xl bg-white p-4">
        <p className="break-all text-xs text-gray-500">{email}</p>
        <div className="mt-3 flex items-center justify-between">
          <button type="button" onClick={logout} className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800">ログアウト</button>
          <Link href="/kuchikomi/mypage/delete" className="text-xs text-gray-500 underline">退会する</Link>
        </div>
      </section>
    </div>
  );
}
