"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FIELDS,
  FORMAT_LABEL,
  KINDS,
  REGIONS,
  Seminar,
  dateRangeJa,
  listSavedSeminarIds,
  listUpcomingSeminars,
  setSeminarSaved,
  occursOn,
  toISODate,
} from "@/lib/seminars";
import { notify } from "@/lib/notify";

type FormatFilter = "" | "online" | "offline";

const FEE_OPTIONS = [
  { value: "", label: "指定なし" },
  { value: "0", label: "無料のみ" },
  { value: "5000", label: "〜5,000円" },
  { value: "10000", label: "〜10,000円" },
  { value: "20000", label: "〜20,000円" },
];

const chipBase =
  "min-h-9 rounded-full border px-3.5 py-2 text-xs font-medium transition active:scale-95";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${chipBase} ${
        active
          ? "border-transparent bg-relight-gradient text-white"
          : "border-gray-200 bg-white text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function SeminarNews() {
  const [items, setItems] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<"list" | "calendar" | "saved">("list");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // 絞り込み
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("");
  const [prefectures, setPrefectures] = useState<string[]>([]);
  const [includeOnline, setIncludeOnline] = useState(true);
  const [format, setFormat] = useState<FormatFilter>("");
  const [fields, setFields] = useState<string[]>([]);
  const [kinds, setKinds] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fee, setFee] = useState("");

  const [visibleCount, setVisibleCount] = useState(30);
  const [selected, setSelected] = useState<Seminar | null>(null);

  // カレンダー
  const todayIso = toISODate(new Date());
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<string>("");

  useEffect(() => {
    listUpcomingSeminars().then((rows) => {
      setItems(rows);
      setLoading(false);
    });
    listSavedSeminarIds().then(setSavedIds);
  }, []);

  async function toggleSaved(id: string) {
    const next = !savedIds.includes(id);
    // 先に画面へ反映し、失敗したら元に戻す
    setSavedIds(next ? [...savedIds, id] : savedIds.filter((v) => v !== id));

    const error = await setSeminarSaved(id, next);

    if (error) {
      notify(`保存できませんでした\n${error}`);
      setSavedIds(savedIds);
    }
  }

  const savedItems = useMemo(
    () => items.filter((s) => savedIds.includes(s.id)),
    [items, savedIds]
  );

  const filtered = useMemo(() => {
    const words = keyword
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    const maxFee = fee === "" ? null : Number(fee);
    const regionPrefs = region ? REGIONS[region] || [] : [];

    return items.filter((s) => {
      if (words.length > 0) {
        const text = [s.title, s.organizer, s.summary, s.prefecture, s.kind, s.source_label]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!words.every((w) => text.includes(w))) return false;
      }

      if (region || prefectures.length > 0) {
        const inArea =
          prefectures.length > 0
            ? !!s.prefecture && prefectures.includes(s.prefecture)
            : !!s.prefecture && regionPrefs.includes(s.prefecture);
        const onlineOk = includeOnline && s.format === "online";
        if (!inArea && !onlineOk) return false;
      }

      if (format === "online" && s.format !== "online" && s.format !== "hybrid") return false;
      if (format === "offline" && s.format !== "offline" && s.format !== "hybrid") return false;

      if (fields.length > 0 && !s.fields.some((f) => fields.includes(f))) return false;
      if (kinds.length > 0 && !kinds.includes(s.kind)) return false;

      if (dateFrom && s.end_date < dateFrom) return false;
      if (dateTo && s.start_date > dateTo) return false;

      if (maxFee !== null) {
        if (maxFee === 0) {
          if (!s.is_free) return false;
        } else if (s.fee_yen !== null && s.fee_yen > maxFee) {
          return false;
        }
      }

      return true;
    });
  }, [items, keyword, region, prefectures, includeOnline, format, fields, kinds, dateFrom, dateTo, fee]);

  const activeFilterCount =
    (region || prefectures.length > 0 ? 1 : 0) +
    (format ? 1 : 0) +
    (fields.length > 0 ? 1 : 0) +
    (kinds.length > 0 ? 1 : 0) +
    (dateFrom || dateTo ? 1 : 0) +
    (fee ? 1 : 0);

  function resetFilters() {
    setKeyword("");
    setRegion("");
    setPrefectures([]);
    setIncludeOnline(true);
    setFormat("");
    setFields([]);
    setKinds([]);
    setDateFrom("");
    setDateTo("");
    setFee("");
    setVisibleCount(30);
  }

  const lastUpdated = useMemo(() => {
    const latest = items.reduce((max, s) => (s.seen_at > max ? s.seen_at : max), "");
    if (!latest) return "";
    const d = new Date(latest);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  }, [items]);

  // ---------- カレンダー ----------
  const calendarCells = useMemo(() => {
    const y = month.getFullYear();
    const m = month.getMonth();
    const firstWeekday = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells: { iso: string; day: number; count: number }[] = [];

    for (let i = 0; i < firstWeekday; i++) cells.push({ iso: "", day: 0, count: 0 });

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toISODate(new Date(y, m, d));
      cells.push({ iso, day: d, count: filtered.filter((s) => occursOn(s, iso)).length });
    }

    return cells;
  }, [month, filtered]);

  const dayItems = useMemo(
    () => (selectedDay ? filtered.filter((s) => occursOn(s, selectedDay)) : []),
    [filtered, selectedDay]
  );

  function shiftMonth(delta: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
    setSelectedDay("");
  }

  return (
    <div>
      <p className="text-sm text-gray-500">
        日本理学療法士協会・PT-OT-ST.NET・都道府県理学療法士会などの研修・学会情報を、開催日が近い順に表示します。
      </p>
      {lastUpdated && (
        <p className="mt-1 text-xs text-gray-400">
          毎日0:00に自動更新 / 最終更新 {lastUpdated}
        </p>
      )}

      {/* 検索 */}
      <div className="mt-5 space-y-3">
        <input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setVisibleCount(30);
          }}
          placeholder="キーワード（研修名・主催・地名など）"
          className="w-full rounded-full border px-5 py-3"
         aria-label="キーワード（研修名・主催・地名など）"/>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 rounded-full border border-gray-300 bg-white py-2.5 text-sm font-medium"
          >
            絞り込み{activeFilterCount > 0 ? `（${activeFilterCount}）` : ""}
            <span className="ml-1 text-xs text-gray-400">{showFilters ? "▲" : "▼"}</span>
          </button>

          <button
            type="button"
            onClick={() => setView(view === "calendar" ? "list" : "calendar")}
            className={`flex-1 rounded-full border py-2.5 text-sm font-medium ${
              view === "calendar" ? "border-black bg-gray-50" : "border-gray-300 bg-white"
            }`}
          >
            📅 カレンダー
          </button>

          <button
            type="button"
            onClick={() => setView(view === "saved" ? "list" : "saved")}
            className={`flex-1 rounded-full border py-2.5 text-sm font-medium ${
              view === "saved" ? "border-black bg-gray-50" : "border-gray-300 bg-white"
            }`}
          >
            🔖 保存済み{savedIds.length > 0 ? `（${savedIds.length}）` : ""}
          </button>
        </div>
      </div>

      {/* 絞り込みパネル */}
      {showFilters && (
        <div className="mt-4 space-y-5 rounded-3xl border border-gray-100 bg-gray-50 p-5">
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">地域</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(REGIONS).map((r) => (
                <Chip
                  key={r}
                  active={region === r}
                  onClick={() => {
                    setRegion(region === r ? "" : r);
                    setPrefectures([]);
                  }}
                >
                  {r}
                </Chip>
              ))}
            </div>

            {region && (
              <div className="mt-3">
                <p className="mb-2 text-xs text-gray-400">都道府県で絞る（未選択なら{region}すべて）</p>
                <div className="flex flex-wrap gap-2">
                  {REGIONS[region].map((p) => (
                    <Chip
                      key={p}
                      active={prefectures.includes(p)}
                      onClick={() => setPrefectures(toggle(prefectures, p))}
                    >
                      {p}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {region && (
              <label className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={includeOnline}
                  onChange={(e) => setIncludeOnline(e.target.checked)}
                />
                オンライン開催も含める
              </label>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">開催形式</p>
            <div className="flex flex-wrap gap-2">
              <Chip active={format === ""} onClick={() => setFormat("")}>
                指定なし
              </Chip>
              <Chip active={format === "online"} onClick={() => setFormat("online")}>
                オンライン
              </Chip>
              <Chip active={format === "offline"} onClick={() => setFormat("offline")}>
                オフライン（対面）
              </Chip>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">分野</p>
            <div className="flex flex-wrap gap-2">
              {FIELDS.map((f) => (
                <Chip key={f} active={fields.includes(f)} onClick={() => setFields(toggle(fields, f))}>
                  {f}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">種類</p>
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <Chip key={k} active={kinds.includes(k)} onClick={() => setKinds(toggle(kinds, k))}>
                  {k}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">開催日</p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                aria-label="開催日（開始）"
                min={todayIso}
                onChange={(e) => setDateFrom(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border bg-white px-3 py-2 text-sm"
              />
              <span className="text-gray-400">〜</span>
              <input
                type="date"
                value={dateTo}
                aria-label="開催日（終了）"
                min={todayIso}
                onChange={(e) => setDateTo(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">参加費</p>
            <div className="flex flex-wrap gap-2">
              {FEE_OPTIONS.map((o) => (
                <Chip key={o.value} active={fee === o.value} onClick={() => setFee(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              金額が掲載されていないものは、上限指定でも表示されます。
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="w-full rounded-full border border-gray-300 bg-white py-2 text-sm text-gray-600"
          >
            条件をリセット
          </button>
        </div>
      )}

      <p className="mt-5 text-sm text-gray-500">
        {loading
          ? "読み込み中..."
          : view === "saved"
            ? `保存済み ${savedItems.length}件`
            : `${filtered.length}件`}
      </p>

      {/* カレンダー */}
      {view === "calendar" && !loading && (
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="前の月"
              className="min-h-10 rounded-full border px-4 py-1.5 text-sm"
            >
              ←
            </button>
            <p className="font-semibold">
              {month.getFullYear()}年{month.getMonth() + 1}月
            </p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="次の月"
              className="min-h-10 rounded-full border px-4 py-1.5 text-sm"
            >
              →
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 text-center text-xs text-gray-400">
            {["日", "月", "火", "水", "木", "金", "土"].map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((c, i) =>
              c.day === 0 ? (
                <div key={`e${i}`} />
              ) : (
                <button
                  key={c.iso}
                  type="button"
                  onClick={() => setSelectedDay(selectedDay === c.iso ? "" : c.iso)}
                  aria-label={`${month.getMonth() + 1}月${c.day}日 ${c.count}件`}
                  aria-pressed={selectedDay === c.iso}
                  className={`flex h-14 flex-col items-center justify-start rounded-xl border pt-1.5 text-sm transition ${
                    selectedDay === c.iso
                      ? "border-black bg-gray-50"
                      : c.iso === todayIso
                        ? "border-gray-400"
                        : "border-gray-100"
                  } ${c.iso < todayIso ? "text-gray-300" : "text-gray-800"}`}
                >
                  <span>{c.day}</span>
                  {c.count > 0 && (
                    <span className="mt-1 rounded-full bg-relight-gradient px-1.5 text-[10px] font-semibold leading-4 text-white">
                      {c.count}
                    </span>
                  )}
                </button>
              )
            )}
          </div>

          <div className="mt-5">
            {selectedDay ? (
              <>
                <p className="mb-3 text-sm font-semibold">
                  {selectedDay.replace(/-/g, "/")} の研修・学会（{dayItems.length}件）
                </p>
                <SeminarList items={dayItems} onSelect={setSelected} savedIds={savedIds} onToggleSaved={toggleSaved} />
              </>
            ) : (
              <p className="text-center text-xs text-gray-400">
                日付をタップすると、その日の研修・学会が表示されます
              </p>
            )}
          </div>
        </div>
      )}

      {/* リスト */}
      {view === "list" && !loading && (
        <div className="mt-3">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">
              条件に合う研修・学会はありません
            </p>
          ) : (
            <>
              <SeminarList items={filtered.slice(0, visibleCount)} onSelect={setSelected} savedIds={savedIds} onToggleSaved={toggleSaved} />

              {visibleCount < filtered.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(visibleCount + 30)}
                  className="mt-5 w-full rounded-full border border-gray-300 py-3 text-sm font-medium"
                >
                  もっと見る（残り{filtered.length - visibleCount}件）
                </button>
              )}
            </>
          )}
        </div>
      )}

      {view === "saved" && !loading && (
        <div className="mt-3">
          {savedItems.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">
              保存した研修・学会はまだありません
              <br />
              気になるものの 🔖 をタップして保存できます
            </p>
          ) : (
            <SeminarList
              items={savedItems}
              onSelect={setSelected}
              savedIds={savedIds}
              onToggleSaved={toggleSaved}
            />
          )}
        </div>
      )}

      {selected && (
        <SeminarDetail
          seminar={selected}
          saved={savedIds.includes(selected.id)}
          onToggleSaved={() => toggleSaved(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function FormatBadge({ format }: { format: Seminar["format"] }) {
  if (!format) return null;

  const style =
    format === "online"
      ? "bg-blue-50 text-blue-600"
      : format === "offline"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-purple-50 text-purple-600";

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${style}`}>
      {FORMAT_LABEL[format]}
    </span>
  );
}

function SaveButton({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={saved ? "保存を解除" : "保存する"}
      aria-pressed={saved}
      className={`min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition active:scale-95 ${
        saved ? "border-transparent bg-relight-gradient text-white" : "border-gray-200 bg-white text-gray-500"
      }`}
    >
      {saved ? "🔖 保存済み" : "🔖 保存"}
    </button>
  );
}

function SeminarList({
  items,
  onSelect,
  savedIds,
  onToggleSaved,
}: {
  items: Seminar[];
  onSelect: (s: Seminar) => void;
  savedIds: string[];
  onToggleSaved: (id: string) => void;
}) {
  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-gray-400">該当する研修・学会はありません</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div
          key={s.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(s)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(s);
            }
          }}
          className="block w-full cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-gray-900">{dateRangeJa(s)}</p>
            <SaveButton saved={savedIds.includes(s.id)} onClick={() => onToggleSaved(s.id)} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
              {s.kind}
            </span>
            <FormatBadge format={s.format} />
            {s.prefecture && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                {s.prefecture}
              </span>
            )}
            {s.is_free && (
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-600">
                無料
              </span>
            )}
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-800">{s.title}</p>

          <p className="mt-2 text-xs text-gray-400">
            {s.organizer ? `${s.organizer} ・ ` : ""}
            {s.fee_yen !== null && !s.is_free ? `${s.fee_yen.toLocaleString()}円〜` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

function SeminarDetail({
  seminar: s,
  saved,
  onToggleSaved,
  onClose,
}: {
  seminar: Seminar;
  saved: boolean;
  onToggleSaved: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={s.title}
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-3xl bg-white p-6 sm:rounded-3xl"
        style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
              {s.kind}
            </span>
            <FormatBadge format={s.format} />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="-mr-2 -mt-2 px-3 py-2 text-2xl leading-none text-gray-400"
          >
            ×
          </button>
        </div>

        <h2 className="mt-4 text-lg font-semibold leading-7">{s.title}</h2>

        <dl className="mt-5 space-y-3 text-sm">
          <Row label="開催日" value={dateRangeJa(s)} />
          {s.date_text && s.date_text !== dateRangeJa(s) && <Row label="日時" value={s.date_text} />}
          <Row label="主催" value={s.organizer} />
          <Row label="開催地" value={s.prefecture} />
          <Row
            label="参加費"
            value={s.fee_text ?? (s.is_free ? "無料" : s.fee_yen !== null ? `${s.fee_yen.toLocaleString()}円〜` : null)}
          />
          <Row label="分野" value={s.fields.join("・")} />
          <Row label="情報元" value={s.source_label} />
        </dl>

        {s.summary && (
          <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-gray-50 p-4 text-xs leading-6 text-gray-600">
            {s.summary}
          </p>
        )}

        <button
          type="button"
          onClick={onToggleSaved}
          className={`mt-6 block w-full rounded-full border py-3 text-center text-sm font-medium ${
            saved ? "border-black bg-gray-50" : "border-gray-300 bg-white"
          }`}
        >
          {saved ? "🔖 保存済み（タップで解除）" : "🔖 保存する"}
        </button>

        <a
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full rounded-full bg-relight-gradient py-3 text-center text-sm font-medium text-white"
        >
          詳細・申込ページを開く ↗
        </a>

        <p className="mt-3 break-all text-center text-[11px] text-gray-400">{s.url}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;

  return (
    <div className="flex gap-3">
      <dt className="w-16 shrink-0 text-gray-400">{label}</dt>
      <dd className="min-w-0 whitespace-pre-wrap break-words text-gray-800">{value}</dd>
    </div>
  );
}
