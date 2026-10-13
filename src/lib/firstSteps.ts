// 「はじめの1歩」の進み具合を、この端末に覚えておく（ログイン情報とは無関係。消えても、案内が再び出るだけ）。
const SEARCHED_KEY = "relight_first_paper_search";
const SAVED_KEY = "relight_first_paper_saved";
const LIKED_KEY = "relight_first_like";
const DISMISSED_KEY = "relight_first_step_dismissed";

function read(key: string): boolean {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function write(key: string) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    // 保存できない環境（プライベートモードなど）では、何もしない
  }
}

export const hasSearchedPapers = () => read(SEARCHED_KEY);
export const markPaperSearched = () => write(SEARCHED_KEY);
export const hasSavedPaper = () => read(SAVED_KEY);
export const markPaperSaved = () => write(SAVED_KEY);
export const hasLiked = () => read(LIKED_KEY);
export const markLiked = () => write(LIKED_KEY);
export const isFirstStepDismissed = () => read(DISMISSED_KEY);
export const dismissFirstStep = () => write(DISMISSED_KEY);
