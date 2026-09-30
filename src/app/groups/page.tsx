"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Group, listMyGroups, listPublicGroups } from "@/lib/groups";

export default function GroupsPage() {
  const [myGroups, setMyGroups] = useState<
    (Group & { myRole: "owner" | "member" })[]
  >([]);
  const [publicGroups, setPublicGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setMyGroups(await listMyGroups(user.id));
    }

    setPublicGroups(await listPublicGroups());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const myGroupIds = new Set(myGroups.map((g) => g.id));
  const discoverableGroups = publicGroups.filter((g) => !myGroupIds.has(g.id));

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            グループ
          </h1>

          <Link
            href="/groups/create"
            className="rounded-full bg-relight-gradient px-4 py-2 text-sm font-medium text-white"
          >
            ＋ 作成
          </Link>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          病院単位・専門分野単位など、狭い範囲で相談できる場です
        </p>

        {loading && (
          <p className="mt-8 text-center text-sm text-gray-400">
            読み込み中…
          </p>
        )}

        {!loading && (
          <>
            <section className="mt-6">
              <h2 className="text-sm font-semibold text-gray-500">
                参加中のグループ
              </h2>

              {myGroups.length === 0 ? (
                <p className="mt-3 text-sm text-gray-400">
                  まだ参加しているグループはありません
                </p>
              ) : (
                <div className="mt-3 space-y-2">
                  {myGroups.map((g) => (
                    <GroupCard key={g.id} group={g} />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-8">
              <h2 className="text-sm font-semibold text-gray-500">
                公開グループを探す
              </h2>

              {discoverableGroups.length === 0 ? (
                <p className="mt-3 text-sm text-gray-400">
                  公開グループはまだありません
                </p>
              ) : (
                <div className="mt-3 space-y-2">
                  {discoverableGroups.map((g) => (
                    <GroupCard key={g.id} group={g} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      href={`/groups/${group.id}`}
      className="block rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-gray-200"
    >
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-900">{group.name}</p>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
          {group.is_private ? "非公開" : "公開"}
        </span>
      </div>

      {group.description && (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {group.description}
        </p>
      )}
    </Link>
  );
}
