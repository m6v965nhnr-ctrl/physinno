"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import MediaPicker from "@/components/posts/MediaPicker";
import { postMediaUrls, removePostMedia, uploadPostMedia } from "@/lib/postMedia";
import PostAudienceFields, { Audience, DEFAULT_AUDIENCE, audiencePayload } from "@/components/PostAudienceFields";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState<Audience>(DEFAULT_AUDIENCE);
  const [original, setOriginal] = useState<string[]>([]);
  const [existing, setExisting] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadPost() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();


    if (error || !data) {
      notify("この投稿は編集できません");
      router.push("/home");
      return;
    }

    setTitle(data.title || "");
    setContent(data.content || "");
    setOriginal(postMediaUrls(data));
    setExisting(postMediaUrls(data));
    setAudience({
      visibility: data.visibility ?? (data.is_public === false ? "private" : "public"),
      titlePublic: Boolean(data.title_public),
      anonymous: Boolean(data.is_anonymous),
      level: data.target_level ?? "all",
      groupId: data.group_id ?? null,
    });

    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  async function updatePost() {
    if (saving) {
      return;
    }

    if (!content.trim() && existing.length + newFiles.length === 0) {
      notify("本文または写真・資料を入れてください");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      notify("ログインしてください");
      router.push("/login");
      return;
    }

    const uploaded = await uploadPostMedia(user.id, newFiles);

    if (!uploaded) {
      setSaving(false);
      return;
    }

    const media = [...existing, ...uploaded];

    const { error } = await supabase
      .from("posts")
      .update({
        title: title.trim(),
        content: content.trim(),
        image_url: media[0] ?? null,
        media_urls: media,
        ...audiencePayload(audience, title.trim() !== ""),
      })
      .eq("id", id)
      .eq("user_id", user.id);


    if (error) {
      notify(error.message);
      await removePostMedia(uploaded);
      setSaving(false);
      return;
    }

    // 外した添付は、保管庫からも消す（更新が成功してから）
    await removePostMedia(original.filter((u) => !existing.includes(u)));

    notify("投稿を更新しました");

    router.push(`/posts/${id}`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 pb-24">

      <div className="mx-auto max-w-xl">

        <button
          onClick={() => router.push(`/posts/${id}`)}
          className="mb-8 text-sm text-gray-500"
        >
          ← 投稿詳細へ戻る
        </button>

        <h1 className="mb-10 text-3xl font-semibold">
          投稿編集
        </h1>

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="タイトル"
            className="
              w-full
              rounded-2xl
              border
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-gray-200
            "
           aria-label="タイトル"/>

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="本文"
            rows={8}
            className="
              w-full
              rounded-2xl
              border
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-gray-200
            "
           aria-label="本文"/>

          <MediaPicker
            files={newFiles}
            onChange={setNewFiles}
            existing={existing}
            onRemoveExisting={(u) => setExisting(existing.filter((x) => x !== u))}
          />

          <PostAudienceFields value={audience} onChange={setAudience} hasTitle={title.trim() !== ""} />

          <button
            onClick={updatePost}
            disabled={saving}
            className="
              w-full
              rounded-full
              bg-black
              py-3
              text-white
              disabled:opacity-50
            "
          >
            {saving ? "更新中…" : "変更を保存"}
          </button>

        </div>

      </div>


    </main>
  );
}