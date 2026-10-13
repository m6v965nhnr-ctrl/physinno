"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

type Kind = "comment" | "message" | "follow" | "answer" | "reminder";

const KINDS: { kind: Kind; label: string; hint: string }[] = [
  { kind: "comment", label: "コメント", hint: "あなたの投稿にコメントがついたとき" },
  { kind: "message", label: "メッセージ", hint: "メッセージが届いたとき" },
  { kind: "follow", label: "フォロー", hint: "フォローされたとき" },
  { kind: "answer", label: "質問への回答", hint: "「先輩に質問」に回答がついたとき" },
  { kind: "reminder", label: "お知らせ（しばらく使っていないとき）", hint: "3週間ほど使っていないときに、使える機能をお知らせします（60日に1通まで）" },
];

function Switch({
  on,
  disabled,
  labelId,
  onClick,
}: {
  on: boolean;
  disabled?: boolean;
  labelId: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={labelId}
      disabled={disabled}
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition disabled:opacity-50 ${on ? "bg-emerald-500" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

// 通知メールの設定: 全体のオン・オフと、種類ごと（コメント・メッセージ・フォロー・質問への回答）のオン・オフ
export default function EmailNotificationToggle() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [kinds, setKinds] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_my_email_notification_settings");
      const row = (Array.isArray(data) ? data[0] : data) as { enabled: boolean; kinds: Record<string, boolean> } | undefined;
      if (!row) return;
      setEnabled(row.enabled ?? true);
      setKinds(row.kinds ?? {});
    })();
  }, []);

  async function toggleAll() {
    if (enabled === null) return;

    const next = !enabled;
    setSaving(true);
    setEnabled(next);

    // users テーブルはクライアントから直接更新できない設計のため、専用の関数を使う
    const { error } = await supabase.rpc("set_my_email_notifications", { p_enabled: next });

    setSaving(false);

    if (error) {
      setEnabled(!next);
      notify("設定を保存できませんでした");
      return;
    }

    notify(next ? "通知メールをオンにしました" : "通知メールをオフにしました");
  }

  async function toggleKind(kind: Kind) {
    const next = !(kinds[kind] ?? true);
    setSaving(true);
    setKinds((prev) => ({ ...prev, [kind]: next }));

    const { error } = await supabase.rpc("set_my_email_notification_kind", { p_kind: kind, p_enabled: next });

    setSaving(false);

    if (error) {
      setKinds((prev) => ({ ...prev, [kind]: !next }));
      notify("設定を保存できませんでした");
    }
  }

  if (enabled === null) return null;

  return (
    <div className="mb-5 rounded-2xl border border-gray-100 bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-900" id="email-notification-label">
            メールで通知を受け取る
          </p>
          <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
            登録したメールアドレスにも、お知らせします。メッセージやコメントの本文はメールに含まれません。
          </p>
        </div>
        <Switch on={enabled} disabled={saving} labelId="email-notification-label" onClick={toggleAll} />
      </div>

      {enabled && (
        <ul className="mt-3 divide-y divide-gray-100 border-t border-gray-100">
          {KINDS.map((k) => (
            <li key={k.kind} className="flex items-center justify-between gap-3 py-2.5">
              <div>
                <p className="text-sm text-gray-900" id={`email-kind-${k.kind}`}>
                  {k.label}
                </p>
                <p className="text-[11px] leading-4 text-gray-500">{k.hint}</p>
              </div>
              <Switch
                on={kinds[k.kind] ?? true}
                disabled={saving}
                labelId={`email-kind-${k.kind}`}
                onClick={() => toggleKind(k.kind)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
