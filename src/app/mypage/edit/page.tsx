"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [profileId, setProfileId] = useState("");
  const [fullName, setFullName] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [qualification, setQualification] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const [education, setEducation] = useState("");
  const [hometown, setHometown] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [language, setLanguage] = useState("");
  const [contact, setContact] = useState("");

  const [biography, setBiography] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("pt_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    console.log("EDIT PROFILE", data);
    console.log("EDIT ERROR", error);

    if (data) {
      setProfileId(data.id);

      setFullName(data.full_name || "");
      setWorkplace(data.workplace || "");
      setSpecialty(data.specialty || "");
      setQualification(data.qualification || "");

      setExperienceYears(
        data.experience_years !== null &&
        data.experience_years !== undefined
          ? String(data.experience_years)
          : ""
      );

      setEducation(data.education || "");
      setHometown(data.hometown || "");
      setBirthDate(data.birth_date || "");
      setLanguage(data.languages || "");
      setContact(data.contact || "");

      setBiography(data.biography || "");
    }

    setLoading(false);
  }

  async function saveProfile() {
    if (!profileId) {
      alert("プロフィールが見つかりません");
      return;
    }

    const { error } = await supabase
      .from("pt_profiles")
      .update({
        full_name: fullName,
        workplace,
        specialty,
        qualification,
        experience_years: Number(experienceYears) || 0,

        education,
        hometown,
        birth_date: birthDate || null,
        languages: language,
        contact,

        biography,
      })
      .eq("id", profileId);

    console.log("SAVE ERROR", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("プロフィールを更新しました");

    router.push("/mypage");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">
      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-semibold mb-10">
          プロフィール編集
        </h1>

        <div className="space-y-7">

          {/* 名前 */}
          <div>
            <label className="block font-semibold mb-2">
              名前
            </label>

            <input
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="例：田中 太郎"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 勤務先 */}
          <div>
            <label className="block font-semibold mb-2">
              勤務先
            </label>

            <input
              value={workplace}
              onChange={(e) =>
                setWorkplace(e.target.value)
              }
              placeholder="例：〇〇病院"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 専門分野 */}
          <div>
            <label className="block font-semibold mb-2">
              専門分野
            </label>

            <input
              value={specialty}
              onChange={(e) =>
                setSpecialty(e.target.value)
              }
              placeholder="例：整形外科・スポーツ"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 資格 */}
          <div>
            <label className="block font-semibold mb-2">
              資格
            </label>

            <input
              value={qualification}
              onChange={(e) =>
                setQualification(e.target.value)
              }
              placeholder="例：理学療法士"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 経験年数 */}
          <div>
            <label className="block font-semibold mb-2">
              経験年数
            </label>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={experienceYears}
                onChange={(e) =>
                  setExperienceYears(e.target.value)
                }
                placeholder="例：5"
                className="w-full border rounded-xl px-4 py-3"
              />

              <span className="whitespace-nowrap">
                年
              </span>
            </div>
          </div>

          {/* 学歴 */}
          <div>
            <label className="block font-semibold mb-2">
              学歴
            </label>

            <input
              value={education}
              onChange={(e) =>
                setEducation(e.target.value)
              }
              placeholder="例：〇〇大学 保健医療学部"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 出身 */}
          <div>
            <label className="block font-semibold mb-2">
              出身
            </label>

            <input
              value={hometown}
              onChange={(e) =>
                setHometown(e.target.value)
              }
              placeholder="例：神奈川県鎌倉市"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 生年月日 */}
          <div>
            <label className="block font-semibold mb-2">
              生年月日
            </label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 言語 */}
          <div>
            <label className="block font-semibold mb-2">
              言語
            </label>

            <input
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              placeholder="例：日本語、英語"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 連絡先 */}
          <div>
            <label className="block font-semibold mb-2">
              連絡先
            </label>

            <input
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
              placeholder="例：メールアドレスなど"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 自己紹介 */}
          <div>
            <label className="block font-semibold mb-2">
              自己紹介
            </label>

            <textarea
              value={biography}
              onChange={(e) =>
                setBiography(e.target.value)
              }
              placeholder="例：患者さん一人ひとりに寄り添ったリハビリを大切にしています。"
              rows={6}
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          {/* 保存 */}
          <button
            onClick={saveProfile}
            className="
              w-full
              bg-black
              text-white
              rounded-xl
              py-3
              font-semibold
              active:scale-95
              transition
            "
          >
            保存
          </button>

        </div>
      </div>
    </main>
  );
}