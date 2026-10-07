import { CATEGORIES, getCategory } from "./categories";
import { CEREBROVASCULAR } from "./cerebrovascular";
import { DISUSE } from "./disuse";
import { MUSCULOSKELETAL } from "./musculoskeletal";
import { RESPIRATORY } from "./respiratory";
import type { CategoryKey, Topic } from "./types";

export { CATEGORIES, getCategory };
export type { Category, CategoryKey, EvalItem, IdeaItem, Topic } from "./types";

// 疾患（トピック）の一覧。中身の修正は、各ファイルを直す
export const TOPICS: Topic[] = [...MUSCULOSKELETAL, ...RESPIRATORY, ...CEREBROVASCULAR, ...DISUSE];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function topicsOf(category: CategoryKey): Topic[] {
  return TOPICS.filter((t) => t.category === category);
}
