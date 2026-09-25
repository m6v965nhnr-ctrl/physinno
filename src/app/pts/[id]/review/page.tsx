"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();

  const ptId = params.id as string;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  async function submitReview() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください");
      return;
    }

    const { error: insertError } = await supabase.from("reviews").insert({
      pt_id: ptId,
      user_id: user.id,
      rating,
      comment,
      is_anonymous: isAnonymous,
    });

    if (insertError) {
      alert(insertError.message);
      return;
    }

    // 評価の平均・件数（pt_profiles.rating / review_count）は
    // DBトリガー reviews_recalc_rating で自動計算されます

    alert("レビューを投稿しました");

    router.push(`/pts/${ptId}`);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-10 text-3xl font-semibold">レビューを書く</h1>

        <div className="space-y-8">
          <div>
            <p className="mb-3 text-sm text-gray-500">評価</p>

            <div className="flex gap-3 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-gray-500">コメント</p>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="治療を受けた感想"
              className="h-40 w-full rounded-2xl border p-5"
            />
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isAnonymous}
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
              isAnonymous ? "border-black bg-gray-50" : "border-gray-200"
            }`}
          >
            <span>
              <span className="block text-sm font-medium">
                匿名で投稿する
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                レビューには「匿名」と表示されます
              </span>
            </span>

            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                isAnonymous ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  isAnonymous ? "left-[22px]" : "left-0.5"
                }`}
              />
            </span>
          </button>

          <button
            onClick={submitReview}
            className="w-full rounded-full bg-black py-3 text-white"
          >
            投稿する
          </button>
        </div>
      </div>
    </main>
  );
}
