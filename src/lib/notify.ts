// 画面下部に短いメッセージを出す（alert の代わり。操作を止めず、スクリーンリーダーにも通知される）
export type NotifyKind = "info" | "error";

export const NOTIFY_EVENT = "relight:notify";

// 「元に戻す」など、メッセージに添えるボタン
export type NotifyAction = { label: string; onAction: () => void };

export type NotifyDetail = { message: string; kind: NotifyKind; action?: NotifyAction };

const ERROR_HINT =
  /失敗|エラー|できません|できませんでした|見つかりません|正しくありません|ログインしてください|入力してください|選択してください/;

export function notify(message: string, kind?: NotifyKind, action?: NotifyAction) {
  if (typeof window === "undefined") return;

  const text = String(message);

  const detail: NotifyDetail = {
    message: text,
    kind: kind ?? (ERROR_HINT.test(text) ? "error" : "info"),
    action,
  };

  window.dispatchEvent(new CustomEvent<NotifyDetail>(NOTIFY_EVENT, { detail }));
}
