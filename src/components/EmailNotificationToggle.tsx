"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

// コメント・メッセージ・フォローをメールでも知らせるかどうかの切り替え
export default function EmailNotificationToggle() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("email_notifications")
        .eq("id", user.id)
        .maybeSingle();

      setEnabled(data?.email_notifications ?? true);
    })();
  }, []);

  async function toggle() {
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

  if (enabled === null) return null;

  return (
    <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-900" id="email-notification-label">
          メールで通知を受け取る
        </p>
        <p className="mt-0.5 text-[11px] leading-4 text-gray-400">
          コメント・メッセージ・フォローを、登録したメールアドレスにもお知らせします。
          メッセージやコメントの本文はメールに含まれません。
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-labelledby="email-notification-label"
        disabled={saving}
        onClick={toggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            enabled ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
