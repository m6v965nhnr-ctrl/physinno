"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


export default function PostsPage() {


  const [posts, setPosts] = useState<any[]>([]);



  useEffect(()=>{


    async function getPosts(){


      const { data, error } = await supabase

        .from("posts")

        .select("*")

        .order("created_at", {
          ascending:false
        });



      console.log("POST DATA", data);

      console.log("POST ERROR", error);



      if(data){

        setPosts(data);

      }


    }



    getPosts();


  },[]);






  return (

    <main className="min-h-screen bg-white px-6 py-12">


      <div className="max-w-2xl mx-auto">



        <div className="flex justify-between items-center mb-10">


          <h1 className="text-3xl font-semibold">

            投稿一覧

          </h1>



          <Link href="/posts/create">


            <button

              className="
                bg-black
                text-white
                rounded-full
                px-5
                py-2
              "

            >

              投稿する

            </button>


          </Link>


        </div>






        {posts.length === 0 ? (

          <p>

            まだ投稿がありません

          </p>


        ) : (


          posts.map((post)=>(


            <Link

              key={post.id}

              href={`/posts/${post.id}`}

            >


              <div

                className="
                  border
                  rounded-2xl
                  p-6
                  mb-5
                  cursor-pointer
                "

              >



                <h2 className="text-xl font-semibold">

                  {post.title}

                </h2>



                <p className="mt-4">

                  {post.content}

                </p>



                <p className="text-sm text-gray-500 mt-5">

                  ❤️ {post.like_count || 0}

                  {" "}

                  💬 {post.comment_count || 0}

                </p>



              </div>


            </Link>


          ))


        )}



      </div>


    </main>

  );

}
