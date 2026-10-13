"use client";

import { useState } from "react";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";

export type FieldType = "text" | "date" | "number" | "textarea" | "select" | "checkbox";

export type FieldConfig = {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
};

export type FormValues = Record<string, string | boolean>;


export function DashboardTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 py-4 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

export function EmptyNote({ text }: { text: string }) {
  return <p className="text-sm text-gray-400">{text}</p>;
}

export function EntryCard({
  title,
  subtitle,
  meta,
  description,
  isPublic,
  onDelete,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
  isPublic: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-gray-100 px-4 py-3">
      <div>
        <p className="text-sm font-medium">
          {title}
          {!isPublic && (
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
              非公開
            </span>
          )}
        </p>

        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        {meta && <p className="mt-1 text-xs text-gray-400">{meta}</p>}
        {description && (
          <p className="mt-1 text-xs text-gray-500 whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={async () => {
          if (await askConfirm("この項目を削除しますか？")) onDelete();
        }}
        className="shrink-0 px-2 py-1 text-gray-400 hover:text-gray-700"
        aria-label="この項目を削除">
        ×
      </button>
    </div>
  );
}

export function PortfolioSection({
  title,
  addLabel,
  fields,
  defaultValues,
  onSubmit,
  children,
}: {
  title: string;
  addLabel: string;
  fields: FieldConfig[];
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => Promise<string | null>;
  children: React.ReactNode;
}) {
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState<FormValues>(defaultValues || {});
  const [saving, setSaving] = useState(false);

  function updateField(key: string, value: string | boolean) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const error = await onSubmit(values);

    setSaving(false);

    if (error) {
      notify(error);
      return;
    }

    setValues(defaultValues || {});
    setShowForm(false);
  }

  return (
    <section className="mt-8 border-t pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-sm text-relight-blue"
        >
          {showForm ? "閉じる" : addLabel}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 rounded-2xl border border-gray-100 p-4"
        >
          {fields.map((f) => (
            <div key={f.key}>
              {f.type !== "checkbox" && (
                <label htmlFor={`pf-${f.key}`} className="text-xs text-gray-500">
                  {f.label}
                  {f.required && " *"}
                </label>
              )}

              {f.type === "textarea" ? (
                <textarea
                  id={`pf-${f.key}`}
                  value={(values[f.key] as string) || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={3}
                  required={f.required}
                  className="mt-1 w-full resize-none rounded-xl border px-4 py-2.5 text-sm"
                />
              ) : f.type === "select" ? (
                <select
                  id={`pf-${f.key}`}
                  value={(values[f.key] as string) || f.options?.[0]?.value || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border bg-white px-4 py-2.5 text-sm"
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "checkbox" ? (
                <label className="mt-1 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!values[f.key]}
                    onChange={(e) => updateField(f.key, e.target.checked)}
                    className="h-4 w-4"
                  />
                  {f.placeholder}
                </label>
              ) : (
                <input
                  id={`pf-${f.key}`}
                  type={f.type || "text"}
                  value={(values[f.key] as string) || ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="mt-1 block w-full min-w-0 max-w-full rounded-xl border px-4 py-2.5 text-sm"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "保存中…" : "追加する"}
          </button>
        </form>
      )}

      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}
