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

  // プロフィール画像
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("pt_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

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

      setProfileImage(data.profile_image || "");
      setImagePreview(data.profile_image || "");
    } else {
      setFullName("");
      setQualification("理学療法士");
    }

    setLoading(false);
  }

  // =========================
  // 画像を選択
  // =========================
  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // 画像だけ許可
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }

    // 10MBまで
    if (file.size > 10 * 1024 * 1024) {
      alert("画像は10MB以下にしてください");
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  // =========================
  // 画像アップロード
  // =========================
  async function uploadProfileImage() {
    if (!selectedImage || !userId) {
      return profileImage;
    }

    const fileExtension =
      selectedImage.name.split(".").pop() || "jpg";

    const filePath =
      `${userId}/${Date.now()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, selectedImage, {
        upsert: true,
        contentType: selectedImage.type,
      });

    console.log(
      "PROFILE IMAGE UPLOAD ERROR",
      uploadError
    );

    if (uploadError) {
      alert(
        `画像のアップロードに失敗しました\n${uploadError.message}`
      );
      return null;
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  // =========================
  // プロフィール保存
  // =========================
  async function saveProfile() {
    if (!userId) {
      alert("ログインしてください");
      return;
    }

    setSaving(true);

    // 新しい画像が選択されていたらアップロード
    let imageUrl = profileImage;

    if (selectedImage) {
      const uploadedUrl =
        await uploadProfileImage();

      if (!uploadedUrl) {
        setSaving(false);
        return;
      }

      imageUrl = uploadedUrl;
    }

    const profileData = {
      user_id: userId,
      full_name: fullName,
      workplace,
      specialty,
      qualification,
      experience_years:
        Number(experienceYears) || 0,
      education,
      hometown,
      birth_date: birthDate || null,
      languages: language,
      contact,
      biography,
      profile_image: imageUrl || null,
    };

    let error;

    // 既存プロフィール → 更新
    if (profileId) {
      const result = await supabase
        .from("pt_profiles")
        .update(profileData)
        .eq("id", profileId);

      error = result.error;
    }

    // 新規プロフィール → 作成
    else {
      const result = await supabase
        .from("pt_profiles")
        .insert(profileData)
        .select()
        .single();

      error = result.error;

      if (result.data) {
        setProfileId(result.data.id);
      }
    }

    console.log("SAVE PROFILE ERROR", error);

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    setProfileImage(imageUrl);
    setSelectedImage(null);

    alert("プロフィールを保存しました");

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

          {/* =========================
              プロフィール画像
          ========================= */}
          <div className="text-center">

            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="プロフィール画像"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl">
                  👤
                </span>
              )}

            </div>

            <label
              htmlFor="profile-image"
              className="
                inline-block
                mt-4
                cursor-pointer
                rounded-full
                border
                border-gray-300
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                hover:bg-gray-50
                active:scale-95
                transition
              "
            >
              写真を変更
            </label>

            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-2 text-xs text-gray-400">
              JPG・PNGなど / 10MB以下
            </p>

          </div>

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
            disabled={saving}
            className="
              w-full
              bg-black
              text-white
              rounded-xl
              py-3
              font-semibold
              active:scale-95
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {saving ? "保存中..." : "保存"}
          </button>

        </div>
      </div>
    </main>
  );
}
