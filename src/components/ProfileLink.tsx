"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// ユーザーのアイコン（または名前）を押すと、その人のプロフィールページへ飛ぶ。
// userId が無いとき（匿名の投稿など）は、リンクにしない。
// nested: すでにリンクの中（会話の行・通知のカードなど）にあるとき。リンクの入れ子は作れないので、押したときだけ移動する
export default function ProfileLink({
  userId,
  name,
  children,
  className = "",
  nested = false,
}: {
  userId?: string | null;
  name?: string | null;
  children: React.ReactNode;
  className?: string;
  nested?: boolean;
}) {
  const router = useRouter();

  if (!userId) return <>{children}</>;

  const label = name ? `${name}のプロフィールを見る` : "プロフィールを見る";
  const href = `/pts/${userId}`;

  if (nested) {
    return (
      <span
        role="link"
        tabIndex={0}
        aria-label={label}
        className={`cursor-pointer ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(href);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            router.push(href);
          }
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  );
}
