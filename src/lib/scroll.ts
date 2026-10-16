// 画面を一番上へ。下のメニューのある画面は、本文だけがスクロールする（globals.css の data-shell）ので、そちらも戻す
export function scrollPageToTop() {
  if (document.documentElement.hasAttribute("data-shell")) {
    document.getElementById("main-content")?.scrollTo({ top: 0 });
  }
  window.scrollTo({ top: 0 });
}
