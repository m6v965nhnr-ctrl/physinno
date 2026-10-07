"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType, isPtLike } from "@/lib/account";
import SeminarNews from "@/components/SeminarNews";
import PaperSearch from "@/components/PaperSearch";
import HospitalSearch from "@/components/HospitalSearch";
import type { PtProfile } from "@/lib/types";
import { ptNameWithTitle, toHiragana } from "@/lib/format";

type SearchMode = "papers" | "hospitals" | "pts";

// PT: 論文 / 病院 / PT。それ以外（一般・未ログイン）: 病院 / PT
const PT_MODES: [SearchMode, string][] = [
  ["papers", "論文を探す"],
  ["hospitals", "病院を探す"],
  ["pts", "PTを探す"],
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

// PostgREST の or() 条件に入れても壊れないように、区切り文字やワイルドカードを取り除く
function sanitize(text: string) {
  return text.replace(/[,()%*\\]/g, " ").trim();
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

  const [pts, setPts] = useState<PtProfile[]>([]);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);

  const [name, setName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [specialty, setSpecialty] = useState("");

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

  async function searchPT() {
    const nameQuery = sanitize(name);
    const prefQuery = sanitize(prefecture);
    const specialtyQuery = sanitize(specialty);

    // 条件が1つもないときは一覧を出さない（検索してヒットした人だけを表示する）
    if (!nameQuery && !prefQuery && !specialtyQuery) {
      setPts([]);
      setSearched(false);
      return;
    }

    setSearching(true);

    let query = supabase
      .from("pt_profiles")
      .select("*")
      // 名前が未入力の空プロフィールは出さない
      .not("full_name", "is", null)
      .neq("full_name", "")
      // 学生のアカウントは検索結果に出さない
      .eq("is_student", false)
      .order("rating", { ascending: false, nullsFirst: false })
      .limit(50);

    if (nameQuery) {
      // 漢字は名前、ひらがな・カタカナは「ふりがな」でも探す（空白は無視）
      const compact = nameQuery.replace(/\s+/g, "");
      const kana = toHiragana(compact);
      query = query.or(
        [
          `full_name.ilike.%${nameQuery}%`,
          `full_name.ilike.%${compact}%`,
          `full_name_kana.ilike.%${kana}%`,
        ].join(",")
      );
    }

    if (prefQuery) query = query.ilike("prefecture", `%${prefQuery}%`);
    if (specialtyQuery) query = query.ilike("specialty", `%${specialtyQuery}%`);

    const { data } = await query;

    setPts([...(data || [])].sort((a, b) => (b.rating || 0) - (a.rating || 0)));
    setSearched(true);
    setSearching(false);
  }

  const inputClass = "w-full border rounded-full px-5 py-2";

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
        ) : mode === "hospitals" ? (
          <>
            <h1 className="text-3xl font-semibold mb-1">病院を探す</h1>
            <HospitalSearch />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-3">PTを探す</h1>

            {!loggedIn && (
              <div className="mb-6 flex flex-col items-start gap-3 rounded-2xl bg-relight-gradient px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6">
                  無料登録すると、理学療法士へのメッセージ送信・レビュー投稿ができます。
                </p>
                <Link
                  href="/register?type=general"
                  className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
                >
                  無料登録する
                </Link>
              </div>
            )}

            <div className="space-y-2 mb-8">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchPT();
                }}
                placeholder="名前（漢字・ひらがな）"
                className={inputClass}
                aria-label="名前（漢字・ひらがな）"
              />

              <input
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchPT();
                }}
                placeholder="地域（都道府県）"
                className={inputClass}
                aria-label="地域（都道府県）"
              />

              <input
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchPT();
                }}
                placeholder="専門分野"
                className={inputClass}
                aria-label="専門分野"
              />

              <button
                onClick={searchPT}
                disabled={searching}
                className="w-full bg-black text-white rounded-full py-2 disabled:opacity-50"
              >
                {searching ? "検索中…" : "🔍 検索"}
              </button>
            </div>

            {!searched && (
              <p className="text-sm text-gray-400">
                名前・地域・専門分野のどれかを入れて検索すると、当てはまる理学療法士が表示されます。
              </p>
            )}

            {searched && pts.length === 0 && (
              <p className="text-sm text-gray-400">見つかりませんでした</p>
            )}

            <div className="space-y-5">
              {pts.map((pt) => (
                <Link key={pt.id} href={`/pts/${pt.id}`}>
                  <div className="border rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      {pt.profile_image ? (
                        <img
                          loading="lazy"
                          decoding="async"
                          src={pt.profile_image ?? undefined}
                          alt={pt.full_name ?? ""}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          👤
                        </div>
                      )}

                      <div>
                        <h2 className="text-xl font-semibold">{ptNameWithTitle(pt.full_name)}</h2>
                        <p className="mt-1">
                          ⭐ {pt.rating || 0} ({pt.review_count || 0}件)
                        </p>
                        <p className="text-gray-500">
                          {pt.prefecture} {pt.city}
                        </p>
                        <p className="text-gray-500">{pt.specialty}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
