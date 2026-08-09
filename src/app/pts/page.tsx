"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";


export default function PTSearchPage(){


  const [pts,setPts] = useState<any[]>([]);


  const [name,setName] = useState("");

  const [prefecture,setPrefecture] = useState("");

  const [specialty,setSpecialty] = useState("");





  useEffect(()=>{

    searchPT();

  },[]);







  async function searchPT(){



    let query = supabase

      .from("pt_profiles")

      .select("*");






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






    console.log(
      "PT SEARCH DATA",
      data
    );


    console.log(
      "PT SEARCH ERROR",
      error
    );






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





        <h1 className="
          text-3xl
          font-semibold
          mb-10
        ">


          PTを探す


        </h1>






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

          />





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

          />






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

          />






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


                    <img

                      src={pt.profile_image}

                      alt={pt.full_name}

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


                      {pt.full_name} PT


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






      </div>






      <BottomNav />



    </main>


  );


}