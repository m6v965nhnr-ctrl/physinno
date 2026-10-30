"use client";

import { useEffect, useState } from "react";

// ログインなしで見るときの、立場の選択（PT／学生）。この端末のブラウザにだけ保存する（サーバーには送らない）
export type GuestRole = "pt" | "student";

const KEY = "relight_guest_role";
const EVENT = "relight:guest-role";

export function getGuestRole(): GuestRole | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "pt" || v === "student" ? v : null;
  } catch {
    return null;
  }
}

export function setGuestRole(role: GuestRole) {
  try {
    window.localStorage.setItem(KEY, role);
  } catch {
    // 保存できない環境では、そのページの間だけ有効
  }
  window.dispatchEvent(new Event(EVENT));
}

// 本物のログイン・登録が済んだら呼ぶ。残っていると、次にこの端末で開いたとき
// ゲスト閲覧の画面が優先されてしまう（ログイン済みなのに本人の中身が出ない）ため
export function clearGuestRole() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // 何もしない
  }
  window.dispatchEvent(new Event(EVENT));
}

// 選んだ立場。まだ読み込み中は undefined、未選択は null
export function useGuestRole(): GuestRole | null | undefined {
  const [role, setRole] = useState<GuestRole | null | undefined>(undefined);

  useEffect(() => {
    const read = () => setRole(getGuestRole());
    read();
    window.addEventListener(EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return role;
}
