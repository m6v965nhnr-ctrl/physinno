"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Hospital } from "@/lib/hospitals";

// 勤務先の自由入力と病院ページの紐付けを1つの入力欄に統合したコンポーネント。
// 入力すると一致する病院(正式名称)が候補として出て、選べば紐付く。
// 候補を選ばずそのまま入力し続けることもできる（その場合は紐付けなしの自由入力）。
export default function WorkplaceAutosuggest({
  value,
  onValueChange,
  hospitalId,
  onHospitalIdChange,
}: {
  value: string;
  onValueChange: (text: string) => void;
  hospitalId: string | null;
  onHospitalIdChange: (id: string | null) => void;
}) {
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [linkedHospital, setLinkedHospital] = useState<Hospital | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hospitalId) {
      setLinkedHospital(null);
      return;
    }

    supabase
      .from("hospitals")
      .select("*")
      .eq("id", hospitalId)
      .maybeSingle()
      .then(({ data }) => setLinkedHospital(data));
  }, [hospitalId]);

  function handleChange(text: string) {
    onValueChange(text);

    // 紐付け済みの状態から手入力で変更したら、紐付けは解除する
    if (hospitalId) onHospitalIdChange(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const { data } = await supabase
        .from("hospitals")
        .select("*")
        .ilike("name", `%${text.trim()}%`)
        .limit(8);

      setSuggestions(data ?? []);
      setShowSuggestions(true);
    }, 250);
  }

  function handleSelect(hospital: Hospital) {
    onValueChange(hospital.name);
    onHospitalIdChange(hospital.id);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="例：横須賀（入力すると病院の候補が出ます）"
        className="w-full border rounded-xl px-4 py-3"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border bg-white shadow-lg">
          {suggestions.map((h) => (
            <button
              key={h.id}
              type="button"
              onMouseDown={() => handleSelect(h)}
              className="block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
            >
              {h.name}
              <span className="ml-2 text-xs text-gray-400">
                {[h.prefecture, h.city].filter(Boolean).join(" ")}
              </span>
            </button>
          ))}
        </div>
      )}

      {linkedHospital ? (
        <p className="mt-2 text-xs text-emerald-600">
          ✓「{linkedHospital.name}」の病院ページと連携しています。他のPTからのフォローや職場環境の口コミの対象になり、患者さんの「病院を探す」にも表示されます。
        </p>
      ) : (
        <p className="mt-2 text-xs text-gray-400">
          候補から病院を選ぶと、病院ページと自動で連携されます（任意）
        </p>
      )}
    </div>
  );
}
