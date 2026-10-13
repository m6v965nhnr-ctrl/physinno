// ブラウザ標準の confirm() の代わりに、アプリ内の確認ダイアログを出す。
//   if (!(await askConfirm("この投稿を削除しますか？"))) return;
// 「削除」を含む文言は、赤いボタン（削除する）になる。ConfirmHost（layout に設置）が表示する。
export const CONFIRM_EVENT = "relight:confirm";

export type ConfirmOptions = {
  okLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

export type ConfirmDetail = {
  message: string;
  options: ConfirmOptions;
  resolve: (ok: boolean) => void;
};

export function askConfirm(message: string, options: ConfirmOptions = {}): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  return new Promise<boolean>((resolve) => {
    const detail: ConfirmDetail = { message: String(message), options, resolve };
    window.dispatchEvent(new CustomEvent<ConfirmDetail>(CONFIRM_EVENT, { detail }));
  });
}
