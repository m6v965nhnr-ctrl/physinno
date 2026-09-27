import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "無料会員登録",
  description:
    "Re:lightに無料登録。理学療法士は症例の共有や研修・学会情報のチェックに、一般の方は理学療法士探しにご利用いただけます。",
  alternates: { canonical: "/register" },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
