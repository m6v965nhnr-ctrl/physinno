"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ACCESS_MODE_LABEL,
  AccessMode,
  EMPLOYMENT_TYPES,
  HOLIDAY_OPTIONS,
  HospitalRecruit,
  RECRUIT_TAGS,
  accessLabel,
  annualLabel,
} from "@/lib/hospitals";
import { notify } from "@/lib/notify";
import { INPUT_CLASS, chipClass } from "@/lib/ui";

const man = (yen: number | null) => (yen == null ? "" : String(Math.round(yen / 100) / 100));
const toYen = (v: string) => (v.trim() === "" || Number.isNaN(Number(v)) ? null : Math.round(Number(v) * 10000));
const toInt = (v: string) => (v.trim() === "" || Number.isNaN(Number(v)) ? null : Math.round(Number(v)));

// 採用の目安（雇用形態・年収・休日・アクセス・こだわり）。検索の絞り込みに使われる。
// 書けるのは、「ここで働いています」と答えたPTだけ（DBでも同じ条件で守っている）
export default function HospitalRecruitCard({
  hospitalId,
  canEdit,
  ensureCanEdit,
}: {
  hospitalId: string;
  canEdit: boolean;
  ensureCanEdit: () => Promise<boolean>;
}) {
  const [row, setRow] = useState<HospitalRecruit | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [types, setTypes] = useState<string[]>([]);
  const [monthlyMin, setMonthlyMin] = useState("");
  const [monthlyMax, setMonthlyMax] = useState("");
  const [bonus, setBonus] = useState("");
  const [annualMin, setAnnualMin] = useState("");
  const [annualMax, setAnnualMax] = useState("");
  const [weekly, setWeekly] = useState("");
  const [holidays, setHolidays] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [station, setStation] = useState("");
  const [minutes, setMinutes] = useState("");
  const [mode, setMode] = useState<AccessMode | "">("");

  async function load() {
    const { data } = await supabase.from("hospital_recruit").select("*").eq("hospital_id", hospitalId).maybeSingle();
    setRow((data as HospitalRecruit | null) ?? null);
    setLoaded(true);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalId]);

  async function openEditor() {
    if (!(await ensureCanEdit())) return;
    setTypes(row?.employment_types ?? []);
    setMonthlyMin(man(row?.monthly_min ?? null));
    setMonthlyMax(man(row?.monthly_max ?? null));
    setBonus(row?.bonus_months != null ? String(row.bonus_months) : "");
    setAnnualMin(man(row?.annual_stated_min ?? null));
    setAnnualMax(man(row?.annual_stated_max ?? null));
    setWeekly(row?.weekly_off_days != null ? String(row.weekly_off_days) : "");
    setHolidays(row?.annual_holidays != null ? String(row.annual_holidays) : "");
    setTags(row?.tags ?? []);
    setStation(row?.access_station ?? "");
    setMinutes(row?.access_minutes != null ? String(row.access_minutes) : "");
    setMode(row?.access_mode ?? "");
    setEditing(true);
  }

  async function save() {
    setSaving(true);
    const { error } = await supabase.from("hospital_recruit").upsert({
      hospital_id: hospitalId,
      employment_types: types,
      monthly_min: toYen(monthlyMin),
      monthly_max: toYen(monthlyMax),
      bonus_months: bonus.trim() === "" ? null : Number(bonus),
      annual_stated_min: toYen(annualMin),
      annual_stated_max: toYen(annualMax),
      weekly_off_days: toInt(weekly),
      annual_holidays: toInt(holidays),
      tags,
      access_station: station.trim() || null,
      access_minutes: toInt(minutes),
      access_mode: mode || null,
      source_name: "この病院で働くPT",
      source_url: null,
      fetched_at: null,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);

    if (error) {
      notify("保存できませんでした。入力の範囲（月給・賞与・休日の数字）を確認してください");
      return;
    }
    notify("採用の目安を更新しました");
    setEditing(false);
    load();
  }

  if (!loaded) return null;

  const annual = row ? annualLabel(row) : null;
  const access = row ? accessLabel(row) : null;
  const weeklyLabel = row?.weekly_off_days ? `週休${row.weekly_off_days}日` : null;
  const holidayLabel = row?.annual_holidays ? `年間休日${row.annual_holidays}日` : null;
  const empty = !row || (!annual && !access && !weeklyLabel && !holidayLabel && row.tags.length === 0 && row.employment_types.length === 0);

  if (editing) {
    const previewMonthly = toYen(monthlyMax) ?? toYen(monthlyMin);
    const previewBonus = bonus.trim() === "" ? 0 : Number(bonus);
    return (
      <div className="mt-4 space-y-3 rounded-2xl bg-gray-50 p-4">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-gray-500">雇用形態</p>
          <div className="flex flex-wrap gap-1.5">
            {EMPLOYMENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={types.includes(t)}
                onClick={() => setTypes(types.includes(t) ? types.filter((x) => x !== t) : [...types, t])}
                className={chipClass(types.includes(t))}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold text-gray-500">月給（万円。基本給＋固定の手当）</p>
          <div className="flex items-center gap-2">
            <input aria-label="月給の下限（万円）" inputMode="decimal" value={monthlyMin} onChange={(e) => setMonthlyMin(e.target.value)} placeholder="例：24" className={INPUT_CLASS} />
            <span className="text-gray-400">〜</span>
            <input aria-label="月給の上限（万円）" inputMode="decimal" value={monthlyMax} onChange={(e) => setMonthlyMax(e.target.value)} placeholder="例：30" className={INPUT_CLASS} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input aria-label="賞与（か月分）" inputMode="decimal" value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder="賞与：年に何か月分（例：4.2）" className={INPUT_CLASS} />
          </div>
          {previewMonthly && (
            <p className="mt-1.5 text-[11px] text-gray-500">
              年収の目安（自動）: 約{Math.round((previewMonthly * (12 + (Number.isNaN(previewBonus) ? 0 : previewBonus))) / 10000)}万円（月給×(12＋賞与の月数)）
            </p>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold text-gray-500">年収が直接書いてあるとき（万円。あれば、こちらを使います）</p>
          <div className="flex items-center gap-2">
            <input aria-label="年収の下限（万円）" inputMode="decimal" value={annualMin} onChange={(e) => setAnnualMin(e.target.value)} placeholder="例：400" className={INPUT_CLASS} />
            <span className="text-gray-400">〜</span>
            <input aria-label="年収の上限（万円）" inputMode="decimal" value={annualMax} onChange={(e) => setAnnualMax(e.target.value)} placeholder="例：520" className={INPUT_CLASS} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select aria-label="週休" value={weekly} onChange={(e) => setWeekly(e.target.value)} className={INPUT_CLASS}>
            <option value="">週休：未設定</option>
            <option value="1">週休1日</option>
            <option value="2">週休2日</option>
            <option value="3">週休3日</option>
          </select>
          <input aria-label="年間休日" inputMode="numeric" value={holidays} onChange={(e) => setHolidays(e.target.value)} placeholder="年間休日（例：120）" className={INPUT_CLASS} />
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold text-gray-500">アクセス</p>
          <input aria-label="最寄り駅" value={station} onChange={(e) => setStation(e.target.value)} placeholder="最寄り駅（例：横須賀中央駅）" className={INPUT_CLASS} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <select aria-label="アクセスの方法" value={mode} onChange={(e) => setMode(e.target.value as AccessMode | "")} className={INPUT_CLASS}>
              <option value="">方法：未設定</option>
              {(Object.keys(ACCESS_MODE_LABEL) as AccessMode[]).map((k) => (
                <option key={k} value={k}>
                  {ACCESS_MODE_LABEL[k]}
                </option>
              ))}
            </select>
            <input aria-label="駅からの時間（分）" inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="駅から何分（例：10）" className={INPUT_CLASS} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold text-gray-500">こだわりポイント</p>
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

        <div className="flex gap-2 pt-1">
          <button onClick={() => setEditing(false)} className="flex-1 rounded-full border bg-white py-2 text-sm text-gray-600">
            キャンセル
          </button>
          <button onClick={save} disabled={saving} className="flex-1 rounded-full bg-black py-2 text-sm text-white disabled:opacity-50">
            {saving ? "保存中…" : "保存する"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {empty ? (
        <p className="text-sm text-gray-400">給与・休日・アクセスは、まだ登録されていません{canEdit ? "" : "（ここで働くPTが入力できます）"}</p>
      ) : (
        <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
          {row!.employment_types.length > 0 && (
            <>
              <dt className="text-gray-400">雇用形態</dt>
              <dd className="text-gray-800">{row!.employment_types.join("・")}</dd>
            </>
          )}
          {annual && (
            <>
              <dt className="text-gray-400">年収の目安</dt>
              <dd className="text-gray-800">
                {annual}
                <span className="ml-1 text-[11px] text-gray-400">
                  {row!.annual_stated_min || row!.annual_stated_max ? "（記載の金額）" : row!.bonus_months ? `（月給×(12＋賞与${row!.bonus_months}か月)）` : "（月給×12）"}
                </span>
              </dd>
            </>
          )}
          {(weeklyLabel || holidayLabel) && (
            <>
              <dt className="text-gray-400">休日</dt>
              <dd className="text-gray-800">{[weeklyLabel, holidayLabel].filter(Boolean).join("・")}</dd>
            </>
          )}
          {access && (
            <>
              <dt className="text-gray-400">アクセス</dt>
              <dd className="text-gray-800">{access}</dd>
            </>
          )}
          {row!.tags.length > 0 && (
            <>
              <dt className="text-gray-400">こだわり</dt>
              <dd className="flex flex-wrap gap-1">
                {row!.tags.map((t) => (
                  <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                    {t}
                  </span>
                ))}
              </dd>
            </>
          )}
        </dl>
      )}

      {row && !empty && (
        <p className="mt-2 text-[11px] text-gray-400">
          出典：{row.source_name ?? "不明"}
          {row.source_url && (
            <>
              {" "}
              <a href={row.source_url} target="_blank" rel="noopener noreferrer" className="underline">
                元のページ
              </a>
            </>
          )}
          ・{(row.fetched_at ?? row.updated_at).slice(0, 10)} 時点。最新は、病院の採用ページでご確認ください。
        </p>
      )}

      {canEdit && (
        <button onClick={openEditor} className="mt-2 text-xs text-gray-400 hover:text-gray-700">
          給与・休日・アクセスを入力する
        </button>
      )}
    </div>
  );
}
