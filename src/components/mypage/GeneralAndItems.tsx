"use client";

import AddToHomeButton from "@/components/AddToHomeButton";
import MyPageMenu from "@/components/MyPageMenu";
import Link from "next/link";
import AccountTypeCard from "@/components/AccountTypeCard";
import ReferralCard from "@/components/ReferralCard";
import MedicalHistorySection from "@/components/MedicalHistorySection";
import { AccountType } from "@/lib/account";
import { ptNameWithTitle } from "@/lib/format";

export type MyReview = {
  id: string;
  pt_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  pt_name: string;
};

export function ProfileItem({
  title,
  value,
}: {
  title: string;
  value: string | number | null | undefined;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>

      <p className="text-base">
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "未設定"}
      </p>
    </div>
  );
}

export function GeneralMyPage({
  name,
  userId,
  followCount,
  reviews,
  onAccountTypeChanged,
  onLogout,
}: {
  name: string;
  userId: string;
  followCount: number;
  reviews: MyReview[];
  onAccountTypeChanged: (type: AccountType) => void;
  onLogout: () => void;
}) {
  return (
    <main className="relative min-h-screen bg-[#fafafa] px-5 py-6 pb-28">
      <MyPageMenu onLogout={onLogout} />
      <div className="mx-auto max-w-2xl space-y-3">

        {/* プロフィール */}
        <section className="rounded-3xl border border-gray-100 bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
            👤
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            {name}
          </h1>

          <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            一般
          </span>

          <div className="mt-6 flex justify-center gap-10">
            <div>
              <p className="font-semibold">{reviews.length}</p>
              <p className="text-xs text-gray-500">レビュー</p>
            </div>

            <Link href="/mypage/following">
              <p className="font-semibold">{followCount}</p>
              <p className="text-xs text-gray-500">フォロー中のPT</p>
            </Link>
          </div>

          <Link
            href="/pts"
            className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white"
          >
            PTを探す
          </Link>
        </section>

        {/* ホーム画面に追加（目立つ場所に。追加済みのアプリの中では出ない） */}
        <AddToHomeButton />

        {/* 自分のレビュー */}
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-semibold text-gray-900">
            書いたレビュー
          </h2>

          {reviews.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              まだレビューはありません
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {reviews.map((review) => (
                <Link
                  key={review.id}
                  href={`/pts/${review.pt_id}`}
                  className="block rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-900">
                      {ptNameWithTitle(review.pt_name)}
                    </p>
                    <p className="text-sm">
                      {"⭐".repeat(Number(review.rating) || 0)}
                    </p>
                  </div>

                  {review.comment && (
                    <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {review.comment}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* 使う人が少ないため、折りたたんで場所を取らないようにする（機能は残す） */}
        {userId && (
          <details className="rounded-3xl border border-gray-100 bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700">病歴・持病を記録する（任意）</summary>
            <div className="mt-3">
              <MedicalHistorySection userId={userId} />
            </div>
          </details>
        )}

        {userId && <ReferralCard userId={userId} />}
        <AddToHomeButton placement="bottom" />

        {/* アカウントの種類 */}
        <AccountTypeCard
          accountType="general"
          onChanged={onAccountTypeChanged}
        />
      </div>
    </main>
  );
}
