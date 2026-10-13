import { supabase } from "@/lib/supabase";

// 退会（アカウントの削除）。順番:
//   1) 画像・添付ファイルを削除（Storage。ストレージのポリシーで、本人のフォルダだけ消せる）
//   2) データベース: delete_my_account（個人情報を削除。投稿は、匿名で残すか、削除するか）
//   3) ログアウト
// 途中で失敗したら、そこで止めて、メッセージを返す（2が終わるまでは、アカウントは残っている）。

const PAGE = 100;

// フォルダの中を、サブフォルダも含めて、すべて削除する
async function removeFolder(bucket: string, prefix: string): Promise<void> {
  const files: string[] = [];

  async function walk(dir: string): Promise<void> {
    for (let offset = 0; ; offset += PAGE) {
      const { data, error } = await supabase.storage.from(bucket).list(dir, { limit: PAGE, offset });
      if (error || !data || data.length === 0) return;

      for (const entry of data) {
        const path = dir ? `${dir}/${entry.name}` : entry.name;
        // id が null のものは、フォルダ
        if (entry.id === null) await walk(path);
        else files.push(path);
      }
      if (data.length < PAGE) return;
    }
  }

  await walk(prefix);

  for (let i = 0; i < files.length; i += PAGE) {
    await supabase.storage.from(bucket).remove(files.slice(i, i + PAGE));
  }
}

export type DeleteResult = { ok: true } | { ok: false; message: string };

export async function deleteMyAccount(keepPosts: boolean): Promise<DeleteResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, message: "ログインしてください" };

  try {
    await removeFolder("profile-images", user.id);
    await removeFolder("portfolio-files", user.id);
    await removeFolder("id-photos", user.id);
    // 投稿に使った画像・動画は、投稿を残すときだけ、残す
    if (!keepPosts) await removeFolder("post-media", user.id);

    // 学生の試験メモに添付したファイル
    const { data: notes } = await supabase.from("exam_notes").select("file_path").eq("user_id", user.id);
    const examPaths = (notes ?? []).map((n) => n.file_path as string | null).filter((p): p is string => !!p);
    if (examPaths.length > 0) await supabase.storage.from("exam-files").remove(examPaths);
  } catch {
    return { ok: false, message: "ファイルの削除に失敗しました。時間をおいて、もう一度お試しください" };
  }

  const { error } = await supabase.rpc("delete_my_account", { p_keep_posts: keepPosts });
  if (error) {
    return { ok: false, message: error.message || "退会の処理に失敗しました。時間をおいて、もう一度お試しください" };
  }

  await supabase.auth.signOut();
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {
    // 消せない環境では、何もしない
  }

  return { ok: true };
}
