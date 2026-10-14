"use client";

import { useState } from "react";
import StudentSetupForm from "@/components/StudentSetupForm";
import {
  ACCOUNT_TYPE_LABEL,
  AccountType,
  setMyAccountType,
} from "@/lib/account";
import { askConfirm } from "@/lib/confirm";

const OPTIONS: { value: "pt" | "general"; description: string }[] = [
  { value: "pt", description: "PT同士で交流・情報共有" },
  { value: "general", description: "PTを探す・レビューを書く" },
];

export default function AccountTypeCard({
  accountType,
  onChanged,
}: {
  accountType: AccountType | null;
  onChanged: (type: "pt" | "general") => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // 未設定のアカウントだけ、「学生」も選べる（卒業予定年と学校名を聞く）
  const [studentForm, setStudentForm] = useState(false);

  async function change(type: "pt" | "general") {
    if (type === accountType || saving) return;

    const label = ACCOUNT_TYPE_LABEL[type];

    if (
      accountType &&
      !await askConfirm(`アカウントの種類を「${label}」に変更しますか？`)
    ) {
      return;
    }

    setSaving(true);
    setError("");

    const message = await setMyAccountType(type);

    setSaving(false);

    if (message) {
      setError(message);
      return;
    }

    onChanged(type);
  }

  return (
    <section
      className={`rounded-2xl border p-5 text-left ${
        accountType
          ? "border-gray-200 bg-white"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <h2 className="text-base font-semibold text-gray-900">
        アカウントの種類
      </h2>

      <p className="mt-1 text-xs text-gray-500">
        {accountType
          ? `現在：${ACCOUNT_TYPE_LABEL[accountType]}（資格は自己申告です）`
          : "まだ設定されていません。PT・学生・一般のどれかを選んでください。"}
      </p>

      <div
        role="radiogroup"
        aria-label="アカウントの種類"
        className="mt-4 grid grid-cols-2 gap-3"
      >
        {OPTIONS.map((option) => {
          const selected = accountType === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={saving}
              onClick={() => change(option.value)}
              className={`rounded-2xl border px-4 py-3 text-left transition disabled:opacity-50 ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
              }`}
            >
              <span className="block text-sm font-medium">
                {option.value === "pt"
                  ? "PT（理学療法士）"
                  : ACCOUNT_TYPE_LABEL[option.value]}
              </span>
              <span
                className={`mt-1 block text-xs ${
                  selected ? "text-white/90" : "text-gray-500"
                }`}
              >
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      {!accountType && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setStudentForm((v) => !v)}
            aria-expanded={studentForm}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left hover:border-gray-400"
          >
            <span className="block text-sm font-medium text-gray-900">学生（理学療法学科などで学んでいる）</span>
            <span className="mt-1 block text-xs text-gray-500">国試の過去問・実習の管理・先輩に質問ができます</span>
          </button>
          {studentForm && (
            <div className="mt-2">
              <StudentSetupForm />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}
