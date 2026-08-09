"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {

  const router = useRouter();

  const [id, setId] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({

    full_name: "",
    workplace: "",
    prefecture: "",
    city: "",
    specialty: "",
    qualification: "",
    experience_years: "",

  });



  useEffect(() => {

    async function getProfile() {

      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();


      if (!user) {

        router.push("/login");

        return;

      }


      const { data, error } = await supabase
        .from("pt_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();


      console.log(data);
      console.log(error);


      if (data) {

        setId(data.id);

        setPreview(data.profile_image || "");


        setForm({

          full_name: data.full_name || "",
          workplace: data.workplace || "",
          prefecture: data.prefecture || "",
          city: data.city || "",
          specialty: data.specialty || "",
          qualification: data.qualification || "",
          experience_years: data.experience_years || "",

        });

      }

    }


    getProfile();


  }, [router]);





  async function uploadImage() {

    if (!image) return preview;


    const fileName =
      `${Date.now()}-${image.name}`;


    const { error } = await supabase.storage
      .from("profile-images")
      .upload(fileName, image);


    if (error) {

      alert(error.message);

      return preview;

    }


    const { data } =
      supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);


    return data.publicUrl;

  }





  async function saveProfile() {


    const imageUrl = await uploadImage();


    const { error } = await supabase
      .from("pt_profiles")
      .update({

        full_name: form.full_name,

        workplace: form.workplace,

        prefecture: form.prefecture,

        city: form.city,

        specialty: form.specialty,

        qualification: form.qualification,

        experience_years:
          Number(form.experience_years),

        profile_image: imageUrl,

      })
      .eq("id", id);



    if (error) {

      alert(error.message);

      return;

    }


    alert("保存しました");

    router.push(`/pts/${id}`);

  }





  return (

    <main className="min-h-screen bg-white px-6 py-12">

      <div className="max-w-xl mx-auto">


        <h1 className="text-3xl font-semibold mb-8">
          プロフィール編集
        </h1>



        {preview && (

          <img
            src={preview}
            alt="profile"
            className="
              w-32
              h-32
              rounded-full
              object-cover
              mb-6
            "
          />

        )}



        <label
          className="
            inline-block
            bg-black
            text-white
            rounded-full
            px-6
            py-3
            cursor-pointer
            mb-6
          "
        >

          写真を変更する


          <input

            type="file"

            accept="image/png,image/jpeg"

            onChange={(e)=>{

              const file = e.target.files?.[0];

              if(file){

                setImage(file);

                setPreview(
                  URL.createObjectURL(file)
                );

              }

            }}

            className="hidden"

          />


        </label>





        <div className="space-y-4">


          {Object.keys(form).map((key)=>(

            <input

              key={key}

              value={(form as any)[key]}

              placeholder={key}

              onChange={(e)=>

                setForm({

                  ...form,

                  [key]: e.target.value,

                })

              }

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            />

          ))}



          <button

            onClick={saveProfile}

            className="
              w-full
              bg-black
              text-white
              rounded-xl
              py-3
              mt-6
            "

          >

            保存する

          </button>


        </div>


      </div>

    </main>

  );

}