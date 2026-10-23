import { supabase } from "@/lib/supabase";

export type OrgMedia = { path: string; type: "image" | "video" };
export type OrgPost = {
  id: string;
  kind: "info" | "recruit";
  body: string;
  media: OrgMedia[];
  job_id: string | null;
  created_at: string;
  org_id: string;
  org_name: string;
  org_category: string;
  org_logo: string | null;
  hospital_id: string | null;
};

export const ORG_POST_KIND_LABEL: Record<OrgPost["kind"], string> = { info: "お知らせ", recruit: "採用情報" };
export const MAX_MEDIA = 4;
export const MEDIA_RULES: Record<string, { type: "image" | "video"; ext: string; maxMB: number }> = {
  "image/jpeg": { type: "image", ext: "jpg", maxMB: 10 },
  "image/png": { type: "image", ext: "png", maxMB: 10 },
  "image/webp": { type: "image", ext: "webp", maxMB: 10 },
  "video/mp4": { type: "video", ext: "mp4", maxMB: 30 },
  "video/quicktime": { type: "video", ext: "mov", maxMB: 30 },
};
export const MEDIA_ACCEPT = Object.keys(MEDIA_RULES).join(",");

export function mediaUrl(path: string): string {
  return supabase.storage.from("org-media").getPublicUrl(path).data.publicUrl;
}

// 承認された組織の投稿だけが返る（サーバー側で絞っている）。hospitalId を渡すと、その職場ページにひもづく組織の投稿だけ
export async function listOrgPosts(opts: { hospitalId?: string; limit?: number; before?: string } = {}): Promise<OrgPost[]> {
  const { data } = await supabase.rpc("list_org_posts", { p_hospital: opts.hospitalId ?? null, p_limit: opts.limit ?? 20, p_before: opts.before ?? null });
  return ((data ?? []) as OrgPost[]).map((p) => ({ ...p, media: Array.isArray(p.media) ? p.media : [] }));
}

export function checkFile(f: File): string | null {
  const rule = MEDIA_RULES[f.type];
  if (!rule) return "対応していない形式です（JPEG・PNG・WebPの画像、MP4・MOVの動画）";
  if (f.size > rule.maxMB * 1024 * 1024) return `${rule.type === "image" ? "画像" : "動画"}は ${rule.maxMB}MB までです`;
  return null;
}

export async function uploadOrgMedia(orgId: string, files: File[]): Promise<{ media: OrgMedia[]; error: string | null }> {
  const media: OrgMedia[] = [];
  for (const f of files) {
    const rule = MEDIA_RULES[f.type];
    const path = `${orgId}/${crypto.randomUUID()}.${rule.ext}`;
    const { error } = await supabase.storage.from("org-media").upload(path, f, { contentType: f.type, upsert: false });
    if (error) {
      await removeOrgMedia(media);
      return { media: [], error: "アップロードできませんでした。通信状況と、ファイルの大きさを確かめてください" };
    }
    media.push({ path, type: rule.type });
  }
  return { media, error: null };
}

export async function removeOrgMedia(media: OrgMedia[]) {
  if (media.length) await supabase.storage.from("org-media").remove(media.map((m) => m.path));
}

// 運営が通報から投稿を消すとき、写真・動画のファイル本体も消す（投稿を消す前に呼ぶ）
export async function adminRemoveOrgPostMedia(postId: string): Promise<void> {
  const { data } = await supabase.rpc("admin_org_post_media", { p_post: postId });
  if (Array.isArray(data) && data.length) await removeOrgMedia(data as OrgMedia[]);
}
