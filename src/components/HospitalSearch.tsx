"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  BED_TYPE_LABEL,
  BedType,
  DEPARTMENT_FILTERS,
  Hospital,
  WORKPLACE_SIZE_LABEL,
  WorkplaceSize,
  createHospital,
  hasHospitalDetailData,
  listCitiesByPrefecture,
  searchHospitals,
} from "@/lib/hospitals";
import { internshipReviewCounts } from "@/lib/internship";
import { PREFECTURES } from "@/lib/prefectures";
import { notify } from "@/lib/notify";

// 病院はPTが作成・編集できる施設ページ。検索結果から /hospitals/{id} に
// 遷移すると、フォローや職場環境の口コミを見られる。
export default function HospitalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 検索条件をURLに保持しておくと、病院ページから戻った時に
  // 検索条件・結果をリセットせず復元できる
  const [keyword, setKeyword] = useState(() => searchParams.get("keyword") || "");
  const [prefecture, setPrefecture] = useState(() => searchParams.get("prefecture") || "");
  const [city, setCity] = useState(() => searchParams.get("city") || "");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [size, setSize] = useState<WorkplaceSize | "">(
    () => (searchParams.get("size") as WorkplaceSize | "") || ""
  );
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // 診療科・病床の絞り込み(データが取り込まれているときだけ表示)と、実習生の声の件数
  const [hasDetailData, setHasDetailData] = useState(false);
  const [departments, setDepartments] = useState<string[]>(
    () => (searchParams.get("dept") || "").split(",").filter(Boolean)
  );
  const [bedType, setBedType] = useState<BedType | "">(
    () => (searchParams.get("beds") as BedType | "") || ""
  );
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newPrefecture, setNewPrefecture] = useState("");
  const [newSize, setNewSize] = useState<WorkplaceSize | "">("");
  const [adding, setAdding] = useState(false);

  const didMountPrefectureEffect = useRef(false);

  useEffect(() => {
    // 初回マウント時はURLから復元したcityを維持し、リセットしない
    if (didMountPrefectureEffect.current) {
      setCity("");
    } else {
      didMountPrefectureEffect.current = true;
    }

    if (!prefecture) {
      setCityOptions([]);
      return;
    }

    listCitiesByPrefecture(prefecture).then(setCityOptions);
  }, [prefecture]);

  useEffect(() => {
    hasHospitalDetailData().then(setHasDetailData);
  }, []);

  // URLに検索条件があれば、マウント時に自動で検索を復元する
  useEffect(() => {
    if (
      searchParams.get("keyword") ||
      searchParams.get("prefecture") ||
      searchParams.get("city") ||
      searchParams.get("size") ||
      searchParams.get("dept") ||
      searchParams.get("beds")
    ) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch() {
    setSearching(true);
    setSearched(true);

    const results = await searchHospitals({
      keyword: keyword.trim() || undefined,
      prefecture: prefecture || undefined,
      city: city || undefined,
      size: size || undefined,
      departments: departments.length > 0 ? departments : undefined,
      bedType: bedType || undefined,
    });

    setHospitals(results);
    setSearching(false);

    // 実習生の声が付いている病院を、わかるようにする(PT・学生のアカウントのみ件数が返る)
    internshipReviewCounts(results.map((h) => h.id)).then(setReviewCounts);

    const params = new URLSearchParams(searchParams.toString());
    const entries: [string, string][] = [
      ["keyword", keyword.trim()],
      ["prefecture", prefecture],
      ["city", city],
      ["size", size],
      ["dept", departments.join(",")],
      ["beds", bedType],
    ];
    entries.forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function handleAddHospital() {
    if (!newName.trim()) {
      notify("病院名を入力してください");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      notify("ログインしてください");
      return;
    }

    setAdding(true);

    const { hospital, error } = await createHospital({
      name: newName.trim(),
      website: newWebsite.trim(),
      prefecture: newPrefecture.trim(),
      size: newSize || undefined,
      createdBy: user.id,
    });

    setAdding(false);

    if (error || !hospital) {
      notify(error || "追加に失敗しました");
      return;
    }

    notify("病院ページを追加しました");
    router.push(`/hospitals/${hospital.id}`);
  }

  return (
    <div>
      <div className="mb-3 flex justify-start">
        <button
          type="button"
          onClick={() => setShowAddForm((v) => !v)}
          className="text-xs text-gray-400 underline hover:text-gray-600"
        >
          {showAddForm ? "閉じる" : "+ 病院が見つからない場合はこちら"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 space-y-2 rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-xs text-gray-500">
            探している病院・クリニックが見つからない場合、ページを新規に追加できます（公式サイトのURLを貼り付けるだけでもOK）
          </p>

          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="病院名（必須）"
            className="w-full rounded-full border px-4 py-2.5 text-sm"
          />
          <input
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            type="url"
            placeholder="公式サイトURL（任意）"
            className="w-full rounded-full border px-4 py-2.5 text-sm"
          />
          <select
            value={newPrefecture}
            onChange={(e) => setNewPrefecture(e.target.value)}
            className="w-full rounded-full border px-4 py-2.5 text-sm"
            aria-label="都道府県（任意）"
          >
            <option value="">都道府県：未選択</option>
            {PREFECTURES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={newSize}
            onChange={(e) => setNewSize(e.target.value as WorkplaceSize | "")}
            className="w-full rounded-full border px-4 py-2.5 text-sm"
          >
            <option value="">規模：未設定</option>
            {(Object.keys(WORKPLACE_SIZE_LABEL) as WorkplaceSize[]).map((key) => (
              <option key={key} value={key}>
                {WORKPLACE_SIZE_LABEL[key]}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddHospital}
            disabled={adding}
            className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {adding ? "追加中…" : "この内容で追加する"}
          </button>
        </div>
      )}

      <div className="space-y-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="病院名（例：横須賀市立市民病院）"
          className="w-full rounded-full border px-5 py-2"
          aria-label="病院名"
        />

        <select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="w-full rounded-full border px-5 py-2"
          aria-label="都道府県"
        >
          <option value="">都道府県：未選択</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!prefecture || cityOptions.length === 0}
          className="w-full rounded-full border px-5 py-2 disabled:bg-gray-50 disabled:text-gray-400"
          aria-label="市区町村"
        >
          <option value="">
            {prefecture ? "市区町村：未選択" : "先に都道府県を選択してください"}
          </option>
          {cityOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value as WorkplaceSize | "")}
          className="w-full rounded-full border px-5 py-2"
          aria-label="病院の規模"
        >
          <option value="">規模を指定しない</option>
          {(Object.keys(WORKPLACE_SIZE_LABEL) as WorkplaceSize[]).map((key) => (
            <option key={key} value={key}>
              {WORKPLACE_SIZE_LABEL[key]}
            </option>
          ))}
        </select>

        {hasDetailData && (
          <>
            <fieldset>
              <legend className="mb-1.5 px-1 text-xs text-gray-500">診療科（選んだものすべてがある病院）</legend>
              <div className="flex flex-wrap gap-1.5">
                {DEPARTMENT_FILTERS.map((d) => {
                  const on = departments.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setDepartments((prev) => (on ? prev.filter((v) => v !== d) : [...prev, d]))
                      }
                      className={`rounded-full border px-3 py-1.5 text-xs ${
                        on ? "border-black bg-black text-white" : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <select
              value={bedType}
              onChange={(e) => setBedType(e.target.value as BedType | "")}
              className="w-full rounded-full border px-5 py-2"
              aria-label="病床の種類"
            >
              <option value="">病床の種類を指定しない</option>
              {(Object.keys(BED_TYPE_LABEL) as BedType[]).map((key) => (
                <option key={key} value={key}>
                  {BED_TYPE_LABEL[key]}
                </option>
              ))}
            </select>
          </>
        )}

        <button
          onClick={handleSearch}
          disabled={searching}
          className="w-full rounded-full bg-black py-2 text-white disabled:opacity-50"
        >
          {searching ? "検索中…" : "🔍 検索"}
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        PTが登録した病院が対象です。規模はPTが任意で設定するため、未設定の病院は規模での絞り込みに出てきません。
      </p>

      {searched && (
        <div className="mt-6 space-y-3">
          {!searching && hospitals.length === 0 && (
            <p className="text-sm text-gray-400">見つかりませんでした</p>
          )}

          {hospitals.map((h) => (
            <Link
              key={h.id}
              href={`/hospitals/${h.id}`}
              className="block rounded-2xl border border-gray-100 p-4 hover:border-gray-300"
            >
              <p className="text-sm font-semibold text-gray-900">{h.name}</p>
              <p className="mt-1 text-xs text-gray-500">
                {[h.prefecture, h.city].filter(Boolean).join(" ") || "地域未設定"}
                {h.size && (
                  <>
                    {" ・ "}
                    {WORKPLACE_SIZE_LABEL[h.size as WorkplaceSize] ?? h.size}
                  </>
                )}
                {h.beds_total ? ` ・ ${h.beds_total}床` : ""}
              </p>
              {h.departments && h.departments.length > 0 && (
                <p className="mt-1 line-clamp-1 text-xs text-gray-400">
                  {h.departments.filter((d) => DEPARTMENT_FILTERS.includes(d)).join("・") || h.departments.slice(0, 6).join("・")}
                </p>
              )}
              {reviewCounts[h.id] > 0 && (
                <p className="mt-1.5">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                    実習生の声 {reviewCounts[h.id]}件
                  </span>
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
