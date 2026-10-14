"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENT_CATEGORY_LABEL,
  Achievement,
  AchievementCategory,
  QualificationTarget,
  QualificationUnit,
  addQualificationTarget,
  computeQualificationProgress,
  deleteQualificationTarget,
  updateQualificationTarget,
} from "@/lib/achievements";
import QualificationCard from "@/components/QualificationCard";
import {
  KIND_LABEL,
  MODE_LABEL,
  QualificationKind,
  QualificationMode,
  fieldsFor,
  requirementsFor,
  targetName,
} from "@/lib/qualificationCatalog";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";

const QUALIFICATION_EXAMPLES = [
  "認定理学療法士",
  "専門理学療法士",
  "登録理学療法士",
  "日本理学療法士協会 生涯学習",
];

const today = () => new Date().toISOString().slice(0, 10);

type FormState = {
  // 登録・認定・専門理学療法士から選ぶか、自分で設定するか（まだ選んでいないときは ""）
  kind: QualificationKind | "custom" | "";
  field: string;
  mode: QualificationMode;
  name: string;
  unit: QualificationUnit;
  requiredTotal: string;
  renewalYears: string;
  cycleStart: string;
  categories: AchievementCategory[];
};

const emptyForm = (): FormState => ({
  kind: "",
  field: "",
  mode: "acquire",
  name: "",
  unit: "count",
  requiredTotal: "20",
  renewalYears: "5",
  cycleStart: today(),
  categories: ["training", "conference"],
});

function formFrom(t: QualificationTarget): FormState {
  return {
    kind: t.kind ?? "custom",
    field: t.field ?? "",
    mode: t.mode ?? "acquire",
    name: t.name,
    unit: t.unit,
    requiredTotal: String(t.required_total),
    renewalYears: String(t.renewal_years),
    cycleStart: t.cycle_start,
    categories: t.count_categories,
  };
}

// 資格更新の目標: 数え方(回数/ポイント)・必要数・期間・対象の実績を決めると、あと何回かを自動で計算する
export default function QualificationTargets({
  userId,
  targets,
  achievements,
  onChanged,
}: {
  userId: string;
  targets: QualificationTarget[];
  achievements: Achievement[];
  onChanged: () => void;
}) {
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);

  function startNew() {
    setForm(emptyForm());
    setEditingId("new");
  }

  function startEdit(t: QualificationTarget) {
    setForm(formFrom(t));
    setEditingId(t.id);
  }

  function toggleCategory(c: AchievementCategory) {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(c)
        ? f.categories.filter((v) => v !== c)
        : [...f.categories, c],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.kind === "") {
      notify("資格の種類を選んでください");
      return;
    }

    const isCatalog = form.kind !== "custom";
    const kind = isCatalog ? (form.kind as QualificationKind) : null;

    if (!isCatalog) {
      if (!form.name.trim()) {
        notify("資格名を入力してください");
        return;
      }

      if (form.categories.length === 0) {
        notify("数える対象の実績を、1つ以上選択してください");
        return;
      }
    } else if (fieldsFor(kind as QualificationKind).length > 0 && !form.field) {
      notify("分野を選んでください");
      return;
    }

    setSaving(true);

    // 登録・認定・専門は、協会の条件から、必要な数・サイクルを決める
    const set = kind ? requirementsFor(kind, form.mode, form.field || null) : null;

    const input = kind && set
      ? {
          name: targetName(kind, form.mode, form.field || null),
          requiredTotal: form.mode === "renew" ? set.points ?? set.items.length : set.items.length,
          renewalYears: set.cycleYears,
          cycleStart: form.cycleStart,
          unit: (form.mode === "renew" ? "points" : "count") as QualificationUnit,
          categories: ACHIEVEMENT_CATEGORIES,
          kind,
          field: form.field || null,
          mode: form.mode,
        }
      : {
          name: form.name,
          requiredTotal: Number(form.requiredTotal),
          renewalYears: Number(form.renewalYears),
          cycleStart: form.cycleStart,
          unit: form.unit,
          categories: form.categories,
        };

    const error =
      editingId === "new"
        ? await addQualificationTarget(userId, input)
        : await updateQualificationTarget(editingId as string, input);

    setSaving(false);

    if (error) {
      notify(`保存できませんでした: ${error}`);
      return;
    }

    setEditingId(null);
    onChanged();
  }

  async function handleDelete(id: string) {
    if (!await askConfirm("この目標を削除しますか？")) return;
    await deleteQualificationTarget(id);
    onChanged();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">資格の目標（取得・更新）</h3>

        {editingId === null ? (
          <button onClick={startNew} className="text-sm text-relight-blue">
            + 目標を追加
          </button>
        ) : (
          <button onClick={() => setEditingId(null)} className="text-sm text-relight-blue">
            閉じる
          </button>
        )}
      </div>

      {editingId !== null && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 rounded-2xl border border-gray-100 p-4"
        >
          <fieldset>
            <legend className="text-xs text-gray-500">資格の種類</legend>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {(["registered", "certified", "specialist"] as QualificationKind[]).map((k) => (
                <label
                  key={k}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-sm ${
                    form.kind === k ? "border-black bg-gray-50" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="qualification-kind"
                    value={k}
                    checked={form.kind === k}
                    onChange={() => setForm({ ...form, kind: k, field: "" })}
                    className="mr-2"
                  />
                  {KIND_LABEL[k]}
                </label>
              ))}
              <label
                className={`cursor-pointer rounded-xl border px-3 py-2 text-sm ${
                  form.kind === "custom" ? "border-black bg-gray-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="qualification-kind"
                  value="custom"
                  checked={form.kind === "custom"}
                  onChange={() => setForm({ ...form, kind: "custom", field: "" })}
                  className="mr-2"
                />
                その他（自分で設定）
              </label>
            </div>
          </fieldset>

          {form.kind !== "" && form.kind !== "custom" && (
            <>
              {fieldsFor(form.kind).length > 0 ? (
                <label className="block text-xs text-gray-500">
                  分野（{KIND_LABEL[form.kind]}の、どの分野？）
                  <select
                    value={form.field}
                    onChange={(e) => setForm({ ...form, field: e.target.value })}
                    className="mt-1 w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900"
                    required
                  >
                    <option value="">分野を選ぶ</option>
                    {fieldsFor(form.kind).map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <p className="rounded-xl bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-600">
                  登録理学療法士には、分野の区別はありません（認定・専門理学療法士にだけ、分野があります）。
                </p>
              )}

              <fieldset>
                <legend className="text-xs text-gray-500">目的</legend>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {(["acquire", "renew"] as QualificationMode[]).map((m) => (
                    <label
                      key={m}
                      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm ${
                        form.mode === m ? "border-black bg-gray-50" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="qualification-mode"
                        value={m}
                        checked={form.mode === m}
                        onChange={() => setForm({ ...form, mode: m })}
                        className="mr-2"
                      />
                      {MODE_LABEL[m]}
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.mode === "renew" && (
                <label className="block text-xs text-gray-500">
                  更新サイクルの開始日（取得・更新した年度の4月1日など。この日以降の実績を数えます）
                  <input
                    type="date"
                    value={form.cycleStart}
                    onChange={(e) => setForm({ ...form, cycleStart: e.target.value })}
                    className="mt-1 block w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm text-gray-900"
                  />
                </label>
              )}

              <p className="text-[11px] leading-5 text-gray-400">
                日本理学療法士協会の条件をもとに、「あと何をすればいいか」を、マイページに表示します。
              </p>
            </>
          )}

          {form.kind === "custom" && (
          <>
          <label className="block text-xs text-gray-500">
            資格・目標の名前
            <input
              list="qualification-examples"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="例: 認定理学療法士"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900"
              required
            />
            <datalist id="qualification-examples">
              {QUALIFICATION_EXAMPLES.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </label>

          <fieldset>
            <legend className="text-xs text-gray-500">数え方</legend>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {(
                [
                  ["count", "回数で数える", "実績1件 = 1回"],
                  ["points", "ポイントで数える", "実績の単位・ポイントを合計"],
                ] as [QualificationUnit, string, string][]
              ).map(([value, label, hint]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-sm ${
                    form.unit === value ? "border-black bg-gray-50" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="qualification-unit"
                    value={value}
                    checked={form.unit === value}
                    onChange={() => setForm({ ...form, unit: value })}
                    className="mr-2"
                  />
                  {label}
                  <span className="mt-0.5 block text-[11px] text-gray-400">{hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-gray-500">
              必要な{form.unit === "points" ? "ポイント数" : "回数"}
              <input
                type="number"
                min={1}
                value={form.requiredTotal}
                onChange={(e) => setForm({ ...form, requiredTotal: e.target.value })}
                className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900"
              />
            </label>

            <label className="text-xs text-gray-500">
              更新サイクル（年）
              <input
                type="number"
                min={1}
                value={form.renewalYears}
                onChange={(e) => setForm({ ...form, renewalYears: e.target.value })}
                className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900"
              />
            </label>
          </div>

          <label className="block text-xs text-gray-500">
            サイクルの開始日（この日以降の実績を数えます）
            <input
              type="date"
              value={form.cycleStart}
              onChange={(e) => setForm({ ...form, cycleStart: e.target.value })}
              className="mt-1 block w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm text-gray-900"
            />
          </label>

          <fieldset>
            <legend className="text-xs text-gray-500">数える実績の種類</legend>
            <div className="mt-1 flex flex-wrap gap-2">
              {ACHIEVEMENT_CATEGORIES.map((c) => (
                <label
                  key={c}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs ${
                    form.categories.includes(c)
                      ? "border-black bg-gray-50 text-gray-900"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.categories.includes(c)}
                    onChange={() => toggleCategory(c)}
                    className="mr-1.5"
                  />
                  {ACHIEVEMENT_CATEGORY_LABEL[c]}
                </label>
              ))}
            </div>
          </fieldset>

          <p className="text-[11px] leading-5 text-gray-400">
            {form.unit === "points"
              ? "ポイントは、実績の投稿で入力した「CPD単位・ポイント」を合計します。入力がない実績は0ポイントとして数えます。"
              : "選んだ種類の実績が、1件ごとに1回と数えられます。"}
            {" "}
            必要な数や期間は、協会の案内などを見て設定してください（あとから変更できます）。
          </p>

          </>
          )}

          <button
            type="submit"
            disabled={saving || form.kind === ""}
            className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "保存中…" : editingId === "new" ? "この目標を追加" : "変更を保存"}
          </button>
        </form>
      )}

      <div className="mt-4 space-y-3">
        {targets.length === 0 ? (
          <p className="text-sm text-gray-400">まだ目標が設定されていません。</p>
        ) : (
          targets.map((t) => {
            if (t.kind && t.mode) {
              return (
                <QualificationCard
                  key={t.id}
                  target={t}
                  achievements={achievements}
                  onEdit={() => startEdit(t)}
                  onDelete={() => handleDelete(t.id)}
                  onChanged={onChanged}
                />
              );
            }

            const p = computeQualificationProgress(t, achievements);
            const unit = t.unit === "points" ? "ポイント" : "回";
            const years = Math.floor(p.monthsRemaining / 12);
            const months = p.monthsRemaining % 12;
            const recordCategory = t.count_categories.includes("training")
              ? "training"
              : t.count_categories[0] ?? "training";

            return (
              <div key={t.id} className="rounded-2xl border border-relight p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    🏅 {t.name}
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-normal text-gray-500">
                      {t.unit === "points" ? "ポイント" : "回数"}
                    </span>
                  </p>

                  <div className="flex shrink-0 gap-3 text-xs text-gray-400">
                    <button onClick={() => startEdit(t)} className="hover:text-gray-600">
                      編集
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="hover:text-gray-600">
                      削除
                    </button>
                  </div>
                </div>

                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={t.required_total}
                  aria-valuenow={Math.min(p.value, t.required_total)}
                  aria-label={`${t.name}の進み具合`}
                >
                  <div
                    className="h-full rounded-full bg-relight-gradient"
                    style={{ width: `${p.percent}%` }}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {p.value}/{t.required_total}
                  </span>
                  {unit}
                  {p.achieved ? (
                    <span className="ml-2 font-semibold text-emerald-600">🎉 目標達成！</span>
                  ) : (
                    <span className="ml-2">
                      あと
                      <span className="mx-0.5 text-base font-semibold text-gray-900">
                        {p.remaining}
                      </span>
                      {unit}
                    </span>
                  )}
                </p>

                {!p.achieved && t.unit === "points" && (
                  <p className="mt-1 text-xs text-gray-600">
                    {p.timesLeft !== null && p.averagePoints !== null ? (
                      <>
                        1回あたり平均{Math.round(p.averagePoints * 10) / 10}ポイントとして、
                        <span className="font-semibold">あと約{p.timesLeft}回</span>の研修で届きます
                      </>
                    ) : (
                      "研修を記録するときにポイントを入れると、「あと何回」の目安が出ます"
                    )}
                  </p>
                )}

                {!p.achieved && (
                  <p className="mt-1 text-xs text-gray-500">
                    {p.expired
                      ? "更新の期限を過ぎています。サイクルの開始日や年数を見直してください"
                      : `期限は${p.deadline.getFullYear()}年${p.deadline.getMonth() + 1}月まで（あと${
                          years > 0 ? `${years}年` : ""
                        }${months}ヶ月）${
                          p.perMonth !== null ? `・月${p.perMonth}回のペースが目安` : ""
                        }`}
                  </p>
                )}

                <div className="mt-3">
                  <Link
                    href={`/posts/create?type=${recordCategory}`}
                    className="inline-block rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                  >
                    + 研修・実績を記録する
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
