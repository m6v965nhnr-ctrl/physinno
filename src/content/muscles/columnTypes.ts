// 筋・骨の個別ページの本文（Re:light編集部が書いた、学習用の解説）
export type AnatomyColumn = {
  en: string; // 英語名
  lead: string; // 導入（検索結果にも出る説明）
  points: string[]; // 覚え方・位置・触診のポイント（2〜3個）
  clinical: string; // 臨床で意識すること
  exam: string; // 国試での問われ方
};
