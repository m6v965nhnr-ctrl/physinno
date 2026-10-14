import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

export type MediaKind = "image" | "video" | "pdf";

const BUCKET = "post-media";
export const MAX_MEDIA_BYTES = 50 * 1024 * 1024; // バケットの上限（50MB）に合わせる

export function mediaKind(url: string): MediaKind {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["mp4", "mov", "m4v", "webm", "ogv", "avi"].includes(ext)) return "video";
  return "image";
}

// 添付のURLを順番どおりに返す。media_urls が無い古い投稿は、image_url を1枚として扱う
export function postMediaUrls(p: { media_urls?: string[] | null; image_url?: string | null }): string[] {
  if (p.media_urls && p.media_urls.length > 0) return p.media_urls;
  return p.image_url ? [p.image_url] : [];
}

function pathOf(url: string): string | null {
  const i = url.indexOf(`/${BUCKET}/`);
  return i < 0 ? null : decodeURIComponent(url.slice(i + BUCKET.length + 2).split("?")[0]);
}

export async function removePostMedia(urls: string[]) {
  const paths = urls.map(pathOf).filter((p): p is string => !!p);
  if (paths.length > 0) await supabase.storage.from(BUCKET).remove(paths);
}

// 1つでも失敗したら、上げた分を消して null を返す（中途半端な添付を残さない）
export async function uploadPostMedia(userId: string, files: File[]): Promise<string[] | null> {
  const urls: string[] = [];
  const stamp = Date.now();

  for (const [i, file] of files.entries()) {
    const ext = (file.name.split(".").pop() || "file").toLowerCase().replace(/[^a-z0-9]/g, "") || "file";
    const path = `${userId}/${stamp}-${i}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file);

    if (error) {
      console.error("MEDIA UPLOAD ERROR", error);
      notify("写真・資料のアップロードに失敗しました");
      await removePostMedia(urls);
      return null;
    }
    urls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return urls;
}
