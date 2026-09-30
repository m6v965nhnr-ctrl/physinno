"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createGroup } from "@/lib/groups";
import { notify } from "@/lib/notify";

export default function CreateGroupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      notify("グループ名を入力してください");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      notify("ログインしてください");
      setSaving(false);
      return;
    }

    const { data, error } = await createGroup({
      name: name.trim(),
      description: description.trim(),
      isPrivate,
      ownerId: user.id,
    });

    setSaving(false);

    if (error || !data) {
      notify(error || "作成に失敗しました");
      return;
    }

    notify("グループを作成しました");
    router.push(`/groups/${data.id}`);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-md">
        <Link href="/groups" className="text-sm text-gray-400 hover:text-gray-700">
          ← グループ一覧
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
          グループを作成
        </h1>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="group-name">
              グループ名
            </label>
            <input
              id="group-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：〇〇病院 リハビリ科"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium"
              htmlFor="group-description"
            >
              説明（任意）
            </label>
            <textarea
              id="group-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="例：院内のリハビリスタッフで症例相談をする場です"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">公開範囲</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                  isPrivate
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                }`}
              >
                <span className="block text-sm font-medium">非公開</span>
                <span
                  className={`mt-1 block text-xs ${
                    isPrivate ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  招待リンクを知る人だけ参加できる
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                  !isPrivate
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                }`}
              >
                <span className="block text-sm font-medium">公開</span>
                <span
                  className={`mt-1 block text-xs ${
                    !isPrivate ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  一覧から誰でも参加できる
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={saving}
            className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "作成中…" : "作成する"}
          </button>
        </div>
      </div>
    </main>
  );
}
