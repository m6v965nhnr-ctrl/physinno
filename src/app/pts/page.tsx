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
import { ptNameWithTitle } from "@/lib/format";


export default function PTSearchPage(){
  return (
    <Suspense fallback={null}>
      <PTSearchPageInner />
    </Suspense>
  );
}

function PTSearchPageInner(){

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // タブ選択をURLに保持しておくと、病院ページ等から戻った時に
  // 直前のタブ（PTを探す/病院を探す等）のまま復元できる
  function updateUrlParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const [pts,setPts] = useState<PtProfile[]>([]);


  const [name,setName] = useState("");

  const [prefecture,setPrefecture] = useState("");

  const [specialty,setSpecialty] = useState("");

  // PTアカウントのみ「News（研修・学会情報）」タブを表示
  const [isPt,setIsPt] = useState(false);
  // 一般（患者）アカウントは News の代わりに「病院を探す」タブを出す
  const [isGeneral,setIsGeneral] = useState(false);
  const [tab,setTab] = useState<"search"|"news">(
    () => (searchParams.get("tab") as "search" | "news") || "search"
  );
  // 「探す」タブの中の切り替え: PTを探す / 病院を探す / 論文を探す
  const [searchMode,setSearchMode] = useState<"pts"|"hospitals"|"papers">(
    () => (searchParams.get("mode") as "pts" | "hospitals" | "papers") || "pts"
  );
  // 一般（患者）アカウント向け: PTを探す / 病院を探す
  const [generalMode,setGeneralMode] = useState<"pts"|"hospitals">(
    () => (searchParams.get("mode") as "pts" | "hospitals") || "pts"
  );

  // ログインしていない訪問者（検索エンジン経由など）には登録を案内する
  const [loggedIn, setLoggedIn] = useState(true);


  useEffect(()=>{

    searchPT();

    supabase.auth.getUser().then(async ({data:{user}})=>{

      setLoggedIn(!!user);

      if(user){

        const accountType = await getMyAccountType(user.id);
        setIsPt(isPtLike(accountType));
        setIsGeneral(accountType === "general");

      }

    });

  },[]);


  async function searchPT(){


    let query = supabase

      .from("pt_profiles")

      .select("*")
      // 名前が未入力の空プロフィールは一覧に出さない（検索結果が空の人だらけになるため）
      .not("full_name", "is", null)
      .neq("full_name", "")
      // 学生のアカウントは検索結果に出さない
      .eq("is_student", false)
      .order("rating", { ascending: false, nullsFirst: false })
      .limit(50);


    if(name){

      query = query.ilike(

        "full_name",

        `%${name}%`

      );

    }


    if(prefecture){

      query = query.ilike(

        "prefecture",

        `%${prefecture}%`

      );

    }


    if(specialty){

      query = query.ilike(

        "specialty",

        `%${specialty}%`

      );

    }


    const {

      data,

      error

    } = await query;


    if(data){


      const sorted = [...data].sort(

        (a,b)=>

          (b.rating || 0)

          -

          (a.rating || 0)

      );


      setPts(sorted);


    }


  }


  return (

    <main className="
      search-large
      min-h-screen
      bg-white
      px-6
      py-12
      pb-24
    ">


      <div className="
        max-w-3xl
        mx-auto
      ">


        {isPt && (

          <div
            role="tablist"
            aria-label="検索の種類"
            className="mb-8 grid grid-cols-2 rounded-full bg-gray-100 p-1 text-sm font-medium"
          >

            {([["search","探す"],["news","News"]] as const).map(([key,label])=>(

              <button

                key={key}

                role="tab"

                aria-selected={tab === key}

                onClick={()=>{setTab(key); updateUrlParam("tab", key);}}

                className={`rounded-full py-2.5 transition ${
                  tab === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}

              >

                {label}

              </button>

            ))}

          </div>

        )}


        {isPt && tab === "search" && (

          <div
            role="tablist"
            aria-label="探すの種類"
            className="mb-8 grid grid-cols-3 rounded-full border border-gray-200 p-1 text-sm font-medium"
          >

            {([["pts","PTを探す"],["hospitals","病院を探す"],["papers","論文を探す"]] as const).map(([key,label])=>(

              <button

                key={key}

                role="tab"

                aria-selected={searchMode === key}

                onClick={()=>{setSearchMode(key); updateUrlParam("mode", key);}}

                className={`rounded-full py-2 transition ${
                  searchMode === key
                    ? "bg-gray-900 text-white"
                    : "text-gray-500"
                }`}

              >

                {label}

              </button>

            ))}

          </div>

        )}

        {isGeneral && (

          <div
            role="tablist"
            aria-label="探すの種類"
            className="mb-8 grid grid-cols-2 rounded-full bg-gray-100 p-1 text-sm font-medium"
          >

            {([["pts","PTを探す"],["hospitals","病院を探す"]] as const).map(([key,label])=>(

              <button

                key={key}

                role="tab"

                aria-selected={generalMode === key}

                onClick={()=>{setGeneralMode(key); updateUrlParam("mode", key);}}

                className={`rounded-full py-2.5 transition ${
                  generalMode === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}

              >

                {label}

              </button>

            ))}

          </div>

        )}

        {isPt && tab === "news" ? (

          <SeminarNews />

        ) : isPt && searchMode === "papers" ? (

          <>
            <h1 className="text-3xl font-semibold mb-10">論文を探す</h1>
            <PaperSearch />
          </>

        ) : isPt && searchMode === "hospitals" ? (

          <>
            <h1 className="text-3xl font-semibold mb-10">病院を探す</h1>
            <HospitalSearch />
          </>

        ) : isGeneral && generalMode === "hospitals" ? (

          <>
            <h1 className="text-3xl font-semibold mb-10">病院を探す</h1>
            <HospitalSearch />
          </>

        ) : (

        <>

        <h1 className="
          text-3xl
          font-semibold
          mb-10
        ">


          PTを探す


        </h1>

        {!loggedIn && (
          <div className="mb-10 flex flex-col items-start gap-3 rounded-2xl bg-relight-gradient px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
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

        <div className="space-y-4 mb-10">


          <input

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

            placeholder="名前"

            className="
              w-full
              border
              rounded-full
              px-5
              py-3
            "

           aria-label="名前"/>


          <input

            value={prefecture}

            onChange={(e)=>
              setPrefecture(e.target.value)
            }

            placeholder="地域（都道府県）"

            className="
              w-full
              border
              rounded-full
              px-5
              py-3
            "

           aria-label="地域（都道府県）"/>


          <input

            value={specialty}

            onChange={(e)=>
              setSpecialty(e.target.value)
            }

            placeholder="専門分野"

            className="
              w-full
              border
              rounded-full
              px-5
              py-3
            "

           aria-label="専門分野"/>


          <button

            onClick={searchPT}

            className="
              w-full
              bg-black
              text-white
              rounded-full
              py-3
            "

          >

            🔍 検索

          </button>


        </div>


        <div className="space-y-5">


          {pts.map((pt)=>(


            <Link

              key={pt.id}

              href={`/pts/${pt.id}`}

            >


              <div className="
                border
                rounded-2xl
                p-6
              ">


                <div className="
                  flex
                  items-center
                  gap-4
                ">


                  {pt.profile_image ? (


                    <img loading="lazy" decoding="async"

                      src={pt.profile_image ?? undefined}

                      alt={pt.full_name ?? ""}

                      className="
                        w-16
                        h-16
                        rounded-full
                        object-cover
                      "

                    />


                  ) : (


                    <div className="
                      w-16
                      h-16
                      rounded-full
                      bg-gray-200
                      flex
                      items-center
                      justify-center
                    ">

                      👤

                    </div>


                  )}


                  <div>


                    <h2 className="
                      text-xl
                      font-semibold
                    ">


                      {ptNameWithTitle(pt.full_name)}


                    </h2>


                    <p className="mt-1">

                      ⭐ {pt.rating || 0}

                      {" "}

                      ({pt.review_count || 0}件)


                    </p>


                    <p className="text-gray-500">

                      {pt.prefecture} {pt.city}


                    </p>


                    <p className="text-gray-500">

                      {pt.specialty}


                    </p>


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