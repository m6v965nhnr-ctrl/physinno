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
  answer: { subject: (a: string) => `${a}さんがあなたの質問に回答しました`, path: "/notifications" },
  // しばらく使っていない人へのお知らせ（3週間。1人あたり、60日に1通まで）
  reminder: { subject: () => "しばらくぶりです。こんな機能が使えます", path: "/" },
  // アカウントの種類（PT・学生）が未設定の人への、設定のお願い（運営から。種類が決まれば、対象から外れる）
  setup: { subject: () => "かざねよりお願い：アカウントの種類を設定してください", path: "/mypage/edit" },
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
    account_type?: string;
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

  const accountType = clean(body?.account_type, 12);

  const reminderBody = (): string[] => {
    const utm = "utm_source=email&utm_medium=reminder";
    const lines =
      accountType === "student"
        ? [
            "Re:lightを、しばらくお使いになっていないようです。国試対策には、こんな機能があります。",
            "",
            `・今日の10問（約3分。答えるとすぐ解説）: ${SITE_URL}/student/quiz/play?mode=unanswered&n=10&order=random&${utm}`,
            `・間違えた問題の復習 / 模擬試験: ${SITE_URL}/student?${utm}`,
            `・実習・就活の管理、実習先の口コミ: ${SITE_URL}/student?${utm}`,
          ]
        : [
            "Re:lightを、しばらくお使いになっていないようです。臨床の合間に、こんな機能があります。",
            "",
            `・論文検索（日本語でも英語でも、8つのサイトを同時に。エビデンスレベルで絞り込み）: ${SITE_URL}/pts?mode=papers&${utm}`,
            `・臨床アイデア（疾患ごとの、評価とリハビリの引き出し）: ${SITE_URL}/pts?mode=ideas&${utm}`,
            `・研修・学会情報（毎日更新）: ${SITE_URL}/pts?tab=news&${utm}`,
          ];
    return [...lines, "", `${SITE_NAME}を開く: ${SITE_URL}/?${utm}`];
  };

  const setupBody = (): string[] => {
    const utm = "utm_source=email&utm_medium=setup";
    return [
      "かざねよりお願いです。",
      "",
      "アカウントの種類（理学療法士か学生）が、いま「未設定」になっています。",
      "設定してもらうと、論文検索など、いろんな機能が使えるようになります！",
      "",
      "【設定のしかた】",
      "1. 下のリンクを開く（または、マイページ →「プロフィール編集」を開く）",
      "2. いちばん下の「アカウントの種類」で、「PT（理学療法士）」か「学生」を選ぶ",
      `   ${SITE_URL}/mypage/edit?${utm}`,
      "",
      "あと、ホーム画面に追加できるようにしました。やってみてください！",
      "マイページの「同僚を招待する」の下にあるボタンから、数タップでできます。",
      "",
      `${SITE_NAME}を開く: ${SITE_URL}/?${utm}`,
    ];
  };

  const text = (
    kind === "setup"
      ? [
          ...setupBody(),
          "",
          "――",
          `${SITE_NAME}（運営）からの、アカウント設定のお願いです。設定が済むと、このメールは届かなくなります。`,
        ]
      : kind === "reminder"
      ? [
          ...reminderBody(),
          "",
          "――",
          `${SITE_NAME}（運営: ${SITE_NAME}編集部）からの、ご利用状況にもとづく自動のお知らせです。`,
          `このお知らせを止めたいときは、こちらの画面の「お知らせ（しばらく使っていないとき）」をオフにしてください: ${SITE_URL}/notifications`,
        ]
      : [
          template.subject(actor),
          "",
          `内容の確認は ${SITE_NAME} を開いてください。`,
          `${SITE_URL}${template.path}`,
          "",
          "――",
          "このメールは、あなたの通知設定にもとづいて自動で送っています。",
          "メッセージやコメントの本文は、このメールには含まれません。",
          `通知メールを止めたいときは、こちらの画面の「メールで通知を受け取る」をオフにしてください: ${SITE_URL}/notifications`,
        ]
  ).join("\n");

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
