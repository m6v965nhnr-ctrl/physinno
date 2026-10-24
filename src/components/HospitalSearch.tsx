"use client";

import { getLocalUser } from "@/lib/authUser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ACCESS_MODE_LABEL,
  ACCESS_OPTIONS,
  ANNUAL_OPTIONS,
  AccessMode,
  BED_COUNT_OPTIONS,
  BED_TYPE_LABEL,
  BedType,
  EMPLOYMENT_TYPES,
  HOLIDAY_OPTIONS,
  Hospital,
  RECRUIT_TAGS,
  WORKPLACE_SIZE_LABEL,
  WorkplaceSize,
  accessLabel,
  annualLabel,
  createHospital,
  listCitiesByPrefecture,
  searchHospitals,
} from "@/lib/hospitals";
import { internshipReviewCounts } from "@/lib/internship";
import { PREFECTURES } from "@/lib/prefectures";
import { FACILITY_CATEGORIES, typesOf } from "@/lib/facilityTypes";
import { notify } from "@/lib/notify";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS, chipClass } from "@/lib/ui";

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
  const [category, setCategory] = useState(() => searchParams.get("cat") || "");
  const [ftype, setFtype] = useState(() => searchParams.get("typ") || "");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // 「絞り込み」の中身（規模・病床・年収・雇用形態・休日・アクセス・こだわり）と、実習生の声の件数
  const [bedType, setBedType] = useState<BedType | "">(
    () => (searchParams.get("beds") as BedType | "") || ""
  );
  const [bedCount, setBedCount] = useState(() => searchParams.get("bc") || "");
  const [annual, setAnnual] = useState(() => searchParams.get("ann") || "");
  const [employment, setEmployment] = useState(() => searchParams.get("emp") || "");
  const [holiday, setHoliday] = useState(() => searchParams.get("hol") || "");
  const [tags, setTags] = useState<string[]>(() => (searchParams.get("tag") || "").split(",").filter(Boolean));
  const [accessMode, setAccessMode] = useState<AccessMode | "">(() => (searchParams.get("am") as AccessMode | "") || "");
  const [accessMinutes, setAccessMinutes] = useState(() => searchParams.get("amin") || "");
  const [recruitCount, setRecruitCount] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(
    () => ["size", "beds", "bc", "ann", "emp", "hol", "tag", "am", "amin"].some((k) => searchParams.get(k))
  );
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newPrefecture, setNewPrefecture] = useState("");
  const [newSize, setNewSize] = useState<WorkplaceSize | "">("");
  const [newCategory, setNewCategory] = useState("病院・医療機関");
  const [newType, setNewType] = useState("");
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

  // 給与などの情報が入っている病院の数（毎日少しずつ増える）
  useEffect(() => {
    supabase
      .from("hospital_recruit")
      .select("hospital_id", { count: "exact", head: true })
      .not("annual_max", "is", null)
      .then(({ count }) => setRecruitCount(count ?? 0));
  }, []);

  // URLに検索条件があれば、マウント時に自動で検索を復元する
  useEffect(() => {
    if (
      searchParams.get("keyword") ||
      searchParams.get("prefecture") ||
      searchParams.get("city") ||
      searchParams.get("size") ||
      searchParams.get("beds") ||
      searchParams.get("bc") ||
      searchParams.get("ann") ||
      searchParams.get("emp") ||
      searchParams.get("hol") ||
      searchParams.get("tag") ||
      searchParams.get("am") ||
      searchParams.get("amin")
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
      category: category || undefined,
      facilityType: ftype || undefined,
      bedType: bedType || undefined,
      bedCount: bedCount || undefined,
      recruit: {
        annualMin: annual ? Number(annual) : undefined,
        employment: employment || undefined,
        holiday: holiday || undefined,
        tags: tags.length > 0 ? tags : undefined,
        accessMode: accessMode || undefined,
        accessMinutes: accessMinutes ? Number(accessMinutes) : undefined,
      },
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
      ["cat", category],
      ["typ", ftype],
      ["beds", bedType],
      ["bc", bedCount],
      ["ann", annual],
      ["emp", employment],
      ["hol", holiday],
      ["tag", tags.join(",")],
      ["am", accessMode],
      ["amin", accessMinutes],
    ];
    entries.forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeFilterCount = [size, bedType, bedCount, annual, employment, holiday, accessMode, accessMinutes].filter(Boolean).length + (tags.length > 0 ? 1 : 0);

  async function handleAddHospital() {
    if (!newName.trim()) {
      notify("名前を入力してください");
      return;
    }

    const {
      data: { user },
    } = await getLocalUser();

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
      facilityCategory: newCategory,
      facilityType: newType || undefined,
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

          <input aria-label="病院名（必須）"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="病院名（必須）"
            className={INPUT_CLASS}
          />
          <input aria-label="公式サイトURL（任意）"
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            type="url"
            placeholder="公式サイトURL（任意）"
            className={INPUT_CLASS}
          />
          <select
            value={newPrefecture}
            onChange={(e) => setNewPrefecture(e.target.value)}
            className={INPUT_CLASS}
            aria-label="都道府県（任意）"
          >
            <option value="">都道府県：未選択</option>
            {PREFECTURES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select aria-label="勤務先の大分類" value={newCategory} onChange={(e) => { setNewCategory(e.target.value); setNewType(""); }} className={INPUT_CLASS}>
            {FACILITY_CATEGORIES.map((c) => <option key={c.category} value={c.category}>{c.category}</option>)}
          </select>
          <select aria-label="勤務先の種類（任意）" value={newType} onChange={(e) => setNewType(e.target.value)} className={INPUT_CLASS}>
            <option value="">種類：未選択</option>
            {typesOf(newCategory).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            aria-label="規模"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value as WorkplaceSize | "")}
            className={INPUT_CLASS}
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
            className={PRIMARY_BUTTON_CLASS}
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
          className={INPUT_CLASS}
          aria-label="病院名"
        />

        <select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className={INPUT_CLASS}
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
          className={INPUT_CLASS}
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

        <select aria-label="勤務先の種類で絞り込む" value={category} onChange={(e) => { setCategory(e.target.value); setFtype(""); }} className={INPUT_CLASS}>
          <option value="">勤務先の種類：すべて</option>
          {FACILITY_CATEGORIES.map((c) => <option key={c.category} value={c.category}>{c.category}</option>)}
        </select>

        {category && typesOf(category).length > 0 && (
          <select aria-label="施設の種類（細かい分類）で絞り込む" value={ftype} onChange={(e) => setFtype(e.target.value)} className={INPUT_CLASS}>
            <option value="">細かい種類：すべて（老健・デイサービスなど）</option>
            {typesOf(category).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        )}

        {/* 規模・病床・年収・雇用形態・休日・アクセス・こだわりを、1つにまとめる */}
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800"
        >
          <span>
            絞り込み（規模・病床・年収・雇用形態・休日・アクセス）
            {activeFilterCount > 0 && (
              <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-[11px] text-white">{activeFilterCount}</span>
            )}
          </span>
          <span aria-hidden="true" className="text-xs text-gray-400">
            {showFilters ? "▲" : "▼"}
          </span>
        </button>

        {showFilters && (
          <div className="space-y-2 rounded-2xl border border-gray-100 bg-gray-50 p-3">
            <select value={size} onChange={(e) => setSize(e.target.value as WorkplaceSize | "")} className={INPUT_CLASS} aria-label="病院の規模">
              <option value="">規模：指定しない</option>
              {(Object.keys(WORKPLACE_SIZE_LABEL) as WorkplaceSize[]).map((key) => (
                <option key={key} value={key}>
                  {WORKPLACE_SIZE_LABEL[key]}
                </option>
              ))}
            </select>

            <select value={bedCount} onChange={(e) => setBedCount(e.target.value)} className={INPUT_CLASS} aria-label="病床数">
              <option value="">病床数：指定しない</option>
              {BED_COUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select value={bedType} onChange={(e) => setBedType(e.target.value as BedType | "")} className={INPUT_CLASS} aria-label="病床の種類">
              <option value="">病床の種類：指定しない</option>
              {(Object.keys(BED_TYPE_LABEL) as BedType[]).map((key) => (
                <option key={key} value={key}>
                  {BED_TYPE_LABEL[key]}
                </option>
              ))}
            </select>

            <select value={annual} onChange={(e) => setAnnual(e.target.value)} className={INPUT_CLASS} aria-label="年収">
              <option value="">年収：指定しない</option>
              {ANNUAL_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}万円以上
                </option>
              ))}
            </select>

            <select value={employment} onChange={(e) => setEmployment(e.target.value)} className={INPUT_CLASS} aria-label="雇用形態">
              <option value="">雇用形態：指定しない</option>
              {EMPLOYMENT_TYPES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <select value={holiday} onChange={(e) => setHoliday(e.target.value)} className={INPUT_CLASS} aria-label="休日">
              <option value="">休日：指定しない</option>
              {HOLIDAY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              <select value={accessMode} onChange={(e) => setAccessMode(e.target.value as AccessMode | "")} className={INPUT_CLASS} aria-label="アクセスの方法">
                <option value="">アクセス：指定しない</option>
                {(Object.keys(ACCESS_MODE_LABEL) as AccessMode[]).map((k) => (
                  <option key={k} value={k}>
                    {ACCESS_MODE_LABEL[k]}
                  </option>
                ))}
              </select>
              <select value={accessMinutes} onChange={(e) => setAccessMinutes(e.target.value)} className={INPUT_CLASS} aria-label="駅からの時間">
                <option value="">駅からの時間：指定しない</option>
                {ACCESS_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}分以内
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1.5 mt-1 text-xs font-semibold text-gray-500">こだわりポイント</p>
              <div className="flex flex-wrap gap-1.5">
                {RECRUIT_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={tags.includes(t)}
                    onClick={() => setTags(tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t])}
                    className={chipClass(tags.includes(t))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] leading-5 text-gray-400">
              年収・雇用形態・休日・アクセス・こだわりは、情報が入っている病院だけが対象です（年収が分かる病院：{recruitCount ?? "…"}件。病院の採用ページから毎日少しずつ増えます）。年収は、月給なら「月給×12」、賞与が「◯か月分」なら月給にかけて足した目安です。
            </p>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={searching}
          className={PRIMARY_BUTTON_CLASS}
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
              {h.hospital_recruit && (annualLabel(h.hospital_recruit) || accessLabel(h.hospital_recruit)) && (
                <p className="mt-1 text-xs text-gray-600">
                  {[
                    annualLabel(h.hospital_recruit) && `年収の目安 ${annualLabel(h.hospital_recruit)}`,
                    accessLabel(h.hospital_recruit),
                    h.hospital_recruit.employment_types.join("・"),
                  ]
                    .filter(Boolean)
                    .join(" ・ ")}
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
