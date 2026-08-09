"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";


export default function ReviewPage() {


  const params = useParams();

  const router = useRouter();


  const ptId = params.id as string;



  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");





  async function submitReview(){



    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();





    if(!user){

      alert("ログインしてください");

      return;

    }





    const {
      error:insertError

    } = await supabase

      .from("reviews")

      .insert({

        pt_id:ptId,

        user_id:user.id,

        rating,

        comment,

      });





    console.log(
      "INSERT ERROR",
      insertError
    );





    if(insertError){

      alert(insertError.message);

      return;

    }







    const {
      data:reviewData,

      error:reviewError

    } = await supabase

      .from("reviews")

      .select("rating")

      .eq(
        "pt_id",
        ptId
      );





    console.log(
      "REVIEW UPDATE DATA",
      reviewData
    );


    console.log(
      "REVIEW UPDATE ERROR",
      reviewError
    );





    if(
      !reviewData ||
      reviewData.length === 0
    ){

      alert("レビュー取得できませんでした");

      return;

    }





    const count = reviewData.length;





    const average =

      reviewData.reduce(

        (sum,item)=>

          sum + Number(item.rating),

        0

      )

      /

      count;





    console.log(
      "AVERAGE",
      average
    );








    const {

      data:updateData,

      error:updateError

    } = await supabase

      .from("pt_profiles")

      .update({

        rating:Number(
          average.toFixed(1)
        ),

        review_count:count,

      })

      .eq(

        "id",

        ptId

      )

      .select();







    console.log(

      "UPDATED PROFILE DATA",

      updateData

    );



    console.log(

      "UPDATE PROFILE ERROR",

      updateError

    );








    alert("レビューを投稿しました");



    router.push(`/pts/${ptId}`);



  }








  return (

    <main className="
      min-h-screen
      bg-white
      px-6
      py-12
    ">



      <div className="
        max-w-xl
        mx-auto
      ">



        <h1 className="
          text-3xl
          font-semibold
          mb-10
        ">

          レビューを書く

        </h1>






        <div className="space-y-8">



          <div>


            <p className="
              text-sm
              text-gray-500
              mb-3
            ">

              評価

            </p>




            <div className="
              flex
              gap-3
              text-3xl
            ">



              {[1,2,3,4,5].map((star)=>(


                <button

                  key={star}

                  onClick={()=>setRating(star)}

                >

                  {
                    star <= rating
                    ? "★"
                    : "☆"
                  }

                </button>


              ))}



            </div>


          </div>







          <div>


            <p className="
              text-sm
              text-gray-500
              mb-3
            ">

              コメント

            </p>



            <textarea

              value={comment}

              onChange={(e)=>
                setComment(
                  e.target.value
                )
              }

              placeholder="治療を受けた感想"

              className="
                w-full
                h-40
                border
                rounded-2xl
                p-5
              "

            />


          </div>







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