"use client";

import { useEffect, useState } from "react";
import { listOrgPosts, type OrgPost } from "@/lib/orgPosts";
import OrgPostCard from "@/components/OrgPostCard";

// ホームに流す、施設（病院・事業所など）の最新の投稿。投稿がなければ、何も出さない
export default function OrgPostsFeed() {
  const [posts, setPosts] = useState<OrgPost[] | null>(null);
  useEffect(() => {
    listOrgPosts({ limit: 5 }).then(setPosts);
  }, []);
  if (!posts || posts.length === 0) return null;
  return (
    <section className="my-4" aria-label="施設からの投稿">
      <h2 className="mb-2 text-sm font-semibold text-gray-700">施設からの投稿</h2>
      <div className="space-y-3">
        {posts.map((p) => (
          <OrgPostCard key={p.id} post={p} reportable />
        ))}
      </div>
    </section>
  );
}
