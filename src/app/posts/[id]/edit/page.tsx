"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

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

    console.log("EDIT POST DATA", data);
    console.log("EDIT POST ERROR", error);

    if (error || !data) {
      alert("この投稿は編集できません");
      router.push("/home");
      return;
    }

    setTitle(data.title || "");
    setContent(data.content || "");

    setLoading(false);
  }

  async function updatePost() {
    if (saving) {
      return;
    }

    if (!content.trim()) {
      alert("本文を入力してください");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください");
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({
        title: title.trim(),
        content: content.trim(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    console.log("UPDATE POST ERROR", error);

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    alert("投稿を更新しました");

    router.push(`/posts/${id}`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          読み込み中...
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
          />

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
          />

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
            {saving ? "更新中..." : "変更を保存"}
          </button>

        </div>

      </div>

      <BottomNav />

    </main>
  );
}