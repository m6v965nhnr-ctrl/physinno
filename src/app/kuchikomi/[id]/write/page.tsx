import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabasePublic } from "@/lib/supabasePublic";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import ReviewForm from "@/components/kuchikomi/ReviewForm";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "口コミを投稿する",
  robots: { index: false, follow: false }, // 操作のページ。検索には出さない
};

export default async function KuchikomiWriteHospitalPage({ params }: Props) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data } = await supabasePublic.from("hospitals").select("id, name").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <KuchikomiFrame>
      <div className="mx-auto max-w-2xl px-5 py-8">
        <ReviewForm hospitalId={data.id as string} hospitalName={data.name as string} />
      </div>
    </KuchikomiFrame>
  );
}
