"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { HOSPITAL_COLUMNS } from "@/lib/hospitalColumns";
import { listCitiesByPrefecture } from "@/lib/hospitals";
import { FACILITY_CATEGORIES, typesOf } from "@/lib/facilityTypes";
import { PREFECTURES } from "@/lib/prefectures";
import { listReviewedHospitals, type ReviewedHospital } from "@/lib/kuchikomi";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS, chipClass } from "@/lib/ui";

type Row = { id: string; name: string; prefecture: string | null; city: string | null; facility_type: string | null };
type Mode = "name" | "filter";

const BUTTON = `${PRIMARY_BUTTON_CLASS} whitespace-nowrap bg-relight-gradient disabled:opacity-60`;

// 施設を探す。「名前で探す」と「条件で絞って探す」を、ボタンで、同じ画面の中で切り替える。
// 口コミのある施設には、件数と平均点を出す（read: 施設の口コミページへ／write: 口コミの投稿画面へ）
export default function FacilitySearch({ mode: linkMode = "read" }: { mode?: "read" | "write" }) {
  const [mode, setMode] = useState<Mode>("name");
  const [keyword, setKeyword] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [ftype, setFtype] = useState("");
  const [reviewedOnly, setReviewedOnly] = useState(false);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reviewed, setReviewed] = useState<ReviewedHospital[]>([]);

  // 口コミのある施設（件数・平均点の表示と、「口コミのある施設だけ」の絞り込みに使う）
  useEffect(() => {
    listReviewedHospitals(1000).then(setReviewed);
  }, []);
  const reviewedMap = useMemo(() => new Map(reviewed.map((r) => [r.id, r])), [reviewed]);

  // 都道府県を選んだら、その県にある市区町村を出す
  useEffect(() => {
    let alive = true;
    setCity("");
    if (!prefecture) {
      setCityOptions([]);
      return;
    }
    listCitiesByPrefecture(prefecture).then((c) => {
      if (alive) setCityOptions(c);
    });
    return () => {
      alive = false;
    };
  }, [prefecture]);

  const matchCategory = (t: string | null) => !category || (ftype ? t === ftype : typesOf(category).includes(t ?? "") || (category === "病院・医療機関" && !t));

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const kw = mode === "name" ? keyword.trim() : "";
    const hasCondition = mode === "name" ? !!(kw || prefecture) : !!(prefecture || city || category || ftype || reviewedOnly);
    if (!hasCondition) return;
    setFailed(false);

    // 口コミのある施設だけ: 口コミの一覧から、条件で絞る
    if (mode === "filter" && reviewedOnly) {
      setRows(reviewed.filter((h) => (!prefecture || h.prefecture === prefecture) && (!city || h.city === city) && matchCategory(h.facility_type)));
      return;
    }

    setBusy(true);
    let q = supabase
      .from("hospitals")
      .select(HOSPITAL_COLUMNS)
      .order("facility_type", { ascending: true, nullsFirst: true })
      .order("name")
      .limit(30);
    if (kw) q = q.ilike("name", `%${kw.replace(/[%,]/g, " ")}%`);
    if (prefecture) q = q.eq("prefecture", prefecture);
    if (mode === "filter") {
      if (city) q = q.eq("city", city);
      if (category) q = q.eq("facility_category", category);
      if (category && ftype) q = q.eq("facility_type", ftype);
    }
    const { data, error } = await q;
    setBusy(false);
    if (error) {
      setFailed(true);
      return;
    }
    setRows((data ?? []) as unknown as Row[]);
  }

  function switchMode(m: Mode) {
    setMode(m);
    setRows(null);
    setFailed(false);
  }

  return (
    <div>
      <div role="tablist" aria-label="探し方" className="flex gap-2">
        {([["name", "名前で探す"], ["filter", "条件で絞って探す"]] as const).map(([m, label]) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => switchMode(m)} className={`${chipClass(mode === m)} px-4 py-2 text-sm`}>
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={search} className="mt-3">
        {mode === "name" ? (
          <div className="grid gap-2 sm:grid-cols-[1fr_10rem_6.5rem]">
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="施設名（例: 〇〇病院）" aria-label="施設名" className={INPUT_CLASS} />
            <select value={prefecture} onChange={(e) => setPrefecture(e.target.value)} aria-label="都道府県" className={INPUT_CLASS}>
              <option value="">都道府県</option>
              {PREFECTURES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <button type="submit" disabled={busy} className={BUTTON}>{busy ? "検索中…" : "探す"}</button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <select value={prefecture} onChange={(e) => setPrefecture(e.target.value)} aria-label="都道府県" className={INPUT_CLASS}>
                <option value="">都道府県：すべて</option>
                {PREFECTURES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!prefecture || cityOptions.length === 0} aria-label="市区町村" className={INPUT_CLASS}>
                <option value="">{prefecture ? "市区町村：すべて" : "市区町村（先に都道府県を選ぶ）"}</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select value={category} onChange={(e) => { setCategory(e.target.value); setFtype(""); }} aria-label="施設の分類" className={INPUT_CLASS}>
                <option value="">施設の分類：すべて</option>
                {FACILITY_CATEGORIES.map((c) => (
                  <option key={c.category} value={c.category}>{c.category}</option>
                ))}
              </select>
              <select value={ftype} onChange={(e) => setFtype(e.target.value)} disabled={!category} aria-label="施設の種類" className={INPUT_CLASS}>
                <option value="">{category ? "施設の種類：すべて" : "施設の種類（先に分類を選ぶ）"}</option>
                {typesOf(category).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 px-1 text-sm text-gray-700">
              <input type="checkbox" checked={reviewedOnly} onChange={(e) => setReviewedOnly(e.target.checked)} />
              口コミのある施設だけ
            </label>
            <button type="submit" disabled={busy} className={`${BUTTON} sm:w-40`}>{busy ? "検索中…" : "この条件で探す"}</button>
          </div>
        )}
      </form>

      {failed && <p role="alert" className="mt-3 text-sm text-red-600">検索できませんでした。もう一度お試しください。</p>}
      {rows && rows.length === 0 && <p className="mt-3 text-sm text-gray-600">見つかりませんでした。条件を変えて、もう一度お試しください。</p>}
      {rows && rows.length > 0 && (
        <ul className="mt-3 space-y-2">
          {rows.map((h) => {
            const rv = reviewedMap.get(h.id);
            return (
              <li key={h.id}>
                <Link href={linkMode === "write" ? `/kuchikomi/${h.id}/write` : `/kuchikomi/${h.id}`} className="block rounded-2xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-400">
                  <span className="block text-sm font-semibold text-gray-900">{h.name}</span>
                  <span className="mt-0.5 block text-xs text-gray-500">{[h.prefecture, h.city].filter(Boolean).join(" ")}{h.facility_type ? ` ・ ${h.facility_type}` : ""}</span>
                  {rv && (
                    <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                      口コミ {rv.review_count}件{rv.avg_overall != null ? ` ・ 平均 ${rv.avg_overall.toFixed(1)} / 10` : ""}
                    </span>
                  )}
                  {linkMode === "write" && <span className="mt-1 block text-xs font-semibold text-gray-900">この施設の口コミを書く →</span>}
                </Link>
              </li>
            );
          })}
          {rows.length >= 30 && <li className="px-1 text-xs text-gray-500">上位30件を表示しています。条件を絞ると、見つけやすくなります。</li>}
        </ul>
      )}
    </div>
  );
}
