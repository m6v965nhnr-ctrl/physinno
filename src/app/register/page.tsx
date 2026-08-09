"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ReviewPage() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;


  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");



  async function submitReview() {


    const {
      data: userData
    } = await supabase.auth.getUser();



    const user = userData.user;


    if (!user) {

      alert("ログインしてください");

      return;

    }



    const { error } = await supabase

      .from("reviews")

      .insert({

        pt_id: id,

        user_id: user.id,

        rating,

        comment,

      });



    if (error) {

      alert(error.message);

      return;

    }



    alert("レビューしました");


    router.push(`/pts/${id}`);


  }




  return (

    <main className="min-h-screen bg-white px-6 py-12">


      <div className="max-w-md mx-auto">


        <h1 className="text-3xl font-semibold mb-10">

          レビューを書く

        </h1>



        <div className="space-y-6">



          <div>


            <p className="mb-3">

              評価

            </p>



            <select

              value={rating}

              onChange={(e)=>setRating(Number(e.target.value))}

              className="
                w-full
                border
                rounded-full
                px-5
                py-3
              "

            >

              <option value="5">

                ⭐⭐⭐⭐⭐

              </option>


              <option value="4">

                ⭐⭐⭐⭐

              </option>


              <option value="3">

                ⭐⭐⭐

              </option>


              <option value="2">

                ⭐⭐

              </option>


              <option value="1">

                ⭐

              </option>


            </select>


          </div>




          <textarea

            placeholder="コメント"

            value={comment}

            onChange={(e)=>setComment(e.target.value)}

            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              h-40
            "

          />





          <button

            onClick={submitReview}

            className="
              w-full
              bg-black
              text-white
              rounded-full
              py-3
            "

          >

            投稿する

          </button>



        </div>


      </div>


    </main>

  );

}