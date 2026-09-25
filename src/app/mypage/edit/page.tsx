"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AccountTypeCard from "@/components/AccountTypeCard";
import { AccountType, getMyAccountType } from "@/lib/account";
import {
  SyncFields,
  reconcileProfileAndPortfolio,
  syncProfileToPortfolio,
} from "@/lib/profileSync";
import { notify } from "@/lib/notify";

export default function EditProfilePage() {
  const router = useRouter();

  const [profileId, setProfileId] = useState("");
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const [fullName, setFullName] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [department, setDepartment] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [qualification, setQualification] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const [education, setEducation] = useState("");
  const [hometown, setHometown] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [language, setLanguage] = useState("");
  const [contact, setContact] = useState("");
  const [biography, setBiography] = useState("");
  const [strengths, setStrengths] = useState("");
  const [interests, setInterests] = useState("");

  // プロフィール画像
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // カバー写真
  const [coverImage, setCoverImage] = useState("");
  const [selectedCover, setSelectedCover] =
    useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");

  // 証明写真（ポートフォリオ・履歴書用。プロフィール写真とは別枠）
  const [idPhoto, setIdPhoto] = useState("");
  const [selectedIdPhoto, setSelectedIdPhoto] =
    useState<File | null>(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState("");

  // ポートフォリオと連携する項目の保存済みの値（差分の反映に使う）
  const [syncedFields, setSyncedFields] = useState<SyncFields>({
    education: "",
    workplace: "",
    department: "",
    qualification: "",
    languages: "",
  });

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setUserId(user.id);
    setAccountType(await getMyAccountType(user.id));

    // ポートフォリオ側で登録済みの学歴・職歴・資格・語学を取り込む
    await reconcileProfileAndPortfolio(user.id);

    const { data, error } = await supabase
      .from("pt_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();


    if (data) {
      setProfileId(data.id);

      setFullName(data.full_name || "");
      setWorkplace(data.workplace || "");
      setDepartment(data.department || "");
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
      setStrengths(data.strengths || "");
      setInterests(data.interests || "");

      setProfileImage(data.profile_image || "");
      setImagePreview(data.profile_image || "");
      setCoverImage(data.cover_image || "");
      setCoverPreview(data.cover_image || "");
      setIdPhoto(data.id_photo || "");
      setIdPhotoPreview(data.id_photo || "");

      setSyncedFields({
        education: data.education || "",
        workplace: data.workplace || "",
        department: data.department || "",
        qualification: data.qualification || "",
        languages: data.languages || "",
      });
    } else {
      setFullName("");
      setQualification("理学療法士");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, []);

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
      notify("画像ファイルを選択してください");
      return;
    }

    // 10MBまで
    if (file.size > 10 * 1024 * 1024) {
      notify("画像は10MB以下にしてください");
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  // =========================
  // カバー写真を選択
  // =========================
  function handleCoverChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      notify("画像ファイルを選択してください");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      notify("画像は10MB以下にしてください");
      return;
    }

    setSelectedCover(file);

    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
  }

  // =========================
  // 証明写真を選択
  // =========================
  function handleIdPhotoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      notify("画像ファイルを選択してください");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      notify("画像は10MB以下にしてください");
      return;
    }

    setSelectedIdPhoto(file);

    const previewUrl = URL.createObjectURL(file);
    setIdPhotoPreview(previewUrl);
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


    if (uploadError) {
      notify(
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
  // カバー写真アップロード
  // =========================
  async function uploadCoverImage() {
    if (!selectedCover || !userId) {
      return coverImage;
    }

    const fileExtension =
      selectedCover.name.split(".").pop() || "jpg";

    const filePath =
      `${userId}/cover-${Date.now()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, selectedCover, {
        upsert: true,
        contentType: selectedCover.type,
      });

    if (uploadError) {
      notify(
        `カバー写真のアップロードに失敗しました\n${uploadError.message}`
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
  // 証明写真アップロード
  // =========================
  async function uploadIdPhoto() {
    if (!selectedIdPhoto || !userId) {
      return idPhoto;
    }

    const fileExtension =
      selectedIdPhoto.name.split(".").pop() || "jpg";

    const filePath =
      `${userId}/id-photo-${Date.now()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, selectedIdPhoto, {
        upsert: true,
        contentType: selectedIdPhoto.type,
      });

    if (uploadError) {
      notify(
        `証明写真のアップロードに失敗しました\n${uploadError.message}`
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
      notify("ログインしてください");
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

    let coverUrl = coverImage;

    if (selectedCover) {
      const uploadedCoverUrl = await uploadCoverImage();

      if (!uploadedCoverUrl) {
        setSaving(false);
        return;
      }

      coverUrl = uploadedCoverUrl;
    }

    let idPhotoUrl = idPhoto;

    if (selectedIdPhoto) {
      const uploadedIdPhotoUrl = await uploadIdPhoto();

      if (!uploadedIdPhotoUrl) {
        setSaving(false);
        return;
      }

      idPhotoUrl = uploadedIdPhotoUrl;
    }

    const profileData = {
      user_id: userId,
      full_name: fullName,
      workplace,
      department,
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
      strengths,
      interests,
      profile_image: imageUrl || null,
      cover_image: coverUrl || null,
      id_photo: idPhotoUrl || null,
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


    if (error) {
      notify(error.message);
      setSaving(false);
      return;
    }

    // ポートフォリオ（学歴・職歴・資格・語学）にも反映
    const nextFields: SyncFields = {
      education,
      workplace,
      department,
      qualification,
      languages: language,
    };

    await syncProfileToPortfolio(userId, syncedFields, nextFields);
    setSyncedFields(nextFields);

    setProfileImage(imageUrl);
    setSelectedImage(null);
    setCoverImage(coverUrl);
    setSelectedCover(null);
    setIdPhoto(idPhotoUrl);
    setSelectedIdPhoto(null);

    notify("プロフィールを保存しました");

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
              カバー写真
          ========================= */}
          <div>
            <label className="block font-semibold mb-2">
              カバー写真
            </label>

            <div className="h-32 w-full overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
              {coverPreview ? (
                <img loading="lazy" decoding="async"
                  src={coverPreview}
                  alt="カバー写真"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">
                  未設定
                </span>
              )}
            </div>

            <label
              htmlFor="cover-image"
              className="
                inline-block
                mt-3
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
              カバー写真を変更
            </label>

            <input
              id="cover-image"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />

            <p className="mt-2 text-xs text-gray-400">
              プロフィールの背景に表示されます / JPG・PNGなど / 10MB以下
            </p>
          </div>

          {/* =========================
              プロフィール画像
          ========================= */}
          <div className="text-center">

            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">

              {imagePreview ? (
                <img loading="lazy" decoding="async"
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

          {/* =========================
              証明写真（ポートフォリオ用）
          ========================= */}
          <div className="text-center rounded-2xl border border-dashed border-gray-300 p-5">

            <p className="text-sm font-semibold">
              証明写真（ポートフォリオ用）
            </p>

            <p className="mt-1 text-xs text-gray-400">
              プロフィール写真とは別に、履歴書・ポートフォリオに使う証明写真用の枠です
            </p>

            <div className="mx-auto mt-3 h-40 w-32 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">

              {idPhotoPreview ? (
                <img loading="lazy" decoding="async"
                  src={idPhotoPreview}
                  alt="証明写真"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">
                  未設定
                </span>
              )}

            </div>

            <label
              htmlFor="id-photo"
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
              証明写真を設定
            </label>

            <input
              id="id-photo"
              type="file"
              accept="image/*"
              onChange={handleIdPhotoChange}
              className="hidden"
            />

          </div>

          {/* 名前 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-1">
              名前
            </label>

            <input id="field-1"
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
            <label className="block font-semibold mb-2" htmlFor="field-2">
              勤務先
            </label>

            <input id="field-2"
              value={workplace}
              onChange={(e) =>
                setWorkplace(e.target.value)
              }
              placeholder="例：〇〇病院"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 所属部署 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-3">
              所属部署
            </label>

            <input id="field-3"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              placeholder="例：リハビリテーション科"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 専門分野 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-4">
              専門分野
            </label>

            <input id="field-4"
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
            <label className="block font-semibold mb-2" htmlFor="field-5">
              資格
            </label>

            <input id="field-5"
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
               aria-label="例：5"/>

              <span className="whitespace-nowrap">
                年
              </span>
            </div>
          </div>

          {/* 学歴 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-6">
              学歴
            </label>

            <input id="field-6"
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
            <label className="block font-semibold mb-2" htmlFor="field-7">
              出身
            </label>

            <input id="field-7"
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
            <label className="block font-semibold mb-2" htmlFor="field-8">
              生年月日
            </label>

            <input id="field-8"
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
            <label className="block font-semibold mb-2" htmlFor="field-9">
              言語
            </label>

            <input id="field-9"
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
            <label className="block font-semibold mb-2" htmlFor="field-10">
              連絡先
            </label>

            <input id="field-10"
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
            <label className="block font-semibold mb-2" htmlFor="field-11">
              自己紹介
            </label>

            <textarea id="field-11"
              value={biography}
              onChange={(e) =>
                setBiography(e.target.value)
              }
              placeholder="例：患者さん一人ひとりに寄り添ったリハビリを大切にしています。"
              rows={6}
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          {/* 自分の強み */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-12">
              自分の強み
            </label>

            <textarea id="field-12"
              value={strengths}
              onChange={(e) =>
                setStrengths(e.target.value)
              }
              placeholder="例：コミュニケーションを大切にした運動療法が得意です。"
              rows={3}
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          {/* 興味のある分野 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-13">
              興味のある分野
            </label>

            <textarea id="field-13"
              value={interests}
              onChange={(e) =>
                setInterests(e.target.value)
              }
              placeholder="例：スポーツリハビリ、慢性疼痛"
              rows={3}
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          {/* アカウントの種類 */}
          <AccountTypeCard
            accountType={accountType}
            onChanged={(type) => setAccountType(type)}
          />

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
