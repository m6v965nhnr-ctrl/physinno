"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Stats = {
  users: number;
  ptProfiles: number;
  posts: number;
  casePosts: number;
  likes: number;
  comments: number;
  follows: number;
  reviews: number;
  messages: number;
};

type AdminUser = {
  id: string;
  email: string | null;
  account_type: string | null;
  full_name: string | null;
  created_at: string;
  qualification: string | null;
  workplace: string | null;
  prefecture: string | null;
  city: string | null;
};

const initialStats: Stats = {
  users: 0,
  ptProfiles: 0,
  posts: 0,
  casePosts: 0,
  likes: 0,
  comments: 0,
  follows: 0,
  reviews: 0,
  messages: 0,
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    loadAdmin();
  }, []);

  async function loadAdmin() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .limit(1);

    if (adminError || !adminData || adminData.length === 0) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    setAuthorized(true);

    const [statsResult, usersResult] = await Promise.all([
      supabase.rpc("get_admin_stats"),
      supabase.rpc("get_admin_users"),
    ]);

    if (statsResult.error) {
      console.error("ADMIN STATS ERROR", statsResult.error);
    } else if (statsResult.data) {
      setStats(statsResult.data as Stats);
    }

    if (usersResult.error) {
      console.error("ADMIN USERS ERROR", usersResult.error);
      setAdminUsers([]);
    } else {
      setAdminUsers((usersResult.data || []) as AdminUser[]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">管理画面を読み込み中...</p>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
        <div className="rounded-2xl bg-white border p-8 text-center">
          <p className="text-lg font-semibold text-gray-900">
            アクセスできません
          </p>

          <p className="mt-2 text-sm text-gray-500">
            このページはPhysinno運営者専用です。
          </p>

          <button
            onClick={() => {
              window.location.href = "/home";
            }}
            className="mt-6 rounded-full bg-black px-5 py-2 text-sm text-white"
          >
            ホームへ戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-20 border-b bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <p className="text-xs font-medium text-gray-400">
            PHYSINNO ADMIN
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            運営ダッシュボード
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Physinnoの利用状況を確認できます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-6">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            利用状況
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              label="登録ユーザー"
              value={stats.users}
              icon="👤"
              description="Physinnoに登録したアカウント数"
            />

            <StatCard
              label="PTプロフィール"
              value={stats.ptProfiles}
              icon="🩺"
              description="PTプロフィールを作成した人数"
            />

            <StatCard
              label="投稿"
              value={stats.posts}
              icon="📝"
              description="通常投稿と症例報告の総数"
            />

            <StatCard
              label="症例報告"
              value={stats.casePosts}
              icon="📄"
              description="症例報告として投稿された件数"
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            エンゲージメント
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <StatCard
              label="いいね"
              value={stats.likes}
              icon="❤️"
              description="投稿に押された「いいね」の総数"
            />

            <StatCard
              label="コメント"
              value={stats.comments}
              icon="💬"
              description="投稿に付けられたコメントの総数"
            />

            <StatCard
              label="フォロー"
              value={stats.follows}
              icon="👥"
              description="ユーザー同士のフォロー関係の総数"
            />

            <StatCard
              label="レビュー"
              value={stats.reviews}
              icon="⭐"
              description="PTに投稿されたレビューの総数"
            />

            <StatCard
              label="メッセージ"
              value={stats.messages}
              icon="✉️"
              description="ユーザー間で送受信されたメッセージの総数"
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            現在の状況
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Physinno内で現在どれくらい活動があるかを確認できます。
          </p>

          <div className="mt-5 space-y-5">
            <ProgressRow
              label="登録ユーザー"
              value={stats.users}
              description="登録されているユーザー"
            />

            <ProgressRow
              label="投稿"
              value={stats.posts}
              description="これまでに作成された投稿"
            />

            <ProgressRow
              label="症例報告"
              value={stats.casePosts}
              description="症例報告として公開された投稿"
            />

            <ProgressRow
              label="コメント"
              value={stats.comments}
              description="ユーザー同士のコメント交流"
            />

            <ProgressRow
              label="いいね"
              value={stats.likes}
              description="投稿に対する反応"
            />

            <ProgressRow
              label="フォロー"
              value={stats.follows}
              description="ユーザー同士のつながり"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              登録ユーザー一覧
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Physinnoに登録しているユーザーの情報です。
            </p>
          </div>

          {adminUsers.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center">
              <p className="text-sm text-gray-500">
                登録ユーザーが見つかりません。
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {adminUsers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border bg-white p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-gray-900">
                          {member.full_name || "名前未設定"}
                        </p>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                          {member.account_type === "pt"
                            ? "PT"
                            : member.account_type || "未設定"}
                        </span>
                      </div>

                      <p className="mt-2 break-all text-sm text-gray-500">
                        {member.email || "メールアドレス未設定"}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-xs text-gray-400">
                        登録日
                      </p>

                      <p className="mt-1 text-sm text-gray-700">
                        {formatDate(member.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <InfoItem
                      label="資格"
                      value={member.qualification}
                    />

                    <InfoItem
                      label="勤務先"
                      value={member.workplace}
                    />

                    <InfoItem
                      label="都道府県"
                      value={member.prefecture}
                    />

                    <InfoItem
                      label="市区町村"
                      value={member.city}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <button
          onClick={loadAdmin}
          className="mt-6 w-full rounded-xl border bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          🔄 データを更新
        </button>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
  description,
}: {
  label: string;
  value: number;
  icon: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>

        <p className="text-sm font-medium text-gray-700">
          {label}
        </p>
      </div>

      <p className="mt-4 text-3xl font-semibold text-gray-900">
        {value.toLocaleString("ja-JP")}
      </p>

      <p className="mt-2 text-xs leading-5 text-gray-400">
        {description}
      </p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-gray-700">
          {label}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {description}
        </p>
      </div>

      <p className="text-xl font-semibold text-gray-900">
        {value.toLocaleString("ja-JP")}
      </p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-700">
        {value || "未設定"}
      </p>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}