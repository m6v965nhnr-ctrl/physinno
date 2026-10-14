"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType, isPtLike } from "@/lib/account";
import SeminarNews from "@/components/SeminarNews";
import PaperSearch from "@/components/PaperSearch";
import HospitalSearch from "@/components/HospitalSearch";
import IdeasBrowser from "@/components/IdeasBrowser";
import PtSearchPanel from "@/components/PtSearchPanel";

type SearchMode = "papers" | "ideas" | "hospitals" | "pts";

// PT: 論文 / 臨床アイデア / 病院（PTを探すは、ホームの「PT検索」へ）。それ以外（一般・未ログイン）: 病院 / PT
const PT_MODES: [SearchMode, string][] = [
  ["papers", "論文を探す"],
  ["ideas", "臨床アイデア"],
  ["hospitals", "病院口コミ"],
];
// ログインしていない訪問者（ゲスト閲覧）: 論文 / 臨床アイデア / 病院 / PT。見て触れる（保存・投稿・AIなどは登録後）
const GUEST_MODES: [SearchMode, string][] = [
  ["papers", "論文"],
  ["ideas", "臨床アイデア"],
  ["hospitals", "病院口コミ"],
  ["pts", "PT"],
];
const OTHER_MODES: [SearchMode, string][] = [
  ["hospitals", "病院を探す"],
  ["pts", "PTを探す"],
];

export default function PTSearchPage() {
  return (
    <Suspense
      fallback={
        // 最初のHTML（検索エンジンが読む部分）。画面が準備できると、検索の画面に置き換わる
        <main className="mx-auto max-w-2xl px-5 py-10">
          <h1 className="text-2xl font-semibold text-gray-900">PT・論文・病院を探す</h1>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            全国の理学療法士（PT）を地域や専門分野から探せます。論文は、日本語でも英語でも、PubMedなど9つのサイトをまとめて検索。
            病院は、基本情報と、職場環境の口コミを確認できます。
          </p>
        </main>
      }
    >
      <PTSearchPageInner />
    </Suspense>
  );
}

function PTSearchPageInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // タブ選択をURLに保持しておくと、病院ページ等から戻った時に直前のタブのまま復元できる
  function updateUrlParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }



  // PTアカウントのみ「Events（研修・学会情報）」タブと「論文を探す」を表示
  const [isPt, setIsPt] = useState(false);
  const [tab, setTab] = useState<"search" | "news">(
    () => (searchParams.get("tab") as "search" | "news") || "search"
  );
  const [searchMode, setSearchMode] = useState<SearchMode | null>(
    () => searchParams.get("mode") as SearchMode | null
  );

  // ログインしていない訪問者（検索エンジン経由など）には登録を案内する
  const [loggedIn, setLoggedIn] = useState(true);

  // 立場の確認が終わるまでは、タブを出さない（確認前の仮の状態が、一瞬、他の人向けの画面として見えるのを防ぐ）
  const [roleChecked, setRoleChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setLoggedIn(!!user);
      if (user) {
        const accountType = await getMyAccountType(user.id);
        // 種類がまだ入っていない古いアカウントは、下のメニューと同じく、PTとして扱う
        setIsPt(accountType === null || isPtLike(accountType));
      }
      setRoleChecked(true);
    });
  }, []);

  const modes = isPt ? PT_MODES : !loggedIn ? GUEST_MODES : OTHER_MODES;
  if (!roleChecked) return <main className="min-h-screen bg-white px-6 py-8 pb-24" />;
  // URLやタブの指定がないとき・選べないモードのときは、いちばん左のタブ
  const mode: SearchMode =
    searchMode && modes.some(([key]) => key === searchMode) ? searchMode : modes[0][0];

  return (
    <main className="search-large min-h-screen bg-white px-6 py-8 pb-24">
      <div className="max-w-3xl mx-auto">
        {isPt && (
          <div
            role="tablist"
            aria-label="検索の種類"
            className="mb-5 grid grid-cols-2 rounded-full bg-gray-100 p-1 text-sm font-medium"
          >
            {([["search", "Search"], ["news", "Events"]] as const).map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => {
                  setTab(key);
                  updateUrlParam("tab", key);
                }}
                className={`rounded-full py-2.5 transition ${
                  tab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {!(isPt && tab === "news") && (
          <div
            role="tablist"
            aria-label="探すの種類"
            className={`mb-5 grid ${
              modes.length === 4 ? "grid-cols-4" : modes.length === 3 ? "grid-cols-3" : "grid-cols-2"
            } rounded-full border border-gray-200 p-1 text-sm font-medium`}
          >
            {modes.map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={mode === key}
                onClick={() => {
                  setSearchMode(key);
                  updateUrlParam("mode", key);
                }}
                className={`rounded-full py-2 transition ${
                  mode === key ? "bg-gray-900 text-white" : "text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {isPt && tab === "news" ? (
          <SeminarNews />
        ) : mode === "papers" ? (
          <>
            <h1 className="text-3xl font-semibold mb-3">論文を探す</h1>
            <PaperSearch />
          </>
        ) : mode === "ideas" ? (
          <>
            <h1 className="text-3xl font-semibold mb-3">臨床アイデア</h1>
            <IdeasBrowser />
          </>
        ) : mode === "hospitals" ? (
          <>
            {/* PTは、病院の職場口コミを見る場所として使う */}
            <h1 className="text-3xl font-semibold mb-1">{isPt || !loggedIn ? "病院口コミ" : "病院を探す"}</h1>
            <HospitalSearch />
          </>
        ) : (
          <>
            <PtSearchPanel loggedIn={loggedIn} />
          </>
        )}
      </div>
    </main>
  );
}
