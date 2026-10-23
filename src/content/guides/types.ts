export type GuideBlock =
  | { t: "h2" | "h3" | "p" | "note"; x: string }
  | { t: "ul"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  checkedOn: string;
  // primary: 本文の数値・基準を、一次資料（法令・公的機関・学会のガイドライン・原著）と照合済み。summary: 解説サイトなどの要約で、照合は未了
  verification?: "primary" | "summary";
  sources: { name: string; url: string }[];
  blocks: GuideBlock[];
};
