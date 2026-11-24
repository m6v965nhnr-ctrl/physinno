// 口コミサイトのサイトマップに載せる分割数（kuchikomi/sitemap.ts の CHUNKS の先頭から）。
// Vercel の無料枠（Hobby）に収めるため、まず先頭の1つ（病院・老健・訪問リハ・デイケア・介護医療院・障害者支援施設・重心・訪問看護）だけを案内する。
// 使用量（Vercel の Usage: CPU・転送量・リクエスト数）に余裕があれば、1つずつ増やす（最大4）。robots.ts も、この数で出す
export const KUCHIKOMI_SITEMAP_CHUNKS = 1;
