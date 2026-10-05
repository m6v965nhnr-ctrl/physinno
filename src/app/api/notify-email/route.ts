import { createHash, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// データベース(通知の発生時)から呼ばれる、通知メールの送信口。
// - 合言葉(NOTIFY_WEBHOOK_SECRET)を知っているデータベースだけが呼べる
// - メッセージやコメントの本文は受け取らない・送らない(誰から何が届いたかだけ)
// - 送信にはSMTP(SMTP_USER / SMTP_PASS)が必要。未設定なら何も送らず 503 を返す

export const dynamic = "force-dynamic";

const KINDS = {
  comment: { subject: (a: string) => `${a}さんがあなたの投稿にコメントしました`, path: "/notifications" },
  message: { subject: (a: string) => `${a}さんからメッセージが届きました`, path: "/messages" },
  follow: { subject: (a: string) => `${a}さんにフォローされました`, path: "/notifications" },
} as const;

type Kind = keyof typeof KINDS;

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  const secret = process.env.NOTIFY_WEBHOOK_SECRET;
  const given = request.headers.get("x-notify-secret") ?? "";

  if (!secret || !safeEqual(given, secret)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    to?: string;
    kind?: string;
    actor?: string;
  } | null;

  const to = clean(body?.to, 254);
  const kind = clean(body?.kind, 20) as Kind;

  if (!/^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/.test(to) || !(kind in KINDS)) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const actor = clean(body?.actor, 60) || "ユーザー";
  const template = KINDS[kind];

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (Number(process.env.SMTP_PORT) || 465) === 465,
    auth: { user, pass },
  });

  const text = [
    template.subject(actor),
    "",
    `内容の確認は ${SITE_NAME} を開いてください。`,
    `${SITE_URL}${template.path}`,
    "",
    "――",
    "このメールは、あなたの通知設定にもとづいて自動で送っています。",
    "メッセージやコメントの本文は、このメールには含まれません。",
    `通知メールを止めたいときは、こちらの画面の「メールで通知を受け取る」をオフにしてください: ${SITE_URL}/notifications`,
  ].join("\n");

  try {
    await transporter.sendMail({
      // 名前に「:」を含むため、文字列ではなく {名前, アドレス} で渡す(文字列だと宛先グループの書式と誤解される)
      from: process.env.MAIL_FROM || { name: SITE_NAME, address: user },
      to,
      subject: `【${SITE_NAME}】${template.subject(actor)}`,
      text,
    });
  } catch (error) {
    console.error("NOTIFY EMAIL ERROR", error instanceof Error ? error.message : error);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
