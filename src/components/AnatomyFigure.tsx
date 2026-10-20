import { ANATOMY_IMAGE_IDS, ATTACHMENT_IMAGE_IDS, APPROX_IMAGE_IDS, OSSICLE_IMAGE_IDS } from "@/content/muscles/images";

// 筋・骨の図（BodyParts3Dから作成。赤が、その筋・骨）。画像がないときは、何も出さない
export default function AnatomyFigure({ id, name }: { id: string; name: string }) {
  if (!ANATOMY_IMAGE_IDS.has(id)) return null;
  if (OSSICLE_IMAGE_IDS.has(id))
    return (
      <figure className="mt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/anatomy/${id}.webp`} alt="耳小骨（ツチ骨・キヌタ骨・アブミ骨）の連なりの図" loading="lazy" decoding="async" width={342} height={500} className="mx-auto w-full max-w-[240px] rounded-xl border border-gray-100 bg-white" />
        <figcaption className="mt-1 text-[10px] leading-4 text-gray-400">
          鼓膜から前庭へつながる、耳小骨の連なり（MALLEUS＝ツチ骨、INCUS＝キヌタ骨、STAPES＝アブミ骨）。図: Gray’s Anatomy（1918年、パブリックドメイン）
        </figcaption>
      </figure>
    );
  const attach = ATTACHMENT_IMAGE_IDS.has(id);
  return (
    <figure className="mt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/anatomy/${id}.webp`} alt={id === "b026" ? "赤い部分が尾骨です（仙骨の下端を、おおよその位置で示しています）。" : APPROX_IMAGE_IDS.has(id) ? `赤い部分が${name}です（寛骨を、おおよその位置で分けています）。` : attach ? `${name}が付く骨を示す図（赤が起始、青が停止）` : `${name}の位置を示す図（赤い部分）`} loading="lazy" decoding="async" width={480} height={360} className="w-full rounded-xl border border-gray-100 bg-white" />
      <figcaption className="mt-1 text-[10px] leading-4 text-gray-400">
        {id === "b026" ? "赤い部分が尾骨です（仙骨の下端を、おおよその位置で示しています）。" : attach ? `${name}の3Dデータがないため、付く骨で示しています（赤＝起始する骨、青＝停止する骨）。` : `赤い部分が${name}です。`}図: BodyParts3D, © The Database Center for Life Science（CC 表示-継承 2.1 日本）をもとに作成
      </figcaption>
    </figure>
  );
}
