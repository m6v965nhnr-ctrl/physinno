"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { supabase } from "@/lib/supabase";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  DEFAULT_STATUS,
  ItemKind,
  KIND_LABEL,
  KIND_STATUSES,
  PRACTICUM_TYPES,
  PRACTICUM_TYPE_LABEL,
  PracticumType,
  StudentItem,
  addStudentItem,
  daysUntil,
  deleteStudentItem,
  isClosedStatus,
  listStudentItems,
  updateStudentItem,
} from "@/lib/student";

const KINDS: ItemKind[] = ["practicum", "job", "task"];

const TITLE_PLACEHOLDER: Record<ItemKind, string> = {
  practicum: "例: 〇〇病院（評価実習）",
  job: "例: △△病院 リハビリテーション科",
  task: "例: 実習日誌（第2週分）",
};

function dayText(days: number) {
  if (days > 0) return `あと${days}日`;
  if (days === 0) return "今日";
  return `${-days}日超過`;
}

function formatDate(d: string | null) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${y}/${Number(m)}/${Number(day)}`;
}

export default function TrackerPage() {
  const { loading, userId } = useMyAccount(["student"]);

  const [items, setItems] = useState<StudentItem[]>([]);
  const [kind, setKind] = useState<ItemKind>("practicum");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS.practicum);
  const [practicumType, setPracticumType] = useState<PracticumType>("evaluation");
  const [startsOn, setStartsOn] = useState("");
  const [endsOn, setEndsOn] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [memo, setMemo] = useState("");

  // 病院を検索して選ぶと、病院ページ・実習生の声と結びつく(任意)
  const [hospitalQuery, setHospitalQuery] = useState("");
  const [hospitalResults, setHospitalResults] = useState<{ id: string; name: string; prefecture: string | null }[]>([]);
  const [pickedHospital, setPickedHospital] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const q = hospitalQuery.trim();
    if (q.length < 2) {
      setHospitalResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("hospitals")
        .select("id, name, prefecture")
        .ilike("name", `%${q}%`)
        .order("name")
        .limit(6);
      setHospitalResults(data || []);
    }, 250);
    return () => clearTimeout(timer);
  }, [hospitalQuery]);

  const load = useCallback(async () => {
    if (!userId) return;
    setItems(await listStudentItems(userId));
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  function selectKind(k: ItemKind) {
    setKind(k);
    setStatus(DEFAULT_STATUS[k]);
    setShowForm(false);
  }

  function resetForm() {
    setTitle("");
    setStartsOn("");
    setEndsOn("");
    setDueOn("");
    setMemo("");
    setStatus(DEFAULT_STATUS[kind]);
    setHospitalQuery("");
    setHospitalResults([]);
    setPickedHospital(null);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      notify("名前を入力してください");
      return;
    }

    if (startsOn && endsOn && endsOn < startsOn) {
      notify("終了日は開始日より後の日付にしてください");
      return;
    }

    setSaving(true);
    const error = await addStudentItem({
      kind,
      status,
      title,
      hospital_id: pickedHospital?.id ?? null,
      practicum_type: kind === "practicum" ? practicumType : null,
      starts_on: kind === "practicum" ? startsOn : null,
      ends_on: kind === "practicum" ? endsOn : null,
      due_on: dueOn,
      memo,
    });
    setSaving(false);

    if (error) {
      notify(`保存できませんでした: ${error}`);
      return;
    }

    resetForm();
    setShowForm(false);
    load();
  }

  async function handleStatus(item: StudentItem, next: string) {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: next } : i)));
    const error = await updateStudentItem(item.id, { status: next });
    if (error) {
      notify("更新できませんでした");
      load();
    }
  }

  async function handleDelete(item: StudentItem) {
    if (!confirm(`「${item.title}」を削除しますか？`)) return;
    const error = await deleteStudentItem(item.id);
    if (error) {
      notify("削除できませんでした");
      return;
    }
    load();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const shown = items
    .filter((i) => i.kind === kind)
    .sort((a, b) => {
      const ac = isClosedStatus(a.kind, a.status) ? 1 : 0;
      const bc = isClosedStatus(b.kind, b.status) ? 1 : 0;
      if (ac !== bc) return ac - bc;
      const ad = a.due_on ?? a.starts_on ?? "9999-12-31";
      const bd = b.due_on ?? b.starts_on ?? "9999-12-31";
      return ad.localeCompare(bd);
    });

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student" className="text-sm text-gray-400">
            ← 学生ホーム
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">実習・就活トラッカー</h1>
          <p className="mt-1 text-xs text-gray-500">
            実習先、病院見学・応募、提出物をまとめて管理します。あなただけに表示されます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-5">
        <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-sm" role="tablist">
          {KINDS.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => selectKind(k)}
              className={`flex-1 rounded-full px-2 py-2 ${
                kind === k ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {KIND_LABEL[k]}
              <span className="ml-1 text-xs text-gray-400">
                {items.filter((i) => i.kind === k && !isClosedStatus(i.kind, i.status)).length || ""}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {kind === "job" && (
              <>
                病院ページの「見学したい」からも追加できます。{" "}
                <Link href="/pts?tab=search&mode=hospitals" className="underline">
                  病院を探す
                </Link>
              </>
            )}
          </p>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="shrink-0 rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
          >
            {showForm ? "閉じる" : "+ 追加"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="mt-4 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            {kind !== "task" && (
              <div className="text-xs text-gray-500">
                病院を探して選ぶ（任意。選ぶと病院ページとつながります）
                {pickedHospital ? (
                  <p className="mt-1 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    <span className="truncate">🏥 {pickedHospital.name}</span>
                    <button
                      type="button"
                      onClick={() => setPickedHospital(null)}
                      className="ml-2 shrink-0 text-xs text-emerald-700 underline"
                    >
                      解除
                    </button>
                  </p>
                ) : (
                  <>
                    <input
                      value={hospitalQuery}
                      onChange={(e) => setHospitalQuery(e.target.value)}
                      placeholder="病院名の一部を入力（例: 市民病院）"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                    />
                    {hospitalResults.length > 0 && (
                      <ul className="mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
                        {hospitalResults.map((h) => (
                          <li key={h.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setPickedHospital({ id: h.id, name: h.name });
                                if (!title.trim()) setTitle(h.name);
                                setHospitalQuery("");
                                setHospitalResults([]);
                              }}
                              className="block w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                            >
                              {h.name}
                              <span className="ml-2 text-[11px] text-gray-400">{h.prefecture}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}

            <label className="block text-xs text-gray-500">
              {kind === "task" ? "提出物・やること" : "名前（病院・施設名など）"}
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                placeholder={TITLE_PLACEHOLDER[kind]}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-gray-500">
                状況
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                >
                  {KIND_STATUSES[kind].map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>

              {kind === "practicum" && (
                <label className="block text-xs text-gray-500">
                  実習の種類
                  <select
                    value={practicumType}
                    onChange={(e) => setPracticumType(e.target.value as PracticumType)}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                  >
                    {PRACTICUM_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {PRACTICUM_TYPE_LABEL[t]}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            {kind === "practicum" && (
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs text-gray-500">
                  開始日
                  <input
                    type="date"
                    value={startsOn}
                    onChange={(e) => setStartsOn(e.target.value)}
                    className="mt-1 block w-full min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                  />
                </label>
                <label className="block text-xs text-gray-500">
                  終了日
                  <input
                    type="date"
                    value={endsOn}
                    onChange={(e) => setEndsOn(e.target.value)}
                    className="mt-1 block w-full min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                  />
                </label>
              </div>
            )}

            <label className="block text-xs text-gray-500">
              {kind === "task" ? "提出期限" : kind === "job" ? "見学・面接などの日（任意）" : "レポートなどの期限（任意）"}
              <input
                type="date"
                value={dueOn}
                onChange={(e) => setDueOn(e.target.value)}
                className="mt-1 block w-full min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <label className="block text-xs text-gray-500">
              メモ（任意）
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                maxLength={2000}
                rows={2}
                placeholder="持ち物、連絡先、聞きたいことなど（患者さんの情報は書かないでください）"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {saving ? "保存中…" : "追加する"}
            </button>
          </form>
        )}

        <ul className="mt-4 space-y-3">
          {shown.length === 0 ? (
            <li className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
              まだ登録がありません。右上の「+ 追加」から登録できます。
            </li>
          ) : (
            shown.map((item) => {
              const closed = isClosedStatus(item.kind, item.status);
              const due = item.due_on ? daysUntil(item.due_on) : null;

              return (
                <li
                  key={item.id}
                  className={`rounded-2xl bg-white p-4 shadow-sm ${closed ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {item.hospital_id ? (
                          <Link href={`/hospitals/${item.hospital_id}`} className="underline underline-offset-2">
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </p>

                      {item.kind === "practicum" && (
                        <p className="mt-1 text-xs text-gray-500">
                          {item.practicum_type ? PRACTICUM_TYPE_LABEL[item.practicum_type] : ""}
                          {item.starts_on ? `　${formatDate(item.starts_on)}〜${formatDate(item.ends_on)}` : ""}
                        </p>
                      )}

                      {item.due_on && (
                        <p className={`mt-1 text-xs ${!closed && due !== null && due <= 3 ? "font-semibold text-red-600" : "text-gray-500"}`}>
                          {item.kind === "task" ? "期限" : "日付"}: {formatDate(item.due_on)}
                          {!closed && due !== null ? `（${dayText(due)}）` : ""}
                        </p>
                      )}

                      {item.memo && (
                        <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-gray-600">{item.memo}</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(item)}
                      aria-label={`${item.title}を削除`}
                      className="shrink-0 text-gray-400 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>

                  {item.kind === "practicum" && item.hospital_id && (
                    <Link
                      href={`/hospitals/${item.hospital_id}?internship=1`}
                      className="mt-3 inline-block rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800"
                    >
                      ✍️ この実習先の「実習生の声」を書く
                    </Link>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {KIND_STATUSES[item.kind].map((s) => (
                      <button
                        key={s.value}
                        onClick={() => handleStatus(item, s.value)}
                        aria-pressed={item.status === s.value}
                        className={`rounded-full border px-2.5 py-1 text-[11px] ${
                          item.status === s.value
                            ? "border-black bg-black text-white"
                            : "border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </main>
  );
}
