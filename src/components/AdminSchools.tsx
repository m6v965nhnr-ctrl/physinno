"use client";

import { useCallback, useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import {
  AdminSchool,
  SchoolMember,
  adminGetRequiresSchool,
  adminListSchoolMembers,
  adminListSchools,
  adminRemoveSchoolMember,
  adminRotateSchoolCode,
  adminSaveSchool,
  adminSetRequiresSchool,
  adminSetSchoolStatus,
} from "@/lib/school";

type Draft = { id: string | null; name: string; validFrom: string; validUntil: string; seatLimit: string; plan: string; note: string };
const EMPTY: Draft = { id: null, name: "", validFrom: "", validUntil: "", seatLimit: "", plan: "standard", note: "" };

// 運営用: 学校の契約（学校コード・期間・人数）と、一問一答の「学校コード必須」の切り替え
export default function AdminSchools() {
  const [schools, setSchools] = useState<AdminSchool[]>([]);
  const [required, setRequired] = useState<boolean | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [tried, setTried] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [members, setMembers] = useState<SchoolMember[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [s, r] = await Promise.all([adminListSchools(), adminGetRequiresSchool()]);
    setSchools(s);
    setRequired(r);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function toggleRequired() {
    const next = !required;
    const msg = next
      ? "一問一答を、「学校コードで所属した人だけ」が使える設定にします。\n\n・学校に所属していない人（いまの学生・PTを含む）は、すぐに、一問一答が使えなくなります。\n・運営は、いつも使えます。\n・ログインなしの過去問ページ（/kokushi）は、そのままです。\n\n本当にオンにしますか？"
      : "学校コードがなくても、一問一答を使える設定に戻します。よろしいですか？";
    if (!(await askConfirm(msg, { okLabel: next ? "オンにする" : "オフにする", danger: next }))) return;
    setBusy(true);
    const ok = await adminSetRequiresSchool(next);
    setBusy(false);
    if (!ok) return notify("変更できませんでした");
    load();
  }

  async function save() {
    if (!draft) return;
    if (!draft.name.trim()) {
      setTried(true);
      return;
    }
    setBusy(true);
    const ok = await adminSaveSchool({
      id: draft.id,
      name: draft.name.trim(),
      validFrom: draft.validFrom || null,
      validUntil: draft.validUntil || null,
      seatLimit: draft.seatLimit ? Number(draft.seatLimit) : null,
      plan: draft.plan,
      note: draft.note,
    });
    setBusy(false);
    if (!ok) return notify("保存できませんでした（期間・人数を確かめてください）");
    setDraft(null);
    setTried(false);
    load();
  }

  async function rotate(s: AdminSchool) {
    if (!(await askConfirm(`「${s.name}」の学校コードを、新しく発行します。古いコードは、すぐに使えなくなります（すでに所属している人は、そのままです）。よろしいですか？`, { okLabel: "再発行する" }))) return;
    const code = await adminRotateSchoolCode(s.id);
    if (!code) return notify("再発行できませんでした");
    notify(`新しい学校コード: ${code}`);
    load();
  }

  async function setStatus(s: AdminSchool) {
    const stop = s.status === "active";
    if (!(await askConfirm(`「${s.name}」を${stop ? "停止" : "再開"}します。${stop ? "停止すると、この学校に所属している人は、すぐに、学校コードが必要な機能を使えなくなります。" : ""}よろしいですか？`, { okLabel: stop ? "停止する" : "再開する", danger: stop }))) return;
    if (!(await adminSetSchoolStatus(s.id, stop ? "suspended" : "active"))) return notify("変更できませんでした");
    load();
  }

  async function toggleMembers(s: AdminSchool) {
    if (openId === s.id) return setOpenId(null);
    setOpenId(s.id);
    setMembers(await adminListSchoolMembers(s.id));
  }

  async function remove(m: SchoolMember, s: AdminSchool) {
    if (!(await askConfirm(`${m.name ?? m.email ?? "このユーザー"} を、「${s.name}」から外します。よろしいですか？`, { okLabel: "外す", danger: true }))) return;
    if (!(await adminRemoveSchoolMember(m.user_id))) return notify("外せませんでした");
    setMembers(await adminListSchoolMembers(s.id));
    load();
  }

  const input = "w-full rounded-xl border border-gray-300 px-3 py-2 text-sm";

  return (
    <section className="mb-8">
      <div className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">一問一答：学校の契約と学校コード</h2>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
          <div className="text-sm">
            <p className="font-medium text-gray-900">
              学校コードを、一問一答の利用の条件にする：{required === null ? "…" : required ? <span className="text-red-700">オン（所属していない人は使えません）</span> : <span className="text-emerald-700">オフ（いまは、だれでも使えます）</span>}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">契約した学校が増えて、準備ができたら、オンにします。オンにする前に、いま使っている人へ、お知らせしてください。</p>
          </div>
          <button onClick={toggleRequired} disabled={busy || required === null} className={`shrink-0 rounded-full px-4 py-1.5 text-sm disabled:opacity-40 ${required ? "border border-gray-300 text-gray-700" : "bg-black text-white"}`}>
            {required ? "オフにする" : "オンにする"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">契約校（{schools.length}校）</h3>
          {!draft && (
            <button onClick={() => setDraft({ ...EMPTY })} className="rounded-full bg-black px-4 py-1.5 text-sm text-white">
              学校を追加
            </button>
          )}
        </div>

        {draft && (
          <div className="mt-3 space-y-2 rounded-xl border border-gray-200 p-3">
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} maxLength={100} placeholder="学校名（例：○○大学 保健医療学部 理学療法学科）" aria-label="学校名" className={input} />
            <div className="grid grid-cols-2 gap-2">
              <label className="text-[11px] text-gray-500">
                契約の開始（任意）
                <input type="date" value={draft.validFrom} onChange={(e) => setDraft({ ...draft, validFrom: e.target.value })} className={`${input} mt-1`} />
              </label>
              <label className="text-[11px] text-gray-500">
                契約の終了（任意）
                <input type="date" value={draft.validUntil} onChange={(e) => setDraft({ ...draft, validUntil: e.target.value })} className={`${input} mt-1`} />
              </label>
              <label className="text-[11px] text-gray-500">
                人数の上限（空欄は、無制限）
                <input type="number" min={1} value={draft.seatLimit} onChange={(e) => setDraft({ ...draft, seatLimit: e.target.value })} className={`${input} mt-1`} />
              </label>
              <label className="text-[11px] text-gray-500">
                プラン名
                <input value={draft.plan} onChange={(e) => setDraft({ ...draft, plan: e.target.value })} maxLength={40} className={`${input} mt-1`} />
              </label>
            </div>
            <textarea value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} maxLength={500} rows={2} placeholder="メモ（契約の内容・担当者など。運営だけが見ます）" aria-label="メモ" className={input} />
            {tried && !draft.name.trim() && <p className="text-xs text-red-600" role="status">保存できない理由：学校名を入れてください</p>}
            <div className="flex gap-2">
              <button onClick={save} disabled={busy} className="rounded-full bg-black px-5 py-2 text-sm text-white disabled:opacity-40">
                {draft.id ? "保存する" : "追加して、コードを発行する"}
              </button>
              <button onClick={() => { setDraft(null); setTried(false); }} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700">
                やめる
              </button>
            </div>
          </div>
        )}

        {schools.length === 0 ? (
          <p className="mt-3 text-sm text-gray-400">まだありません。</p>
        ) : (
          <ul className="mt-3 divide-y divide-gray-100">
            {schools.map((s) => (
              <li key={s.id} className="py-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 text-sm">
                    <p className="font-medium text-gray-900">
                      {s.name}
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${s.active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                        {s.active ? "利用中" : s.status === "suspended" ? "停止中" : "期間外"}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600">
                      学校コード <span className="font-mono text-sm font-bold tracking-widest text-gray-900">{s.code}</span>
                      <button onClick={() => navigator.clipboard?.writeText(s.code).then(() => notify("コピーしました"))} className="ml-2 text-sky-700 underline">コピー</button>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      先生 {s.teacher_count}人・学生 {s.student_count}人{s.seat_limit ? ` / 上限 ${s.seat_limit}人` : ""} ・ {s.plan}
                      {(s.valid_from || s.valid_until) && ` ・ ${s.valid_from ?? "…"} 〜 ${s.valid_until ?? "…"}`}
                    </p>
                    {s.note && <p className="mt-0.5 whitespace-pre-wrap text-xs text-gray-400">{s.note}</p>}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-1.5 text-xs">
                    <button onClick={() => setDraft({ id: s.id, name: s.name, validFrom: s.valid_from ?? "", validUntil: s.valid_until ?? "", seatLimit: s.seat_limit ? String(s.seat_limit) : "", plan: s.plan, note: s.note ?? "" })} className="rounded-full border border-gray-300 px-3 py-1">編集</button>
                    <button onClick={() => rotate(s)} className="rounded-full border border-gray-300 px-3 py-1">コード再発行</button>
                    <button onClick={() => setStatus(s)} className={`rounded-full px-3 py-1 ${s.status === "active" ? "border border-red-200 text-red-700" : "bg-black text-white"}`}>{s.status === "active" ? "停止" : "再開"}</button>
                    <button onClick={() => toggleMembers(s)} className="rounded-full border border-gray-300 px-3 py-1">所属の人</button>
                  </div>
                </div>
                {openId === s.id && (
                  <ul className="mt-2 divide-y divide-gray-50 rounded-xl bg-gray-50 px-3 text-xs">
                    {members.length === 0 ? (
                      <li className="py-2 text-gray-400">まだ、所属している人はいません。</li>
                    ) : (
                      members.map((m) => (
                        <li key={m.user_id} className="flex items-center justify-between gap-2 py-2">
                          <span className="min-w-0 truncate">
                            <span className="mr-2 rounded-full bg-white px-2 py-0.5">{m.role === "teacher" ? "先生" : "学生"}</span>
                            {m.name ?? "（名前なし）"} <span className="text-gray-400">{m.email}</span>
                          </span>
                          <button onClick={() => remove(m, s)} className="shrink-0 text-red-600 underline">外す</button>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
