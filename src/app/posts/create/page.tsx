"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function CreatePostPage() {


  const router = useRouter();


  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");





  async function createPost(){



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
      error
    } = await supabase

      .from("posts")

      .insert({

        user_id:user.id,

        post_type:"text",

        title,

        content,

      });






    console.log("CREATE POST ERROR",error);





    if(error){

      alert(error.message);

      return;

    }





    alert("投稿しました");



    router.push("/home");


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
        max-w-xl
        mx-auto
      ">


        <h1 className="
          text-3xl
          font-semibold
          mb-10
        ">

          投稿作成

        </h1>






        <div className="space-y-5">


          <input

            value={title}

            onChange={(e)=>
              setTitle(e.target.value)
            }

            placeholder="タイトル"

            className="
              w-full
              border
              rounded-2xl
              px-5
              py-3
            "

          />






          <textarea

            value={content}

            onChange={(e)=>
              setContent(e.target.value)
            }

            placeholder="本文"

            rows={6}

            className="
              w-full
              border
              rounded-2xl
              px-5
              py-3
            "

          />







          <button

            onClick={createPost}

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