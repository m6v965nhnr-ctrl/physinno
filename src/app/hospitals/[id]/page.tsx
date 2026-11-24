import HospitalDetail from "@/components/hospital/HospitalDetail";

// 画面の本体は、職場口コミサイト（/kuchikomi/[id]）と共有している（components/hospital/HospitalDetail.tsx）
// 画面の本体はブラウザで組み立てるので、サーバーでは、口コミサイトと同じく、月1回だけ作り直す（毎回サーバーで動かさない）
export const revalidate = 2592000;
// 「どのIDがあるか」を返す関数を足さないと、再生成(revalidate)の設定があっても、キャッシュされずに毎回サーバーが組み立てる。空を返せば、最初のアクセスで作って、あとはキャッシュを返す
export function generateStaticParams() {
  return [];
}

export default function HospitalDetailPage() {
  return <HospitalDetail variant="app" />;
}
