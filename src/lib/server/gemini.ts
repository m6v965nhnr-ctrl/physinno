import { createClient } from "@supabase/supabase-js";

// AIモード用のLLM呼び出し（Google Gemini API・無料枠）。
// GEMINI_API_KEYが未設定の間はAI機能を無効のまま、既存の検索だけが動く。
// モデル名は短期間で入れ替わる（2.5 Flashは新規利用不可になった）ため、
// 常に最新のFlashを指す別名を既定にする。固定したい場合はGEMINI_MODELで上書き
const DEFAULT_MODEL = "gemini-flash-latest";
// 最新モデルが混雑しているときの切り替え先
const FALLBACK_MODEL = "gemini-flash-lite-latest";

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
  const baseConfig: Record<string, unknown> = {
    temperature: 0.2,
    maxOutputTokens,
  };
  if (json) baseConfig.responseMimeType = "application/json";

  const call = (model: string, generationConfig: Record<string, unknown>) =>
    fetch(
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
        signal: AbortSignal.timeout(12000),
      }
    );

  // 最新モデルは「需要が高い」で一時的に503/429を返すことがあるため、
  // 短く待って再試行し、それでも駄目なら軽量モデルに切り替える
  const models = [process.env.GEMINI_MODEL || DEFAULT_MODEL, FALLBACK_MODEL];
  let res: Response | null = null;

  outer: for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      // Flash系は思考トークンで出力枠を使い切って本文が空になることがあるため、
      // 要約・クエリ生成では思考を切る。非対応モデルで400になったら外して再試行する
      res = await call(model, { ...baseConfig, thinkingConfig: { thinkingBudget: 0 } });
      if (res.status === 400) res = await call(model, baseConfig);

      if (res.ok) break outer;
      if (res.status !== 503 && res.status !== 429) break outer;
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  if (!res) throw new Error("Gemini API: no response");
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini API error: ${res.status} ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    candidates?: {
      finishReason?: string;
      content?: { parts?: { text?: string }[] };
    }[];
  };

  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error(
      `Gemini API returned empty response (finishReason=${data.candidates?.[0]?.finishReason})`
    );
  }
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
