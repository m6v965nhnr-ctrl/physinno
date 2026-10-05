import { createClient } from "@supabase/supabase-js";

// AIモード用のLLM呼び出し（Google Gemini API・無料枠）。
// GEMINI_API_KEYが未設定の間はAI機能を無効のまま、既存の検索だけが動く。
const DEFAULT_MODEL = "gemini-2.5-flash";

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

export type ChatTurn = { role: "user" | "model"; text: string };

export async function generateText({
  system,
  contents,
  json = false,
  maxOutputTokens = 1024,
}: {
  system: string;
  contents: ChatTurn[];
  json?: boolean;
  maxOutputTokens?: number;
}): Promise<string> {
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const generationConfig: Record<string, unknown> = {
    temperature: 0.2,
    maxOutputTokens,
  };
  if (json) generationConfig.responseMimeType = "application/json";
  // 2.5 Flashは思考トークンで出力枠を消費するため、要約・クエリ生成では切る
  if (/^gemini-2\.5-flash/.test(model)) {
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: contents.map((c) => ({ role: c.role, parts: [{ text: c.text }] })),
        generationConfig,
      }),
      signal: AbortSignal.timeout(20000),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text ?? "")
    .join("")
    .trim();

  if (!text) throw new Error("Gemini API returned empty response");
  return text;
}

// 公開エンドポイントから無料枠を使い切られないよう、ログイン済みユーザーのみ許可する
export async function getUserFromRequest(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await client.auth.getUser(token);
  return data.user ?? null;
}
