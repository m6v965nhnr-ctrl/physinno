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
  ["hospitals", "病院を探す"],
];
const OTHER_MODES: [SearchMode, string][] = [
  ["hospitals", "病院を探す"],
  ["pts", "PTを探す"],
];

export default function PTSearchPage() {
  return (
    <Suspense fallback={null}>
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

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setLoggedIn(!!user);
      if (user) {
        const accountType = await getMyAccountType(user.id);
        setIsPt(isPtLike(accountType));
      }
    });
  }, []);

  const modes = isPt ? PT_MODES : OTHER_MODES;
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
              modes.length === 3 ? "grid-cols-3" : "grid-cols-2"
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
            <h1 className="text-3xl font-semibold mb-1">病院を探す</h1>
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
