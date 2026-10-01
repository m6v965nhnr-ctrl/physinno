"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Hospital,
  WorkplaceSize,
  createHospital,
  getHospital,
} from "@/lib/hospitals";
import { notify } from "@/lib/notify";

// PTが自分の勤務先を「病院ページ」として検索・紐付け、見つからなければ
// その場で新規登録できるピッカー。他のPTのフォロー・口コミの対象になる。
export default function HospitalPicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (hospitalId: string | null) => void;
}) {
  const [selected, setSelected] = useState<Hospital | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Hospital[]>([]);
  const [searching, setSearching] = useState(false);

  const [creating, setCreating] = useState(false);
  const [newPrefecture, setNewPrefecture] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newSize, setNewSize] = useState<WorkplaceSize | "">("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!value) {
      setSelected(null);
      return;
    }
    getHospital(value).then(setSelected);
  }, [value]);

  async function handleSearch(q: string) {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);
    const { data } = await supabase
      .from("hospitals")
      .select("*")
      .ilike("name", `%${q.trim()}%`)
      .limit(10);
    setResults(data ?? []);
    setSearching(false);
  }

  async function handleCreate() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !query.trim()) {
      notify("病院名を入力してください");
      return;
    }

    setSaving(true);
    const { hospital, error } = await createHospital({
      name: query.trim(),
      prefecture: newPrefecture,
      city: newCity,
      address: newAddress,
      phone: newPhone,
      email: newEmail,
      website: newWebsite,
      size: newSize || undefined,
      createdBy: user.id,
    });
    setSaving(false);

    if (error || !hospital) {
      notify(error || "作成に失敗しました");
      return;
    }

    setSelected(hospital);
    onChange(hospital.id);
    setCreating(false);
    setQuery("");
    setResults([]);
  }

  if (selected) {
    return (
      <div className="rounded-xl border bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-gray-900">{selected.name}</p>
            <p className="text-xs text-gray-500">
              {[selected.prefecture, selected.city].filter(Boolean).join(" ")}
            </p>
          </div>
          <button
            onClick={() => {
              setSelected(null);
              onChange(null);
            }}
            className="shrink-0 text-xs text-gray-400 hover:text-gray-600"
          >
            解除
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="病院名で検索（例：〇〇病院）"
        className="w-full rounded-xl border px-4 py-3"
      />

      {searching && <p className="mt-2 text-xs text-gray-400">検索中…</p>}

      {!searching && results.length > 0 && (
        <div className="mt-2 space-y-1">
          {results.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => {
                setSelected(h);
                onChange(h.id);
                setQuery("");
                setResults([]);
              }}
              className="block w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-gray-50"
            >
              {h.name}
              <span className="ml-2 text-xs text-gray-400">
                {[h.prefecture, h.city].filter(Boolean).join(" ")}
              </span>
            </button>
          ))}
        </div>
      )}

      {!searching && query.trim() && results.length === 0 && !creating && (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="mt-2 text-xs text-gray-500 underline hover:text-gray-700"
        >
          「{query.trim()}」を新しい病院ページとして登録する
        </button>
      )}

      {creating && (
        <div className="mt-3 space-y-2 rounded-xl border bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            「{query.trim()}」を病院ページとして登録します（住所・電話番号は任意）
          </p>

          <input
            value={newPrefecture}
            onChange={(e) => setNewPrefecture(e.target.value)}
            placeholder="都道府県"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="市区町村"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="住所（任意）"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="電話番号（任意）"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
            placeholder="連絡先メールアドレス（任意）"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            type="url"
            placeholder="公式サイトURL（任意）"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <select
            value={newSize}
            onChange={(e) => setNewSize(e.target.value as WorkplaceSize | "")}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">規模：未設定</option>
            <option value="small">小規模（〜50床目安）</option>
            <option value="medium">中規模（50〜300床目安）</option>
            <option value="large">大規模（300床以上目安）</option>
          </select>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="flex-1 rounded-full border py-2 text-sm text-gray-600"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={saving}
              className="flex-1 rounded-full bg-black py-2 text-sm text-white disabled:opacity-50"
            >
              {saving ? "登録中…" : "登録する"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
