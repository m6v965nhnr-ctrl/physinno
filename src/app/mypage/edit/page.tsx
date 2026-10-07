"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toHiragana } from "@/lib/format";
import { useRouter } from "next/navigation";
import AccountTypeCard from "@/components/AccountTypeCard";
import WorkplaceAutosuggest from "@/components/WorkplaceAutosuggest";
import { AccountType, getMyAccountType } from "@/lib/account";
import {
  SyncFields,
  reconcileProfileAndPortfolio,
  syncProfileToPortfolio,
} from "@/lib/profileSync";
import { notify } from "@/lib/notify";
import { markOnboarded } from "@/lib/onboarding";

export default function EditProfilePage() {
  const router = useRouter();

  const [profileId, setProfileId] = useState("");
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const [fullName, setFullName] = useState("");
  // ふりがな（PTを探すで、ひらがなでも名前が見つかるようにする）
  const [fullNameKana, setFullNameKana] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [hideWorkplace, setHideWorkplace] = useState(false);
  const [hospitalId, setHospitalId] = useState<string | null>(null);
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
  // 新規登録直後（?welcome=1）は歓迎メッセージを出し、保存後はホームへ進める
  const [welcome, setWelcome] = useState(false);
  // 初回プロフィール登録が済んだ日時（未完了ならnull）
  const [onboardedAt, setOnboardedAt] = useState<string | null>(null);

  useEffect(() => {
    setWelcome(new URLSearchParams(window.location.search).get("welcome") === "1");
  }, []);
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

    // 出身・生年月日・連絡先は非公開のpt_privateから取得する
    const { data: privateData } = await supabase
      .from("pt_private")
      .select("hometown, birth_date, contact, id_photo_path, hidden_workplace, hidden_hospital_id, hidden_department")
      .eq("user_id", user.id)
      .maybeSingle();

    setHometown(privateData?.hometown || "");
    setBirthDate(privateData?.birth_date || "");
    setContact(privateData?.contact || "");

    // 証明写真は非公開バケットに保存し、本人だけが署名付きURLで表示する
    const savedIdPhotoPath = privateData?.id_photo_path || "";
    setIdPhoto(savedIdPhotoPath);
    if (savedIdPhotoPath) {
      const { data: signed } = await supabase.storage
        .from("id-photos")
        .createSignedUrl(savedIdPhotoPath, 3600);
      setIdPhotoPreview(signed?.signedUrl || "");
    }

    if (data) {
      setProfileId(data.id);

      setFullName(data.full_name || "");
      setFullNameKana(data.full_name_kana || "");
      // 勤務先を非公開にしているときは、本人だけが読める pt_private から読み込む
      const hidden = Boolean(data.hide_workplace);
      setHideWorkplace(hidden);
      setWorkplace((hidden ? privateData?.hidden_workplace : data.workplace) || "");
      setHospitalId((hidden ? privateData?.hidden_hospital_id : data.hospital_id) || null);
      setDepartment((hidden ? privateData?.hidden_department : data.department) || "");
      setSpecialty(data.specialty || "");
      setQualification(data.qualification || "");

      setExperienceYears(
        data.experience_years !== null &&
        data.experience_years !== undefined
          ? String(data.experience_years)
          : ""
      );

      setEducation(data.education || "");
      setLanguage(data.languages || "");
      setBiography(data.biography || "");
      setStrengths(data.strengths || "");
      setInterests(data.interests || "");
      setOnboardedAt(data.onboarded_at || null);

      setProfileImage(data.profile_image || "");
      setImagePreview(data.profile_image || "");
      setCoverImage(data.cover_image || "");
      setCoverPreview(data.cover_image || "");

      setSyncedFields({
        education: data.education || "",
        workplace: (data.hide_workplace ? privateData?.hidden_workplace : data.workplace) || "",
        department: (data.hide_workplace ? privateData?.hidden_department : data.department) || "",
        qualification: data.qualification || "",
        languages: data.languages || "",
      });
    } else {
      setFullName("");
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

    // 証明写真は公開しない。本人しか読めない非公開バケットに保存し、
    // DBには公開URLではなく保存パスだけを残す
    const { error: uploadError } = await supabase.storage
      .from("id-photos")
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

    // 差し替え前の古いファイルは残さない
    if (idPhoto && idPhoto !== filePath) {
      await supabase.storage.from("id-photos").remove([idPhoto]);
    }

    return filePath;
  }

  // =========================
  // プロフィール保存
  // =========================
  async function saveProfile() {
    if (!userId) {
      notify("ログインしてください");
      return;
    }

    // プロフィールに必要な項目は必須（連絡先・自己紹介・強み・興味のある分野・カバー写真・証明写真は任意）
    const requiredFields: { label: string; filled: boolean; focusId: string }[] = [
      { label: "アイコン", filled: Boolean(profileImage || selectedImage), focusId: "icon-section" },
      { label: "名前", filled: Boolean(fullName.trim()), focusId: "field-1" },
      { label: "ふりがな", filled: Boolean(fullNameKana.trim()), focusId: "field-kana" },
      { label: "勤務先", filled: Boolean(workplace.trim()), focusId: "field-2" },
      { label: "所属部署", filled: Boolean(department.trim()), focusId: "field-3" },
      { label: "資格", filled: Boolean(qualification.trim()), focusId: "field-5" },
      { label: "経験（何年目か）", filled: experienceYears.trim() !== "", focusId: "field-exp" },
      { label: "学歴", filled: Boolean(education.trim()), focusId: "field-6" },
      { label: "出身", filled: Boolean(hometown.trim()), focusId: "field-7" },
      { label: "生年月日", filled: Boolean(birthDate), focusId: "field-8" },
      { label: "言語", filled: Boolean(language.trim()), focusId: "field-9" },
    ];

    const missing = requiredFields.filter((f) => !f.filled);

    if (missing.length > 0) {
      notify(`次の項目を入力してください：${missing.map((f) => f.label).join("、")}`);
      const target = document.getElementById(missing[0].focusId);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus();
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
      full_name_kana: toHiragana(fullNameKana.replace(/\s+/g, "")) || null,
      workplace,
      hospital_id: hospitalId,
      department,
      hide_workplace: hideWorkplace,
      specialty,
      qualification,
      experience_years:
        Number(experienceYears) || 0,
      education,
      languages: language,
      biography,
      strengths,
      interests,
      profile_image: imageUrl || null,
      cover_image: coverUrl || null,
      // 必須項目がそろって初めて保存できるので、ここで初回登録の完了を記録する
      onboarded_at: onboardedAt || new Date().toISOString(),
    };

    // 出身・生年月日・連絡先・証明写真は非公開のpt_privateへ保存する（誰でも読めるpt_profilesには置かない）
    const { error: privateError } = await supabase.from("pt_private").upsert(
      {
        user_id: userId,
        hometown,
        birth_date: birthDate || null,
        contact,
        id_photo_path: idPhotoUrl || null,
      },
      { onConflict: "user_id" }
    );

    if (privateError) {
      notify(privateError.message);
      setSaving(false);
      return;
    }

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

    setOnboardedAt(profileData.onboarded_at);
    markOnboarded();

    notify("プロフィールを保存しました");

    router.push(welcome ? "/home" : "/mypage");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">
      <div className="max-w-xl mx-auto">

        {welcome && (
          <div className="mb-8 rounded-2xl bg-emerald-50 p-5">
            <p className="text-base font-semibold text-emerald-800">
              Re:lightへようこそ 🎉
            </p>
            <p className="mt-1 text-sm leading-6 text-emerald-700">
              はじめに、あなたのプロフィールを登録しましょう。
              <span className="text-red-500">（必須）</span>の項目をすべて入力すると、Re:lightを使いはじめられます。
              連絡先・自己紹介・自分の強み・興味のある分野・カバー写真は、あとからでも追加できます。
            </p>
          </div>
        )}

        <h1 className="text-3xl font-semibold mb-10">
          プロフィール編集
        </h1>

        <div className="space-y-7">

          {/* =========================
              カバー写真
          ========================= */}
          <div>
            <label className="block font-semibold mb-2">
              カバー写真 <span className="text-xs font-normal text-gray-500">（任意）</span>
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
            <p id="icon-section" tabIndex={-1} className="mb-3 font-semibold">
              アイコン <span className="text-xs font-normal text-red-500">（必須）</span>
            </p>

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
              証明写真（ポートフォリオ用） <span className="text-xs font-normal text-gray-500">（任意）</span>
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
              名前 <span className="text-xs font-normal text-red-500">（必須）</span>
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

          {/* ふりがな */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-kana">
              ふりがな <span className="text-xs font-normal text-red-500">（必須）</span>
            </label>

            <input id="field-kana"
              value={fullNameKana}
              onChange={(e) =>
                setFullNameKana(e.target.value)
              }
              placeholder="例：たなか たろう"
              className="w-full border rounded-xl px-4 py-3"
            />
            <p className="mt-1 text-xs text-gray-500">「PTを探す」で、ひらがなでも名前が見つかるようになります</p>
          </div>

          {/* 勤務先（入力すると病院ページの候補が出て、選ぶと連携できる） */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-2">
              勤務先 <span className="text-xs font-normal text-red-500">（必須）</span>
            </label>

            <WorkplaceAutosuggest
              value={workplace}
              onValueChange={setWorkplace}
              hospitalId={hospitalId}
              onHospitalIdChange={setHospitalId}
            />

            <label className="mt-3 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={hideWorkplace}
                onChange={(e) => setHideWorkplace(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <span className="block text-sm font-medium">勤務先と所属部署を、ほかの人に公開しない</span>
                <span className="block text-xs leading-5 text-gray-500">
                  オンにすると、勤務先・所属部署・病院ページとの連携が、ほかの人には見えなくなります
                  （サーバーにも公開用としては保存しません）。あなたの画面には、そのまま表示されます。
                </span>
              </span>
            </label>
          </div>

          {/* 所属部署 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-3">
              所属部署 <span className="text-xs font-normal text-red-500">（必須）</span>
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
              専門分野 <span className="text-xs font-normal text-gray-400">（任意）</span>
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
              資格 <span className="text-xs font-normal text-red-500">（必須）</span>
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
            <label className="block font-semibold mb-2" htmlFor="field-exp">
              経験（何年目ですか？） <span className="text-xs font-normal text-red-500">（必須）</span>
            </label>

            <div className="flex items-center gap-2">
              <input id="field-exp"
                type="number"
                min="1"
                value={experienceYears}
                onChange={(e) =>
                  setExperienceYears(e.target.value)
                }
                placeholder="例：3"
                className="w-full border rounded-xl px-4 py-3"
               aria-label="経験（何年目か）"/>

              <span className="whitespace-nowrap">
                年目
              </span>
            </div>
          </div>

          {/* 学歴 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-6">
              学歴 <span className="text-xs font-normal text-red-500">（必須）</span>
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
              出身 <span className="text-xs font-normal text-red-500">（必須）</span>
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
              生年月日 <span className="text-xs font-normal text-red-500">（必須）</span>
            </label>

            <input id="field-8"
              type="date"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(e.target.value)
              }
              className="block w-full min-w-0 max-w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* 言語 */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="field-9">
              言語 <span className="text-xs font-normal text-red-500">（必須）</span>
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
              連絡先 <span className="text-xs font-normal text-gray-500">（任意）</span>
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
              自己紹介 <span className="text-xs font-normal text-gray-500">（任意）</span>
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
              自分の強み <span className="text-xs font-normal text-gray-500">（任意）</span>
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
              興味のある分野 <span className="text-xs font-normal text-gray-500">（任意）</span>
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
            {saving ? "保存中…" : "保存"}
          </button>

        </div>
      </div>
    </main>
  );
}
