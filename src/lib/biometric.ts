"use client";

import { Capacitor } from "@capacitor/core";
import { AccessControl, BiometryType, NativeBiometric } from "@capgo/capacitor-native-biometric";

// Face ID / Touch ID でのログイン（iPhoneアプリの中だけ）。
// メールアドレスとパスワードを、iPhoneのキーチェーン（顔認証を通らないと取り出せない保管場所）に入れておき、
// 次から、顔認証でログインする。本人が、同意したときだけ保存する。サーバーには送らない
const SERVER = "relight-1wet.vercel.app";
const DECLINED_KEY = "relight-biometric-declined";

export function isNativeApp(): boolean {
  return typeof window !== "undefined" && Capacitor.isNativePlatform();
}

// 顔認証・指紋認証が、いま使えるか
export async function biometricAvailable(): Promise<boolean> {
  if (!isNativeApp()) return false;
  try {
    const r = await NativeBiometric.isAvailable({ useFallback: false });
    return r.isAvailable && r.biometryType !== BiometryType.NONE;
  } catch {
    return false;
  }
}

export async function hasSavedLogin(): Promise<boolean> {
  if (!isNativeApp()) return false;
  try {
    return (await NativeBiometric.isCredentialsSaved({ server: SERVER })).isSaved;
  } catch {
    return false;
  }
}

export async function saveLogin(email: string, password: string): Promise<boolean> {
  try {
    await NativeBiometric.setCredentials({
      username: email,
      password,
      server: SERVER,
      accessControl: AccessControl.BIOMETRY_CURRENT_SET,
    });
    return true;
  } catch {
    return false;
  }
}

// 顔認証を通して、保存したメールアドレスとパスワードを取り出す（キャンセルや失敗は null）
export async function readSavedLogin(): Promise<{ email: string; password: string } | null> {
  try {
    const c = await NativeBiometric.getSecureCredentials({ server: SERVER, reason: "Re:lightにログインします" });
    return c.username && c.password ? { email: c.username, password: c.password } : null;
  } catch {
    return null;
  }
}

export async function clearSavedLogin(): Promise<void> {
  try {
    await NativeBiometric.deleteCredentials({ server: SERVER });
  } catch {
    // 無ければ、何もしない
  }
}

export function declinedBiometric(): boolean {
  try {
    return localStorage.getItem(DECLINED_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberDeclinedBiometric(declined: boolean) {
  try {
    if (declined) localStorage.setItem(DECLINED_KEY, "1");
    else localStorage.removeItem(DECLINED_KEY);
  } catch {
    // 保存できなくても、案内を出すだけ
  }
}
