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
  sources: { name: string; url: string }[];
  blocks: GuideBlock[];
};
